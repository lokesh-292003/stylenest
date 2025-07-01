document.addEventListener('DOMContentLoaded', () => {
  const cartItemsDiv = document.getElementById('cart-items');
  const orderBtn = document.getElementById('order-btn');
  const orderMsg = document.getElementById('order-message');
  const errMsg = document.getElementById('err-message');
  const cartCount = document.getElementById('cart-count');

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartCount.textContent = cart.length;
  }

  function renderCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemsDiv.innerHTML = '';

    if (cart.length === 0) {
      cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
      return;
    }

    cart.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('cart-item');
      itemDiv.innerHTML = `
        <img src="${item.img}" width="60" />
        <div class="cart-info">
          <span>${item.title}</span><br/>
          <strong>${item.price}</strong>
        </div>
        <button class="remove-btn" data-index="${index}">Remove</button>
        <hr/>
      `;
      cartItemsDiv.appendChild(itemDiv);
    });

    document.querySelectorAll('.remove-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        const index = this.dataset.index;
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
      });
    });
  }

  orderBtn.addEventListener('click', function () {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
      errMsg.style.display = 'block';
      orderMsg.style.display = 'none';
    } else {
      localStorage.removeItem('cart');
      renderCart();
      updateCartCount();
      orderMsg.style.display = 'block';
      errMsg.style.display = 'none';
    }
  });

  renderCart();
  updateCartCount();
});
