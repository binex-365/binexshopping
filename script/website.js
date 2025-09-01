// --- Existing code ---
import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/prdducts.js";
import { updateCartQuantity } from "./shared.js";
import { navBar, toggle } from "./Toggling.js";

updateCartQuantity();
toggle();
navBar();

// --- FUNCTION TO DISPLAY PRODUCTS WITH HIGHLIGHT ---
function displayProducts(productList, searchQuery = '') {
  let html = '';

  if (productList.length === 0) {
    html = `
      <div style="grid-column: 1/-1; text-align: center; color: white; font-size: 1.5rem; padding: 50px;">
        No products found for "<strong>${searchQuery}</strong>"
      </div>
    `;
  } else {
    const query = searchQuery.toLowerCase();
    productList.forEach((product) => {
      // Highlight matching text in name
      const highlightedName = product.name.replace(
        new RegExp(`(${query})`, 'gi'),
        '<span style="background-color: yellow; color: black;">$1</span>'
      );

      html += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image" src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${highlightedName}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="Products-images/ratings/rating-${product.ratings.star * 10}.png">
            <div class="product-rating-count">
              ${product.ratings.count}
            </div>
          </div>

          <div class="product-price">
            ₦${product.price}
          </div>

          <div class="product-quantity-container">
            <select class="js-select-${product.id}">
              ${[...Array(10).keys()].map(i => `<option value="${i+1}" ${i===0?'selected':''}>${i+1}</option>`).join('')}
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-pops-${product.id}">
            <img src="Products-images/red-check.jfif"> Added
          </div>

          <button class="btn js-btn" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
      `;
    });
  }

  document.querySelector('.js-grid').innerHTML = html;

  // Reattach add-to-cart button listeners
  document.querySelectorAll('.js-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const { productId } = button.dataset;
      addToCart(productId);
      updateCartQuantity();

      const popups = document.querySelector(`.js-pops-${productId}`);
      popups.classList.add('show');

      setTimeout(() => {
        popups.classList.remove('show');
      }, 2000);
    });
  });
}

// --- INIT DISPLAY ---
displayProducts(products);

// --- SEARCH FUNCTIONALITY ---
const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-button'); // make sure your button has class="search-btn"

function searchProducts() {
  const query = searchInput.value.toLowerCase().trim();

  const filtered = products.filter(product => 
    product.name.toLowerCase().includes(query) || 
    product.keyWords.some(keyword => keyword.toLowerCase().includes(query))
  );

  displayProducts(filtered, query);
}

// Live search as user types
searchInput.addEventListener('input', searchProducts);

// Search button click: search + clear input
searchBtn.addEventListener('click', () => {
  searchProducts();       // Run the search
  searchInput.value = ''; // Clear the search bar
});
