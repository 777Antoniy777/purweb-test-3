const slider = document.querySelector('.slider');
const sliderList = slider && slider.querySelector('.slider__list');
let sliderItems = slider && slider.querySelectorAll('.slider__item');
// const prevButton = slider && slider.querySelector('.slider__buttons-wrapper button:first-child');
const nextButton = slider && slider.querySelector('.slider__buttons-wrapper button:last-child');

const firstSlide = sliderItems[0].cloneNode(true);
const lastSlide = sliderItems[sliderItems.length - 1].cloneNode(true);
sliderList.prepend(lastSlide);
sliderList.append(firstSlide);
sliderItems = slider.querySelectorAll('.slider__item');

const sliderWidth = sliderItems.length * 100;
const slideWidth = 100 / sliderItems.length;
sliderList.style.width = `${sliderWidth}%`;
sliderList.style.transform = `translateX(-${slideWidth}%)`;

let slideNumber = 1;

const handleNextButtonClick = (evt) => {
  evt.preventDefault();

  slideNumber = ++slideNumber;

};

nextButton.addEventListener('click', handleNextButtonClick);
