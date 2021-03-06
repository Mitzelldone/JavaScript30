# Type Ahead AJAX

### 🟥DEMO: [HERE](https://mitzelldone.github.io/JavaScript30/The%2030%20Projects/06%20-%20Type%20Ahead/index.html)

![demo](../06%20-%20Type%20Ahead/demo.gif)

---

## Task

We are given a web page with an `input` HTML element in which the user can insert
text, and an `unordered list` below that `input` which will display cities & states
that contain the text inputted by the user with a highlight around the text that
was matched.

## Guide

**Steps:**

1.  Declare three variables, one which will contain the data returned from the endpoint in an
    array, one that will reference the `input` HTML element, and one that will reference the
    `unordered list` HTML element.

2.  Modern browser APIs provide us with an experimental `fetch` method that _fetches resources
    (including across network)_ and returns a **Promise** containing the response in a **Response**
    object. We'll use this method to get our data from the provided endpoint, convert the response
    to JSON, and then push the items into our array. `...data` is a ES6 Spread syntax.

    ````JavaScript
    const cities = [];

        fetch(endpoint)
            .then(blob => blob.json())
            .then(data => cities.push(...data))
        ```

    ````

3.  Attach an _event listener_ to the `input` HTML element which will listen for the 'keyup' event
    and call upon a function as the _event handler_ that will be responsible for displaying
    the matched data.

4.  Define a function that will be responsible for finding matches between the inputted text
    and the data received from the endpoint.

    - This function will accept two parameters; the inputted text and the array containing the
      data from the endpoint. In the body of the function, we'll _filter_ through the array, using a
      _new instance of a Regular Expression object_. This object will accept the inputted text
      as the pattern to match, and will have flags set to find all matches (rather than stopping
      at the first match) and to ignore text casing (learn about the `RegExp` constructor
      [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)).
    - Match the inputted text with the `city` or `state` properties of the objects contained within
      our array. This function will be utilized in the _body of the event handler function_.

5.  Define the function to be used as the _event handler_.
    - In the body of this function, declare a variable and define it as the **response** from
      calling the function in Step 4, passing in the _value of the function context_ (the
      inputted text) and the variable containing our endpoint data as arguments. This variable
      now contains an array of items from our dataset that match the inputted text.
    - Declare another variable and define it as the result of _mapping over the array
      referenced in the previously declared variable_. In the body of the `map` method, we'll
      declare two new variables which will target the `city` and `state` properties of each
      object in the array we're mapping over and replace those properties with the necessary
      HTML to highlight them. Finally, we'll return a _template string_ containing two _list items_;
      one will display the _city and state_ using the variables we just defined, and the
      other will display the _population_. The result of this `map` method will be an array
      of template strings that we can _join_ together to be one **BIG** template string.
    - Target the _inner HTML_ of the `unordered list` (using the variable defined in Step 1) and
      set it as the variable containing the big _template string_.
6.  Format the population so that it's separated by commas. We can use this function:

    ```JavaScript
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    ```

## Summary

- `change` & `keyup` events
- Promise: `fetch()`, `then()`, `json()`
- Array: `filter()`, `map()`, `push()`, `join()`
- Regexp: `match()`, `replace()`
