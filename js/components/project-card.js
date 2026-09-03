import { localize, t } from "../i18n.js";
import { draftBadge, escapeHTML, icon, localizedRoute } from "./common.js";

export const projectCard = (project, headingLevel = 2) => {
  const headingTag = headingLevel === 3 ? "h3" : "h2";

  return `
  <article class="group overflow-hidden rounded-[12px] border border-line bg-surface transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card" data-reveal>
    <a class="block h-full" href="${localizedRoute("project", { id: project.slug })}" data-route aria-label="${escapeHTML(localize(project.title))}: ${escapeHTML(t("common.details"))}">
      <div class="roi-frame relative aspect-[16/10] overflow-hidden bg-canvas">
        <img class="size-full object-cover transition duration-500 group-hover:scale-[1.025]" src="${escapeHTML(project.image)}" alt="${escapeHTML(localize(project.imageAlt))}" />
        <span class="absolute left-4 top-4 rounded-full bg-surface/90 px-3 py-1.5 font-display text-[10px] font-semibold uppercase tracking-[0.12em] text-accent backdrop-blur">${escapeHTML(project.category)}</span>
      </div>
      <div class="p-5 sm:p-6">
        <div class="flex flex-wrap items-start justify-between gap-3">
          <${headingTag} class="font-display text-xl font-semibold tracking-[-0.025em]">${escapeHTML(localize(project.title))}</${headingTag}>
          ${draftBadge(project.draft)}
        </div>
        <p class="mt-3 line-clamp-3 text-sm leading-6 text-muted">${escapeHTML(localize(project.summary))}</p>
        <div class="mt-5 flex items-center justify-between gap-4 border-t border-line pt-4">
          <time class="font-mono text-[10px] font-bold tracking-wide text-muted">${escapeHTML(project.date)}</time>
          <span class="inline-flex items-center gap-2 text-xs font-semibold text-accent">${escapeHTML(t("common.details"))}${icon("arrowUpRight", "size-4")}</span>
        </div>
      </div>
    </a>
  </article>
`;
};
