import { cart, removeFromCart } from '../data/cart.js'; 
import { products } from '../data/prdducts.js';
import { updateQuantity } from '../data/cart.js';
import { updateCartQuantity } from '../data/cart.js'; 
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions } from '../data/deliveryOption.js';

// ---------------- Helper ----------------
function toNumber(priceString) {
  return Number(priceString.toString().replace(/,/g, ''));
}

let cartSummary = '';
cart.forEach((cartItem) => {
  let fullProducts = products.find((product) => product.id === cartItem.productId);

  cartSummary += `
    <div class="product-grid-container conta-${fullProducts.id}">
      <p class="dates js-date-${fullProducts.id}">Delivery date: Loading...</p>
      <div class="container1">
        <div class="section">
          <div class="imgs-cont">
            <img src="${fullProducts.image}" alt="" class="imgs-1">
          </div>

          <div class="info">
            <div class="name">
              ${fullProducts.name}
            </div>

            <div class="prices">₦${fullProducts.price}</div>

            <div class="det">
              <div class="quant">
                Quantity: <span class="num js-sps-${fullProducts.id}">
                  ${cartItem.quantity}
                </span>
              </div> 
              
              <div class="query">
                <span class="update js-upd" data-product-id="${fullProducts.id}">Update</span>
                <input type="number" min="1" class="inpt js-inpt-${fullProducts.id}">
                <div class="save js-save-${fullProducts.id}" data-product-id="${fullProducts.id}">Save</div>
                <span class="delete js-del" data-product-id="${fullProducts.id}">Delete</span>
              </div>
            </div>
            <div class="loading-container js-l-${fullProducts.id}">
              <div class="loader">
                <div class="ld-t">Loading</div>
                <div class="loading one"></div>
                <div class="loading two"></div>
                <div class="loading three"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="section-ii">
          <div class="ttl">
            Choose a delivery option:
          </div>
           ${deliveryOption(fullProducts, cartItem)}
        </div>
      </div>
    </div>
  `;
});

function deliveryOption(fullProducts, cartItem) {
  let html = '';
  deliveryOptions.forEach((option) => {
    const today = dayjs();
    const deliveryDate = today.add(option.deliveryDays, 'days');
    const toDeliver = deliveryDate.format('dddd, MMMM D');

    const pricy = option.deliveryPrice === "0" ? "FREE" : `₦${option.deliveryPrice} - `;

    const isDefaultFree = option.deliveryPrice === "0" && !cartItem.deliveryOptionId;
    const checky = option.id === cartItem.deliveryOptionId || isDefaultFree ? "checked" : "";

    if (isDefaultFree) {
      cartItem.deliveryOptionId = option.id;
      localStorage.setItem('cart', JSON.stringify(cart));
    }

    html += `
      <div class="chs-grid js-option" data-product-id="${fullProducts.id}" data-delivery-id="${option.id}">
        <input 
          type="radio" 
          class="radio js-delivery-option" 
          name="delivery-option-${fullProducts.id}" 
          data-product-id="${fullProducts.id}" 
          data-delivery-id="${option.id}" 
          ${checky}
        >
        <label class="js-option-label" data-product-id="${fullProducts.id}" data-delivery-id="${option.id}">
          <div class="lab">${toDeliver}</div>
          <div class="ship">${pricy} Shipping</div>
        </label>
      </div>
    `;
  });
  return html;
}

document.querySelector('.js-group').innerHTML = cartSummary;

// ------------------ Update logic ------------------
update();
function update() {
  document.querySelectorAll('.js-upd').forEach((upds) => {
    upds.addEventListener('click', () => {
      const {productId} = upds.dataset;
      const input = document.querySelector(`.js-inpt-${productId}`);
      const load = document.querySelector(`.js-l-${productId}`);

      load.classList.add('load-flex');

      setTimeout(() => {
        load.classList.remove('load-flex');
        input.classList.add('show');
        document.querySelector(`.js-save-${productId}`).classList.add('show');
      }, 500);
    });
  });
}

