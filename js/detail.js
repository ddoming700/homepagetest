import { loadJson } from "./dataLoader.js";

function getProductId() {
  // 이 데모에서는 어떤 경로로 들어와도 의성진쌀 상세페이지를 표시합니다.
  return "rice-001";
}

function setText(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.textContent = value ?? "";
}

function setLink(id, href) {
  const el = document.getElementById(id);
  if (!el) return;
  el.href = href || "#";
  if (!href || href === "#") {
    el.addEventListener("click", e => e.preventDefault());
  }
}

function renderRecommendations(items = []) {
  const grid = document.getElementById("recommend-grid");
  if (!grid) return;
  grid.innerHTML = items.map(item => `
    <div class="rec-item">
      <img src="${item.img}" alt="${item.name}">
      <div class="rec-item-title">${item.name}</div>
      <div class="rec-item-price">${item.price.toLocaleString()}원</div>
    </div>
  `).join("");
}

function renderReviews(photoReviews = [], reviews = []) {
  const photoGrid = document.getElementById("photo-grid");
  if (photoGrid) {
    photoGrid.innerHTML = photoReviews.map(src =>
      `<img src="${src}" alt="상품 포토리뷰">`
    ).join("");
  }

  const reviewList = document.getElementById("review-list");
  if (reviewList) {
    reviewList.innerHTML = reviews.map(rev => `
      <div class="review-item">
        <div class="stars">★★★★★</div>
        <div class="user">${rev.userId} | ${rev.date}</div>
        <div class="text">${rev.text}</div>
        <div class="tags">
          <span>신선도: ${rev.freshness}</span>
          <span>맛만족도: ${rev.taste}</span>
          <span>포장: ${rev.packing}</span>
        </div>
      </div>
    `).join("");
  }
}

function bindDetailEvents() {
  document.querySelector(".close-btn")?.addEventListener("click", () => {
    document.querySelector(".top-event-banner")?.style.setProperty("display", "none");
  });

  document.querySelector(".slider-btn.prev")?.addEventListener("click", () => {
    document.getElementById("recommend-grid")?.scrollBy({ left: -200, behavior: "smooth" });
  });

  document.querySelector(".slider-btn.next")?.addEventListener("click", () => {
    document.getElementById("recommend-grid")?.scrollBy({ left: 200, behavior: "smooth" });
  });
}

window.scrollToSection = function(sectionId, btnElement) {
  const element = document.getElementById(sectionId);
  if (!element) return;
  const y = element.getBoundingClientRect().top + window.pageYOffset - 70;
  window.scrollTo({ top: y, behavior: "smooth" });
  document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
  btnElement?.classList.add("active");
};

window.toggleDetail = function() {
  const wrap = document.getElementById("detail-img-wrap");
  const btn = document.getElementById("btn-expand");
  if (!wrap || !btn) return;

  const expanded = wrap.classList.toggle("expanded");
  btn.innerText = expanded ? "상세정보 접기 ▲" : "상세정보 펼쳐보기 ▼";
};

async function initDetail() {
  const id = getProductId();
  const allDetails = await loadJson("./json/product_details.json");
  const data = allDetails[id];

  if (!data) {
    document.body.innerHTML = `
      <main style="max-width:800px;margin:100px auto;text-align:center">
        <h1>상품을 찾을 수 없습니다.</h1>
        <p>잘못된 상품 ID입니다.</p>
        <a href="./index.html">메인으로 돌아가기</a>
      </main>`;
    return;
  }

  document.title = `${data.title} - 상품 상세`;

  setText("#product-category", data.category);
  setText("#product-title", data.title);
  setText(".floating-product-title", data.title);
  setText("#product-rating", data.rating);
  setText("#product-reviews", `(${data.reviewCount.toLocaleString()}건)`);
  setText("#product-origin", `원산지: ${data.origin}`);
  setText("#product-orig-price", `최고판매가 ${data.originalPrice.toLocaleString()}원`);
  setText("#product-price", `${data.price.toLocaleString()}원`);
  setText("#product-unit", data.unitPrice);
  setText("#product-card-price", `${data.cardBenefitPrice.toLocaleString()}원`);
  setText("#floating-price", `${data.price.toLocaleString()}원`);

  const mainImage = document.getElementById("product-image");
  if (mainImage) mainImage.src = data.mainImage;

  const detailImage = document.getElementById("detail-img");
  if (detailImage && data.detailImages?.length) detailImage.src = data.detailImages[0];

  renderRecommendations(data.recommendations);
  renderReviews(data.photoReviews, data.reviews);
  setLink("buy-link", data.link);
  setLink("floating-buy-link", data.link);
  bindDetailEvents();
}

initDetail().catch(error => {
  console.error("상세페이지 로드 오류:", error);
});
