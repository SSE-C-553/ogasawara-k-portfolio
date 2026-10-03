import { projects } from "../../data/projects.js";
import { publications } from "../../data/publications.js";
import { tagById, tagGroups, tags } from "../../data/tags.js";
import { getYears, uniqueOptions } from "../filters.js";
import { localize } from "../i18n.js";
import { filterWorks, normalizeWorkFilters } from "../work-filters.js";
import { escapeHTML, icon, localizedRoute } from "./common.js";

const text = (ja, en) => escapeHTML(localize({ ja, en }));
const kindLabel = (kind) => kind === "research"
  ? text("研究", "Research") : text("制作", "Projects");

const selectOptions = (options, value, allLabel) => [
  `<option value="">${allLabel}</option>`,
  value && !options.some((option) => option.value === value)
    ? `<option value="${escapeHTML(value)}" selected>${escapeHTML(value)}</option>` : "",
  ...options.map((option) => `<option value="${escapeHTML(option.value)}"${option.value === value ? " selected" : ""}>${escapeHTML(option.label)}</option>`),
].join("");

const workEntry = (project, headingLevel) => {
  const href = localizedRoute("project", { id: project.slug });
  const related = publications.filter((item) => item.visible && item.projectSlug === project.slug);
  return `<article class="work-entry work-entry--${project.kind === "research" ? "research" : "creation"}" data-reveal>
    <a class="work-media" href="${escapeHTML(href)}" data-route>
      <img src="${escapeHTML(project.image)}" alt="${escapeHTML(localize(project.imageAlt))}" width="${project.kind === "research" ? "600" : "1200"}" height="${project.kind === "research" ? "600" : "750"}" loading="lazy" decoding="async" />
    </a>
    <div class="work-body">
      <p class="work-meta"><span>${kindLabel(project.kind)}</span><span>${escapeHTML(project.date)}</span></p>
      <h${headingLevel} class="work-title"><a href="${escapeHTML(href)}" data-route>${escapeHTML(localize(project.title))}</a></h${headingLevel}>
      <p class="work-summary">${escapeHTML(localize(project.summary))}</p>
      <ul class="work-tags" aria-label="${text("タグ", "Tags")}">
        ${(project.tagIds || []).slice(0, 3).map((id) => `<li><a href="${escapeHTML(localizedRoute("projects", { tags: id }))}" data-route>${escapeHTML(localize(tagById.get(id)?.label) || id)}</a></li>`).join("")}
      </ul>
      ${related.map((item) => `<p class="work-publication"><span>${escapeHTML(localize(item.venueShort || item.venue))}</span><span>${escapeHTML(localize(item.status))}</span>${item.links?.url ? `<a href="${escapeHTML(item.links.url)}" target="_blank" rel="noreferrer">${text("大会プログラム", "Conference program")}${icon("arrowUpRight", "size-3.5")}</a>` : ""}</p>`).join("")}
      <div class="work-links">
        <a href="${escapeHTML(href)}" data-route>${text("詳しく見る", "Read more")}${icon("arrowRight", "size-4")}</a>
        ${(related.length ? [] : project.links || []).slice(0, 2).map((link) => `<a href="${escapeHTML(link.url)}" target="_blank" rel="noreferrer">${escapeHTML(localize(link.label))}${icon("arrowUpRight", "size-3.5")}</a>`).join("")}
      </div>
    </div>
  </article>`;
};

