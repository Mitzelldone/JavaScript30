# CSS Variables and JS
**DEMO:** [HERE](https://mitzelldone.github.io/JavaScript30/The%2030%20Projects/03%20-%20CSS%20Variables/index.html)

![demo](../03%20-%20CSS%20Variables/demo.PNG)

## Note
- CSS:

  1. Declare a new style for the `:root` element and declare three variables inside
    the style definition for `:root` with the same names as the `input` _HTML elements_.
    _CSS3 variables_ are declared in the following syntax format:
      ```CSS
      /* Two hyphens (--) followed by the variable name */

      :root {
        --base: #ffc600;
        --blur: 10px;
        --padding: 10px;
      }
      ```

  2. Declare a new style for the `img` element and set the `background`, `filter`, and
    `padding` properties to the variables we defined at the root element:
      ```CSS
      /* 'var(--variableName)' to use previously defined CSS properties */

      img {
        background: var(--base);
        filter: blur(var(--blur));
        padding: var(--padding);
      }
      ```

  3. Declare a new style for the `.hl` class and set the color to the `base` variable.
      ```
      .hl {
      	  color: var(--base);
      }
      ```
