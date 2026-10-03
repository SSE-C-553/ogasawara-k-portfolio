import { profile } from "../../data/profile.js";
import { socialLinks } from "../../data/links.js";
import { newsItems } from "../../data/news.js";
import { formatDate, getLanguage, localize, t } from "../i18n.js";
import { containerClass, escapeHTML, icon, localizedRoute } from "../components/common.js";
import { renderWorkBrowser } from "../components/work-browser.js";

export const renderHome = (route = {}) => {
  const news = newsItems.filter((item) => item.visible).slice(0, 3);
  return `
    <div class="${containerClass} home-layout">
      <aside class="profile-rail" aria-labelledby="profile-name" data-reveal>
        ${profile.homePortrait ? `<div class="profile-portrait"><img class="profile-photo" src="${escapeHTML(profile.homePortrait)}" alt="${escapeHTML(localize(profile.name))}" width="1200" height="1200" fetchpriority="high" decoding="async" /></div>` : ""}
        <div class="profile-identity">
          <h1 id="profile-name" class="profile-name" tabindex="-1">${escapeHTML(localize(profile.name))}</h1>
          ${getLanguage() === "ja" ? `<p class="profile-name-en">${escapeHTML(profile.name.en)}</p>` : ""}
        </div>
        <div class="profile-overview">
          <p class="profile-affiliation">${escapeHTML(localize(profile.affiliation)).replace(" 専攻科 ", "<br />専攻科 ")}</p>
          <p class="profile-intro">${escapeHTML(localize(profile.shortBio))}</p>
          <a class="profile-more text-link" href="${localizedRoute("about")}" data-route>${escapeHTML(t("home.profileLink"))}${icon("arrowRight")}</a>
          <div class="profile-contact">
            <a href="mailto:${escapeHTML(profile.email)}">${escapeHTML(profile.email)}</a>
            ${socialLinks.map((link) => `<a href="${escapeHTML(link.url)}" target="_blank" rel="noreferrer">${escapeHTML(link.label)}${icon("arrowUpRight", "size-3.5")}</a>`).join("")}
          </div>
        </div>
      </aside>
      <div class="home-content">
        <section class="home-works" aria-labelledby="works-heading">
          <div class="editorial-heading" data-reveal>
            <h2 id="works-heading">${escapeHTML(t("projects.title"))}</h2>
            <a class="text-link" href="${localizedRoute("publications")}" data-route>${escapeHTML(localize({ ja: "発表一覧", en: "Publications" }))}${icon("arrowRight", "size-3.5")}</a>
          </div>
          ${renderWorkBrowser(route.filters || {}, { headingLevel: 3 })}
        </section>
        ${news.length ? `<section class="home-updates" aria-labelledby="updates-heading">
          <div class="editorial-heading" data-reveal>
            <h2 id="updates-heading">${escapeHTML(t("news.title"))}</h2>
            <a class="text-link" href="${localizedRoute("news")}" data-route>${escapeHTML(t("common.viewAll"))}${icon("arrowRight", "size-3.5")}</a>
          </div>
          <div class="update-list">${news.map((item) => `<article class="update-row" data-reveal>
            <time datetime="${escapeHTML(item.date)}">${escapeHTML(formatDate(item.date))}</time>
            <a href="${localizedRoute("news-detail", { id: item.slug })}" data-route>${escapeHTML(localize(item.title))}${icon("arrowRight", "size-3.5")}</a>
          </article>`).join("")}</div>
        </section>` : ""}
      </div>
    </div>`;
};
