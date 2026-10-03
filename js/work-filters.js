import { tagById } from "../data/tags.js";
import { getYears, matchesYear, normalizeText, searchableText } from "./filters.js";

export const parseTagIds = (value = "") => [...new Set(
  (Array.isArray(value) ? value : String(value).split(","))
    .map((id) => String(id).trim()).filter(Boolean),
)];

export const normalizeWorkFilters = (filters = {}) => ({
  q: String(filters.q || ""),
  category: String(filters.category || ""),
  year: String(filters.year || ""),
  kind: ["research", "creation"].includes(filters.kind) ? filters.kind : "",
  tags: parseTagIds(filters.tags),
  sort: ["newest", "oldest"].includes(filters.sort) ? filters.sort : "research-first",
});

const dateKey = (date, oldest = false) => {
  const years = getYears(date);
  if (!years.length) return 0;
  const isoDate = String(date).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoDate) return Number(isoDate.slice(1).join(""));
  return Number(oldest ? years[0] : years.at(-1)) * 10000;
};

export const filterWorks = (source, filters = {}) => {
  const state = normalizeWorkFilters(filters);
  const query = normalizeText(state.q);
  return source
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => {
      if (!project.visible) return false;
      const tagIds = project.tagIds || [];
      const matchesQuery = !query || searchableText(
        project.title.ja, project.title.en, project.summary.ja, project.summary.en,
        project.category, project.categoryLabel?.ja, project.categoryLabel?.en,
        project.technologies,
        tagIds.flatMap((id) => [tagById.get(id)?.label.ja, tagById.get(id)?.label.en]),
      ).includes(query);
      return matchesQuery && (!state.kind || project.kind === state.kind)
        && (!state.category || project.category === state.category)
        && matchesYear(project.date, state.year)
        && state.tags.every((id) => tagIds.includes(id));
    })
    .sort((a, b) => {
      if (state.sort === "research-first") {
        const kindDifference = Number(a.project.kind !== "research") - Number(b.project.kind !== "research");
        if (kindDifference) return kindDifference;
      }
      const oldest = state.sort === "oldest";
      const difference = dateKey(a.project.date, oldest) - dateKey(b.project.date, oldest);
      return (oldest ? difference : -difference) || a.index - b.index;
    })
    .map(({ project }) => project);
};
