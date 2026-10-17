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
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navLinks.classList.contains("open")) { closeNav(); navToggle.focus(); }
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
    { name: "Project A", role: "Support PM", s: "2025-11-17", e: "2026-01-25" },
    { name: "Project B", role: "Support PM", s: "2025-11-17", e: "2026-01-27" },
    { name: "Project C", role: "Support PM", note: "joined midway, stayed to closure", s: "2026-01-09", e: "2026-06-23" },
    { name: "Project D", role: "Support PM", s: "2026-02-11", e: "2026-04-18" },
    { name: "Project E", role: "Lead PM", note: "cold start through closeout", s: "2026-02-22", e: "2026-05-05" },
    { name: "Project F", role: "Stand-in", note: "emergency weekend handover", s: "2026-03-07", e: "2026-03-08" },
    { name: "Project G", role: "Weekend PM", vip: true, note: "Pareto's VIP project at the time; also weekend technical lead support", s: "2026-04-24", e: "2026-08-17" },
    { name: "Project H", role: "Weekend PM", note: "owns expert recruitment", s: "2026-09-01", e: null },
    { name: "Project I", role: "Lead PM", note: "engineering CAD scoping", s: "2026-10-01", e: null }
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
      return { el: lane, s: s, e: p.e ? e : Infinity, role: p.role }; // open bars never end, even if the scrub rounds past now
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

  /* ---------- BlueMap: one site at a time, QGIS → Firebase → Mapbox ---------- */
  var bmapSvg = doc.getElementById("bmap-map");
  var bmapGo = doc.getElementById("bmap-go");
  if (bmapSvg && bmapGo) {
    // ponytail: coarse hand-traced outline (lng, lat), main islands only; reads as the
    // Philippines at ~200px. Swap for a Natural Earth path if the map ever gets bigger.
    var PH = [
      [[120.6,18.5],[121.2,18.6],[122.2,18.5],[122.3,17.3],[122.5,16.2],[121.6,15.6],[121.6,14.7],[122,14],[122.6,14.2],[123,13.8],[123.8,13.8],[124.1,13],[124,12.6],[123.3,13],[122.6,13.3],[121.8,13.9],[120.9,13.7],[120.6,14.4],[120.1,14.8],[119.8,15.9],[120.3,16.2],[120.4,17.5]],
      [[120.4,13.5],[121.2,13.4],[121.5,12.6],[121.1,12.2],[120.6,12.6],[120.3,13.1]],
      [[119.3,11.4],[119.7,10.5],[118.8,9.6],[117.6,8.6],[117.2,8.4],[117.6,9],[118.5,10],[119,11]],
      [[121.9,11.9],[122.6,11.5],[123.1,11.1],[122.6,10.5],[122,10.5],[121.9,11.3]],
      [[122.9,10.9],[123.5,10.6],[123.2,9.3],[122.6,9.4],[122.4,10]],
      [[123.9,11.3],[124,10.5],[123.4,9.5],[123.5,10.2]],
      [[123.8,10.1],[124.5,10.1],[124.5,9.6],[123.9,9.6]],
      [[123.2,12.5],[123.8,12.3],[123.6,11.9],[123.2,12.2]],
      [[124.3,12.6],[125.3,12.3],[125.7,11.1],[125,11],[124.4,11.6]],
      [[124.3,11.5],[125,11.3],[125.2,10.2],[124.8,10],[124.6,10.8],[124.3,11]],
      [[122,7],[122.2,7.9],[123,8.5],[123.6,8.6],[124.2,8.3],[124.7,8.9],[125.5,9.8],[126,9.3],[126.6,7.3],[126.2,6.3],[125.6,5.6],[125.2,6],[124.2,6.2],[123.9,7],[123.4,7.7],[122.8,7.4]]
    ];
    // Real mangrove areas, but example records: not the live BlueMap dataset.
    var SITES = [
      { id: "banacon", name: "Banacon", prov: "Bohol", lng: 124.2, lat: 10.2 },
      { id: "pagbilao", name: "Pagbilao", prov: "Quezon", lng: 121.7, lat: 13.9 },
      { id: "kalibo", name: "Kalibo", prov: "Aklan", lng: 122.4, lat: 11.7 },
      { id: "honda-bay", name: "Honda Bay", prov: "Palawan", lng: 118.9, lat: 9.9 },
      { id: "guiuan", name: "Guiuan", prov: "Eastern Samar", lng: 125.7, lat: 11.1 },
      { id: "bais", name: "Bais", prov: "Negros Oriental", lng: 123.1, lat: 9.6 },
      { id: "zamboanga", name: "Zamboanga", prov: "Zamboanga", lng: 122.1, lat: 7 }
    ];
    var bx = function (lng) { return ((lng - 116.8) * 10).toFixed(1); };
    var by = function (lat) { return ((19 - lat) * 10).toFixed(1); };
    var NS = "http://www.w3.org/2000/svg";
    bmapSvg.innerHTML = PH.map(function (poly) {
      return '<polygon class="bmap-land" points="' + poly.map(function (p) { return bx(p[0]) + "," + by(p[1]); }).join(" ") + '"/>';
    }).join("");

    var bmapStages = doc.querySelectorAll("#bmap .bmap-stage");
    var bmapQgis = doc.getElementById("bmap-qgis");
    var bmapFb = doc.getElementById("bmap-fb");
    var bmapCount = doc.getElementById("bmap-count");
    var bmapNext = 0, bmapBusy = false;
    var hot = function (i) {
      bmapStages.forEach(function (s, n) { s.classList.toggle("hot", n === i); });
    };
    var later = function (ms, fn) { setTimeout(fn, reduceMotion ? 0 : ms); };

    bmapGo.addEventListener("click", function () {
      if (bmapBusy) return; // let the current site land first
      if (bmapNext === SITES.length) {
        bmapSvg.querySelectorAll(".bmap-pin").forEach(function (p) { p.remove(); });
        bmapQgis.textContent = bmapFb.textContent = "";
        bmapNext = 0;
        bmapCount.textContent = "0";
        bmapGo.textContent = "Publish a site";
        hot(-1);
        return;
      }
      var s = SITES[bmapNext], fid = bmapNext + 1;
      bmapNext++;
      bmapBusy = true;
      hot(0);
      bmapQgis.textContent =
        "restoration_sites\n" +
        "fid   " + fid + "\n" +
        "name  " + s.name + "\n" +
        "prov  " + s.prov + "\n" +
        "geom  POINT (" + s.lng + " " + s.lat + ")";
      later(550, function () {
        hot(1);
        bmapFb.textContent =
          "sites/" + s.id + " {\n" +
          '  name: "' + s.name + '",\n' +
          '  province: "' + s.prov + '",\n' +
          "  lng: " + s.lng + ",\n" +
          "  lat: " + s.lat + "\n}";
      });
      later(1100, function () {
        hot(2);
        bmapSvg.querySelectorAll(".bmap-pin.new").forEach(function (p) { p.classList.remove("new"); });
        var pin = doc.createElementNS(NS, "circle");
        pin.setAttribute("class", "bmap-pin new");
        pin.setAttribute("cx", bx(s.lng));
        pin.setAttribute("cy", by(s.lat));
        pin.setAttribute("r", "2.6");
        bmapSvg.appendChild(pin);
        bmapCount.textContent = String(bmapNext);
        bmapGo.textContent = bmapNext === SITES.length ? "Start over" : "Publish another";
        bmapBusy = false;
      });
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
    // spans, not divs: this all sits inside a <button>, which only allows phrasing content
    var wrap = doc.createElement("span");
    wrap.className = "w-reality";
    wrap.setAttribute("aria-hidden", "true"); // decorative echo of modal content
    var inner = doc.createElement("span");
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

    var left = doc.createElement("span");
    var title = doc.createElement("span");
    title.className = "w-title";
    title.innerHTML = p.title + ' <span class="w-arrow" aria-hidden="true">&rarr;</span>';
    var impact = doc.createElement("span");
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

  // Small animated chart for a project. `flow`: steps, optional `gate` index.
  // `bars`: [label, value, max, shown], optional `goal`: [value, label] on the same scale.
  // `sheet`: a messy tracker that tidies itself (see the tracker entry in projects.js).
  function vizEl(v) {
    var fig = doc.createElement("figure");
    fig.className = "viz";
    if (v.flow) {
      var ol = doc.createElement("ol");
      ol.className = "viz-flow";
      v.flow.forEach(function (step, i) {
        var li = doc.createElement("li");
        li.style.animationDelay = i * 0.15 + "s";
        var pill = doc.createElement("span");
        pill.textContent = step;
        if (i === v.gate) pill.className = "is-gate";
        li.appendChild(pill);
        ol.appendChild(li);
      });
      fig.appendChild(ol);
    }
    var bars = v.bars || [];
    var goalPct = v.goal && bars.length ? (v.goal[0] / bars[0][2]) * 100 + "%" : null;
    if (goalPct) {
      var head = doc.createElement("div");
      head.className = "viz-bar viz-goal-row";
      head.innerHTML = '<span></span><span class="viz-goal-track"><span class="viz-goal-label"></span></span><span></span>';
      var gl = head.querySelector(".viz-goal-label");
      gl.textContent = v.goal[1];
      gl.style.left = goalPct;
      fig.appendChild(head);
    }
    bars.forEach(function (b, i) {
      var row = doc.createElement("div");
      row.className = "viz-bar";
      row.innerHTML = '<span></span><span class="viz-track"><span class="viz-fill"></span></span><span class="viz-val"></span>';
      row.children[0].textContent = b[0];
      var fill = row.querySelector(".viz-fill");
      fill.style.width = (b[1] / b[2]) * 100 + "%";
      fill.style.animationDelay = 0.15 + i * 0.2 + "s";
      if (goalPct) {
        var g = doc.createElement("span");
        g.className = "viz-goal";
        g.style.left = goalPct;
        row.querySelector(".viz-track").appendChild(g);
      }
      row.children[2].textContent = b[3];
      fig.appendChild(row);
    });
    if (v.sheet) fig.appendChild(sheetEl(v.sheet));
    if (v.caption) {
      var cap = doc.createElement("figcaption");
      cap.textContent = v.caption;
      fig.appendChild(cap);
    }
    if (v.sheet && !reduceMotion) {
      var replay = doc.createElement("button");
      replay.type = "button";
      replay.className = "viz-replay";
      replay.textContent = "Replay";
      replay.addEventListener("click", function () { tidy(fig.querySelector(".sheet")); });
      fig.appendChild(replay);
    }
    // Play the animation once the chart scrolls into view, not on open.
    var play = function () {
      fig.classList.add("is-live");
      if (v.sheet) tidy(fig.querySelector(".sheet"));
    };
    if (!window.IntersectionObserver) { play(); return fig; }
    var io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { io.disconnect(); play(); }
    }, { threshold: 0.6 });
    io.observe(fig);
    return fig;
  }

  function swapEl(before, after) {
    var sw = doc.createElement("span");
    sw.className = "sw";
    sw.innerHTML = '<span class="sw-b"></span><span class="sw-a"></span>';
    sw.children[0].textContent = before;
    sw.children[1].textContent = after;
    return sw;
  }

  function sheetEl(s) {
    var sheet = doc.createElement("div");
    sheet.className = "sheet";
    sheet.setAttribute("aria-hidden", "true");
    var cell = function (row, cls, content) {
      var c = doc.createElement("span");
      c.className = cls;
      if (typeof content === "string") c.textContent = content; else c.appendChild(content);
      row.appendChild(c);
      return c;
    };
    var head = doc.createElement("div");
    head.className = "sheet-row sheet-head";
    cell(head, "c-book", "Book");
    s.cols.forEach(function (name, k) {
      cell(head, k ? "c-who extra" : "c-who", k ? name : swapEl(name, s.cols[s.cols.length - 1]));
    });
    cell(head, "c-status", "Status");
    sheet.appendChild(head);
    s.rows.forEach(function (r) {
      var row = doc.createElement("div");
      row.className = "sheet-row";
      cell(row, "c-book", r[0]);
      s.cols.forEach(function (_, k) {
        var has = r[2].indexOf(k) !== -1 ? r[1] : "";
        var c = cell(row, k ? "c-who extra" : "c-who", k ? has : swapEl(has, r[1]));
        // Names typed into more than one column: the mess the redesign removed.
        if (has && r[2].length > 1) c.classList.add("hl");
      });
      cell(row, "c-status" + (r[4] === s.key ? " is-key" : ""), swapEl(r[3], r[4]));
      sheet.appendChild(row);
    });
    return sheet;
  }

  function tidy(sheet) {
    sheet.classList.remove("is-clean");
    void sheet.offsetWidth; // restart the transition on replay
    setTimeout(function () { sheet.classList.add("is-clean"); }, reduceMotion ? 0 : 1600);
  }

  function shotEl(img) {
    var btn = doc.createElement("button");
    btn.type = "button";
    btn.className = "modal-shot";
    btn.title = "Enlarge";
    var el = doc.createElement("img");
    el.src = img.src;
    el.alt = img.alt;
    btn.appendChild(el);
    btn.addEventListener("click", function () { openLightbox(img); });
    return btn;
  }

  function openModal(p) {
    if (!modal) return;
    lastFocused = doc.activeElement;
    var meta = [p.role, p.year].filter(Boolean).join(" · ");
    modalEyebrow.textContent = meta;
    modalTitle.textContent = p.title;
    modalBody.innerHTML = "";
    if (p.visual) modalBody.appendChild(vizEl(p.visual));
    // Body items: a string is a paragraph, {src, alt} a screenshot, anything else a chart.
    // ponytail: images are built per-open, so nothing loads until a project is opened.
    p.body.concat(p.images || []).forEach(function (item) {
      if (typeof item === "string") {
        var el = doc.createElement("p");
        el.innerHTML = item;
        modalBody.appendChild(el);
      } else if (item.src) {
        modalBody.appendChild(shotEl(item));
      } else {
        modalBody.appendChild(vizEl(item));
      }
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
    modal.querySelector(".modal-panel").scrollTop = 0;
    modal.showModal();
    doc.body.style.overflow = "hidden";
    var close = modal.querySelector(".modal-close");
    if (close) close.focus();
  }

  function closeModal() {
    if (!modal || !modal.open || modal.classList.contains("closing")) return;
    modal.classList.add("closing");
    setTimeout(function () {
      modal.classList.remove("closing");
      modal.close();
      doc.body.style.overflow = "";
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }, reduceMotion ? 0 : 200);
  }

  doc.addEventListener("click", function (e) {
    var a = e.target.closest("[data-open]");
    var p = a && projects.filter(function (q) { return q.id === a.dataset.open; })[0];
    if (p) { e.preventDefault(); openModal(p); }
  });

  if (modal) {
    // A click on the dialog element itself (not the panel) is a click on the backdrop.
    modal.addEventListener("click", function (e) {
      if (e.target === modal || e.target.hasAttribute("data-close")) closeModal();
    });
    // Esc: run the closing animation instead of the instant native close.
    modal.addEventListener("cancel", function (e) { e.preventDefault(); closeModal(); });
  }
})();

console.log("%c// been writing these since I was 12. still here.", "color:#22d3ee");
