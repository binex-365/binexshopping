import { cart } from "../data/cart.js";

export function updateCartQuantity() {
  let cartQuantities = 0;
  cart.forEach((cartItem) => {
    cartQuantities += cartItem.quantity;
  });
  
  document.querySelector('.num')
    .innerHTML = cartQuantities;
  document.querySelector('.sid-num')
    .innerHTML = cartQuantities;
  document.querySelector('.sid-nums')
    .innerHTML = cartQuantities;
}