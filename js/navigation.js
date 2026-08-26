export function renderNavigation(data) {
  const navLinks = document.querySelector("#navLinks");
  if (navLinks) {
    navLinks.innerHTML = data.navigation.map(item =>
      `<a href="${item.url}">${item.name}</a>`
    ).join("");
  }

  const categoryPanel = document.querySelector("#categoryPanel");
  if (categoryPanel) {
    categoryPanel.innerHTML = data.categories.map(category =>
      `<button type="button">${category}</button>`
    ).join("");
  }
}

export function renderQuickMenu(data) {
  const quickList = document.querySelector("#quickList");
  if (!quickList) return;

  quickList.innerHTML = data.quickMenu.map(item => `
    <a href="${item.url || '#'}" class="quick-item">
      <div class="quick-icon">
        ${item.image ? `<img src="${item.image}" alt="${item.name}">` : "<span></span>"}
      </div>
      <span class="quick-name">${item.name}</span>
    </a>
  `).join("");
}
