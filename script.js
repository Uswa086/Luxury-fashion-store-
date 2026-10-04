
"use strict";

/* =========================================
   LUXURY FASHION STORE
   By Uswa Collections
   ========================================= */

const WHATSAPP_NUMBER = "923157540218";
const STORE_EMAIL = "uswanazish311@gmail.com";

const money = amount =>
  "Rs. " + Number(amount).toLocaleString("en-PK");

const $ = selector => document.querySelector(selector);

const escapeHTML = value =>
  String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function saveStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    showToast("Browser storage is unavailable.");
    return false;
  }
}

/* Replace these sample products and prices
   with your actual inventory before publishing. */

const products = [
  {
    id: 1,
    name: "Royal Cotton Classic",
    category: "Ladies",
    fabric: "Cotton",
    color: "Ivory",
    price: 1850,
    sku: "UF-001",
    stock: 12,
    description: "Classic unstitched cotton fabric for everyday elegance.",
    season: "Summer",
    length: "As specified by seller",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=85",
    badge: "Everyday luxury"
  },
  {
    id: 2,
    name: "Summer Lawn Edit",
    category: "Ladies",
    fabric: "Lawn",
    color: "Multicolor",
    price: 2450,
    sku: "UF-002",
    stock: 10,
    description: "A summer-inspired unstitched lawn fabric selection.",
    season: "Summer",
    length: "As specified by seller",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=85",
    badge: "Summer edit"
  },
  {
    id: 3,
    name: "Embroidered Elegance",
    category: "Ladies",
    fabric: "Embroidered",
    color: "Neutral",
    price: 3950,
    sku: "UF-003",
    stock: 6,
    description: "An occasion-inspired textile selection with decorative detail.",
    season: "All season",
    length: "As specified by seller",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=85",
    badge: "Occasion wear"
  },
  {
    id: 4,
    name: "Pure Linen Touch",
    category: "Ladies",
    fabric: "Linen",
    color: "Earth tones",
    price: 2850,
    sku: "UF-004",
    stock: 8,
    description: "An understated linen-inspired unstitched fabric option.",
    season: "Spring / Summer",
    length: "As specified by seller",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=85",
    badge: "Modern classic"
  },
  {
    id: 5,
    name: "Gentleman's Wash & Wear",
    category: "Gents",
    fabric: "Wash & Wear",
    color: "Charcoal",
    price: 2250,
    sku: "UF-005",
    stock: 15,
    description: "A smart unstitched fabric option for tailored menswear.",
    season: "All season",
    length: "As specified by seller",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=700&q=85",
    badge: "Gents classic"
  },
  {
    id: 6,
    name: "Premium Cotton Blend",
    category: "Gents",
    fabric: "Cotton",
    color: "Beige",
    price: 1950,
    sku: "UF-006",
    stock: 11,
    description: "A versatile unstitched fabric choice for everyday tailoring.",
    season: "All season",
    length: "As specified by seller",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=85",
    badge: "Daily essentials"
  },
  {
    id: 7,
    name: "Winter Khaddar Select",
    category: "Gents",
    fabric: "Khaddar",
    color: "Olive",
    price: 2650,
    sku: "UF-007",
    stock: 9,
    description: "A winter-focused unstitched khaddar fabric selection.",
    season: "Winter",
    length: "As specified by seller",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=700&q=85",
    badge: "Winter edit"
  },
  {
    id: 8,
    name: "Silk-Inspired Occasion Fabric",
    category: "Ladies",
    fabric: "Silk",
    color: "Burgundy",
    price: 4200,
    sku: "UF-008",
    stock: 5,
    description: "An occasion-inspired silk-style fabric selection.",
    season: "Festive",
    length: "As specified by seller",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=700&q=85",
    badge: "Festive edit"
  },
  {
    id: 9,
    name: "Classic Wash & Wear",
    category: "Gents",
    fabric: "Wash & Wear",
    color: "Navy",
    price: 2400,
    sku: "UF-009",
    stock: 10,
    description: "A versatile unstitched wash-and-wear fabric option.",
    season: "All season",
    length: "As specified by seller",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=700&q=85",
    badge: "Timeless"
  },
  {
    id: 10,
    name: "Soft Cotton Everyday",
    category: "Ladies",
    fabric: "Cotton",
    color: "Soft pink",
    price: 1750,
    sku: "UF-010",
    stock: 14,
    description: "A simple cotton-inspired option for everyday tailoring.",
    season: "Summer",
    length: "As specified by seller",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=85",
    badge: "Easy elegance"
  },
  {
    id: 11,
    name: "Textured Winter Classic",
    category: "Gents",
    fabric: "Khaddar",
    color: "Brown",
    price: 2900,
    sku: "UF-011",
    stock: 7,
    description: "A textured winter-inspired fabric for custom tailoring.",
    season: "Winter",
    length: "As specified by seller",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=700&q=85",
    badge: "Winter classic"
  },
  {
    id: 12,
    name: "Printed Lawn Collection",
    category: "Ladies",
    fabric: "Lawn",
    color: "Floral",
    price: 2550,
    sku: "UF-012",
    stock: 8,
    description: "A floral-inspired unstitched lawn collection.",
    season: "Summer",
    length: "As specified by seller",
    image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=700&q=85",
    badge: "Printed edit"
  }
];

