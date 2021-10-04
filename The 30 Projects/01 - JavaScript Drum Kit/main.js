
 function removeTransition(e) {
    if (e.propertyName !== 'transform') return; // skip it if it's not a transform
    e.target.classList.remove('playing');
}

function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    if(!audio) return; //stop the function from running all together
   
    audio.currentTime = 0; // rewind to the start
    audio.play();
    key.classList.add('playing');
}

const keys = Array.from(document.querySelectorAll('.keys'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);



