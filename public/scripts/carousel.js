// KEEP TRACK OF WHICH IMAGE IS SHOWING
let currentImgIndex = 0;
let previousImgIndex = 0;


// SELECT ALL IMAGE ELEMENTS
const images = document.getElementsByTagName('figure');

// CREATE A FUNCTION THAT WILL CYCLE THROUGH THE IMAGES, REGARDLESS OF WHICH BUTTONW AS PRESSED
function cycle(nextToPrevious) {
    // set the index of the previous image to the index of the image that is currently being shown
    previousImgIndex = currentImgIndex
    currentImgIndex = currentImgIndex + nextToPrevious
    // hide the previous image
    images[previousImgIndex].style.display = 'none';

    // check if the next image index exists in our images array
    if (currentImgIndex >= images.length) {
        // if the next image index does not exist, rest the index back to zero
        currentImgIndex = 0;
    } else if (currentImgIndex < 0) {
        // if the next image index does not exist, rest the index back to zero
        currentImgIndex = images.length + nextToPrevious;
    }
    // display the next image
    images[currentImgIndex].style.display = 'block'
}


// ADD EVENT LISTENER TO PREVIOUS BUTTON
const prev = document.querySelector('.prev')
prev.addEventListener('click', () => cycle(-1))


// ADD EVENT LISTENER TO NEXT BUTTON
const next = document.querySelector('.next')
next.addEventListener('click', () => cycle(1))