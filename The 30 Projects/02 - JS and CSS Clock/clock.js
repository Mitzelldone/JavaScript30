
const secondHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

function setDate() {
  const now = new Date();

  const seconds = now.getSeconds();
  const secondsDegrees = ((seconds / 60) * 360) + 90;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`; // Apply rotation to the clock hands corresponding with current time value

  const mins = now.getMinutes();
  const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
  minsHand.style.transform = `rotate(${minsDegrees}deg)`;

  const hour = now.getHours();
  const hourDegrees = ((hour / 12) * 360) + ((mins/60)*30) + 90;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    
  // remove glitch.
  if (secondsDegrees === 90) {
    secondHand.style.transition = 'all 0s';
  }else secondHand.style.transition = 'all 0.05s';

  if (minsDegrees === 90) { minHand.style.transition = 'all 0s';
  }else minHand.style.transition = 'all 0.1s';

}
//run every second
setInterval(setDate, 1000);
