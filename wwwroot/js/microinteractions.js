window.microInteractions = {
  init() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const selectors = [
      ".work .section-intro",
      ".work-principles .kicker",
      ".contents .section-intro",
      ".work-flow li"
    ];
    const targets = selectors.flatMap((selector) => Array.from(document.querySelectorAll(selector)));

    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-revealed"));
      return;
    }

    document.documentElement.classList.add("motion-ready");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15 });

    targets.forEach((target) => observer.observe(target));
  }
};
