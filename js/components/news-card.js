import { formatDate, localize } from "../i18n.js";
import { draftBadge, escapeHTML, icon, localizedRoute } from "./common.js";

export const newsCard = (item, headingLevel = 2) => {
  const headingTag = headingLevel === 3 ? "h3" : "h2";
  const hasBody = Boolean(localize(item.body));
  const href = hasBody ? localizedRoute("news-detail", { id: item.slug }) : item.relatedUrl;
  const external = !hasBody && Boolean(item.relatedUrl);
  const tag = href ? "a" : "div";
  return `<article class="border-b border-line" data-reveal>
    <${tag} class="group grid gap-1 py-4 sm:grid-cols-[126px_minmax(0,1fr)_16px] sm:gap-5" ${href ? `href="${escapeHTML(href)}" ${external ? 'target="_blank" rel="noreferrer"' : "data-route"}` : ""}>
      <time class="text-xs leading-7 text-muted" datetime="${escapeHTML(item.date)}">${escapeHTML(formatDate(item.date))}</time>
      <div class="min-w-0">
        <${headingTag} class="text-base font-medium leading-7 transition-colors group-hover:text-accent">${escapeHTML(localize(item.title))}</${headingTag}>
        ${draftBadge(item.draft)}
      </div>
      ${href ? `<span class="hidden self-center text-muted group-hover:text-accent sm:block">${icon(external ? "arrowUpRight" : "arrowRight")}</span>` : ""}
    </${tag}>
  </article>`;
};
