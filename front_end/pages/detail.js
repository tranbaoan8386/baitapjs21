// pages/detail.js
import axios from "https://cdn.jsdelivr.net/npm/axios@1.6.8/+esm";
import { updateCartCount } from "../../utils/cart.js";


const params = new URLSearchParams(window.location.search);
const id = params.get("id");

console.log("✅ ID lấy từ URL:", id);

const productDetailContainer = document.getElementById("productDetail");

function renderDetail(p) {
    if (!p) {
      productDetailContainer.innerHTML = "<p>Không tìm thấy sản phẩm</p>";
      console.warn("⚠️ Không tìm thấy sản phẩm để hiển thị.");
      return;
    }
  
    console.log("📦 Dữ liệu sản phẩm:", p);
  
    productDetailContainer.innerHTML = `
      <div class="col-md-6">
        <img src="${p.img}" class="img-fluid product-image" alt="${p.name}" />
      </div>
      <div class="col-md-6 product-info">
        <h2>${p.name}</h2>
        <p><strong>Giá:</strong> ${Number(p.price).toLocaleString()}₫</p>
        <p><strong>Mô tả:</strong> ${p.desc}</p>
        <p><strong>Màn hình:</strong> ${p.screen}</p>
        <p><strong>Camera trước:</strong> ${p.frontCamera}</p>
        <p><strong>Camera sau:</strong> ${p.backCamera}</p>
        <button id="btnAddToCart" class="btn btn-warning mt-3">
          <i class="fas fa-cart-plus me-1"></i> Thêm vào giỏ hàng
        </button>
      </div>
    `;
  
    // Gắn sự kiện cho nút thêm vào giỏ
    const btnAddToCart = document.getElementById("btnAddToCart");
    if (btnAddToCart) {
      btnAddToCart.addEventListener("click", () => {
        addToCart(p);
      });
    }
  }
  
  function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    const index = cart.findIndex((item) => item.id === product.id);
  
    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
  
    // 👉 Thông báo bằng Notyf
    const notyf = new Notyf();
    notyf.success(`🛒 Đã thêm "${product.name}" vào giỏ hàng!`);
  }
  
  

async function showDetail() {
  if (!id) {
    productDetailContainer.innerHTML = "<p>Thiếu ID sản phẩm trong URL</p>";
    console.error("❌ Không có ID trong URL!");
    return;
  }

  try {
    console.log(`📤 Gọi API: GET /products/${id}`);
    const response = await axios.get(`https://685165ca8612b47a2c09e420.mockapi.io/products/${id}`);
    renderDetail(response.data);
  } catch (error) {
    productDetailContainer.innerHTML = "<p>Lỗi khi tải sản phẩm</p>";
    console.error("❌ Lỗi khi gọi API lấy chi tiết sản phẩm:", error);
  }
}

showDetail();
updateCartCount();