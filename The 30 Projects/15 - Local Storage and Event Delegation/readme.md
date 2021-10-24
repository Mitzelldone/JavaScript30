# LocalStorage and Event Delegation
🟡**DEMO:** [HERE](https://mitzelldone.github.io/JavaScript30/The%2030%20Projects/15%20-%20Local%20Storage%20and%20Event%20Delegation/index.html)


![demo](https://github.com/Mitzelldone/JavaScript30/blob/main/The%2030%20Projects/images/15.demo.gif)
We'll be building a to-do list of sorts, with local storage to persist the information across a refresh or reload.

## HTML and CSS Explaination

### HTML

```HTML
<div class="wrapper">
  <h2>LOCAL TAPAS</h2>
  <p></p>
  <ul class="plates">
    <li>Loading Tapas...</li>
  </ul>
  <form class="add-items">
    <input type="text" name="item" placeholder="Item Name" required>
    <input type="submit" value="+ Add Item">
  </form>
  <div class="toggles">
    <button data-toggle="check" class="mass-toggle" >Check All </button>
    <button data-toggle="reset" class="mass-toggle" >Reset all </button>
   </div>
</div>
```

- The text box to add items is essentially a `form.add-items` element.
- The list of items already added will be displayed in the `ul.plates` element.

### CSS

```CSS
.plates input {
  display: none;
}

.plates input + label:before {
  content: '⬜️';
  margin-right: 10px;
}

.plates input:checked + label:before {
  content: '🌮';
}
```

- all input elements under `.plates` is set to `display: none`. That is the checkbox won't be seen.
- Instead the empty white box and the taco come from the `label:before`, where the label is the one adjacent to the invisible checkbox.
- When the checkbox is checked (`input:checked`), it turns the content of the before pseudo element to a taco. - So what we see as getting checked/unchecked is not even the checkbox, but rather a pseudo element of the label.
- You can learn more about the `:before` pesudo element @ [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/::before)

# JavaScript

The starting JS given to us:

```JavaScript
const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const items = [];
```

We have to handles the form where the user inputs new items and then display the items in the list. The `items` array holds all the items.

**Main steps involved to complete our app**

- Add new items to the `items` array.
- Display the items in the `items` array.
- Toggle an item.
- Save the list to local storage.
- Check and reset.

## Adding new items

We add new items using a html form. Submitting a form by default makes a get request and goes to the new URL.

```JavaScript
function addItem(e) {
  e.preventDefault();
  const text = (this.querySelector('[name=item]')).value;
  const item = {
      text,
      done: false
  };

  items.push(item); //take item and put it into the items array

  //  display the list - populateList();
  //  store to local storage - localStorage.set()

  this.reset();
}

addItems.addEventListener('submit', addItem);
```

- Attach an _event handler_ to the `form` element that will listen for the `'submit'` event and call upon an event handler.
- Define the _event handler_ as a function which accepts an `event` as a parameter and will prevent the default behavior of that event.
- We call `e.preventDefault()` to prevent the default behavior.
- In `addItem() function, `this`refers to ther`form.add-items DOM object.
- We then select the text input element and get the text inside of it.
- We create a new items object and then push it into the items list.
- Once it is added we call `reset()` on the form to clear the input text box.

## Display the items

```JavaSCript
function populateList(plates = [], platesList) {
  platesList.innerHTML = plates.map((plate, i) => {
    return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
        <label for="item${i}">${plate.text}</label>
      </li>
    `;
  }).join('');
}

function addItem(e){
  //...
  //  display the list - populateList()
  populateList(items, itemsList)

  //...
}
```

- `populateList()` function does the work of taking in an array and displaying the list.
- `populateList()` uses template strings and `[].map` to create `<li>` elements from each element in the array, which is later concatenated into one string which `platesList.innerHTML` is set to.
- `addItem` uses `populatedList` to render all the current items.
- here the `.join('')` takes the array (which is `places.map()` made) and turn into a string and then pass it to `.innerHTML`.
- don't forget to set the default `plates` as an empty array(or object), otherwise it will break up the javascript sometimes (in this case the `plates` is an array).
> everytime we create an item, it calls `populateList()` and rerendering the entire list again instead of just update one single line, in this case is OK on performance, but practically just update one single line by using React or other frameworks is more efficient and helpful

## Toggle an item

We can attach a listener on the checkbox element, but the moment we add a new item, all `<li>` elements are recreated by `populateList`. Hence, adding an event listener on those items makes no sense. We solve this issue by using event delegation - we let the parent element take care of the click event to toggle an item. The parent in this case is the `ul.item-plates` element.

```JavaScript
function toggleDone(e) {
    if (!e.target.matches('input')) return; // skip this unless it's an input
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done; //flip-floping between true and false
    populateList(items, itemsList);
  }

itemsList.addEventListener('click', toggleDone);
```

- `toggleDone()` deals with the click event to toggle an item.
- In the populateList function you'd see that the input element for the item has `data-index=${i}` where `i` is the index of that item in the items array.
- So now `toggleDone` function checks if the event target is a input element (only input element being a checkbox).
- Next, extracts the index from the data attribute, toggles the `done` in the `items` array.
- Then re-renders the list by calling `populateList`.

## Save the list to LocalStorage

We want to persist the list after a refresh or for a later point in time, for this we'll use local storage. Local storage is a key value store where the key and value are strings.

**Example**:

```JavaScript
// set the value "Tom" for key "myCat" in the local storage
localStorage.setItem('myCat', 'Tom');

// cat has value "Tom"
var cat = localStorage.getItem('myCat');

//remove the "myCat" key from local storage
localStorage.removeItem('myCat');
```

To learn more about Local Storage @ [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

Since we want to keep the local storage in sync with the UI, we'll update the local storage when ever we call `populateList()`.

```JavaScript
function toggleDone(e) {
  //...
  localStorage.setItem('items', JSON.stringify(items)); //everytime update will mirror to the localStorage
  populateList(items, itemsList);  //update the actual visibility part on html
}

function addItem(e) {
  //...
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList); 
  //...
}
```

Also we need to get the items from local storage when we load the page. We'll modify items array to take read from the local storage first, if it doesn't have an 'items' key, we'll assign it to an empty array as we had earlier.

```JavaScript
const items = JSON.parse(localStorage.getItem('items')) || []; // const items is to check if there is something in localStorage and then we fall back to an empty array.
```
## Check and Reset

```JavaScript
const massToggleButton = document.querySelectorAll('.mass-toggle')  

//check/uncheck all
function massToggle (e) {
    let status = e.target.dataset.toggle == "check";
    items.forEach((item) => item.done = status);
    populateList(items, itemsList); update the actual visibility part on html
    localStorage.setItem('items', JSON.stringify(items)); //everytime update will mirror to the localStorage
    
}
massToggleButton.forEach((btns) => btns.addEventListener("click", massToggle))
```
