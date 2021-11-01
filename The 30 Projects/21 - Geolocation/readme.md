# Geolocation based Speedometer and Compass 🧭
🟡**DEMO:** [HERE](https://mitzelldone.github.io/JavaScript30/The%2030%20Projects/21%20-%20Geolocation/index.html)
![demo](https://github.com/Mitzelldone/JavaScript30/blob/main/The%2030%20Projects/images/21.demo.PNG)

I dont use Mac so... you can check out [amelieyeh](https://github.com/amelieyeh/JS30/blob/master/21-Geolocation/README.md) or the [video](https://youtu.be/X7Cbtra0C6I) for clear understanding.

---
The compass logo is got from an SVG, we'll be applying a transform on it based on the data from the `Position` object.

Get the handles to the html elements -
```JavaScript
const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');
```

We use watchPosition to get the data.
The `Geolocation.watchPosition()` [@MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/watchPosition) method is used to register a handler function that will be called automatically each time the position of the device changes.
```Javascript
navigator.geolocation.watchPosition((data) => {
    console.log(data);
    speed.textContent = Math.round(data.coords.speed);
    arrow.style.transform = `rotate(${data.coords.heading}deg)`;
}, (eer) => {
    console.error(err);
    alert('HEY! YOU GOTTA ALLOW THAT TO HAPPEN!!!');
});
```
- Manipulating the DOM elements with the position data.
```Javascript
// inside watchPosition
speed.textContent = data.coords.speed;
arrow.style.transform = `rotate(${data.coords.heading}deg)`;
```

- The error callback function.
```JavaScript
navigator.geolocation.watchPosition((data) => {
    console.log(data);
}, (err) => {
    console.error(err);
});
```

