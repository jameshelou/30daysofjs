const hourHands = document.querySelectorAll('div.hand.hour');
const minHands = document.querySelectorAll('div.hand.min');
const secHands = document.querySelectorAll('div.hand.sec');

function setDate() {
    let time = new Date();
    // let perth = new Date().toLocaleString("en-US", {timeZone: "Australia/Perth"});
    console.log(time.getSeconds())
    // skip last second to avoid weird animation
    if (time.getSeconds() === 0) {
        secHands[0].classList.remove('secTransition');
    }
    
    if (time.getSeconds() === 1) {
        secHands[0].classList.add('secTransition');
    }

    let secDegrees = (time.getSeconds() / 60) * 360 + 90;
    secHands.forEach(sec => {
        sec.style["transform"] = `rotate(${secDegrees}deg)`;
    })

    let minDegrees = (time.getMinutes() / 60) * 360 + 90;
    minHands.forEach(min => {
        min.style["transform"] = `rotate(${minDegrees}deg)`;
    })

    let realHours = Number(String(time.getHours()) + "." + Math.round(((1 / 60) * time.getMinutes() * 100), 2));
    let hourDegrees = ((realHours / 12) * 360 + 90);
    hourHands.forEach(hour => {
        hour.style["transform"] = `rotate(${hourDegrees}deg)`;
    });

}

setDate();

setInterval(setDate, 1000)