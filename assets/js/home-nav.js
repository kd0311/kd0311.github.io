document.addEventListener("DOMContentLoaded", () => {
  const links = Array.from(document.querySelectorAll("[data-home-section]"));
  const sections = ["research", "contact", "blog"].map((id) => document.getElementById(id));
  const navbar = document.getElementById("navbar");
  const menu = document.getElementById("navbarNav");
  const toggle = document.querySelector('[data-nav-toggle="navbarNav"]');
  let frameRequested = false;

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
      if (link.dataset.homeSection === "about") {
        event.preventDefault();
        history.replaceState(null, "", window.location.pathname);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
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
