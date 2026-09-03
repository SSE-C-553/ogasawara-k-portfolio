import { formatDate, localize, t } from "../i18n.js";
import { draftBadge, escapeHTML, icon, localizedRoute } from "./common.js";

const cardBody = (item, headingLevel) => {
  const headingTag = headingLevel === 3 ? "h3" : "h2";
  const category = t(`news.categories.${item.category}`);
  const image = item.image
    ? `<img class="size-full object-cover transition duration-500 group-hover:scale-[1.025]" src="${escapeHTML(item.image)}" alt="${escapeHTML(localize(item.imageAlt))}" />`
    : `<div class="news-placeholder size-full">
        <span class="font-display text-5xl font-semibold tracking-[-0.08em] text-accent/25">KO</span>
        <span class="absolute bottom-4 left-4 font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">${escapeHTML(category)}</span>
      </div>`;

  return `
    <div class="roi-frame relative aspect-[16/9] overflow-hidden bg-accent-soft">${image}</div>
    <div class="p-5 sm:p-6">
      <div class="flex flex-wrap items-center gap-3">
        <span class="font-display text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">${escapeHTML(category)}</span>
        ${draftBadge(item.draft)}
      </div>
      <${headingTag} class="mt-3 font-display text-lg font-semibold leading-7 tracking-[-0.02em]">${escapeHTML(localize(item.title))}</${headingTag}>
      <p class="mt-2 line-clamp-3 text-sm leading-6 text-muted">${escapeHTML(localize(item.summary))}</p>
      <div class="mt-5 flex items-center justify-between border-t border-line pt-4">
        <time class="font-mono text-[10px] font-bold tracking-wide text-muted" datetime="${escapeHTML(item.date)}">${escapeHTML(formatDate(item.date))}</time>
        ${item.relatedUrl || localize(item.body) ? icon("arrowUpRight", "size-4 text-accent") : ""}
      </div>
    </div>
  `;
};

export const newsCard = (item, headingLevel = 2) => {
  const body = cardBody(item, headingLevel);
  const cardClass = "group overflow-hidden rounded-[12px] border border-line bg-surface transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card";

  if (item.relatedUrl) {
    return `<article class="${cardClass}" data-reveal><a class="block h-full" href="${escapeHTML(item.relatedUrl)}" target="_blank" rel="noreferrer">${body}</a></article>`;
  }

  if (localize(item.body)) {
    return `<article class="${cardClass}" data-reveal><a class="block h-full" href="${localizedRoute("news-detail", { id: item.slug })}" data-route>${body}</a></article>`;
  }

  return `<article class="${cardClass}" data-reveal>${body}</article>`;
};
