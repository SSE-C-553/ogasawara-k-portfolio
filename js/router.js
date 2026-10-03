import { site } from "../data/site.js";

const primaryRoutes = ["home", "about", "projects", "publications", "news", "contact"];
const validRoutes = [...primaryRoutes, "project", "news-detail"];
const aliases = { profile: "about", career: "about", activities: "news" };
export const siteBase = () => new URL(".", globalThis.document?.baseURI || site.url);

export const routeUrl = (page, language = "ja", extra = {}, hash = "") => {
  const prefix = language === "en" ? "en/" : "";
  const { id, ...filters } = extra;
  let path = page === "home" ? "" : `${page}/`;
  if (page === "project") path = `projects/${encodeURIComponent(id || "")}/`;
  if (page === "news-detail") path = `news/${encodeURIComponent(id || "")}/`;
  const url = new URL(`${prefix}${path}`, siteBase());
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== "" && value != null) url.searchParams.set(key, value);
  });
  url.hash = hash;
  return `${url.pathname}${url.search}${url.hash}`;
};

export const readRoute = (href = window.location.href) => {
  const url = new URL(href, siteBase());
  const params = url.searchParams;
  let path = url.pathname;
  const base = siteBase().pathname;
  if (path.startsWith(base)) path = path.slice(base.length);
  const parts = path.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);
  let language = parts[0] === "en" ? "en" : "ja";
  if (language === "en") parts.shift();
  if (params.has("lang")) language = params.get("lang") === "en" ? "en" : "ja";
  let page = parts[0] || "home";
  let id = parts[1] || "";
  try { id = decodeURIComponent(id); } catch { page = "not-found"; }
  if (page === "projects" && id) page = "project";
  if (page === "news" && id) page = "news-detail";
  if (parts.length > 2) page = "not-found";
  if (parts.length > 1 && primaryRoutes.includes(page)) page = "not-found";
  if (params.has("page")) {
    page = params.get("page") || "home";
    id = params.get("id") || "";
  }
  const originalPage = page;
  page = aliases[page] || page;
  const filters = Object.fromEntries(
    ["q", "category", "year", "type", "peer", "p", "kind", "tags", "sort"].map((key) => [key, params.get(key) || ""]),
  );
  return {
    page: validRoutes.includes(page) ? page : "not-found",
    language, id, filters,
    alias: aliases[originalPage]
      ? { url: routeUrl(page, language, {}, originalPage === "career" ? "career" : "") }
      : null,
  };
};

export const navigate = (href, { replace = false } = {}) => {
  const url = new URL(href, window.location.href);
  window.history[replace ? "replaceState" : "pushState"]({}, "", `${url.pathname}${url.search}${url.hash}`);
};

export const updateQuery = (values, { replace = true } = {}) => {
  const url = new URL(window.location.href);
  Object.entries(values).forEach(([key, value]) => {
    if (value === "" || value == null) url.searchParams.delete(key);
    else url.searchParams.set(key, value);
  });
  navigate(`${url.pathname}${url.search}${url.hash}`, { replace });
};
