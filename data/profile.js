export const profile = {
  name: { ja: "小笠原 圭吾", en: "Keigo Ogasawara" },
  brand: "Ogasawara Keigo",
  monogram: "KO",
  role: {
    ja: "専攻科生 / センシング",
    en: "Advanced course student / Sensing",
  },
  affiliation: {
    ja: "苫小牧工業高等専門学校 専攻科 創造工学専攻 情報エレクトロニクス系 先端情報エレクトロニクスコース",
    en: "National Institute of Technology (KOSEN), Tomakomai College — Advanced Course of Engineering for Innovation, Division of Electronics and Information Engineering, Advanced Electronics and Information Engineering Course",
  },
  // English program names follow the college's 2024 English guide, p. 14.
  // https://www.tomakomai-ct.ac.jp/uploads/files/information/magazine/youran2024_eng.pdf
  affiliationLines: {
    ja: [
      "苫小牧工業高等専門学校 専攻科",
      "創造工学専攻",
      "情報エレクトロニクス系",
      "先端情報エレクトロニクスコース",
    ],
    en: [
      "Advanced Engineering Course, NIT (KOSEN), Tomakomai College",
      "Advanced Course of Engineering for Innovation",
      "Division of Electronics and Information Engineering",
      "Advanced Electronics and Information Engineering Course",
    ],
  },
  origin: { ja: "北海道苫小牧市", en: "Tomakomai, Hokkaido, Japan" },
  interestAreas: {
    ja: "画像処理、センシング、視線計測、HCI",
    en: "Image processing, sensing, gaze measurement, HCI",
  },
  location: { ja: "北海道", en: "Hokkaido, Japan" },
  email: "okeigo1122@gmail.com",
  shortBio: {
    ja: "現在は苫小牧高専専攻科で、センシングを軸に研究しています。",
    en: "I currently study in the advanced course at KOSEN Tomakomai College, with a research focus on sensing.",
  },
  fullBio: {
    ja: "北海道苫小牧市出身。苫小牧工業高等専門学校の本科（創造工学科 情報科学・工学系）を卒業後、同校専攻科へ進学しました。現在はセンシングを軸に、光学式マウスセンサを用いて眼球表面の微小な変位を計測する手法を研究しています。研究に加え、発表や配信の現場で使えるWebツールの設計・実装にも取り組んでいます。",
    en: "I am from Tomakomai, Hokkaido, and graduated from the Department of Engineering for Innovation, Computer Science and Engineering Program, at KOSEN Tomakomai College before continuing into its advanced course. My current research focuses on sensing, particularly measuring minute eye-surface displacement using an optical mouse sensor. I also design and build web tools for presentations and live events.",
  },
  portrait: "assets/profile-keigo-ogasawara.jpg",
  homePortrait: "assets/home-keigo-ogasawara.jpg",
};

export const education = [
  {
    period: { ja: "2025年4月 – 現在", en: "Apr. 2025 – Present" },
    organization: {
      ja: "苫小牧工業高等専門学校 専攻科",
      en: "National Institute of Technology (KOSEN), Tomakomai College — Advanced Course",
    },
    program: {
      ja: "創造工学専攻 情報エレクトロニクス系 先端情報エレクトロニクスコース",
      en: "Advanced Course of Engineering for Innovation — Division of Electronics and Information Engineering, Advanced Electronics and Information Engineering Course",
    },
    description: {
      ja: "光学式マウスセンサを用いた眼球変位量取得手法の研究。マイクロサッケード検出に向けたセンシング技術の検討。",
      en: "Conducting sensing research on acquiring eye displacement using an optical mouse sensor, with the goal of detecting microsaccades.",
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
      ja: "プログラミング・情報工学の学習。チーム開発・実験を通じた課題整理・議論・問題解決の経験。2025年3月卒業。",
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
    title: { ja: "画像処理", en: "Image processing" },
    description: {
      ja: "画像から、変位・特徴・変化を取り出す技術に関心があります。",
      en: "Interested in extracting displacement, features, and changes from images.",
    },
    draft: false,
    visible: true,
  },
  {
    title: { ja: "センシング", en: "Sensing" },
    description: {
      ja: "センサの信号を用いて、対象の変位や変化を計測する技術に関心があります。",
      en: "Interested in using sensor signals to measure displacement and changes in an object.",
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
    visible: false,
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
    sources: [
      {
        label: { ja: "受賞者一覧（情報処理学会 北海道支部）", en: "Award recipients (IPSJ Hokkaido Branch)" },
        url: "https://hokkaido.ipsj.or.jp/pukiwiki/index.php?%E9%81%8E%E5%8E%BB%E3%81%AE%E5%8C%97%E6%B5%B7%E9%81%93%E6%94%AF%E9%83%A8%E5%A5%A8%E5%8A%B1%E8%B3%9E%E3%83%BB%E6%8A%80%E8%A1%93%E8%B3%9E%E5%8F%97%E8%B3%9E%E8%80%85%E4%B8%80%E8%A6%A7#e561a708",
      },
    ],
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
