export function toggle() {
  const container = document.querySelector('.search-container');
  const search = document.querySelector('.search-icon');

  search.addEventListener('click', () => {
    container.classList.toggle('active');
  });
}

export function navBar() {
  const nav = document.querySelector('.js-nav');
  const open =  document.querySelector('.ham-div');
  const close = document.querySelector('.close-nav');

  open.addEventListener('click', () => {
    nav.style.width="129px";
  });

  close.addEventListener('click', () => {
    nav.style.width="0px";
  });
}

/*
  
*/