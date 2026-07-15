/* Alan Duncan Garage Services — vanilla, no dependencies. */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---- mobile nav ---- */
  var burger = $(".burger"), mNav = $("#m-nav");
  if (burger && mNav) {
    var setOpen = function (o) { burger.setAttribute("aria-expanded", String(o)); mNav.hidden = !o; };
    burger.addEventListener("click", function () { setOpen(burger.getAttribute("aria-expanded") !== "true"); });
    mNav.addEventListener("click", function (e) { if (e.target.tagName === "A") setOpen(false); });
  }

  /* ---- footer year ---- */
  var y = $("[data-year]"); if (y) y.textContent = new Date().getFullYear();

  /* ---- scroll reveal ---- */
  var targets = $$(".svc, .rev, .cars-copy, .cars-photo, .find-card, .map-wrap, .sec-head");
  if (!reduce && "IntersectionObserver" in window) {
    targets.forEach(function (el) { el.classList.add("reveal"); });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---- gauge tick marks ---- */
  var ticks = $("[data-ticks]");
  if (ticks) {
    var cx = 160, cy = 132, r0 = 104, r1 = 115, N = 10, frag = "";
    for (var i = 0; i <= N; i++) {
      var a = Math.PI * (1 - i / N);
      frag += '<line x1="' + (cx + r0 * Math.cos(a)).toFixed(1) + '" y1="' + (cy - r0 * Math.sin(a)).toFixed(1) +
        '" x2="' + (cx + r1 * Math.cos(a)).toFixed(1) + '" y2="' + (cy - r1 * Math.sin(a)).toFixed(1) + '"/>';
    }
    ticks.innerHTML = frag;
  }

  /* ---- interactive instrument cluster ---- */
  var cluster = $("[data-cluster]"), needle = $("[data-needle]"), fill = $("[data-fill]"),
    speedEl = $("[data-speed]"), rpmEl = $("[data-rpm]"), hint = $("[data-hint]");
  if (cluster && needle) {
    var lights = $$(".wl", cluster);
    var len = fill ? fill.getTotalLength() : 0;
    if (fill) { fill.style.strokeDasharray = len; fill.style.strokeDashoffset = len; }
    var f = 0, target = 0, raf = 0, thresh = [0.9, 0.75, 0.6, 0.45]; // temp, oil, batt, engine light up as revs climb
    var render = function () {
      var ang = Math.PI - f * Math.PI, R = 94;               // west(9 o'clock) → east(3 o'clock) over the top
      needle.setAttribute("x2", (160 + R * Math.cos(ang)).toFixed(1));
      needle.setAttribute("y2", (132 - R * Math.sin(ang)).toFixed(1));
      if (fill) fill.style.strokeDashoffset = len * (1 - f);
      if (speedEl) speedEl.textContent = Math.round(f * 142);
      if (rpmEl) rpmEl.textContent = (Math.round(f * 70) / 10).toFixed(1).replace(/\.0$/, "") + "k rpm";
      for (var i = 0; i < lights.length; i++) lights[i].classList.toggle("on", f > thresh[i]);
    };
    var loop = function () { f += (target - f) * 0.16; if (Math.abs(target - f) < 0.003) f = target; render(); if (f !== target) raf = requestAnimationFrame(loop); };
    var go = function (t) { target = Math.max(0, Math.min(1, t)); cancelAnimationFrame(raf); raf = requestAnimationFrame(loop); };
    render();
    if (reduce) { f = 0.1; render(); }
    else {
      /* ignition self-check: warning lights flash, then a rev blip, then idle */
      lights.forEach(function (l) { l.classList.add("on"); });
      setTimeout(function () { lights.forEach(function (l) { l.classList.remove("on"); }); go(0.92); }, 700);
      setTimeout(function () { go(0.09); }, 1550);
      /* rev with the pointer */
      cluster.addEventListener("pointermove", function (e) {
        var r = cluster.getBoundingClientRect(); var x = (e.clientX - r.left) / r.width;
        go(0.06 + Math.max(0, Math.min(1, x)) * 0.94); if (hint) hint.style.opacity = "0";
      });
      cluster.addEventListener("pointerleave", function () { go(0.09); if (hint) hint.style.opacity = ""; });
    }
  }

  /* ---- toast + spark burst ---- */
  var toastEl;
  var toast = function (m) {
    if (!toastEl) {
      toastEl = document.createElement("div"); toastEl.setAttribute("role", "status");
      toastEl.style.cssText = "position:fixed;left:50%;bottom:26px;transform:translateX(-50%) translateY(20px);" +
        "background:#17140D;color:#FAF8F2;font:600 15px/1.2 Geist,system-ui,sans-serif;padding:12px 20px;border-radius:9999px;" +
        "border:2px solid #F2851E;box-shadow:0 14px 40px -14px rgba(0,0,0,.5);z-index:200;opacity:0;transition:opacity .25s,transform .25s;pointer-events:none;max-width:90vw;text-align:center;";
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = m;
    requestAnimationFrame(function () { toastEl.style.opacity = "1"; toastEl.style.transform = "translateX(-50%) translateY(0)"; });
    clearTimeout(toast._t); toast._t = setTimeout(function () { toastEl.style.opacity = "0"; toastEl.style.transform = "translateX(-50%) translateY(20px)"; }, 2200);
  };
  var sparkBurst = function (el) {
    if (reduce) return;
    var r = el.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    for (var i = 0; i < 14; i++) {
      var s = document.createElement("span"); s.className = "spark-dot";
      var size = 3 + Math.random() * 4, ang = (Math.PI * 2 * i) / 14 + Math.random() * 0.5, dist = 32 + Math.random() * 46;
      s.style.cssText = "left:" + cx + "px;top:" + cy + "px;width:" + size + "px;height:" + size + "px;" +
        "background:" + (i % 3 ? "#F2851E" : "#2E9E46") + ";box-shadow:0 0 8px #F2851E;";
      document.body.appendChild(s);
      s.animate([{ transform: "translate(-50%,-50%) scale(1)", opacity: 1 },
        { transform: "translate(-50%,-50%) translate(" + Math.cos(ang) * dist + "px," + (Math.sin(ang) * dist + 22) + "px) scale(0)", opacity: 0 }],
        { duration: 520 + Math.random() * 240, easing: "cubic-bezier(.2,.8,.2,1)" }).onfinish = function () { this.effect.target.remove(); };
    }
  };
  var lines = ["Vroom — firing on all cylinders.", "Spark's away.", "That's the good stuff.", "Ready to roll."], n = 0;
  $$("[data-plug]").forEach(function (p) {
    p.style.cursor = "pointer";
    p.addEventListener("click", function (e) {
      e.preventDefault(); sparkBurst(p); toast(lines[n++ % lines.length]);
      var g = p.querySelector("svg") || p;
      if (!reduce) g.animate([{ transform: "rotate(0) scale(1)" }, { transform: "rotate(-16deg) scale(1.2)" }, { transform: "rotate(0) scale(1)" }], { duration: 320, easing: "cubic-bezier(.2,.8,.2,1)" });
    });
  });

  /* ---- Konami → horn ---- */
  var seq = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65], pos = 0;
  window.addEventListener("keydown", function (e) {
    pos = (e.keyCode === seq[pos]) ? pos + 1 : (e.keyCode === seq[0] ? 1 : 0);
    if (pos === seq.length) {
      pos = 0; toast("BEEP BEEP! 🚗 You found the horn.");
      if (!reduce) document.body.animate([{ transform: "translateX(0)" }, { transform: "translateX(-6px)" }, { transform: "translateX(6px)" }, { transform: "translateX(0)" }], { duration: 260, iterations: 2 });
    }
  });

  /* ---- console hello ---- */
  console.log("%cAlan Duncan Garage Services", "font:800 18px Geist,system-ui;color:#2E9E46");
  console.log("%cFor all your car needs · Dufftown · 01340 820655  (psst — rev the gauge, click the spark plug)", "color:#D2650C;font-weight:600");
})();
