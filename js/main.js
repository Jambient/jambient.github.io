mobileMenuButton = document.getElementById('mobile-menu-button')
mobileNavMenu = document.getElementById('mobile-nav-menu')
body = document.querySelector('body')

isMobileNavMenuOpen = false

function toggleMobileNavMenu() {
    if (!isMobileNavMenuOpen) {
        mobileMenuButton.classList.add("open")
        mobileNavMenu.classList.add("show")
        body.classList.add('fixed')
    } else {
        mobileMenuButton.classList.remove("open")
        mobileNavMenu.classList.remove("show")
        body.classList.remove('fixed')
    }

    isMobileNavMenuOpen = !isMobileNavMenuOpen
}

mobileMenuButton.onclick = toggleMobileNavMenu;

// set up special letters
specialLetterGroups = document.getElementsByClassName('special-letters')

for (let letterGroup of specialLetterGroups) {
    console.log(letterGroup)
}

function updateFadeElements() {
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