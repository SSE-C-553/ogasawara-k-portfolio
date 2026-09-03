export const profile = {
  name: { ja: "小笠原 圭吾", en: "Keigo Ogasawara" },
  brand: "Ogasawara Keigo",
  monogram: "KO",
  role: {
    ja: "専攻科生 / 画像処理",
    en: "Advanced course student / Image processing",
  },
  affiliation: {
    ja: "苫小牧高専 専攻科",
    en: "Advanced Course, Tomakomai National College of Technology",
  },
  origin: { ja: "北海道", en: "Hokkaido, Japan" },
  location: { ja: "北海道", en: "Hokkaido, Japan" },
  email: "okeigo1122@gmail.com",
  tagline: {
    ja: "画像から、意味のある変化を見つける。",
    en: "Finding meaningful change within images.",
  },
  shortBio: {
    ja: "北海道出身。苫小牧高専専攻科で学び、画像処理を軸に技術とものづくりへの理解を深めています。",
    en: "Based in Hokkaido, I study image processing at the Advanced Course of Tomakomai National College of Technology.",
  },
  fullBio: {
    ja: "苫小牧高専専攻科に所属し、画像処理を中心に学んでいます。画像から意味のある情報を取り出し、現実の課題に結び付ける技術に関心があります。具体的な研究テーマ、制作で大切にしていること、今後取り組みたい領域は、内容の確定後に追記します。",
    en: "I am an advanced-course student at Tomakomai National College of Technology, focusing on image processing. I am interested in extracting meaningful information from images and applying it to real-world problems. My specific research topic and future interests will be added once confirmed.",
  },
  portrait: "",
};

export const education = [
  {
    period: { ja: "在籍期間を入力", en: "Add attendance period" },
    organization: {
      ja: "苫小牧高専 専攻科",
      en: "Advanced Course, Tomakomai National College of Technology",
    },
    program: { ja: "専攻名を入力", en: "Add program name" },
    description: {
      ja: "所属する専攻と現在取り組んでいる研究内容を記載します。",
      en: "Add the program name and a summary of current research.",
    },
    current: true,
    draft: true,
    visible: true,
  },
  {
    period: { ja: "卒業または修了年月を入力", en: "Add graduation date" },
    organization: {
      ja: "苫小牧高専 本科",
      en: "Tomakomai National College of Technology",
    },
    program: { ja: "学科名を入力", en: "Add department name" },
    description: {
      ja: "本科で学んだ内容、卒業研究、課外活動を記載します。",
      en: "Add coursework, graduation research, and extracurricular activities.",
    },
    current: false,
    draft: true,
    visible: true,
  },
];

export const interests = [
  {
    title: { ja: "画像処理", en: "Image processing" },
    description: {
      ja: "画像から特徴や変化を捉える技術を中心に学んでいます。",
      en: "I study techniques for detecting features and changes in images.",
    },
    draft: false,
    visible: true,
  },
  {
    title: { ja: "研究テーマ", en: "Research focus" },
    description: {
      ja: "研究テーマの確定後に、対象と手法を具体的に記載します。",
      en: "The subject and methodology will be added after the research topic is confirmed.",
    },
    draft: true,
    visible: true,
  },
  {
    title: { ja: "今後の目標", en: "Future direction" },
    description: {
      ja: "取り組みたい技術領域や目標を記載します。",
      en: "Future technical interests and goals will be added here.",
    },
    draft: true,
    visible: true,
  },
];

export const skillGroups = [
  {
    key: "research",
    title: { ja: "研究スキル", en: "Research skills" },
    skills: [
      { name: { ja: "画像処理", en: "Image processing" }, draft: false },
    ],
  },
  {
    key: "languages",
    title: { ja: "言語", en: "Languages" },
    skills: [
      { name: "Python", draft: true },
      { name: "C / C++", draft: true },
    ],
  },
  {
    key: "tools",
    title: { ja: "ツール", en: "Tools" },
    skills: [
      { name: "OpenCV", draft: true },
      { name: "Git / GitHub", draft: true },
    ],
  },
];

export const qualifications = [];
export const extracurriculars = [];
