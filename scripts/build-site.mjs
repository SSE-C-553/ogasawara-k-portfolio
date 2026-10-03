import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { basename, resolve, sep } from "node:path";
import { site } from "../data/site.js";
import { profile } from "../data/profile.js";
import { projects } from "../data/projects.js";
import { newsItems } from "../data/news.js";
import { socialLinks } from "../data/links.js";
import { localize, setLanguage, t } from "../js/i18n.js";
import { routeUrl } from "../js/router.js";
import { pageMetadata } from "../js/metadata.js";
import { escapeHTML } from "../js/components/common.js";
import { renderHome } from "../js/pages/home.js";
import { renderAbout } from "../js/pages/about.js";
import { renderProjects } from "../js/pages/projects.js";
import { renderProjectDetail } from "../js/pages/project-detail.js";
import { renderPublications } from "../js/pages/publications.js";
import { renderNews } from "../js/pages/news.js";
import { renderNewsDetail } from "../js/pages/news-detail.js";
import { renderContact } from "../js/pages/contact.js";
import { renderNotFound } from "../js/pages/not-found.js";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "dist");
// Only this build's generated child directory may be cleared.
if (output !== resolve(root, "dist") || !output.startsWith(`${root}${sep}`) || basename(output) !== "dist") {
  throw new Error("Invalid build output directory");
}
await rm(output, { recursive: true, force: true });
await mkdir(resolve(output, "assets"), { recursive: true });
globalThis.document = { baseURI: site.url, documentElement: { lang: "ja" } };
const template = (await readFile(resolve(root, "index.html"), "utf8")).replace(/\r\n/g, "\n");
const renders = { home: renderHome, about: renderAbout, projects: renderProjects, publications: renderPublications, news: renderNews, contact: renderContact };
const blankFilters = Object.fromEntries(["q", "category", "year", "type", "peer", "p"].map((key) => [key, ""]));
const routes = Object.keys(renders).map((page) => ({ page, id: "" }));
routes.push(...projects.filter((item) => item.visible).map((item) => ({ page: "project", id: item.slug })));
routes.push(...newsItems.filter((item) => item.visible && localize(item.body)).map((item) => ({ page: "news-detail", id: item.slug })));
const locations = [];

