import test from "node:test";
import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import { getYears, matchesYear, normalizeText, paginate } from "../js/filters.js";
import { readRoute, routeUrl } from "../js/router.js";
import { createSearchController } from "../js/search-controller.js";
import { absoluteRoute, pageMetadata } from "../js/metadata.js";
import { setLanguage } from "../js/i18n.js";
import { renderHome } from "../js/pages/home.js";
import { renderAbout } from "../js/pages/about.js";
import { renderProjects } from "../js/pages/projects.js";
import { renderNewsDetail } from "../js/pages/news-detail.js";
import { newsCard } from "../js/components/news-card.js";
import { publicationRow } from "../js/components/publication-row.js";
import { projects } from "../data/projects.js";
import { newsItems } from "../data/news.js";
import { publications } from "../data/publications.js";
import { site } from "../data/site.js";
import { profile } from "../data/profile.js";

globalThis.document = { baseURI: site.url, documentElement: { lang: "ja" } };
const filters = { q: "", category: "", year: "", type: "", peer: "", p: "" };

test("year ranges include the final year, with safe bounds", () => {
  assert.deepEqual(getYears("2025–2026"), ["2025", "2026"]);
  assert.deepEqual(getYears("2025-2027"), ["2025", "2026", "2027"]);
  assert.deepEqual(getYears("2026-09-08"), ["2026"]);
  assert.deepEqual(getYears("現在"), []);
  assert.deepEqual(getYears("2026–2025"), ["2026"]);
  assert.deepEqual(getYears("2026–9999"), ["2026"]);
  assert.equal(matchesYear("2025–2026", "2026"), true);
  assert.equal(matchesYear("2025–2026", "2024"), false);
});

test("search normalizes full-width input and pagination clamps invalid values", () => {
  assert.equal(normalizeText(" ＲＥＡＣＴ "), "react");
  for (const value of ["NaN", "Infinity", "-3", "0"]) assert.equal(paginate([1, 2], value, 1).page, 1);
  assert.equal(paginate([1, 2, 3], "2.8", 1).page, 2);
  assert.equal(paginate([], "999").totalPages, 1);
});

test("static routes support the Pages subpath and both languages", () => {
  document.baseURI = site.url;
  assert.equal(routeUrl("home"), site.basePath);
  assert.equal(routeUrl("about", "en"), `${site.basePath}en/about/`);
  const href = routeUrl("project", "en", { id: "presentation-timer", q: "福笑い" }, "career");
  const route = readRoute(href);
  assert.equal(route.page, "project");
  assert.equal(route.language, "en");
  assert.equal(route.id, "presentation-timer");
  assert.equal(route.filters.q, "福笑い");
  assert.ok(href.endsWith("#career"));
});

test("old QR/query URLs and legacy aliases remain functional", () => {
  const route = readRoute(`${site.url}?page=project&id=presentation-timer&lang=en`);
  assert.equal(route.page, "project");
  assert.equal(route.id, "presentation-timer");
  assert.equal(route.language, "en");
  assert.equal(readRoute(`${site.url}?page=career`).alias.url, `${site.basePath}about/#career`);
  assert.equal(readRoute(`${site.url}not-a-page/`).page, "not-found");
  assert.equal(readRoute(`${site.url}projects/a/b/`).page, "not-found");
  assert.equal(readRoute(`${site.url}about/unknown/`).page, "not-found");
  assert.equal(readRoute(routeUrl("project", "ja", { id: "日本語" })).id, "日本語");
  assert.equal(readRoute(`${site.url}projects/%ZZ/`).page, "not-found");
});

test("preview routes work at root while metadata always points to production", () => {
  document.baseURI = "http://127.0.0.1:4180/";
  assert.equal(routeUrl("news", "en"), "/en/news/");
  assert.equal(readRoute("http://127.0.0.1:4180/en/news/test/").page, "news-detail");
  assert.equal(absoluteRoute("about", "en"), `${site.url}en/about/`);
  document.baseURI = site.url;
});

const searchHarness = () => {
  const tasks = new Map();
  const searches = [];
  let nextId = 0;
  const controller = createSearchController({
    onSearch: (...args) => searches.push(args),
    schedule: (callback) => { tasks.set(++nextId, callback); return nextId; },
    cancel: (id) => tasks.delete(id),
  });
  const flush = () => { const queued = [...tasks.values()]; tasks.clear(); queued.forEach((fn) => fn()); };
  const target = { value: "福笑い", selectionStart: 3, isConnected: true };
  return { controller, searches, target, flush };
};

