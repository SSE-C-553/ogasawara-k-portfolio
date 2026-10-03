import { education, extracurriculars, profile, qualifications, skillGroups } from "../../data/profile.js";
import { projects } from "../../data/projects.js";
import { localize, t } from "../i18n.js";
import { containerClass, draftBadge, escapeHTML, icon, localizedRoute, pageHeader } from "../components/common.js";

const recordList = (items) => `<div class="divide-y divide-line">
  ${items.filter((item) => item.visible !== false).map((item) => `<article class="grid gap-2 py-5 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-7" data-reveal>
    <p class="text-sm leading-7 text-muted">${escapeHTML(localize(item.period))}</p>
    <div><h3 class="text-base font-semibold leading-7">${escapeHTML(localize(item.title))}</h3>
      <p class="mt-1 text-sm leading-7 text-muted">${escapeHTML(localize(item.organization))}</p>
      <p class="mt-2 text-base leading-8">${escapeHTML(localize(item.description))}</p>
      ${item.url ? `<a class="mt-3 inline-flex min-h-8 items-center gap-2 text-sm font-medium text-accent underline decoration-line underline-offset-4 hover:decoration-accent" href="${escapeHTML(item.url)}" target="_blank" rel="noreferrer">${escapeHTML(localize(item.sourceLabel))}${icon("arrowUpRight")}</a>` : ""}
      ${draftBadge(item.draft)}
    </div>
  </article>`).join("")}
</div>`;

export const renderAbout = () => `<article class="reading-page">
  ${pageHeader({ title: t("about.title"), description: t("about.description") })}
  <div class="${containerClass} pb-14 sm:pb-20">
    <div class="mx-auto max-w-[760px]">
      <section aria-labelledby="profile-name" class="pb-9 sm:pb-12" data-reveal>
        <div class="grid grid-cols-[minmax(0,1fr)_88px] items-center gap-x-6 gap-y-5 sm:grid-cols-[minmax(0,1fr)_140px] sm:items-start sm:gap-x-9">
          <h2 id="profile-name" class="text-xl font-semibold leading-8">${escapeHTML(localize(profile.name))}</h2>
          ${profile.portrait ? `<img class="aspect-[3/4] w-full self-start rounded-md object-cover sm:row-span-2" src="${escapeHTML(profile.portrait)}" alt="${escapeHTML(localize(profile.name))}" width="960" height="1280" decoding="async" />` : ""}
          <p class="col-span-2 text-base leading-8 sm:col-span-1 sm:col-start-1 sm:row-start-2">${escapeHTML(localize(profile.fullBio))}</p>
        </div>
        <dl class="mt-6 grid gap-3">
          ${[[t("about.affiliation"), localize(profile.affiliation)], [t("about.origin"), localize(profile.origin)]].map(([label, value]) =>
            `<div class="grid grid-cols-[64px_minmax(0,1fr)] gap-4"><dt class="text-sm leading-7 text-muted">${escapeHTML(label)}</dt><dd class="text-sm leading-7">${escapeHTML(value)}</dd></div>`,
          ).join("")}
        </dl>
        <nav class="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-accent" aria-label="${escapeHTML(t("about.sections"))}">
          ${[["career", t("about.career")], ["awards", t("about.qualifications")], ["skills", t("about.skills")]].map(([id, label]) =>
            `<a class="inline-flex min-h-9 items-center underline decoration-line underline-offset-4 hover:decoration-accent" href="${localizedRoute("about", {}, id)}" data-route>${escapeHTML(label)}</a>`,
          ).join("")}
        </nav>
      </section>

      <section id="career" aria-labelledby="career-title" class="border-t border-line py-8 sm:py-10">
        <h2 id="career-title" class="text-xl font-semibold">${escapeHTML(localize({ ja: "学歴・受賞", en: "Education & awards" }))}</h2>
        <div class="mt-2 divide-y divide-line">
          ${education.filter((entry) => entry.visible).map((entry) => `<article class="grid gap-2 py-5 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-7" data-reveal>
            <p class="text-sm leading-7 text-muted">${escapeHTML(localize(entry.period))}</p>
            <div><div class="flex flex-wrap items-baseline gap-x-3 gap-y-1"><h3 class="text-base font-semibold leading-7">${escapeHTML(localize(entry.organization))}</h3>
              ${entry.current ? `<span class="text-xs font-medium text-muted">${escapeHTML(t("common.current"))}</span>` : ""}
            </div><p class="mt-1 text-sm leading-7">${escapeHTML(localize(entry.program))}</p>
              <p class="mt-2 text-base leading-8">${escapeHTML(localize(entry.description))}</p>
            </div>
          </article>`).join("")}
        </div>
        ${qualifications.some((item) => item.visible !== false) ? `<div id="awards" class="mt-5 border-t border-line pt-6"><h3 class="text-sm font-semibold text-muted">${escapeHTML(t("about.qualifications"))}</h3>${recordList(qualifications)}</div>` : `<span id="awards"></span>`}
      </section>

      <section id="skills" aria-labelledby="skills-title" class="border-t border-line pt-8 sm:pt-10">
        <h2 id="skills-title" class="text-xl font-semibold">${escapeHTML(localize({ ja: "技術・活動", en: "Technologies & activities" }))}</h2>
        <div class="mt-2 divide-y divide-line">
          ${skillGroups.map((group) => `<article class="grid gap-2 py-5 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-7" data-reveal>
            <h3 class="text-sm font-semibold leading-7 text-muted">${escapeHTML(localize(group.title))}</h3>
            <div>
              <p class="text-base font-medium leading-8">${group.skills.map((skill) => escapeHTML(localize(skill.name))).join(" / ")}</p>
              <p class="mt-2 text-base leading-8">${escapeHTML(localize(group.description))}</p>
              <ul class="mt-3 flex flex-wrap gap-x-5 gap-y-2">${(group.projectSlugs || []).map((slug) => projects.find((item) => item.slug === slug && item.visible)).filter(Boolean).map((item) =>
                `<li><a class="inline-flex items-center gap-1 text-sm font-medium leading-7 text-accent underline decoration-line underline-offset-4 hover:decoration-accent" href="${localizedRoute("project", { id: item.slug })}" data-route>${escapeHTML(localize(item.title))}${icon("arrowRight", "size-3 shrink-0")}</a></li>`,
              ).join("")}</ul>
            </div>
          </article>`).join("")}
        </div>
        ${extracurriculars.some((item) => item.visible !== false) ? `<div class="mt-5 border-t border-line pt-6"><h3 class="text-sm font-semibold text-muted">${escapeHTML(t("about.extracurriculars"))}</h3>${recordList(extracurriculars)}</div>` : ""}
      </section>
    </div>
  </div>
</article>`;