const renderDocument = (route, baseHref) => {
  setLanguage(route.language);
  const metadata = pageMetadata(route);
  const body = route.page === "project" ? renderProjectDetail(route.id) : route.page === "news-detail" ? renderNewsDetail(route.id) : route.page === "not-found" ? renderNotFound() : renders[route.page](route);
  let html = template.replace('<html lang="ja">', `<html lang="${route.language}">`).replace('<base href="./" />', `<base href="${baseHref}" />`);
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHTML(metadata.title)}</title>`);
  // Match exact named/property tags, preserving the template's formatting.
  const setMeta = (attribute, name, content) => {
    html = html.replace(new RegExp(`<meta\\s+${attribute}="${name}"\\s+content="[^"]*"\\s*\\/?>`), `<meta ${attribute}="${name}" content="${escapeHTML(content)}" />`);
  };
  setMeta("name", "description", metadata.description);
  setMeta("name", "robots", metadata.robots);
  for (const [key, value] of Object.entries({ "og:title": metadata.title, "og:description": metadata.description, "og:url": metadata.canonical, "og:image": metadata.image, "og:locale": metadata.locale })) setMeta("property", key, value);
  for (const [key, value] of Object.entries({ "twitter:title": metadata.title, "twitter:description": metadata.description, "twitter:image": metadata.image })) setMeta("name", key, value);
  html = html.replace(/(<link rel="canonical" href=")[^"]*/, `$1${escapeHTML(metadata.canonical)}`);
  for (const [language, href] of Object.entries(metadata.alternates)) html = html.replace(new RegExp(`(<link rel="alternate" hreflang="${language}" href=")[^"]*`), `$1${escapeHTML(href)}`);
  html = html.replace(/(<main\b[^>]*>)[\s\S]*?<\/main>/, (_, open) => `${open}\n${body}\n    </main>`);
  html = html.replace(/(<([a-z][a-z0-9]*)\b[^>]*\bdata-i18n="([^"]+)"[^>]*>)[\s\S]*?(<\/\2>)/g, (_, open, tag, key, close) => `${open}${escapeHTML(t(key))}${close}`);
  html = html.replace(/href="\?page=([^"]+)"/g, (_, query) => {
    const params = new URLSearchParams(`page=${query.replaceAll("&amp;", "&")}`);
    return `href="${routeUrl(params.get("page"), route.language)}"`;
  });
  html = html.replace(new RegExp(`(<a\\b[^>]*\\bhref=")${site.basePath}`, "g"), "$1");
  const relativePath = routeUrl(route.page, route.language, { id: route.id }).slice(site.basePath.length);
  html = html.replace('href="#app"', `href="${relativePath}#app"`);
  html = html.replace(/aria-label="(?:メインナビゲーション|フッターナビゲーション)"/g, `aria-label="${escapeHTML(t("navAria"))}"`).replace('aria-label="言語選択"', `aria-label="${escapeHTML(t("languageAria"))}"`).replace('aria-label="ダークテーマに切り替える"', `aria-label="${escapeHTML(t("themeDark"))}"`);
  html = html.replace(/(data-language="(ja|en)" aria-pressed=")[^"]+/g, (_, prefix, language) => `${prefix}${language === route.language}`);
  const activePage = route.page === "project" ? "projects" : route.page === "news-detail" ? "news" : route.page;
  html = html.replace(/(<a\b[^>]*data-nav-page="([^"]+)"[^>]*)(>)/g, (_, open, page, close) => `${open}${page === activePage ? ' aria-current="page"' : ""}${close}`);
  const socialHtml = socialLinks.map((link) => `<a class="text-sm text-muted hover:text-accent" href="${escapeHTML(link.url)}" target="_blank" rel="noreferrer">${escapeHTML(link.label)}</a>`).join("");
  html = html.replace(/(<div[^>]*data-footer-socials>)[\s\S]*?<\/div>/, (_, open) => `${open}${socialHtml}</div>`);
  html = html.replace(/<noscript>[\s\S]*?<\/noscript>/, "");
  const person = { "@context": "https://schema.org", "@type": "Person", name: localize(profile.name), alternateName: route.language === "ja" ? profile.name.en : profile.name.ja, url: site.url, image: new URL(profile.portrait, site.url).href, sameAs: socialLinks.map((item) => item.url) };
  html = html.replace("</head>", `<script type="application/ld+json">${JSON.stringify(person).replaceAll("<", "\\u003c")}</script>\n  </head>`);
  return html;
};

for (const language of ["ja", "en"]) {
  for (const entry of routes) {
    const route = { ...entry, language, filters: blankFilters };
    const path = routeUrl(route.page, language, { id: route.id }).slice(site.basePath.length);
    const depth = path.split("/").filter(Boolean).length;
    const directory = resolve(output, path);
    await mkdir(directory, { recursive: true });
    await writeFile(resolve(directory, "index.html"), renderDocument(route, depth ? "../".repeat(depth) : "./"), "utf8");
    locations.push(new URL(path, site.url).href);
  }
}
await writeFile(resolve(output, "404.html"), renderDocument({ page: "not-found", language: "ja", id: "", filters: blankFilters }, site.basePath), "utf8");
await cp(resolve(root, "js"), resolve(output, "js"), { recursive: true });
await cp(resolve(root, "data"), resolve(output, "data"), { recursive: true });
await cp(resolve(root, "styles.css"), resolve(output, "styles.css"));
const assets = new Set([profile.portrait, profile.homePortrait, site.image, "assets/favicon.svg", ...projects.filter((item) => item.visible).map((item) => item.image)].filter(Boolean));
for (const asset of assets) await cp(resolve(root, asset), resolve(output, asset));
await writeFile(resolve(output, ".nojekyll"), "", "utf8");
await writeFile(resolve(output, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${locations.map((url) => `  <url><loc>${escapeHTML(url)}</loc></url>`).join("\n")}\n</urlset>\n`, "utf8");
await writeFile(resolve(output, "robots.txt"), `User-agent: *\nAllow: ${site.basePath}\nSitemap: ${new URL("sitemap.xml", site.url).href}\n`, "utf8");
console.log(`Built ${locations.length} pre-rendered pages in dist/ (public assets only).`);
