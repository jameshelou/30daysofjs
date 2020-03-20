const images = document.querySelectorAll('img');

const debounce = (func, delay) => {
    let debounceTimer

    return function() {
      const context = this
      const args = arguments
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => func.apply(context, args), delay)
    }
}

function onScroll(e) {
  console.count(e);

  images.forEach(img => {
    const slideInAt = (window.scrollY + window.innerHeight) - (img.height / 2);
    const isAppearingOnScreen = slideInAt > img.offsetTop;
    const imageBottom = img.offsetTop + img.height;
    const isScrolledPast = (imageBottom) < window.scrollY;

    if (isAppearingOnScreen && !isScrolledPast) {
      img.classList.add('animate-in');
    } else {
      img.classList.remove('animate-in');
    }
  });
}

document.addEventListener('scroll', debounce(onScroll, 15));

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};