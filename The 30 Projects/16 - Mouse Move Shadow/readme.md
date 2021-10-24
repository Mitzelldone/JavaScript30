# Mouse move based text shadow animation 🖱️
🟡**DEMO:** [HERE](https://mitzelldone.github.io/JavaScript30/The%2030%20Projects/16%20-%20Mouse%20Move%20Shadow/index.html)


![demo](https://github.com/Mitzelldone/JavaScript30/blob/main/The%2030%20Projects/images/16.demo.gif)
## HTML and CSS Explaination

### HTML

We have set the `contenteditable` attribute set on the `<h1>`, which means the user can edit the text contents of that element!

```HTML
<div class="hero">
  <h1 contenteditable>🍖Eat! Eat! Eat!</h1>
</div>
```

### CSS

- Iv'e add background wallpaper.
- You can change color values of the `text-shadow`.

```CSS
html {
	background: url("https://www.ghibli.jp/gallery/chihiro004.jpg") center
		no-repeat;
	background-size: cover;
}

h1 {
	text-shadow: 10px 10px 0 rgba(0.5, 0.5, 0.5, 0.4);
	font-size: 100px;
}

```

## JavaScript

**To get the text shadow to follow the cursor**

1. Add a `mousemove` event listener.
2. Extract the coordinates with respect to(wrt) window .
3. Map the coordinates to the displacement of the text shadow.
4. Update the text shadow.

### Adding the event listener

```JavaScript
const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');

function shadow(e) {
}

// tracking the mouse will only be done in the div.hero area
// (in this case it is the whole page though)
hero.addEventListener('mousemove', shadow);
```

### Extract the coordinates

- The event object's `pageX`, `pageY` properties give us the X, Y coordinates of the mouse wrt the page.
- But we need it wrt the hero element, so we use the `offsetX`, `offsetY` properties.
- The [offsetX property](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/offsetX) of the MouseEvent provides the offset in the X coordinate of the mouse pointer between that event and the padding edge of the target node.
- So incase we're hovering over `h1` and not `div.hero` we have to adjust the x, y values.

```JavaScript
function shadow(e) {
  let { offsetX: x, offsetY: y } = e;

  if (this !== e.target) {
    //adjusting the values if e.target is not div.hero
    // by adding relative position of e.target
    x = x + e.target.offsetLeft;
    y = y + e.target.offsetTop;
  }
}
```

### Map the coordinates to the displacement of the text shadow

Let us assume the range of the displacement of the text shadow to be max of 50px from the actual text.

```JavaScript
let range = 50 * 2 //50 px * 2

function shadow(e) {
  let { offsetX: x, offsetY: y } = e;
  if (this !== e.target) {
    x = x + e.target.offsetLeft;
    y = y + e.target.offsetTop;
  }

  // height and width of div.hero
  const { offsetWidth: width, offsetHeight: height } = hero;

  const xWalk = Math.round( (x/width * range)  - range/2 );
  const yWalk = Math.round( (y/height * range) - range/2 );
}
```

- `range` is defined to calculate the spacings between shadows. When the value is increase, the spacing will also increase.
- Mapping the range of width to current 'x' and 'y' to calculate the displacement.
- Example, when `x=0` the x displacement is `-50px` and if `x == width`, the x displacement is `50px.
- Calculate the stretch distance for the element's shadow on the x & y axis.
- `Console.log(xWalk,yWalk)` to see the offsets after calculating.

```JavaScript
// ES6
const { offsetWidth: width, offsetHeight: height } = hero;
let { offsetX: x, offsetY: y } = e;

// Normal
const width = hero.offsetWidth;
const height = hero.offsetHeight;
let x = e.offsetX;
let y = e.offsetY;
```

### Update the text shadow

Update the text shadow with `xWalk`, `yWalk`.

```JavaScript
text.style.textShadow = `
        ${xWalk}px ${yWalk}px 0 rgba(255,0,255,0.7),
        ${xWalk * -1}px ${yWalk}px 0 rgba(0,255,255,0.7),
        ${yWalk}px ${xWalk * -1}px 0 yellow,
        ${yWalk * -1}px ${xWalk}px 0 red
    `;
```
