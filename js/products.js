let productPage = 0;

export function renderProducts(data) {
  const track = document.querySelector("#productTrack");
  if (!track || !data.products) return;

  track.innerHTML = data.products.map(product => {
    const deliveryBadge =
      product.delivery === "주간배송"
        ? `<span class="badge-delivery badge-orange">🚚 주간배송</span>`
        : product.delivery === "트레이더스"
          ? `<span class="badge-delivery badge-green">🚛 트레이더스 쓱배송</span>`
          : product.delivery === "신세계백화점"
            ? `<span class="badge-dept">신세계백화점</span>` : "";

    const deliveryInfoHtml = product.deliveryInfo
      ? `<div class="prod-delivery-info">${product.deliveryInfo}</div>` : "";
    const benefitHtml = product.benefit
      ? `<div class="prod-benefit">${product.benefit}</div>` : "";
    const discountHtml = product.discount
      ? `<span class="prod-discount">${product.discount}%</span>` : "";
    const originalPriceHtml = product.originalPrice
      ? `<del class="prod-original">${product.originalPrice.toLocaleString()}원</del>` : "";
    const unitPriceHtml = product.unitPrice
      ? `<span class="prod-unit">${product.unitPrice}</span>` : "";
    const ssgClubHtml = product.ssgClub
      ? `<div class="prod-club"><span>7</span> ${product.ssgClub}</div>` : "";
    const cardDiscountHtml = product.cardDiscount
      ? `<div class="prod-card-discount">💳 ${product.cardDiscount}</div>` : "";
    const badgesHtml = product.badges?.length
      ? `<div class="prod-badges">${product.badges.map(b => `<span>${b}</span>`).join("")}</div>` : "";
    const ratingHtml = product.rating
      ? `<div class="prod-rating">★ ${product.rating} <span>(${product.reviewCount})</span></div>` : "";

    const url = "detail.html?id=rice-001";

    return `
      <article class="product-card">
        <div class="product-card-wrap">
          <a href="${url}" class="product-link">
            <div class="product-image">
              ${product.image
                ? `<img src="${product.image}" alt="${product.name}">`
                : `<div class="image-empty">상품 이미지</div>`}
            </div>
          </a>

          <div class="prod-action-bar">
            <div class="prod-badge-box">${deliveryBadge}</div>
            <div class="prod-icons">
              <button type="button" aria-label="찜하기" class="btn-like">♡</button>
              <button type="button" aria-label="장바구니 담기" class="btn-cart">🛒</button>
            </div>
          </div>

          <a href="${url}" class="product-info-link">
            ${deliveryInfoHtml}
            <div class="product-brand">${product.brand}</div>
            <div class="product-name">${product.name}</div>
            ${benefitHtml}
            ${originalPriceHtml ? `<div class="prod-orig-line">${originalPriceHtml}</div>` : ""}
            <div class="product-price">
              ${discountHtml}
              <span class="price-num">${product.price.toLocaleString()}</span>원
            </div>
            ${unitPriceHtml ? `<div class="prod-unit-box">${unitPriceHtml}</div>` : ""}
            ${ssgClubHtml}
            ${cardDiscountHtml}
            ${badgesHtml}
            ${ratingHtml}
          </a>
        </div>
      </article>
    `;
  }).join("");

  updateProductPosition();
}

function updateProductPosition() {
  const track = document.querySelector("#productTrack");
  const card = track?.querySelector(".product-card");
  if (!card) return;
  track.style.transform =
    `translateX(-${productPage * (card.offsetWidth + 20)}px)`;
}

export function moveProduct(direction, data) {
  const total = data.products.length;
  const maxPage = Math.max(0, total - 5);
  productPage = Math.max(0, Math.min(maxPage, productPage + direction));
  updateProductPosition();
}

export function refreshProductPosition() {
  updateProductPosition();
}
