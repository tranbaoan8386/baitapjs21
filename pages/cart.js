import { updateCartCount } from "../utils/cart.js";

const cartContainer = document.getElementById("cartContainer");
const notyf = new Notyf();

// Hàm hiển thị giỏ hàng
function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  // Nếu không có sản phẩm nào
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Giỏ hàng đang trống.</p>";
    document.getElementById("totalAmount").textContent = "0₫";
    updateCartCount();
    return;
  }

  let tableRows = "";
  cart.forEach((item, index) => {
    const lineTotal = item.price * item.quantity;
    total += lineTotal;

    tableRows += `
      <tr>
        <td><img src="${item.img}" width="60"/></td>
        <td>${item.name}</td>
        <td>${item.price.toLocaleString()}₫</td>
        <td>
          <div class="d-flex justify-content-center align-items-center">
            <button class="btn btn-sm btn-outline-secondary me-1" data-action="decrease" data-index="${index}">
              <i class="fas fa-minus"></i>
            </button>
            <span class="mx-2">${item.quantity}</span>
            <button class="btn btn-sm btn-outline-secondary ms-1" data-action="increase" data-index="${index}">
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </td>
        <td>${lineTotal.toLocaleString()}₫</td>
        <td>
          <button class="btn btn-sm btn-danger" data-action="remove" data-index="${index}">
            <i class="fas fa-trash-alt"></i>
          </button>
        </td>
      </tr>
    `;
  });

  cartContainer.innerHTML = `
    <table class="table text-center align-middle table-bordered">
      <thead class="table-light">
        <tr>
          <th>Ảnh</th>
          <th>Tên</th>
          <th>Giá</th>
          <th>Số lượng</th>
          <th>Thành tiền</th>
          <th>Xoá</th>
        </tr>
      </thead>
      <tbody>${tableRows}</tbody>
    </table>
  `;

  document.getElementById("totalAmount").textContent = `${total.toLocaleString()}₫`;
  updateCartCount();

  // Gắn sự kiện cho tất cả các nút
  cartContainer.querySelectorAll("button[data-action]").forEach((btn) => {
    const index = parseInt(btn.dataset.index);
    const action = btn.dataset.action;

    btn.addEventListener("click", () => {
      if (action === "increase") {
        increase(index);
      } else if (action === "decrease") {
        decrease(index);
      } else if (action === "remove") {
        removeItem(index);
      }
    });
  });
}

// Tăng số lượng
function increase(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity++;
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Giảm số lượng
function decrease(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  } else {
    notyf.error("Số lượng tối thiểu là 1");
  }
}

// Xoá sản phẩm
function removeItem(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const removed = cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  notyf.success(`Đã xoá "${removed[0].name}" khỏi giỏ hàng.`);
  renderCart();
}

// Gọi khi DOM sẵn sàng
document.addEventListener("DOMContentLoaded", renderCart);
