# Whack a mole

Today we'll build whack a mole game from scratch in vanilla JS!

---

The HTML we have -

```HTML
<div class="game">
    <div class="hole hole1">
      <div class="mole"></div>
    </div>
    <div class="hole hole2">
      <div class="mole"></div>
    </div>
    ...
</div>
```

There are six holes in `div.game`. Each hole holds a mole (`div.mole`) and the dirt (`.hole:after`).

By default the mole is positioned `**absolute**` with 100% displacement from the top. Given that the hole has overflow to hidden, the mole isn't seen.

When the class `up` is added to the hole, then the mole transitions upm as top displacement now becomes 0px.

```css
.hole.up .mole {
	top: 0;
}
```

# JavaScript

The JS given to us -

```
const holes = document.querySelectorAll('.score');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
```

There are various moving parts to this game,

1. Random amount of time a mole should appear.
2. Random hole for a mole to appear.
3. Get the mole to come up and go down for a random amount of time.
4. When the game starts (run on click, for 10s) and loop.
5. Check for clicks on a mole, also update the score.

We'll be using `Math.random a lot, see the [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) for more.

The `Math.random()` function returns a floating-point, pseudo-random number in the range 0–1 (inclusive of 0, but not 1) with approximately uniform distribution over that range — which you can then scale to your desired range. The implementation selects the initial seed to the random number generation algorithm; it cannot be chosen or reset by the user.

## Random amount of time

```Javascript
function randomTime(min,max) {
    return Math.round(Math.random()* (max - min) + min);
}
```

Get a random amount of time between min and max time. The min and max represent milliseconds. You can adjust the speed of the mole to show up.

## Random hole

`randomHole()` return a random hole DOM element.

```
let lastHole;
function randomHole(holes) {
    const randomIndex = Math.floor(Math.random() * holes.length);
    const hole = holes[randomIndex];
    if (hole === lastHole) {
        console.log('duplicate hole');
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}
```

We pick random index between 0 and 5, that is the range of valid indices of holes array.

If the hole is the same as the last one picked, we just call the function again. If the `hole === lastHole` then re-execute the function again. We store the most recent hole chosen in the `lastHole` variable.

## Making the mole appear and disappear

`peep()` makes a mole appear and disappear for a random amount of time in a random hole.

```Javascript
function peep() {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
    }, time);
}
```

Once we pick the random time period ( between 200ms and 1s) and hole, we add the `up` class to the hole element, then register a callback to remove the `up` class after the given period of time.

## Starting the game loop

We start the game when the start button _(`<button onClick ="startGame()"> Start! </button>`)_ is clicked.

```Javascript
let timeUp = false;

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 10000);
}
```

The game runs for 10 seconds. `timeUp` keeps track whether the game is running. Score is reset to zero and peep() is called. Then a timeout is set to run at 10 seconds, which marks `timeUp` as true and stop the game.

Now, we need to make a tiny modification to the peep() function,

```Javascript
// In the setTimeout callback
hole.classList.remove('up');
if (!timeUp) peep();
```

`peep()` calls itself if the game is running.

## Scoring mechanism

The bonk() function tracks the hits and updates the score.

```Javascript
function bonk(e) {
    if(!e.isTrusted) return;
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));
```

- Each mole has a click event listener registered. The `bonk() is checks if the mouse click is trusted (i.e not scripted / automated in some way), and then updates the score and the score board.
