/*
 * このファイルを書き換えると、サイト内のプロフィールと作品情報が更新されます。
 * link が未公開の場合は "#" のままで構いません。
 */
window.PORTFOLIO_CONTENT = {
  profile: {
    name: "YOUR NAME",
    monogram: "YN",
    role: "Designer & Developer",
    location: "Tokyo, Japan",
    status: "AVAILABLE",
    email: "hello@example.com",
    intro:
      "体験を整理し、手触りのある形へ。企画・デザイン・実装を横断して、使う人に届くプロダクトをつくります。",
    about:
      "つくること自体を目的にせず、誰のどんな状況を変えたいのかから考えます。曖昧なアイデアを構造に変え、小さく試しながら、長く使える品質へ育てます。",
  },
  projects: [
    {
      title: "Signal Atlas",
      year: "2026",
      category: "PRODUCT / DATA",
      description:
        "散らばったセンサーデータを、現場ですぐ判断できる一枚のビューへ再設計した可視化ツール。",
      tags: ["UX設計", "UIデザイン", "フロントエンド"],
      image: "assets/project-signal.svg",
      imageAlt: "波形とデータポイントを表したSignal Atlasの抽象ビジュアル",
      link: "#",
    },
    {
      title: "Folio Relay",
      year: "2025",
      category: "WEB / IDENTITY",
      description:
        "更新の負担を減らし、制作の背景まで伝えられるようにしたクリエイター向けポートフォリオ。",
      tags: ["情報設計", "Webデザイン", "実装"],
      image: "assets/project-relay.svg",
      imageAlt: "カードと文字組みを表したFolio Relayの抽象ビジュアル",
      link: "#",
    },
    {
      title: "Quiet Log",
      year: "2025",
      category: "APP / RESEARCH",
      description:
        "記録を続ける心理的な負担を減らすため、入力体験を小さな単位から見直したログアプリ。",
      tags: ["リサーチ", "プロトタイプ", "デザインシステム"],
      image: "assets/project-quiet.svg",
      imageAlt: "時間の蓄積を表したQuiet Logの抽象ビジュアル",
      link: "#",
    },
  ],
  principles: [
    { label: "01 / FIND", text: "つくる前に、本当に解くべき課題を見つける。" },
    { label: "02 / SHAPE", text: "情報と体験を整理し、迷わない構造をつくる。" },
    { label: "03 / DELIVER", text: "実際に動くところまで仕上げ、学びを次へ返す。" },
  ],
  skills: [
    "Product Strategy",
    "UX Research",
    "UI Design",
    "Prototyping",
    "Frontend Development",
    "Design Systems",
  ],
  socials: [
    { label: "GitHub", url: "https://github.com/" },
    { label: "LinkedIn", url: "https://www.linkedin.com/" },
    { label: "X", url: "https://x.com/" },
  ],
};
