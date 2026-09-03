# Portfolio for GitHub Pages

名刺やQRコードから訪れた人が、仕事・人物像・連絡先を短時間で把握できる静的ポートフォリオです。
ビルドツールや外部ライブラリを使っていないため、そのままGitHub Pagesへ公開できます。

## 内容を自分用に変更する

プロフィール、作品、スキル、SNSリンクは [`content.js`](content.js) にまとまっています。
まず次の項目を差し替えてください。

- `profile`: 氏名、肩書き、所在地、メールアドレス、自己紹介
- `projects`: 作品名、説明、担当範囲、画像、詳細ページURL
- `skills`: 得意分野
- `socials`: GitHubやSNSのURL

作品画像は `assets/` に置き、`projects` の `image` に相対パスを指定します。
検索結果やSNS共有時の説明は [`index.html`](index.html) の `<head>` 内にある `description` と `og:*` も変更してください。

## ローカルで確認する

PowerShellで次を実行し、ブラウザで `http://localhost:8000` を開きます。

```powershell
python -m http.server 8000
```

Pythonがない場合は、VS CodeのLive Serverなど任意の静的Webサーバーを利用できます。

## GitHub Pagesへ公開する

1. GitHubで空のリポジトリを作成します。
2. このフォルダーをリポジトリへpushします。
3. GitHubの **Settings → Pages → Build and deployment → Source** で **GitHub Actions** を選びます。
4. `main` または `master` ブランチへpushすると、同梱のワークフローが公開処理を行います。

公開URLは通常 `https://<ユーザー名>.github.io/<リポジトリ名>/` です。
ユーザーサイト用の `<ユーザー名>.github.io` リポジトリでは `https://<ユーザー名>.github.io/` になります。

## ファイル構成

```text
.
├── .github/workflows/pages.yml  # GitHub Pagesへの自動公開
├── assets/                      # 作品画像とfavicon
├── content.js                   # 差し替えるプロフィール・作品データ
├── index.html                   # ページ構造
├── script.js                    # 描画と操作
└── styles.css                   # デザインとレスポンシブ対応
```
