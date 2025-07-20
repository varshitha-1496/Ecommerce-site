function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalEl.innerText = "Total: ₹0";
    updateCartCount();
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="cart-details">
        <h3>${item.name}</h3>
        <p>₹${item.price} x ${item.qty} = ₹${item.price * item.qty}</p>
        <div class="qty-controls">
          <button class="qty-btn" onclick="decreaseQty(${index})">-</button>
          <span>${item.qty}</span>
          <button class="qty-btn" onclick="increaseQty(${index})">+</button>
        </div>
      </div>
      <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
    `;

    cartContainer.appendChild(div);
  });

  totalEl.innerText = `Total: ₹${total}`;
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.querySelectorAll("#cart-count").forEach(el => {
    el.innerText = cart.reduce((sum, item) => sum + item.qty, 0);
  });
}

function increaseQty(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].qty += 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function decreaseQty(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart[index].qty > 1) {
    cart[index].qty -= 1;
  } else {
    cart.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function removeItem(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function emptyCart() {
  if (confirm("Are you sure you want to empty the cart?")) {
    localStorage.removeItem("cart");
    loadCart();
  }
}

// Make sure all products added from main.js include qty
function fixQtyOnLoad() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.forEach(item => {
    if (!item.qty) item.qty = 1;
  });
  localStorage.setItem("cart", JSON.stringify(cart));
}

window.onload = () => {
  fixQtyOnLoad();
  loadCart();
};
