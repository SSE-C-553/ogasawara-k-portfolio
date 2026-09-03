import { profile } from "../data/profile.js";
import { projects } from "../data/projects.js";
import { newsItems } from "../data/news.js";
import { socialLinks } from "../data/links.js";
import { getLanguage, localize, setLanguage, t } from "./i18n.js";
import { navigate, readRoute, routeUrl, updateQuery } from "./router.js";
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
const desktopNav = document.querySelector("[data-desktop-nav]");
const mobileDialog = document.querySelector("[data-mobile-menu]");
const menuButton = document.querySelector("[data-menu-button]");
const toast = document.querySelector("[data-toast]");
const descriptionMeta = document.querySelector('meta[name="description"]');
const ogTitle = document.querySelector('meta[property="og:title"]');
const ogDescription = document.querySelector('meta[property="og:description"]');

const primaryPages = ["home", "about", "projects", "publications", "news", "contact"];
let searchTimer;

const pageMarkup = (route) => {
  switch (route.page) {
    case "home":
      return renderHome();
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

const pageTitle = (route) => {
  if (route.page === "project") {
    const project = projects.find((item) => item.slug === route.id);
    if (project) return localize(project.title);
  }

  if (route.page === "news-detail") {
    const item = newsItems.find((newsItem) => newsItem.slug === route.id);
    if (item) return localize(item.title);
  }

  return t(`pages.${route.page}`);
};

const syncMetadata = (route) => {
  const displayName = localize(profile.name);
  const title = `${pageTitle(route)} | ${displayName}`;

  document.title = title;
  descriptionMeta.content = t("meta.description");
  if (ogTitle) ogTitle.content = title;
  if (ogDescription) ogDescription.content = t("meta.description");
};

const setupReveal = () => {
  const elements = app.querySelectorAll("[data-reveal]");

  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("IntersectionObserver" in window)
  ) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.06 },
  );

  elements.forEach((element) => observer.observe(element));
};

const closeMenu = () => {
  if (mobileDialog?.open) mobileDialog.close();
  menuButton?.setAttribute("aria-expanded", "false");
};

const render = ({
  focusHeading = false,
  preserveScroll = false,
  focusFilter = "",
  selectionPosition = null,
} = {}) => {
  let route = readRoute();

  if (route.alias) {
    navigate(route.alias.url, { replace: true });
    route = readRoute();
  }

  setLanguage(route.language);
  const previousScroll = window.scrollY;

  app.classList.add("is-switching");
  app.innerHTML = pageMarkup(route);
  syncLanguage(route);
  syncNavigation(route);
  syncThemeButton();
  syncMetadata(route);
  closeMenu();

  if (!preserveScroll) window.scrollTo({ top: 0, behavior: "instant" });
  else window.scrollTo({ top: previousScroll, behavior: "instant" });

  window.requestAnimationFrame(() => {
    app.classList.remove("is-switching");
    setupReveal();

    if (focusHeading) app.querySelector("h1")?.focus({ preventScroll: true });

    if (focusFilter) {
      const field = app.querySelector(`[data-filter="${CSS.escape(focusFilter)}"]`);
      field?.focus({ preventScroll: true });
      if (
        field instanceof HTMLInputElement &&
        Number.isInteger(selectionPosition)
      ) {
        field.setSelectionRange(selectionPosition, selectionPosition);
      }
    }

    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      target?.scrollIntoView({ block: "start" });
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
    const url = new URL(window.location.href);
    url.searchParams.set("lang", languageButton.dataset.language);
    navigate(`${url.pathname}${url.search}${url.hash}`);
    render();
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
    navigator.clipboard
      .writeText(profile.email)
      .then(() => {
        toast.textContent = t("contact.copied");
        toast.classList.add("is-visible");
        window.setTimeout(() => toast.classList.remove("is-visible"), 1800);
      })
      .catch(() => {
        window.location.href = `mailto:${profile.email}`;
      });
    return;
  }

  const clearButton = event.target.closest("[data-clear-filters]");
  if (clearButton) {
    updateQuery({ q: "", category: "", year: "", type: "", peer: "", p: "" });
    render({ preserveScroll: true });
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

  window.clearTimeout(searchTimer);
  const selectionPosition = input.selectionStart;
  searchTimer = window.setTimeout(() => {
    updateFilter("q", input.value, selectionPosition);
  }, 120);
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
