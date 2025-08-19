import { cart, removeFromCart } from '../data/cart.js';
import { products } from '../data/prdducts.js';

let cartSummary = '';
cart.forEach((cartItem) => {
  const {productId} = cartItem;
  let sameProduct;
  products.forEach((product) => {
    product.id === productId ? sameProduct = product : '';
  });

  cartSummary += `
    <div class="product-grid-container conta-${sameProduct.id}">
      <p class="dates">Delivery date: Tuesday, June 21</p>
      <div class="container1">
        <div class="section">
          <div class="imgs-cont">
            <img src="${sameProduct.image}" alt="" class="imgs-1">
          </div>

          <div class="info">
            <div class="name">
              ${sameProduct.name}
            </div>

            <div class="prices">₦${sameProduct.price}</div>

            <div class="det">
              <div class="quant">
                Quantity: <span class="num js-sps-${sameProduct.id}">
                  ${cartItem.quantity}
                </span>
              </div> 
              
              <div class="query">
                <span class="update js-upd" data-product-id="${sameProduct.id}">Update</span>
                <input type="number" class="inpt js-inpt-${sameProduct.id}" placeholder="Update">
                <div class="save js-save-${sameProduct.id}" data-product-id="${sameProduct.id}">Save</div>
                <span class="delete js-del" data-product-id = "${sameProduct.id}">Delete</span>
              </div>
            </div>
            <div class="loading-container js-l-${sameProduct.id}">
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
          <h3 class="ttl">Choose a delivery option:</h3>
          <div class="chs-grid">
            <input type="radio" name="name-${sameProduct.id}" class="radio" id='nao'>
          
            <label for="nao" class="lab">
              Wednesday, May 21
              <div class="ships">1,500 - Shipping</div>
            </label>
          </div>

          <div class="chs-grid">
            <input type="radio" name="name-${sameProduct.id}"class="radio" id='nam'>
          
            <label for="nam" class="lab">
              Saturday, May 24
              <div class="ships">1,000 - Shipping</div>
            </label>
          </div>

          <div class="chs-grid">
            <input type="radio" name="name-${sameProduct.id}" class="radio" id='naw'>
          
            <label for="naw" class="lab">
              Wednesday, May 21
              <div class="ships">1,500 - Shipping</div>
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

      /*let cartyQ = 0
      cart.forEach((cartItem) => {
        cartyQ += cartItem.quantity;
      });
      numbs > 0 ? numbs += cartyQ: '';
      console.log(numbs); */
        
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