document.addEventListener("DOMContentLoaded", () => {
  const links = Array.from(document.querySelectorAll("[data-home-section]"));
  const sections = ["research", "blog"].map((id) => document.getElementById(id));
  const navbar = document.getElementById("navbar");
  const menu = document.getElementById("navbarNav");
  const toggle = document.querySelector('[data-nav-toggle="navbarNav"]');
  let frameRequested = false;
  let clickedSection = ["research", "blog"].includes(window.location.hash.slice(1))
    ? window.location.hash.slice(1)
    : null;

  const closeMenu = () => {
    menu?.classList.remove("show");
    toggle?.classList.add("collapsed");
    toggle?.setAttribute("aria-expanded", "false");
  };

  const setActive = (section) => {
    links.forEach((link) => {
      const isActive = link.dataset.homeSection === section;
      link.closest(".nav-item")?.classList.toggle("active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const updateActive = () => {
    if (clickedSection) {
      setActive(clickedSection);
      frameRequested = false;
      return;
    }
    const threshold = (navbar?.getBoundingClientRect().height || 0) + 48;
    let active = "about";
    sections.forEach((section) => {
      if (section && section.getBoundingClientRect().top <= threshold) {
        active = section.id;
      }
    });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      active = "blog";
    }
    setActive(active);
    frameRequested = false;
  };

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      closeMenu();
      clickedSection = link.dataset.homeSection;
      setActive(clickedSection);
      if (link.dataset.homeSection === "about") {
        event.preventDefault();
        history.replaceState(null, "", window.location.pathname);
        const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
        window.scrollTo({ top: 0, behavior });
      }
    });
  });

  const resumeScrollTracking = () => {
    clickedSection = null;
  };
  window.addEventListener("wheel", resumeScrollTracking, { passive: true });
  window.addEventListener("touchstart", resumeScrollTracking, { passive: true });
  window.addEventListener("keydown", (event) => {
    if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) {
      resumeScrollTracking();
    }
  });
  window.addEventListener("hashchange", () => {
    const target = window.location.hash.slice(1);
    clickedSection = ["research", "blog"].includes(target) ? target : null;
    updateActive();
  });

  window.addEventListener(
    "scroll",
    () => {
      if (!frameRequested) {
        frameRequested = true;
        requestAnimationFrame(updateActive);
      }
    },
    { passive: true }
  );
  window.addEventListener("resize", updateActive);
  updateActive();
});
