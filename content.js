// ポップアップからのメッセージを受信
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getPageContent') {
    // ページのテキスト内容を取得
    const pageText = document.body.innerText || document.body.textContent || '';
    
    // ページのURLを取得
    const pageUrl = window.location.href;
    
    // レスポンスを送信
    sendResponse({
      url: pageUrl,
      content: pageText.trim()
    });
  }
  
  // 非同期レスポンスのためtrueを返す
  return true;
});