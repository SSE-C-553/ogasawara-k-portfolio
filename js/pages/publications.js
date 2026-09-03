import { publications } from "../../data/publications.js";
import { normalizeText, paginate, searchableText, uniqueOptions } from "../filters.js";
import { localize, t } from "../i18n.js";
import {
  containerClass,
  emptyState,
  filterBar,
  pageHeader,
  pagination,
  resultCount,
} from "../components/common.js";
import { publicationRow } from "../components/publication-row.js";

export const renderPublications = (route) => {
  const source = publications.filter((item) => item.visible !== false);
  const query = normalizeText(route.filters.q);
  const year = route.filters.year;
  const type = route.filters.type;
  const peer = route.filters.peer;

  const filtered = source.filter((item) => {
    const matchesQuery =
      !query ||
      searchableText(localize(item.title), item.authors, item.venue).includes(query);
    const matchesYear = !year || String(item.year) === year;
    const matchesType = !type || item.type === type;
    const matchesPeer =
      !peer ||
      (peer === "reviewed" && item.peerReviewed) ||
      (peer === "not-reviewed" && !item.peerReviewed);
    return matchesQuery && matchesYear && matchesType && matchesPeer;
  });

  const pageData = paginate(filtered, route.filters.p, 10);
  const yearOptions = uniqueOptions(source.map((item) => String(item.year))).map((value) => ({
    value,
    label: value,
  }));
  const typeOptions = uniqueOptions(source.map((item) => item.type)).map((value) => ({
    value,
    label: t(`publications.types.${value}`),
  }));
  const hasFilters = Boolean(query || year || type || peer);

  return `
    <section>
      ${pageHeader({
        kicker: t("publications.kicker"),
        title: t("publications.title"),
        description: t("publications.description"),
      })}
      <div class="${containerClass} pb-16 sm:pb-24">
        ${filterBar({
          query: route.filters.q,
          searchPlaceholder: t("publications.searchPlaceholder"),
          selects: [
            {
              name: "year",
              label: t("common.year"),
              value: year,
              options: yearOptions,
            },
            {
              name: "type",
              label: t("publications.type"),
              value: type,
              options: typeOptions,
            },
            {
              name: "peer",
              label: t("publications.peer"),
              value: peer,
              options: [
                { value: "reviewed", label: t("publications.reviewed") },
                { value: "not-reviewed", label: t("publications.notReviewed") },
              ],
            },
          ],
        })}
        ${source.length ? resultCount(filtered.length) : ""}
        ${
          pageData.items.length
            ? `<div class="border-t border-line">${pageData.items.map(publicationRow).join("")}</div>`
            : emptyState({
                title: source.length ? t("publications.noMatchTitle") : t("publications.emptyTitle"),
                body: t("publications.emptyBody"),
                showClear: source.length > 0 && hasFilters,
              })
        }
        ${pagination(pageData)}
        ${
          source.length
            ? `<dl class="mt-14 grid overflow-hidden rounded-[12px] border border-line bg-surface sm:grid-cols-2">
                <div class="p-6 sm:border-r sm:border-line"><dt class="text-xs font-semibold text-muted">${t("publications.total")}</dt><dd class="mt-2 font-display text-3xl font-semibold">${source.length}</dd></div>
                <div class="border-t border-line p-6 sm:border-t-0"><dt class="text-xs font-semibold text-muted">${t("publications.years")}</dt><dd class="mt-2 font-display text-3xl font-semibold">${yearOptions.length ? `${yearOptions.at(-1).value}–${yearOptions[0].value}` : "—"}</dd></div>
              </dl>`
            : ""
        }
      </div>
    </section>
  `;
};
