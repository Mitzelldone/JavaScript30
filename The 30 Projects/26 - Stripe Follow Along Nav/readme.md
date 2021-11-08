# Stripe dropdown follow-along navigation
🟡**DEMO:** [HERE](https://mitzelldone.github.io/JavaScript30/The%2030%20Projects/26%20-%20Stripe%20Follow%20Along%20Nav/index.html)
![demo](https://github.com/Mitzelldone/JavaScript30/blob/main/The%2030%20Projects/images/26.demo.gif)
---

The HTML we interact with is the `nav.top` element.

```Javascript
<nav class="top">
    <div class="dropdownBackground">
      <span class="arrow"></span>
    </div>

   <!-- nav bar which we see -->
    <ul class="cool">
      <!-- about me -->
      <li>...</li>
      <!-- Courses -->
      <li>...</li>
      <!-- other links -->
      <li>...</li>
    </ul>
  </nav>
```

- The `div.dropdownBackground` is the white background you see behind the nav dropdown when you hover over them.
- The `ul.cool` contains the actual nav items, the `<li>`'s corresponds to the 'about me', 'courses' and 'other links' items.

Just for completeness let's have a look at a single nav element.

```Javascript
<li>
  <a href="#">About Me</a>
  <div class="dropdown dropdown1">
    <div class="bio">
      <img src="https://logo.clearbit.com/wesbos.com">
      <p>Wes Bos sure does love web development. He teaches things like JavaScript, CSS and BBQ. Wait. BBQ isn't part of web development. It should be though!</p>
    </div>
  </div>
</li>
```

- Each element has a link tag with the text you see on the nav, and below that is the dropdown content.
- The dropdown content (`div.dropdown`) should become visible when you hover over the corresponding `<li>` element.
- In **CSS**, the dropdown has `display:none, opacity:0`, when the user hovers over the item it animates into view.

## Javascript

So let's breakdown the steps required to achieve the effect -

1. Get all the handles to the DOM elements we wish to manipulate.
2. Track mouse enter and leave.
3. Show dropdown elements on mouse enter/leave.
4. Show the background highlight.
5. Change the width of the highlight to match the dropdown.
6. Change the position to fit behind the dropdown.

### 1. Get handle on DOM elements

```Javascript
const triggers = document.querySelectorAll('.cool > li');
const background  = document.querySelector('.dropdownBackground');
const nav  = document.querySelector('.top');
```

### 2. Track mouse enter and leave

```Javascript
function handleEnter(){
}
function handleLeave(){
}
triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter));
triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave));
```

### 3. Show dropdown on mouse enter/leave

We use the `trigger-enter` and `trigger-enter-active` CSS classes to get our desired effect. These classes are added to the <`li`> elements holding the dropdown.

```CSS
  .trigger-enter .dropdown {
    display: block;
  }

  .trigger-enter-active .dropdown {
    opacity: 1;
  }
```

We'll add `trigger-enter-active` 150ms after adding `trigger-enter` since we can't animate display and opacity at the same time!

```Javascript
function handleEnter() {
  this.classList.add('trigger-enter');
  setTimeout(() => this.classList.add('trigger-enter-active'), 150);
}

function handleLeave() {
  this.classList.remove('trigger-enter', 'trigger-enter-active');
}
```

At this point if you hover over the nav elements real quick you'll see that the `trigger-enter-active` class remains even after you're no longer hovering on the element. This is because `trigger-enter` is initially set, then you immediately move out (before 150ms) so `handleLeave` function removes the trigger classes, only then is `trigger-enter-active` set (the inital 150ms callback)!

We can fix this in handle enter by changing the callback to -

```Javascript
setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);
```

Now the callback check whether the `trigger-enter` class exists, only then does it add `trigger-enter-active`.

### 4. Show the background highlight

To the `div.dropdownBackground` element add the `open` class to make it visible, remove it to make it disappear! Open just makes the `opacity : 1`, which is otherwise zero.

```Javascript
// in handleEnter()
background.classList.add('open')

// in handleLeave
background.classList.remove('open')
```

### 5. Change the width of highlight

```Javascript
function handleEnter(){
    //....

    const dropdown = this.querySelector('.dropdown');
    const dropdownCoords = dropdown.getBoundingClientRect();

    const height = dropdownCoords.height
    const width = dropdownCoords.width

    background.style.setProperty('width', `${width}px`);
    background.style.setProperty('height', `${height}px`);
}
```

### 6. Change the position

```Javascript
function handleEnter(){
    // ....

    const navCoords = nav.getBoundingClientRect()
    const top = dropdownCoords.top - navCoords.top
    const left = dropdownCoords.left - navCoords.left
    background.style.setProperty('transform', `translate(${left}px, ${top}px)`)
}
```

Here we subtract `<nav>`'s top and left value as `getBoundingClientRect(`) returns position values that are relative to the parent.
