const inputs = document.querySelectorAll('input');

function updateHandler() {
    const units = this.dataset.units || '';
    document.documentElement.style.setProperty(`--${this.name}`, this.value + units);
}

inputs.forEach(i => {
    i.addEventListener('input', updateHandler);
})