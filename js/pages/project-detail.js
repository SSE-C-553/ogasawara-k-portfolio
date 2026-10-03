import { projects } from "../../data/projects.js";
import { localize, t } from "../i18n.js";
import {
  containerClass,
  draftBadge,
  escapeHTML,
  icon,
  localizedRoute,
} from "../components/common.js";
import { renderNotFound } from "./not-found.js";

export const renderProjectDetail = (projectId) => {
  const project = projects.find((item) => item.slug === projectId && item.visible);
  if (!project) return renderNotFound(t("projects.missing"));

  const narrative = [
    ["BACKGROUND", t("projects.narrative.background"), project.background],
    ["CHALLENGE", t("projects.narrative.challenge"), project.challenge],
    ["CONTRIBUTION", t("projects.narrative.contribution"), project.contribution],
    ["METHOD", t("projects.narrative.method"), project.method],
    ["OUTCOME", t("projects.narrative.outcome"), project.outcome],
  ];

  return `
    <article>
      <div class="${containerClass} pt-10 sm:pt-14">
        <a class="group inline-flex items-center gap-2 text-sm font-semibold text-muted transition hover:text-accent" href="${localizedRoute("projects")}" data-route>
          <span class="rotate-180">${icon("arrowRight", "size-4 transition-transform group-hover:-translate-x-1")}</span>
          ${escapeHTML(t("projects.back"))}
        </a>
      </div>

      <header class="${containerClass} grid gap-6 pb-10 pt-10 md:grid-cols-[1.1fr_0.9fr] md:items-end sm:pb-14" data-reveal>
        <div>
          <p class="font-display text-xs font-semibold uppercase tracking-[0.18em] text-accent">${escapeHTML(project.category)} / ${escapeHTML(project.date)}</p>
          <div class="mt-4 flex flex-wrap items-center gap-4">
            <h1 class="font-display text-4xl font-semibold leading-tight tracking-[-0.045em] sm:text-5xl" tabindex="-1">${escapeHTML(localize(project.title))}</h1>
            ${draftBadge(project.draft)}
          </div>
        </div>
        <p class="text-sm leading-7 text-muted sm:text-base">${escapeHTML(localize(project.summary))}</p>
      </header>

      <figure class="${containerClass} pb-12" data-reveal>
        <div class="${project.imageCredit ? "bg-white" : "roi-frame bg-surface"} overflow-hidden rounded-[16px] border border-line p-3 shadow-card">
          <img class="${project.imageCredit ? "mx-auto max-h-[520px] w-full object-contain" : "aspect-[16/8] size-full object-cover"} rounded-[11px]" src="${escapeHTML(project.image)}" alt="${escapeHTML(localize(project.imageAlt))}" />
        </div>
        ${project.imageCredit ? `<figcaption class="mt-3 text-xs leading-6 text-muted"><a class="underline underline-offset-4 hover:text-accent" href="${escapeHTML(project.imageSource)}" target="_blank" rel="noreferrer">${escapeHTML(localize(project.imageCredit))}</a></figcaption>` : ""}
      </figure>

      <div class="${containerClass} grid gap-10 pb-16 md:grid-cols-[0.55fr_1.45fr] sm:pb-24">
        <aside data-reveal>
          <dl class="divide-y divide-line border-y border-line">
            ${[
              [t("projects.period"), project.date],
              [t("common.category"), project.category],
              [t("projects.status"), project.draft ? t("common.draft") : t("projects.published")],
            ]
              .map(
                ([label, value]) => `
                  <div class="py-4">
                    <dt class="text-xs font-semibold text-muted">${escapeHTML(label)}</dt>
                    <dd class="mt-1 text-sm font-medium">${escapeHTML(value)}</dd>
                  </div>
                `,
              )
              .join("")}
          </dl>
          <h2 class="mt-7 text-xs font-semibold text-muted">${escapeHTML(t("common.technologies"))}</h2>
          <ul class="mt-3 flex flex-wrap gap-2">
            ${project.technologies.map((technology) => `<li class="rounded-full border border-line bg-surface px-3 py-2 text-xs font-semibold">${escapeHTML(technology)}</li>`).join("")}
          </ul>
          ${
            project.links.length
              ? `<div class="mt-7 grid gap-2">${project.links
                  .map(
                    (link) =>
                      `<a class="flex items-center justify-between rounded-lg border border-line bg-surface px-4 py-3 text-sm font-semibold transition hover:border-accent hover:text-accent" href="${escapeHTML(link.url)}" target="_blank" rel="noreferrer">${escapeHTML(localize(link.label))}${icon("arrowUpRight", "size-4")}</a>`,
                  )
                  .join("")}</div>`
              : ""
          }
        </aside>

        <div class="divide-y divide-line border-y border-line">
          ${narrative
            .map(
              ([kicker, title, body]) => `
                <section class="grid gap-4 py-7 sm:grid-cols-[135px_1fr]" data-reveal>
                  <div>
                    <p class="font-display text-[10px] font-semibold tracking-[0.16em] text-accent">${kicker}</p>
                    <h2 class="mt-2 font-display text-lg font-semibold">${escapeHTML(title)}</h2>
                  </div>
                  <p class="text-sm leading-7 text-muted">${escapeHTML(localize(body))}</p>
                </section>
              `,
            )
            .join("")}
        </div>
      </div>
    </article>
  `;
};
