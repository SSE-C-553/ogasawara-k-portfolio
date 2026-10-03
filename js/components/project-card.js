import { localize, t } from "../i18n.js";
import { draftBadge, escapeHTML, icon, localizedRoute } from "./common.js";

export const projectCard = (project, headingLevel = 2) => {
  const headingTag = headingLevel === 3 ? "h3" : "h2";
  return `
    <article class="group flex overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-accent/50" data-reveal>
      <a class="flex w-full flex-col" href="${localizedRoute("project", { id: project.slug })}" data-route>
        ${project.image ? `<div class="aspect-[16/10] overflow-hidden border-b border-line bg-white p-2">
          <img class="size-full object-contain" src="${escapeHTML(project.image)}" alt="${escapeHTML(localize(project.imageAlt))}" width="1200" height="750" loading="lazy" decoding="async" />
        </div>` : ""}
        <div class="flex flex-1 flex-col p-5 sm:p-6">
          <div class="mb-3 flex flex-wrap items-center gap-2"><span class="text-xs font-semibold text-accent">${escapeHTML(localize(project.categoryLabel) || project.category)}</span>${draftBadge(project.draft)}</div>
          <${headingTag} class="font-display text-xl font-semibold leading-7 tracking-[-0.025em]">${escapeHTML(localize(project.title))}</${headingTag}>
          <p class="mb-5 mt-3 text-sm leading-7 text-muted">${escapeHTML(localize(project.summary))}</p>
          <div class="mt-auto flex items-center justify-between gap-4 border-t border-line pt-4">
            <time class="text-xs font-medium text-muted">${escapeHTML(project.date)}</time>
            <span class="inline-flex items-center gap-2 text-sm font-semibold text-accent">${escapeHTML(t("common.details"))}${icon("arrowRight", "size-4")}</span>
          </div>
        </div>
      </a>
    </article>`;
};
