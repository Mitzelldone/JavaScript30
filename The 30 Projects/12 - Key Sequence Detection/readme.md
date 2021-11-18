# Key Sequence Detection 🦄

## 🟥DEMO: [HERE](https://mitzelldone.github.io/JavaScript30/The%2030%20Projects/12%20-%20Key%20Sequence%20Detection/index.html)

![demo](https://github.com/Mitzelldone/JavaScript30/blob/main/The%2030%20Projects/images/12.demo.png)

---

_( **Note**: Type "yolo" and unicorn will pop up )_

## Konami Code

The Konami Code is a sequence of keystrokes that allows players to enable special features in video games made by the Japanese company Konami.

Similarly, we can embed specific code(combination of keys) in our website which when entered through key press trigger some event in our web page.

_Note: Press keys Up, Up, Down, Down, Left, Right, Left, Right, B, A_

There are several websites which hold this hidden code, some of them are:

1. https://www.analyticsmania.com/google-tag-manager-recipes/rick-roll/
2. https://kuppiya.com/
3. http://nikdaum.com/
4. https://www.buzzfeed.com/

## Javascript

There's a script tag in the document header that loads a JavaScript file from [Cornify.js](https://www.cornify.com/) library which will inject an image of a unicorn🦄 into the DOM and a p element on the bottom of the page if we call `cornify_add()`.

```HTML
<script type="text/javascript" src="https://www.cornify.com/js/cornify.js"></script>
```

The idea is to trigger an action when a particular key sequence is pressed.

**Steps:**

1. Store the code, get the length of the code (n).
2. Have an array that records the last n keys pressed.
3. When the characters in the array matches the secret code, trigger the action.

```JavaSCript
//this is the array
const pressed = [];

//the secret code
const secretCode = 'yolo';

window.addEventListener('keyup', (e) => {
  // e.key is the key is the key pressed, add it to the array
  pressed.push(e.key);

  // cut the array to the size of secretCode.length from the end of the array
  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);

  //convert array into string, see if it is the secretCode
  //.join() to turn the array into a string
  if (pressed.join('').includes(secretCode)) {
    //take action
    cornify_add();
  }
});
```
