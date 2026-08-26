let currentBannerOffset = 0;
let bannerTimer = null;
let bannerPlaying = true;
let isAnimating = false;
const STEP_ITEMS = 2.5;

export function renderBanners(data) {
  const track = document.querySelector("#bannerTrack");
  if (!track || !data.banners?.length) return;

  const banners = data.banners;
  const clones = [...banners, ...banners, ...banners];

  track.innerHTML = clones.map((banner, index) => `
    <article class="banner-slide" data-index="${index % banners.length}">
      <a class="banner-slide-link" href="./detail.html?id=rice-001" aria-label="${banner.title} 상세페이지로 이동">
        <div class="banner-slide-inner">
          ${banner.image
            ? `<img class="banner-image" src="${banner.image}" alt="${banner.title}">`
            : `<div class="banner-placeholder">배너</div>`}
        </div>
      </a>
    </article>
  `).join("");

  setTimeout(() => initBannerPosition(data), 50);
}

function getSlideStepWidth() {
  const track = document.querySelector("#bannerTrack");
  const slide = track?.querySelector(".banner-slide");
  if (!slide) return 380;
  const gap = parseFloat(getComputedStyle(track).gap) || 0;
  return slide.getBoundingClientRect().width + gap;
}

function initBannerPosition(data) {
  const track = document.querySelector("#bannerTrack");
  if (!track || !data.banners?.length) return;

  const stepWidth = getSlideStepWidth();
  currentBannerOffset = data.banners.length * stepWidth;
  track.style.transition = "none";
  track.style.transform = `translateX(-${currentBannerOffset}px)`;
  updateBannerCounter(0, data);
}

function updateBannerCounter(index, data) {
  const counter = document.querySelector("#bannerCounter");
  if (!counter || !data.banners?.length) return;
  const total = data.banners.length;
  const normalized = ((Math.round(index) % total) + total) % total;
  counter.textContent =
    `${String(normalized + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
}

export function moveBanner(direction, data) {
  if (isAnimating || !data.banners?.length) return;
  isAnimating = true;

  const track = document.querySelector("#bannerTrack");
  const stepWidth = getSlideStepWidth();
  const moveDistance = stepWidth * STEP_ITEMS * direction;
  const baseCount = data.banners.length;
  const singleSetWidth = baseCount * stepWidth;

  currentBannerOffset += moveDistance;
  track.style.transition = "transform 0.55s cubic-bezier(0.25, 1, 0.5, 1)";
  track.style.transform = `translateX(-${currentBannerOffset}px)`;

  const currentIdx = Math.round((currentBannerOffset % singleSetWidth) / stepWidth);
  updateBannerCounter(currentIdx, data);

  setTimeout(() => {
    if (currentBannerOffset >= singleSetWidth * 2) {
      track.style.transition = "none";
      currentBannerOffset -= singleSetWidth;
      track.style.transform = `translateX(-${currentBannerOffset}px)`;
    } else if (currentBannerOffset <= singleSetWidth * 0.5) {
      track.style.transition = "none";
      currentBannerOffset += singleSetWidth;
      track.style.transform = `translateX(-${currentBannerOffset}px)`;
    }
    isAnimating = false;
  }, 560);
}

export function startBannerAutoPlay(data) {
  stopBannerAutoPlay();
  if (!bannerPlaying) return;
  bannerTimer = setInterval(() => moveBanner(1, data),
    data.settings?.bannerAutoPlayMs || 5000);
}

export function stopBannerAutoPlay() {
  if (bannerTimer) {
    clearInterval(bannerTimer);
    bannerTimer = null;
  }
}

export function pauseBanner() {
  bannerPlaying = false;
  stopBannerAutoPlay();
}

export function playBanner(data) {
  bannerPlaying = true;
  startBannerAutoPlay(data);
}

export function refreshBannerPosition(data) {
  initBannerPosition(data);
}
