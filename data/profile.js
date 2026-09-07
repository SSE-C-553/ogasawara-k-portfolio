export const profile = {
  name: { ja: "小笠原 圭吾", en: "Keigo Ogasawara" },
  brand: "Ogasawara Keigo",
  monogram: "KO",
  role: {
    ja: "専攻科生 / 画像処理・センシング",
    en: "Advanced course student / Image processing & sensing",
  },
  affiliation: {
    ja: "苫小牧工業高等専門学校 専攻科 創造工学専攻",
    en: "Advanced Course, National Institute of Technology (KOSEN), Tomakomai College",
  },
  origin: { ja: "北海道", en: "Hokkaido, Japan" },
  location: { ja: "北海道", en: "Hokkaido, Japan" },
  email: "okeigo1122@gmail.com",
  tagline: {
    ja: "小さな動きを、測れる情報へ。",
    en: "Turning subtle motion into measurable information.",
  },
  shortBio: {
    ja: "北海道出身。苫小牧高専専攻科で、画像処理とセンシングを軸に微小な眼球運動の計測手法を研究しています。",
    en: "Based in Hokkaido, I study image processing and sensing methods for measuring subtle eye movements at KOSEN Tomakomai College.",
  },
  fullBio: {
    ja: "北海道出身。苫小牧工業高等専門学校の本科（創造工学科 情報科学・工学系）を卒業後、同校専攻科の創造工学専攻へ進学しました。画像処理とセンシングを軸に、光学式マウスセンサを用いて眼球表面の微小な変位を取得する手法を研究しています。研究に加え、発表や配信の現場で使えるWebツールの設計・実装にも取り組んでいます。",
    en: "I am from Hokkaido and graduated from the Department of Engineering for Innovation, Computer Science and Engineering Program, at KOSEN Tomakomai College before continuing into its advanced course. My research explores a compact, low-cost method for acquiring subtle eye-surface displacement using an optical mouse sensor. I also design and build practical web tools for presentations and live events.",
  },
  portrait: "assets/profile-keigo-ogasawara.jpg",
};

export const education = [
  {
    period: { ja: "2025年4月 – 現在", en: "Apr. 2025 – Present" },
    organization: {
      ja: "苫小牧工業高等専門学校 専攻科",
      en: "National Institute of Technology (KOSEN), Tomakomai College — Advanced Course",
    },
    program: { ja: "創造工学専攻", en: "Advanced Course for Engineering for Innovation" },
    description: {
      ja: "画像処理・センシングを軸に、光学式マウスセンサを用いたマイクロサッケード検出に向けた眼球変位量の取得手法を研究しています。",
      en: "Researching an eye-displacement acquisition method using an optical mouse sensor, with the goal of detecting microsaccades.",
    },
    current: true,
    draft: false,
    visible: true,
  },
  {
    period: { ja: "2020年4月 – 2025年3月", en: "Apr. 2020 – Mar. 2025" },
    organization: {
      ja: "苫小牧工業高等専門学校 本科",
      en: "National Institute of Technology (KOSEN), Tomakomai College",
    },
    program: {
      ja: "創造工学科 情報科学・工学系",
      en: "Department of Engineering for Innovation, Computer Science and Engineering Program",
    },
    description: {
      ja: "プログラミングや情報工学を学び、チーム開発や実験を通じて課題整理・議論・問題解決の経験を積みました。2025年3月に卒業しました。",
      en: "Studied programming and information engineering, gaining experience in collaborative development, experimentation, discussion, and problem solving. Graduated in March 2025.",
    },
    current: false,
    draft: false,
    visible: true,
  },
];

export const interests = [
  {
    title: { ja: "微小眼球運動の計測", en: "Subtle eye-movement measurement" },
    description: {
      ja: "固視中に生じる微小な眼球運動を、より小型で低コストな構成で計測する方法を検討しています。",
      en: "Exploring compact, lower-cost ways to measure minute eye movements that occur during visual fixation.",
    },
    draft: false,
    visible: true,
  },
  {
    title: { ja: "画像処理・センシング", en: "Image processing & sensing" },
    description: {
      ja: "画像やセンサの信号から、現象を説明できる変位・特徴・変化を取り出す技術に関心があります。",
      en: "Interested in extracting interpretable displacement, features, and change from images and sensor signals.",
    },
    draft: false,
    visible: true,
  },
  {
    title: { ja: "研究を支えるWebツール", en: "Web tools for research" },
    description: {
      ja: "発表進行や配信など、研究・イベント運営の小さな不便を解消するツールを制作しています。",
      en: "Building small tools that improve presentation, streaming, and event workflows around research.",
    },
    draft: false,
    visible: true,
  },
];

export const skillGroups = [
  {
    key: "research",
    title: { ja: "研究・計測", en: "Research & measurement" },
    skills: [
      { name: { ja: "画像処理", en: "Image processing" }, draft: false },
      { name: { ja: "光学センシング", en: "Optical sensing" }, draft: false },
      { name: { ja: "眼球運動計測", en: "Eye-movement measurement" }, draft: false },
    ],
  },
  {
    key: "languages",
    title: { ja: "言語", en: "Languages" },
    skills: [
      { name: "TypeScript", draft: false },
      { name: "JavaScript", draft: false },
      { name: "Python", draft: false },
      { name: "C / C++", draft: false },
      { name: "HTML / CSS", draft: false },
    ],
  },
  {
    key: "tools",
    title: { ja: "Web・開発ツール", en: "Web & development tools" },
    skills: [
      { name: "React", draft: false },
      { name: "Vite", draft: false },
      { name: "Canvas API", draft: false },
      { name: "Git / GitHub", draft: false },
    ],
  },
];

export const qualifications = [
  {
    period: { ja: "2025年3月", en: "March 2025" },
    title: {
      ja: "情報処理学会北海道支部 工業高等専門学校奨励賞",
      en: "IPSJ Hokkaido Branch Technical College Encouragement Award",
    },
    organization: {
      ja: "情報処理学会 北海道支部",
      en: "Information Processing Society of Japan, Hokkaido Branch",
    },
    description: {
      ja: "2024年度の工業高等専門学校奨励賞受賞者として掲載されています。",
      en: "Listed as a recipient of the Hokkaido Branch Technical College Encouragement Award for fiscal year 2024.",
    },
    sourceLabel: { ja: "学校広報（PDF）", en: "College magazine (PDF)" },
    url: "https://www.tomakomai-ct.ac.jp/uploads/files/information/magazine/kosentsushin168.pdf",
    draft: false,
    visible: true,
  },
];

export const extracurriculars = [
  {
    period: { ja: "2023年12月", en: "December 2023" },
    title: { ja: "第4回 Startup Weekend 苫小牧", en: "4th Startup Weekend Tomakomai" },
    organization: { ja: "参加者", en: "Participant" },
    description: {
      ja: "3日間・54時間でアイデアを形にする起業体験イベントに、本科4年次の学生として参加しました。",
      en: "Participated as a fourth-year student in a 54-hour, three-day event focused on turning ideas into startup proposals.",
    },
    sourceLabel: { ja: "学校公式ニュース", en: "Official college news" },
    url: "https://www.tomakomai-ct.ac.jp/news/single/20702",
    draft: false,
    visible: true,
  },
];
