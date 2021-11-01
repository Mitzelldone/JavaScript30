# Follow along link highlight
🟡**DEMO:** [HERE](https://mitzelldone.github.io/JavaScript30/The%2030%20Projects/22%20-%20Follow%20Along%20Link%20Highlighter/index.html)
![demo](https://github.com/Mitzelldone/JavaScript30/blob/main/The%2030%20Projects/images/22.demo.gif)
Today we learn how to make cool follow along link highlights in JavaScript.The idea is to create an highlight that moves from one link to another on hover, in a smooth animated fashion.

---

We'll achieve the highlight with an underlying `span.highlight` **element**. The CSS for this is already given, it contains the transition property for animation effect -

```CSS
.highlight {
  transition: all 0.2s; //play around with it
  border-bottom:2px solid white;
  position: absolute;
  top:0;
  background:white;
  left:0;
  z-index: -1;
  border-radius:20px;
  display: block;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
}
```

### Adding the **element** on to the DOM via JS

This creates an `span` element and adds the class 'highlight' to the DOM. Then `appendsChild()` the element to the end of the document body.

```Javascript
const highlight = document.createElement('span');
highlight.classList.add('highlight');
document.body.appendChild(highlight);
```

### Now to figure when there is an hover

```Javascript
const triggers = document.querySelectorAll('a');
triggers.forEach(a => a.addEventListener('mouseenter', highlightLink))
function highlightLink() {
}
```

### The `highlightLink()` function

```Javascript
function highlightLink() {
  const linkCoords = this.getBoundingClientRect();
  console.log(linkCoords);
  const coords = {
    //width and height are absolute
    width: linkCoords.width,
    height: linkCoords.height,

    // we need to add scroll since
    //top,left are relative to the viewport
    top: linkCoords.top + window.scrollY,
    left: linkCoords.left + window.scrollX
  };

  highlight.style.width = `${coords.width}px`;
  highlight.style.height = `${coords.height}px`;
  highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
}
```

In `highlightLink()` we need to move the span element exactly over the link we're hovering on. Due to `z-index: -1` on the highlight element, it moves under the link.

To find the position and dimensions of the link, we'll use `getBoundingClientRect()` . Learn more @ [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect).

Key thing to note here is that the top, left, right, bottom are all relative to the viewport.

`this`: every single <a> element itself.
