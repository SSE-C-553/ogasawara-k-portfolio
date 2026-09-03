import { profile } from "../../data/profile.js";
import { socialLinks } from "../../data/links.js";
import { localize, t } from "../i18n.js";
import {
  containerClass,
  escapeHTML,
  icon,
  pageHeader,
} from "../components/common.js";

export const renderContact = () => `
  <section>
    ${pageHeader({
      kicker: t("contact.kicker"),
      title: t("contact.title"),
      description: t("contact.description"),
    })}
    <div class="${containerClass} pb-16 sm:pb-24">
      <div class="mx-auto grid max-w-4xl gap-8 rounded-[16px] border border-line bg-surface p-6 shadow-card sm:p-10 md:grid-cols-[0.8fr_1.2fr]" data-reveal>
        <div class="rounded-[12px] bg-accent-soft p-6">
          <span class="grid size-12 place-items-center rounded-[10px] bg-accent font-display text-sm font-semibold text-white">KO</span>
          <h2 class="mt-7 font-display text-2xl font-semibold">${escapeHTML(t("contact.heading"))}</h2>
          <p class="mt-3 text-sm leading-7 text-muted">${escapeHTML(localize(profile.shortBio))}</p>
        </div>
        <div>
          <dl class="divide-y divide-line border-y border-line">
            <div class="py-5">
              <dt class="text-xs font-semibold text-muted">${escapeHTML(t("contact.email"))}</dt>
              <dd class="mt-2"><a class="break-all font-display text-lg font-semibold underline decoration-line underline-offset-4 hover:decoration-accent" href="mailto:${escapeHTML(profile.email)}">${escapeHTML(profile.email)}</a></dd>
            </div>
            <div class="py-5">
              <dt class="text-xs font-semibold text-muted">${escapeHTML(t("contact.location"))}</dt>
              <dd class="mt-2 text-sm font-medium">${escapeHTML(t("contact.locationValue"))}</dd>
            </div>
            <div class="py-5">
              <dt class="text-xs font-semibold text-muted">${escapeHTML(t("contact.topics"))}</dt>
              <dd class="mt-2 text-sm font-medium">${escapeHTML(t("contact.topicsValue"))}</dd>
            </div>
          </dl>
          <button class="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-canvas transition hover:bg-accent" type="button" data-copy-email>${icon("copy", "size-4")}${escapeHTML(t("contact.copy"))}</button>
          <div class="mt-3 grid gap-2 sm:grid-cols-2">
            ${socialLinks
              .map(
                (link) =>
                  `<a class="flex items-center justify-between rounded-lg border border-line bg-surface px-4 py-3 text-sm font-semibold transition hover:border-accent hover:text-accent" href="${escapeHTML(link.url)}" target="_blank" rel="noreferrer">${escapeHTML(link.label)}${icon("arrowUpRight", "size-4")}</a>`,
              )
              .join("")}
          </div>
        </div>
      </div>
    </div>
  </section>
`;
