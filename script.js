const select = document.querySelectorAll(`.select`);
// получаю данные списка выбора валют
const leftSelect = document.querySelectorAll(`.left-select li`);
const leftSelectValueArr = [`RUB`]; // массив с валютами выбранными пользователем: [0] элемент - последние что выбрал пользователь
leftSelect.forEach((element) => {
  element.addEventListener(`click`, (e) => {
    // при клике происходит следущие:
    const selected = document.querySelector(`.left-selected`); // получаем элемент выбранный по умолчанию
    selected.classList.remove(`left-selected`); // удаляем класс у этого элемента
    e.target.classList.add(`left-selected`); // добавляем класс на новый элемент
    const newSelected = document.querySelector(`.left-selected`); // получаем новый элемент выбранный пользователем
    leftSelectValueArr.unshift(newSelected.textContent); // добавляем элемент в начало массива
  });
});
// то же самое что и выше только для правой колонки
const rightSelectValueArr = [`USD`];
const rightSelect = document.querySelectorAll(`.right-select li`);
rightSelect.forEach((element) => {
  element.addEventListener(`click`, (e) => {
    const selected = document.querySelector(`.right-selected`);
    selected.classList.remove(`right-selected`);
    e.target.classList.add(`right-selected`);
    const newSelected = document.querySelector(`.right-selected`);
    rightSelectValueArr.unshift(newSelected.textContent);
  });
});
//------------------------------------
// функция получающая курс с сервера АПИ
// для левого контейнера
const getcurrency = async (a, b) => {
  try {
    const response = await fetch(
      `https://api.exchangerate.host/latest?base=${b}&symbols=${a}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    const errorMessage = document.createElement(`p`);
    const parentElement = document.querySelector(`section`);
    errorMessage.innerText = `internet error`;
    errorMessage.style = `color:red;`;
    parentElement.append(errorMessage);
  }
};
// функции добавления курса в колонки
// для левой
const leftValue = []; // массив для сохранение значений валюты левой колонки
function addingLeftCurrency() {
  const leftInput = document.querySelector(`.left`);
  const rightInput = document.querySelector(`.right`);
  getcurrency(rightSelectValueArr[0], leftSelectValueArr[0]).then((value) => {
    const objValue = Object.values(value.rates);
    const leftCurrency = document.querySelector(`.left-currency`);
    leftCurrency.innerText = `1 ${leftSelectValueArr[0]} = ${objValue} ${rightSelectValueArr[0]}`;
    rightInput.value = leftInput.value * objValue;
    leftValue.unshift(objValue);
  });
}
addingLeftCurrency();

// для правой
const rightValue = []; // массив для сохранение значений валюты правой колонки
function addingRightCurrency() {
  getcurrency(leftSelectValueArr[0], rightSelectValueArr[0]).then((value) => {
    const rightCurrency = document.querySelector(`.right-currency`);
    const objValue = Object.values(value.rates);
    rightCurrency.innerText = `1 ${rightSelectValueArr[0]} = ${objValue} ${leftSelectValueArr[0]}`;
    rightValue.unshift(objValue);
  });
}
addingRightCurrency();
// вызываю функции добавления значений валют при клике на валюту
select.forEach((element) => {
  element.addEventListener(`click`, (e) => {
    // для левой колонки

    addingLeftCurrency();
    // для правой колонки
    addingRightCurrency();
  });
});
//---------------------------------------
// проверка на ввод (вводятся только цифры точка и запятая)/ при этом запятая превращается в точку
function validateInput(input) {
  // Удаляем все символы, кроме цифр и запятых
  input.value = input.value.replace(/[^0-9.,]/g, "");
  input.value = input.value.replace(",", ".");
  // Проверяем, есть ли уже точка в поле ввода
  if (input.value.indexOf(".") !== input.value.lastIndexOf(".")) {
    input.value = input.value.slice(0, -1);
  }
}
//-----------------------------------------
// смена инпутов при клике
const leftInput = document.querySelector(`.left`);
const rightInput = document.querySelector(`.right`);
// начальное значение
leftInput.value = 1;
rightInput.addEventListener(`click`, (e) => {
  e.target.classList.remove(`right`);
  leftInput.classList.remove(`left`);
  e.target.classList.add(`left`);
  leftInput.classList.add(`right`);
});
leftInput.addEventListener(`click`, (e) => {
  e.target.classList.remove(`right`);
  rightInput.classList.remove(`left`);
  e.target.classList.add(`left`);
  rightInput.classList.add(`right`);
});
//----------------------------------------
// конвертация
leftInput.oninput = () => {
  validateInput(leftInput);
  rightInput.value = leftInput.value * leftValue[0];
};
rightInput.oninput = () => {
  validateInput(rightInput);
  leftInput.value = rightInput.value * rightValue[0];
};
