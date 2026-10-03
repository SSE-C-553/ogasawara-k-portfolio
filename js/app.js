import { profile } from "../data/profile.js";
import { socialLinks } from "../data/links.js";
import { setLanguage, t } from "./i18n.js";
import { navigate, readRoute, routeUrl, updateQuery } from "./router.js";
import { pageMetadata } from "./metadata.js";
import { createSearchController } from "./search-controller.js";
import { createMotionController } from "./motion.js";
import { parseTagIds } from "./work-filters.js";
import { icon } from "./components/common.js";
import { renderHome } from "./pages/home.js";
import { renderAbout } from "./pages/about.js";
import { renderProjects } from "./pages/projects.js";
import { renderProjectDetail } from "./pages/project-detail.js";
import { renderPublications } from "./pages/publications.js";
import { renderNews } from "./pages/news.js";
import { renderNewsDetail } from "./pages/news-detail.js";
import { renderContact } from "./pages/contact.js";
import { renderNotFound } from "./pages/not-found.js";

const app = document.querySelector("[data-app]");
const motionController = createMotionController(app);
const desktopNav = document.querySelector("[data-desktop-nav]");
const mobileDialog = document.querySelector("[data-mobile-menu]");
const menuButton = document.querySelector("[data-menu-button]");
const toast = document.querySelector("[data-toast]");
const descriptionMeta = document.querySelector('meta[name="description"]');
const ogTitle = document.querySelector('meta[property="og:title"]');
const ogDescription = document.querySelector('meta[property="og:description"]');

const primaryPages = ["home", "about", "projects", "publications", "news", "contact"];
const searchController = createSearchController({
  onSearch: (value, selectionPosition) => updateFilter("q", value, selectionPosition),
});

const pageMarkup = (route) => {
  switch (route.page) {
    case "home":
      return renderHome(route);
    case "about":
      return renderAbout();
    case "projects":
      return renderProjects(route);
    case "project":
      return renderProjectDetail(route.id);
    case "publications":
      return renderPublications(route);
    case "news":
      return renderNews(route);
    case "news-detail":
      return renderNewsDetail(route.id);
    case "contact":
      return renderContact();
    default:
      return renderNotFound();
  }
};

const activeNavigationPage = (page) => {
  if (page === "project") return "projects";
  if (page === "news-detail") return "news";
  return page;
};

const syncNavigation = (route) => {
  const activePage = activeNavigationPage(route.page);
  document.querySelector("[data-skip-link]")?.setAttribute("href", `${window.location.pathname}${window.location.search}#app`);

  document.querySelectorAll("[data-nav-page]").forEach((link) => {
    const page = link.dataset.navPage;
    link.setAttribute("href", routeUrl(page, route.language));

    if (page === activePage) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });

  document.querySelectorAll("[data-home-route]").forEach((link) => {
    link.setAttribute("href", routeUrl("home", route.language));
  });
};

const syncLanguage = (route) => {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  document.querySelectorAll("[data-language]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.language === route.language));
  });

  desktopNav?.setAttribute("aria-label", t("navAria"));
  document.querySelector("[data-language-switcher]")?.setAttribute("aria-label", t("languageAria"));
  mobileDialog?.setAttribute("aria-label", t("menu"));
  mobileDialog?.querySelector("nav")?.setAttribute("aria-label", t("navAria"));
  document.querySelector("footer nav")?.setAttribute("aria-label", t("navAria"));
};

const currentTheme = () => (document.documentElement.classList.contains("dark") ? "dark" : "light");

const syncThemeButton = () => {
  const dark = currentTheme() === "dark";
  const button = document.querySelector("[data-theme-button]");
  const iconContainer = document.querySelector("[data-theme-icon]");

  if (!button || !iconContainer) return;
  button.setAttribute("aria-label", dark ? t("themeLight") : t("themeDark"));
  button.setAttribute("title", dark ? t("themeLight") : t("themeDark"));
  iconContainer.innerHTML = dark ? icon("sun", "size-[18px]") : icon("moon", "size-[18px]");
};

