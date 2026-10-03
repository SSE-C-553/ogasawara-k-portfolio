import { getLanguage, localize, t } from "../i18n.js";
import { draftBadge, escapeHTML, icon } from "./common.js";

export const publicationRow = (publication, headingLevel = 2) => {
  const headingTag = headingLevel === 3 ? "h3" : "h2";
  const authors = publication.authors.map((author, index) =>
    index === publication.ownerAuthorIndex
      ? `<strong class="font-semibold text-ink">${escapeHTML(author)}</strong>`
      : escapeHTML(author),
  ).join(", ");
  const labels = { url: t("publications.program"), pdf: "PDF", doi: "DOI", slides: "Slides" };
  const links = Object.entries(publication.links || {}).filter(([, url]) => Boolean(url)).map(([type, url]) =>
    `<a class="inline-flex items-center gap-2 rounded-md border border-line px-3 py-2 text-xs font-semibold text-muted transition hover:border-accent hover:text-accent" href="${escapeHTML(url)}" target="_blank" rel="noreferrer">${escapeHTML(labels[type] || type)}${icon("arrowUpRight", "size-3.5")}</a>`,
  ).join("");
  return `<article class="border-b border-line py-6" data-reveal>
    <div class="flex flex-wrap items-center gap-2">
      <span class="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent">${escapeHTML(t(`publications.types.${publication.type}`))}</span>
      ${typeof publication.peerReviewed === "boolean" ? `<span class="rounded-full border border-line px-2.5 py-1 text-xs font-semibold text-muted">${escapeHTML(publication.peerReviewed ? t("publications.reviewed") : t("publications.notReviewed"))}</span>` : ""}
      ${draftBadge(publication.draft)}
    </div>
    <${headingTag} class="mt-3 text-lg font-semibold leading-8 tracking-[-0.02em]">${escapeHTML(localize(publication.title))}</${headingTag}>
    ${getLanguage() === "en" && publication.translatedTitle ? `<p class="mt-1 text-xs leading-6 text-muted">${escapeHTML(t("publications.translatedTitle"))}</p>` : ""}
    <p class="mt-2 text-sm leading-7 text-muted" lang="ja">${authors}</p>
    <p class="mt-1 text-sm leading-7 text-muted">${escapeHTML(localize(publication.venue))}, ${escapeHTML(publication.year)}</p>
    ${localize(publication.status) ? `<p class="mt-3 text-sm font-medium text-accent">${escapeHTML(localize(publication.status))}</p>` : ""}
    ${localize(publication.award) ? `<p class="mt-3 text-sm font-semibold text-draft">${escapeHTML(localize(publication.award))}</p>` : ""}
    ${links ? `<div class="mt-4 flex flex-wrap gap-2">${links}</div>` : ""}
  </article>`;
};
