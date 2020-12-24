const slider = document.querySelector('.slider');
const sliderList = slider && slider.querySelector('.slider__list');
const startSliderItems = slider && slider.querySelectorAll('.slider__item');
// const prevButton = slider && slider.querySelector('.slider__buttons-wrapper button:first-child');
const nextButton = slider && slider.querySelector('.slider__buttons-wrapper button:last-child');

const firstSlide = startSliderItems[0].cloneNode(true);
const lastSlide = startSliderItems[startSliderItems.length - 1].cloneNode(true);
firstSlide.classList.add('clonned-item');
lastSlide.classList.add('clonned-item');
sliderList.prepend(lastSlide);
sliderList.append(firstSlide);

const extentedSliderItems = slider && Array.from(slider.querySelectorAll('.slider__item'));
const sliderWidth = extentedSliderItems.length * 100;
const slideWidth = 100 / extentedSliderItems.length;
sliderList.style.width = `${sliderWidth}%`;
sliderList.style.transform = `translateX(-${slideWidth}%)`;
// sliderList.style.transition = `transform 0.3s`;

let slideIndex = 1;
let currentSlide = extentedSliderItems[slideIndex];
let start = Date.now(); // запомнить время начала

const handleNextButtonClick = (evt) => {
  evt.preventDefault();
  let testWidth = 0;
  let translateWidth;

  if (currentSlide.classList.contains('clonned-item')) {
    sliderList.style.transition = `none`;
    slideIndex = 1;
  }

  slideIndex = slideIndex + 1;
  currentSlide = extentedSliderItems[slideIndex];
  console.log(currentSlide)

  let timer = setInterval(function() {
    // сколько времени прошло с начала анимации?
    let timePassed = Date.now() - start;

    if (timePassed >= 2000) {
      clearInterval(timer); // закончить анимацию через 2 секунды
      return;
    }

    // отрисовать анимацию на момент timePassed, прошедший с начала анимации
    draw(timePassed);

  }, 20);

  // в то время как timePassed идёт от 0 до 2000
  // left изменяет значение от 0px до 400px
  function draw(timePassed) {
    // train.style.left = timePassed / 5 + 'px';
    sliderList.style.transform = timePassed / 5 + '%';
  }

  translateWidth = slideIndex * slideWidth;
  // let timer = setInterval(() => {
  //   if (testWidth >= slideWidth) {
  //     console.log(testWidth, slideWidth)
  //     clearInterval(timer);
  //     testWidth = 0;
  //   } else {
  //     testWidth = testWidth + 1;
  //     sliderList.style.transform = `translateX(-1%)`;
  //     // increase style.left by 2px
  //   }
  // }, 20);
  // sliderList.style.transform = `translateX(-${translateWidth}%)`;
  // sliderList.style.transition = `transform 0.3s`;
};

nextButton.addEventListener('click', handleNextButtonClick);
