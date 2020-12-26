const slider = document.querySelector('.slider');
const sliderList = slider && slider.querySelector('.slider__list');
const prevButton = slider && slider.querySelector('.slider__control-wrapper button:first-child');
const nextButton = slider && slider.querySelector('.slider__control-wrapper button:last-child');
const sliderItems = slider && Array.from(slider.querySelectorAll('.slider__item'));
const navItemList = slider && slider.querySelector('.slider__nav-list');
const navItems = navItemList && navItemList.querySelectorAll('.slider__nav-item');
const sliderWidth = sliderItems.length * 100;
const slideWidth = 100 / sliderItems.length;
sliderList.style.width = `${sliderWidth}%`;
sliderList.style.transform = `translateX(-${slideWidth}%)`;

let slideIndex = 1;
let prevSlideIndex = null;
let currentSlide = sliderItems[slideIndex];
let translateWidth = slideWidth;

const translateSlider = (button) => {
  let debounceCond;

  if (button === 'right') debounceCond = translateWidth < slideIndex * slideWidth;
  if (button === 'left') debounceCond = translateWidth > slideIndex * slideWidth;

  if (debounceCond) return false;

  if (currentSlide.classList.contains('clonned-item')) {
    const cloneType = currentSlide.dataset.clone;

    if (button === 'right' && cloneType === 'last') slideIndex = 1;
    if (button === 'left' && cloneType === 'first') slideIndex = sliderItems.length - 2;
    translateWidth = slideWidth * slideIndex;
  }

  if (button === 'right') slideIndex = slideIndex + 1;
  if (button === 'left') slideIndex = slideIndex - 1;
  currentSlide = sliderItems[slideIndex];

  navItems.forEach((elem, i) => {
    elem.classList.remove('nav-item-active');

    if (i + 1 === slideIndex) elem.classList.add('nav-item-active');
  });

  if (slideIndex === 0) {
    navItems[navItems.length - 1].classList.add('nav-item-active');
  }

  if (slideIndex === sliderItems.length - 1) {
    navItems[0].classList.add('nav-item-active');
  }

  // set animation
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

const handleListClick = (evt) => {
  const target = evt.target;
  const isButton = target.closest('button');
  let debounceCond;

  if (isButton) {
    if (prevSlideIndex < slideIndex) debounceCond = translateWidth < slideIndex * slideWidth;
    if (prevSlideIndex > slideIndex) debounceCond = translateWidth > slideIndex * slideWidth;

    if (debounceCond) return false;

    prevSlideIndex = slideIndex;
    slideIndex = +isButton.dataset.item;
    currentSlide = sliderItems[slideIndex];

    navItems.forEach((elem, i) => {
      elem.classList.remove('nav-item-active');

      if (i + 1 === slideIndex) elem.classList.add('nav-item-active');
    });

    // set animation
    let timer = setInterval(() => {
      if (Math.abs(slideIndex * slideWidth - translateWidth) < 0.5) {
        translateWidth = slideIndex * slideWidth;
        sliderList.style.transform = `translateX(-${translateWidth}%)`;
        clearInterval(timer);

        return true;
      }

      if (prevSlideIndex < slideIndex) {
        translateWidth = translateWidth + 0.5;
      } else {
        translateWidth = translateWidth - 0.5;
      }
      sliderList.style.transform = `translateX(-${translateWidth}%)`;
    }, 10);
  }
};

nextButton.addEventListener('click', handleNextButtonClick);
prevButton.addEventListener('click', handlePrevButtonClick);
navItemList.addEventListener('click', handleListClick);
