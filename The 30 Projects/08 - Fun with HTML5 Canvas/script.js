// Declare & define variable reference to canvas HTMLElement
const canvas = document.querySelector('#draw');
canvas.width = window.innerWidth;  // Width matches the available window width
canvas.height = window.innerHeight;  // Height matches the available window height

// Declare & define variable reference to the CONTEXT of the canvas
const ctx = canvas.getContext('2d');
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round'; // Intersecting/connected lines will have a smooth join
ctx.lineCap = 'round'; // End of line will be smooth
ctx.lineWidth = 50;


let isDrawing = false; // When true, moving the mouse draws on the canvas
// Declare & define variable reference for current & last mouse location (x,y)
let lastX = 0;
let lastY = 0;
let hue = 0;  // Declare & define variables to change line hue
let direction = true;

function draw(e) {
    if (!isDrawing) return;      //stop the fn from running when they are not moused down.
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`; // Set hue, saturation, & luminosity
    ctx.beginPath();            // start from
    ctx.moveTo(lastX,lastY);    // go to
    ctx.lineTo(e.offsetX, e.offsetY); //User mouse location.
    ctx.stroke();  // Draw the defined path on the canvas
    [lastX, lastY] = [e.offsetX, e.offsetY]; //MDN: Destructuring assingment 

    // to reset/increase hue value
    hue++;
    if(hue >= 360) {
        hue = 0;
    }
    
    // Width of line increases or decreases, staying within a value of 5-50. 
    if(ctx.lineWidth >= 50 || ctx.lineWidth <= 5) {
        direction = !direction;
    }
    // to increase/decrease line width
    if(direction) { 
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    }
  
}

// mousemove Event Handler function

 // Update values based on previous & current mouse locations 
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY]; // array destructuring
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
