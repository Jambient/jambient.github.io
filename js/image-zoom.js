let imageDisplays = document.getElementsByClassName('image-display')
let fullscreenModal = document.querySelector('.fullscreen-display')
let fullscreenModalImage = fullscreenModal.querySelector('img')
let fullscreenModalText = fullscreenModal.querySelector('p')


function updateFullscreenImageSize() {
    let imageToDisplay = fullscreenModalImage;
    let maxHeight = window.innerHeight * 0.8; // Set maximum height as 80% of the viewport height
    let maxWidth = window.innerWidth * 0.8; // Set maximum width as 80% of the viewport width

    let imageAspectRatio = imageToDisplay.naturalWidth / imageToDisplay.naturalHeight;
    let screenAspectRatio = maxWidth / maxHeight;

    if (imageAspectRatio > screenAspectRatio) {
        fullscreenModalImage.style.width = `${maxWidth}px`;
        fullscreenModalImage.style.height = `${maxWidth / imageAspectRatio}px`;
    } else {
        fullscreenModalImage.style.height = `${maxHeight}px`;
        fullscreenModalImage.style.width = `${maxHeight * imageAspectRatio}px`;
    }
}

for (let display of imageDisplays) {
    display.onclick = () => {
        let imageToDisplay = display.querySelector('.image');
        fullscreenModalImage.src = imageToDisplay.src;
        fullscreenModalText.innerHTML = display.querySelector('p').innerHTML;
        
        updateFullscreenImageSize();
        fullscreenModal.classList.remove('hide');
    }
}

window.onclick = function(event) {
    if (event.target == fullscreenModal) {
        fullscreenModal.classList.add('hide');
        // Reset styles for the fullscreen image
        fullscreenModalImage.style.width = '';
        fullscreenModalImage.style.height = '';
    }
}

// Event listener for window resize
window.addEventListener('resize', updateFullscreenImageSize);