import { projects } from "../../data/projects.js";
import { getYear, normalizeText, paginate, searchableText, uniqueOptions } from "../filters.js";
import { localize, t } from "../i18n.js";
import {
  containerClass,
  emptyState,
  filterBar,
  pageHeader,
  pagination,
  resultCount,
} from "../components/common.js";
import { projectCard } from "../components/project-card.js";

export const renderProjects = (route) => {
  const source = projects.filter((project) => project.visible);
  const query = normalizeText(route.filters.q);
  const category = route.filters.category;
  const year = route.filters.year;

  const filtered = source.filter((project) => {
    const matchesQuery =
      !query ||
      searchableText(
        localize(project.title),
        localize(project.summary),
        project.category,
        project.technologies,
      ).includes(query);
    const matchesCategory = !category || project.category === category;
    const matchesYear = !year || getYear(project.date) === year;
    return matchesQuery && matchesCategory && matchesYear;
  });

  const pageData = paginate(filtered, route.filters.p, 9);
  const categoryOptions = uniqueOptions(source.map((item) => item.category)).map((value) => ({
    value,
    label: value,
  }));
  const yearOptions = uniqueOptions(source.map((item) => getYear(item.date))).map((value) => ({
    value,
    label: value,
  }));

  return `
    <section>
      ${pageHeader({
        kicker: t("projects.kicker"),
        title: t("projects.title"),
        description: t("projects.description"),
      })}
      <div class="${containerClass} pb-16 sm:pb-24">
        ${filterBar({
          query: route.filters.q,
          searchPlaceholder: t("projects.searchPlaceholder"),
          selects: [
            {
              name: "category",
              label: t("projects.tagLabel"),
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
        ${resultCount(filtered.length)}
        ${
          pageData.items.length
            ? `<div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">${pageData.items.map((project) => projectCard(project)).join("")}</div>`
            : emptyState({
                title: t("projects.emptyTitle"),
                body: t("projects.emptyBody"),
                showClear: Boolean(query || category || year),
              })
        }
        ${pagination(pageData)}
      </div>
    </section>
  `;
};
