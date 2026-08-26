export function renderPetSection(data) {
  const petTabBar = document.querySelector("#petTabBar");
  if (petTabBar) {
    petTabBar.innerHTML = (data.petTabs.tabs || []).map(tab => `
      <button type="button" class="pet-tab-btn ${tab === "반려동물" ? "active" : ""}">
        ${tab}
      </button>
    `).join("");
  }

  const petSubTabBar = document.querySelector("#petSubTabBar");
  if (petSubTabBar) {
    petSubTabBar.innerHTML = (data.petTabs.subTabs || []).map((sub, i) =>
      `<span class="pet-subtab-item ${i === 0 ? "active" : ""}">${sub}</span>`
    ).join("");
  }

  const banner = document.querySelector("#petLeftBanner");
  if (banner && data.petProducts.banner) {
    banner.innerHTML = `
      <img src="${data.petProducts.banner.image}" alt="PETS">
      <span class="pet-banner-text">${data.petProducts.banner.text}</span>
    `;
  }

  const grid = document.querySelector("#petProductGrid");
  if (!grid) return;

  grid.innerHTML = (data.petProducts.products || []).map(p => {
    const badgeBrand = p.badgeBrand
      ? `<span class="badge-brand-red">${p.badgeBrand}</span>` : "";
    const benefit = p.benefit ? `<div class="prod-benefit">${p.benefit}</div>` : "";
    const original = p.originalPrice
      ? `<div class="prod-orig-line"><del class="prod-original">${p.originalPrice.toLocaleString()}원</del></div>` : "";
    const discount = p.discount ? `<span class="prod-discount">${p.discount}%</span>` : "";
    const price = p.priceText
      ? `<span class="price-num">${p.priceText}</span>`
      : `<span class="price-num">${p.price.toLocaleString()}</span>원`;
    const unit = p.unitPrice
      ? `<div class="prod-unit-box"><span class="prod-unit">${p.unitPrice}</span></div>` : "";
    const badges = p.badges?.length
      ? `<div class="prod-badges">${p.badges.map(b => `<span>${b}</span>`).join("")}</div>` : "";
    const rating = p.rating
      ? `<div class="prod-rating">★ ${p.rating} <span>(${p.reviewCount})</span></div>` : "";

    return `
      <article class="pet-card">
        <a href="detail.html?id=rice-001" class="pet-card-link">
        <div class="pet-card-image"><img src="${p.image}" alt="${p.name}"></div>
        <div class="prod-action-bar">
          <div class="prod-icons">
            <button type="button" aria-label="찜하기">♡</button>
            <button type="button" aria-label="장바구니 담기">🛒</button>
          </div>
        </div>
        <div class="product-info-link">
          <div class="product-brand">${p.brand} ${badgeBrand}</div>
          <div class="product-name">${p.name}</div>
          ${benefit}${original}
          <div class="product-price">${discount} ${price}</div>
          ${unit}${badges}${rating}
        </div>
        </a>
      </article>
    `;
  }).join("");
}
