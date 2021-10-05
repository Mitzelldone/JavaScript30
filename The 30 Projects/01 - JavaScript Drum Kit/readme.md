# JavaScript Drum Kit🥁
### 👉PLAY THE DRUM [HERE](https://mitzelldone.github.io/JavaScript30/The%2030%20Projects/01%20-%20JavaScript%20Drum%20Kit/index.html)
![demo](../01%20-%20JavaScript%20Drum%20Kit/demo.PNG)

## Summary
- Key events
- Playing audio
- Transitionend event
- Dealing with animation
- Listen for animation and event
## Guide
#### 1. Add an event to our keys when they are pressed.
`window.addEventListener('keydown', playSound)`

Add an event listener to the entire window object that is listening for a `keydown` event; the function that we will  provide as the *callback* will be defined next.

  - `playSound()` is a listener for `keydown` events registered using `window.addEventListener`.
  - `window` is the global object in a browser, or the root object of the DOM.

#### 2.  Create a function with the name that you decided on in step 1 which is `playSound`.
```
function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  if(!audio) return;
  
  key.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
}

```
The function should accept one parameter, the *event* which the function is going to handle.
In the body of the function, declare and define two variables that will reference the `div` and `audio` elements that correspond with the keypress which triggered the function (if such elements exist).
  - `keyCode` property is the *KEY* to connect our buttons(`<div>`s) and sounds(`<audio>`s).
  - `keyCode` 's value is same as `ASCII` code (in lowercase letter ), check keycodes [here](http://keycode.info/).
  - `data-key` is set for mapping buttons and audios to get the `keyCode`s via `keydown` event.
  - the whole `querySelector` expression has to be in backticks (`).
  - `${}` is syntactic sugar for template literals, read more about `Expression interpolation` [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).
  - `document` stands for DOM.
  - `if(!audio) return;` stop the function from running all together.

**About playing sounds**

How do we prevent delay playing sound, if we keep hitting a key?
  - just add `audio.currentTime = 0;` before `audio.play();`
  - `audio.currentTime = 0` rewind to the start.

#### 3.  Transitionend Event
### Toggling styles

- use `item.classList.add('className')` to add class when key pressed. (same as `element.addClass('className')` in jQuery)

- use `transitionend` event to remove `play` class. since we want to just remove `transform` property, so add a condition to skip others.

```
if(e.propertyName != 'transform') return;
this.classList.remove('playing'); // `event.target.classList.remove('playing');`
```

### forEach and Arrow function

- `items.forEach()` instead of just `forEach`, which means it's a property of an array.

- Arrow functions is ES6 syntax,

```
keys.forEach(key => key.addEventListener());