const syncMetadata = (route) => {
  const metadata = pageMetadata(route);
  document.title = metadata.title;
  descriptionMeta.content = metadata.description;
  if (ogTitle) ogTitle.content = metadata.title;
  if (ogDescription) ogDescription.content = metadata.description;
  for (const [property, value] of Object.entries({ "og:url": metadata.canonical, "og:image": metadata.image, "og:locale": metadata.locale })) {
    document.querySelector(`meta[property="${property}"]`)?.setAttribute("content", value);
  }
  document.querySelector('meta[name="robots"]')?.setAttribute("content", metadata.robots);
  document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", metadata.title);
  document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", metadata.description);
  document.querySelector('meta[name="twitter:image"]')?.setAttribute("content", metadata.image);
  document.querySelector('link[rel="canonical"]')?.setAttribute("href", metadata.canonical);
  Object.entries(metadata.alternates).forEach(([language, href]) => {
    document.querySelector(`link[hreflang="${language}"]`)?.setAttribute("href", href);
  });
};

const closeMenu = () => {
  if (mobileDialog?.open) mobileDialog.close();
  menuButton?.setAttribute("aria-expanded", "false");
};

const render = ({
  focusHeading = false,
  preserveScroll = false,
  focusFilter = "",
  focusSelector = "",
  selectionPosition = null,
} = {}) => {
  searchController.reset();
  const filtersOpen = preserveScroll ? app.querySelector("[data-filter-panel]")?.open : undefined;
  let route = readRoute();

  if (route.alias) {
    navigate(route.alias.url, { replace: true });
    route = readRoute();
  }

  setLanguage(route.language);
  const previousScroll = window.scrollY;

  motionController.reset();
  app.classList.toggle("is-switching", focusHeading && !preserveScroll && !motionController.isReducedMotion());
  app.innerHTML = pageMarkup(route);
  if (filtersOpen !== undefined) app.querySelector("[data-filter-panel]")?.toggleAttribute("open", filtersOpen);
  syncLanguage(route);
  syncNavigation(route);
  syncThemeButton();
  syncMetadata(route);
  closeMenu();
  motionController.setup({ animate: !preserveScroll });

  if (!preserveScroll) window.scrollTo({ top: 0, behavior: "instant" });
  else window.scrollTo({ top: previousScroll, behavior: "instant" });

  window.requestAnimationFrame(() => {
    app.classList.remove("is-switching");

    if (focusHeading) app.querySelector("h1")?.focus({ preventScroll: true });

    if (focusSelector) {
      const control = document.querySelector(focusSelector) || app.querySelector("[data-filter-panel] > summary");
      control?.focus({ preventScroll: true });
    }

    if (focusFilter) {
      const field = app.querySelector(`[data-filter="${CSS.escape(focusFilter)}"]`);
      (field || app.querySelector("[data-filter-panel] > summary"))?.focus({ preventScroll: true });
      if (
        field instanceof HTMLInputElement &&
        Number.isInteger(selectionPosition)
      ) {
        field.setSelectionRange(selectionPosition, selectionPosition);
      }
    }

    if (window.location.hash && !preserveScroll) {
      try {
        const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
        if (target) {
          target.scrollIntoView({ block: "start" });
          const focusTarget = target.matches("h1, h2, h3, h4, h5, h6")
            ? target : target.querySelector("h1, h2, h3, h4, h5, h6") || target;
          if (!focusTarget.hasAttribute("tabindex")) focusTarget.setAttribute("tabindex", "-1");
          focusTarget.focus({ preventScroll: true });
        }
      } catch {
        // Malformed fragments must not interrupt page rendering.
      }
    }
  });
};

const updateFilter = (field, value, selectionPosition = null) => {
  updateQuery({ [field]: value, p: "" });
  render({
    preserveScroll: true,
    focusFilter: field,
    selectionPosition,
  });
};

