# Countdown timer

---

All the HTML and CSS is already given to us,

```HTML
<div class="timer">
  <div class="timer__controls">
    <button data-time="20" class="timer__button">20 Secs</button>
    ...
    <form name="customForm" id="custom">
      <input type="text" name="minutes" placeholder="Enter Minutes">
    </form>
  </div>
  <div class="display">
    <h1 class="display__time-left"></h1>
    <p class="display__end-time"></p>
  </div>
</div>
```

- `div.timer__controls` Holds all the buttons and the form for custom entering the minutes.
- The `data-time` attribute hold the time in seconds that the corresponding button sets.
- `h1.display_time-left` is the countdowm display.
- `p.display__end-time` displays the end time when the count down will run out.

## Javascript

```Javascript
// Handles to displays and controls.
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

let countdown; // This is the return value if setInterval.

function timer(seconds) {
  // Clear any existing timers.
  clearInterval(countdown);

  const now = Date.now();
  // Convert seconds to milliseconds.
  const then = now + (seconds * 1000);
  displayTimeLeft(seconds);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // Check if we should stop the countdown.
    if(secondsLeft < 0) clearInterval(countdown);
    // Else display secondsLeft.
    else displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  //display logic
}
```

- `clearInterval(countdown)` When start a timer, clear existing timers.
- `const now = Date.now()` Will get us current `timestamp` in millisecond.

The `timer(seconds)` function sets a timer for `sec` seconds. `now` is the time (in milliseconds) when the timer is being set, `then` is the time when the timer run out.

We have a `setInterval` which is supposed to run every second, even if the callback is missed. There will be **no issues** since we're calculating the seconds left using the final time: `Math.round((then - Date.now()) / 1000).

We call `displayTimeLeft` function with the initial number of seconds in timer(), then it is called in the `setInterval` callback to display `secondsLeft`.

Once the `secondsLeft` gets lesser than zero, the interval is cleared.

### `displayTimeLeft(seconds)` - The seconds left display logic.

```Javascript
function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}
```

From the `seconds`, extract the whole minutes, then find the _reminder_ seconds. In the display we check if `remainderSeconds` si a single digit, if yes we _pad_ it with a extra '0'. We then update the `h1.display__time-left` and the little of the page with `display`. The tile of the page is displayed in the browser tab area.

### `displayEndTime()` just under the count down timer display.

```Javascript
// in timer()
displayEndTime(then)

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

```

- `displayEndTime()` gets the end time. We extract the hour, convert it to 12 hour format instead of 24-hours.
- Get the minutes, again if it is in single digits, pad it with an extra zero.
- Then, display the result in `p.display__end-time`.

### `startTimer()` Now to get the user input to set the timer.

For each of the buttons we get the necessary time from `data-time` attribute and make a call to `timer()`.

```Javascript
function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
```

#### The form

The form component is a bit more involved. We listen to when the user 'submits' the form, i.e. type the number and press enter.

```Javascript
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});
```

[NOTICE] we can directly select as document.elementName if an element has a name attribute in the DOM of HTML (in this case is document.customForm, the customForm is a name attribute of <form> element)

We prevent the default action, get the value (represents minutes) from the text input and then call the timer. We then reset the form to empty the text field.

`this.reset()` Clear form input value.
