# Video Speed Controller UI 🎚️

---

We'll be building a video speed controller where the user can control the video speed just by hovering the mouse over the controller bar.

The **HTML** we have

  <div class="wrapper">
    <video class="flex" width="765" height="430" src="http://clips.vorwaerts-gmbh.de/VfE_html5.mp4" loop controls></video>
    <div class="speed">
      <div class="speed-bar">1×</div>
    </div>
  </div>

- `video.flex` is the video element whose playback rate we'll change.
- The `div.speed` element is the speed controller. - The `div.speed-bar` is the current playback speed indicator.

## Javascript

Let's select all the DOM elements we'll use:

```Javascript
const speed = document.querySelector('.speed');
const bar = speed.querySelector('.speed-bar');
const video = document.querySelector('video');

//min, max playback speed
const min = 0.4;
const max = 4;
```

Listen to mouse move on the speed controller:

```Javascript
speed.addEventListener('mousemove', handleMove)
```

The `handleMove` function does two things:

1. Changes the height of `div.speed-bar`.
2. Changes the playback rate of the video.

### Changing the speed bar height

```Javascript
function handleMove(e) {
  const y = e.pageY - this.offsetTop
  const percent = y / this.offsetHeight
  const height = Math.round(percent * 100) + '%'
  bar.style.height = height
}
```

1. `y = e.pageY - this.offsetTop` - Calculate the `y` value of the mouse within the _speed controller_.
2. `percent = y / this.offsetHeight` - Get the fraction which it represents, i.e. y value / total height.
3. `height = Math.round(percent \* 100) + '%'` - Get how much height in % of space is to be filled by speed-bar.
4. `bar.style.height = height` - Set the `speed-bar` to that height. .

### Changing the playback rate

```Javascript
// in handleMove()
const min = 0;
const max = 10;
const playbackRate = percent * (max - min) + min;
bar.textContent = playbackRate.toFixed(2) + '×';
video.playbackRate = playbackRate;
```

- To get the **playback rate** we map the `percentage` into the `min` to `max` range, and add the `min` offset.
- That is how we get `playbackRate = percent \* (max - min) + min`.
- `.toFixed(2)` - Displays the number with 2 decimal places.

- Then, we just update the text in the speedbar and the playback rate of the video.
