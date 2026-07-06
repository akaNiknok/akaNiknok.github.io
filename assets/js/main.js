/* ============================================================
   main.js — theme toggle, scroll reveals, nav, work list, modal
   No dependencies. Respects prefers-reduced-motion.
   ============================================================ */
(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Footer year ---------- */
  var yearEl = doc.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Theme toggle ---------- */
  var themeBtn = doc.querySelector(".theme-toggle");
  function syncThemeLabel() {
    if (!themeBtn) return;
    var dark = root.getAttribute("data-theme") === "dark";
    themeBtn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  }
  syncThemeLabel();
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      syncThemeLabel();
    });
  }

  /* ---------- Sticky header border on scroll ---------- */
  var header = doc.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile nav ---------- */
  var navToggle = doc.querySelector(".nav-toggle");
  var navLinks = doc.getElementById("nav-links");
  function closeNav() {
    if (!navToggle || !navLinks) return;
    navToggle.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("open");
  }
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!open));
      navLinks.classList.toggle("open", !open);
    });
    navLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeNav();
    });
  }

  /* ---------- Scroll reveals ---------- */
  var reveals = doc.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = parseFloat(el.dataset.delay || "0");
          setTimeout(function () { el.classList.add("in"); }, delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Selected work list ---------- */
  var projects = window.PROJECTS || [];
  var listEl = doc.getElementById("work-list");
  var moreBtn = doc.getElementById("work-more");
  var expanded = false;

  function projectRow(p, stagger) {
    var li = doc.createElement("li");
    li.className = "reveal";
    if (stagger) li.dataset.delay = String(stagger);

    var btn = doc.createElement("button");
    btn.type = "button";
    btn.className = "work-row";
    btn.setAttribute("aria-haspopup", "dialog");

    var left = doc.createElement("div");
    var title = doc.createElement("div");
    title.className = "w-title";
    title.innerHTML = p.title + ' <span class="w-arrow" aria-hidden="true">&rarr;</span>';
    var impact = doc.createElement("div");
    impact.className = "w-impact";
    impact.textContent = p.impact;
    left.appendChild(title);
    left.appendChild(impact);

    var tags = doc.createElement("span");
    tags.className = "w-tags";
    tags.textContent = p.tags.join(" · ");

    btn.appendChild(left);
    btn.appendChild(tags);
    btn.addEventListener("click", function () { openModal(p); });

    li.appendChild(btn);
    return li;
  }

  function renderWork() {
    if (!listEl) return;
    listEl.innerHTML = "";
    var shown = projects.filter(function (p) { return expanded || p.featured; });
    shown.forEach(function (p, i) {
      var el = projectRow(p, reduceMotion ? 0 : i * 60);
      listEl.appendChild(el);
      // newly added rows should reveal too
      if (reduceMotion) el.classList.add("in");
      else requestAnimationFrame(function () { el.classList.add("in"); });
    });
    if (moreBtn) {
      var hiddenCount = projects.length - projects.filter(function (p) { return p.featured; }).length;
      moreBtn.textContent = expanded ? "Show fewer ↑" : "See all " + projects.length + " projects ↓";
      moreBtn.setAttribute("aria-expanded", String(expanded));
      moreBtn.style.display = hiddenCount > 0 ? "" : "none";
    }
  }

  if (moreBtn) {
    moreBtn.addEventListener("click", function () {
      expanded = !expanded;
      renderWork();
    });
  }
  renderWork();

  /* ---------- Project modal ---------- */
  var modal = doc.getElementById("project-modal");
  var modalEyebrow = doc.getElementById("modal-eyebrow");
  var modalTitle = doc.getElementById("modal-title");
  var modalBody = doc.getElementById("modal-body");
  var modalTech = doc.getElementById("modal-tech");
  var lastFocused = null;

  function focusables() {
    return modal.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])');
  }

  function openModal(p) {
    if (!modal) return;
    lastFocused = doc.activeElement;
    var meta = [p.role, p.year].filter(Boolean).join(" · ");
    modalEyebrow.textContent = meta;
    modalTitle.textContent = p.title;
    modalBody.innerHTML = "";
    p.body.forEach(function (para) {
      var el = doc.createElement("p");
      el.innerHTML = para;
      modalBody.appendChild(el);
    });
    modalTech.innerHTML = "";
    (p.tech || []).forEach(function (t) {
      var el = doc.createElement("span");
      el.textContent = t;
      modalTech.appendChild(el);
    });
    modal.hidden = false;
    doc.body.style.overflow = "hidden";
    var close = modal.querySelector(".modal-close");
    if (close) close.focus();
  }

  function closeModal() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    doc.body.style.overflow = "";
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target.hasAttribute("data-close")) closeModal();
    });
    doc.addEventListener("keydown", function (e) {
      if (modal.hidden) return;
      if (e.key === "Escape") { closeModal(); return; }
      if (e.key === "Tab") {
        var f = focusables();
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }
})();
