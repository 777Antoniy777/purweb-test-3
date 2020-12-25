// const template = document.querySelector('#slide-item').content;
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

const translateSlider = () => {
  translateWidth = translateWidth + 0.5;
  sliderList.style.transform = `translateX(-${translateWidth}%)`;
}

// const handleNextButtonClick = (evt) => {
//   evt.preventDefault();

//   if (translateWidth < slideIndex * slideWidth) {
//     return false;
//   }

//   if (currentSlide.classList.contains('clonned-item')) {
//     slideIndex = 1;
//     translateWidth = slideWidth;
//   }

//   slideIndex = slideIndex + 1;
//   currentSlide = sliderItems[slideIndex];

//   let timer = setInterval(() => {
//     if (slideIndex * slideWidth - translateWidth < 0.5) {
//       translateWidth = slideIndex * slideWidth;
//       sliderList.style.transform = `translateX(-${translateWidth}%)`;
//       clearInterval(timer);

//       return true;
//     }

//     translateSlider();
//   }, 10);
// };

const handlePrevButtonClick = (evt) => {
  evt.preventDefault();

  if (translateWidth > slideIndex * slideWidth) {
    return false;
  }

  if (currentSlide.classList.contains('clonned-item')) {
    slideIndex = sliderItems.length - 2;
    translateWidth = slideWidth * slideIndex;
  }

  slideIndex = slideIndex - 1;
  currentSlide = sliderItems[slideIndex];

  let timer = setInterval(() => {
    if (Math.abs(slideIndex * slideWidth - translateWidth) < 0.5) {
      translateWidth = slideIndex * slideWidth;
      sliderList.style.transform = `translateX(-${translateWidth}%)`;
      clearInterval(timer);

      return true;
    }

    translateWidth = translateWidth - 0.5;
    sliderList.style.transform = `translateX(-${translateWidth}%)`;
  }, 100);
};

// nextButton.addEventListener('click', handleNextButtonClick);
prevButton.addEventListener('click', handlePrevButtonClick);
