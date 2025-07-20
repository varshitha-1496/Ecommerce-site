// List of all available products
const products = [
  { id: 1, name: "Wireless Headphones", price: 1999, image: "images/headphones.jpg" },
  { id: 2, name: "Smart Watch", price: 2999, image: "images/smartwatch.jpg" },
  { id: 3, name: "Bluetooth Speaker", price: 2499, image: "images/speaker.jpg" },
  { id: 4, name: "DSLR Camera", price: 44999, image: "images/camera.jpg" },
  { id: 5, name: "Running Shoes", price: 1499, image: "images/shoes.jpg" },
  { id: 6, name: "Casual T-Shirt", price: 599, image: "images/tshirt.jpg" },
  { id: 7, name: "Backpack", price: 899, image: "images/backpack.jpg" },
  { id: 8, name: "Laptop Stand", price: 1299, image: "images/stand.jpg" },
  { id: 9, name: "LED Monitor", price: 8999, image: "images/monitor.jpg" },
  { id: 10, name: "Keyboard & Mouse Combo", price: 999, image: "images/keyboard.jpg" },
  { id: 11, name: "Office Chair", price: 2999, image: "images/chair.jpg" },
  { id: 12, name: "Coffee Mug", price: 299, image: "images/mug.jpg" },
  { id: 13, name: "Fitness Band", price: 1999, image: "images/fitnessband.jpg" },
  { id: 14, name: "Power Bank", price: 1299, image: "images/powerbank.jpg" },
  { id: 15, name: "Sunglasses", price: 699, image: "images/sunglasses.jpg" },
  { id: 16, name: "Formal Shirt", price: 1099, image: "images/formalshirt.jpg" },
  { id: 17, name: "Wireless Earbuds", price: 2299, image: "images/earbuds.jpg" },
  { id: 18, name: "Gaming Mouse", price: 899, image: "images/gamingmouse.jpg" },
  { id: 19, name: "Desk Lamp", price: 499, image: "images/lamps.jpg" },
  { id: 20, name: "Notebook Set", price: 349, image: "images/notebooks.jpg" }
];

// Update cart count in navbar
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll("#cart-count").forEach(el => {
    el.innerText = totalItems;
  });
}

// Render all products on products.html
function renderProducts() {
  const list = document.getElementById("product-list");
  if (!list) return;

  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
    list.appendChild(div);
  });
}

// Add product to cart with quantity logic
function addToCart(id) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = products.find(p => p.id === id);

  const existing = cart.find(p => p.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

// Initialize on page load
window.onload = () => {
  updateCartCount();
  renderProducts();
};
