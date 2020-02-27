const desiredSequence = 'aabbcc';
document.querySelector('#desiredSequence').textContent = `Desired key sequence is: ${desiredSequence}`;
let userSequence = [];
let counter = 0;

document.addEventListener('keyup', e => {
    userSequence.push(e.key);
    checkSequence();
});

function checkSequence() {
    const userInput = userSequence.join('');

    if (counter === desiredSequence.length - 1) {
        alert('correct code!');
        reset();
    } else if (userInput[counter] === desiredSequence[counter]) {
        counter++;
    } else {
        reset();
    }
}

function reset() {
    userSequence = [];
    counter = 0;
}