/* State */

let activeCategory = "All";
let cart = readStorage("lfs_cart", []);
let wishlist = readStorage("lfs_wishlist", []);
let customerReviews = readStorage("lfs_customer_reviews", []);

/* Demo reviews are intentionally labelled.
   Replace these examples with genuine feedback.
   They are excluded from the customer rating. */

const demoReviews = [
  {
    name: "Sample customer",
    rating: 5,
    title: "A sample review",
    text: "Replace this demonstration text with genuine feedback from a customer about product quality and the ordering experience.",
    demo: true
  },
  {
    name: "Sample customer",
    rating: 4,
    title: "Example feedback",
    text: "This is placeholder content for preview purposes. Add authentic customer reviews after receiving permission to publish them.",
    demo: true
  },
  {
    name: "Sample customer",
    rating: 5,
    title: "Demo testimonial",
    text: "Use this card to preview the review design. It does not represent a verified purchase or an actual customer statement.",
    demo: true
  }
];

/* Notifications */

let toastTimer;

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

/* Products and filters */

function getFilteredProducts() {
  const search = $("#searchInput").value.trim().toLowerCase();
  const fabric = $("#fabricFilter").value;
  const sort = $("#sortFilter").value;

  let result = products.filter(product => {
    const categoryMatch =
      activeCategory === "All" ||
      product.category === activeCategory;

    const fabricMatch =
      fabric === "All" ||
      product.fabric === fabric;

    const searchable = [
      product.name,
      product.category,
      product.fabric,
      product.color,
      product.description,
      product.season
    ].join(" ").toLowerCase();

    return categoryMatch && fabricMatch && searchable.includes(search);
  });

  if (sort === "low") {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    result.sort((a, b) => b.price - a.price);
  } else if (sort === "name") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  }

  return result;
}

