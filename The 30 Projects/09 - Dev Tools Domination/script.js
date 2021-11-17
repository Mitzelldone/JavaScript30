const dogs = [{ name: 'Snickers', age: 2 }, { name: 'hugo', age: 8 }];

function makeGreen() {
  const p = document.querySelector('p');
  p.style.color = '#BADA55';
  p.style.fontSize = '50px';
}

/*1. In Chrome dev tools, go to the 'elements' tab and right-click the
 'p' HTML tag. Select 'break on > attribute removal`. This places
 a break point in the console debugger if any attribute for the
 targeted element is changed. If we click on the 'p' tag (which will
 trigger the makeGreen() function), the color attribute is changed,
 at which point the browser will PAUSE the program and highlight 
 the line of code which triggered the break point.
 To remove the break point, navigate back to the 'elements' tag,
 right click the 'p' tag, and uncheck the 'break on > attribute removal'
 option.
 WOOO BROWSER DEBUGGING!
*/

//2. Regular
console.log('Hello World')

//3. Interpolated 
  //a. Dynamically update the string value logged out using %s
  let testInterpolated = '💩' ;
  console.log('Hello I am a %s string!', testInterpolated );

  //b. Interpolation using ES6 template strings
  console.log(`Testing ES6 interpolation: ${testInterpolated} `);

//4. Styled - Apply styling to a log event using %c
console.log('%c I am some styled text.', 'font-size:50px; background:peru; text-shadow: 10px 10px 0 black')

//5. warning! - Displays a log event preceded with a caution sign
console.warn('nooOOO! - This is a warning!')

//6. Error - Displays a log event highlighted in red with an 'x'
console.error('This is an error display!')

//7. Info - Displays a log event preceded by an 'i'
// Wont work on chrome btw
console.info('Crocodile eat 3-4 people per year');


//8. Testing
// only fire when something is wrong.
console.assert(1 === 1, 'That is correct');
console.assert(1 === 2, 'That is wrong ');

const p = document.querySelector('p');
console.assert(p.classList.contains('expected-class-name'), 'NOPE!');


//9. clearing -  Clear all previously outputted console events
  // console.clear();

//10. Viewing DOM Elements
console.log(p); // Standard console log event
console.dir(p); // Logs out an interactive list of properties for a given object

//11. Grouping together - Log out related information in a collapsible group
dogs.forEach(dog => {
  console.group(`${dog.name}`);
  console.log(`This is a ${dog.name}`)
  console.log(`${dog.name} is ${dog.age} years old`);
  console.log(`${dog.name} is ${dog.age * 7} dog years old`);
  console.groupEnd(`${dog.name}`);
});

//12. counting
// Count - Log out a given statement followed by a colon + the amount of times ,exp: Don:1

console.count('Don');
console.count('Don');
console.count('Don');
console.count('Jon');
console.count('Don');
console.count('Don');
console.count('Don');
console.count('Jon');
console.count('Don');

//13. timing - Logs out the time taken to perform a given action.
console.time('fetching data timer'); // Label for timer
fetch('https://api.github.com/users/mitzelldone')
  .then(data => data.json())
  .then(data => {
    console.timeEnd('fetching data timer');
    console.log(data);
  });
  
//14. table - Log out array/object data in a table format
console.table(dogs);

  // Provide properties to be displayed in the table as an array of string values 
  // corresponding with property names
console.table(dogs, ["age"]);   

