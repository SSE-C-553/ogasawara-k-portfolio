# Keigo Ogasawara Portfolio

小笠原圭吾のプロフィール、経歴、研究・作品、発表、ニュース、連絡先を掲載する GitHub Pages 向けの静的サイトです。Tailwind CSS v4、ES Modules を使用し、日本語・英語、ライト・ダークテーマに対応します。

## ローカル確認

Node.js 22 以降を使用します。

```powershell
npm ci
npm test
npm run dev
```

ビルド後、http://127.0.0.1:8000/ を開きます。ファイルを変更したら再ビルドし、ブラウザを再読み込みしてください。

```powershell
npm run build
npm run preview
```

別ポートは起動前に `$env:PORTFOLIO_PORT=4173` と指定します。`npm run dev:css` は CSS の監視用ですが、HTML の事前生成には別途 `npm run build` が必要です。

## ページと URL

- `/`：Home
- `/about/`：自己紹介・経歴・受賞・スキル
- `/projects/`、`/projects/<slug>/`：研究・作品と詳細
- `/publications/`：論文・発表
- `/news/`、`/news/<slug>/`：活動更新と記事本文
- `/contact/`：メール・GitHub

英語版は各パスの前に `/en/` が付きます。公開時はすべて `/ogasawara-k-portfolio/` 配下になります。

従来の `?page=home&lang=ja` などの URL も使えます。旧ページ名 `profile`、`career`、`activities` は現在のページへ移動します。名刺の既存 QR コードを作り直す必要はありません。名刺には変更の少ないサイトのトップ URL を使用してください。

## 掲載内容の編集

`data/` の各ファイルを編集します。翻訳は `{ ja: "日本語", en: "English" }` 形式です。

- `profile.js`：氏名、所属、経歴、受賞、スキル
- `projects.js`：研究・作品、制作背景、担当範囲、成果、リンク
- `publications.js`：発表・論文の書誌情報と発表状況
- `news.js`：活動更新。記事本文の `body` は空行で段落を区切ります
- `links.js`：外部リンク
- `site.js`：公開 URL、ベースパス、OGP 画像

`visible: false` は画面上の非表示、`draft: true` は仮データ表示です。非表示はアクセス制限ではないため、非公開情報をデータファイルや public リポジトリに置かないでください。現在は実情報・出典のある項目を掲載しています。未確認の担当範囲や成果を推測で追加しないでください。`peerReviewed: null` は査読有無が未確認の状態で、画面に査読ラベルを出しません。英語の仮訳にはその旨を明記します。

研究の担当範囲（回路・機構・コード・解析・実験など）、公開可能な評価条件・数値、発表資料の共有可否、詳しい入学年月、Python/C++ 等の使用経験は、本人確認後に追加してください。VRSJ 2026 の 9 月 8 日発表は本人確認により実施済みです。

作品画像は実際のアプリ画面と大会プログラム掲載図を使用しています。研究図の出典リンクは画像下に記載します。画像・発表資料を追加する際は共同研究者や権利者の公開許可も確認してください。仮の計測イラストは配信対象から外しています。

## ビルドと公開

`npm run build` は CSS と日英の HTML を `dist/` に生成します。本文・ページ別メタ情報・canonical・hreflang・JSON-LD・サイトマップは JavaScript 実行前から HTML に入ります。

公開対象は `dist/` のみです。README、調査メモ、添付ファイル、ソース用スクリプト、node_modules は Web サイトへ配信しません。ただし public リポジトリ自体に置いたファイルは GitHub 上で閲覧できます。

`.github/workflows/pages.yml` が main/master への push 時に、依存関係のインストール、テスト、ビルド、Pages へのデプロイを行います。GitHub の Settings → Pages → Source は GitHub Actions に設定してください。

公開 URL：https://sse-c-553.github.io/ogasawara-k-portfolio/

OGP は `assets/og-image.jpg` を使用します。氏名・所属・写真が変わった場合、`scripts/og-preview.html` をソース確認用サーバーで開いて 1200 × 630 px の画像を再作成し、再ビルドします。

```powershell
node scripts/dev-server.mjs --source
```

`--source` は編集用素材の確認専用です。通常の動作確認は配信対象を限定するため、ビルド済みのプレビューを使用します。
