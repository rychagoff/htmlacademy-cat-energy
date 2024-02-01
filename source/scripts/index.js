/* в этот файл добавляет скрипты*/

const navMain = document.querySelector('.main-nav');
const navToggle = document.querySelector('.main-header__toggle');
const map = document.querySelector('.main-footer__map-nojs');

navMain.classList.remove('main-nav--nojs');
navToggle.classList.remove('main-header__toggle--nojs');

navToggle.addEventListener('click', () => {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navToggle.classList.remove('main-header__toggle--closed');
    navMain.classList.add('main-nav--opened');
    navToggle.classList.add('main-header__toggle--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navToggle.classList.add('main-header__toggle--closed');
    navMain.classList.remove('main-nav--opened');
    navToggle.classList.remove('main-header__toggle--opened');
  }
});

map.style.zIndex = '0';
