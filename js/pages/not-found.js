import { t } from "../i18n.js";
import {
  containerClass,
  escapeHTML,
  icon,
  localizedRoute,
} from "../components/common.js";

export const renderNotFound = (message = t("notFound.body")) => `
  <section class="${containerClass} grid min-h-[65vh] place-items-center py-20 text-center">
    <div data-reveal>
      <span class="mx-auto grid size-16 place-items-center rounded-[14px] bg-accent-soft font-display text-lg font-semibold text-accent">404</span>
      <h1 class="mt-6 font-display text-4xl font-semibold tracking-[-0.04em]" tabindex="-1">${escapeHTML(t("notFound.title"))}</h1>
      <p class="mt-3 text-sm leading-7 text-muted">${escapeHTML(message)}</p>
      <a class="mt-7 inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-canvas hover:bg-accent" href="${localizedRoute("home")}" data-route>${escapeHTML(t("notFound.home"))}${icon("arrowRight", "size-4")}</a>
    </div>
  </section>
`;
