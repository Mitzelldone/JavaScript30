// Declare a constant and define as an ARRAY of all items with a 'data-key'
const timeNodes = Array.from(document.querySelectorAll('[data-time]'));

// Turn NodeList into an array of actual time strings.
// I took the times nodes and i mapped it which means. 
//Array of list items into an array of strings.
const seconds = timeNodes
    .map(node => node.dataset.time)
    .map(timeCode => {
        const [mins, secs] = timeCode.split(':').map(parseFloat);
        return (mins * 60) + secs;
    })
    .reduce((total, vidSeconds) => total + vidSeconds);
    // console.log(seconds) = 17938

//running tally of seconds left.
let secondsLeft = seconds; // use let coz need to be reassign over and over
const hours = Math.floor(secondsLeft / 3600);
secondsLeft = secondsLeft % 3600; // % is how many are left after they've been evenly distributed

const mins = Math.floor(secondsLeft / 60);
secondsLeft = secondsLeft % 60; 

 
console.log("Playlist Total Time: " + (hours < 10 ? "0" + hours : hours) + ":" + (mins < 10 ? "0" + mins : mins) + ":" + (secondsLeft < 10 ? "0" + secondsLeft : secondsLeft));

    