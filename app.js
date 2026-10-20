const slides = [
  { src: 'assets/hero-main.webp', fallback: 'assets/hero-main.jpg', alt: 'Бургер Телецбург крупным планом' },
  { src: 'assets/hero-alt.webp', fallback: 'assets/hero-alt.jpg', alt: 'Бургер с сыром и начинкой на исходной странице Телецбурга' },
];

let activeSlide = 0;
const image = document.querySelector('#hero-photo');
const heroVisual = document.querySelector('#hero-visual');
const slideNumber = document.querySelector('#slide-current');
let transitionTimer;

function setSlideImage(slide) {
  if (!image) return;
  image.onerror = () => {
    if (image.dataset.fallback && image.src.endsWith(image.dataset.fallback) === false) {
      image.src = image.dataset.fallback;
    }
  };
  image.dataset.fallback = slide.fallback;
  image.src = slide.src;
  image.alt = slide.alt;
}

function showSlide(nextIndex) {
  activeSlide = (nextIndex + slides.length) % slides.length;
  heroVisual?.classList.add('is-changing');
  window.clearTimeout(transitionTimer);
  transitionTimer = window.setTimeout(() => {
    setSlideImage(slides[activeSlide]);
    if (slideNumber) slideNumber.textContent = String(activeSlide + 1).padStart(2, '0');
    window.requestAnimationFrame(() => heroVisual?.classList.remove('is-changing'));
  }, 170);
}

document.querySelector('#photo-next')?.addEventListener('click', () => showSlide(activeSlide + 1));
document.querySelector('#photo-prev')?.addEventListener('click', () => showSlide(activeSlide - 1));

const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
  if (mobileNav) mobileNav.hidden = !isOpen;
});

mobileNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.hidden = true;
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Открыть меню');
  });
});
