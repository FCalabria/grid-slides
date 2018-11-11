let slidesWrapper;
let lastSlideIndex;
const transitionClass = 'slide--transition';
window.onkeydown = (e) => {
  switch (e.key) {
    case 'ArrowRight':
      changeSlide(1);
      break;
    case 'ArrowLeft':
      changeSlide(-1);
      break;
    default:
      console.log(e.key);
  }
}

function getSlidesWrapper() {
  if (!slidesWrapper) {
     slidesWrapper = document.querySelector('.js-slides-wrapper');
  }
  return slidesWrapper;
}

function setLastSlideIndex() {
  const totalSlides = document.querySelectorAll('.js-slide').length;
  lastSlideIndex = totalSlides ? totalSlides - 1 : 0;
}

function translationToSlideIndex(t) {
  if (!t) return 0;
  return parseInt(t.match(/\d+/g)[0]) / 100;
}

function slideIndexToTranslation(s) {
  return s * -100 + 'vw';
}

function changeSlide(move) {
   const wrap = getSlidesWrapper();
   if (!wrap) throw('.js-slides-wrapper not found');
   if (lastSlideIndex === undefined) setLastSlideIndex();
   const currentSlide = translationToSlideIndex(getComputedStyle(wrap).getPropertyValue('--translationX'));
   let newSlide = currentSlide + move;
   if (newSlide < 0) {
     newSlide = 0;
   } else if (newSlide > lastSlideIndex) {
     newSlide = lastSlideIndex;
   }
   const newTranslation = slideIndexToTranslation(newSlide);
   wrap.style.setProperty('--translationX', newTranslation);
}