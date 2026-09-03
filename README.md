# Ogasawara Keigo Portfolio

小笠原圭吾のプロフィール、経歴、プロジェクト、論文・発表、ニュース、連絡先を掲載するGitHub Pages向けの静的ポートフォリオです。

Tailwind CSS v4で画面を構築し、JavaScriptはES Modulesで分割しています。日本語・英語、ライト・ダークテーマ、一覧検索、カテゴリ・年による絞り込み、個別詳細ページに対応しています。

## ページ構成

- Home：概要、注目プロジェクト、最近のニュース
- About：自己紹介、プロフィール、学歴、スキル、関心分野
- Projects：プロジェクト一覧、検索、絞り込み、個別詳細
- Publications：論文・発表一覧、検索、絞り込み
- News：活動更新一覧、検索、絞り込み、個別詳細
- Contact：メール、GitHub、所在地

主なURLは次の形式です。

```text
?page=home&lang=ja
?page=about&lang=en
?page=projects&lang=ja
?page=project&id=<project-slug>&lang=ja
?page=publications&lang=ja
?page=news&lang=ja
?page=news-detail&id=<news-slug>&lang=ja
?page=contact&lang=ja
```

旧URLの `profile`、`career`、`activities` は、それぞれ現在の該当ページへ自動的に置き換わります。

## 掲載内容を変更する

掲載内容は `data/` に用途別でまとめています。翻訳対象の値は `{ ja: "日本語", en: "English" }` の形式で記載します。

- `data/profile.js`：氏名、所属、自己紹介、学歴、スキル、関心分野
- `data/projects.js`：プロジェクト一覧と詳細
- `data/publications.js`：論文、学会発表、ポスターなど
- `data/news.js`：研究、発表、受賞、公開情報
- `data/links.js`：GitHubやSNSのURL

現在のプロジェクトとニュースには、画面構成を確認するためのプレースホルダーがあります。`draft: true` の項目には「仮データ」と表示されるため、実情報へ差し替えた後に `false` へ変更してください。

作品画像は `assets/` に置き、各データの `image` に相対パスを指定します。画像を設定するときは、同時に日本語・英語の `imageAlt` も記載してください。

論文・発表は本人確認済みの書誌情報だけを掲載する方針のため、現在は空状態を表示します。

## ローカルで確認する

依存関係をインストールし、配信用CSSを生成します。

```powershell
npm install
npm run build
```

ES Modulesへ正しいMIMEタイプを返す同梱サーバーを起動します。

```powershell
npm run dev
```

ブラウザで `http://127.0.0.1:8000/` を開いてください。別ポートを使う場合は次のように指定できます。

```powershell
$env:PORTFOLIO_PORT=4173
npm run dev
```

デザインを編集しながらCSSを自動生成する場合は、別のターミナルで次を実行します。

```powershell
npm run dev:css
```

## GitHub Pagesへ公開する

`.github/workflows/pages.yml` が `main` または `master` ブランチへのpushを検知し、静的ファイルをGitHub Pagesへ公開します。

1. リポジトリの **Settings → Pages** を開く。
2. **Build and deployment → Source** で **GitHub Actions** を選ぶ。
3. `npm run build` で `styles.css` を更新する。
4. 変更をコミットしてpushする。

このリポジトリの公開URLは `https://sse-c-553.github.io/ogasawara-k-portfolio/` です。

## ファイル構成

```text
.
├── .github/workflows/pages.yml  # GitHub Pagesへの自動公開
├── assets/                      # プロジェクト画像とfavicon
├── data/                        # 差し替えるプロフィールと実績データ
├── js/
│   ├── components/              # 共通UI
│   ├── pages/                   # ページ単位の描画処理
│   ├── app.js                   # 画面全体の制御
│   ├── filters.js               # 検索、絞り込み、ページ送り
│   ├── i18n.js                  # 日本語・英語
│   └── router.js                # URLルーティング
├── scripts/dev-server.mjs       # ローカル確認用サーバー
├── src/tailwind.css             # Tailwindテーマと共通スタイル
├── IMPLEMENTATION_PLAN.md       # 方針、仕様、進捗
├── index.html                   # 共通HTML
├── package.json                 # ビルドと開発コマンド
└── styles.css                   # 生成済みの配信用CSS
```