export const renderWorkBrowser = (filters = {}, { headingLevel = 3 } = {}) => {
  const state = normalizeWorkFilters(filters);
  const source = projects.filter((project) => project.visible);
  const filtered = filterWorks(source, state);
  const active = Boolean(state.q || state.category || state.year || state.kind || state.tags.length);
  const panelActive = Boolean(state.q || state.category || state.year || state.tags.length);
  const heading = [2, 3, 4, 5, 6].includes(headingLevel) ? headingLevel : 3;
  const yearOptions = uniqueOptions(source.flatMap((item) => getYears(item.date))).map((value) => ({ value, label: value }));
  const categoryOptions = uniqueOptions(source.map((item) => item.category)).map((value) => ({
    value, label: localize(source.find((item) => item.category === value)?.categoryLabel) || value,
  }));
  const availableTagIds = new Set(source.flatMap((item) => item.tagIds || []));
  return `<div class="work-browser" data-work-browser>
    <div class="work-toolbar">
      <div class="work-kind-tabs" role="group" aria-label="${text("研究・制作の分類", "Work category")}">
        ${["", "research", "creation"].map((kind) => `<button type="button" data-work-kind="${kind}" aria-pressed="${state.kind === kind}">${kind ? kindLabel(kind) : text("すべて", "All")}<span aria-hidden="true">${kind ? source.filter((item) => item.kind === kind).length : source.length}</span></button>`).join("")}
      </div>
      <label class="work-sort"><span>${text("並び順", "Sort")}</span><select name="sort" data-filter="sort" aria-label="${text("並び順", "Sort order")}">
        <option value="research-first"${state.sort === "research-first" ? " selected" : ""}>${text("研究を先に", "Research first")}</option>
        <option value="newest"${state.sort === "newest" ? " selected" : ""}>${text("新しい順", "Newest first")}</option>
        <option value="oldest"${state.sort === "oldest" ? " selected" : ""}>${text("古い順", "Oldest first")}</option>
      </select></label>
    </div>
    <details class="work-filter-panel" data-filter-panel${panelActive ? " open" : ""}>
      <summary>${text("タグ・キーワードで絞り込む", "Filter by tag or keyword")}${state.tags.length ? `<span class="work-filter-count">${state.tags.length}</span>` : ""}</summary>
      <div class="work-filter-content">
        <form class="work-filter-fields" role="search" data-filter-form>
          <label><span>${text("キーワード", "Keyword")}</span><input type="search" name="q" data-filter="q" value="${escapeHTML(state.q)}" placeholder="${text("例：眼球運動、React", "e.g. eye movement, React")}" autocomplete="off" /></label>
          <label><span>${text("年", "Year")}</span><select name="year" data-filter="year">${selectOptions(yearOptions, state.year, text("すべての年", "All years"))}</select></label>
          ${state.category ? `<label><span>${text("カテゴリー", "Category")}</span><select name="category" data-filter="category">${selectOptions(categoryOptions, state.category, text("すべて", "All"))}</select></label>` : ""}
        </form>
        <p class="work-filter-hint">${text("タグは複数選択できます。選んだタグをすべて含むものを表示します。", "Select one or more tags. Results must include every selected tag.")}</p>
        <div class="work-tag-groups">
          ${tagGroups.map((group) => `<div class="work-tag-group" role="group" aria-label="${escapeHTML(localize(group.label))}"><p>${escapeHTML(localize(group.label))}</p><div class="work-tag-options">${tags.filter((tag) => tag.group === group.id && availableTagIds.has(tag.id)).map((tag) => `<button type="button" data-work-tag="${tag.id}" aria-pressed="${state.tags.includes(tag.id)}">${escapeHTML(localize(tag.label))}</button>`).join("")}</div></div>`).join("")}
        </div>
        ${state.tags.length ? `<div class="work-selected-tags"><span>${text("選択中", "Selected")}</span>${state.tags.map((id) => `<button type="button" data-work-tag="${escapeHTML(id)}" data-selected-tag aria-label="${text("タグを解除：", "Remove tag: ")}${escapeHTML(localize(tagById.get(id)?.label) || id)}">${escapeHTML(localize(tagById.get(id)?.label) || id)}<span aria-hidden="true">×</span></button>`).join("")}<button type="button" data-clear-work-tags>${text("タグをすべて解除", "Clear tags")}</button></div>` : ""}
      </div>
    </details>
    <div class="${active ? "work-results" : "sr-only"}"><p role="status" aria-live="polite" aria-atomic="true">${text(`${filtered.length}件`, `${filtered.length} ${filtered.length === 1 ? "result" : "results"}`)}${active ? text(` / 全${source.length}件`, ` of ${source.length}`) : ""}</p>${active ? `<button type="button" data-clear-filters>${text("絞り込みを解除", "Clear filters")}</button>` : ""}</div>
    <div class="work-list">${filtered.length ? filtered.map((project) => workEntry(project, heading)).join("") : `<div class="work-empty"><p>${text("条件に一致する研究・制作はありません。", "No research or projects match these filters.")}</p><p>${text("タグを減らすか、絞り込みを解除してください。", "Try removing a tag or clearing the filters.")}</p></div>`}</div>
  </div>`;
};
