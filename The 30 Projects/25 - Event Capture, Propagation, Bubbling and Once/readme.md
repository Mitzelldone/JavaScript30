# Event Capture, Propagation, Bubbling and Once

We'll just be trying out different exercises to figure out how events in the browser work!

---

The HTML structure we'll be working with -

```HTML
<div class="one">
  <div class="two">
    <div class="three">
    </div>
  </div>
</div>
```

These are just three nested boxes. We'll select them in the divs variable.

const divs = document.querySelectorAll('div')

## Bubbling

```Javascript
function bubbles(e){
  console.log(e.target)
  console.log("bubbles ", this.classList.value)
}

divs.forEach(div => div.addEventListener('click', bubbles))

// Output (after cliking on three)-

// <div class=​"three">​​</div>​
// bubbles  three
// <div class=​"three">​​</div>​
// bubbles  two
// <div class=​"three">​​</div>​
// bubbles  one
```

As we can see, the target is always the third div (inner most box), but click is triggered for each div. This is due to bubbling - where the event bubbles up to the parent.

## Capturing

```Javascript
function captures(e){
  console.log(e.target)
  console.log("captures ", this.classList.value)
}

divs.forEach(div => div.addEventListener('click', captures, {capture:true}))

// Output on cliking div.three

// <div class=​"three">​​</div>​
// captures  one
// <div class=​"three">​​</div>​
// captures  two
// <div class=​"three">​​</div>​
// captures  three
```

Again the target is always the div we've clicked on, but click is triggered on each of the boxes starting from the parent box this time! This is what setting {capture:true} will do. So instead of bubbling there is capture.

Learn more at [Javascript.info](https://javascript.info/bubbling-and-capturing) and [MDN Docs](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#bubbling_and_capturing_explained)

Example

```Javascript
function logAll(e){
    phase = {0:"unknown", 1:"capture", 2: "target", 3:"bubbling"}
    console.log(phase[e.eventPhase], this.classList.value)
}

// same handler for both phases, we log the event phase in the handler
divs.forEach(div => div.addEventListener('click', logAll))
divs.forEach(div => div.addEventListener('click', logAll, {capture:true}))

// Output on clicking div.three
// capture one
// capture two
// target three
// target three
// bubbling two
// bubbling one
```

Hopefully the above example helps you visualize what is happening! The phase object is derived from the phase to number mapping on [this page](https://developer.mozilla.org/en-US/docs/Web/API/Event/eventPhase).

## Stop Propagation `event.stopPropagatio()

`Event.stopPropagation()` Prevents further propagation of the current event in the capturing and bubbling phases.

```Javascript
function logEv(e){
  console.log(this.classList.value)
  e.stopPropagation()
}

divs.forEach(div => div.addEventListener('click', logEv))

//Output (without e.stopPropagation())
// three
// two
// one

// After adding e.stopPropagation()
// three
```

The event is no longer bubbled. The effect will be similar if done during the capture phase

## Trigger once

When we want an event to trigger only once,

```Javascript
function runOnce(e){
    console.log("I should run only once")
}
divs.forEach(div => div.addEventListener('click', runOnce, {once:true}))
```

When you click `div.three` you'll see `"I should run only once"` logged thrice (once per parent), which means it is called the first time. Click it again and nothing happens. Even if you click `div.one` or `div.two`, nothing happens! This is because the callbacks have already run once even though they were not the target!
