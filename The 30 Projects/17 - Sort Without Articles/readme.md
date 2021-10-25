# Sort without articles

- Today we learn how to sort HTML elements based on their text content.
- We're given an HTML page with an unordered list, and an array of string values in the `script` tag.

        ```JavaScript
        const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];
        ```

        ```HTML
        <ul id="bands"></ul>
        ```

- Sort the values in the array excluding the prefixes 'The', A', or 'An' and place the values into the unordered list as list items.

## Guide

**Steps to take**

1. Call standard sort on the array
2. Function to strip the strings
3. Compare the stripped version
4. Add the elements to the ul#bands

### Call standard sort on the array

First we [sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) normally, with the articles. By default, it will sort by alphabetical order.

```JavaScript
//write in just one hot line (ternary)
const sortedBands = bands.sort((a, b) => a > b ? 1 : -1);

// Before ternary
if(strip(a) > strip(b)) {
  return 1;
} else {
  return -1;
}
```

### Function to strip the strings

We'll use a RegEx(Regular Expression) to find any instance of articles (/i implies case insensitivity), and reduce them to nothing.

```JavaScript
// to strip out the specified words which are not articles.
function strip(bandName) {
  return bandName.replace(/^(a |the |an )/i, '').trim();
}
```

### Compare the stripped version

```JavaScript
const sortedBands = bands.sort((a, b) => strip(a) > strip(b) ? 1 : -1);
```

### Add the elements to the list

- Map the list data to a list of strings of `<li>`'s. - Then concatenate them and set them to the inner html of the `<ul>`.

```JavaScript
document.querySelector('#bands').innerHTML =
  sortedBands
    .map(band => `<li>${band}</li>`)
    .join(''); //to remove commas.
```

- it takes the element and sets to the `innerHTML`, and that's going to return an array with commas (`,`) by default. Therefore, we want to `join('')` it into one big string rather than a bunch of string with a comma in between.

Type `sortedBands.toString()` and `sortedBands.join(''),toString()` in the DOM to see the comparison.
