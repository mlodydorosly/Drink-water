const startBtn = document.querySelector('#start-btn');
const formBtn = document.querySelector('#form-btn');
const screenWelcome = document.querySelector('.screen-welcome');
const formScreen = document.querySelector('.screen-form');
const inputWeight = document.querySelector('#screen-from__input');


startBtn.addEventListener("click", function() {
    screenWelcome.classList.replace('visable','novisable');
    formScreen.classList.replace('novisable','visable');
  });

  formBtn.addEventListener('click',function() {
    weightValue = inputWeight.value;
    localStorage.setItem("weight", weightValue);
  });


