/* Alan Duncan Garage Services — vanilla, no dependencies. */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- mobile nav ---- */
  var burger = document.querySelector(".burger");
  var mNav = document.getElementById("m-nav");
  if (burger && mNav) {
    var setOpen = function (o) { burger.setAttribute("aria-expanded", String(o)); mNav.hidden = !o; };
    burger.addEventListener("click", function () { setOpen(burger.getAttribute("aria-expanded") !== "true"); });
    mNav.addEventListener("click", function (e) { if (e.target.tagName === "A") setOpen(false); });
  }

  /* ---- footer year ---- */
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();

  /* ---- scroll reveal (enhances an already-visible default) ---- */
  var targets = document.querySelectorAll(".svc, .rev, .band-copy, .find-card, .map-wrap, .sec-head");
  if (!reduce && "IntersectionObserver" in window) {
    targets.forEach(function (el) { el.classList.add("reveal"); });
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---- tiny toast ---- */
  var toastEl;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.setAttribute("role", "status");
      toastEl.style.cssText = "position:fixed;left:50%;bottom:26px;transform:translateX(-50%) translateY(20px);" +
        "background:#17150F;color:#FCF8F0;font:700 15px/1.2 Archivo,system-ui,sans-serif;padding:12px 20px;" +
        "border-radius:9999px;border:2.5px solid #F2851E;box-shadow:0 14px 40px -14px rgba(0,0,0,.5);z-index:200;" +
        "opacity:0;transition:opacity .25s,transform .25s;pointer-events:none;max-width:90vw;text-align:center;";
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    requestAnimationFrame(function () { toastEl.style.opacity = "1"; toastEl.style.transform = "translateX(-50%) translateY(0)"; });
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { toastEl.style.opacity = "0"; toastEl.style.transform = "translateX(-50%) translateY(20px)"; }, 2200);
  }

  /* ---- spark burst from an element ---- */
  function sparkBurst(el) {
    if (reduce) return;
    var r = el.getBoundingClientRect();
    var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    for (var i = 0; i < 14; i++) {
      var s = document.createElement("span");
      s.className = "spark-dot";
      var size = 3 + Math.random() * 4;
      var ang = (Math.PI * 2 * i) / 14 + Math.random() * 0.5;
      var dist = 34 + Math.random() * 46;
      s.style.cssText = "left:" + cx + "px;top:" + cy + "px;width:" + size + "px;height:" + size + "px;" +
        "background:" + (i % 3 ? "#F2851E" : "#34B24A") + ";box-shadow:0 0 8px #F2851E;position:fixed;";
      document.body.appendChild(s);
      s.animate(
        [{ transform: "translate(-50%,-50%) scale(1)", opacity: 1 },
         { transform: "translate(-50%,-50%) translate(" + Math.cos(ang) * dist + "px," + (Math.sin(ang) * dist + 24) + "px) scale(0)", opacity: 0 }],
        { duration: 520 + Math.random() * 240, easing: "cubic-bezier(.2,.8,.2,1)" }
      ).onfinish = function () { this.effect.target.remove(); };
    }
  }

  /* ---- spark-plug easter egg (logo badge + footer button) ---- */
  var lines = ["Vroom — firing on all cylinders.", "Spark's away! ⚡", "That's the good stuff.", "Ready to roll."];
  var n = 0;
  document.querySelectorAll("[data-plug]").forEach(function (plug) {
    plug.style.cursor = "pointer";
    plug.addEventListener("click", function (e) {
      e.preventDefault();
      sparkBurst(plug);
      toast(lines[n % lines.length]); n++;
      var glyph = plug.querySelector(".plug") || plug;
      if (!reduce) glyph.animate(
        [{ transform: "rotate(0) scale(1)" }, { transform: "rotate(-16deg) scale(1.2)" }, { transform: "rotate(0) scale(1)" }],
        { duration: 320, easing: "cubic-bezier(.2,.8,.2,1)" });
    });
  });

  /* ---- Konami code → the horn ---- */
  var seq = [38,38,40,40,37,39,37,39,66,65], pos = 0;
  window.addEventListener("keydown", function (e) {
    pos = (e.keyCode === seq[pos]) ? pos + 1 : (e.keyCode === seq[0] ? 1 : 0);
    if (pos === seq.length) {
      pos = 0;
      toast("BEEP BEEP! 🚗 You found the horn.");
      if (!reduce) document.body.animate(
        [{ transform: "translateX(0)" }, { transform: "translateX(-6px)" }, { transform: "translateX(6px)" }, { transform: "translateX(0)" }],
        { duration: 260, iterations: 2 });
    }
  });

  /* ---- console hello ---- */
  console.log("%cAlan Duncan Garage Services", "font:800 18px Archivo,system-ui;color:#34B24A");
  console.log("%cFor all your car needs · Dufftown · 01340 820655  (psst — click the spark plug)", "color:#D96A10;font-weight:600");
})();
