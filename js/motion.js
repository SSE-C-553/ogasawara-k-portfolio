export const createMotionController = (app, {
  Observer = globalThis.IntersectionObserver,
  matchMedia = (query) => globalThis.matchMedia?.(query),
} = {}) => {
  let observer = null;
  let media = null;
  let preferenceUnavailable = false;
  let destroyed = false;
  const pending = new Set();

  try {
    media = matchMedia("(prefers-reduced-motion: reduce)");
  } catch {
    preferenceUnavailable = true;
  }

  const isReducedMotion = () => preferenceUnavailable || Boolean(media?.matches);

  const show = (element) => {
    element.classList.remove("reveal-pending");
    element.classList.add("is-visible");
    pending.delete(element);
  };

  const reset = () => {
    try { observer?.disconnect(); } catch { observer = null; }
    pending.forEach(show);
    app.querySelectorAll("[data-reveal]").forEach(show);
  };

  const onIntersection = (entries) => {
    try {
      for (const entry of entries) {
        if (!entry.isIntersecting || !pending.has(entry.target)) continue;
        if (app.contains(entry.target)) show(entry.target);
        else pending.delete(entry.target);
        observer?.unobserve(entry.target);
      }
    } catch {
      reset();
    }
  };

  const setup = ({ animate = true } = {}) => {
    reset();
    if (destroyed || !animate || isReducedMotion() || typeof Observer !== "function") return;

    try {
      observer ||= new Observer(onIntersection, { threshold: 0.06 });
      const elements = app.querySelectorAll("[data-reveal]");
      elements.forEach((element) => {
        element.classList.remove("is-visible");
        element.classList.add("reveal-pending");
        pending.add(element);
      });
      elements.forEach((element) => observer.observe(element));
    } catch {
      reset();
    }
  };

  const onPreferenceChange = () => {
    if (!isReducedMotion()) return;
    reset();
    app.classList.remove("is-switching");
  };

  const onFocus = (event) => {
    let element = event.target;
    try {
      while (element && element !== app) {
        if (pending.has(element)) {
          show(element);
          observer?.unobserve(element);
        }
        element = element.parentElement;
      }
    } catch {
      reset();
    }
  };

  app.addEventListener("focusin", onFocus);
  try {
    if (media?.addEventListener) media.addEventListener("change", onPreferenceChange);
    else media?.addListener?.(onPreferenceChange);
  } catch {
    preferenceUnavailable = true;
  }

  const destroy = () => {
    destroyed = true;
    reset();
    app.classList.remove("is-switching");
    app.removeEventListener("focusin", onFocus);
    try {
      if (media?.removeEventListener) media.removeEventListener("change", onPreferenceChange);
      else media?.removeListener?.(onPreferenceChange);
    } catch {
      // Cleanup must never leave content hidden.
    }
  };

  return { setup, reset, destroy, isReducedMotion };
};
