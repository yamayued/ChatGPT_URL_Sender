// 拡張機能のインストール時の処理
chrome.runtime.onInstalled.addListener(() => {
  console.log('ChatGPT URL Sender Extension installed');
});

// 必要に応じて将来的な機能拡張のためのプレースホルダー
// 例: コンテキストメニューの追加、ショートカットキーの処理など