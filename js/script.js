/* ============================================================
   Dr. Raychel Powers ,, shared site script
   Injects the header + footer on every page, then wires up
   the mobile menu, scroll reveals, and the subscribe form.
   To add a page (about.html, gallery.html, etc.) just include
   the same <header id="site-header"> / <footer id="site-footer">
   placeholders and this script ,, the chrome stays in sync.
   ============================================================ */

/* ----- Google Analytics 4 (loads on every page) ----- */
(function () {
  var GA_ID = "G-MYSWPPB8FZ";
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_ID);
})();

/* ----- Microsoft Clarity (heatmaps + session recordings) ----- */
(function (c, l, a, r, i, t, y) {
  c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
  t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
  y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
})(window, document, "clarity", "script", "xhhyj62r4g");

(function () {
  "use strict";

  /* ----- Site config (edit these in one place) ----- */
  var NAV = [
    { label: "Home",        href: "index.html#home" },
    { label: "About",       href: "about.html" },
    { label: "Work",        href: "index.html#work" },
    { label: "Gallery",     href: "gallery.html" },
    { label: "Blog",        href: "index.html#blog" },
    { label: "CV",          href: "cv.html" }
  ];

  var SOCIAL = [
    { name: "Instagram", href: "https://www.instagram.com/drraychel/",
      path: "M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.9.4-1.3.8-.4.4-.6.8-.8 1.3-.2.4-.3 1-.4 2.1C2.6 10 2.6 10.3 2.6 12s0 2 .1 3.2c.1 1.1.2 1.7.4 2.1.2.5.4.9.8 1.3.4.4.8.6 1.3.8.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.4 1.3-.8.4-.4.6-.8.8-1.3.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-3.2s0-2-.1-3.2c-.1-1.1-.2-1.7-.4-2.1-.2-.5-.4-.9-.8-1.3-.4-.4-.8-.6-1.3-.8-.4-.2-1-.3-2.1-.4C15.5 4 15.1 4 12 4zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8zm0 8.1a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4zm6.2-8.3a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0z" },
    { name: "Facebook", href: "https://www.facebook.com/239654745889141",
      path: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/drraychel/",
      path: "M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5V9.5h3V19zM6.5 8.2A1.7 1.7 0 1 1 6.5 4.8a1.7 1.7 0 0 1 0 3.4zM19 19h-3v-4.7c0-1.1 0-2.6-1.6-2.6S12.6 13 12.6 14.2V19h-3V9.5h2.9v1.3h.1c.4-.8 1.4-1.6 2.9-1.6 3.1 0 3.7 2 3.7 4.7V19z" },
    { name: "TikTok", href: "https://www.tiktok.com/@drraychel",
      path: "M16.6 5.8c-.9-.6-1.5-1.5-1.7-2.6h-2.7v11.2c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5c.3 0 .5 0 .8.1V9.2c-.3 0-.5-.1-.8-.1a5.3 5.3 0 1 0 5.3 5.3V8.9c1.1.8 2.4 1.2 3.7 1.2V7.4c-.7 0-1.4-.2-1.9-.6z" },
    { name: "YouTube", href: "https://www.youtube.com/@DrRaychel",
      path: "M23 12s0-3.2-.4-4.7c-.2-.8-.9-1.5-1.7-1.7C19.4 5.2 12 5.2 12 5.2s-7.4 0-8.9.4c-.8.2-1.5.9-1.7 1.7C1 8.8 1 12 1 12s0 3.2.4 4.7c.2.8.9 1.5 1.7 1.7 1.5.4 8.9.4 8.9.4s7.4 0 8.9-.4c.8-.2 1.5-.9 1.7-1.7.4-1.5.4-4.7.4-4.7zM9.7 15.2V8.8l5.3 3.2-5.3 3.2z" },
    { name: "Spotify", href: "https://open.spotify.com/user/raydar14?si=d1e68a5c7f964e82",
      path: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.6 14.4a.6.6 0 0 1-.9.2c-2.4-1.5-5.4-1.8-9-1a.6.6 0 1 1-.3-1.2c3.9-.9 7.3-.5 9.9 1.1.3.2.4.6.3.9zm1.2-2.7a.8.8 0 0 1-1 .3c-2.7-1.7-6.9-2.2-10.1-1.2a.8.8 0 1 1-.4-1.5c3.7-1.1 8.3-.6 11.4 1.4.3.2.5.7.1 1zm.1-2.8C14.6 8.9 9.4 8.7 6.3 9.6a.9.9 0 1 1-.5-1.8C9.4 6.8 15.1 7 18.9 9.2a.9.9 0 1 1-.9 1.6z" }
  ];

  /* ----- Build header ----- */
  function buildHeader() {
    var host = document.getElementById("site-header");
    if (!host) return;
    var links = NAV.map(function (n) {
      return '<li><a href="' + n.href + '">' + n.label + "</a></li>";
    }).join("");

    host.innerHTML =
      '<nav class="nav wrap" aria-label="Primary navigation">' +
        '<a class="brand" href="index.html#home"><img class="brand__mark" src="assets/logo.svg" alt="" width="34" height="34" /><span>Dr.&nbsp;Raychel&nbsp;<b>Powers</b></span></a>' +
        '<button class="nav__toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="nav-menu">' +
          "<span></span><span></span><span></span>" +
        "</button>" +
        '<ul class="nav__links" id="nav-menu">' +
          links +
          '<li><a class="btn btn--gold" href="index.html#connect">Get in touch</a></li>' +
        "</ul>" +
      "</nav>";

    var toggle = host.querySelector(".nav__toggle");
    var menu = host.querySelector(".nav__links");
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ----- Build footer ----- */
  function buildFooter() {
    var host = document.getElementById("site-footer");
    if (!host) return;
    var social = SOCIAL.map(function (s) {
      return '<a href="' + s.href + '" target="_blank" rel="noopener" aria-label="' + s.name + '">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + s.path + '"/></svg></a>';
    }).join("");

    host.innerHTML =
      '<div class="wrap foot">' +
        '<div class="foot__top">' +
          "<div>" +
            '<div class="foot__brand">Dr.&nbsp;Raychel&nbsp;<b>Powers</b></div>' +
            '<p class="foot__tag">Justice that frees. Therapy that empowers. Creativity that heals.</p>' +
          "</div>" +
          '<nav class="social" aria-label="Social media">' + social + "</nav>" +
        "</div>" +
        '<div class="foot__bottom">' +
          "<span>&copy; " + new Date().getFullYear() + " Dr. Raychel Powers ,, all rights reserved. Don&rsquo;t hate me cus u ain&rsquo;t me.</span>" +
          '<span><a href="index.html#connect">Get in touch</a></span>' +
        "</div>" +
      "</div>";
  }

  /* ----- Scroll reveal ----- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ----- Subscribe form ----- */
  function initForm() {
    var form = document.getElementById("subscribe-form");
    if (!form) return;
    var status = document.getElementById("form-status");
    var FALLBACK_EMAIL = "Info@DrPowersTherapy.com"; // <-- set your real inbox

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = (form.email.value || "").trim();
      status.classList.remove("error");

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.textContent = "Please enter a valid email address.";
        status.classList.add("error");
        return;
      }

      // If Formspree isn't configured yet, fall back to an email draft.
      if (form.action.indexOf("your-form-id") !== -1) {
        window.location.href = "mailto:" + FALLBACK_EMAIL +
          "?subject=" + encodeURIComponent("Add me to your list") +
          "&body=" + encodeURIComponent("Please add " + email + " to your updates.");
        status.textContent = "Opening your email app\u2026";
        return;
      }

      status.textContent = "Signing you up\u2026";
      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      }).then(function (r) {
        if (r.ok) { form.reset(); status.textContent = "You\u2019re on the list. Talk soon."; }
        else { throw new Error(); }
      }).catch(function () {
        status.textContent = "Something went wrong \u2014 email " + FALLBACK_EMAIL + " instead.";
        status.classList.add("error");
      });
    });
  }

  /* ----- Header shadow on scroll ----- */
  function initScrollShade() {
    var header = document.getElementById("site-header");
    if (!header) return;
    var onScroll = function () {
      header.style.background = window.scrollY > 12
        ? "rgba(13,36,33,.9)" : "rgba(18,48,45,.72)";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  document.addEventListener("DOMContentLoaded", function () {
    buildHeader();
    buildFooter();
    initReveal();
    initForm();
    initScrollShade();
  });
})();
