// Checkout Page (Frontend Only)

const cart = JSON.parse(localStorage.getItem("cart")) || [];

const summaryItems = document.getElementById("summaryItems");
const subtotalEl = document.getElementById("subtotal");
const shippingEl = document.getElementById("shipping");
const totalEl = document.getElementById("total");
const toast = document.getElementById("toast");

function money(n) {
  return "₹" + Number(n).toLocaleString("en-IN");
}

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

function calcTotals() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 99;
  const total = subtotal + shipping;
  return { subtotal, shipping, total };
}

function renderSummary() {
  if (!cart.length) {
    summaryItems.innerHTML = `
      <div class="empty-box">
        <p>Your cart is empty.</p>
        <a class="cart-link" href="index.html">Go Shopping</a>
      </div>
    `;
    subtotalEl.textContent = money(0);
    shippingEl.textContent = money(0);
    totalEl.textContent = money(0);
    document.querySelector(".checkout-btn.wide").disabled = true;
    document.querySelector(".checkout-btn.wide").style.opacity = 0.6;
    return;
  }

  summaryItems.innerHTML = "";
  cart.forEach((item) => {
    const row = document.createElement("div");
    row.className = "summary-item";
    row.innerHTML = `
      <img src="${item.img}" alt="${item.name}" />
      <div class="summary-item-info">
        <h4>${item.name}</h4>
        <p>${money(item.price)} • Qty: ${item.qty}</p>
      </div>
      <div class="summary-item-price">${money(item.price * item.qty)}</div>
    `;
    summaryItems.appendChild(row);
  });

  const { subtotal, shipping, total } = calcTotals();
  subtotalEl.textContent = money(subtotal);
  shippingEl.textContent = money(shipping);
  totalEl.textContent = money(total);
}

renderSummary();

// Simple validation helpers
function isPhoneValid(v) {
  const digits = v.replace(/\D/g, "");
  return digits.length === 10;
}

function isPincodeValid(v) {
  const digits = v.replace(/\D/g, "");
  return digits.length === 6;
}

document.getElementById("checkoutForm").addEventListener("submit", (e) => {
  e.preventDefault();

  if (!cart.length) return;

  const fullName = document.getElementById("fullName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const city = document.getElementById("city").value.trim();
  const address = document.getElementById("address").value.trim();
  const state = document.getElementById("state").value.trim();
  const pincode = document.getElementById("pincode").value.trim();
  const notes = document.getElementById("notes").value.trim();

  if (!fullName || !phone || !email || !city || !address || !state || !pincode) {
    showToast("Please fill all required fields.");
    return;
  }

  if (!isPhoneValid(phone)) {
    showToast("Enter a valid 10-digit phone number.");
    return;
  }

  if (!isPincodeValid(pincode)) {
    showToast("Enter a valid 6-digit pincode.");
    return;
  }

  const payment = document.querySelector('input[name="payment"]:checked')?.value || "COD";
  const totals = calcTotals();

  // Create order object (demo)
  const order = {
    id: "MS" + Date.now(),
    createdAt: new Date().toISOString(),
    customer: { fullName, phone, email, city, address, state, pincode, notes },
    payment,
    items: cart,
    totals
  };

  // Save last order (optional)
  localStorage.setItem("lastOrder", JSON.stringify(order));

  // Clear cart
  localStorage.removeItem("cart");

  showToast("Order placed successfully! 🎉");

  setTimeout(() => {
    window.location.href = "index.html";
  }, 1400);
});
