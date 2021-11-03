# Sticky Nav
🟡**DEMO:** [HERE](https://mitzelldone.github.io/JavaScript30/The%2030%20Projects/24%20-%20Sticky%20Nav/index.html)
![demo](https://github.com/Mitzelldone/JavaScript30/blob/main/The%2030%20Projects/images/24.demo.png)
Today we'll learn how to make a sticky nav in JS.

---

We'll be manipulating the `<nav>` element.

```Javascript
 <!-- heading before the nav -->
<header>...</header>

 <!-- the nav bar -->
<nav id="main">
  <ul>
    <li class="logo"><a href="#">LOST.</a></li>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Images</a></li>
    <li><a href="#">Locations</a></li>
    <li><a href="#">Maps</a></li>
  </ul>
</nav>

<!-- rest of the body -->
<div class="site-wrap"> ... </div>
```

### Get the position of `nav`.

First, we need to figure out the distance of the nav bar from the top of the page. Then, when we've scrolled to that point we need to change the CSS property of the nav to a fixed position.

```Javascript
const nav = document.querySelector('#main');
let topOfNav = nav.offsetTop;

function fixNav() {
    //console.log(topOfNav, window.scrollY);
}

window.addEventListener('scroll', fixNav);
```

- `nav.offsetTop` or an element offsetTop. It gives us the distence of the element in px.
- We listen to for scroll event and call `fixNav()` function.

### The `fixNav()` function.

```Javascript
function fixNav() {
  if (window.scrollY >= topOfNav) {
    document.body.style.paddingTop = nav.offsetHeight + 'px';
    document.body.classList.add('fixed-nav');
  } else {
    document.body.classList.remove('fixed-nav');
    document.body.style.paddingTop = 0;
  }
}
```

- `window.scrollY` gives us the vertical scroll in px.
- `fixed-nav` class is added, if we scroll beyond the `topOfNav` position. Else, it is removed.

Once the body has the class of `fixed-nav`, then this code in CSS will run.

```CSS
body.fixed-nav nav {
  position: fixed;
  box-shadow:0 5px 0 rgba(0,0,0,0.1);
}
```

 *Problem:* Now when the position of the `nav` element is fixed, the space it occupies goes free for other elements to reflow into. 

Hence along with the `fixed-nav` class, we add and remove the padding `document.body.style.paddingTop` equivalent to the height of the nav bar.

## More styling

Now along with the fixed nav bar, the logo animates into view and the text gets a little bigger.

```CSS
.fixed-nav li.logo {
  max-width:500px;
}

body.fixed-nav .site-wrap {
  transform: scale(1);
}
```