test("IME composition does not trigger re-render before confirmation", () => {
  const { controller, searches, target, flush } = searchHarness();
  controller.input({ target });
  controller.compositionStart();
  controller.input({ target, isComposing: true });
  flush();
  assert.deepEqual(searches, []);
  controller.compositionEnd({ target });
  controller.input({ target });
  flush();
  assert.deepEqual(searches, [["福笑い", 3]]);
});

test("search debounce cancels stale navigation and disconnected inputs", () => {
  const { controller, searches, target, flush } = searchHarness();
  controller.input({ target });
  controller.input({ target });
  controller.reset();
  flush();
  assert.deepEqual(searches, []);
  controller.input({ target });
  target.isConnected = false;
  flush();
  assert.deepEqual(searches, []);
});

test("all published project images exist and have Japanese/English alt text", async () => {
  for (const project of projects.filter((item) => item.visible)) {
    assert.match(project.image, /\.(jpg|png)$/);
    assert.ok(project.imageAlt.ja && project.imageAlt.en);
    await access(new URL(`../${project.image}`, import.meta.url));
  }
  await access(new URL(`../${site.image}`, import.meta.url));
});

test("news entries have bilingual article bodies and stay inside the portfolio first", () => {
  for (const language of ["ja", "en"]) {
    setLanguage(language);
    for (const item of newsItems.filter((entry) => entry.visible)) {
      assert.ok(item.body[language]?.trim());
      assert.match(newsCard(item), new RegExp(`href="${site.basePath}${language === "en" ? "en/" : ""}news/${item.slug}/"`));
      assert.match(renderNewsDetail(item.slug), /<article\b/);
    }
  }
});

test("home omits duplicate English name, scan graphics and news placeholders", () => {
  setLanguage("en");
  const html = renderHome();
  assert.equal((html.match(/>Keigo Ogasawara<\//g) || []).length, 1);
  assert.doesNotMatch(html, /scan|roi-corner|signal-placeholder|news-placeholder/);
});

test("home and about use distinct, existing portraits in both languages", async () => {
  assert.notEqual(profile.homePortrait, profile.portrait);
  await access(new URL(`../${profile.homePortrait}`, import.meta.url));
  await access(new URL(`../${profile.portrait}`, import.meta.url));
  for (const language of ["ja", "en"]) {
    setLanguage(language);
    const home = renderHome();
    const about = renderAbout();
    assert.ok(home.includes(`src="${profile.homePortrait}"`));
    assert.ok(!home.includes(`src="${profile.portrait}"`));
    assert.match(home, /width="1200" height="1200"/);
    assert.ok(about.includes(`src="${profile.portrait}"`));
    assert.ok(!about.includes(`src="${profile.homePortrait}"`));
  }
});

test("2026 project filter includes cross-year projects", () => {
  setLanguage("ja");
  const html = renderProjects({ filters: { ...filters, year: "2026" } });
  for (const project of projects.filter((entry) => entry.visible && matchesYear(entry.date, "2026"))) {
    assert.ok(html.includes(`projects/${project.slug}/`));
  }
});

test("a deep-link filter outside existing options remains visible and clearable", () => {
  setLanguage("ja");
  const html = renderProjects({ filters: { ...filters, year: "2024" } });
  assert.match(html, /value="2024" selected/);
  assert.match(html, /data-clear-filters/);
});

test("presentation is completed and unknown peer review is not asserted", () => {
  setLanguage("ja");
  assert.match(publicationRow(publications[0]), /発表済み/);
  assert.doesNotMatch(publicationRow(publications[0]), /査読なし|査読あり|査読付/);
  setLanguage("en");
  assert.match(publicationRow(publications[0]), /Presented on September 8, 2026/);
  assert.match(publicationRow(publications[0]), /Unofficial translation/);
});

test("metadata is localized, canonical and provides a real share image", () => {
  setLanguage("en");
  const metadata = pageMetadata({ page: "project", id: projects[0].slug, language: "en" });
  assert.equal(metadata.canonical, `${site.url}en/projects/${projects[0].slug}/`);
  assert.equal(metadata.locale, "en_US");
  assert.ok(metadata.description.length > 20);
  assert.match(metadata.image, /\.(jpg|png)$/);
  assert.equal(pageMetadata({ page: "project", id: "missing", language: "en" }).robots, "noindex, follow");
});