function renderProducts() {
  const grid = $("#productGrid");
  const result = getFilteredProducts();

  $("#emptyState").hidden = result.length !== 0;

  grid.innerHTML = result.map(product => {
    const saved = wishlist.includes(product.id);

    return `
      <article class="product-card">
        <div class="product-image-wrap">
          <img
            class="product-image"
            src="${escapeHTML(product.image)}"
            alt="${escapeHTML(product.name)} — ${escapeHTML(product.fabric)} fabric"
            loading="lazy"
          />
          <span class="product-badge">${escapeHTML(product.badge)}</span>
          <button
            class="wishlist-btn ${saved ? "saved" : ""}"
            data-wishlist="${product.id}"
            aria-label="${saved ? "Remove from" : "Add to"} wishlist"
            aria-pressed="${saved}"
          >${saved ? "♥" : "♡"}</button>
          <button class="quick-add" data-add="${product.id}">
            + ADD TO BAG
          </button>
        </div>

        <div class="product-info">
          <div class="product-category">
            ${escapeHTML(product.category)} · ${escapeHTML(product.fabric)}
          </div>
          <h3>${escapeHTML(product.name)}</h3>
          <p class="product-description">${escapeHTML(product.description)}</p>
          <div class="product-meta">
            ${escapeHTML(product.color)} · ${escapeHTML(product.season)}
          </div>
          <div class="product-price">${money(product.price)}</div>

          <div class="product-actions">
            <button class="btn btn-outline" data-details="${product.id}">
              Details
            </button>
            <button class="btn btn-gold" data-add="${product.id}">
              Add to bag
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  // Replace inaccessible product images with a visible fallback.
  grid.querySelectorAll(".product-image").forEach(img => {
    img.addEventListener("error", () => {
      img.alt = "Product image unavailable — update this product's image URL.";
      img.removeAttribute("src");
      img.style.display = "none";

      const wrapper = img.closest(".product-image-wrap");
      wrapper.style.background =
        "linear-gradient(135deg, #e6d8c4, #f7f0e6)";
    }, { once: true });
  });
}

/* Category buttons */

$("#categoryTabs").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;

  activeCategory = button.dataset.category;

  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.toggle("active", tab === button);
  });

  renderProducts();
});

$("#searchInput").addEventListener("input", renderProducts);
$("#fabricFilter").addEventListener("change", renderProducts);
$("#sortFilter").addEventListener("change", renderProducts);

document.querySelectorAll("[data-footer-category]").forEach(link => {
  link.addEventListener("click", () => {
    activeCategory = link.dataset.footerCategory;

    document.querySelectorAll(".tab").forEach(tab => {
      tab.classList.toggle(
        "active",
        tab.dataset.category === activeCategory
      );
    });

    renderProducts();
  });
});

/* Product details */

function showProductDetails(id) {
  const product = products.find(item => item.id === Number(id));
  if (!product) return;

  const message = [
    product.name,
    "",
    `Category: ${product.category}`,
    `Fabric: ${product.fabric}`,
    `Color: ${product.color}`,
    `Season: ${product.season}`,
    `Price: ${money(product.price)}`,
    `SKU: ${product.sku}`,
    `Available demo stock: ${product.stock}`,
    `Length: ${product.length}`,
    "",
    product.description,
    "",
    "This is unstitched fabric. Confirm the actual composition, width, length and availability with the store before ordering."
  ].join("\n");

  window.alert(message);
}

/* Wishlist */

function toggleWishlist(id) {
  id = Number(id);

  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(item => item !== id);
    showToast("Removed from wishlist.");
  } else {
    wishlist.push(id);
    showToast("Added to wishlist.");
  }

  saveStorage("lfs_wishlist", wishlist);
  renderProducts();
}

/* Shopping cart */

function saveCart() {
  saveStorage("lfs_cart", cart);
  renderCart();
}

function addToCart(id) {
  const product = products.find(item => item.id === Number(id));
  if (!product) return;

  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    if (existing.quantity >= product.stock) {
      showToast("Maximum sample stock reached.");
      return;
    }
    existing.quantity += 1;
  } else {
    cart.push({ id: product.id, quantity: 1 });
  }

  saveCart();
  showToast(`${product.name} added to your bag.`);
}

function changeQuantity(id, amount) {
  const item = cart.find(entry => entry.id === Number(id));
  const product = products.find(entry => entry.id === Number(id));

  if (!item || !product) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(entry => entry.id !== Number(id));
  } else if (item.quantity > product.stock) {
    item.quantity = product.stock;
    showToast("Maximum sample stock reached.");
  }

  saveCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== Number(id));
  saveCart();
  showToast("Item removed from your bag.");
}

function getCartDetails() {
  // Only products that exist in the current catalog are included.
  const validCart = [];

  cart.forEach(item => {
    const product = products.find(p => p.id === Number(item.id));
    if (!product) return;

    const quantity = Math.min(
      Math.max(1, Number(item.quantity) || 1),
      product.stock
    );

    validCart.push({ id: product.id, quantity });
  });

  cart = validCart;

  const lines = cart.map(item => {
    const product = products.find(p => p.id === item.id);

    return {
      ...product,
      quantity: item.quantity,
      lineTotal: product.price * item.quantity
    };
  });

  const subtotal = lines.reduce(
    (sum, item) => sum + item.lineTotal, 0
  );

  return { lines, subtotal };
}

function renderCart() {
  const { lines, subtotal } = getCartDetails();

  $("#cartCount").textContent = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  $("#cartSubtotal").textContent = money(subtotal);

  if (lines.length === 0) {
    $("#cartItems").innerHTML = `
      <div class="cart-empty">
        <p>Your shopping bag is waiting.</p>
        <p>Explore the collection and add your favorite fabrics.</p>
      </div>
    `;
    $("#checkoutButton").disabled = true;
    $("#checkoutButton").style.opacity = ".55";
    saveStorage("lfs_cart", cart);
    return;
  }

  $("#checkoutButton").disabled = false;
  $("#checkoutButton").style.opacity = "1";

  $("#cartItems").innerHTML = lines.map(item => `
    <div class="cart-item">
      <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.name)}">
      <div>
        <h4>${escapeHTML(item.name)}</h4>
        <p>${escapeHTML(item.fabric)} · ${escapeHTML(item.category)}</p>
        <strong>${money(item.lineTotal)}</strong>
        <div class="quantity-control">
          <button data-quantity="${item.id}" data-delta="-1" aria-label="Decrease quantity">−</button>
          <span>${item.quantity}</span>
          <button data-quantity="${item.id}" data-delta="1" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <button class="remove-item" data-remove="${item.id}">Remove</button>
    </div>
  `).join("");

  saveStorage("lfs_cart", cart);
}

function openCart() {
  $("#cartDrawer").classList.add("open");
  $("#cartDrawer").setAttribute("aria-hidden", "false");
  $("#drawerBackdrop").classList.add("visible");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  $("#cartDrawer").classList.remove("open");
  $("#cartDrawer").setAttribute("aria-hidden", "true");
  $("#drawerBackdrop").classList.remove("visible");
  document.body.style.overflow = "";
}

$("#openCart").addEventListener("click", openCart);
$("#closeCart").addEventListener("click", closeCart);
$("#continueShopping").addEventListener("click", closeCart);
$("#drawerBackdrop").addEventListener("click", closeCart);

$("#cartItems").addEventListener("click", event => {
  const quantityButton = event.target.closest("[data-quantity]");
  const removeButton = event.target.closest("[data-remove]");

  if (quantityButton) {
    changeQuantity(
      quantityButton.dataset.quantity,
      Number(quantityButton.dataset.delta)
    );
  }

  if (removeButton) {
    removeFromCart(removeButton.dataset.remove);
  }
});

$("#productGrid").addEventListener("click", event => {
  const addButton = event.target.closest("[data-add]");
  const wishlistButton = event.target.closest("[data-wishlist]");
  const detailsButton = event.target.closest("[data-details]");

  if (addButton) addToCart(addButton.dataset.add);
  if (wishlistButton) toggleWishlist(wishlistButton.dataset.wishlist);
  if (detailsButton) showProductDetails(detailsButton.dataset.details);
});

/* Checkout and WhatsApp */

function openCheckout() {
  if (cart.length === 0) {
    showToast("Your shopping bag is empty.");
    return;
  }

  const { subtotal } = getCartDetails();
  $("#checkoutSubtotal").textContent = money(subtotal);
  $("#checkoutModal").hidden = false;
  document.body.style.overflow = "hidden";
}

function closeCheckout() {
  $("#checkoutModal").hidden = true;
  document.body.style.overflow = "";
}

$("#checkoutButton").addEventListener("click", () => {
  if (cart.length === 0) return;

  closeCart();
  openCheckout();
});

$("#closeCheckout").addEventListener("click", closeCheckout);

$("#checkoutModal").addEventListener("click", event => {
  if (event.target === $("#checkoutModal")) closeCheckout();
});

$("#checkoutForm").addEventListener("submit", event => {
  event.preventDefault();

  const form = event.currentTarget;

  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const { lines, subtotal } = getCartDetails();

  if (!lines.length) {
    showToast("Your shopping bag is empty.");
    closeCheckout();
    return;
  }

  const phone = String(data.get("customerPhone")).trim();

  if (!/^[0-9+\s()-]{7,20}$/.test(phone)) {
    showToast("Please enter a valid phone number.");
    return;
  }

  const orderLines = lines.map(item =>
    `• ${item.name} (${item.fabric})\n  Qty: ${item.quantity} × ${money(item.price)} = ${money(item.lineTotal)}`
  );

  const message = [
    "NEW ORDER INQUIRY",
    "Luxury Fashion Store — Uswa Collections",
    "",
    ...orderLines,
    "",
    `Product subtotal: ${money(subtotal)}`,
    "Delivery: Please confirm charges",
    "",
    `Customer: ${data.get("customerName")}`,
    `Phone: ${phone}`,
    `City: ${data.get("customerCity")}`,
    `Address: ${data.get("customerAddress")}`,
    `Payment preference: ${data.get("paymentMethod")}`,
    `Notes: ${data.get("orderNotes") || "None"}`,
    "",
    "Please confirm product availability, final total and delivery details."
  ].join("\n");

  const whatsappURL =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  // Open the WhatsApp order draft; this does not
