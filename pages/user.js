import { getProducts } from '../services/api.js';
import { updateCartCount } from '../utils/cart.js';

let allProducts = [];

// Render sản phẩm ra HTML
function renderProducts(products) {
  const productList = document.getElementById("productList");
  if (!productList) return;

  const html = products.map((p) => `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div class="card h-100 shadow-sm">
        <img src="${p.img}" class="card-img-top" alt="${p.name}" style="height: 300px; object-fit: contain;">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${p.name}</h5>
          <p class="card-text text-muted">Giá: <strong>${Number(p.price).toLocaleString()}₫</strong></p>
          <p class="card-text small">${p.desc}</p>
          <a href="../../NVHBASHOP/views/user/detail.html?id=${p.id}" class="btn btn-primary mt-auto">Xem chi tiết</a>
        </div>
      </div>
    </div>
  `).join("");

  productList.innerHTML = html;
}

// Tìm kiếm sản phẩm
function searchProducts(keyword) {
  const lowerKeyword = keyword.toLowerCase();
  const filtered = allProducts.filter(p =>
    p.name.toLowerCase().includes(lowerKeyword)
  );
  renderProducts(filtered);
}

// Lọc sản phẩm theo loại
function filterProducts() {
  const selected = document.getElementById("filterType")?.value || "all";
  const filtered = selected === "all"
    ? allProducts
    : allProducts.filter(p => p.type.toLowerCase() === selected);
  renderProducts(filtered);
}

// Khi trang load xong
document.addEventListener("DOMContentLoaded", async () => {
  try {
    allProducts = await getProducts();
    renderProducts(allProducts);
  } catch (error) {
    console.error("Lỗi khi tải sản phẩm:", error);
  }

  // Tìm kiếm
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchProducts(e.target.value);
    });
  }

  // Lọc
  const filterDropdown = document.getElementById("filterType");
  if (filterDropdown) {
    filterDropdown.addEventListener("change", filterProducts);
  }

  // Cập nhật số lượng giỏ hàng
  updateCartCount();
});
