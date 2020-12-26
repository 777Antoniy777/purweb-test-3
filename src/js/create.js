const slideTemplate = document.querySelector('#slide-item');
const navItemTemplate = document.querySelector('#nav-item');
const slideTemplateContent = slideTemplate.content;
const navItemTemplateContent = navItemTemplate.content;
const slider = document.querySelector('.slider');
const sliderList = slider && slider.querySelector('.slider__list');
const navItemList = slider && slider.querySelector('.slider__nav-list');

const createSlides = () => {
  const slidesAmount = sliderList.dataset.amount;
  const colors = sliderList.dataset.color;
  const colorValues = colors.split(', ');

  for (let i = 0; i < slidesAmount; i++) {
    const slide = slideTemplateContent.cloneNode(true);
    const li = slide.children[0];
    const span = li.children[0];
    const spanValue = i + 1;

    li.style.backgroundColor = colorValues[i];
    span.textContent = `${spanValue}`;

    if (!colorValues[i]) li.style.backgroundColor = 'black';
    if (i === 0) li.classList.add('active-slide');

    sliderList.append(li);
  }
};

const createClonnedSlides = () => {
  const sliderItems = slider && slider.querySelectorAll('.slider__item');
  const firstSlide = sliderItems[0].cloneNode(true);
  const lastSlide = sliderItems[sliderItems.length - 1].cloneNode(true);

  firstSlide.classList.add('clonned-item');
  lastSlide.classList.add('clonned-item');
  firstSlide.dataset.clone = 'last';
  lastSlide.dataset.clone = 'first';
  sliderList.prepend(lastSlide);
  sliderList.append(firstSlide);
};

const createNavItems = () => {
  const slidesAmount = sliderList.dataset.amount;

  for (let i = 0; i < slidesAmount; i++) {
    const navItem = navItemTemplateContent.cloneNode(true);
    const li = navItem.children[0];
    const button = li.children[0];
    const slideNumber = i + 1;

    button.ariaLabel = `Slide ${slideNumber}`;
    button.dataset.item = `${slideNumber}`;

    if (i === 0) li.classList.add('nav-item-active');

    navItemList.append(li);
  }
};

if (slideTemplate) {
  createSlides();
  createClonnedSlides();
}

if (navItemTemplate) {
  createNavItems();
}
