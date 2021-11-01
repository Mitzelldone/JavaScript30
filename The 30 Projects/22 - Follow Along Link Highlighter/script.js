const highlight = document.createElement('span');
highlight.classList.add('highlight');
document.body.append(highlight); //put it into the DOM

const triggers = document.querySelectorAll('a')
triggers.forEach(a => a.addEventListener('mouseenter', highlightLink))

function highlightLink() {
    // console.log('Highlight!!');
    const linkCoords = this.getBoundingClientRect();
    console.log(linkCoords);
    const coords = {
        //width and height are absolute
        width: linkCoords.width,
        height: linkCoords.height,

        // we need to add scroll since 
        //top,left are relative to the viewport
        top: linkCoords.top + window.scrollY,
        left: linkCoords.left + window.scrollX
    };

    highlight.style.width = `${coords.width}px`;
    highlight.style.height = `${coords.height}px`;
    highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
}

