# ChatGPT URL Sender

<div align="center">
  <img src="icon128.png" alt="ChatGPT URL Sender Icon" width="128" height="128">
  
  **任意のWebページの内容をワンクリックでChatGPTに送信**
  
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
  [![Chrome Web Store](https://img.shields.io/badge/Chrome-Extension-green.svg)](https://chrome.google.com/webstore)
</div>

## 📋 概要

ChatGPT URL Senderは、閲覧中のWebページのURLとテキスト内容を簡単にChatGPTに送信できるChrome拡張機能です。長い記事の要約、Webページの内容に関する質問、特定情報の抽出などに便利です。

## ✨ 機能

- 🔗 **ワンクリック送信** - 現在のページ内容を即座にChatGPTへ送信
- 🤖 **モデル選択** - GPT-4o、o3、o4-mini、o4-mini-highから選択可能
- 📝 **プロンプトカスタマイズ** - デフォルト（要約）またはカスタムプロンプトを使用
- 💾 **設定の保存** - 選択したモデルとカスタムプロンプトを自動保存
- 🚀 **高速処理** - 効率的なコンテンツ抽出と送信

## 📸 スクリーンショット

<div align="center">
  <img src="screenshots/popup.png" alt="Popup Interface" width="350">
</div>

## 🚀 インストール

### Chrome Web Storeから（推奨）
1. [Chrome Web Store](https://chrome.google.com/webstore)にアクセス
2. 「ChatGPT URL Sender」を検索
3. 「Chromeに追加」をクリック

### 開発者モード
1. このリポジトリをクローン
   ```bash
   git clone https://github.com/yamayued/ChatGPT_URL_Sender.git
   ```
2. Chrome拡張機能管理ページ（`chrome://extensions/`）を開く
3. 右上の「開発者モード」を有効化
4. 「パッケージ化されていない拡張機能を読み込む」をクリック
5. クローンしたフォルダを選択

## 💡 使い方

1. **任意のWebページを開く**
2. **拡張機能アイコンをクリック**
3. **モデルを選択**（オプション）
   - GPT-4o（デフォルト）
   - o3
   - o4-mini
   - o4-mini-high
4. **プロンプトを選択**
   - デフォルト（要約）
   - カスタム（独自のプロンプトを入力）
5. **「ChatGPTに送信」ボタンをクリック**
6. **ChatGPTが新しいタブで開き、内容が自動入力される**

## 🛠️ 技術仕様

### 必要な権限
- `activeTab` - 現在のタブの内容を読み取り
- `storage` - 設定の保存
- `scripting` - コンテンツスクリプトの動的注入

### ファイル構成
```
chatgpt-url-sender/
├── manifest.json      # 拡張機能のマニフェスト
├── popup.html        # ポップアップUI
├── popup.js          # ポップアップのロジック
├── popup.css         # スタイルシート
├── content.js        # コンテンツスクリプト
├── background.js     # バックグラウンドスクリプト
├── icon16.png        # アイコン (16x16)
├── icon48.png        # アイコン (48x48)
├── icon128.png       # アイコン (128x128)
└── README.md         # このファイル
```

## 🔧 開発

### 前提条件
- Chrome ブラウザ
- 基本的なWeb開発の知識（HTML、CSS、JavaScript）

### ローカル開発
1. ファイルを編集
2. Chrome拡張機能管理ページで「更新」をクリック
3. 変更をテスト

### デバッグ
- ポップアップのデバッグ：ポップアップ上で右クリック → 「検証」
- コンテンツスクリプトのデバッグ：Webページ上でF12 → Consoleタブ
- バックグラウンドスクリプトのデバッグ：拡張機能管理ページ → 「Service Worker」をクリック

## 📝 注意事項

- 一部のWebサイト（chrome://、chrome-extension://、Chromeウェブストアなど）では使用できません
- ページの読み込みが完了してから使用してください
- 大量のテキストがある場合、ChatGPTの入力制限により切り詰められる可能性があります

## 🤝 貢献

プルリクエストを歓迎します！大きな変更の場合は、まずissueを作成して変更内容を議論してください。

1. フォーク
2. フィーチャーブランチを作成（`git checkout -b feature/AmazingFeature`）
3. 変更をコミット（`git commit -m 'Add some AmazingFeature'`）
4. ブランチにプッシュ（`git push origin feature/AmazingFeature`）
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は[LICENSE](LICENSE)ファイルを参照してください。

## 👨‍💻 作者

- **yamayued** - [GitHub](https://github.com/yamayued)

## 🙏 謝辞

- ChatGPT by OpenAI
- Chrome Extensions documentation
- アイコンデザインのインスピレーション

---

<div align="center">
  Made with ❤️ for the ChatGPT community
</div>