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