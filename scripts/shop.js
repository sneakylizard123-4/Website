/**
 * Shop loader and renderer.
 * Loads product data from data/shop.json and renders it dynamically.
 */

async function loadProducts() {
  try {
    const response = await fetch("../../data/shop.json");
    if (!response.ok) throw new Error("Failed to load products");
    return await response.json();
  } catch (error) {
    console.error("Error loading products:", error);
    return { products: [] };
  }
}

const SECTION_LABELS = {
  available: "Available",
  "sold-out": "Sold Out",
};

function normalizeProductsData(data) {
  if (Array.isArray(data.products)) {
    return data.products;
  }

  // Backward compatibility for older shape: { available: [], "sold-out": [] }
  const knownSections = ["available", "sold-out"];
  const fallbackProducts = [];

  knownSections.forEach((section) => {
    const sectionProducts = Array.isArray(data[section]) ? data[section] : [];
    sectionProducts.forEach((product) => {
      fallbackProducts.push({
        ...product,
        sections: [section],
      });
    });
  });

  return fallbackProducts;
}

function getProductsForSection(data, section) {
  return normalizeProductsData(data).filter((product) => {
    if (!Array.isArray(product.sections)) {
      return false;
    }

    return product.sections.includes(section);
  });
}

function getSortSelect() {
  return document.getElementById("product-sort");
}

function getCategorySelect() {
  return document.getElementById("product-category");
}

function getNameFilterInput() {
  return document.getElementById("product-name-filter");
}

function getSortMode() {
  const sortSelect = getSortSelect();
  return sortSelect ? sortSelect.value : "default";
}

function getSelectedCategory(defaultCategory) {
  const categorySelect = getCategorySelect();
  return categorySelect && categorySelect.value
    ? categorySelect.value
    : defaultCategory;
}

function getNameFilterValue() {
  const nameFilterInput = getNameFilterInput();
  return nameFilterInput ? nameFilterInput.value.trim().toLowerCase() : "";
}

function getTagSortKey(product) {
  return (Array.isArray(product.tags) ? product.tags : [])
    .map((tag) => tag.toLowerCase())
    .join(" ");
}

function sortProducts(products, sortMode) {
  const sortedProducts = [...products];

  if (sortMode === "tags-asc") {
    sortedProducts.sort((left, right) => {
      const leftKey = getTagSortKey(left);
      const rightKey = getTagSortKey(right);
      return (
        leftKey.localeCompare(rightKey) || left.title.localeCompare(right.title)
      );
    });
  }

  if (sortMode === "tags-desc") {
    sortedProducts.sort((left, right) => {
      const leftKey = getTagSortKey(left);
      const rightKey = getTagSortKey(right);
      return (
        rightKey.localeCompare(leftKey) || left.title.localeCompare(right.title)
      );
    });
  }

  return sortedProducts;
}

function filterProductsByName(products, nameFilter) {
  if (!nameFilter) {
    return products;
  }

  return products.filter((product) => {
    const title = (product.title || "").toLowerCase();
    return title.includes(nameFilter);
  });
}

function getProductsByActiveCategory(data, activeCategory) {
  if (activeCategory === "all") {
    return normalizeProductsData(data);
  }

  return getProductsForSection(data, activeCategory);
}

function getEmptyStateLabel(activeCategory) {
  return SECTION_LABELS[activeCategory] || "Selected";
}

function renderProduct(product) {
  const tagsHTML = (Array.isArray(product.tags) ? product.tags : [])
    .map((tag) => `<span class="product-tag">${tag}</span>`)
    .join("");
  const statusBadge = product.status
    ? `<span class="product-status-badge">${product.status}</span>`
    : "";
  const dateText = product.date
    ? `<span class="product-date">${product.date}</span>`
    : "";
  const productMeta = statusBadge || dateText
    ? `<div class="product-meta">${statusBadge}${dateText}</div>`
    : "";
  const productLink = product.file || product.link || "#";
  const productImage = product.image || "";
  const imageAlt = product.imageAlt || `${product.title} preview`;
  const hoverImage = product.hoverImage || "";
  const imageHTML = productImage
    ? `<div class="product-card-image-wrap">
        <img class="product-card-image product-card-image-base" src="${productImage}" alt="${imageAlt}" loading="lazy" />
        ${hoverImage ? `<img class="product-card-image product-card-image-hover" src="${hoverImage}" alt="" aria-hidden="true" loading="lazy" />` : ""}
      </div>`
    : "";
  const priceHTML = product.price
    ? `<p class="product-price">$${product.price.toFixed(2)}</p>`
    : "";

  return `
    <li class="product-card">
      <div class="product-card-content">
        ${productMeta}
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        ${priceHTML}
        <p><a href="${productLink}" class="product-link">View product →</a></p>
        ${tagsHTML ? `<div class="product-tags">${tagsHTML}</div>` : ""}
      </div>
      ${imageHTML}
    </li>
  `;
}

function renderProductsByCategory(defaultCategory) {
  const container = document.getElementById("products-container");
  if (!container) return;

  loadProducts().then((data) => {
    const activeCategory = getSelectedCategory(defaultCategory);
    const filteredByCategory = getProductsByActiveCategory(
      data,
      activeCategory,
    );
    const filteredByName = filterProductsByName(
      filteredByCategory,
      getNameFilterValue(),
    );
    const products = sortProducts(filteredByName, getSortMode());

    if (products.length === 0) {
      const label = getEmptyStateLabel(activeCategory);
      container.innerHTML = `<p>No products found for ${label}. <a href="../../index.html">Back home</a></p>`;
      return;
    }

    const html = `<ul class="products-list">${products
      .map(renderProduct)
      .join("")}</ul>`;

    container.innerHTML = html;
  });
}

// Auto-detect category from page URL and render
function initializeShopPage() {
  const path = window.location.pathname;
  let category = "available";

  if (path.includes("sold-out")) {
    category = "sold-out";
  }

  const categorySelect = getCategorySelect();
  if (categorySelect && !categorySelect.value) {
    categorySelect.value = category;
  }

  renderProductsByCategory(category);

  const sortSelect = getSortSelect();
  if (sortSelect) {
    sortSelect.addEventListener("change", () =>
      renderProductsByCategory(category),
    );
  }

  if (categorySelect) {
    categorySelect.addEventListener("change", () =>
      renderProductsByCategory(category),
    );
  }

  const nameFilterInput = getNameFilterInput();
  if (nameFilterInput) {
    nameFilterInput.addEventListener("input", () =>
      renderProductsByCategory(category),
    );
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeShopPage);
} else {
  initializeShopPage();
}