const inputs = document.querySelectorAll('.controls input');

function handleUpate() {
    const suffix =  this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix)
}

inputs.forEach(input => input.addEventListener('change',handleUpate));
inputs.forEach(input => input.addEventListener('mousemove',handleUpate));