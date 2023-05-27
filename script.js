const leftSelect = document.querySelectorAll(`.left-select li`);
const leftSelectValueArr = [`RUB`];
leftSelect.forEach((element) => {
  element.addEventListener(`click`, (e) => {
    const selected = document.querySelector(`.left-selected`);
    selected.classList.remove(`left-selected`);
    e.target.classList.add(`left-selected`);
    const newSelected = document.querySelector(`.left-selected`);
    leftSelectValueArr.unshift(newSelected.textContent);
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
const getcurrency = async () => {
  console.log(leftSelectValueArr);
  console.log(rightSelectValueArr);
};
getcurrency();
