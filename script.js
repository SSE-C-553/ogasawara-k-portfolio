(() => {
  "use strict";

  const content = window.PORTFOLIO_CONTENT;
  if (!content) return;

  const setText = (selector, value) => {
    document.querySelectorAll(selector).forEach((element) => {
      element.textContent = value;
    });
  };

  const profile = content.profile;
  const year = new Date().getFullYear();

  setText("[data-year]", year);
  setText("[data-profile-name]", profile.name);
  setText("[data-profile-monogram]", profile.monogram);
  setText("[data-profile-role]", profile.role);
  setText("[data-profile-location]", profile.location);
  setText("[data-profile-status]", profile.status);
  setText("[data-profile-email]", profile.email);
  setText("[data-profile-intro]", profile.intro);
  setText("[data-profile-about]", profile.about);

  document.title = `${profile.name} — ${profile.role}`;
  const emailLink = document.querySelector("[data-email-link]");
  emailLink.href = `mailto:${profile.email}`;

  const projectList = document.querySelector("[data-project-list]");
  const projectTemplate = document.querySelector("#project-template");

  content.projects.forEach((project, index) => {
    const fragment = projectTemplate.content.cloneNode(true);
    const link = fragment.querySelector("[data-project-link]");
    const image = fragment.querySelector("[data-project-image]");

    fragment.querySelector("[data-project-index]").textContent = String(index + 1).padStart(2, "0");
    fragment.querySelector("[data-project-year]").textContent = project.year;
    fragment.querySelector("[data-project-category]").textContent = project.category;
    fragment.querySelector("[data-project-title]").textContent = project.title;
    fragment.querySelector("[data-project-description]").textContent = project.description;
    image.src = project.image;
    image.alt = project.imageAlt;

    if (project.link === "#") {
      link.removeAttribute("target");
      link.removeAttribute("rel");
      link.setAttribute("aria-label", `${project.title}（詳細ページは準備中）`);
      link.addEventListener("click", (event) => event.preventDefault());
    } else {
      link.href = project.link;
      link.setAttribute("aria-label", `${project.title}の詳細を開く`);
    }

    const tagList = fragment.querySelector("[data-project-tags]");
    project.tags.forEach((tag) => {
      const item = document.createElement("li");
      item.textContent = tag;
      tagList.append(item);
    });

    projectList.append(fragment);
  });

  const principles = document.querySelector("[data-principles]");
  content.principles.forEach((principle) => {
    const wrapper = document.createElement("div");
    const term = document.createElement("dt");
    const definition = document.createElement("dd");
    term.textContent = principle.label;
    definition.textContent = principle.text;
    wrapper.append(term, definition);
    principles.append(wrapper);
  });

  const skillList = document.querySelector("[data-skill-list]");
  content.skills.forEach((skill) => {
    const item = document.createElement("li");
    item.textContent = skill;
    skillList.append(item);
  });

  const socialLinks = document.querySelector("[data-social-links]");
  content.socials.forEach((social) => {
    const link = document.createElement("a");
    link.href = social.url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = social.label;
    socialLinks.append(link);
  });

  const menuButton = document.querySelector("[data-menu-button]");
  const nav = document.querySelector("[data-nav]");
  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  const copyButton = document.querySelector("[data-copy-email]");
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setText("[data-copy-label]", "コピーしました");
      window.setTimeout(() => setText("[data-copy-label]", "メールアドレスをコピー"), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  });

  const header = document.querySelector("[data-header]");
  const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const revealElements = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14 },
    );
    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }
})();
