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
      about: "プロフィール",
      projects: "研究・制作",
      publications: "発表",
      news: "活動記録",
      contact: "連絡先",
    },
    pages: {
      home: "ホーム",
      about: "プロフィール",
      projects: "研究・制作",
      project: "研究・制作の詳細",
      publications: "発表",
      news: "活動記録",
      "news-detail": "活動記録の詳細",
      contact: "連絡先",
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
      filter: "検索・絞り込み",
      originalSource: "出典・関連リンク",
      relatedProject: "関連する研究・制作",
      skillExamples: "使用例",
      previous: "前へ",
      next: "次へ",
      page: "ページ",
      technologies: "使用技術",
      preparing: "掲載準備中",
    },
    footer: {
      note: "小笠原圭吾の研究・制作と活動記録。",
      navigation: "ページ",
      connect: "リンク",
    },
    home: {
      field: "IMAGE PROCESSING / HOKKAIDO",
      affiliationLabel: "所属",
      originLabel: "出身",
      about: "プロフィール",
      projectsKicker: "SELECTED PROJECTS",
      viewProjects: "研究・制作の一覧",
      projectsTitle: "研究・制作",
      publicationsKicker: "PUBLICATIONS",
      publicationsTitle: "発表",
      newsKicker: "LATEST UPDATES",
      newsTitle: "活動記録",
      worksIntro: "眼球運動の計測に関する研究と、Webアプリの制作。",
      profileLink: "プロフィール・経歴",
      researchLabel: "研究",
      creationsLabel: "Web制作",
      updatesLink: "活動記録の一覧",
      relatedPublications: "関連する発表",
    },
    about: {
      kicker: "ABOUT",
      title: "プロフィール",
      description: "所属、経歴、研究分野について。",
      portraitPending: "プロフィール写真を追加できます",
      intro: "自己紹介",
      profile: "プロフィール",
      name: "氏名",
      affiliation: "所属",
      origin: "出身",
      focus: "専門",
      career: "経歴",
      skills: "使用技術",
      interests: "主な関心",
      qualifications: "受賞",
      sections: "プロフィールの項目",
      extracurriculars: "課外活動",
    },
    projects: {
      kicker: "PROJECTS",
      title: "研究・制作",
      description: "眼球運動の計測に関する研究と、Webアプリの制作。",
      searchPlaceholder: "名前、概要、技術で検索",
      tagLabel: "タグ",
      emptyTitle: "条件に一致する項目がありません",
      emptyBody: "検索語や絞り込み条件を変更してください。",
      back: "研究・制作の一覧へ",
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
      missing: "指定された研究・制作が見つかりません。",
    },
    publications: {
      kicker: "PUBLICATIONS",
      title: "発表",
      description: "学会での発表と関連資料。",
      searchPlaceholder: "タイトル、著者、発表先で検索",
      type: "種別",
      peer: "査読",
      reviewed: "査読付き",
      notReviewed: "査読なし",
      emptyTitle: "掲載している発表はありません",
      emptyBody: "研究内容は「研究・制作」からご覧いただけます。",
      noMatchTitle: "条件に一致する項目がありません",
      noMatchBody: "検索語や絞り込み条件を変更してください。",
      program: "大会プログラム",
      translatedTitle: "英語題目は日本語題目の翻訳です。",
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
      title: "活動記録",
      description: "発表、受賞、制作物の公開など。",
      searchPlaceholder: "活動記録を検索",
      emptyTitle: "条件に一致する記録がありません",
      emptyBody: "検索語や絞り込み条件を変更してください。",
      categories: {
        research: "研究",
        presentation: "発表",
        activity: "活動",
        award: "受賞",
        release: "公開",
      },
      back: "活動記録の一覧へ",
    },
    contact: {
      kicker: "CONTACT",
      title: "連絡先",
      description: "ご連絡はメールでお願いします。",
      heading: "連絡先",
      email: "メール",
      location: "所在地",
      locationValue: "北海道",
      topics: "主な分野",
      topicsValue: "研究、制作、共同活動",
      copy: "メールアドレスをコピー",
      copied: "メールアドレスをコピーしました",
      copyFailed: "コピーできませんでした。表示されているメールアドレスを選択してコピーしてください。",
    },
    notFound: {
      title: "ページが見つかりません",
      body: "URLを確認するか、ホームへ戻ってください。",
      home: "ホームへ戻る",
    },
    meta: {
      description: "苫小牧高専専攻科・小笠原圭吾のポートフォリオ。眼球運動の計測に関する研究、Web制作、学会発表、経歴を掲載。",
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
      projects: "Research & projects",
      publications: "Publications",
      news: "Updates",
      contact: "Contact",
    },
    pages: {
      home: "Home",
      about: "About",
      projects: "Research & projects",
      project: "Project",
      publications: "Publications",
      news: "Updates",
      "news-detail": "Update",
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
      filter: "Search and filter",
      originalSource: "Sources and links",
      relatedProject: "Related project",
      skillExamples: "Used in",
      previous: "Previous",
      next: "Next",
      page: "Page",
      technologies: "Technologies",
      preparing: "Coming soon",
    },
    footer: {
      note: "Research, projects, and updates by Keigo Ogasawara.",
      navigation: "Pages",
      connect: "Connect",
    },
    home: {
      field: "IMAGE PROCESSING / HOKKAIDO",
      affiliationLabel: "Affiliation",
      originLabel: "From",
      about: "About",
      projectsKicker: "SELECTED PROJECTS",
      viewProjects: "All research & projects",
      projectsTitle: "Research & projects",
      publicationsKicker: "PUBLICATIONS",
      publicationsTitle: "Publications",
      newsKicker: "LATEST UPDATES",
      newsTitle: "Updates",
      worksIntro: "Research on eye-movement measurement and web application projects.",
      profileLink: "Profile & background",
      researchLabel: "Research",
      creationsLabel: "Web projects",
      updatesLink: "All updates",
      relatedPublications: "Related publications",
    },
    about: {
      kicker: "ABOUT",
      title: "About",
      description: "My background, education, and research interests.",
      portraitPending: "Portrait can be added here",
      intro: "Introduction",
      profile: "Profile",
      name: "Name",
      affiliation: "Affiliation",
      origin: "From",
      focus: "Focus",
      career: "Education and career",
      skills: "Technologies",
      interests: "Areas of interest",
      qualifications: "Awards",
      sections: "About-page sections",
      extracurriculars: "Activities",
    },
    projects: {
      kicker: "PROJECTS",
      title: "Research & projects",
      description: "Research on eye-movement measurement and web application projects.",
      searchPlaceholder: "Search titles, summaries, or technologies",
      tagLabel: "Tags",
      emptyTitle: "No projects match these filters",
      emptyBody: "Try changing the search query or filter options.",
      back: "Back to research & projects",
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
      description: "Conference presentations and related resources.",
      searchPlaceholder: "Search titles, authors, or venues",
      type: "Type",
      peer: "Review",
      reviewed: "Peer reviewed",
      notReviewed: "Not reviewed",
      emptyTitle: "No publications listed yet",
      emptyBody: "Explore my work on the Research & projects page.",
      noMatchTitle: "No publications match these filters",
      noMatchBody: "Try changing the search query or filter options.",
      program: "Conference program",
      translatedTitle: "Unofficial translation of the original Japanese title.",
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
      title: "Updates",
      description: "Updates about research, presentations, awards, and releases.",
      searchPlaceholder: "Search updates",
      emptyTitle: "No updates match these filters",
      emptyBody: "Try changing the search query or filter options.",
      categories: {
        research: "Research",
        presentation: "Presentation",
        activity: "Activity",
        award: "Award",
        release: "Release",
      },
      back: "Back to updates",
    },
    contact: {
      kicker: "CONTACT",
      title: "Contact",
      description: "You can reach me by email.",
      heading: "Contact details",
      email: "Email",
      location: "Location",
      locationValue: "Hokkaido, Japan",
      topics: "Areas of work",
      topicsValue: "Research, projects, and collaboration",
      copy: "Copy email address",
      copied: "Email address copied",
      copyFailed: "Copy failed. Please select and copy the email address shown on this page.",
    },
    notFound: {
      title: "Page not found",
      body: "Check the URL or return to the home page.",
      home: "Back to home",
    },
    meta: {
      description: "Keigo Ogasawara, an advanced-course student at Tomakomai KOSEN. Research on eye-movement measurement, web projects, publications, and background.",
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
