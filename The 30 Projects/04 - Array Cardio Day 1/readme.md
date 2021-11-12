# Array Cardio Day 1 💪

### 🟥DEMO: [HERE](https://mitzelldone.github.io/JavaScript30/The%2030%20Projects/04%20-%20Array%20Cardio%20Day%201/index.html)

![Demo](../04%20-%20Array%20Cardio%20Day%201/demo.PNG)

---

If you're unfamiliar with JavaScript array methods, Mozilla docs are your
friend.

The following built-in Array methods will be utilized to solve this challenge:

- [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Filter)
- [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Sort)
- [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

---

Here is the data we have

```Javascript
const inventors = [
    { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
    { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
    { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
    { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
    { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
    { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
    { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
    { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
    { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
    { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
    { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
    { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
];

const people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph', 'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black, Elk', 'Blair, Robert', 'Blair, Tony', 'Blake, William'];
```

## Array.prototype.filter()

The `filter(test_fn)` method creates a new array with all elements that pass the condition implemented by the provided function (`test_fn`).

Each element of the array is iterated upon and passed to test_fn as an argument, if `test_fn` returns a truthy for the element, it is included in the new list, if it returns a falsey, it is not.

Learn more @ [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter).

**JavaScript Demo: Array.filter()**

```Javascript
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);

console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]

```

**Syntax**

```Javascript
// Arrow function
filter((element) => { ... } )
filter((element, index) => { ... } )
filter((element, index, array) => { ... } )

// Callback function
filter(callbackFn)
filter(callbackFn, thisArg)

// Inline callback function
filter(function(element) { ... })
filter(function(element, index) { ... })
filter(function(element, index, array){ ... })
filter(function(element, index, array) { ... }, thisArg)
```

### 🟨Task : Filter the list of inventors for those who were born in the 1500's

```Javascript
const bornInFifteen = inventors.filter(inventor => (inventor.year >= 1500 && inventor.year < 1600));

console.table(bornInFifteen);
```
![1](https://github.com/Mitzelldone/JavaScript30/blob/main/The%2030%20Projects/04%20-%20Array%20Cardio%20Day%201/Images/4.img1.png)

## Array.prototype.map()

The `[].map(transform_fn)` method **creates a new array** with the results of calling a provided function (`transform_fn`) on every element in the calling array.

Learn more @ [MDN docs] (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).

**JavaScript Demo: Array.map()**

```Javascript
const array1 = [1, 4, 9, 16];

// pass a function to map
const map1 = array1.map(x => x * 2);

console.log(map1);
// expected output: Array [2, 8, 18, 32]
```

**Syntax**

```Javascript
// Arrow function
map((element) => { ... })
map((element, index) => { ... })
map((element, index, array) => { ... })

// Callback function
map(callbackFn)
map(callbackFn, thisArg)

// Inline callback function
map(function(element) { ... })
map(function(element, index) { ... })
map(function(element, index, array){ ... })
map(function(element, index, array) { ... }, thisArg)
```

### 🟨Task : Give us an array of the inventor first and last names

```Javascript
const names = inventors.map(inventor => `${inventor.first} ${inventor.last}`)
console.log(names)
```
![2](https://github.com/Mitzelldone/JavaScript30/blob/main/The%2030%20Projects/04%20-%20Array%20Cardio%20Day%201/Images/4.img2.png)

## Array.prototype.sort()

The `[].sort(cmp_fn)` method sorts the elements of an array in place and returns the array.

You can pass an optional function as an argument (cmp\*fn), which will be used to compare(cmp) two elements with each other. The cmp_fn(a,b) takes in two arguments - each being an element of the array being sorted.

The compare function :-

- should return a value lesser than 0 if 'a < b'. ('a' will be placed at a lower index than 'b').
- should return a value equal to 0 if 'a == b' ('a' and 'b' will remain where they are wrt each other).
- should return a value greater than 0 if 'a > b' ('b' will be places at a lower index than 'a').

Learn more @ [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).

**JavaScript Demo: Array.sort()**

```Javascript
const months = ['March', 'Jan', 'Feb', 'Dec'];
months.sort();
console.log(months);
// expected output: Array ["Dec", "Feb", "Jan", "March"]

const array1 = [1, 30, 4, 21, 100000];
array1.sort();
console.log(array1);
// expected output: Array [1, 100000, 21, 30, 4]

```

**Syntax**

```Javascript
// Functionless
sort()

// Arrow function
sort((firstEl, secondEl) => { ... } )

// Compare function
sort(compareFn)

// Inline compare function
sort(function compareFn(firstEl, secondEl) { ... })
```

### 🟨Task : Sort the inventors by birthdate, oldest to youngest

```Javascript
const sorted = inventors.sort((a, b) => b.year - a.year;

console.table(sorted)
```
![3](https://github.com/Mitzelldone/JavaScript30/blob/main/The%2030%20Projects/04%20-%20Array%20Cardio%20Day%201/Images/4.img3.png)

## Array.prototype.reduce()

The `[].reduce(acc_fn [, init_val])` method applies a function (`acc_fn`) against an accumulator (initial value being the first element of the array unless `init_val` is passed) and each element in the array (from left to right) to reduce it to a single value.

Learn more @ [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

**JavaScript Demo: Array.reduce()**

```Javascript
const array1 = [1, 2, 3, 4];
const reducer = (previousValue, currentValue) => previousValue + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15

```

**Syntax**

```Javascript
// Arrow function
reduce((previousValue, currentValue) => { ... } )
reduce((previousValue, currentValue, currentIndex) => { ... } )
reduce((previousValue, currentValue, currentIndex, array) => { ... } )
reduce((previousValue, currentValue, currentIndex, array) => { ... }, initialValue)

// Callback function
reduce(callbackFn)
reduce(callbackFn, initialValue)

// Inline callback function
reduce(function(previousValue, currentValue) { ... })
reduce(function(previousValue, currentValue, currentIndex) { ... })
reduce(function(previousValue, currentValue, currentIndex, array) { ... })
reduce(function(previousValue, currentValue, currentIndex, array) { ... }, initialValue)
```

### 🟨Task: How many years did all the inventors live?

```Javascript
// acc at any given point of time is the sum of all ages iterated until then. initial value is 0

const years = inventors.reduce((acc, inventor)=> acc + (inventor.passed -inventor.year), 0);

console.log(years)

// Expected output : Total= 861
```


### 🟨Task: Sort the inventors by years lived?

```Javascript
const oldest = inventors.sort(function(a,b) {
    const lastGuy = a.passed - a.year;
    const nextGuy = b.passed - b.year;
    if(lastGuy > nextGuy) {
        return -1;
    } else {
        return 1;
    }
}); 

console.table(oldest)
```
![4](https://github.com/Mitzelldone/JavaScript30/blob/main/The%2030%20Projects/04%20-%20Array%20Cardio%20Day%201/Images/4.img4.png)

## Exercise with map and filter

### 🟨Task: Create a list of Boulevards in Paris that contain 'de' anywhere in the name.

Use this webpage https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris.

Steps :

1. Select all the `<a>` elements under `div.mw-category` from the page.
2. Convert the NodeList into an array.
3. From the above array, get the array of names of the Boulevards.
4. Filter the ones with 'de' in it.

```Javascript
// -----------------Answer 1---------------------//
const category = document.querySelector('.mw-category');
const links = Array.from(category.querySelectorAll('a'));
const de = links
        .map(link => link.textContent)
        .filter(streetName => streetName.includes('de'));

console.log(de);

or

// -----------------Answer 2---------------------//
const blvd_with_de = Array.from(document.querySelectorAll('.mw-category a'))
      .map(({textContent}) => textContent)
      .filter((blvd) => blvd.includes('de'));

console.log(blvd_with_de);
```

## Sort exercise

### 🟨Task : Sort the people alphabetically by last name

In the comparision function, just split by `", "` and compare the first elements in the arrays, if p1's last name is greater than p2's last name, return 1 indicating that p1 is greater, else return -1 indicating that p2 is greater.

```Javascript
const sorted = people.sort((p1, p2) => {
    return p1.split(", ")[0] > p2.split(", ")[0]? 1: -1
})
console.table(sorted)
```
![5](https://github.com/Mitzelldone/JavaScript30/blob/main/The%2030%20Projects/04%20-%20Array%20Cardio%20Day%201/Images/4.img5.png)

## Reduce Excercise

### 🟨Task : Sum up the instances of each element in the following list. Basically return a object with the name and count of the words that appear in the list.

```Javascript
const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck', 'pogostick'];
```

**Solution**

```Javascript
const transport = data.reduce((countMap, elem) => {
    countMap[elem] = countMap[elem]? countMap[elem]+1 : 1
    return countMap
}, {})
```

Alternatively using forEach, which actually seems more well suited

```Javascript
trans = {}
data.forEach(elem => (trans[elem] = trans[elem]? trans[elem]+1 : 1) );
```

```
const transportation = data.reduce(function(obj, item) {
    if(!obj[item]) {
        obj[item] = 0;
    }
    obj[item]++;
    return obj;
},{});

console.table(transportation);
```
![6](https://github.com/Mitzelldone/JavaScript30/blob/main/The%2030%20Projects/04%20-%20Array%20Cardio%20Day%201/Images/4.img6.png)
