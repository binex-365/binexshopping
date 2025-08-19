import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/prdducts.js";
import { updateCartQuantity } from "./shared.js";
import { navBar, toggle } from "./Toggling.js";
updateCartQuantity
toggle();
navBar();

let isGeneratingProduct = '';
products.forEach((product) => {
  isGeneratingProduct += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="products-images/ratings/rating-${product.ratings.star * 10}.png">
        <div class="product-rating-count">
          ${product.ratings.count}
        </div>
      </div>

      <div class="product-price">
        ₦${product.price}
      </div>

      <div class="product-quantity-container">
        <select class="js-select-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-pops-${product.id}">
        <img src="products-images/red-check.jfif">
        Added
      </div>

      <button class="btn js-btn" 
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});

document.querySelector('.js-grid')
  .innerHTML = isGeneratingProduct;

document.querySelectorAll('.js-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const {productId} = button.dataset;
    addToCart(productId);
    updateCartQuantity();

    const popups = document.querySelector(`.js-pops-${productId}`);

    popups.classList.add('show');

    setTimeout(() => {
      popups.classList.remove('show');
    }, 2000);
    
  });
});