(() => {
  "use strict";
  const button = document.querySelector(".menu-button");
  const nav = document.querySelector(".nav");
  if (!button || !nav) return;

  button.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    button.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      button.setAttribute("aria-expanded", "false");
    });
  });
})();


(() => {
  "use strict";
  const lightbox = document.querySelector("#performance-lightbox");
  if (!lightbox) return;

  const lightboxImage = lightbox.querySelector(".lightbox-image");
  const closeButton = lightbox.querySelector(".lightbox-close");
  const triggers = Array.from(document.querySelectorAll(".lightbox-trigger"));
  let previousFocus = null;
  let currentIndex = 0;
  let touchStartX = 0;

  const showImage = index => {
    currentIndex = (index + triggers.length) % triggers.length;
    const image = triggers[currentIndex].querySelector("img");
    if (!image) return;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");
    lightboxImage.removeAttribute("src");
    lightboxImage.alt = "";
    if (previousFocus) previousFocus.focus();
  };

  triggers.forEach((trigger, index) => {
    trigger.addEventListener("click", event => {
      previousFocus = event.currentTarget;
      showImage(index);
      lightbox.hidden = false;
      document.body.classList.add("lightbox-open");
      closeButton.focus();
    });
  });

  closeButton.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", event => {
    if (event.target === lightbox || event.target === lightboxImage) closeLightbox();
  });
  document.addEventListener("keydown", event => {
    if (lightbox.hidden) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowRight") showImage(currentIndex + 1);
    if (event.key === "ArrowLeft") showImage(currentIndex - 1);
  });
  lightbox.addEventListener("touchstart", event => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });
  lightbox.addEventListener("touchend", event => {
    const distance = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) < 48) return;
    showImage(currentIndex + (distance < 0 ? 1 : -1));
  }, { passive: true });
})();


(() => {
  "use strict";
  const targets = document.querySelectorAll(
    ".section-label, .two-column > *, .section-head > *, .member-card, .movie-frame, .performance-title-block, .performance-copy, .performance-photo, .performance-history-head, .performance-history-list, .contact-content"
  );
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    targets.forEach(target => target.classList.add("is-visible"));
    return;
  }
  targets.forEach(target => target.classList.add("reveal"));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: .12, rootMargin: "0px 0px -5% 0px" });
  targets.forEach(target => observer.observe(target));
})();
