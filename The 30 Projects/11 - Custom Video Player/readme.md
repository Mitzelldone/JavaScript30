## HTML5 Custome Video Player 🐰
🟡**DEMO:** [HERE](https://mitzelldone.github.io/JavaScript30/The%2030%20Projects/11%20-%20Custom%20Video%20Player/index.html)

![demo](https://github.com/Mitzelldone/JavaScript30/blob/main/The%2030%20Projects/images/11.demo.PNG)

#
This project we won't be touching the HTML or CSS, but we need to understand the html structure.
```Html
   <div class="player">
     <video class="player__video viewer" src="https://player.vimeo.com/external/194837908.sd.mp4?s=c350076905b78c67f74d7ee39fdb4fef01d12420&profile_id=164" ></video>
     <div class="player__controls">
       <div class="progress">
        <div class="progress__filled"></div>
       </div>
       <button class="player__button toggle" title="Toggle Play">►</button>
       <input type="range" name="volume" class="player__slider" min="0" max="1" step="0.05" value="1">
       <input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1">
       <button data-skip="-10" class="player__button">« 10s</button>
       <button data-skip="25" class="player__button">25s »</button>
       <button class="player__fullscreen" title="Toggle Fullscreen">↔️</button>       
     </div>
   </div>
```

- The player is contained in `div.player`. 
- The video comes from the `<video>` element. 
- The controls are under `div.player__controls`. 
- The animation you see when hovering on the video is a combination of CSS transition and transform.
#

**Features of the player include** - play/pause the video, skip forward/backward, adjust speed, adjust volume, display progress and seek position in video.

Main steps involved in creating the player :

1. Get a reference to all the elements we need to control
2. Write a function to play/pause
3. Update the play/pause button based on state of video
4. Add the skip forward and backward functionality
5. Handle the volume change and playback speed range
6. Display the video progress
7. Seek a position in the video by clicking/dragging on the progress bar
8. Toggle fullscreen

## Get all the elements
```JavaScript
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.player__fullscreen')
```
- You can read more about the [video element](https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement) or preferrably the [Media element](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) it inherets from. 
- We'll be using the JS properties quite a bit. 
- If you also fancy a tutorial about the video element: [media](https://web.dev/media/) has a brilliant one!

## Write a function to play/pause

## Update the play/pause button
## Add the skip forward and backward functionality
## Handle the volume and playback rate change
## Display the video progress
## Seek a position in the video
## Toggle fullscreen

