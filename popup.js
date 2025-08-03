document.addEventListener('DOMContentLoaded', function() {
  const modelSelect = document.getElementById('modelSelect');
  const promptRadios = document.querySelectorAll('input[name="prompt"]');
  const customPromptSection = document.getElementById('customPromptSection');
  const customPromptTextarea = document.getElementById('customPrompt');
  const sendButton = document.getElementById('sendButton');
  const statusDiv = document.getElementById('status');

  // カスタムプロンプトの表示/非表示
  promptRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      if (this.value === 'custom') {
        customPromptSection.style.display = 'block';
      } else {
        customPromptSection.style.display = 'none';
      }
    });
  });

  // 保存されたモデルとカスタムプロンプトを読み込み
  chrome.storage.local.get(['selectedModel', 'customPrompt'], function(result) {
    if (result.selectedModel) {
      modelSelect.value = result.selectedModel;
    }
    if (result.customPrompt) {
      customPromptTextarea.value = result.customPrompt;
    }
  });

  // モデル選択の保存
  modelSelect.addEventListener('change', function() {
    chrome.storage.local.set({ selectedModel: this.value });
  });

  // カスタムプロンプトの保存
  customPromptTextarea.addEventListener('input', function() {
    chrome.storage.local.set({ customPrompt: this.value });
  });

  // 送信ボタンのクリックイベント
  sendButton.addEventListener('click', async function() {
    statusDiv.textContent = '処理中...';
    statusDiv.className = 'status processing';

    try {
      // 現在のタブの情報を取得
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // 特定のURLではコンテンツスクリプトが動作しない
      if (tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://') || 
          tab.url.startsWith('https://chrome.google.com/webstore')) {
        statusDiv.textContent = 'このページでは使用できません';
        statusDiv.className = 'status error';
        return;
      }
      
      // コンテンツスクリプトを手動で注入を試みる
      try {
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['content.js']
        });
      } catch (injectionError) {
        console.log('Content script already injected or injection failed:', injectionError);
      }
      
      // 少し待ってからメッセージを送信
      setTimeout(() => {
        // コンテンツスクリプトにメッセージを送信してページ内容を取得
        chrome.tabs.sendMessage(tab.id, { action: 'getPageContent' }, function(response) {
        if (chrome.runtime.lastError) {
          console.error('Chrome runtime error:', chrome.runtime.lastError);
          statusDiv.textContent = 'エラー: ページ内容を取得できませんでした';
          statusDiv.className = 'status error';
          
          // ページをリロードするか、拡張機能を再インストールすることを提案
          setTimeout(() => {
            statusDiv.textContent = 'ページを再読み込みしてから、もう一度お試しください';
          }, 2000);
          return;
        }

        if (response && response.content) {
          // プロンプトを決定
          let prompt;
          const selectedPrompt = document.querySelector('input[name="prompt"]:checked').value;
          
          if (selectedPrompt === 'default') {
            prompt = `以下のURLとテキスト内容を要約してください:\n\nURL: ${response.url}\n\n内容:\n${response.content}`;
          } else {
            const customPromptText = customPromptTextarea.value.trim();
            if (!customPromptText) {
              statusDiv.textContent = 'カスタムプロンプトを入力してください';
              statusDiv.className = 'status error';
              return;
            }
            prompt = `${customPromptText}\n\nURL: ${response.url}\n\n内容:\n${response.content}`;
          }

          // 選択されたモデルを取得
          const selectedModel = modelSelect.value;
          
          // ChatGPTのURLにプロンプトとモデルをエンコード
          const encodedPrompt = encodeURIComponent(prompt);
          let chatGPTUrl = `https://chat.openai.com/?q=${encodedPrompt}`;
          
          // モデルパラメータを追加
          if (selectedModel && selectedModel !== 'gpt-4o') {
            chatGPTUrl += `&model=${selectedModel}`;
          }

          // 新しいタブでChatGPTを開く
          chrome.tabs.create({ url: chatGPTUrl });

          statusDiv.textContent = '送信完了！';
          statusDiv.className = 'status success';
        } else {
          statusDiv.textContent = 'エラー: ページ内容を取得できませんでした';
          statusDiv.className = 'status error';
        }
      });
      }, 100); // setTimeoutの終了
    } catch (error) {
      statusDiv.textContent = 'エラーが発生しました';
      statusDiv.className = 'status error';
      console.error(error);
    }
  });
});