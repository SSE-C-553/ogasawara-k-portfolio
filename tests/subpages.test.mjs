import test from "node:test";
import assert from "node:assert/strict";
import { setLanguage } from "../js/i18n.js";
import { renderAbout } from "../js/pages/about.js";
import { renderProjectDetail } from "../js/pages/project-detail.js";
import { renderContact } from "../js/pages/contact.js";
import { newsCard } from "../js/components/news-card.js";
import { projects } from "../data/projects.js";
import { newsItems } from "../data/news.js";
import { profile } from "../data/profile.js";
import { site } from "../data/site.js";

globalThis.document = { baseURI: site.url, documentElement: { lang: "ja" } };

test("about keeps legacy anchors and formal portrait within three content groups", () => {
  for (const language of ["ja", "en"]) {
    setLanguage(language);
    const html = renderAbout();
    for (const id of ["career", "awards", "skills"]) assert.match(html, new RegExp(`id="${id}"`));
    assert.equal((html.match(/<section\b/g) || []).length, 3);
    assert.ok(html.includes(`src="${profile.portrait}"`));
    assert.ok(!html.includes(profile.homePortrait));
    for (const project of projects.filter((item) => item.visible)) assert.ok(html.includes(`projects/${project.slug}/`));
    assert.doesNotMatch(html, /bg-surface|rounded-xl/);
  }
});

test("project details have two or three narrative sections without future editing notes", () => {
  for (const language of ["ja", "en"]) {
    setLanguage(language);
    for (const project of projects.filter((item) => item.visible)) {
      const html = renderProjectDetail(project.slug);
      assert.equal((html.match(/<h1\b/g) || []).length, 1);
      assert.equal((html.match(/<section\b/g) || []).length, project.slug === "microsaccade-eye-displacement" ? 3 : 2);
      assert.doesNotMatch(html, /詳細を整理して追記|公開可能な範囲を確認して追記|being documented for a future update|will be added after confirming/);
      for (const link of project.links) assert.ok(html.includes(link.url));
      assert.ok(html.includes(project.image));
    }
  }
});

test("activity rows show a date and title, keeping the internal article destination", () => {
  setLanguage("ja");
  for (const item of newsItems.filter((entry) => entry.visible)) {
    const html = newsCard(item, 3);
    assert.match(html, /<time\b/);
    assert.match(html, /<h3\b/);
    assert.ok(html.includes(`news/${item.slug}/`));
    assert.ok(!html.includes(item.summary.ja));
  }
});

test("contact retains mail and copy controls without a boxed primary card", () => {
  for (const language of ["ja", "en"]) {
    setLanguage(language);
    const html = renderContact();
    assert.ok(html.includes(`href="mailto:${profile.email}"`));
    assert.match(html, /data-copy-email/);
    assert.doesNotMatch(html, /bg-surface|rounded-xl/);
  }
});
