/* ============================================================
   main.js: theme, nav, the interactive pieces, work list, modal
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
  var themeEaseTimer;
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      if (!reduceMotion) {
        // Exhale: crossfade all colors for one slow beat, then clean up.
        root.classList.add("theme-easing");
        clearTimeout(themeEaseTimer);
        themeEaseTimer = setTimeout(function () { root.classList.remove("theme-easing"); }, 650);
      }
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

  /* ---------- A normal week: scattered cards settle as you scroll ---------- */
  // --p goes 0 (mess) to 1 (ordered); CSS does the rest. Defaults to 1 without JS.
  var settle = doc.getElementById("settle");
  if (settle && !reduceMotion) {
    var settleQueued = false;
    var settleTick = function () {
      settleQueued = false;
      var r = settle.getBoundingClientRect();
      var vh = window.innerHeight;
      var p = Math.min(1, Math.max(0, (vh * 0.9 - r.top) / (vh * 0.55)));
      p = p * p * (3 - 2 * p); // smoothstep
      settle.style.setProperty("--p", p.toFixed(3));
    };
    var queueSettle = function () {
      if (!settleQueued) { settleQueued = true; requestAnimationFrame(settleTick); }
    };
    settleTick();
    window.addEventListener("scroll", queueSettle, { passive: true });
    window.addEventListener("resize", queueSettle);
  }

  /* ---------- Segmented controls: sliding thumb ---------- */
  // CSS draws the thumb from these vars; hidden when nothing is pressed.
  var segGroups = doc.querySelectorAll(".depth-toggle, .calib-presets");
  function syncThumb(group) {
    var on = group.querySelector('[aria-pressed="true"]');
    group.style.setProperty("--to", on ? "1" : "0");
    if (!on) return;
    group.style.setProperty("--tx", on.offsetLeft + "px");
    group.style.setProperty("--ty", on.offsetTop + "px");
    group.style.setProperty("--tw", on.offsetWidth + "px");
    group.style.setProperty("--th", on.offsetHeight + "px");
  }
  function syncThumbs() { segGroups.forEach(syncThumb); }
  syncThumbs();
  window.addEventListener("resize", syncThumbs);
  if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(syncThumbs);

  /* ---------- Experience: 30-second / 5-minute toggle ---------- */
  var timeline = doc.getElementById("timeline");
  var depthBtns = doc.querySelectorAll(".depth-toggle button");
  depthBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (timeline.dataset.depth === btn.dataset.depth) return;
      depthBtns.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
      syncThumb(btn.parentNode);
      var swap = function () { timeline.dataset.depth = btn.dataset.depth; };
      if (doc.startViewTransition && !reduceMotion) doc.startViewTransition(swap);
      else swap();
    });
  });

  /* ---------- Peso / dollar toggle ---------- */
  // ponytail: fixed rate (~₱58/$) baked into data-usd; update by hand if it drifts far.
  var moneyBtns = doc.querySelectorAll(".money");
  var showUsd = false;
  function syncMoney() {
    moneyBtns.forEach(function (b) {
      b.textContent = showUsd ? b.dataset.usd : b.dataset.php;
      b.setAttribute("aria-label", b.textContent + ", show in " + (showUsd ? "pesos" : "US dollars"));
    });
  }
  moneyBtns.forEach(function (b) {
    b.title = "Switch currency (about ₱58 to the dollar)";
    b.addEventListener("click", function () { showUsd = !showUsd; syncMoney(); });
  });
  syncMoney();

  /* ---------- Pareto portfolio Gantt ---------- */
  // Month-level dates; codenames deliberately left out (see CLAUDE.md).
  var GANTT = [
    { name: "Project A", role: "Support PM", s: "2025-11-10", e: "2026-01-25" },
    { name: "Project B", role: "Support PM", s: "2025-11-17", e: "2026-01-27" },
    { name: "Project C", role: "Support PM", note: "joined midway, stayed to closure", s: "2026-01-09", e: "2026-06-23" },
    { name: "Project D", role: "Support PM", s: "2026-02-11", e: "2026-04-18" },
    { name: "Project E", role: "Lead PM", note: "cold start through closeout", s: "2026-02-22", e: "2026-05-05" },
    { name: "Project F", role: "Stand-in", note: "emergency weekend handover", s: "2026-03-07", e: "2026-03-08" },
    { name: "Project G", role: "Support PM", vip: true, note: "Pareto's VIP project at the time", s: "2026-04-24", e: "2026-08-12" },
    { name: "Project H", role: "Support PM", s: "2026-09-01", e: null }
  ];
  var ganttChart = doc.getElementById("gantt-chart");
  var ganttScrub = doc.getElementById("gantt-scrub");
  var ganttReadout = doc.getElementById("gantt-readout");
  if (ganttChart && ganttScrub) {
    var DAY = 864e5;
    var g0 = Date.parse("2025-11-01");
    var gNow = Date.now();
    var gDays = Math.round((gNow - g0) / DAY);
    var pct = function (t) { return ((t - g0) / (gNow - g0)) * 100; };
    var monthFmt = function (t) { return new Date(t).toLocaleDateString("en-US", { month: "short" }); };

    var lanes = GANTT.map(function (p) {
      var s = Date.parse(p.s);
      var e = p.e ? Date.parse(p.e) : gNow;
      var lane = doc.createElement("div");
      lane.className = "g-lane";
      if (p.note) lane.title = p.name + ": " + p.note;
      lane.innerHTML =
        '<span class="g-label">' + p.name + " <em>" + p.role + "</em>" +
        (p.vip ? ' <b class="g-vip">VIP</b>' : "") + "</span>" +
        '<span class="g-track"><span class="g-bar' + (p.e ? "" : " g-open") + '" style="left:' +
        pct(s) + "%;width:" + Math.max(pct(e) - pct(s), 0.8) + '%"></span></span>';
      ganttChart.appendChild(lane);
      return { el: lane, s: s, e: e, role: p.role };
    });

    var axis = doc.createElement("div");
    axis.className = "g-axis";
    axis.setAttribute("aria-hidden", "true");
    for (var m = new Date(g0); m.getTime() <= gNow; m.setMonth(m.getMonth() + 1)) {
      var tick = doc.createElement("span");
      tick.style.left = pct(m.getTime()) + "%";
      tick.textContent = m.getMonth() === 0 ? String(m.getFullYear()) : monthFmt(m);
      axis.appendChild(tick);
    }
    ganttChart.appendChild(axis);

    var cursor = doc.createElement("div");
    cursor.className = "g-cursor";
    cursor.setAttribute("aria-hidden", "true");
    ganttChart.appendChild(cursor);

    ganttScrub.max = String(gDays);
    ganttScrub.value = String(gDays);
    var renderGantt = function () {
      var t = g0 + Number(ganttScrub.value) * DAY;
      var active = 0, touched = 0;
      lanes.forEach(function (l) {
        var state = t < l.s ? "future" : t > l.e ? "past" : "active";
        if (state !== "future") touched++;
        if (state === "active") active++;
        l.el.dataset.state = state;
      });
      cursor.style.setProperty("--t", pct(t) / 100);
      var label = new Date(t).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      ganttReadout.innerHTML = "<strong>" + label + "</strong><span>" + active + " running</span><span>" +
        touched + " touched so far</span>";
      ganttScrub.setAttribute("aria-valuetext", label + ": " + active + " running, " + touched + " touched so far");
    };
    ganttScrub.addEventListener("input", renderGantt);
    renderGantt();
  }

  /* ---------- ACTS overtime: 1,144 squares, 936 automated away ---------- */
  var dotsGrid = doc.getElementById("dots-grid");
  var dotsToggle = doc.getElementById("dots-toggle");
  var dotsCount = doc.getElementById("dots-count");
  if (dotsGrid && dotsToggle) {
    var BEFORE = 1144, AFTER = 208;
    // Pick which 936 go, at random, and give each a random fade delay.
    var cut = new Array(BEFORE).fill(false);
    for (var k = 0; k < BEFORE - AFTER; k++) cut[k] = true;
    for (var j = BEFORE - 1; j > 0; j--) {
      var r = Math.floor(Math.random() * (j + 1));
      var tmp = cut[j]; cut[j] = cut[r]; cut[r] = tmp;
    }
    dotsGrid.innerHTML = cut.map(function (c) {
      return c ? '<i class="c" style="--d:' + Math.round(Math.random() * 700) + 'ms"></i>' : "<i></i>";
    }).join("");

    var countTo = function (from, to) {
      if (reduceMotion) { dotsCount.textContent = to.toLocaleString("en-US"); return; }
      var start = performance.now();
      var step = function (now) {
        var k2 = Math.min(1, (now - start) / 900);
        var eased = 1 - Math.pow(1 - k2, 3);
        dotsCount.textContent = Math.round(from + (to - from) * eased).toLocaleString("en-US");
        if (k2 < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    dotsToggle.addEventListener("click", function () {
      var on = dotsGrid.classList.toggle("automated");
      dotsToggle.setAttribute("aria-pressed", String(on));
      dotsToggle.textContent = on ? "Undo" : "Automate it";
      countTo(on ? BEFORE : AFTER, on ? AFTER : BEFORE);
    });
  }

  /* ---------- Reviewer calibration demo ---------- */
  // Synthetic reviewers shaped like the real analysis. Scores are counts on a 1-5 scale.
  var REVIEWERS = [
    [0, 1, 3, 8, 28], [2, 8, 14, 9, 2], [0, 0, 2, 10, 33], [3, 12, 20, 11, 2],
    [6, 13, 11, 4, 1], [1, 9, 17, 10, 4], [1, 5, 12, 14, 6], [2, 7, 13, 8, 3]
  ];
  var PRESETS = { bell: [5, 24, 40, 24, 5], flat: [20, 20, 20, 20, 20], lenient: [2, 5, 15, 35, 43] };
  var THRESHOLD = 0.12;
  var calibBars = doc.getElementById("calib-bars");
  var calibList = doc.getElementById("calib-reviewers");

  function normalize(a) {
    var s = a.reduce(function (x, y) { return x + y; }, 0) || 1;
    return a.map(function (v) { return v / s; });
  }
  // Jensen-Shannon divergence, base 2, so it runs 0 (identical) to 1.
  function jsd(p, q) {
    p = normalize(p); q = normalize(q);
    var kl = function (a, m) {
      return a.reduce(function (s, v, i) { return v > 0 ? s + v * Math.log2(v / m[i]) : s; }, 0);
    };
    var m = p.map(function (v, i) { return (v + q[i]) / 2; });
    return (kl(p, m) + kl(q, m)) / 2;
  }

  if (calibBars && calibList) {
    var ref = PRESETS.bell.slice();
    var MAXW = 50;
    var presetBtns = doc.querySelectorAll("#calib-presets button");

    var refEls = ref.map(function (_, i) {
      var col = doc.createElement("div");
      col.className = "cb-col";
      var bar = doc.createElement("div");
      bar.className = "cb-bar";
      bar.tabIndex = 0;
      bar.setAttribute("role", "slider");
      bar.setAttribute("aria-label", "Weight of " + (i + 1) + "-star scores in the reference");
      bar.setAttribute("aria-valuemin", "0");
      bar.setAttribute("aria-valuemax", String(MAXW));
      bar.innerHTML = '<span class="cb-fill"></span><span class="cb-val"></span>';
      var label = doc.createElement("span");
      label.className = "cb-label";
      label.textContent = String(i + 1);
      col.appendChild(bar);
      col.appendChild(label);
      calibBars.appendChild(col);

      var setFromY = function (clientY) {
        var box = bar.getBoundingClientRect();
        var v = (1 - (clientY - box.top) / box.height) * MAXW;
        setWeight(i, v);
      };
      bar.addEventListener("pointerdown", function (e) {
        bar.setPointerCapture(e.pointerId);
        setFromY(e.clientY);
      });
      bar.addEventListener("pointermove", function (e) {
        if (bar.hasPointerCapture(e.pointerId)) setFromY(e.clientY);
      });
      bar.addEventListener("keydown", function (e) {
        var d = { ArrowUp: 2, ArrowRight: 2, ArrowDown: -2, ArrowLeft: -2 }[e.key];
        if (d) { e.preventDefault(); setWeight(i, ref[i] + d); }
      });
      return bar;
    });

    var rowEls = REVIEWERS.map(function (counts, i) {
      var n = counts.reduce(function (a, b) { return a + b; }, 0);
      var peak = Math.max.apply(null, counts);
      var li = doc.createElement("li");
      li.className = "cr-row";
      li.innerHTML =
        '<span class="cr-name">Reviewer ' + (i + 1) + " <em>" + n + " reviews</em></span>" +
        '<span class="cr-hist" aria-hidden="true">' + counts.map(function (c) {
          return '<i style="height:' + Math.max(8, (c / peak) * 100) + '%"></i>';
        }).join("") + "</span>" +
        '<span class="cr-meter" aria-hidden="true"><i class="cr-fill"></i><i class="cr-line" style="left:' +
        THRESHOLD * 200 + '%"></i></span>' +
        '<span class="cr-score"></span>';
      calibList.appendChild(li);
      return li;
    });

    var setWeight = function (i, v) {
      ref[i] = Math.max(0, Math.min(MAXW, Math.round(v)));
      presetBtns.forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      syncThumb(presetBtns[0].parentNode);
      renderCalib();
    };

    var renderCalib = function () {
      var shares = normalize(ref);
      refEls.forEach(function (bar, i) {
        var pctVal = Math.round(shares[i] * 100);
        bar.querySelector(".cb-fill").style.height = (ref[i] / MAXW) * 100 + "%";
        // Raw weights, not shares: the reference I actually used (5/24/40/24/5) sums to 98.
        bar.querySelector(".cb-val").textContent = ref[i];
        bar.setAttribute("aria-valuenow", String(ref[i]));
        bar.setAttribute("aria-valuetext", ref[i] + " (" + pctVal + "% of the reference)");
      });
      REVIEWERS.forEach(function (counts, i) {
        var d = jsd(counts, ref);
        var flagged = d > THRESHOLD;
        var row = rowEls[i];
        row.classList.toggle("flagged", flagged);
        // Meter spans 0-0.5 of the 0-1 JSD range; the drift we care about lives there.
        row.querySelector(".cr-fill").style.width = Math.min(100, d * 200) + "%";
        row.querySelector(".cr-score").textContent = d.toFixed(2) + (flagged ? " · flagged" : "");
      });
    };

    presetBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        ref = PRESETS[btn.dataset.preset].slice();
        presetBtns.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
        syncThumb(btn.parentNode);
        renderCalib();
      });
    });
    renderCalib();
  }

  /* ---------- Selected work list ---------- */
  var projects = window.PROJECTS || [];
  var listEl = doc.getElementById("work-list");
  var moreBtn = doc.getElementById("work-more");
  var expanded = false;

  // Build the "what it actually took" annotation block: dense mono fragments
  // with staggered reveal (delay set via --i; CSS handles the motion).
  function realityLayer(fragments) {
    var wrap = doc.createElement("div");
    wrap.className = "w-reality";
    wrap.setAttribute("aria-hidden", "true"); // decorative echo of modal content
    var inner = doc.createElement("div");
    inner.className = "w-reality-inner";
    fragments.forEach(function (frag, i) {
      var span = doc.createElement("span");
      span.className = "w-frag";
      span.style.setProperty("--i", i);
      span.textContent = frag;
      inner.appendChild(span);
    });
    wrap.appendChild(inner);
    return wrap;
  }

  function projectRow(p) {
    var li = doc.createElement("li");

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
    if (p.reality && p.reality.length) left.appendChild(realityLayer(p.reality));

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
    shown.forEach(function (p) { listEl.appendChild(projectRow(p)); });
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

  /* ---------- Screenshot lightbox ---------- */
  var lightbox = doc.getElementById("lightbox");
  var lightboxImg = doc.getElementById("lightbox-img");

  function openLightbox(img) {
    if (!lightbox) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.showModal();
  }

  if (lightbox) {
    // Any click inside dismisses — the image is the only thing here.
    lightbox.addEventListener("click", function () { lightbox.close(); });
  }

  /* ---------- Project modal ---------- */
  var modal = doc.getElementById("project-modal");
  var modalEyebrow = doc.getElementById("modal-eyebrow");
  var modalTitle = doc.getElementById("modal-title");
  var modalBody = doc.getElementById("modal-body");
  var modalReality = doc.getElementById("modal-reality");
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
    // ponytail: images are built per-open, so nothing loads until a project is opened.
    (p.images || []).forEach(function (img) {
      var btn = doc.createElement("button");
      btn.type = "button";
      btn.className = "modal-shot";
      btn.title = "Enlarge";
      var el = doc.createElement("img");
      el.src = img.src;
      el.alt = img.alt;
      btn.appendChild(el);
      btn.addEventListener("click", function () { openLightbox(img); });
      modalBody.appendChild(btn);
    });
    if (modalReality) {
      modalReality.innerHTML = "";
      if (p.reality && p.reality.length) {
        var label = doc.createElement("p");
        label.className = "modal-reality-label";
        label.textContent = "What it actually took";
        modalReality.appendChild(label);
        p.reality.forEach(function (frag) {
          var el = doc.createElement("span");
          el.className = "w-frag";
          el.textContent = frag;
          modalReality.appendChild(el);
        });
        modalReality.hidden = false;
      } else {
        modalReality.hidden = true;
      }
    }
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
    if (!modal || modal.hidden || modal.classList.contains("closing")) return;
    modal.classList.add("closing");
    setTimeout(function () {
      modal.classList.remove("closing");
      modal.hidden = true;
      doc.body.style.overflow = "";
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }, reduceMotion ? 0 : 200);
  }

  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target.hasAttribute("data-close")) closeModal();
    });
    doc.addEventListener("keydown", function (e) {
      if (modal.hidden) return;
      // The lightbox sits on top and handles its own Esc/Tab.
      if (lightbox && lightbox.open) return;
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

console.log("%c// been writing these since I was 12. still here.", "color:#22d3ee");
