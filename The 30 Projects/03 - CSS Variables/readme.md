# CSS Variables and JS
**DEMO:** [HERE](https://mitzelldone.github.io/JavaScript30/The%2030%20Projects/03%20-%20CSS%20Variables/index.html)

![demo](../03%20-%20CSS%20Variables/demo.PNG)

## Note
### CSS:

- Declare a new style for the `:root` element and declare three variables inside the style definition for `:root` with the same names as the `input` _HTML elements_.
 _CSS3 variables_ are declared in the following syntax format:
 
  ```CSS
  /* Two hyphens (--) followed by the variable name */

  :root {
    --base: #ffc600;
    --blur: 10px;
    --padding: 10px;
  }
  ```

- Declare a new style for the `img` element and set the `background`, `filter`, and
    `padding` properties to the variables we defined at the root element:
  ```CSS
  /* 'var(--variableName)' to use previously defined CSS properties */

  img {
    background: var(--base);
    filter: blur(var(--blur));
    padding: var(--padding);
  }
   ```

- Declare a new style for the `.hl` class and set the color to the `base` variable.
  ```
  .hl {
     color: var(--base);
  }
  ```
### JavaScript:

- Declare & define a variable as a reference to all of the inputs on the page.

     ```
     const inputs = document.querySelectorAll('.controls input');
     ```
      
- Iterate through the _HTML Node Elements_ that the variable is referencing and
    attach _event listeners_ to each one that will call on _handleUpdate_ whenever
    
    the input value has been changed (the `change` event).
     ```
     inputs.forEach(input => input.addEventListener('change',handleUpate));
     ```
- Repeat for mouse movements on the inputs instead of value
    changes (the `mousemove` event).
    
     ```
     inputs.forEach(input => input.addEventListener('mousemove',handleUpate));
     ```
#### Handling suffix with dataset

use `dataset` to deal with suffix `px` by adding `data-sizing: px` as an attribute on input element.

```
<input type="range" name="blur" min="0" max="25" value="10" data-sizing="px">
```

and the get the suffix by `dataset.sizing` via JS

```
const suffix = this.dataset.sizing || '';
```

and don't forget a condition with `|| ''` for `<input type=color>` which has no `px`.
      
    
