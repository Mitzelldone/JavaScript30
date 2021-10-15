//  get all of the inputs that we'll be working on with.
//  children of the 'inbox' class
const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]'); 

// Declare variable that will be defined later as the input that the user recently selected
let lastChecked;

//getting infomation when user check the box.
function handleCheck(e) { 

    let inBetween = false; 

    // Check if user had the shift key down
    // And check that if user is checking the box
    if(e.shiftKey && this.checked ) { 
        
        //loop over every single checkbox
        checkboxes.forEach(checkbox => {         
            if (checkbox === this || checkbox === lastChecked ) {
                inBetween = !inBetween; 
            }

            if(inBetween) {
                checkbox.checked = true;
            }
        });
    }
    lastChecked = this;
    //this is the one we click
}

// Add event listener to each input that will call multiCheck function on the 'click' event
//when someone click, run the fn handleCheck
checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck)); 