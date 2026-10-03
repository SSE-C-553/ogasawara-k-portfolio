import { publications } from "../../data/publications.js";
import { normalizeText, paginate, searchableText, uniqueOptions } from "../filters.js";
import { localize, t } from "../i18n.js";
import { containerClass, emptyState, filterPanel, pageHeader, pagination, resultCount } from "../components/common.js";
import { publicationRow } from "../components/publication-row.js";

export const renderPublications = (route) => {
  const source = publications.filter((item) => item.visible !== false);
  const query = normalizeText(route.filters.q);
  const { year, type, peer } = route.filters;
  const filtered = source.filter((item) =>
    (!query || searchableText(item.title.ja, item.title.en, item.authors, localize(item.venue)).includes(query)) &&
    (!year || String(item.year) === year) && (!type || item.type === type) &&
    (!peer || (peer === "reviewed" && item.peerReviewed === true) || (peer === "not-reviewed" && item.peerReviewed === false)),
  );
  const pageData = paginate(filtered, route.filters.p, 10);
  const hasFilters = Boolean(query || year || type || peer);
  const selects = [
    { name: "year", label: t("common.year"), value: year, options: uniqueOptions(source.map((item) => String(item.year))).map((value) => ({ value, label: value })) },
    { name: "type", label: t("publications.type"), value: type, options: uniqueOptions(source.map((item) => item.type)).map((value) => ({ value, label: t(`publications.types.${value}`) })) },
  ].filter((select) => select.options.length > 1 || select.value);
  if (source.some((item) => typeof item.peerReviewed === "boolean") || peer) {
    selects.push({ name: "peer", label: t("publications.peer"), value: peer, options: [
      { value: "reviewed", label: t("publications.reviewed") }, { value: "not-reviewed", label: t("publications.notReviewed") },
    ] });
  }
  return `<section>
    ${pageHeader({ title: t("publications.title"), description: t("publications.description") })}
    <div class="${containerClass} pb-12 sm:pb-16">
      ${source.length > 1 || hasFilters ? filterPanel({ count: source.length, active: hasFilters, query: route.filters.q, searchPlaceholder: t("publications.searchPlaceholder"), selects }) : ""}
      ${hasFilters ? resultCount(filtered.length) : ""}
      ${pageData.items.length ? `<div class="border-t border-line">${pageData.items.map((item) => publicationRow(item)).join("")}</div>` : emptyState({
        title: source.length ? t("publications.noMatchTitle") : t("publications.emptyTitle"),
        body: source.length ? t("publications.noMatchBody") : t("publications.emptyBody"),
        showClear: source.length > 0 && hasFilters,
      })}
      ${pagination(pageData)}
    </div>
  </section>`;
};
