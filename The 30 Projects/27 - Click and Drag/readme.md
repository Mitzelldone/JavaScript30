# Click and Drag to Scroll
🟡**DEMO:** [HERE](https://mitzelldone.github.io/JavaScript30/The%2030%20Projects/27%20-%20Click%20and%20Drag/index.html)
![demo](https://github.com/Mitzelldone/JavaScript30/blob/main/The%2030%20Projects/images/27.demo.gif)
Today we make a pretty neat click and drag to scroll interface and you will learn a whole lot about JavaScript events!

---

We'll be scrolling horizontally the `div.items` list

```Javascript
<div class="items">
    <div class="item item1">01</div>
    <div class="item item2">02</div>
    ...
</div>
```

## Javascript

Steps to reach our desired effect -

1. Detect mouse events.
2. Get initial data (is clicked, initial x, initial Y scroll).
3. Track drag and Update the scroll position.

### 1. Detect mouse events.

We want to detect the drag only on the items div.

- `mousedown` we detect the click.
- `mouseup` to detect the release of the click.
- We only want to detect `mousemove` when the mouse has been clicked inside `div.items`.
- `mouseleave` - So when the user moves out of the items div, we set `isDown` to false.

```Javascript
const slider = document.querySelector('.items');
// isDown checks if we have an active click
let isDown = false;

slider.addEventListener('mousedown', (e) => {
  console.log('mousedown')
  let isDown = true
  slider.classList.add('active')
});

slider.addEventListener('mouseleave', () => {
  console.log('mouseleave')
  let isDown = false
  slider.classList.remove('active')
});

slider.addEventListener('mouseup', () => {
  console.log('mouseup')
  let isDown = false
  slider.classList.remove('active')
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  console.log('mousemove - drag') //logs only if there is a drag
});
```

We also add the `active` class in CSS to `div.items` when the drag is enabled (i.e. `isDown == true`). The ` active` class highlights the background a little bit, changes the cursor, and makes the element slightly bigger.

### 2. Get initial data.

The moment the user clicks anywhere on the slider, we record the current X position (`e.pageX`) and the current Y scroll (`scrollLeft`).

```Javascript
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX;
    scrollLeft = slider.scrollLeft;
  });

```

These values will be useful to move the scroll when there is a drag.

### 3. Track the drag and update scroll.

```Javascript
slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    slider.scrollLeft = scrollLeft - (e.pageX - startX);
  });
```

- `e.preventDefault()` call to stop dafault behavior, such as text selection.

- If we drag the mouse to the left in the slider, we want the items to move left as well, for this to happen the scroll should move right.

- If we drag 25px left, we wan the scroll to move 25px right. (The sensitivity is adjustable).

```Javascript
slider.scrollLeft = scrollLeft - (e.pageX - startX);
```

- `e.pageX` give the new x-position.
- `startX` give us the initial x-position before the drag began.
- `e.pageX - startX` will give us the distance moved horizontally.
- Then we subtract the delta (e.pageX -startX) from the `scrollLeft.
- We would have added the delta if we wanted the scroll to move in the direction of the mouse drag.

We can adjust the sensitivity by multiplying the delta with a positive number great than 1.

- Example: 2x sensitivity.
  `(e.pageX - startX)\*2`
