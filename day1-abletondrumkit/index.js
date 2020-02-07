const DRUM_COLORS = ['#e1f2fb', '#f1f9f9', '#f7c5a8', '#ccedd2'];
const BG_COLORS = ['#ff7c7c', '#f64b3c', '#192965', '#94fc13', '#7cdfff', '#fcf9f9']

let drums = document.querySelectorAll('div .drum');
drums.forEach(drum => {
    drum.style['background-color'] = DRUM_COLORS[Math.floor(Math.random() * 4)];
})

window.addEventListener('keydown', e => playDrums(e));
drums.forEach(drum => {
    drum.addEventListener('mousedown', e => playDrums(e));
})

window.addEventListener('keyup', e => onReleaseDrums(e));
drums.forEach(drum => {
    drum.addEventListener('mouseup', e => onReleaseDrums(e));
})

function playDrums(e) {
    let keyCode;
    if (e.keyCode) {
        keyCode = e.keyCode;
    } else {
        keyCode = e.target.attributes['data-key'].value;
    }

    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);

    if (!audio) {
        return;
    }

    audio.currentTime = 0;
    audio.play();
    const tile = document.querySelector(`div[data-key="${keyCode}"]`);
    tile.classList.add('played');
    document.querySelector('body').style['background-color'] = BG_COLORS[Math.floor(Math.random() * 4)];
}

function onReleaseDrums(e) {
    let keyCode;
    if (e.keyCode) {
        keyCode = e.keyCode;
    } else {
        keyCode = e.target.attributes['data-key'].value;
    }
    const tile = document.querySelector(`div[data-key="${keyCode}"]`);

    if (!tile) {
        return;
    }

    tile.classList.remove('played');
}