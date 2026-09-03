import { newsItems } from "../../data/news.js";
import { formatDate, localize, t } from "../i18n.js";
import {
  containerClass,
  draftBadge,
  escapeHTML,
  icon,
  localizedRoute,
} from "../components/common.js";
import { renderNotFound } from "./not-found.js";

export const renderNewsDetail = (newsId) => {
  const item = newsItems.find((newsItem) => newsItem.slug === newsId && newsItem.visible);
  if (!item || !localize(item.body)) return renderNotFound();

  return `
    <article class="${containerClass} py-12 sm:py-20">
      <a class="group inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-accent" href="${localizedRoute("news")}" data-route>
        <span class="rotate-180">${icon("arrowRight", "size-4")}</span>${escapeHTML(t("news.back"))}
      </a>
      <header class="mx-auto max-w-3xl pb-10 pt-12 text-center" data-reveal>
        <div class="flex justify-center gap-3">
          <span class="font-display text-xs font-semibold uppercase tracking-[0.16em] text-accent">${escapeHTML(t(`news.categories.${item.category}`))}</span>
          ${draftBadge(item.draft)}
        </div>
        <h1 class="mt-5 font-display text-4xl font-semibold tracking-[-0.04em]" tabindex="-1">${escapeHTML(localize(item.title))}</h1>
        <time class="mt-4 block font-mono text-[10px] font-bold text-muted">${escapeHTML(formatDate(item.date))}</time>
      </header>
      <div class="mx-auto max-w-2xl text-base leading-8 text-muted" data-reveal>${escapeHTML(localize(item.body))}</div>
    </article>
  `;
};
