const products = [
  {
    id: 1,
    name: "Sony Wireless Headphones",
    price: 3499,
    category: "Electronics",
    img: "images/headphones.jpg"
  },
  {
    id: 2,
    name: "Apple Smart Watch",
    price: 12999,
    category: "Electronics",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 3,
    name: "Gaming Mouse",
    price: 999,
    category: "Electronics",
    img: "https://images.unsplash.com/photo-1616296425622-4560a2ad83de?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: 2499,
    category: "Electronics",
    img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 5,
    name: "Running Shoes",
    price: 2999,
    category: "Fashion",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 6,
    name: "Casual T-Shirt",
    price: 699,
    category: "Fashion",
    img: "images/tshirts.jpg"
  },
  {
    id: 7,
    name: "Laptop Backpack",
    price: 1599,
    category: "Fashion",
    img: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 8,
    name: "Consoler",
    price: 4999,
    category: "Electronics",
    img: "images/consoler.jpg"
  }
];
const productList = document.getElementById("productList");
const cartCount = document.getElementById("cartCount");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");

// CART FUNCTIONS
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = totalItems;
}

// ADD TO CART
function addToCart(productId) {
  let cart = getCart();
  let product = products.find(p => p.id === productId);

  let existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart(cart);
  updateCartCount();
  alert(product.name + " added to cart!");
}

// CATEGORY DROPDOWN
function fillCategories() {
  const categories = ["all", ...new Set(products.map(p => p.category))];

  categoryFilter.innerHTML = categories
    .map(cat => `<option value="${cat}">${cat}</option>`)
    .join("");
}

// SHOW PRODUCTS
function showProducts(filteredProducts) {
  productList.innerHTML = "";

  if (filteredProducts.length === 0) {
    productList.innerHTML = "<p>No products found 😢</p>";
    return;
  }

  filteredProducts.forEach(product => {
    productList.innerHTML += `
      <div class="card" onclick="addToCart(${product.id})">
        <img src="${product.img}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Category: ${product.category}</p>
        <div class="price">₹${product.price}</div>

        <button class="btn" onclick="event.stopPropagation(); addToCart(${product.id})">
          Add to Cart
        </button>

        <button class="btn view-btn" onclick="event.stopPropagation(); viewProduct(${product.id})">
          View Details
        </button>
      </div>
    `;
  });
}

// PRODUCT DETAILS PAGE
function viewProduct(id) {
  localStorage.setItem("selectedProduct", id);
  window.location.href = "product.html";
}

// APPLY FILTERS
function applyFilters() {
  let filtered = [...products];

  // Search
  const searchText = searchInput.value.toLowerCase();
  filtered = filtered.filter(p => p.name.toLowerCase().includes(searchText));

  // Category
  const selectedCategory = categoryFilter.value;
  if (selectedCategory !== "all") {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }

  // Sort
  const sortValue = sortFilter.value;
  if (sortValue === "low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortValue === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  showProducts(filtered);
}

// EVENTS
searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);
sortFilter.addEventListener("change", applyFilters);

// INIT
fillCategories();
applyFilters();
updateCartCount();
