//Elements HTML
const waterMood = document.querySelector('#left-article__img');
const actualDrinkImage = document.querySelector('#section__actual-drink-img');
const drinkTitle = document.querySelector(".drink-inputs__title");
const drinkHydro = document.querySelector(".drink-inputs__hydro");
const actualValueBar = document.querySelector("#actual_value");
const barFill = document.querySelector('.bar__fill');
const needValueBar = document.querySelector('#need_value');
const inputValue = document.querySelector('.from__input');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const addValueBtn = document.querySelector('.from__btn');
//Variables
let weightValue = localStorage.getItem("weight");
let needDrinkValue;
let Drink = 0;
let actualValue = 0;
let wasClicked = false;

//Run Website Function
const startWeb = () => {
  if(localStorage.getItem("weight") === null)
{
  document.location.href = '../index.html';
}
  needDrinkValue = 35*parseInt(weightValue);
  needValueBar.textContent = needDrinkValue;
  document.querySelector("body").style.display = "flex";
}

startWeb();
//Objects
const drinks = [{
        "name": "Water",
        "hydroValue": 100,
        "link": "../images/glass-water.png"
    },
    {
        "name": "Juice",
        "hydroValue": 80,
        "link": "../images/juice.png"
    },
    {
        "name": "Milk",
        "hydroValue": 80,
        "link": "../images/glass-milk.png"
    },
    {
        "name": "Coffee",
        "hydroValue": 10,
        "link": "../images/cup-coffee.png"
    },
    {
        "name": "Tea",
        "hydroValue": 10,
        "link": "../images/cup-tea.png"
    },
    {
        "name": "Cola",
        "hydroValue": -80,
        "link": "../images/glass-cola.png"
    },
    {
        "name": "Energy-Drink",
        "hydroValue": -100,
        "link": "../images/energy-drink.png"
    },
]
const waterDropImg = [{
        "link": "../images/sad-water.png"
    },
    {
        "link": "../images/normal-water.png"
    },
    {
        "link": "../images/happy-water.png"
    },
    {
        "link": "../images/superhappy-water.png"
    },
]
//Left Right arrow / btn function
leftArrow.addEventListener("click", function() {
    if (Drink > 0 && wasClicked === false) {
        Drink--;
        actualDrinkImage.classList.add('slider-right');
        actualDrinkImage.src = `${drinks[Drink].link}`;
        setTimeout(() => {
            actualDrinkImage.classList.remove('slider-right');
            wasClicked = false;
        }, "1000")
        updateActualDrink();
        wasClicked = true;
    }
});
rightArrow.addEventListener("click", function() {
    if (Drink < drinks.length - 1 && wasClicked === false) {
        Drink++;
        actualDrinkImage.src = `${drinks[Drink].link}`;
        if (Drink < drinks.length) {
            actualDrinkImage.classList.add('slider-left');
            setTimeout(() => {
                actualDrinkImage.classList.remove('slider-left');
                wasClicked = false;
            }, "1000")
        }
        updateActualDrink();
        wasClicked = true;
    }
});

addValueBtn.addEventListener("click", function() {
    if (inputValue.value > 0 && inputValue.value<=5000) {
        let value = (inputValue.value * (drinks[Drink].hydroValue / 100));
        updateWaterValue(value);
    }
});
//Update Value Funtions
const updateActualDrink = () => {
    drinkTitle.textContent = drinks[Drink].name;
    drinkHydro.textContent = `(hydro = ${drinks[Drink].hydroValue}%)`;
}
const updateWaterValue = (inputValue) => {
    actualValue = actualValue + inputValue;
    actualValueBar.textContent = actualValue;
    updateBar();
}
const updateBar = () => {
    let widthBar = (actualValue / needDrinkValue) * 100;
    barFill.style.width = `${widthBar}%`;
    if (widthBar <= 0) {
        barFill.style.width = 0;
        barFill.classList.remove("bar__fill__border");
    } else {
        barFill.classList.add("bar__fill__border");
    }
    updateWaterImg(widthBar);
}
const updateWaterImg = (e) => {
    if (e < 33) {
        waterMood.src = `${waterDropImg[0].link}`;
    } else if (e >= 33 && e < 66) {
        waterMood.src = `${waterDropImg[1].link}`;
    } else if (e >= 66 & e < 100) {
        waterMood.src = `${waterDropImg[2].link}`;
    } else {
        waterMood.src = `${waterDropImg[3].link}`;
    }
}

waterMood.addEventListener('dblclick', function() {
      let value = 200;
      updateWaterValue(value);
});

//Double Click on Phone
let lastClick = 0;
waterMood.addEventListener('touchstart', function(e) {
    e.preventDefault();
    let date = new Date();
    let time = date.getTime();
    let value = 200
    const time_between_taps = 300;
    if (time - lastClick < time_between_taps) {
        updateWaterValue(value)
    }
    lastClick = time;
});

