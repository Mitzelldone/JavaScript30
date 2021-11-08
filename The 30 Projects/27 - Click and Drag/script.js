const slider = document.querySelector('.items'); //white div
let isDown = false; // Flag variable, clicking or not
let startX;
let scroolLeft;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active')
});

slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active')
});


slider.addEventListener('mousemove', (e) => {
    if(!isDown) return; // stop the fn from running
    e.preventDefault(); // will stop any selecting of text that's inside of there or any of the sliding to the left.
    const x = e.pageX - slider.offsetLeft; //recalculate every single time we move the mouse.

    console.log({x, startX});
    const walk = (x - startX)*3; // Every pixel moved,you're gonna scroll the slider 3 pixels.
    slider.scrollLeft = scrollLeft - walk;
});

