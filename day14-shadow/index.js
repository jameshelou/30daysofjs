const container = document.querySelector('.container');
const heading = document.querySelector('h1')

const debounce = (func, delay) => {
  let debounceTimer

  return function () {
    const context = this
    const args = arguments
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => func.apply(context, args), delay)
  }
}

const trackMouse = e => {
  let {clientX: x, clientY: y} = e;
  let {offsetWidth: w, offsetHeight: h} = container;

  let shadowX = (w/2 - x) / 10;
  let shadowY = (h/2 - y) / 10;
  heading.style.textShadow = `${shadowX}px ${shadowY}px 0px #000000`
}

container.addEventListener('mousemove', debounce(trackMouse, 1.8))