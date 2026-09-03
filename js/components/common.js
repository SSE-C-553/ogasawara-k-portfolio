import { getLanguage, localize, t } from "../i18n.js";
import { routeUrl } from "../router.js";

export const containerClass = "mx-auto w-full max-w-[1120px] px-5 sm:px-8 lg:px-0";

export const escapeHTML = (value = "") =>
  String(value).replace(
    /[&<>'"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[character],
  );

export const icon = (name, className = "size-4") => {
  const icons = {
    arrowRight:
      '<path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>',
    arrowUpRight:
      '<path d="M7 17 17 7M8 7h9v9" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>',
    search:
      '<circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="1.75"/><path d="m16 16 4 4" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>',
    sun:
      '<circle cx="12" cy="12" r="3.5" stroke="currentColor" stroke-width="1.6"/><path d="M12 2.5v2M12 19.5v2M21.5 12h-2M4.5 12h-2M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4M18.7 18.7l-1.4-1.4M6.7 6.7 5.3 5.3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    moon:
      '<path d="M20 15.2A8.5 8.5 0 0 1 8.8 4a8.5 8.5 0 1 0 11.2 11.2Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
    menu:
      '<path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>',
    close:
      '<path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>',
    copy:
      '<rect x="8" y="8" width="11" height="11" rx="1.5" stroke="currentColor" stroke-width="1.6"/><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8" stroke="currentColor" stroke-width="1.6"/>',
    chevron:
      '<path d="m8 10 4 4 4-4" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>',
  };

  return `<svg class="${escapeHTML(className)}" viewBox="0 0 24 24" fill="none" aria-hidden="true">${icons[name] || ""}</svg>`;
};

export const localizedRoute = (page, extra = {}, hash = "") =>
  routeUrl(page, getLanguage(), extra, hash);

export const draftBadge = (draft) =>
  draft
    ? `<span class="inline-flex items-center rounded-full border border-draft/30 bg-draft-soft px-2.5 py-1 text-[10px] font-semibold text-draft">${escapeHTML(t("common.draft"))}</span>`
    : "";

export const pageHeader = ({ kicker, title, description }) => `
  <header class="${containerClass} pb-10 pt-12 text-center sm:pb-14 sm:pt-20" data-reveal>
    <p class="font-display text-xs font-semibold uppercase tracking-[0.2em] text-accent">${escapeHTML(kicker)}</p>
    <h1 class="mt-4 font-display text-4xl font-semibold tracking-[-0.045em] sm:text-5xl" tabindex="-1">${escapeHTML(title)}</h1>
    <p class="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">${escapeHTML(description)}</p>
  </header>
`;

export const sectionHeading = ({ kicker, title, href = "", linkLabel = "" }) => `
  <div class="mb-7 flex items-end justify-between gap-6 sm:mb-9" data-reveal>
    <div>
      <p class="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">${escapeHTML(kicker)}</p>
      <h2 class="mt-2 font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">${escapeHTML(title)}</h2>
    </div>
    ${
      href
        ? `<a class="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-accent" href="${escapeHTML(href)}" data-route>
            ${escapeHTML(linkLabel)} ${icon("arrowRight", "size-4 transition-transform group-hover:translate-x-1")}
          </a>`
        : ""
    }
  </div>
`;

export const emptyState = ({ title, body, showClear = false }) => `
  <div class="rounded-[12px] border border-dashed border-line bg-surface px-6 py-16 text-center" data-reveal>
    <span class="mx-auto grid size-12 place-items-center rounded-full bg-accent-soft font-display text-sm font-semibold text-accent">KO</span>
    <h2 class="mt-5 font-display text-xl font-semibold">${escapeHTML(title)}</h2>
    <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">${escapeHTML(body)}</p>
    ${
      showClear
        ? `<button class="mt-6 rounded-lg border border-line bg-surface px-4 py-2.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent" type="button" data-clear-filters>${escapeHTML(t("common.clear"))}</button>`
        : ""
    }
  </div>
`;

const optionsMarkup = (options, currentValue, allLabel) =>
  [
    `<option value="">${escapeHTML(allLabel)}</option>`,
    ...options.map(
      (option) =>
        `<option value="${escapeHTML(option.value)}" ${String(option.value) === String(currentValue) ? "selected" : ""}>${escapeHTML(option.label)}</option>`,
    ),
  ].join("");

export const filterBar = ({ query = "", searchPlaceholder, selects = [] }) => `
  <form class="mb-8 grid gap-3" data-filter-form role="search">
    <label class="relative block">
      <span class="sr-only">${escapeHTML(t("common.search"))}</span>
      <span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted">${icon("search", "size-[18px]")}</span>
      <input
        class="h-12 w-full rounded-lg border border-line bg-surface pl-12 pr-4 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent-soft"
        type="search"
        name="q"
        value="${escapeHTML(query)}"
        placeholder="${escapeHTML(searchPlaceholder)}"
        autocomplete="off"
        data-filter="q"
      />
    </label>
    ${
      selects.length
        ? `<div class="grid gap-3 sm:grid-cols-2 lg:flex">
            ${selects
              .map(
                (select) => `
                  <label class="relative block lg:min-w-44">
                    <span class="sr-only">${escapeHTML(select.label)}</span>
                    <select
                      class="h-11 w-full appearance-none rounded-lg border border-line bg-surface px-4 pr-10 text-sm text-ink outline-none transition focus:border-accent focus:ring-4 focus:ring-accent-soft"
                      name="${escapeHTML(select.name)}"
                      data-filter="${escapeHTML(select.name)}"
                    >
                      ${optionsMarkup(select.options, select.value, `${t("common.all")} · ${select.label}`)}
                    </select>
                    <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted">${icon("chevron", "size-4")}</span>
                  </label>
                `,
              )
              .join("")}
          </div>`
        : ""
    }
  </form>
`;

export const resultCount = (count) => `
  <p class="mb-6 text-center text-sm text-muted" aria-live="polite">
    <strong class="font-display font-semibold text-ink">${count}</strong>
    ${escapeHTML(t("common.results"))}
  </p>
`;

export const pagination = ({ page, totalPages }) => {
  if (totalPages <= 1) return "";

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return `
    <nav class="mt-10 flex items-center justify-center gap-2" aria-label="${escapeHTML(t("common.page"))}">
      <button class="rounded-lg border border-line bg-surface px-3 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40" type="button" data-page-number="${page - 1}" ${page === 1 ? "disabled" : ""}>${escapeHTML(t("common.previous"))}</button>
      ${pages
        .map(
          (number) =>
            `<button class="grid size-10 place-items-center rounded-lg border text-sm font-semibold ${number === page ? "border-accent bg-accent text-white" : "border-line bg-surface hover:border-accent"}" type="button" data-page-number="${number}" aria-current="${number === page ? "page" : "false"}">${number}</button>`,
        )
        .join("")}
      <button class="rounded-lg border border-line bg-surface px-3 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40" type="button" data-page-number="${page + 1}" ${page === totalPages ? "disabled" : ""}>${escapeHTML(t("common.next"))}</button>
    </nav>
  `;
};

export const renderText = (value) => escapeHTML(localize(value));
