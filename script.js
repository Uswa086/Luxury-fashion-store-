
"use strict";

/* =========================================
   LUXURY FASHION STORE
   Replace sample products with client stock.
   ========================================= */

const STORE = {
  whatsapp: "923157540218",
  email: "uswanazish311@gmail.com"
};

const money = amount =>
  "Rs. " + Number(amount).toLocaleString("en-PK");

const $ = selector => document.querySelector(selector);

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function loadData(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function saveData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    showToast("Could not save data in this browser.");
    return false;
  }
}

/* All listed prices are above Rs. 4,000.
   These are demonstration products and prices.
   Replace them with the client's actual inventory. */

const products = [
  {
    id: 1,
    name: "Royal Lawn Signature",
    category: "ladies",
    fabric: "Lawn",
    price: 4500,
    color: "Floral",
    badge: "Signature Edit",
    description: "Premium unstitched lawn fabric for elegant summer tailoring.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=750&q=85"
  },
  {
    id: 2,
    name: "Embroidered Heritage",
    category: "ladies",
    fabric: "Embroidered",
    price: 6200,
    color: "Ivory",
    badge: "Occasion Wear",
    description: "An occasion-inspired unstitched fabric selection.",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=750&q=85"
  },
  {
    id: 3,
    name: "Premium Cotton Luxe",
    category: "ladies",
    fabric: "Cotton",
    price: 4250,
    color: "Soft Neutral",
    badge: "Everyday Luxury",
    description: "A refined cotton fabric option for personal tailoring.",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=750&q=85"
  },
  {
    id: 4,
    name: "Silk Festive Edition",
    category: "ladies",
    fabric: "Silk",
    price: 7800,
    color: "Burgundy",
    badge: "Festive Edit",
    description: "An elegant silk-style fabric selection for special occasions.",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=750&q=85"
  },
  {
    id: 5,
    name: "Gentleman's Wash & Wear",
    category: "gents",
    fabric: "Wash & Wear",
    price: 4800,
    color: "Charcoal",
    badge: "Gents Classic",
    description: "Premium unstitched wash-and-wear fabric for tailoring.",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=750&q=85"
  },
  {
    id: 6,
    name: "Royal Cotton Suiting",
    category: "gents",
    fabric: "Cotton",
    price: 5200,
    color: "Beige",
    badge: "Premium Pick",
    description: "A classic unstitched cotton fabric selection for gentlemen.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=750&q=85"
  },
  {
    id: 7,
    name: "Winter Khaddar Prestige",
    category: "gents",
    fabric: "Khaddar",
    price: 5500,
    color: "Earth Tones",
    badge: "Winter Collection",
    description: "An unstitched khaddar fabric option for cooler weather.",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=750&q=85"
  },
  {
    id: 8,
    name: "Linen Tailoring Edit",
    category: "gents",
    fabric: "Linen",
    price: 6500,
    color: "Sand",
    badge: "Modern Classic",
    description: "A linen fabric selection for a refined custom-tailored look.",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=750&q=85"
  }
];

let cart = loadData("luxury_store_cart", []);
let reviews = loadData("luxury_store_reviews", []);

let toastTimeout;

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

/* PRODUCT SEARCH AND FILTERING */

function filteredProducts(category) {
  const query = $("#fabricSearch").value.trim().toLowerCase();
  const fabric = $("#fabricFilter").value;
  const sort = $("#priceSort").value;

  let result = products.filter(product => {
    const categoryMatch = product.category === category;

    const fabricMatch =
      fabric === "all" || product.fabric === fabric;

    const searchText = [
      product.name,
      product.fabric,
      product.color,
      product.description,
      product.badge
    ].join(" ").toLowerCase();

    return categoryMatch && fabricMatch && searchText.includes(query);
  });

  if (sort === "low") {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    result.sort((a, b) => b.price - a.price);
  }

  return result;
}

