import { interests, profile } from "../../data/profile.js";
import { projects } from "../../data/projects.js";
import { publications } from "../../data/publications.js";
import { newsItems } from "../../data/news.js";
import { socialLinks } from "../../data/links.js";
import { getLanguage, localize, t } from "../i18n.js";
import {
  containerClass,
  escapeHTML,
  icon,
  localizedRoute,
  sectionHeading,
} from "../components/common.js";
import { projectCard } from "../components/project-card.js";
import { newsCard } from "../components/news-card.js";
import { publicationRow } from "../components/publication-row.js";

export const renderHome = () => {
  const featuredProjects = projects.filter((item) => item.visible && item.featured).slice(0, 3);
  const recentPublications = publications.filter((item) => item.visible !== false).slice(0, 3);
  const recentNews = newsItems.filter((item) => item.visible).slice(0, 3);
  const focusTags = interests.filter((item) => item.visible && !item.draft).map((item) => localize(item.title));
  const portrait = profile.homePortrait
    ? `<img class="size-full object-cover" src="${escapeHTML(profile.homePortrait)}" alt="${escapeHTML(localize(profile.name))}" width="1200" height="1200" fetchpriority="high" decoding="async" />`
    : `<div class="grid size-full place-items-center bg-accent-soft">
        <span class="font-display text-[clamp(5rem,12vw,9rem)] font-semibold tracking-[-0.09em] text-accent/20">KO</span>
      </div>`;

  return `
    <section class="border-b border-line bg-surface">
      <div class="${containerClass} home-intro-layout">
        <div class="home-portrait relative overflow-hidden rounded-[16px] border border-line bg-canvas p-2 shadow-card" data-reveal>
          <div class="relative aspect-square overflow-hidden rounded-[11px]">
            ${portrait}
          </div>
        </div>

        <div class="home-intro-name" data-reveal>
          <h1 class="font-display text-4xl font-semibold tracking-[-0.045em] sm:text-6xl" tabindex="-1">${escapeHTML(localize(profile.name))}</h1>
          ${getLanguage() === "ja" ? `<p class="mt-2 font-display text-base font-medium text-muted">${escapeHTML(profile.name.en)}</p>` : ""}
        </div>
        <div class="home-intro-content" data-reveal>
          <p class="max-w-xl text-sm leading-7 text-muted sm:text-base">${escapeHTML(localize(profile.shortBio))}</p>

          <dl class="home-facts mt-6 grid gap-4 border-y border-line py-5">
            <div>
              <dt class="text-xs font-semibold text-muted">${escapeHTML(t("home.affiliationLabel"))}</dt>
              <dd class="mt-1 text-sm font-medium">${(localize(profile.affiliationLines) || [localize(profile.affiliation)]).map((line, index) => `<span class="${index === 0 ? "block" : "block text-xs font-normal leading-5 text-muted"}">${escapeHTML(line)}</span>`).join("")}</dd>
            </div>
            <div>
              <dt class="text-xs font-semibold text-muted">${escapeHTML(t("home.originLabel"))}</dt>
              <dd class="mt-1 text-sm font-medium">${escapeHTML(localize(profile.origin))}</dd>
            </div>
          </dl>

          <div class="mt-6 flex flex-wrap gap-2">
            ${focusTags.map((tag) => `<span class="rounded-full bg-accent-soft px-3 py-1.5 text-xs font-semibold text-accent">${escapeHTML(tag)}</span>`).join("")}
          </div>

          <div class="mt-7 flex flex-wrap items-center gap-3">
            <a class="inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-canvas transition hover:bg-accent" href="${localizedRoute("about")}" data-route>${escapeHTML(t("home.about"))}${icon("arrowRight", "size-4")}</a>
            ${socialLinks
              .map(
                (link) =>
                  `<a class="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-3 text-sm font-semibold transition hover:border-accent hover:text-accent" href="${escapeHTML(link.url)}" target="_blank" rel="noreferrer">${escapeHTML(link.label)}${icon("arrowUpRight", "size-4")}</a>`,
              )
              .join("")}
          </div>
        </div>
      </div>
    </section>

    ${
      featuredProjects.length
        ? `<section class="${containerClass} py-16 sm:py-24">
            ${sectionHeading({
              kicker: t("home.projectsKicker"),
              title: t("home.projectsTitle"),
              href: localizedRoute("projects"),
              linkLabel: t("common.viewAll"),
            })}
            <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              ${featuredProjects.map((project) => projectCard(project, 3)).join("")}
            </div>
          </section>`
        : ""
    }

    ${
      recentPublications.length
        ? `<section class="border-y border-line bg-surface">
            <div class="${containerClass} py-16 sm:py-24">
              ${sectionHeading({
                kicker: t("home.publicationsKicker"),
                title: t("home.publicationsTitle"),
                href: localizedRoute("publications"),
                linkLabel: t("common.viewAll"),
              })}
              <div class="border-t border-line">${recentPublications.map(publicationRow).join("")}</div>
            </div>
          </section>`
        : ""
    }

    ${
      recentNews.length
        ? `<section class="${containerClass} py-16 sm:py-24">
            ${sectionHeading({
              kicker: t("home.newsKicker"),
              title: t("home.newsTitle"),
              href: localizedRoute("news"),
              linkLabel: t("common.viewAll"),
            })}
            <div class="news-list">${recentNews.map((item) => newsCard(item, 3)).join("")}</div>
          </section>`
        : ""
    }
  `;
};
