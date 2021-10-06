# JS and CSS Clock 🕑 
👉 **DEMO:** [HERE](https://mitzelldone.github.io/JavaScript30/The%2030%20Projects/02%20-%20JS%20and%20CSS%20Clock/index.html)
## Task
**Given a web page with an analog clock created with CSS, write the JavaScript necessary to make the clock functional. Make alterations to the CSS as necessary.**
![starting](../02%20-%20JS%20and%20CSS%20Clock/images/img2.PNG)
## Guide
**Steps:**
### Initialize pointer positions and rotation along the x-axis in CSS

```
transform-origin: 100%;
transform: rotate(90deg);
transition: all 0.05s;
transition-timing-function: cubic-bezier(0.1, 2.7, 0.58, 1);
```

### CSS
    1.  Set the `transform-origin` CSS property of the `.hand` class to `100%`; 
               
    1. The hands are all laying flat; we need them to be vertical. Rotate all of the
        hands by 90 degrees so that they are upright by giving the `.hand` class a
        `transform` rule with the value `rotate(90deg)`.
        
    ![demo](../02%20-%20JS%20and%20CSS%20Clock/images/transform.gif)
    
    1. Set the `transition` CSS property of `.hand` to `all 0.05s`; this tells the browser
        to gradually apply any changes to the element's styling over a 0.05 second period.

    1. Set the `transition-timing-function` CSS property of `.hand` to whatever function
        you prefer, or define your own using the `cubic-bezier()` property value.

### JavaScript

```
const secondHand = document.querySelector('.second-hand');
function setDate() {
    const now = new Date();
    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`; 
}
setInterval(setDate, 1000);
```

- Declare & define variables for each clock hand and reference the corresponding HTML element.
  example: `const secondHand = document.querySelector('.second-hand')` 
- `setInterval` function runs a function passed to it every interval specified which to implement the second pointer's rotating effect.

- create `Date()` to get `now.getSeconds()`, `now.getMinutes()` and `now.getHours()`.

- `const secondDegrees = ((seconds / 60) * 360) + 90;` -calculating angles of pointers for second-hand.
    (the initial state of pointers are 90 degrees)
-  `  secondHand.style.transform = `rotate(${secondsDegrees}deg)``Apply rotation to the clock hands corresponding with current time value
#### Glitch fix

Due to there is a glitch that occurs at every 0th second and our transition is set at 0.05s. When hand transition from final state to initial state, because the number of degrees reduce, the hand makes a (reverse) anti-clockwise motion to reach the 0 degree mark, so we'll see it occurs.

To bypass it, we remove the `transition` property at the specified degrees (where glitch occurs) via JavaScript.

```
if (secondsDegrees === 90) secondHand.style.transition = 'all 0s';
else secondHand.style.transition = 'all 0.05s';

if (minsDegrees === 90) minHand.style.transition = 'all 0s';
else minHand.style.transition = 'all 0.1s';


