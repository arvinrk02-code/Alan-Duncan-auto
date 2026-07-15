/* Alan Duncan Garage Services — vanilla, no dependencies. */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- mobile nav ---------- */
  var burger = document.querySelector(".burger");
  var mNav = document.getElementById("m-nav");
  if (burger && mNav) {
    var setOpen = function (open) {
      burger.setAttribute("aria-expanded", String(open));
      mNav.hidden = !open;
    };
    burger.addEventListener("click", function () {
      setOpen(burger.getAttribute("aria-expanded") !== "true");
    });
    mNav.addEventListener("click", function (e) { if (e.target.tagName === "A") setOpen(false); });
  }

  /* ---------- footer year ---------- */
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- gauge tick marks (progressive polish) ---------- */
  var ticks = document.querySelector(".g-ticks");
  if (ticks) {
    var cx = 160, cy = 132, r0 = 104, r1 = 116, N = 11;
    var ns = "http://www.w3.org/2000/svg", frag = "";
    for (var i = 0; i <= N; i++) {
      var a = Math.PI * (1 - i / N);            // 180° → 0°
      var x0 = cx + r0 * Math.cos(a), y0 = cy - r0 * Math.sin(a);
      var x1 = cx + r1 * Math.cos(a), y1 = cy - r1 * Math.sin(a);
      frag += '<line x1="' + x0.toFixed(1) + '" y1="' + y0.toFixed(1) + '" x2="' + x1.toFixed(1) + '" y2="' + y1.toFixed(1) + '"/>';
    }
    ticks.innerHTML = frag;
    void ns;
  }

  /* ---------- ignition readout ---------- */
  var readout = document.querySelector("[data-readout]");
  if (readout && !reduce) {
    readout.textContent = "CHECKING…";
    readout.style.color = "var(--amber)";
    setTimeout(function () {
      readout.textContent = "SYSTEMS OK";
      readout.style.color = "var(--green)";
    }, 1500);
  }

  /* ---------- scroll reveal (enhances an already-visible default) ---------- */
  var targets = document.querySelectorAll(".svc, .rev, .cars-panel, .sec-head, .dash");
  if (!reduce && "IntersectionObserver" in window) {
    targets.forEach(function (el) { el.classList.add("reveal"); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---------- spark-plug easter egg ---------- */
  var plug = document.querySelector("[data-plug]");
  if (plug) {
    var clicks = 0;
    plug.addEventListener("click", function () {
      clicks++;
      if (!reduce) sparkBurst(plug);
      plug.animate(
        [{ transform: "rotate(-8deg) scale(1)" }, { transform: "rotate(-8deg) scale(1.18)" }, { transform: "rotate(-8deg) scale(1)" }],
        { duration: 260, easing: "cubic-bezier(0.25,1,0.5,1)" }
      );
      if (clicks === 5) console.log("%c⚡ Firing on all cylinders. Nice one.", "color:#F2851E;font-weight:bold");
    });
  }
  function sparkBurst(el) {
    var host = el.parentElement; // section (position: relative)
    var er = el.getBoundingClientRect(), hr = host.getBoundingClientRect();
    var cx = er.left - hr.left + er.width / 2, cy = er.top - hr.top + er.height / 2;
    for (var i = 0; i < 9; i++) {
      var s = document.createElement("span");
      s.className = "spark-dot";
      var ang = (Math.PI * 2 * i) / 9 + Math.random() * 0.4;
      var dist = 26 + Math.random() * 26;
      s.style.cssText =
        "position:absolute;left:" + cx + "px;top:" + cy + "px;width:3px;height:3px;border-radius:9999px;" +
        "background:" + (i % 2 ? "#E6A23C" : "#F2851E") + ";pointer-events:none;z-index:3;box-shadow:0 0 6px #E6A23C;";
      host.appendChild(s);
      s.animate(
        [
          { transform: "translate(-50%,-50%) translate(0,0) scale(1)", opacity: 1 },
          { transform: "translate(-50%,-50%) translate(" + Math.cos(ang) * dist + "px," + Math.sin(ang) * dist + "px) scale(0)", opacity: 0 }
        ],
        { duration: 460 + Math.random() * 160, easing: "cubic-bezier(0.25,1,0.5,1)" }
      ).onfinish = function () { this.effect.target.remove(); };
    }
  }

  /* ---------- enquiry form → email (no backend needed) ---------- */
  var form = document.querySelector("[data-enquiry]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var get = function (n) { var el = form.querySelector('[name="' + n + '"]'); return el ? el.value.trim() : ""; };
      var name = get("name"), contact = get("contact"), reg = get("reg"), msg = get("message");
      var body =
        "Name: " + name + "\n" +
        "Phone/email: " + contact + "\n" +
        (reg ? "Car reg: " + reg + "\n" : "") +
        "\n" + msg + "\n";
      var href = "mailto:alanduncangarageservices@gmail.com" +
        "?subject=" + encodeURIComponent("Website enquiry — " + (name || "new customer")) +
        "&body=" + encodeURIComponent(body);
      window.location.href = href;
      var note = document.querySelector("[data-form-note]");
      if (note) note.innerHTML = "Opening your email app… if nothing happens, call <a href=\"tel:+441340820655\">01340&nbsp;820655</a> or email us directly.";
    });
  }

  /* ---------- console hello ---------- */
  console.log("%cAlan Duncan Garage Services", "font:700 16px system-ui;color:#33B24A");
  console.log("%cFor all your car needs · Dufftown · 01340 820655", "color:#E6A23C");
})();
