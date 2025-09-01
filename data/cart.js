export let cart = undefined;

function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'))||
  [{
    productId: 'svfhyf2156-3434rfdrfrrfg-5342',
    quantity: 2,
  }, {
    productId: 'htuihgiusheio-5645w3-dfBBGa',
    quantity: 1,
  }];
}

loadFromStorage();

export function addToCart(productId) {
  const select = document.querySelector(`.js-select-${productId}`);
  const value = Number(select.value);

  let itemMatches;
  cart.forEach((cartItem) => {
    productId === cartItem.productId ? itemMatches = cartItem : '';
  });

  if (itemMatches) {
    itemMatches.quantity += value;
  } else {
    cart.push({
      productId,
      quantity: value,
    });
  }
  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    cartItem.productId !== productId ? newCart.push(cartItem) : '';
  });
  cart = newCart;
  saveToStorage();
}

/*export function updateQuantity(productId, newQuantity) {
  cart.forEach((cartItem) => {
    cartItem.productId === productId ? newQuantity += cartItem.quantity : console.log('False');
  });
  saveToStorage();
}*/

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}