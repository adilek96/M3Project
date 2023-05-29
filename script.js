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
const getcurrencyLeft = async () => {
  const response = await fetch(
    `https://api.exchangerate.host/latest?base=${leftSelectValueArr[0]}&symbols=${rightSelectValueArr[0]}`
  );
  const data = await response.json();

  return data;
};
// для правого контейнера
const getcurrencyRight = async () => {
  const response = await fetch(
    `https://api.exchangerate.host/latest?base=${rightSelectValueArr[0]}&symbols=${leftSelectValueArr[0]}`
  );
  const data = await response.json();

  return data;
};
// далее записываю полученный курс в  колонки
const select = document.querySelectorAll(`.select`);
select.forEach((element) => {
  element.addEventListener(`click`, (e) => {
    // для левой колонки
    addingLeftCurrency();
    // для правой колонки
    addingRightCurrency();
  });
});
// функции добавления курса в колонки
// для левой
function addingLeftCurrency() {
  getcurrencyLeft().then((value) => {
    const objValue = value.rates;
    const leftCurrency = document.querySelector(`.left-currency`);
    leftCurrency.innerText = `1 ${leftSelectValueArr[0]} = ${Object.values(
      objValue
    )} ${rightSelectValueArr[0]}`;
  });
}
addingLeftCurrency();
// для правой
function addingRightCurrency() {
  getcurrencyRight().then((value) => {
    const rightCurrency = document.querySelector(`.right-currency`);
    const objValue = value.rates;
    rightCurrency.innerText = `1 ${rightSelectValueArr[0]} = ${Object.values(
      objValue
    )} ${leftSelectValueArr[0]}`;
  });
}
addingRightCurrency();
//---------------------------------------
// конвертация
const form = document.querySelectorAll(`form input`);
const leftInput = document.querySelector(`.left`);
const rightInput = document.querySelector(`.right`);
form.forEach((element) => {
  // element.addEventListener(`keypress`, (event) => {
  //   if (key === ",") {
  //     event.preventDefault(); // Блокируем ввод запятой
  //     event.target.value += "."; // Добавляем точку в значение
  //   }
  });
  element.addEventListener(`input`, (e) => {
    if (e.target == leftInput) {
      // если инпут ввода будет левым
      getcurrencyLeft().then((value) => {
        const objValue = value.rates;
        rightInput.value = e.target.value * Object.values(objValue);
      });
    } else {
      // если инпут будет правым
      getcurrencyRight().then((value) => {
        const objValue = value.rates;
        leftInput.value = e.target.value * Object.values(objValue);
      });
    }
  });
  element.addEventListener(`focus`, (e) => {
    if (e.target == leftInput) {
      // если инпут ввода будет левым
      getcurrencyLeft().then((value) => {
        const objValue = value.rates;
        rightInput.value = e.target.value * Object.values(objValue);
      });
    } else {
      // если инпут будет правым
      getcurrencyRight().then((value) => {
        const objValue = value.rates;
        leftInput.value = e.target.value * Object.values(objValue);
      });
    }
  });
});

//---------------------------------------
//конвертация при изменении валюты
leftSelect.forEach((element) => {
  element.addEventListener(`click`, (e) => {
    getcurrencyLeft().then((value) => {
      const objValue = value.rates;
      rightInput.value = leftInput.value * Object.values(objValue);
    });
  });
});

rightSelect.forEach((element) => {
  element.addEventListener(`click`, (e) => {
    getcurrencyRight().then((value) => {
      const objValue = value.rates;
      leftInput.value = rightInput.value * Object.values(objValue);
    });
  });
});
