# Array Cardio Day 2 💪

### 🟥DEMO: [HERE](https://mitzelldone.github.io/JavaScript30/The%2030%20Projects/07%20-%20Array%20Cardio%20Day%202/index.html)

![Demo](../07%20-%20Array%20Cardio%20Day%202/demo.PNG)

---

The following built-in Array methods will be utilized to solve this challenge:

- [`Array.prototype.some()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
- [`Array.prototype.every()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
- [`Array.prototype.find()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
- [`Array.prototype.findIndex()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
- [`Array.prototype.splice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
- [`Array.prototype.slice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
- [Spread syntax (...)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

---

Our sample data:

```Javascript
const people = [
    { name: 'Wes', year: 1988 },
    { name: 'Kait', year: 1986 },
    { name: 'Irv', year: 1970 },
    { name: 'Lux', year: 2015 }
];

const comments = [
    { text: 'Love this!', id: 523423 },
    { text: 'Super good', id: 823423 },
    { text: 'You are the best', id: 2039842 },
    { text: 'Ramen is my fav food ever', id: 123523 },
    { text: 'Nice Nice Nice!', id: 542328 }
];
```

## [`Array.prototype.some()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

The `some()` method tests whether **at least one element** in the array passes the test implemented by the provided function. It returns true if, in the array, it finds an element for which the provided function returns true; otherwise it returns false. It doesn't modify the array. Like `OR` operation.

### 🟨 Task: Is at least one person 19 or older?

```Javascript
const isAdult = people.some(function(person) {
  const currentYear = (new Date()).getFullYear();
  if (currentYear - person.year >= 19) {
      return true;
  }
});
console.log({isAdult});

// Shorter Code
const isAdult = people.some(person => {
        const currentYear = (new Date()).getFullYear();
        return currentYear - person.year >= 19;
    });

console.log({isAdult});
```

ES6 syntax:

```Javascript
const isAdult = people.some(person => ((new Date()).getFullYear()) - person.year >= 19);

console.log({isAdult}); //true
```

`getFullYear()` is a function of Date, not a property.

## [`Array.prototype.every()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

The `every()` method tests whether **all elements** in the array pass the test implemented by the provided function. It returns a Boolean value. Like 'AND' operation.

### 🟨 Task: Is everyone 19 or older?

```Javascript
const allAdults = people.every(person => ((new Date()).getFullYear()) - person.year >= 19);

console.log({allAdults}); // {isAdult: true}
console.log(allAdults) // false
```

## console.log(allAdult) VS. console.log({allAdult})

```Javascript
console.log(allAdult)    // gives the value of allAdult variable
console.log({allAdult})  // gives the allAdult object itself
```

## [`Array.prototype.find()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

The `find()` method _returns the value of the first element_ in the provided array that satisfies the provided testing function. If no values satisfy the testing function, undefined is returned.

### 🟨 Task: find the comment with the ID of 823423.

```JavaScript

const comment = comments.find(function(comment) {
        if(comment.id === 823423) {
            return true;
        }
    });

// Shorter Code
const comment = comments.find(comment => comment.id == 823423);

console.log(comment) // { text: 'Super good', id: 823423}
```

## [Array.prototype.findIndex()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)

The `findIndex()` method returns the **index** of the first element in the array **that satisfies the provided testing function**. Otherwise, it returns `-1`, indicating that no element passed the test. Works just like `find()`, except it returns the index, not the element.

### 🟨 Delete the comment with the ID of 823423.

```Javascript
const index = comments.findIndex(comment => comment.id == 823423);
const deletedComment = comments.splice(index, 1);

console.log(deletedComment)
console.log(comments)
```

#### Array.prototype.splice()

The `splice()` method changes the content of an array by removing existing elements and/or adding new elements.

**Delete method 1** - will change content of the origin array.

```Javascript
comments.splice(index, 1);
```

#### Array.prototype.slice()

The `slice()` method returns shallow copy of a protion of an array into a new array object selected from begin to end (end NOT included). The original array will not be modified.

**Delete method 2** - will create a new array, and not change content of origin array.

↓ create a new array and use ES6 syntax.

```Javascript
        const newComments = [
            ...comments.slice(0, index),
            ...comments.slice(index + 1)
        ];
        console.table(comments);
        console.log("Delete the comment with the ID of 823423");
        console.table(newComments);
```
