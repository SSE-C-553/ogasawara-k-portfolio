export const tagGroups = [
  { id: "topic", label: { ja: "研究分野", en: "Research topics" } },
  { id: "use", label: { ja: "用途", en: "Applications" } },
  { id: "technology", label: { ja: "技術", en: "Technologies" } },
];

export const tags = [
  { id: "eye-movement", group: "topic", label: { ja: "眼球運動", en: "Eye movement" } },
  { id: "sensing", group: "topic", label: { ja: "センシング", en: "Sensing" } },
  { id: "presentation", group: "use", label: { ja: "発表支援", en: "Presentation tools" } },
  { id: "game", group: "use", label: { ja: "ゲーム", en: "Games" } },
  { id: "react", group: "technology", label: { ja: "React", en: "React" } },
  { id: "typescript", group: "technology", label: { ja: "TypeScript", en: "TypeScript" } },
  { id: "canvas", group: "technology", label: { ja: "Canvas", en: "Canvas" } },
];

export const tagById = new Map(tags.map((tag) => [tag.id, tag]));
