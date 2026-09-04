export const projects = [
  {
    slug: "microsaccade-eye-displacement",
    title: {
      ja: "光学式マウスセンサによる眼球変位量取得",
      en: "Eye-displacement sensing with an optical mouse sensor",
    },
    summary: {
      ja: "小型・低コストな光学式マウスセンサを用い、マイクロサッケード検出に必要な眼球表面の微小変位を取得する手法の研究です。",
      en: "Research on acquiring minute eye-surface displacement for microsaccade detection with a compact, low-cost optical mouse sensor.",
    },
    category: "RESEARCH / SENSING",
    date: "2026",
    technologies: ["Optical Mouse Sensor", "Eye Movement", "Measurement"],
    image: "assets/project-signal.svg",
    imageAlt: {
      ja: "微小な信号の計測を表現したプロジェクトビジュアル",
      en: "Project visual representing the measurement of subtle signals",
    },
    background: {
      ja: "マイクロサッケードは固視中に生じる微小かつ高速な眼球運動で、注意や意思決定との関連からVR・ARにおける意図推定などへの応用が期待されています。",
      en: "Microsaccades are minute, rapid eye movements during visual fixation. Their relationship with attention and decision making may support intent estimation in VR and AR.",
    },
    challenge: {
      ja: "計測には高い時間・空間分解能が必要で、既存の装置は大型・高コストになりやすいという課題があります。",
      en: "Measurement requires high temporal and spatial resolution, while existing equipment tends to be large and costly.",
    },
    contribution: {
      ja: "第一著者として、光学式マウスセンサを応用した計測手法を共同研究者とまとめ、第31回日本バーチャルリアリティ学会大会で発表予定です。",
      en: "As first author, I worked with collaborators to present a measurement method based on an optical mouse sensor at the 31st Annual Conference of the Virtual Reality Society of Japan.",
    },
    method: {
      ja: "眼球表面の変位量を取得する計測部を開発し、疑似眼球を用いた評価によって取得可能性と今後の課題を検討しました。",
      en: "We developed a sensing unit for eye-surface displacement and evaluated it using an artificial eye to examine feasibility and remaining challenges.",
    },
    outcome: {
      ja: "研究成果を講演番号3E1-09として、2026年9月8日に口頭発表・ポスター発表する予定です。",
      en: "The work is scheduled for oral and poster presentation as paper 3E1-09 on September 8, 2026.",
    },
    links: [
      {
        label: { ja: "大会プログラム", en: "Conference program" },
        url: "https://www.conference.vrsj.org/ac2026/program/program-flash03.html",
      },
    ],
    featured: true,
    draft: false,
    visible: true,
  },
  {
    slug: "presentation-timer",
    title: { ja: "発表進行タイマー", en: "Presentation Timer" },
    summary: {
      ja: "学会・研究会・LT会向けに、操作画面と配信画面を分離したプレゼンテーションタイマーです。",
      en: "A presentation timer for conferences, seminars, and lightning talks with separate operator and broadcast views.",
    },
    category: "WEB TOOL / REACT",
    date: "2026",
    technologies: ["React 19", "TypeScript", "Vite", "GitHub Pages"],
    image: "assets/project-relay.svg",
    imageAlt: {
      ja: "複数画面の同期を表現したプロジェクトビジュアル",
      en: "Project visual representing synchronized displays",
    },
    background: {
      ja: "学会、研究会、LT会などで、登壇者に見せる情報と配信に載せる情報を分けながら進行を管理する用途を想定して制作しました。",
      en: "Built for conferences, seminars, and lightning talks where the operator needs to manage timing separately from the display shown on stream.",
    },
    challenge: {
      ja: "配信画面に操作UIを映さず、複数の画面で残り時間と進行状態をリアルタイムに揃えることが課題でした。",
      en: "The main challenge was keeping time and presentation state synchronized across windows without exposing operator controls on the broadcast view.",
    },
    contribution: {
      ja: "画面構成、タイマー操作、表示比率、通知音、レスポンシブ表示を含むWebアプリケーションを設計・実装しました。",
      en: "Designed and implemented the web application, including separate views, timer controls, display ratios, notification sounds, and responsive layouts.",
    },
    method: {
      ja: "React 19、TypeScript、Viteで構成し、操作画面と配信画面の分離、リアルタイム同期、ベル時刻の設定に対応しました。",
      en: "Implemented with React 19, TypeScript, and Vite, supporting separate control and broadcast windows, real-time synchronization, and configurable bell timings.",
    },
    outcome: {
      ja: "静的WebアプリとしてGitHub Pagesで公開し、Discord配信やOBSで利用できる構成にしました。",
      en: "Published as a static GitHub Pages app designed for use with Discord streaming and OBS.",
    },
    links: [
      {
        label: { ja: "デモを開く", en: "Open demo" },
        url: "https://sse-c-553.github.io/presentation-timer/",
      },
      {
        label: { ja: "GitHubリポジトリ", en: "GitHub repository" },
        url: "https://github.com/SSE-C-553/presentation-timer",
      },
    ],
    featured: true,
    draft: false,
    visible: true,
  },
  {
    slug: "ny-pulse-2026",
    title: { ja: "ぱるすで福笑い", en: "Pulse Fukuwarai" },
    summary: {
      ja: "2026年の年賀状に添えた、顔のパーツを動かして遊ぶブラウザ向け福笑いゲームです。",
      en: "A browser-based fukuwarai face-arrangement game created for a 2026 New Year's card.",
    },
    category: "WEB GAME / CANVAS",
    date: "2025–2026",
    technologies: ["TypeScript", "Vite", "Canvas", "Touch UI"],
    image: "assets/project-quiet.svg",
    imageAlt: {
      ja: "ブラウザゲームを表現したプロジェクトビジュアル",
      en: "Project visual representing a browser game",
    },
    background: {
      ja: "紙の年賀状からアクセスして遊べる小さなデジタル体験として、2026年向けに制作しました。",
      en: "Created as a small digital experience that recipients could open from a physical New Year's card for 2026.",
    },
    challenge: {
      ja: "PCとスマートフォンのどちらでも、顔のパーツを直感的に選択・移動できる操作性が必要でした。",
      en: "The interaction needed to make selecting and moving facial parts intuitive on both desktop and mobile devices.",
    },
    contribution: {
      ja: "キャラクター選択、パーツのドラッグ操作、採点、リトライまでの一連のゲーム体験を実装しました。",
      en: "Implemented the full game flow from character selection and drag interaction through scoring and retry.",
    },
    method: {
      ja: "TypeScriptとViteを用い、マウス・タッチ操作の両方に対応したCanvasベースの画面を構成しました。",
      en: "Built with TypeScript and Vite around a Canvas-based interface that supports both mouse and touch input.",
    },
    outcome: {
      ja: "GitHub Pagesで公開し、インストール不要でスマートフォンから遊べるWebゲームにしました。",
      en: "Published on GitHub Pages as an install-free web game playable from a smartphone.",
    },
    links: [
      {
        label: { ja: "ゲームを開く", en: "Play the game" },
        url: "https://sse-c-553.github.io/NY-Pulse-2026/",
      },
      {
        label: { ja: "GitHubリポジトリ", en: "GitHub repository" },
        url: "https://github.com/SSE-C-553/NY-Pulse-2026",
      },
    ],
    featured: true,
    draft: false,
    visible: true,
  },
];
