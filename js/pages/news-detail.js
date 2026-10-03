import { newsItems } from "../../data/news.js";
import { projects } from "../../data/projects.js";
import { formatDate, localize, t } from "../i18n.js";
import { containerClass, draftBadge, escapeHTML, icon, localizedRoute } from "../components/common.js";
import { renderNotFound } from "./not-found.js";

export const renderNewsDetail = (newsId) => {
  const item = newsItems.find((entry) => entry.slug === newsId && entry.visible);
  if (!item || !localize(item.body)) return renderNotFound();
  const project = projects.find((entry) => entry.visible && entry.slug === item.projectSlug);
  const paragraphs = localize(item.body).split(/\n\s*\n/).filter(Boolean);
  return `<article class="${containerClass} py-8 sm:py-12">
    <a class="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-accent" href="${localizedRoute("news")}" data-route><span class="rotate-180">${icon("arrowRight")}</span>${escapeHTML(t("news.back"))}</a>
    <div class="mx-auto max-w-3xl">
      <header class="pb-7 pt-8" data-reveal>
        <div class="flex flex-wrap gap-3 text-xs"><time class="font-medium text-muted" datetime="${escapeHTML(item.date)}">${escapeHTML(formatDate(item.date))}</time><span class="font-semibold text-accent">${escapeHTML(t(`news.categories.${item.category}`))}</span>${draftBadge(item.draft)}</div>
        <h1 class="mt-4 text-2xl font-semibold leading-normal tracking-[-0.025em] sm:text-3xl" tabindex="-1">${escapeHTML(localize(item.title))}</h1>
      </header>
      <div class="space-y-5 text-base leading-8 text-muted" data-reveal>${paragraphs.map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`).join("")}</div>
      ${project || item.relatedUrl ? `<aside class="mt-8 grid gap-4 border-t border-line pt-6">
        ${project ? `<a class="inline-flex items-center gap-2 text-sm font-semibold text-accent" href="${localizedRoute("project", { id: project.slug })}" data-route>${escapeHTML(t("common.relatedProject"))}: ${escapeHTML(localize(project.title))}${icon("arrowRight")}</a>` : ""}
        ${item.relatedUrl ? `<a class="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-accent" href="${escapeHTML(item.relatedUrl)}" target="_blank" rel="noreferrer">${escapeHTML(t("common.originalSource"))}${icon("arrowUpRight")}</a>` : ""}
      </aside>` : ""}
    </div>
  </article>`;
};
