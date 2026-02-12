const productDetails = document.getElementById("productDetails");
const cartCount = document.getElementById("cartCount");

const products = [
  {
    id: 1,
    name: "Sony Wireless Headphones",
    price: 3499,
    category: "Electronics",
    img: "https://images.unsplash.com/photo-1518441902117-f0a7a8a3b73f?auto=format&fit=crop&w=900&q=80"
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
    img: "https://images.unsplash.com/photo-1520975958225-95a2c13b0b7d?auto=format&fit=crop&w=900&q=80"
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
    name: "Cookware Set",
    price: 4999,
    category: "Home",
    img: "https://images.unsplash.com/photo-1586201375761-83865001e31b?auto=format&fit=crop&w=900&q=80"
  }
];


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

function addToCart(productId) {
  let cart = getCart();
  let product = products.find(p => p.id === productId);

  let existing = cart.find(item => item.id === productId);

  if (existing) existing.qty += 1;
  else cart.push({ ...product, qty: 1 });

  saveCart(cart);
  updateCartCount();
  alert(product.name + " added to cart!");
}

function showProductDetails() {
  const selectedId = Number(localStorage.getItem("selectedProduct"));
  const product = products.find(p => p.id === selectedId);

  if (!product) {
    productDetails.innerHTML = "<p>Product not found 😢</p>";
    return;
  }

  productDetails.innerHTML = `
    <img src="${product.img}" alt="${product.name}">
    <div>
      <h2>${product.name}</h2>
      <p><b>Category:</b> ${product.category}</p>
      <p class="price">₹${product.price}</p>
      <p>
        Premium quality product. Replace this with real product details like brand, size, color, warranty, etc.
      </p>
      <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
    </div>
  `;
}

showProductDetails();
updateCartCount();
