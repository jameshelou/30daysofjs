let WORK_MINUTES = 25; //0.05 for test
let WORK_SECONDS = WORK_MINUTES * 60;
let BREAK_MINUTES = 5; // 0.01 for test
let BREAK_SECONDS = BREAK_MINUTES * 60;
let timer = document.querySelector('.timer');
let timeLeft;
let intervalId;
let inTimerState = false;
let currentPomodoro = 0;
let history = [
    {
        workStateDone: false,
        breakStateDone: false
    }
]

setupTimer();
resetTimerUi();
drawPomodoroSession();

document.querySelector('.timerarea').addEventListener('click', () => {
    if (!inTimerState) {
        setupTimer();
        resetTimerUi();
        drawToggleUi();
        timerStart();
    }
});

function timerStart() {
    inTimerState = true;
    intervalId = window.setInterval(timerHandler, 1000);
}

function timerHandler() {
    timeLeft = timeLeft - 1;

    timer.textContent = getFormattedTimerString();

    if (timeLeft === 0) {
        timerDone();
    }
}

function timerDone() {
    inTimerState = false;
    clearInterval(intervalId);
    drawToggleUi();
    updateState();
}

function updateState() {
    console.log(history);
    if (!history[currentPomodoro].workStateDone && !history[currentPomodoro].breakStateDone) {
        history[currentPomodoro].workStateDone = true;
    } else if (history[currentPomodoro].workStateDone && !history[currentPomodoro].breakStateDone) {
        history[currentPomodoro].breakStateDone = true;
    }

    let sessionPart = document.createElement('div');
    if (history[currentPomodoro].workStateDone && !history[currentPomodoro].breakStateDone) {
        sessionPart.classList.add('work');
    } else {
        sessionPart.classList.add('break');
    }
    document.getElementsByClassName('pomodoroSession')[currentPomodoro].appendChild(sessionPart);

    if (history[currentPomodoro].workStateDone && history[currentPomodoro].breakStateDone) {
        currentPomodoro++;
        history.push({
            workStateDone: false,
            breakStateDone: false
        });
    }

    drawPomodoroSession();
}

function drawPomodoroSession() {
    if (!history[currentPomodoro].workStateDone && !history[currentPomodoro].breakStateDone) {
        let sessionContainer = document.createElement('div');
        document.querySelector('.progress').appendChild(sessionContainer).classList.add('pomodoroSession')
    }
}

function setupTimer() {
    if (!history[currentPomodoro].workStateDone) {
        console.log('work state')
        timeLeft = WORK_SECONDS;
    } else if (history[currentPomodoro].workStateDone && !history[currentPomodoro].breakStateDone) {
        console.log('break state')
        timeLeft = BREAK_SECONDS;
    }
}

function resetTimerUi() {
    timer.textContent = getFormattedTimerString();
}

function drawToggleUi() {
    document.querySelector('.instruction').classList.toggle('instruction--hidden');
}

function getFormattedTimerString() {
    let minutes, seconds;
    let minutesResult = Math.floor(timeLeft / 60);
    if (minutesResult === 0) {
        minutes = "";
    } else {
        minutes = String(minutesResult);
    }

    let secondsResult = Math.floor(timeLeft % 60)
    if (secondsResult < 10 && minutesResult === 0) {
        seconds = secondsResult;
    } else if (secondsResult < 10) {
        seconds = "0" + String(secondsResult);
    } else {
        seconds = String(secondsResult);
    }
    
    if (minutesResult === 0) {
        return seconds;
    } else {
        return minutes + ":" + seconds;
    }
}