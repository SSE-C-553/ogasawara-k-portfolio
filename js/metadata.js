import { profile } from "../data/profile.js";
import { projects } from "../data/projects.js";
import { newsItems } from "../data/news.js";
import { site } from "../data/site.js";
import { localize, t } from "./i18n.js";
import { routeUrl, siteBase } from "./router.js";

export const absoluteRoute = (page, language, extra = {}) => {
  const path = routeUrl(page, language, extra).slice(siteBase().pathname.length);
  return new URL(path, site.url).href;
};

export const pageMetadata = (route) => {
  const project = route.page === "project" ? projects.find((item) => item.visible && item.slug === route.id) : null;
  const news = route.page === "news-detail" ? newsItems.find((item) => item.visible && item.slug === route.id) : null;
  const missing = route.page === "not-found" || (route.page === "project" && !project) || (route.page === "news-detail" && !news);
  const page = missing ? "not-found" : route.page;
  const item = project || news;
  const title = `${item ? localize(item.title) : t(`pages.${page}`)} | ${localize(profile.name)}`;
  const description = item ? localize(item.summary) : (t(`${page}.description`) === `${page}.description` ? t("meta.description") : t(`${page}.description`));
  return {
    title, description,
    canonical: absoluteRoute(page, route.language, { id: route.id }),
    image: new URL(project?.image || site.image, site.url).href,
    locale: route.language === "en" ? "en_US" : "ja_JP",
    robots: missing ? "noindex, follow" : "index, follow",
    alternates: Object.fromEntries(["ja", "en"].map((language) => [language, absoluteRoute(page, language, { id: route.id })])),
  };
};