document.addEventListener("click", (event) => {
  const routeLink = event.target.closest("[data-route]");
  if (routeLink && !event.metaKey && !event.ctrlKey && !event.shiftKey && event.button === 0) {
    event.preventDefault();
    navigate(routeLink.getAttribute("href"));
    render({ focusHeading: true });
    return;
  }

  const languageButton = event.target.closest("[data-language]");
  if (languageButton) {
    const route = readRoute();
    navigate(routeUrl(route.page, languageButton.dataset.language, { ...route.filters, id: route.id }, window.location.hash));
    render({ preserveScroll: true, focusSelector: `[data-language="${CSS.escape(languageButton.dataset.language)}"]` });
    return;
  }

  const themeButton = event.target.closest("[data-theme-button]");
  if (themeButton) {
    const useDark = currentTheme() !== "dark";
    document.documentElement.classList.toggle("dark", useDark);
    document.documentElement.dataset.theme = useDark ? "dark" : "light";
    try {
      window.localStorage.setItem("portfolio-theme", useDark ? "dark" : "light");
    } catch {
      // The selected theme still applies for the current page.
    }
    syncThemeButton();
    return;
  }

  const copyButton = event.target.closest("[data-copy-email]");
  if (copyButton) {
    Promise.resolve().then(() => {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      return navigator.clipboard.writeText(profile.email);
    })
      .then(() => {
        toast.textContent = t("contact.copied");
        toast.classList.add("is-visible");
        window.setTimeout(() => toast.classList.remove("is-visible"), 1800);
      })
      .catch(() => {
        toast.textContent = t("contact.copyFailed");
        toast.classList.add("is-visible");
        window.setTimeout(() => toast.classList.remove("is-visible"), 4000);
      });
    return;
  }

  const kindButton = event.target.closest("[data-work-kind]");
  if (kindButton) {
    const kind = kindButton.dataset.workKind;
    updateQuery({ kind, p: "" });
    render({ preserveScroll: true, focusSelector: `[data-work-kind="${CSS.escape(kind)}"]` });
    return;
  }

  const tagButton = event.target.closest("[data-work-tag]");
  if (tagButton) {
    const id = tagButton.dataset.workTag;
    const selected = parseTagIds(readRoute().filters.tags);
    const next = selected.includes(id) ? selected.filter((tag) => tag !== id) : [...selected, id];
    updateQuery({ tags: next.join(","), p: "" });
    render({ preserveScroll: true, focusSelector: `[data-work-tag="${CSS.escape(id)}"]:not([data-selected-tag])` });
    return;
  }

  const clearTagsButton = event.target.closest("[data-clear-work-tags]");
  if (clearTagsButton) {
    updateQuery({ tags: "", p: "" });
    render({ preserveScroll: true, focusSelector: "[data-filter-panel] > summary" });
    return;
  }

  const clearButton = event.target.closest("[data-clear-filters]");
  if (clearButton) {
    updateQuery({ q: "", category: "", year: "", type: "", peer: "", p: "", kind: "", tags: "", sort: "" });
    render({ preserveScroll: true, focusSelector: '[data-work-kind=""], [data-filter-panel] > summary, [data-filter="q"]' });
    return;
  }

  const pageButton = event.target.closest("[data-page-number]");
  if (pageButton && !pageButton.disabled) {
    updateQuery({ p: pageButton.dataset.pageNumber });
    render({ preserveScroll: true });
  }
});

document.addEventListener("input", (event) => {
  const input = event.target.closest('input[data-filter="q"]');
  if (!input) return;

  searchController.input(event);
});

document.addEventListener("compositionstart", (event) => {
  if (event.target.matches('input[data-filter="q"]')) searchController.compositionStart();
});
document.addEventListener("compositionend", (event) => {
  if (event.target.matches('input[data-filter="q"]')) searchController.compositionEnd(event);
});

document.addEventListener("change", (event) => {
  const select = event.target.closest("select[data-filter]");
  if (!select) return;
  updateFilter(select.dataset.filter, select.value);
});

document.addEventListener("submit", (event) => {
  if (event.target.matches("[data-filter-form]")) event.preventDefault();
});

menuButton?.addEventListener("click", () => {
  if (!mobileDialog) return;

  if (mobileDialog.open) {
    closeMenu();
    return;
  }

  mobileDialog.showModal();
  menuButton.setAttribute("aria-expanded", "true");
});

mobileDialog?.addEventListener("close", () => {
  menuButton?.setAttribute("aria-expanded", "false");
});

mobileDialog?.addEventListener("click", (event) => {
  if (event.target === mobileDialog) closeMenu();
});

window.addEventListener("popstate", () => render({ focusHeading: true }));

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

document.querySelector("[data-footer-socials]").innerHTML = socialLinks
  .map(
    (link) =>
      `<a class="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-accent" href="${link.url}" target="_blank" rel="noreferrer">${link.label}${icon("arrowUpRight", "size-3.5")}</a>`,
  )
  .join("");

primaryPages.forEach((page) => {
  document.querySelectorAll(`[data-footer-page="${page}"]`).forEach((link) => {
    link.dataset.navPage = page;
  });
});

render();
