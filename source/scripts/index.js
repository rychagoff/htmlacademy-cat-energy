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

const range = document.querySelector('.example__range');             // Ищем бегунок
const rangeParent = range.offsetParent;                              // Ищем слайдер
const catBefore = document.querySelector('.example__image--before'); // Ищем блок "До"
const catAfter = document.querySelector('.example__image--after');   // Ищем блок "После"

const rangeParentWidth = rangeParent.offsetWidth;                    // Читаем ширину слайдера

range.addEventListener('mousedown', (evt) => {
  dragging = true;                                                   // Бегунок может двигаться
  evt.preventDefault();                                              // Выключаем запуск выделения (действие браузера)

  let rangeStyle = window.getComputedStyle(range);                   // Ищем CSS-стили бегунка
  let leftX = parseInt(rangeStyle.getPropertyValue('--x'));          // Читаем переменную "--x" положения бегунка
  let catBeforeStyle = window.getComputedStyle(catBefore);           // Ищем CSS-стили блока "До"
  let clipBefore = catBeforeStyle.getPropertyValue('--clip-before'); // Читаем переменную "--clip-before"
  let catAfterStyle = window.getComputedStyle(catAfter);             // Ищем CSS-стили блока "После"
  let clipAfter = catAfterStyle.getPropertyValue('--clip-after');    // Читаем переменную "--clip-after"

  let rangeParentLeft = rangeParent.getBoundingClientRect().left;    // Читаем расстояние от края окна до слайдера
  let rangeLeft = range.getBoundingClientRect().left;                // Читаем расстояние от края окна до бегунка

  console.log('Текущее положение (left) бегунка = ' + leftX+'%');
  console.log('Текущее положение курсора = ' + evt.clientX+'px');
  console.log('Расстояние от левого края окна до слайдера = ' + rangeParentLeft+'px');
  console.log('Расстояние от левого края окна до бегунка = ' + rangeLeft+'px');
  console.log('Расстояние от курсора до левого края бегунка = ' + (evt.clientX - rangeLeft)+'px');
  console.log('----------');

  document.addEventListener('mousemove', onMouseMove);               // Функция движения мыши
  document.addEventListener('mouseup', onMouseUp);                   // Функция отпускания кнопки мыши

  function onMouseMove(evt) {
    if (!dragging) return;                                           // Если бегунок двигается, то функция выполняется

    console.log('Новое положение курсора = ' + evt.clientX+'px');
    console.log('Расстояние от края слайдера до нового положения курсора = ' + (evt.clientX - rangeParentLeft) +'px');

    leftX = (evt.clientX - rangeParentLeft) / rangeParentWidth;      // Считаем соотношение нового положения курсора
                                                                     // с шириной слайдера

    // Курсор вышел слева из слайдера => оставить бегунок в его границах.
    if (leftX < 0) {
      leftX = 0;
    }
    // Курсор вышел справа из слайдера => оставить бегунок в его границах.
    if (leftX > 1) {
      leftX = 1;
    }

    leftX = leftX.toFixed(6) * 100;                           // Сокращаем значение до 6 знаков после запятой
    console.log(leftX);                                       // Выводим новое значение в консоль

    clipAfter = `0 0 0 ${leftX}%`;                            // Определяем новое значение переменной "--clip-after"
    clipBefore = `0 ${100 - leftX}% 0 0`;                     // Определяем новое значение переменной "--clip-before"

    range.style.setProperty("--x", `${leftX}%`);              // Пишем новое положение бегунка в переменную "--x"
    catAfter.style.setProperty('--clip-after', clipAfter);    // Пишем новую обрезку кота в блоке "После"
    catBefore.style.setProperty('--clip-before', clipBefore); // Пишем новую обрезку кота в блоке "До"
  }

  function onMouseUp() {
    document.removeEventListener('mouseup', onMouseUp);       // Завершаем событие нажатия кнопки мыши
    document.removeEventListener('mousemove', onMouseMove);   // Завершаем событие движения мыши
    dragging = false;                                         // Бегунок теперь не двигается
  }
});
