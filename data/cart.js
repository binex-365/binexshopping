// --- cart.js ---
// Start with an empty cart by default
export let cart = [];

// Load cart from localStorage (if exists)
function loadFromStorage() {
  const storedCart = JSON.parse(localStorage.getItem('cart'));
  cart = Array.isArray(storedCart) ? storedCart : []; // ✅ ensures cart is always array
}
loadFromStorage();

// Save to localStorage
function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// ✅ Add item to cart
export function addToCart(productId) {
  const select = document.querySelector(`.js-select-${productId}`);
  const value = Number(select?.value || 1); // fallback to 1 if not found

  let itemMatches = cart.find(item => item.productId === productId);

  if (itemMatches) {
    itemMatches.quantity += value;
  } else {
    cart.push({
      productId,
      deliveryOptionId: '1', // default shipping
      quantity: value,
    });
  }

  saveToStorage();
  updateCartQuantity();
}

// ✅ Remove item from cart
export function removeFromCart(productId) {
  cart = cart.filter(cartItem => cartItem.productId !== productId);
  saveToStorage();
  updateCartQuantity();
}

// ✅ Update quantity (replace value instead of adding)
export function updateQuantity(productId, newQuantity) {
  const item = cart.find(cartItem => cartItem.productId === productId);
  if (item) {
    item.quantity = Math.max(1, Number(newQuantity)); // prevent 0 or negatives
  }
  saveToStorage();
  updateCartQuantity();
}

// ✅ Updates "Checkout (X items)"
export function updateCartQuantity() {
  let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartQuantityElement = document.querySelector('.js-cart-quantity');
  if (cartQuantityElement) {
    if (totalQuantity > 0) {
      cartQuantityElement.textContent = `Checkout (${totalQuantity} items)`;
    } else {
      cartQuantityElement.textContent = "Your cart is empty"; // ✅ show empty state
    }
  }
}