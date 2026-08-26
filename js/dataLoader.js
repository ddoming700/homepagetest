export async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`JSON 로드 실패: ${path}`);
  return response.json();
}

export async function loadSiteData() {
  const [
    settings,
    navigation,
    banners,
    categories,
    quickMenu,
    products,
    petTabs,
    petProducts
  ] = await Promise.all([
    loadJson("./json/settings.json"),
    loadJson("./json/navigation.json"),
    loadJson("./json/banners.json"),
    loadJson("./json/categories.json"),
    loadJson("./json/quick_menu.json"),
    loadJson("./json/client_products.json"),
    loadJson("./json/pet_tabs.json"),
    loadJson("./json/pet_products.json")
  ]);

  return { settings, navigation, banners, categories, quickMenu, products, petTabs, petProducts };
}