function productCard(product) {
  return `
    <article class="product-card">
      <div class="product-image-wrap">
        <img
          class="product-image"
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)} — ${escapeHTML(product.fabric)} collection"
          loading="lazy"
        >
        <span class="product-badge">${escapeHTML(product.badge)}</span>
      </div>

      <div class="product-info">
        <div class="product-category">
          ${product.category === "ladies" ? "Ladies" : "Gents"}
          · ${escapeHTML(product.fabric)}
        </div>

        <h3>${escapeHTML(product.name)}</h3>
        <p class="product-description">${escapeHTML(product.description)}</p>
        <div class="product-price">${money(product.price)}</div>

        <div class="product-actions">
          <button class="button button-outline-dark"
            data-buy="${product.id}">
            Buy Now
          </button>

          <button class="button button-gold"
            data-add="${product.id}">
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderProducts() {
  const ladies = filteredProducts("ladies");
  const gents = filteredProducts("gents");

  $("#ladiesGrid").innerHTML = ladies.map(productCard).join("");
  $("#gentsGrid").innerHTML = gents.map(productCard).join("");

  $("#ladiesEmpty").hidden = ladies.length > 0;
  $("#gentsEmpty").hidden = gents.length > 0;

  $("#searchSummary").textContent =
    `${ladies.length} ladies product(s) and ${gents.length} gents product(s) found.`;
}

$("#fabricSearch").addEventListener("input", renderProducts);
$("#fabricFilter").addEventListener("change", renderProducts);
$("#priceSort").addEventListener("change", renderProducts);

/* CART MANAGEMENT */

function saveCart() {
  saveData("luxury_store_cart", cart);
  renderCart();
}

function addToCart(id) {
  const product = products.find(item => item.id === Number(id));
  if (!product) return;

  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: product.id, quantity: 1 });
  }

  saveCart();
  showToast(`${product.name} added to your cart.`);
}

function changeQuantity(id, amount) {
  const item = cart.find(entry => entry.id === Number(id));
  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(entry => entry.id !== Number(id));
  }

  saveCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== Number(id));
  saveCart();
  showToast("Product removed from your cart.");
}

function getCartLines() {
  return cart.map(item => {
    const product = products.find(p => p.id === Number(item.id));

    if (!product) return null;

    const quantity = Math.max(
      1,
      Math.min(99, Math.floor(Number(item.quantity) || 1))
    );

    return {
      ...product,
      quantity,
      lineTotal: product.price * quantity
    };
  }).filter(Boolean);
}

function cartTotal() {
  return getCartLines().reduce(
    (sum, item) => sum + item.lineTotal, 0
  );
}

function renderCart() {
  const lines = getCartLines();

  $("#cartCount").textContent = lines.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  $("#cartSubtotal").textContent = money(cartTotal());
  $("#orderSubtotal").textContent = money(cartTotal());

  if (!lines.length) {
    $("#cartItems").innerHTML = `
      <div class="cart-empty">
        <p>Your shopping bag is empty.</p>
        <p>Explore our ladies and gents collections to begin.</p>
      </div>
    `;
    return;
  }

  $("#cartItems").innerHTML = lines.map(item => `
    <div class="cart-item">
      <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.name)}">

      <div>
        <h4>${escapeHTML(item.name)}</h4>
        <p>${escapeHTML(item.fabric)} · ${item.category}</p>
        <strong>${money(item.lineTotal)}</strong>

        <div class="quantity-control">
          <button data-quantity="${item.id}" data-change="-1"
            aria-label="Decrease quantity">−</button>
          <span>${item.quantity}</span>
          <button data-quantity="${item.id}" data-change="1"
            aria-label="Increase quantity">+</button>
        </div>
      </div>

      <button class="remove-item" data-remove="${item.id}">
        Remove
      </button>
    </div>
  `).join("");
}

function openCart() {
  $("#cartDrawer").classList.add("open");
  $("#cartDrawer").setAttribute("aria-hidden", "false");
  $("#cartBackdrop").hidden = false;
  document.body.style.overflow = "hidden";
}

function closeCart() {
  $("#cartDrawer").classList.remove("open");
  $("#cartDrawer").setAttribute("aria-hidden", "true");
  $("#cartBackdrop").hidden = true;
  document.body.style.overflow = "";
}

$("#openCart").addEventListener("click", openCart);
$("#closeCart").addEventListener("click", closeCart);
$("#cartBackdrop").addEventListener("click", closeCart);
$("#continueShopping").addEventListener("click", closeCart);

$("#cartItems").addEventListener("click", event => {
  const quantityButton = event.target.closest("[data-quantity]");
  const removeButton = event.target.closest("[data-remove]");

  if (quantityButton) {
    changeQuantity(
      quantityButton.dataset.quantity,
      Number(quantityButton.dataset.change)
    );
  }

  if (removeButton) {
    removeFromCart(removeButton.dataset.remove);
  }
});

function goToOrder(id) {
  if (id !== undefined) {
    addToCart(id);
  }

  closeCart();

  $("#order").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

$("#goToOrder").addEventListener("click", () => {
  if (!cart.length) {
    showToast("Please add a product to your cart first.");
    return;
  }

  goToOrder();
});

document.addEventListener("click", event => {
  const addButton = event.target.closest("[data-add]");
  const buyButton = event.target.closest("[data-buy]");

  if (addButton) {
    addToCart(addButton.dataset.add);
  }

  if (buyButton) {
    goToOrder(buyButton.dataset.buy);
  }
});

/* WHATSAPP ORDER SUBMISSION */

$("#orderForm").addEventListener("submit", event => {
  event.preventDefault();

  const form = event.currentTarget;

  if (!form.reportValidity()) return;

  const lines = getCartLines();

  if (!lines.length) {
    showToast("Please add at least one product before ordering.");
    return;
  }

  const data = new FormData(form);
  const phone = String(data.get("customerPhone")).trim();

  if (!/^[0-9+\s()-]{7,25}$/.test(phone)) {
    showToast("Please enter a valid phone number.");
    return;
  }

  const subtotal = lines.reduce(
    (sum, item) => sum + item.lineTotal, 0
  );

  const items = lines.map(item =>
    `• ${item.name} (${item.fabric})\n  ${item.quantity} × ${money(item.price)} = ${money(item.lineTotal)}`
  );

  const message = [
    "NEW CUSTOMER ORDER INQUIRY",
    "Luxury Fashion Store",
    "",
    ...items,
    "",
    `Cart subtotal: ${money(subtotal)}`,
    "Delivery charges: To be confirmed",
    "",
    `Customer: ${data.get("customerName")}`,
    `Phone: ${phone}`,
    `City: ${data.get("customerCity")}`,
    `Address: ${data.get("customerAddress")}`,
    `Payment preference: ${data.get("paymentMethod")}`,
    `Additional notes: ${data.get("orderNotes") || "None"}`,
    "",
    "Please confirm stock, fabric details, final price and delivery."
  ].join("\n");

  const url =
    `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(message)}`;

  const newWindow = window.open(url, "_blank");

  if (!newWindow) {
    window.location.href = url;
  }

  showToast("Order message prepared. Send it in WhatsApp to submit your inquiry.");
});

/* EMAIL CONTACT */

$("#emailLink").href =
  `mailto:${STORE.email}?subject=${encodeURIComponent("Luxury Fashion Store Product Inquiry")}`;

$("#whatsappLink").href =
  `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent("Hello! I would like to enquire about your unstitched fabric collections.")}`;

/* CUSTOMER REVIEWS */

function renderReviews() {
  const validReviews = reviews.filter(review =>
    review &&
    typeof review.name === "string" &&
    typeof review.text === "string" &&
    Number.isInteger(Number(review.rating)) &&
    Number(review.rating) >= 1 &&
    Number(review.rating) <= 5
  );

  const average = validReviews.length
    ? validReviews.reduce(
        (sum, review) => sum + Number(review.rating), 0
      ) / validReviews.length
    : 0;

  $("#averageRating").textContent =
    validReviews.length ? average.toFixed(1) : "—";

  $("#reviewCount").textContent = validReviews.length
    ? `${validReviews.length} review(s) submitted in this browser`
    : "No customer reviews submitted yet";

  if (!validReviews.length) {
    $("#reviewGrid").innerHTML = `
      <article class="review-card">
        <div class="review-stars">☆☆☆☆☆</div>
        <h3>Your feedback matters</h3>
        <p>
          Be among the first customers to share an honest review of your
          experience with our fabric selection and service.
        </p>
        <span class="review-label">No published customer reviews yet</span>
      </article>
    `;
    return;
  }

  $("#reviewGrid").innerHTML = validReviews.map(review => `
    <article class="review-card">
      <div class="review-stars" aria-label="${Number(review.rating)} out of 5 stars">
        ${"★".repeat(Number(review.rating))}${"☆".repeat(5 - Number(review.rating))}
      </div>
      <h3>Customer Experience</h3>
      <p>${escapeHTML(review.text)}</p>
      <div class="review-author">${escapeHTML(review.name)}</div>
      <span class="review-label">
        Browser-submitted review · Not independently verified
      </span>
    </article>
  `).join("");
}

$("#writeReview").addEventListener("click", () => {
  const form = $("#reviewForm");
  form.hidden = !form.hidden;

  if (!form.hidden) {
    form.scrollIntoView({ behavior: "smooth", block: "center" });
    form.querySelector('[name="reviewName"]').focus();
  }
});

$("#reviewForm").addEventListener("submit", event => {
  event.preventDefault();

  const form = event.currentTarget;

  if (!form.reportValidity()) return;

  const data = new FormData(form);

  const review = {
    id: Date.now(),
    name: String(data.get("reviewName")).trim(),
    rating: Number(data.get("reviewRating")),
    text: String(data.get("reviewText")).trim(),
    date: new Date().toISOString()
  };

  if (
    review.name.length < 2 ||
    review.text.length < 10 ||
    !Number.isInteger(review.rating) ||
    review.rating < 1 ||
    review.rating > 5
  ) {
    showToast("Please check your review details.");
    return;
  }

  reviews.unshift(review);

  if (!saveData("luxury_store_reviews", reviews)) {
    reviews.shift();
    return;
  }

  form.reset();
  form.hidden = true;
  renderReviews();

  showToast("Your review has been saved in this browser.");
});

/* MOBILE NAVIGATION */

$("#menuToggle").addEventListener("click", () => {
  const nav = $("#mainNav");
  const isOpen = nav.classList.toggle("nav-open");

  $("#menuToggle").setAttribute("aria-expanded", String(isOpen));
  $("#menuToggle").setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );

  $("#menuToggle").textContent = isOpen ? "✕" : "☰";
});

$("#mainNav").querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    $("#mainNav").classList.remove("nav-open");
    $("#menuToggle").textContent = "☰";
    $("#menuToggle").setAttribute("aria-expanded", "false");
    $("#menuToggle").setAttribute("aria-label", "Open navigation menu");
  });
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeCart();
});

/* INITIALIZE */

$("#year").textContent = new Date().getFullYear();

renderProducts();
renderCart();
renderReviews();
     
