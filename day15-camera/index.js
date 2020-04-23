const camera = document.querySelector('.camera');
const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const takePhotoBtn = document.querySelector('.controls__takePhoto');

function getCamera() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(stream => {
      camera.srcObject = stream;
      camera.play();
    })
    .catch(error => alert('Please enable access to use your webcam.'))
}

function paintToCanvas() {
  const [w, h] = [camera.videoWidth, camera.videoHeight]
  canvas.width = w;
  canvas.height = h;

  context.drawImage(camera, 0, 0, w, h);
  window.requestAnimationFrame(paintToCanvas);
}

function takePhoto() {
  const body = document.querySelector('body')
  body.classList.toggle('white')

  setTimeout(() => {
    const blob = canvas.toDataURL('image/jpeg');
    const output = document.createElement('a');
    output.innerHTML =
      `<div class="download">
        <img src="${blob}" alt="webcam photo" />
        <a download="photo" href="${blob}">💾⤵️</a>
      </div>`
    strip.insertBefore(output, strip.firstChild)
    body.classList.toggle('white')
  }, 1000)
}

getCamera();
window.requestAnimationFrame(paintToCanvas);

takePhotoBtn.addEventListener('click', takePhoto);
addStripScroll();

function addStripScroll() {
  let isDown = false;
  let startX;
  let scrollLeft;
  strip.addEventListener('mousedown', e => {
    startX = e.pageX;
    isDown = true;
    scrollLeft = strip.scrollLeft;
  });

  strip.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - startX) * 3;
    strip.scrollLeft = scrollLeft - walk;
  });

  strip.addEventListener('mouseup', () => {
    isDown = false
  });
  strip.addEventListener('mouseleave', () => {
    isDown = false
  });
}