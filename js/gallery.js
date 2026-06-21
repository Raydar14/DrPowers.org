/* ============================================================
   Gallery — edit the IMAGES list below and you're done.
   Drop photos into  assets/gallery/  and reference them here.
   Each item:  { src, caption, category }
   Categories power the filter chips automatically.
   Until a file exists at `src`, the tile shows a styled placeholder.
   ============================================================ */
(function () {
  "use strict";

  var IMAGES = [
    { src: "assets/gallery/photo-1.jpg",  caption: "Untitled — acrylic on canvas", category: "Art" },
    { src: "assets/gallery/photo-2.jpg",  caption: "Monstera, morning light",        category: "Plants" },
    { src: "assets/gallery/photo-3.jpg",  caption: "On the road",                     category: "Travel" },
    { src: "assets/gallery/photo-4.jpg",  caption: "Studio corner",                   category: "Art" },
    { src: "assets/gallery/photo-5.jpg",  caption: "On the mat",                      category: "Life" },
    { src: "assets/gallery/photo-6.jpg",  caption: "Río in the valley",               category: "Travel" },
    { src: "assets/gallery/photo-7.jpg",  caption: "New growth",                      category: "Plants" },
    { src: "assets/gallery/photo-8.jpg",  caption: "Color study",                     category: "Art" }
  ];

  var grid = document.getElementById("gal-grid");
  var filters = document.getElementById("gal-filters");
  if (!grid) return;

  var CAM = '<div class="phbox"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L19 6h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="3.5"/></svg><span>Add a photo</span></div>';

  var current = 0, visible = [];

  function categories() {
    var set = ["All"];
    IMAGES.forEach(function (i) { if (i.category && set.indexOf(i.category) === -1) set.push(i.category); });
    return set;
  }

  function render(filter) {
    grid.innerHTML = "";
    visible = IMAGES.filter(function (i) { return filter === "All" || i.category === filter; });
    if (!visible.length) { grid.innerHTML = '<p class="gal-empty">Nothing here yet.</p>'; return; }
    visible.forEach(function (img, idx) {
      var fig = document.createElement("button");
      fig.className = "gal-item";
      fig.type = "button";
      fig.setAttribute("aria-label", "Open image: " + (img.caption || "photo"));
      var im = document.createElement("img");
      im.loading = "lazy";
      im.alt = img.caption || "";
      im.src = img.src;
      im.addEventListener("error", function () {
        fig.classList.add("ph");
        fig.innerHTML = CAM;
      });
      fig.appendChild(im);
      if (img.caption) {
        var cap = document.createElement("figcaption");
        cap.textContent = img.caption;
        fig.appendChild(cap);
      }
      fig.addEventListener("click", function () {
        if (fig.classList.contains("ph")) return; // don't open placeholders
        openLightbox(idx);
      });
      grid.appendChild(fig);
    });
  }

  /* ---- filter chips ---- */
  if (filters) {
    categories().forEach(function (c, i) {
      var b = document.createElement("button");
      b.className = "chip"; b.textContent = c; b.type = "button";
      b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
      b.addEventListener("click", function () {
        filters.querySelectorAll(".chip").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true");
        render(c);
      });
      filters.appendChild(b);
    });
  }

  /* ---- lightbox ---- */
  var lb = document.createElement("div");
  lb.className = "lb"; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true");
  lb.innerHTML =
    '<button class="lb__btn lb__close" aria-label="Close">&times;</button>' +
    '<button class="lb__btn lb__prev" aria-label="Previous">&#8249;</button>' +
    '<img class="lb__img" alt="" />' +
    '<button class="lb__btn lb__next" aria-label="Next">&#8250;</button>' +
    '<p class="lb__cap"></p>';
  document.body.appendChild(lb);
  var lbImg = lb.querySelector(".lb__img");
  var lbCap = lb.querySelector(".lb__cap");

  function show(i) {
    var n = visible.length;
    current = (i + n) % n;
    var item = visible[current];
    lbImg.src = item.src; lbImg.alt = item.caption || "";
    lbCap.textContent = item.caption || "";
  }
  function openLightbox(i) { show(i); lb.classList.add("open"); document.body.style.overflow = "hidden"; }
  function closeLightbox() { lb.classList.remove("open"); document.body.style.overflow = ""; }

  lb.querySelector(".lb__close").addEventListener("click", closeLightbox);
  lb.querySelector(".lb__prev").addEventListener("click", function () { show(current - 1); });
  lb.querySelector(".lb__next").addEventListener("click", function () { show(current + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });
  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft") show(current - 1);
    else if (e.key === "ArrowRight") show(current + 1);
  });

  render("All");
})();
