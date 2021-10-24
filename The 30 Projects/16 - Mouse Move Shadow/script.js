const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');
const walk = 300; //300px

function shadow(e) {
    // const width = hero.offsetWidth;
    // const height = hero.offsetHeight;
    const { offsetWidth: width, offsetHeight: height} = hero;
    
    // user cursor was
    let { offsetX: x, offsetY: y} = e;

    // console.log(this, e.target); try hover the woah
    if(this !==e.target) {
        x = x + e.target.offsetLeft;
        y = y + e.target.offsetTop;
    }

    // 300 is high as we go it 150, and low is -150
    const xWalk = Math.round(x / width * walk) - (walk / 2);
    const yWalk = Math.round(y / height * walk) - (walk / 2);
    // console.log(xWalk, yWalk);

    text.style.textShadow = `
        ${xWalk}px ${yWalk}px 0 rgba(255,0,255,0.7),
        ${xWalk * -1}px ${yWalk}px 0 rgba(0,255,255,0.7),
        ${yWalk}px ${xWalk * -1}px 0 yellow,
        ${yWalk * -1}px ${xWalk}px 0 red
    `;
}

hero.addEventListener('mousemove', shadow);