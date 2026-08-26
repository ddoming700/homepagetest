import { loadSiteData } from "./dataLoader.js";
import { renderNavigation, renderQuickMenu } from "./navigation.js";
import {
  renderBanners, moveBanner, startBannerAutoPlay,
  stopBannerAutoPlay, pauseBanner, playBanner, refreshBannerPosition
} from "./slider.js";
import { renderProducts, moveProduct, refreshProductPosition } from "./products.js";
import { renderPetSection } from "./pet.js";

let siteData;

function bindEvents() {
  document.querySelector("#bannerPrev")?.addEventListener("click", () => {
    moveBanner(-1, siteData);
    startBannerAutoPlay(siteData);
  });

  document.querySelector("#bannerNext")?.addEventListener("click", () => {
    moveBanner(1, siteData);
    startBannerAutoPlay(siteData);
  });

  document.querySelector("#bannerPause")?.addEventListener("click", pauseBanner);
  document.querySelector("#bannerPlay")?.addEventListener("click", () => playBanner(siteData));
  document.querySelector("#bannerAll")?.addEventListener("click", () => {
    alert("배너 전체보기 기능입니다.");
  });

  document.querySelector("#productPrev")?.addEventListener("click", () => moveProduct(-1, siteData));
  document.querySelector("#productNext")?.addEventListener("click", () => moveProduct(1, siteData));

  document.querySelector("#categoryButton")?.addEventListener("click", () => {
    document.querySelector("#categoryPanel")?.classList.toggle("open");
  });

  document.querySelector("#searchForm")?.addEventListener("submit", event => {
    event.preventDefault();
    const keyword = document.querySelector("#searchInput")?.value.trim();
    if (keyword) alert(`"${keyword}" 검색 결과로 이동합니다.`);
  });

  document.querySelector("#topEventClose")?.addEventListener("click", () => {
    document.querySelector(".top-event")?.style.setProperty("display", "none");
  });

  // 메인 페이지의 모든 클릭 가능한 요소는 데모 요구사항에 따라
  // 의성진쌀 상세페이지 하나로 이동합니다.
  // (상품/배너/카테고리/푸터/아이콘/버튼 등)
  document.addEventListener("click", event => {
    const clickable = event.target.closest("a, button");
    if (!clickable) return;

    // 메인 페이지에서는 어떤 링크/버튼을 눌러도 동일한 상세페이지로 이동
    event.preventDefault();
    event.stopImmediatePropagation();
    window.location.href = "./detail.html?id=rice-001";
  }, true);

  window.addEventListener("resize", () => {
    refreshBannerPosition(siteData);
    refreshProductPosition();
  });
}

async function init() {
  try {
    siteData = await loadSiteData();

    renderNavigation(siteData);
    renderQuickMenu(siteData);
    renderBanners(siteData);
    renderProducts(siteData);
    renderPetSection(siteData);

    bindEvents();
    startBannerAutoPlay(siteData);
  } catch (error) {
    console.error("사이트 초기화 실패:", error);
  }
}

init();
