import { newsItems } from "../../data/news.js";
import { getYear, normalizeText, paginate, searchableText, uniqueOptions } from "../filters.js";
import { localize, t } from "../i18n.js";
import {
  containerClass,
  emptyState,
  filterPanel,
  pageHeader,
  pagination,
  resultCount,
} from "../components/common.js";
import { newsCard } from "../components/news-card.js";

export const renderNews = (route) => {
  const source = newsItems.filter((item) => item.visible);
  const query = normalizeText(route.filters.q);
  const category = route.filters.category;
  const year = route.filters.year;

  const filtered = source.filter((item) => {
    const matchesQuery =
      !query ||
      searchableText(item.title.ja, item.title.en, item.summary.ja, item.summary.en, localize(item.body), item.category).includes(query);
    const matchesCategory = !category || item.category === category;
    const matchesYear = !year || getYear(item.date) === year;
    return matchesQuery && matchesCategory && matchesYear;
  });

  const pageData = paginate(filtered, route.filters.p, 9);
  const categoryOptions = uniqueOptions(source.map((item) => item.category)).map((value) => ({
    value,
    label: t(`news.categories.${value}`),
  }));
  const yearOptions = uniqueOptions(source.map((item) => getYear(item.date))).map((value) => ({
    value,
    label: value,
  }));

  return `
    <section>
      ${pageHeader({
        kicker: t("news.kicker"),
        title: t("news.title"),
        description: t("news.description"),
      })}
      <div class="${containerClass} pb-12 sm:pb-16">
        ${filterPanel({
          count: source.length,
          active: Boolean(query || category || year),
          query: route.filters.q,
          searchPlaceholder: t("news.searchPlaceholder"),
          selects: [
            {
              name: "category",
              label: t("common.category"),
              value: category,
              options: categoryOptions,
            },
            {
              name: "year",
              label: t("common.year"),
              value: year,
              options: yearOptions,
            },
          ],
        })}
        ${query || category || year ? resultCount(filtered.length) : ""}
        ${
          pageData.items.length
            ? `<div class="border-t border-line">${pageData.items.map((item) => newsCard(item)).join("")}</div>`
            : emptyState({
                title: t("news.emptyTitle"),
                body: t("news.emptyBody"),
                showClear: Boolean(query || category || year),
              })
        }
        ${pagination(pageData)}
      </div>
    </section>
  `;
};
