import { profile } from "../../data/profile.js";
import { socialLinks } from "../../data/links.js";
import { t } from "../i18n.js";
import { containerClass, escapeHTML, icon, pageHeader } from "../components/common.js";

export const renderContact = () => `<article class="reading-page">
  ${pageHeader({ title: t("contact.title"), description: t("contact.description") })}
  <div class="${containerClass} pb-14 sm:pb-20">
    <div class="mx-auto max-w-[760px] border-t border-line pt-7" data-reveal>
      <p class="text-sm text-muted">${escapeHTML(t("contact.email"))}</p>
      <a class="mt-2 inline-block break-all text-xl font-semibold leading-9 text-accent underline decoration-line underline-offset-4 hover:decoration-accent sm:text-2xl" href="mailto:${escapeHTML(profile.email)}">${escapeHTML(profile.email)}</a>
      <div class="mt-4">
        <button class="inline-flex min-h-10 items-center gap-2 rounded-md border border-line px-3 py-2 text-sm font-medium transition hover:border-accent hover:text-accent" type="button" data-copy-email>${icon("copy")}${escapeHTML(t("contact.copy"))}</button>
      </div>
      <dl class="mt-8 grid gap-3">
        <div class="grid gap-1 sm:grid-cols-[140px_minmax(0,1fr)]"><dt class="text-sm leading-7 text-muted">${escapeHTML(t("contact.location"))}</dt><dd class="text-base leading-7">${escapeHTML(t("contact.locationValue"))}</dd></div>
        <div class="grid gap-1 sm:grid-cols-[140px_minmax(0,1fr)]"><dt class="text-sm leading-7 text-muted">${escapeHTML(t("contact.topics"))}</dt><dd class="text-base leading-7">${escapeHTML(t("contact.topicsValue"))}</dd></div>
      </dl>
      <div class="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5">
        ${socialLinks.map((link) => `<a class="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-accent underline decoration-line underline-offset-4 hover:decoration-accent" href="${escapeHTML(link.url)}" target="_blank" rel="noreferrer">${escapeHTML(link.label)}${icon("arrowUpRight")}</a>`).join("")}
      </div>
    </div>
  </div>
</article>`;
