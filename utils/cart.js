export function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const totalCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  
    const cartCountEl = document.getElementById('cartCount');
    if (cartCountEl) {
      cartCountEl.innerText = totalCount;
      cartCountEl.style.display = totalCount > 0 ? 'inline-block' : 'none';
    }
  }
  