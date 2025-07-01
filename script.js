document.addEventListener('DOMContentLoaded', () => {
  const cartBtns = document.querySelectorAll('.cart-btn');
  const cartCount = document.getElementById('cart-count');

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cartCount) cartCount.textContent = cart.length;
  }

  function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.className = 'toast-message';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  }

  cartBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      const card = this.closest('.product-card');
      const product = {
        id: this.dataset.id,  // ← unique ID from data-id
        title: card.querySelector('h3').textContent,
        price: card.querySelector('p').textContent,
        img: card.querySelector('img').src
      };

      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      // prevent duplicate ID
      const exists = cart.find(item => item.id === product.id);
      if (exists) {
        showToast('⚠ Already in cart');
        return;
      }

      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      showToast('✔ Product added to cart');
    });
  });

  updateCartCount();
});
