function updateFadeElements() 
{
    var pageBottom = window.outerHeight;
    var elements = document.getElementsByClassName('fadeIn');

    for (let element of elements) {
        const rect = element.getBoundingClientRect();
        if (rect.top < pageBottom) {
            element.classList.add('visible')
        }
    }
}
document.onscroll = updateFadeElements
updateFadeElements();