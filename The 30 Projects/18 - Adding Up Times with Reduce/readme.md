# Adding Up Times with Reduce

#

Today we'll be using map and reduce to add time of individual videos find the total time of a playlist.

```HTML
<ul class="videos">
  <li data-time="5:43">Video 1</li>
  <li data-time="2:33">Video 2</li>
  ...
</ul>
```

- The `<ul>` represents the playlist.
- Each `<li>` is a video item.
- The `data-time` attribute holds the time of the video.

## JavaScript

1. Extract all the times from the `<li>` o each video into array.
2. Convert each string in the array to seconds.
3. Add all the seconds.
4. Display the total time in "hh:mm:ss" format.

### Extract times from items

- We use `Array.from` to create an array object from the NodeList object `document.querySelectorAll` gives us.

```JavaScript
const timeNodes = Array.from(document.querySelectorAll('[data-time]'));
```

### Convert string array into seconds array

Declare a `cons`t and define it as the _return value_ of **mapping** over each item in the array **TWICE**, and **reducing** the result of those maps to a single integer value.

```JavaScript
const seconds = timeNodes
    .map(node => node.dataset.time) // Get the 'data-time' property.
    .map(timeCode => {
      /** Declare constants minutes & seconds using array destructuring.
        * and define as the result of splitting the 'data-time' property.
        * a list item at ':' and parsing the returned two strings.
        * as float numbers.
        */
      const [mins, secs] = timeCode.split(':').map(parseFloat)
      return (mins * 60) + secs; // Return the total seconds
    })
```

- If we have something like `'4:30'`, it is `.split` into `["4", "30"]` and we convert it into numbers with `parseFloat()`.
- We capture the `mins` and `secs` in min, sec by ES6 destructuring.

### Add all the seconds

We use `.reduce` to add all the time in seconds to get the total time in seconds.

```JavaScript
const seconds = timeNodes
    .map(node => node.dataset.time)
    .map(timeCode => {
        const [mins, secs] = timeCode.split(':').map(parseFloat);
        return (mins * 60) + secs;
    })
    .reduce((total, vidSeconds) => total + vidSeconds);
```

### Display the total time

- We have to split the time in sec to hours, minutes and seconds.
- Use the `seconds` (total seconds) variable to calculate the hours and mins.
- Use `Math.floor` to remove decimal point.

```JavaScript
//running tally of seconds left.
let secondsLeft
 = seconds; // use let coz need to be reassign over and over
const hours = Math.floor(secondsLeft / 3600);
secondsLeft = secondsLeft % 3600; // % is how many are left after they've been evenly distributed.

const mins = Math.floor(secondsLeft / 60);
secondsLeft = secondsLeft % 60;


console.log("Playlist Total Time: " + (hours < 10 ? "0" + hours : hours) + ":" + (mins < 10 ? "0" + mins : mins) + ":" + (secondsLeft < 10 ? "0" + secondsLeft : secondsLeft)); // Playlist Total Time: 04:58:58
```
