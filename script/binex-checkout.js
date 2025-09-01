import { cart, removeFromCart } from '../data/cart.js';
import { products } from '../data/prdducts.js';
//import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
let cartSummary = '';
cart.forEach((cartItem) => {

  let fullProducts ='';
  products.forEach((product) => {
    product.id === cartItem.productId ? fullProducts = product: '';
  });

  cartSummary += `
    <div class="product-grid-container conta-${fullProducts.id}">
      <p class="dates">Delivery date: Tuesday, June 21</p>
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
                <input type="number" class="inpt js-inpt-${fullProducts.id}">
                <div class="save js-save-${fullProducts.id}" data-product-id="${fullProducts.id}">Save</div>
                <span class="delete js-del" data-product-id = "${fullProducts.id}">Delete</span>
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
           <div class="chs-grid">
            <input type="radio"
              class="radio"
              name="delivery-option-${fullProducts.id}">
            <label>
              <div class="lab">
                Friday, August 29
              </div>
              <div class="ship">
                FREE Shipping
              </div>
            </label>
          </div>

           <div class="chs-grid">
            <input type="radio"
              class="radio"
              name="delivery-option-${fullProducts.id}">
            <label>
              <div class="lab">
                Friday, August 29
              </div>
              <div class="ship">
                2,500 Shipping
              </div>
            </label>
          </div>

          <div class="chs-grid">
            <input type="radio"
              class="radio"
              name="delivery-option-${fullProducts.id}">
            <label>
              <div class="lab">
                Friday, August 29
              </div>
              <div class="ship">
                2,500 Shipping
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  `;
});

document.querySelector('.js-group').innerHTML = cartSummary;

update();
function update() {
  document.querySelectorAll('.js-upd').forEach((upds) => {
    upds.addEventListener('click', () => {
      const {productId} = upds.dataset;
      const input = document.querySelector(`.js-inpt-${productId}`);
      const numbs = Number(input.value);
      
      const load = document.querySelector(`.js-l-${productId}`);
      load.classList.add('load-flex');

      const saves = document.querySelector(`.js-save-${productId}`);
      

      setTimeout(() => {
        load.classList.remove('load-flex');
        saves.classList.add('show');
        input.classList.add('show');
      }, 500)
    });
  });
}

saving();
function saving() {
  document.querySelectorAll('.save')
  .forEach((svs) => {
    svs.addEventListener('click', () => {
      const {productId} = svs.dataset;

      const input = document.querySelector(`.js-inpt-${productId}`);
        
        const load = document.querySelector(`.js-l-${productId}`);
        load.classList.add('load-flex');
        
        setTimeout(() => {
          load.classList.remove('load-flex');

          let numbs = Number(input.value);
          input.classList.remove('show');

          let itemMatches;
          cart.forEach((cartItem) => {
            productId === cartItem.productId ? itemMatches = cartItem : '';
          });

          if (itemMatches) {
            itemMatches.quantity += numbs;
          } else {
            cart.push({
              productId,
              quantity: numbs
            });
          }


          const saves = document.querySelector(`.js-save-${productId}`);
          saves.classList.remove('show');

          document.querySelector(`.js-sps-${productId}`)
            .innerHTML = numbs;

            input.value = '';
        }, 2000);
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

  document.querySelector('.js-ctn').innerHTML = cartQuantity;
  if (cartQuantity === 0) {
    document.querySelector('.js-ctn').style.animation="none";
    document.querySelector('.usd').classList.add('us-on');
  }
}