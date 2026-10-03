import test from "node:test";
import assert from "node:assert/strict";
import { projects } from "../data/projects.js";
import { tagById, tagGroups, tags } from "../data/tags.js";
import { site } from "../data/site.js";
import { filterWorks, normalizeWorkFilters, parseTagIds } from "../js/work-filters.js";
import { readRoute, routeUrl } from "../js/router.js";
import { setLanguage } from "../js/i18n.js";
import { renderWorkBrowser } from "../js/components/work-browser.js";

globalThis.document = { baseURI: site.url, documentElement: { lang: "ja" } };

test("work records use known stable, bilingual tag IDs and a supported kind", () => {
  assert.equal(tags.length, tagById.size);
  for (const tag of tags) {
    assert.ok(tag.label.ja && tag.label.en);
    assert.ok(tagGroups.some((group) => group.id === tag.group));
  }
  for (const project of projects) {
    assert.ok(["research", "creation"].includes(project.kind));
    assert.ok(project.tagIds.length > 0);
    assert.ok(project.tagIds.every((id) => tagById.has(id)));
  }
});

test("work filters parse tags once, preserve unknown IDs and sanitize kind/sort", () => {
  assert.deepEqual(parseTagIds("react, typescript,react,,unknown"), ["react", "typescript", "unknown"]);
  assert.deepEqual(parseTagIds(["react", "react", ""]), ["react"]);
  assert.equal(normalizeWorkFilters({ kind: "bad", sort: "bad" }).kind, "");
  assert.equal(normalizeWorkFilters({ sort: "bad" }).sort, "research-first");
});

test("research comes first and kinds can be selected independently", () => {
  assert.equal(filterWorks(projects)[0].kind, "research");
  assert.deepEqual(filterWorks(projects, { kind: "research" }).map((item) => item.slug), ["microsaccade-eye-displacement"]);
  assert.equal(filterWorks(projects, { kind: "creation" }).length, 2);
});

test("multiple tags use AND semantics and unknown tags do not silently broaden results", () => {
  assert.equal(filterWorks(projects, { tags: "typescript" }).length, 2);
  assert.deepEqual(filterWorks(projects, { tags: "react,typescript" }).map((item) => item.slug), ["presentation-timer"]);
  assert.equal(filterWorks(projects, { tags: "eye-movement,react" }).length, 0);
  assert.equal(filterWorks(projects, { tags: "unknown" }).length, 0);
  assert.equal(filterWorks(projects, { tags: "react", kind: "research" }).length, 0);
});

test("keyword, legacy category and year filters combine with tags", () => {
  assert.equal(filterWorks(projects, { q: " ＲＥＡＣＴ ", tags: "typescript", year: "2026" }).length, 1);
  assert.equal(filterWorks(projects, { q: "発表支援" })[0].slug, "presentation-timer");
  assert.equal(filterWorks(projects, { q: "Eye movement" })[0].slug, "microsaccade-eye-displacement");
  assert.equal(filterWorks(projects, { year: "2025", tags: "canvas" })[0].slug, "ny-pulse-2026");
  assert.equal(filterWorks(projects, { category: "WEB GAME / CANVAS", year: "2026" }).length, 1);
  assert.equal(filterWorks(projects, { year: "2024" }).length, 0);
});

test("date sorting is stable, accounts for date ranges and omits hidden entries", () => {
  const base = projects[0];
  const source = [
    { ...base, slug: "older", kind: "creation", date: "2024" },
    { ...base, slug: "range", kind: "creation", date: "2023–2025" },
    { ...base, slug: "research", date: "2022" },
    { ...base, slug: "same-year", kind: "creation", date: "2024" },
    { ...base, slug: "hidden", date: "2099", visible: false },
  ];
  assert.deepEqual(filterWorks(source).map((item) => item.slug), ["research", "range", "older", "same-year"]);
  assert.deepEqual(filterWorks(source, { sort: "newest" }).map((item) => item.slug), ["range", "older", "same-year", "research"]);
  assert.deepEqual(filterWorks(source, { sort: "oldest" }).map((item) => item.slug), ["research", "range", "older", "same-year"]);
});

test("all work filters round-trip across the home/projects routes and JA/EN", () => {
  const selected = { kind: "creation", tags: "react,typescript", sort: "oldest", q: "発表", year: "2026" };
  for (const page of ["home", "projects"]) {
    for (const language of ["ja", "en"]) {
      const route = readRoute(routeUrl(page, language, selected));
      assert.equal(route.language, language);
      assert.equal(route.page, page);
      for (const [key, value] of Object.entries(selected)) assert.equal(route.filters[key], value);
      const switched = readRoute(routeUrl(route.page, language === "ja" ? "en" : "ja", route.filters));
      assert.deepEqual(switched.filters, route.filters);
    }
  }
});

test("work renderer exposes selected state, unknown filters and localized tag links", () => {
  for (const language of ["ja", "en"]) {
    setLanguage(language);
    const html = renderWorkBrowser({ kind: "creation", tags: "react" });
    assert.match(html, /data-work-kind="creation" aria-pressed="true"/);
    assert.match(html, /data-work-tag="react" aria-pressed="true"/);
    assert.match(html, /data-clear-work-tags/);
    assert.match(html, /data-clear-filters/);
    assert.ok(html.includes(`${language === "en" ? "en/" : ""}projects/?tags=react`));
    assert.match(html, /<h3 class="work-title">/);
    assert.doesNotMatch(html, /<h2 class="work-title">/);
  }
  setLanguage("ja");
  const unknown = renderWorkBrowser({ year: "2024", tags: "<script>" });
  assert.match(unknown, /value="2024" selected/);
  assert.match(unknown, /data-work-tag="&lt;script&gt;"/);
  assert.match(unknown, /条件に一致する研究・制作はありません/);
  assert.doesNotMatch(unknown, /<script>/);
  assert.match(renderWorkBrowser({}, { headingLevel: 2 }), /<h2 class="work-title">/);
});
