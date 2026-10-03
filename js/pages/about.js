import {
  education,
  extracurriculars,
  interests,
  profile,
  qualifications,
  skillGroups,
} from "../../data/profile.js";
import { localize, t } from "../i18n.js";
import {
  containerClass,
  draftBadge,
  escapeHTML,
  icon,
  pageHeader,
  sectionHeading,
} from "../components/common.js";

const recordSources = (item) => {
  const sources = [
    ...(item.sources ?? []),
    ...(item.url ? [{ label: item.sourceLabel, url: item.url }] : []),
  ];

  return sources.length
    ? `<div class="mt-4 flex flex-wrap gap-4">${sources
        .map(
          (source) => `<a class="inline-flex items-center gap-1.5 text-xs font-semibold text-accent transition hover:opacity-70" href="${escapeHTML(source.url)}" target="_blank" rel="noreferrer">${escapeHTML(localize(source.label))}${icon("arrowUpRight", "size-3.5")}</a>`,
        )
        .join("")}</div>`
    : "";
};

const recordList = (items) => `
  <div class="divide-y divide-line border-y border-line">
    ${items
      .filter((item) => item.visible !== false)
      .map(
        (item) => `
          <article class="grid gap-3 py-7 sm:grid-cols-[145px_1fr] sm:gap-8" data-reveal>
            <time class="font-mono text-[10px] font-bold tracking-wide text-muted">${escapeHTML(localize(item.period))}</time>
            <div>
              <div class="flex flex-wrap items-center gap-3">
                <h3 class="font-display text-lg font-semibold">${escapeHTML(localize(item.title))}</h3>
                ${draftBadge(item.draft)}
              </div>
              <p class="mt-1 text-sm font-semibold text-accent">${escapeHTML(localize(item.organization))}</p>
              <p class="mt-3 max-w-3xl text-sm leading-7 text-muted">${escapeHTML(localize(item.description))}</p>
              ${recordSources(item)}
            </div>
          </article>
        `,
      )
      .join("")}
  </div>
`;

