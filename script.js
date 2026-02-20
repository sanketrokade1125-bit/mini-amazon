const products = [
  {id:1, name:"Headphones", price:1999, img:"https://picsum.photos/200?1"},
  {id:2, name:"Smart Watch", price:2999, img:"https://picsum.photos/200?2"},
  {id:3, name:"Laptop", price:49999, img:"https://picsum.photos/200?3"},
  {id:4, name:"Shoes", price:2499, img:"https://picsum.photos/200?4"},
  {id:5, name:"Backpack", price:1299, img:"https://picsum.photos/200?5"},
  {id:6, name:"Mobile", price:15999, img:"https://picsum.photos/200?6"}
];

let selectedProduct = null;

// ---------------- PRODUCT LIST ----------------
function displayProducts() {
  const list = document.getElementById("productList");
  if(!list) return;

  list.innerHTML = "";

  products.forEach(p => {
    list.innerHTML += `
      <div class="card">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="openPopup(${p.id})">View</button>
      </div>
    `;
  });

  updateCartCount();
}
displayProducts();

// ---------------- POPUP ----------------
function openPopup(id) {
  selectedProduct = products.find(p => p.id === id);

  document.getElementById("popup").style.display = "flex";
  document.getElementById("popupImg").src = selectedProduct.img;
  document.getElementById("popupTitle").innerText = selectedProduct.name;
  document.getElementById("popupPrice").innerText = "₹" + selectedProduct.price;
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

// ---------------- CART LOGIC ----------------
function addToCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.id === selectedProduct.id);

  if(existing){
    existing.qty += 1;
  } else {
    cart.push({...selectedProduct, qty:1});
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
  closePopup();
  updateCartCount();
}

// cart badge
function updateCartCount() {
  const badge = document.getElementById("cartCount");
  if(!badge) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = cart.reduce((sum,item)=> sum + item.qty,0);
  badge.innerText = count;
}

// ---------------- CART PAGE ----------------
function displayCart() {
  const cartItemsDiv = document.getElementById("cartItems");
  const totalPriceText = document.getElementById("totalPrice");

  if (!cartItemsDiv) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItemsDiv.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    cartItemsDiv.innerHTML += `
      <div class="card">
        <img src="${item.img}">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
        <p>
          Qty:
          <button onclick="changeQty(${index}, -1)">−</button>
          ${item.qty}
          <button onclick="changeQty(${index}, 1)">+</button>
        </p>
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
  });

  totalPriceText.innerText = "Total: ₹" + total;
  updateCartCount();
}

function changeQty(index, delta) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart[index].qty += delta;

  if(cart[index].qty <= 0){
    cart.splice(index,1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function clearCart() {
  localStorage.removeItem("cart");
  displayCart();
}

function checkout() {
  alert("Order placed successfully!");
  clearCart();
}

displayCart();
