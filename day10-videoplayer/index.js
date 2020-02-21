// Get elements
const player = document.querySelector('.player');
const video = player.querySelector('video');
const timeline = player.querySelector('.timeline');
const progress = player.querySelector('.progress');
const playButton = player.querySelector('.playButton');
const speedButton = player.querySelector('.speedButton');
const volumeSlider = player.querySelector('.volumeSlider');
const supportedSpeed = [1, 1.25, 1.5, 1.75, 2, 0.25, 0.5, 0.75];
let currSpeed = 0;
const time = player.querySelector('.time');

// Video player functions
function playVideo() {
    if (video.paused) {
        video.play();
        playButton.innerHTML = '<i class="material-icons">pause</i>';
    } else {
        video.pause();
        playButton.innerHTML = '<i class="material-icons">play_arrow</i>';
    }
}

function skipVideo(e) {
    switch (e.keyCode) {
        case 32:
            playVideo();
            break;
        case 37:
            video.currentTime -= 5;
            break;
        case 39:
            video.currentTime += 5;
            break;
        default:
            return;
    }
}

function handleSliderChange() {
    video[this.name] = this.value;
}

function handleSpeedChange() {
    currSpeed += 1;
    video[this.name] = supportedSpeed[(currSpeed) % supportedSpeed.length];
    speedButton.textContent = supportedSpeed[(currSpeed) % supportedSpeed.length];
}

function handleProgressChange() {
    progress.style.width = `${(video.currentTime / video.duration) * 100}%`;
}

function handleScrub(e) {
    const percent = (e.offsetX / timeline.offsetWidth) * video.duration;
    video.currentTime = percent;
}

function handleDragScrub() {
    this.onmousemove = e => {
        handleScrub(e)
    }
}

function cancelDragScrub() {
    timeline.onmousemove = null;
}

function updateTime() {
    let t = video.currentTime;
    let s = Math.round(t % 60);
    s < 10 ? s = '0' + String(s) : s = s;
    time.textContent = `${Math.floor(t / 60)}:${s}`;
}


// Hook up listeners
video.addEventListener('click', playVideo);
playButton.addEventListener('click', playVideo);
volumeSlider.addEventListener('input', handleSliderChange);
speedButton.addEventListener('click', handleSpeedChange);
video.addEventListener('timeupdate', handleProgressChange);
video.addEventListener('timeupdate', updateTime);

timeline.addEventListener('click', handleScrub);
timeline.addEventListener('mousedown', handleDragScrub);
document.addEventListener('mouseup', cancelDragScrub);

// video keyboard controls
document.addEventListener('keydown', skipVideo);