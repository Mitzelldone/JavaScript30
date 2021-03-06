// start with strings, numbers and booleans
console.log("%c==strings, numbers and booleans==", "background-color:#d0996b;color:white");
let age = 100;
let age2 = age;
console.log(age, age2);  
age = 200;
console.log(age, age2); 

let name = 'Donn';
let name2 = name;
console.log(name, name2); 
name = 'Mitzelldone';
console.log(name, name2); 

// Let's say we have an array
console.log("%c==array reference==", "background-color:#d0996b;color:white");
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];

// and we want to make a copy of it.
const team = players;
console.log(players, team);

// You might think we can just do something like this:
team[3]= 'Lux';
console.log(players,team)
// however what happens when we update that array?
//    - Players is the reference array. Any updated array will effect the reference/original array.

// now here is the problem!
// oh no - we have edited the original array too!
// Why? It's because that is an array reference, not an array copy. They both point to the same array!

// So, how do we fix this? We take a copy instead!

// 1 - one way
const team2 = players.slice(); //copy the original array 

// 2 - or create a new array and concat the old one in
const team3 = [].concat(players);

// 3 - or use the new ES6 Spread
console.log("%c---use ES6 spread syntax", "background-color:#d0996b;color:white");
const team4 = [...players];
team4[3] = 'heee hawww';
console.log(team4);

const team5 = Array.from(players);

// now when we update it, the original one isn't changed


// The same thing goes for objects, let's say we have a person object

// with Objects
console.log("%c==Objects==", "background-color:#d0996b;color:white");
const person = {
name: 'Wes Bos',
age: 80
};

// and think we make a copy:
const captain = person;
captain.number = 99;

console.log(person)

// how do we take a copy instead?
console.log("%c---Real ways  to Copy an Objects", "background-color:#d0996b;color:white");
const cap2 = Object.assign({}, person, { number: 99, age: 12});  

// we'd take a blank object, we overwrite or we fold in all of the properties and values from our object, and then we use the third argument to fold in our own ones (which is cap2)
console.log(cap2);

// We will hopefully soon see the object ...spread
// const cap3 = {...person};

// Things to note - this is only 1 level deep - both for Arrays and Objects. lodash has a cloneDeep method, but you should think twice before using it.

const wes = {
name: 'Wes',
age: 100,
social: {
  twitter: '@wesbos',
  facebook: 'wesbos.developer'
}
}

console.log(wes);

const dev = Object.assign({}, wes);

//other ways
const dev2 = JSON.parse(JSON.stringify(wes));