export const renderAbout = () => {
  const visibleEducation = education.filter((item) => item.visible);
  const visibleInterests = interests.filter((item) => item.visible);
  const portrait = profile.portrait
    ? `<img class="size-full object-cover" src="${escapeHTML(profile.portrait)}" alt="${escapeHTML(localize(profile.name))}" />`
    : `<div class="news-placeholder grid size-full place-items-center">
        <div class="text-center">
          <strong class="font-display text-7xl font-semibold tracking-[-0.08em] text-accent/25">KO</strong>
          <p class="mt-4 text-xs font-semibold text-muted">${escapeHTML(t("about.portraitPending"))}</p>
        </div>
      </div>`;

  return `
    <section>
      ${pageHeader({
        kicker: t("about.kicker"),
        title: t("about.title"),
        description: t("about.description"),
      })}

      <div class="${containerClass} grid gap-8 pb-16 md:grid-cols-[0.72fr_1.28fr] sm:pb-24">
        <aside class="self-start overflow-hidden rounded-[16px] border border-line bg-surface p-3 shadow-card" data-reveal>
          <div class="aspect-[4/5] overflow-hidden rounded-[11px]">${portrait}</div>
        </aside>
        <div data-reveal>
          <p class="font-display text-xs font-semibold uppercase tracking-[0.18em] text-accent">${escapeHTML(t("about.intro"))}</p>
          <h2 class="mt-3 font-display text-3xl font-semibold tracking-[-0.035em]">${escapeHTML(localize(profile.name))}</h2>
          <p class="mt-2 font-display text-sm font-medium text-muted">${escapeHTML(localize(profile.role))}</p>
          <p class="mt-7 text-base leading-8 text-muted">${escapeHTML(localize(profile.fullBio))}</p>

          <section class="mt-10" aria-labelledby="profile-facts">
            <h3 class="font-display text-lg font-semibold" id="profile-facts">${escapeHTML(t("about.profile"))}</h3>
            <dl class="mt-4 divide-y divide-line border-y border-line">
              ${[
                [t("about.name"), localize(profile.name)],
                [t("about.affiliation"), localize(profile.affiliation)],
                [t("about.origin"), localize(profile.origin)],
                [t("about.interestAreas"), localize(profile.interestAreas)],
              ]
                .map(
                  ([label, value]) => `
                    <div class="grid gap-1 py-4 sm:grid-cols-[130px_1fr]">
                      <dt class="text-xs font-semibold text-muted">${escapeHTML(label)}</dt>
                      <dd class="text-sm font-medium">${escapeHTML(value)}</dd>
                    </div>
                  `,
                )
                .join("")}
            </dl>
          </section>
        </div>
      </div>

      <section class="border-y border-line bg-surface" id="career">
        <div class="${containerClass} py-16 sm:py-24">
          ${sectionHeading({ kicker: "TIMELINE", title: t("about.career") })}
          <div class="relative">
            <div class="absolute bottom-8 left-[5px] top-8 w-px bg-line sm:left-[154px]" aria-hidden="true"></div>
            ${visibleEducation
              .map(
                (entry) => `
                  <article class="relative grid gap-3 border-b border-line py-7 pl-8 sm:grid-cols-[125px_1fr] sm:gap-8 sm:pl-0" data-reveal>
                    <span class="absolute left-0 top-9 size-[11px] rounded-full border-2 border-surface bg-accent ring-1 ring-accent sm:left-[149px]" aria-hidden="true"></span>
                    <time class="font-mono text-[10px] font-bold tracking-wide text-muted">${escapeHTML(localize(entry.period))}</time>
                    <div class="sm:pl-8">
                      <div class="flex flex-wrap items-center gap-3">
                        <h3 class="font-display text-lg font-semibold">${escapeHTML(localize(entry.organization))}</h3>
                        ${entry.current ? `<span class="rounded-full bg-accent px-2.5 py-1 text-[10px] font-semibold text-white">${escapeHTML(t("common.current"))}</span>` : ""}
                        ${draftBadge(entry.draft)}
                      </div>
                      <p class="mt-1 text-sm font-semibold text-accent">${escapeHTML(localize(entry.program))}</p>
                      <p class="mt-3 max-w-2xl text-sm leading-7 text-muted">${escapeHTML(localize(entry.description))}</p>
                    </div>
                  </article>
                `,
              )
              .join("")}
          </div>
        </div>
      </section>

      <section class="${containerClass} py-16 sm:py-24">
        ${sectionHeading({ kicker: "SKILLS", title: t("about.skills") })}
        <div class="grid gap-5 md:grid-cols-3">
          ${skillGroups
            .map(
              (group) => `
                <article class="rounded-[12px] border border-line bg-surface p-6" data-reveal>
                  <h3 class="font-display text-lg font-semibold">${escapeHTML(localize(group.title))}</h3>
                  <ul class="mt-5 flex flex-wrap gap-2">
                    ${group.skills
                      .map(
                        (skill) =>
                          `<li class="inline-flex items-center gap-2 rounded-full border border-line px-3 py-2 text-xs font-semibold">${escapeHTML(localize(skill.name))}${draftBadge(skill.draft)}</li>`,
                      )
                      .join("")}
                  </ul>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>

      <section class="border-t border-line bg-surface">
        <div class="${containerClass} py-16 sm:py-24">
          ${sectionHeading({ kicker: "INTERESTS", title: t("about.interests") })}
          <div class="grid gap-5 md:grid-cols-3">
            ${visibleInterests
              .map(
                (interest) => `
                  <article class="rounded-[12px] border border-line bg-canvas p-6" data-reveal>
                    <div class="flex flex-wrap items-center gap-3">
                      <h3 class="font-display text-lg font-semibold">${escapeHTML(localize(interest.title))}</h3>
                      ${draftBadge(interest.draft)}
                    </div>
                    <p class="mt-3 text-sm leading-7 text-muted">${escapeHTML(localize(interest.description))}</p>
                  </article>
                `,
              )
              .join("")}
          </div>
        </div>
      </section>

      ${
        qualifications.some((item) => item.visible !== false)
          ? `<section class="border-t border-line"><div class="${containerClass} py-16 sm:py-24">${sectionHeading({ kicker: "QUALIFICATIONS", title: t("about.qualifications") })}${recordList(qualifications)}</div></section>`
          : ""
      }
      ${
        extracurriculars.some((item) => item.visible !== false)
          ? `<section class="border-y border-line bg-surface"><div class="${containerClass} py-16 sm:py-24">${sectionHeading({ kicker: "ACTIVITIES", title: t("about.extracurriculars") })}${recordList(extracurriculars)}</div></section>`
          : ""
      }
    </section>
  `;
};
