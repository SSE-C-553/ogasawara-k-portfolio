import { localize, t } from "../i18n.js";
import { draftBadge, escapeHTML, icon } from "./common.js";

const linkLabels = {
  url: "URL",
  pdf: "PDF",
  doi: "DOI",
  slides: "SLIDES",
};

export const publicationRow = (publication) => {
  const authors = publication.authors
    .map((author, index) =>
      index === publication.ownerAuthorIndex
        ? `<strong class="font-semibold text-ink">${escapeHTML(author)}</strong>`
        : escapeHTML(author),
    )
    .join(", ");

  const links = Object.entries(publication.links || {})
    .filter(([, url]) => Boolean(url))
    .map(
      ([type, url]) =>
        `<a class="inline-flex items-center gap-1 rounded-md border border-line bg-surface px-2.5 py-1.5 font-display text-[10px] font-semibold text-muted transition hover:border-accent hover:text-accent" href="${escapeHTML(url)}" target="_blank" rel="noreferrer">${linkLabels[type] || type.toUpperCase()}${icon("arrowUpRight", "size-3")}</a>`,
    )
    .join("");

  return `
    <article class="border-b border-line py-7" data-reveal>
      <div class="flex flex-wrap items-center gap-2">
        <span class="rounded-full bg-accent-soft px-2.5 py-1 font-display text-[10px] font-semibold text-accent">${escapeHTML(t(`publications.types.${publication.type}`))}</span>
        <span class="rounded-full border border-line px-2.5 py-1 text-[10px] font-semibold text-muted">${escapeHTML(publication.peerReviewed ? t("publications.reviewed") : t("publications.notReviewed"))}</span>
        ${draftBadge(publication.draft)}
      </div>
      <h2 class="mt-3 font-display text-lg font-semibold leading-7 tracking-[-0.02em] sm:text-xl">${escapeHTML(localize(publication.title))}</h2>
      <p class="mt-2 text-sm leading-6 text-muted">${authors}</p>
      <p class="mt-1 text-sm font-medium text-muted">${escapeHTML(publication.venue)}, ${escapeHTML(publication.year)}</p>
      ${localize(publication.award) ? `<p class="mt-3 text-sm font-semibold text-draft">${escapeHTML(localize(publication.award))}</p>` : ""}
      ${links ? `<div class="mt-4 flex flex-wrap gap-2">${links}</div>` : ""}
    </article>
  `;
};
