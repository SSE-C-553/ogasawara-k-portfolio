import { projects } from "../../data/projects.js";
import { publications } from "../../data/publications.js";
import { localize, t } from "../i18n.js";
import { containerClass, draftBadge, escapeHTML, icon, localizedRoute } from "../components/common.js";
import { publicationRow } from "../components/publication-row.js";
import { renderNotFound } from "./not-found.js";

export const renderProjectDetail = (projectId) => {
  const project = projects.find((item) => item.slug === projectId && item.visible);
  if (!project) return renderNotFound(t("projects.missing"));

  const research = project.kind === "research" || project.slug === "microsaccade-eye-displacement";
  const relatedPublications = publications.filter((item) => item.visible && item.projectSlug === project.slug);
  const narrative = research ? [
    [{ ja: "研究の背景", en: "Research context" }, [project.background, project.challenge]],
    [{ ja: "計測方法と評価", en: "Method & evaluation" }, [project.method, project.outcome]],
    [{ ja: "学会発表", en: "Conference presentation" }, [project.contribution]],
  ] : [
    [{ ja: "用途と機能", en: "Purpose & functionality" }, [project.background, project.challenge]],
    [{ ja: "実装と公開", en: "Implementation & release" }, [project.contribution, project.method, project.outcome]],
  ];

  return `<article class="reading-page ${containerClass} pb-14 pt-7 sm:pb-20 sm:pt-9">
    <div class="mx-auto max-w-[760px]">
      <a class="group inline-flex min-h-9 items-center gap-2 text-sm font-medium text-muted transition hover:text-accent" href="${localizedRoute("projects")}" data-route>
        <span class="rotate-180">${icon("arrowRight")}</span>${escapeHTML(t("projects.back"))}
      </a>
      <header class="pb-7 pt-5" data-reveal>
        <p class="text-sm text-muted">${escapeHTML(localize(project.categoryLabel) || project.category)}<span class="mx-3 text-line" aria-hidden="true">/</span>${escapeHTML(project.date)}</p>
        <h1 class="mt-3 font-display text-2xl font-semibold leading-relaxed tracking-[-0.025em] sm:text-3xl" tabindex="-1">${escapeHTML(localize(project.title))}</h1>
        ${draftBadge(project.draft)}
        <p class="mt-4 text-base leading-8">${escapeHTML(localize(project.summary))}</p>
        <ul class="mt-4 flex flex-wrap gap-x-4 gap-y-1" aria-label="${escapeHTML(t("common.technologies"))}">
          ${project.technologies.map((technology) => `<li class="text-sm leading-7 text-muted">${escapeHTML(technology)}</li>`).join("")}
        </ul>
        ${project.links.length ? `<div class="mt-4 flex flex-wrap gap-x-6 gap-y-2">${project.links.map((link) => `<a class="inline-flex min-h-9 items-center gap-2 text-sm font-medium text-accent underline decoration-line underline-offset-4 hover:decoration-accent" href="${escapeHTML(link.url)}" target="_blank" rel="noreferrer">${escapeHTML(localize(link.label))}${icon("arrowUpRight")}</a>`).join("")}</div>` : ""}
      </header>

      <figure class="mb-8" data-reveal>
        <div class="overflow-hidden rounded-md border border-line bg-white ${research ? "p-4 sm:p-6" : ""}">
          <img class="mx-auto max-h-[320px] w-full object-contain sm:max-h-[430px]" src="${escapeHTML(project.image)}" alt="${escapeHTML(localize(project.imageAlt))}" decoding="async" />
        </div>
        ${project.imageCredit ? `<figcaption class="mt-2 text-xs leading-6 text-muted">${project.imageSource ? `<a class="underline underline-offset-4 hover:text-accent" href="${escapeHTML(project.imageSource)}" target="_blank" rel="noreferrer">${escapeHTML(localize(project.imageCredit))}</a>` : escapeHTML(localize(project.imageCredit))}</figcaption>` : ""}
      </figure>

      <div class="divide-y divide-line border-t border-line">
        ${narrative.map(([title, paragraphs], index) => `<section class="py-7 sm:py-8" data-reveal>
          <h2 class="text-xl font-semibold leading-8">${escapeHTML(localize(title))}</h2>
          <div class="mt-4 space-y-4">${paragraphs.filter((body) => Boolean(localize(body))).map((body) => `<p class="text-base leading-8">${escapeHTML(localize(body))}</p>`).join("")}</div>
          ${research && index === narrative.length - 1 && relatedPublications.length ? `<div class="mt-5">${relatedPublications.map((item) => publicationRow(item, 3)).join("")}</div>` : ""}
        </section>`).join("")}
      </div>
    </div>
  </article>`;
};
