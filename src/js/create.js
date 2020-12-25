const template = document.querySelector('#slide-item').content;
const slider = document.querySelector('.slider');
const sliderList = slider && slider.querySelector('.slider__list');

const createSlides = () => {
  const slidesAmount = sliderList.dataset.amount;
  const colors = sliderList.dataset.color;
  const colorValues = colors.split(', ');

  for (let i = 0; i < slidesAmount; i++) {
    const slide = template.cloneNode(true);
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
  sliderList.prepend(lastSlide);
  sliderList.append(firstSlide);
};

if (template) {
  createSlides();
  createClonnedSlides();
}