saving();
function saving() {
  document.querySelectorAll('.save').forEach((svs) => {
    svs.addEventListener('click', () => {
      const {productId} = svs.dataset;
      const input = document.querySelector(`.js-inpt-${productId}`);
      let newQuantity = Number(input.value);

      if (!newQuantity || newQuantity < 1) {
        alert("Quantity must be at least 1");
        return;
      }

      const load = document.querySelector(`.js-l-${productId}`);
      load.classList.add('load-flex');
      
      setTimeout(() => {
        load.classList.remove('load-flex');
        updateQuantity(productId, newQuantity);
        document.querySelector(`.js-sps-${productId}`).textContent = newQuantity;
        document.querySelector(`.js-save-${productId}`).classList.remove('show');
        input.classList.remove('show');
        input.value = '';
        create();
        updatePaymentSummary();
      }, 1000);
    });
  });
}

document.querySelectorAll('.js-del').forEach((del) => {
  del.addEventListener('click', () => {
    const {productId} = del.dataset;
    const contains = document.querySelector(`.conta-${productId}`);
    const message = document.querySelector('.js-mesg');
    
    removeFromCart(productId);

    const load = document.querySelector(`.js-l-${productId}`);
    load.classList.add('load-flex');

    setTimeout(() => {
      load.classList.remove('load-flex');
      contains.remove();
      message.classList.add('pty');
      create();
      updatePaymentSummary();
    }, 1000);
    
    setTimeout(() => {
      message.classList.remove('pty');
    }, 2500);
  });
});

create();
function create() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector('.js-ctn').textContent = cartQuantity;
  updateCartQuantity();

  if (cartQuantity === 0) {
    document.querySelector('.js-ctn').style.animation="none";
    document.querySelector('.usd').classList.add('us-on');
  }
}

// ✅ Delivery option interactivity
document.querySelectorAll('.js-option, .js-option-label').forEach((element) => {
  element.addEventListener('click', () => {
    const productId = element.dataset.productId;
    const deliveryId = element.dataset.deliveryId;

    const radio = document.querySelector(
      `.js-delivery-option[data-product-id="${productId}"][data-delivery-id="${deliveryId}"]`
    );
    if (radio) {
      radio.checked = true;
    }

    const cartItem = cart.find(item => item.productId === productId);
    if (cartItem) {
      cartItem.deliveryOptionId = deliveryId;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateDeliveryDate(productId, deliveryId);
    updatePaymentSummary();
  });
});

cart.forEach((cartItem) => {
  if (cartItem.deliveryOptionId) {
    updateDeliveryDate(cartItem.productId, cartItem.deliveryOptionId);
  }
});

function updateDeliveryDate(productId, deliveryId) {
  const option = deliveryOptions.find(opt => opt.id === deliveryId);
  if (option) {
    const today = dayjs();
    const deliveryDate = today.add(option.deliveryDays, 'days');
    const toDeliver = deliveryDate.format('dddd, MMMM D');
    document.querySelector(`.js-date-${productId}`).textContent = `Delivery date: ${toDeliver}`;
  }
}

// ---------------- Payment Summary Logic ----------------
function calculateItemsTotal() {
  const itemsCountEl = document.getElementById("items-count");
  const itemsPriceEl = document.getElementById("items-price");

  if (!itemsCountEl || !itemsPriceEl) return { totalItems: 0, totalPrice: 0 };

  let totalItems = 0;
  let totalPrice = 0;

  cart.forEach(cartItem => {
    const product = products.find(p => p.id === cartItem.productId);
    if (product) {
      const price = toNumber(product.price);
      totalItems += cartItem.quantity;
      totalPrice += cartItem.quantity * price;
    }
  });

  itemsCountEl.textContent = totalItems;
  itemsPriceEl.textContent = totalItems === 0 ? "₦0" : `₦${totalPrice.toLocaleString()}`;

  return { totalItems, totalPrice };
}

function calculateShipping() {
  const shippingPriceEl = document.getElementById("shipping-price");
  if (!shippingPriceEl) return 0;

  let shippingCost = 0;
  cart.forEach(cartItem => {
    const option = deliveryOptions.find(opt => opt.id === cartItem.deliveryOptionId);
    if (option) {
      shippingCost += Number(option.deliveryPrice);
    }
  });

  shippingPriceEl.textContent = `₦${shippingCost.toLocaleString()}`;
  return shippingCost;
}

function updatePaymentSummary() {
  const { totalPrice } = calculateItemsTotal();
  const shippingCost = calculateShipping();

  const totalPriceEl = document.getElementById("total-price");
  if (totalPriceEl) {
    totalPriceEl.textContent = `₦${(totalPrice + shippingCost).toLocaleString()}`;
  }
}

updatePaymentSummary();
