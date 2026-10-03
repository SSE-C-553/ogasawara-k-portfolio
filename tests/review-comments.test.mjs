import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { profile, interests } from "../data/profile.js";
import { projects } from "../data/projects.js";
import { publications } from "../data/publications.js";
import { newsItems } from "../data/news.js";
import { localize, setLanguage } from "../js/i18n.js";
import { renderHome } from "../js/pages/home.js";
import { renderAbout } from "../js/pages/about.js";
import { renderProjectDetail } from "../js/pages/project-detail.js";
import { newsCard } from "../js/components/news-card.js";
import { projectCard } from "../js/components/project-card.js";
import { publicationRow } from "../js/components/publication-row.js";

globalThis.document = { documentElement: { lang: "ja" } };
const research = projects.find((item) => item.slug === "microsaccade-eye-displacement");

test("brand tagline is removed while the original navigation is retained", () => {
  const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
  assert.doesNotMatch(html, />Image Processing(?: Portfolio)?</i);
  for (const page of ["home", "about", "projects", "publications", "news", "contact"]) {
    assert.ok(html.includes(`data-nav-page="${page}"`));
  }
});

test("home uses the casual photo and About retains the formal portrait", () => {
  for (const language of ["ja", "en"]) {
    setLanguage(language);
    const home = renderHome();
    assert.ok(home.includes(`src="${profile.homePortrait}"`));
    assert.ok(!home.includes(`src="${profile.portrait}"`));
    assert.ok(renderAbout().includes(`src="${profile.portrait}"`));
    assert.match(home, /home-intro-layout/);
    assert.doesNotMatch(home, /IMAGE PROCESSING \/ HOKKAIDO/);
    assert.equal((home.match(/<h1\b/g) || []).length, 1);
  }
  assert.ok(existsSync(profile.homePortrait));
});

test("home restores published type sizes while keeping the photo-beside-name layout", () => {
  const html = renderHome();
  assert.match(html, /<h1 class="font-display text-4xl font-semibold tracking-\[-0\.045em\] sm:text-6xl"/);
  assert.match(html, /max-w-xl text-sm leading-7 text-muted sm:text-base/);
  assert.match(html, /home-intro-name/);
  const css = readFileSync(new URL("../src/tailwind.css", import.meta.url), "utf8");
  assert.doesNotMatch(css, /\.home-intro-name (h1|p)\s*\{/);
  assert.match(css, /\.home-intro-name \{ grid-column: 2; grid-row: 1;/);
  assert.match(css, /\.home-portrait \{ width: 100%; grid-row: 1 \/ span 2;/);
  assert.match(css, /grid-template-columns: minmax\(0, 0\.86fr\) minmax\(0, 1\.14fr\)/);
  assert.doesNotMatch(css, /clamp\(200px, 27vw, 320px\)|grid-template-columns: 220px|max-width: 320px/);
  assert.equal((html.match(/block text-xs font-normal leading-5 text-muted/g) || []).length, 3);
});

test("profile has the requested hometown, course, and separate interests", () => {
  assert.equal(profile.origin.ja, "北海道苫小牧市");
  assert.match(profile.shortBio.ja, /^現在は苫小牧高専専攻科で、センシングを軸に研究/);
  for (const text of ["創造工学専攻", "情報エレクトロニクス系", "先端情報エレクトロニクスコース"]) {
    assert.ok(profile.affiliation.ja.includes(text));
  }
  const tags = interests.filter((item) => item.visible && !item.draft).map((item) => item.title.ja);
  assert.ok(tags.includes("画像処理"));
  assert.ok(tags.includes("センシング"));
  assert.ok(!tags.includes("画像処理・センシング"));
  assert.ok(!tags.includes("研究を支えるWebツール"));
  for (const language of ["ja", "en"]) {
    setLanguage(language);
    const html = renderHome();
    for (const line of profile.affiliationLines[language]) assert.ok(html.includes(line));
    assert.ok(html.includes(profile.origin[language]));
  }
});

test("research detail retains the complete figure and the card uses a dedicated apparatus crop", () => {
  assert.equal(research.image, "assets/eye-displacement.png");
  assert.ok(existsSync(research.image));
  for (const language of ["ja", "en"]) {
    setLanguage(language);
    assert.match(projectCard(research), /object-contain/);
    assert.ok(existsSync(research.thumbnail));
    assert.ok(projectCard(research).includes(research.thumbnail));
    const detail = renderProjectDetail(research.slug);
    assert.match(detail, /object-contain/);
    assert.ok(detail.includes(localize(research.imageCredit)));
    assert.ok(detail.includes(research.imageSource));
    assert.ok(detail.includes(`src="${research.image}"`));
  }
});

test("all project thumbnails show actual work rather than illustrative placeholders", () => {
  for (const language of ["ja", "en"]) {
    setLanguage(language);
    for (const project of projects.filter((item) => item.visible)) {
      const card = projectCard(project);
      assert.ok(existsSync(project.thumbnail || project.image));
      assert.doesNotMatch(card, /project-relay\.svg|project-quiet\.svg|roi-frame/);
      assert.match(card, /object-contain/);
      assert.ok(card.includes(localize(project.thumbnailAlt || project.imageAlt)));
    }
  }
});

test("About does not stretch the portrait frame and section titles are concrete", () => {
  setLanguage("ja");
  assert.match(renderAbout(), /<aside class="self-start /);
  assert.ok(renderHome().includes("研究・制作"));
  assert.ok(renderAbout().includes("技術・スキル"));
  assert.doesNotMatch(renderHome(), /注目プロジェクト/);
  assert.doesNotMatch(renderAbout(), /できること/);
});

test("VRSJ dates and completed status agree and unknown review status is not labeled", () => {
  const publication = publications[0];
  const news = newsItems.find((item) => item.slug === "vrsj-2026-presentation");
  assert.equal(publication.presentationDate, "2026-09-08");
  assert.equal(news.date, publication.presentationDate);
  assert.equal(publication.peerReviewed, null);
  for (const language of ["ja", "en"]) {
    setLanguage(language);
    const row = publicationRow(publication);
    assert.ok(row.includes(localize(publication.status)));
    assert.doesNotMatch(row, /査読なし|Non-peer-reviewed|Not peer-reviewed|発表予定|Scheduled/);
    assert.doesNotMatch(localize(news.title) + localize(news.summary) + localize(research.contribution) + localize(research.outcome), /発表予定|予定です|Scheduled|scheduled/);
    assert.doesNotMatch(publicationRow({ ...publication, peerReviewed: false }), /査読なし|Non-peer-reviewed|Not peer-reviewed/);
  }
});

test("news is a dated text list, distinct from project thumbnails", () => {
  for (const language of ["ja", "en"]) {
    setLanguage(language);
    const item = newsItems[0];
    const row = newsCard(item, 3);
    assert.match(row, /class="news-row"/);
    assert.match(row, /<time\b/);
    assert.match(row, /<h3\b/);
    assert.doesNotMatch(row, /<img|news-placeholder|roi-frame/);
    assert.ok(row.includes(item.relatedUrl));
    assert.match(row, /target="_blank" rel="noreferrer"/);
    assert.match(renderHome(), /class="news-list"/);
    const internal = newsCard({ ...item, relatedUrl: "", body: { ja: "本文", en: "Body" } });
    assert.match(internal, /data-route/);
    assert.doesNotMatch(newsCard({ ...item, relatedUrl: "", body: "" }), /<a\b/);
  }
});
