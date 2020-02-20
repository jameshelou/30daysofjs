const listItems = document.querySelectorAll('.listItem');
const cancel = document.querySelector('.cancel');
let firstSelect = null;
let secondSelect = null;

document.addEventListener('keydown', e => {
    if (e.shiftKey && firstSelect) firstSelect.classList.add('listItem--firstSelect');
});

document.addEventListener('keyup', e => {
    if (e.keyCode === 16 && firstSelect) firstSelect.classList.remove('listItem--firstSelect');
});

cancel.addEventListener('click', () => {
    listItems.forEach(item => {
        item.classList.remove('listItem--selected');
    });
    checkSelection();
});

checkSelection();

listItems.forEach(item => {
    item.addEventListener("click", e => {
        if ((e.shiftKey && firstSelect) && e.target !== firstSelect) {
            handleMultipleSelect(e);
        } else {
            firstSelect = e.target;
        }

        e.target.classList.toggle('listItem--selected');
        checkSelection();
    });
});

function handleMultipleSelect(e) {
    secondSelect = e.target;

    let inRange = false;
    listItems.forEach(item => {
        if (item === firstSelect || item === secondSelect) {
            inRange = !inRange;
        }

        if (inRange) {
            if (item !== firstSelect) item.classList.toggle('listItem--selected');
            if (item === secondSelect) item.classList.toggle('listItem--selected');
        }
    });

    cleanSelection();
}

function cleanSelection() {
    firstSelect.classList.remove('listItem--firstSelect');
    firstSelect = null;
    secondSelect = null;
}

function checkSelection() {
    if (document.querySelectorAll('.listItem--selected').length === 0) {
        cancel.style.display = 'none';
    } else {
        cancel.style.display = 'inline-flex';
    }
}