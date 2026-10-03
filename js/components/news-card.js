import { formatDate, localize, t } from "../i18n.js";
import { draftBadge, escapeHTML, icon, localizedRoute } from "./common.js";

export const newsCard = (item, headingLevel = 2) => {
  const headingTag = headingLevel === 3 ? "h3" : "h2";
  const category = t(`news.categories.${item.category}`);
  const external = Boolean(item.relatedUrl);
  const href = external
    ? item.relatedUrl
    : localize(item.body) ? localizedRoute("news-detail", { id: item.slug }) : "";
  const tag = href ? "a" : "div";
  const summary = localize(item.summary);

  return `<article class="news-row" data-reveal>
    <${tag} class="news-row-link" ${href ? `href="${escapeHTML(href)}" ${external ? 'target="_blank" rel="noreferrer"' : "data-route"}` : ""}>
      <time class="news-date" datetime="${escapeHTML(item.date)}">${escapeHTML(formatDate(item.date))}</time>
      <div class="news-content">
        <div class="news-meta">
          <span class="news-category">${escapeHTML(category)}</span>
          ${draftBadge(item.draft)}
        </div>
        <${headingTag} class="news-title">${escapeHTML(localize(item.title))}</${headingTag}>
        ${summary ? `<p class="news-summary">${escapeHTML(summary)}</p>` : ""}
      </div>
      ${href ? `<span class="news-arrow">${icon(external ? "arrowUpRight" : "arrowRight")}</span>` : ""}
    </${tag}>
  </article>`;
};
