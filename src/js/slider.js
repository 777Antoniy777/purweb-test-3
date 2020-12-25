const slider = document.querySelector('.slider');
const sliderList = slider && slider.querySelector('.slider__list');
const prevButton = slider && slider.querySelector('.slider__buttons-wrapper button:first-child');
const nextButton = slider && slider.querySelector('.slider__buttons-wrapper button:last-child');
const sliderItems = slider && Array.from(slider.querySelectorAll('.slider__item'));
const sliderWidth = sliderItems.length * 100;
const slideWidth = 100 / sliderItems.length;
sliderList.style.width = `${sliderWidth}%`;
sliderList.style.transform = `translateX(-${slideWidth}%)`;

let slideIndex = 1;
let currentSlide = sliderItems[slideIndex];
let translateWidth = slideWidth;

const translateSlider = (button) => {
  let debounceCond;

  if (button === 'right') debounceCond = translateWidth < slideIndex * slideWidth;
  if (button === 'left') debounceCond = translateWidth > slideIndex * slideWidth;

  if (debounceCond) {
    return false;
  }

  if (currentSlide.classList.contains('clonned-item')) {
    if (button === 'right') slideIndex = slideIndex = 1;
    if (button === 'left') slideIndex = sliderItems.length - 2;
    translateWidth = slideWidth * slideIndex;
  }

  if (button === 'right') slideIndex = slideIndex + 1;
  if (button === 'left') slideIndex = slideIndex - 1;
  currentSlide = sliderItems[slideIndex];

  let timer = setInterval(() => {
    if (Math.abs(slideIndex * slideWidth - translateWidth) < 0.5) {
      translateWidth = slideIndex * slideWidth;
      sliderList.style.transform = `translateX(-${translateWidth}%)`;
      clearInterval(timer);

      return true;
    }

    if (button === 'right') translateWidth = translateWidth + 0.5;
    if (button === 'left') translateWidth = translateWidth - 0.5;
    sliderList.style.transform = `translateX(-${translateWidth}%)`;
  }, 10);
};

const handleNextButtonClick = (evt) => {
  evt.preventDefault();

  translateSlider('right');
};

const handlePrevButtonClick = (evt) => {
  evt.preventDefault();

  translateSlider('left');
};

nextButton.addEventListener('click', handleNextButtonClick);
prevButton.addEventListener('click', handlePrevButtonClick);
