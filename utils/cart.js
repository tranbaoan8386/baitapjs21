export function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // Tính tổng số lượng
  const totalCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  // Cập nhật badge số lượng
  const cartCountEl = document.getElementById("cartCount");
  if (cartCountEl) {
    cartCountEl.innerText = totalCount;
    cartCountEl.style.display = totalCount > 0 ? "inline-block" : "none";
  }

  // Cập nhật nội dung dropdown
  const cartDropdownItems = document.getElementById("cartDropdownItems");
  if (cartDropdownItems) {
    if (cartItems.length === 0) {
      cartDropdownItems.innerHTML = `
        <p class="text-muted m-0">Chưa có sản phẩm nào trong giỏ.</p>
      `;
    } else {
      const html = cartItems.slice(0, 3).map(item => {
        const imageSrc = item.img?.startsWith("http") || item.img?.startsWith("/")
          ? item.img
          : "/public/img/" + item.image;

        return `
          <div class="d-flex justify-content-between align-items-center mb-2">
            <div class="me-2">
              <div><strong>${item.name || "Sản phẩm"}</strong></div>
              <small>Số lượng: ${item.quantity || 1}</small>
            </div>
            <img
              src="${imageSrc || '/public/img/default.jpg'}"
              alt="${item.name || 'Hình ảnh'}"
              width="45"
              height="45"
              class="rounded border"
              style="object-fit: cover;"
            />
          </div>
        `;
      }).join("");

      cartDropdownItems.innerHTML = html;
    }
  }
}
