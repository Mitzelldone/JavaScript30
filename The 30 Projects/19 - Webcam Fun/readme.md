# Webcam fun
🟡**DEMO:** [HERE](https://mitzelldone.github.io/JavaScript30/The%2030%20Projects/19%20-%20Webcam%20Fun/index.html)


![demo](https://github.com/Mitzelldone/JavaScript30/blob/main/The%2030%20Projects/images/19.demo.png)
Today we'll use getUserMedia and Canvas to capture a video stream from a user's webcam and manipulate the pixels.

# JavaScript

We're going to be working on a bunch of experiments relating to webcam data and HTML canvas.

- Getting webcam data and displaying it via `<video>` element
- Paint the data to a canvas
- Take a photo at any given time
- Add effects to the video in realtime

The JS template we're given :

```Javascript
const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
```

We have the video and canvas elements, the canvas' 2D context, strip is the div where the photos are displayed, snap is the audio element that triggers on photo capture.

## Get and display webcam data

The `MediaDevices.getUserMedia()` method prompts the user for permission to use a media input which produces a MediaStream with tracks containing the requested types of media. That stream can include, for example, a video track, an audio track, and other possibly track types.

It returns a Promise (`.then`) that resolves to a MediaStream object. If the user denies permission, or matching media is not available, then the promise is rejected with _PermissionDeniedError_ or _NotFoundError_ respectively.

Learn more about Media devices @ [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)

```Javascript
function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
        video.srcObject = localMediaStream;
        video.play(); // This will show in realtime what the webcam sees.
    })
    .catch(err => {
      console.error(`OH NO!!!`, err);
    });
}
```

DEPRECIATION :
The following has been depreceated by major browsers as of Chrome and Firefox.

`video.src = window.URL.createObjectURL(localMediaStream);`

Please refer to these:

- Deprecated -[URL.createObjectURL()](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL)
- Newer Syntax -[HTMLMediaElement.srcObject](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject)

## Paint the data on a canvas

We get the width and height of the video source (in my case 640 x 480), set it as the canvas dimensions. The image is redrawn every 16 milliseconds, or little over 60fps.

```Javascript
function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => ctx.drawImage(video, 0, 0, width, height), 16)
}
```

- `ctx.drawImage` @ [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)

## Take a photo

- -Clicking on the "take photo" button triggers the `takePhoto function`.
- The function plays the 'snap' audio, captures the canvas data into a jpeg.
- Then a link tag is created with the attribute `download`.
- The image captured is placed inside the link as a img tag. When the user clicks on the image thumbnail.

```JavaScript
function takePhoto() {
  // played the sound
  snap.currentTime = 0;
  snap.play();

  // take the data out of the canvas
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
  strip.insertBefore(link, strip.firsChild);
}
```

- `canvas.toDataURL('image/jpeg')` converts the image and the canvas is displaying

## Cool effects

For the effects we'll have the following steps:

1. Draw image to canvas
2. Extract pixels from canvas
3. Transform the pixel data
4. Write the pixels back to the canvas

For this we'll need to know how to extract and write the pixels to the canvas and how the pixel data actually looks like!

To get the pixel data out, we have `ctx.getImageData(sx, sy, sw, sh)`. The `getImageData()` method of the Canvas 2D API returns an [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData) object representing the underlying pixel data for the area of the canvas denoted by the rectangle which starts at _(sx, sy)_ and has an _sw_ width and _sh_ height.

Similarly `ctx.putImageData(imgData, x, y)` puts back the image data (`imgData`) starting from `x,y`.

So the whole image is represented as an array, each set of 4 array elements represent a pixel, i.e. an array of 8 elements would map to [r1,g1,b1,a1, r2,g2,b2,a2] representing the RGBA value of two pixels. Since we our video is `640x480` we'll have `1228800` pixels (640 x 480 x 4).

The calls to the transforming functions will be added to `paintToCanvas` shown below.

```JavaScript
function paintToCanvas() {
  // ...
  return setInterval(() => {
    //draw img to canvas
    ctx.drawImage(video, 0, 0, width, height);

    // take the pixels out
    let pixels = ctx.getImageData(0, 0, width, height);

    // mess with them (filter)
    // pixels = redEffect(pixels); // - red effect
    // pixels = rgbSplit(pixels); // - rgb split
    // ctx.globalAlpha = 0.8;  // - ghosting
    // pixels = greenScreen(pixels); // green screen

    // put them back
    ctx.putImageData(pixels, 0, 0);

  }, 16);
}
```

### 1. Red effect

Loop through each pixel `(i+=4)`. Increment the red value, decrement the green and half the blue.

```Javascript
function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
  }
  return pixels;
}
```

This gives us an overall reddish aura/filter.

### 2. RGB split

We displace the red, green and blue values of each pixel by different amounts to create the same image split in three but with red, blue and green tinges.

```Javascript
function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i - 100] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 175] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}
```

### 3. Ghosting

ctx.globalAlpha = value; @[MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha)

Set `ctx.globalAlpha = 0.1` and then call ctx.putImageData(pixels, 0, 0). This persists the old image on the screen as the new image has a transparency of only 10%. So a image that is written persists for 10 more frames (since opacity of each incoming frame is only 10%), which makes it seem as though the hand is following you.

### 4. Green Screen

We get the different thresholds for RGB values from the input sliders, then we extract RGB values for each pixel. Make sure that each of the RGB values fall within their respective min and max values. If not set opacity to zero - wiping out the pixel.

```Javascript
function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}
```

#

- Call upon the `getVideo` function we previously defined.

- Attach an event listener to the `video` HTML element that will call the `paintToCanvas` function on the 'canplay' event.

```JavaScript
getVideo();

video.addEventListener('canplay', paintToCanavas);
```
