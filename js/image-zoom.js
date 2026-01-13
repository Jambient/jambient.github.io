let activeImage = null;
let zoomState = null;

const zoomOverlay = document.querySelector(".zoom-overlay");
const nav = document.querySelector("nav");
const navHeight = nav ? nav.offsetHeight : 0;

/* ---------------------------
   CALCULATE & APPLY TRANSFORM
---------------------------- */
function applyTransform(img) {
  if (!zoomState) return;

  const { rect } = zoomState;

  // Image center (original, untransformed)
  const imageCenterX = rect.left + rect.width / 2;
  const imageCenterY = rect.top + rect.height / 2;

  // Viewport center (content area)
  const viewportCenterX = window.innerWidth / 2;
  const viewportCenterY =
    navHeight + (window.innerHeight - navHeight) / 2;

  // Translation (recomputed every time)
  const translateX = viewportCenterX - imageCenterX;
  const translateY = viewportCenterY - imageCenterY;

  // Scale (recomputed every time)
  const scale = Math.min(
    window.innerWidth / rect.width,
    (window.innerHeight - navHeight) / rect.height
  ) * 0.9;

  img.style.transform =
    `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}

/* ---------------------------
   ZOOM IN
---------------------------- */
function zoomIn(img) {
  // Capture original geometry ONCE
  const rect = img.getBoundingClientRect();

  zoomState = { rect };
  activeImage = img;

  applyTransform(img);

  img.classList.add("zoomed");
  document.body.style.overflow = "hidden";
  zoomOverlay.classList.add("active");
}

/* ---------------------------
   ZOOM OUT
---------------------------- */
function zoomOut() {
  if (!activeImage) return;

  activeImage.style.transform = "";
  activeImage.classList.remove("zoomed");

  document.body.style.overflow = "";
  zoomOverlay.classList.remove("active");

  activeImage = null;
  zoomState = null;
}

/* ---------------------------
   CLICK + TAP
---------------------------- */
document.querySelectorAll(".visuals-container > img").forEach(img => {
  const toggle = e => {
    e.preventDefault();

    if (activeImage && activeImage !== img) {
      zoomOut();
    }

    activeImage ? zoomOut() : zoomIn(img);
  };

  img.addEventListener("click", toggle);
  img.addEventListener("touchend", toggle, { passive: false });
});

/* ---------------------------
   OVERLAY CLOSE
---------------------------- */
zoomOverlay.addEventListener("click", zoomOut);
zoomOverlay.addEventListener("touchend", zoomOut, { passive: false });

/* ---------------------------
   ESC KEY
---------------------------- */
document.addEventListener("keydown", e => {
  if (e.key === "Escape") zoomOut();
});

/* ---------------------------
   RESIZE (RECOMPUTE FROM SOURCE)
---------------------------- */
window.addEventListener("resize", () => {
  if (!activeImage || !zoomState) return;
  applyTransform(activeImage);
});
