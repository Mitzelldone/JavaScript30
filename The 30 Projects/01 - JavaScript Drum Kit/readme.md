# JavaScript Drum Kit🥁
### 👉PLAY THE DRUM [HERE](https://mitzelldone.github.io/JavaScript30/The%2030%20Projects/01%20-%20JavaScript%20Drum%20Kit/index.html)
![demo](../01%20-%20JavaScript%20Drum%20Kit/demo.PNG)

## Summary
- Key events
- Playing audio
- Transitionend event
- Dealing with animation
- Listen for animation end event
## Note
We are provided with the HTML, CSS, and sound clips necessary to create this
  page/application. Let's go over the provided files and look at the pieces
  that we can utilize to fulfill the requirements:

- HTML `data-*` attributes: Introduced in HTML5, `data-*` attributes (where * can
    be anything you want) allow us to store _custom data_ on any HTML element. Each
    `div.key` (`<div class="key" data-key="...">`) and `audio` element in the 
    provided HTML file has a `data-key` attribute which corresponds with a keyboard button.

- CSS `playing` class & pre-defined style: The provided CSS file already has a `playing`
    class defined with some rules in it. We will apply this class to the correct
    element, depending on the key pressed by the user, and remove it once animation
    is finished.

And that's...pretty much all we should need from the HTML & CSS files. We can use
  the `data-key` attributes to match up the correct audio clip with the div element,
  and we can use the `playing` class to add that temporary highlight/border.
 ### Steps: 
#### 1. Add an event to our keys when they are pressed.
`window.addEventListener('keydown', playSound)`

Add an event listener to the entire window object that is listening for a `keydown` event; the function that we will  provide as the *callback* will be defined next.

  - `playSound()` is a listener for `keydown` events registered using `window.addEventListener`.
  - `window` is the global object in a browser, or the root object of the DOM.

#### 2.  Create a function with the name that you decided on in step 1 which is `playSound`.
```Javascript
function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  if(!audio) return;
  
  audio.currentTime = 0;
  audio.play();
  key.classList.add('playing');
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
  - `key.classList.add('playing')` for animation(transition).
#### 3. Declare & define a variable which will reference all the HTML elements on our page with a class `key`.
```
const keys = document.querySelectorAll('.keys');
```

#### 4. Iterate through the HTML elements and add an _event listener_ to each one that will fire on the `transitionend` event. Provide another function (name of your choice) as the second argument which will be responsible for **removing** the `playing` class.
  ```
  keys.forEach(key => key.addEventListener('transitionend', removeTransition));
  ```
- `items.forEach()` instead of just `forEach`, which means it's a property of an array.

- `=>` is ES6 syntax.

#### 5.  Transitionend Event
use `item.classList.add('className')` to add class when key pressed. In our case, `key.classList.add('playing')`.
  
use `transitionend` event to remove `play` class. since we want to just remove `transform` property, so add a condition to skip others.
```Javascript
function removeTransition(e) {
   if (e.propertyName !== 'transform') return; // skip it if it's not a transform
   e.target.classList.remove('playing');
}
```


