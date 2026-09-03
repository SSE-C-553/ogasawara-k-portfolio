const validRoutes = new Set([
  "home",
  "about",
  "projects",
  "project",
  "publications",
  "news",
  "news-detail",
  "contact",
]);

const aliases = {
  profile: { page: "about", hash: "" },
  career: { page: "about", hash: "career" },
  activities: { page: "news", hash: "" },
};

const filterKeys = ["q", "category", "year", "type", "peer", "p"];

export const routeUrl = (page, language = "ja", extra = {}, hash = "") => {
  const params = new URLSearchParams({ page, lang: language });

  Object.entries(extra).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      params.set(key, String(value));
    }
  });

  return `?${params.toString()}${hash ? `#${hash}` : ""}`;
};

export const readRoute = () => {
  const params = new URLSearchParams(window.location.search);
  const requestedPage = params.get("page") || "home";
  const language = params.get("lang") === "en" ? "en" : "ja";
  const alias = aliases[requestedPage];
  const page = alias?.page ?? (validRoutes.has(requestedPage) ? requestedPage : "not-found");
  const filters = {};

  filterKeys.forEach((key) => {
    filters[key] = params.get(key) || "";
  });

  return {
    page,
    language,
    id: params.get("id") || "",
    filters,
    alias: alias
      ? {
          from: requestedPage,
          url: routeUrl(page, language, {}, alias.hash),
        }
      : null,
  };
};

export const navigate = (url, { replace = false } = {}) => {
  const destination = new URL(url, window.location.href);
  const nextUrl = `${destination.pathname}${destination.search}${destination.hash}`;

  if (replace) window.history.replaceState({}, "", nextUrl);
  else window.history.pushState({}, "", nextUrl);
};

export const updateQuery = (changes, { push = false } = {}) => {
  const url = new URL(window.location.href);

  Object.entries(changes).forEach(([key, value]) => {
    if (value === "" || value === null || value === undefined) url.searchParams.delete(key);
    else url.searchParams.set(key, String(value));
  });

  navigate(`${url.pathname}${url.search}${url.hash}`, { replace: !push });
};
