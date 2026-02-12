const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
  let cart = getCart();
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty 🥲</p>";
    totalPrice.textContent = "0";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}">

        <div class="cart-details">
          <h3>${item.name}</h3>
          <p>₹${item.price}</p>
        </div>

        <div class="qty-box">
          <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
          <span>${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
        </div>

        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  totalPrice.textContent = total;
}

function changeQty(index, change) {
  let cart = getCart();
  cart[index].qty += change;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  saveCart(cart);
  renderCart();
}

function removeItem(index) {
  let cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

function checkout() {
  alert("✅ Order placed successfully! (Demo)");
  localStorage.removeItem("cart");
  renderCart();
}

renderCart();
