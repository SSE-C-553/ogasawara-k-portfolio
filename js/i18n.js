let currentLanguage = "ja";
const reportedMissingTranslations = new WeakSet();

export const setLanguage = (language) => {
  currentLanguage = language === "en" ? "en" : "ja";
  document.documentElement.lang = currentLanguage;
};

export const getLanguage = () => currentLanguage;

export const messages = {
  ja: {
    skip: "本文へ移動",
    menu: "メニュー",
    close: "閉じる",
    navAria: "メインナビゲーション",
    languageAria: "言語選択",
    themeLight: "ライトテーマに切り替える",
    themeDark: "ダークテーマに切り替える",
    nav: {
      home: "ホーム",
      about: "私について",
      projects: "プロジェクト",
      publications: "論文・発表",
      news: "ニュース",
      contact: "お問い合わせ",
    },
    pages: {
      home: "ホーム",
      about: "私について",
      projects: "プロジェクト",
      project: "プロジェクト詳細",
      publications: "論文・発表",
      news: "ニュース",
      "news-detail": "ニュース詳細",
      contact: "お問い合わせ",
      "not-found": "ページが見つかりません",
    },
    common: {
      draft: "仮データ",
      current: "在籍中",
      viewAll: "すべて見る",
      details: "詳しく見る",
      external: "外部ページを開く",
      search: "検索",
      category: "カテゴリ",
      year: "年",
      all: "すべて",
      results: "件見つかりました",
      clear: "条件を解除",
      previous: "前へ",
      next: "次へ",
      page: "ページ",
      technologies: "使用技術",
      preparing: "掲載準備中",
    },
    footer: {
      note: "センシングの研究、制作、発表をまとめています。",
      navigation: "ページ",
      connect: "リンク",
    },
    home: {
      affiliationLabel: "所属",
      originLabel: "出身",
      about: "私について",
      projectsKicker: "RESEARCH & PROJECTS",
      projectsTitle: "研究・制作",
      publicationsKicker: "PUBLICATIONS",
      publicationsTitle: "論文・発表",
      newsKicker: "LATEST UPDATES",
      newsTitle: "最近のニュース",
      scan: "ANALYSIS ACTIVE",
      subject: "REGION OF INTEREST",
    },
    about: {
      kicker: "ABOUT",
      title: "私について",
      description: "所属、学び、技術、関心分野をまとめています。",
      portraitPending: "プロフィール写真を追加できます",
      intro: "自己紹介",
      profile: "プロフィール",
      name: "氏名",
      affiliation: "所属",
      origin: "出身",
      focus: "専門",
      career: "学歴と経歴",
      skills: "技術・スキル",
      interests: "主な関心",
      qualifications: "資格と受賞",
      extracurriculars: "課外活動",
    },
    projects: {
      kicker: "PROJECTS",
      title: "プロジェクト",
      description: "センシングに関する研究とWebツールなどの制作を紹介します。",
      searchPlaceholder: "タイトル、概要、技術で検索",
      tagLabel: "カテゴリ",
      emptyTitle: "条件に一致するプロジェクトがありません",
      emptyBody: "検索語や絞り込み条件を変更してください。",
      back: "プロジェクト一覧へ",
      period: "期間",
      status: "状態",
      published: "掲載中",
      narrative: {
        background: "背景",
        challenge: "課題",
        contribution: "担当",
        method: "手法",
        outcome: "成果",
      },
      missing: "指定されたプロジェクトが見つかりません。",
    },
    publications: {
      kicker: "PUBLICATIONS",
      title: "論文・発表",
      description: "論文、学会発表、ポスター発表の記録です。",
      searchPlaceholder: "タイトル、著者、発表先で検索",
      type: "種別",
      peer: "査読",
      reviewed: "査読付き",
      notReviewed: "査読なし",
      emptyTitle: "論文・発表は掲載準備中です",
      emptyBody: "本人確認済みの書誌情報だけを掲載します。",
      noMatchTitle: "条件に一致する項目がありません",
      total: "総掲載数",
      years: "対象年",
      types: {
        journal: "ジャーナル",
        conference: "学会発表",
        poster: "ポスター",
        thesis: "学位論文",
        talk: "講演",
      },
    },
    news: {
      kicker: "NEWS",
      title: "ニュース",
      description: "研究、発表、受賞、制作物の更新情報です。",
      searchPlaceholder: "ニュースを検索",
      emptyTitle: "条件に一致するニュースがありません",
      emptyBody: "検索語や絞り込み条件を変更してください。",
      categories: {
        research: "研究",
        presentation: "発表",
        activity: "活動",
        award: "受賞",
        release: "公開",
      },
      back: "ニュース一覧へ",
    },
    contact: {
      kicker: "CONTACT",
      title: "お問い合わせ",
      description: "制作、研究、共同活動についての連絡をお待ちしています。",
      heading: "連絡先",
      email: "メール",
      location: "所在地",
      locationValue: "北海道",
      topics: "連絡できる内容",
      topicsValue: "研究、制作、共同活動",
      copy: "メールアドレスをコピー",
      copied: "メールアドレスをコピーしました",
    },
    notFound: {
      title: "ページが見つかりません",
      body: "URLを確認するか、ホームへ戻ってください。",
      home: "ホームへ戻る",
    },
    meta: {
      description: "苫小牧高専専攻科でセンシングを研究する小笠原圭吾のプロフィール、プロジェクト、発表、ニュースを紹介するポートフォリオ。",
    },
  },
  en: {
    skip: "Skip to content",
    menu: "Menu",
    close: "Close",
    navAria: "Main navigation",
    languageAria: "Language selection",
    themeLight: "Switch to light theme",
    themeDark: "Switch to dark theme",
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      publications: "Publications",
      news: "News",
      contact: "Contact",
    },
    pages: {
      home: "Home",
      about: "About",
      projects: "Projects",
      project: "Project",
      publications: "Publications",
      news: "News",
      "news-detail": "News",
      contact: "Contact",
      "not-found": "Not Found",
    },
    common: {
      draft: "Placeholder",
      current: "Current",
      viewAll: "View all",
      details: "View details",
      external: "Open external page",
      search: "Search",
      category: "Category",
      year: "Year",
      all: "All",
      results: "results",
      clear: "Clear filters",
      previous: "Previous",
      next: "Next",
      page: "Page",
      technologies: "Technologies",
      preparing: "Coming soon",
    },
    footer: {
      note: "Sensing research, projects, and presentations.",
      navigation: "Pages",
      connect: "Connect",
    },
    home: {
      affiliationLabel: "Affiliation",
      originLabel: "From",
      about: "About me",
      projectsKicker: "RESEARCH & PROJECTS",
      projectsTitle: "Research & projects",
      publicationsKicker: "PUBLICATIONS",
      publicationsTitle: "Publications",
      newsKicker: "LATEST UPDATES",
      newsTitle: "Recent news",
      scan: "ANALYSIS ACTIVE",
      subject: "REGION OF INTEREST",
    },
    about: {
      kicker: "ABOUT",
      title: "About me",
      description: "My background, education, skills, and current interests.",
      portraitPending: "Portrait can be added here",
      intro: "Introduction",
      profile: "Profile",
      name: "Name",
      affiliation: "Affiliation",
      origin: "From",
      focus: "Focus",
      career: "Education and career",
      skills: "Technical skills",
      interests: "Areas of interest",
      qualifications: "Qualifications and awards",
      extracurriculars: "Activities",
    },
    projects: {
      kicker: "PROJECTS",
      title: "Projects",
      description: "Sensing research and projects including web tools.",
      searchPlaceholder: "Search titles, summaries, or technologies",
      tagLabel: "Category",
      emptyTitle: "No projects match these filters",
      emptyBody: "Try changing the search query or filter options.",
      back: "Back to projects",
      period: "Period",
      status: "Status",
      published: "Published",
      narrative: {
        background: "Background",
        challenge: "Challenge",
        contribution: "Contribution",
        method: "Method",
        outcome: "Outcome",
      },
      missing: "The requested project could not be found.",
    },
    publications: {
      kicker: "PUBLICATIONS",
      title: "Publications",
      description: "Journal papers, conference presentations, and posters.",
      searchPlaceholder: "Search titles, authors, or venues",
      type: "Type",
      peer: "Review",
      reviewed: "Peer reviewed",
      notReviewed: "Not reviewed",
      emptyTitle: "Publications are being prepared",
      emptyBody: "Only verified bibliographic records will be published here.",
      noMatchTitle: "No publications match these filters",
      total: "Total",
      years: "Years",
      types: {
        journal: "Journal",
        conference: "Conference",
        poster: "Poster",
        thesis: "Thesis",
        talk: "Talk",
      },
    },
    news: {
      kicker: "NEWS",
      title: "News",
      description: "Updates about research, presentations, awards, and releases.",
      searchPlaceholder: "Search news",
      emptyTitle: "No news matches these filters",
      emptyBody: "Try changing the search query or filter options.",
      categories: {
        research: "Research",
        presentation: "Presentation",
        activity: "Activity",
        award: "Award",
        release: "Release",
      },
      back: "Back to news",
    },
    contact: {
      kicker: "CONTACT",
      title: "Contact",
      description: "Get in touch about projects, research, or collaboration.",
      heading: "Contact details",
      email: "Email",
      location: "Location",
      locationValue: "Hokkaido, Japan",
      topics: "Topics",
      topicsValue: "Research, projects, and collaboration",
      copy: "Copy email address",
      copied: "Email address copied",
    },
    notFound: {
      title: "Page not found",
      body: "Check the URL or return to the home page.",
      home: "Back to home",
    },
    meta: {
      description: "Keigo Ogasawara’s portfolio featuring sensing research at KOSEN Tomakomai College, projects, publications, profile, and news.",
    },
  },
};

export const t = (key) =>
  key.split(".").reduce((value, part) => value?.[part], messages[currentLanguage]) ?? key;

export const localize = (value) => {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const requested = value[currentLanguage];
    const hasRequestedValue = typeof requested === "string" ? requested.trim() : requested != null;

    if (!hasRequestedValue && !reportedMissingTranslations.has(value)) {
      reportedMissingTranslations.add(value);
      console.warn(`[i18n] Missing ${currentLanguage} translation; using a fallback.`, value);
    }

    return hasRequestedValue ? requested : value.ja || value.en || "";
  }

  return value ?? "";
};

export const formatDate = (value) => {
  if (!value || value.includes("X")) return value || "";

  const parts = value.split("-");
  const year = Number(parts[0]);
  const month = Number(parts[1] || 1);
  const day = Number(parts[2] || 0);

  if (currentLanguage === "ja") {
    return day ? `${year}年${month}月${day}日` : `${year}年${month}月`;
  }

  const options = day
    ? { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" }
    : { year: "numeric", month: "short", timeZone: "UTC" };
  return new Intl.DateTimeFormat("en", options).format(
    new Date(Date.UTC(year, month - 1, day || 1)),
  );
};
