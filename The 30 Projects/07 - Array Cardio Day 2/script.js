// ## Array Cardio Day 2

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


// ( Q1.) Array.prototype.some() // is at least one person 19 or older?

    // const isAdult = people.some(function(person) {
    //     const currentYear = (new Date()).getFullYear();
    //     if(currentYear - person.year >= 19) {
    //         return true;
    //     }
    // });

    // const isAdult = people.some(person => {
    //     const currentYear = (new Date()).getFullYear();
    //     return currentYear - person.year >= 19;
    // });

    const isAdult = people.some(person => ((new Date()).getFullYear()) - person.year >= 19);
    console.log({isAdult});

//  ( Q2.) Array.prototype.every() // is everyone 19 or older?

    const allAdults = people.every(person => ((new Date()).getFullYear()) - person.year >= 19);
    console.log({allAdults});
  
//  ( Q3.) Array.prototype.find() 
//  Find is like filter, but instead returning you a subset of the array, it's going to return you the first item that it finds.
//  Find the comment with the ID of 823423.

    // const comment = comments.find(function(comment) {
    //     if(comment.id === 823423) {
    //         return true;
    //     }
    // });

    const comment = comments.find(comment => comment.id === 823423);
    console.log(comment)

  
// ( Q4.) Array.prototype.findIndex()
// Find the comment with this ID of 823423

    const index = comments.findIndex(comment => comment.id === 823423);
    console.log({index});

// ( Q5.) delete the comment with the ID of 823423

    // delete method 1 - will change content of the origin array
    // comments.splice(index, 1);

    // delete method 2 - will create a new array, and not change content of origin array
    // ↓ create a new array and use ES6 syntax
        const newComments = [ 
            ...comments.slice(0, index),
            ...comments.slice(index + 1)
        ];
        console.table(comments);
        console.log("Delete the comment with the ID of 823423");
        console.table(newComments);

