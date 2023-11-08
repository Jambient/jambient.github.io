mobileMenuButton = document.getElementById('mobile-menu-button')
mobileNavMenu = document.getElementById('mobile-nav-menu')
mobileMenuCloseButton = document.getElementById('mobile-menu-close-button')
body = document.querySelector('body')

function showMobileNavMenu() {
    mobileNavMenu.classList.add("show")
    body.classList.add('fixed')
}
function hideMobileNavMenu() {
    mobileNavMenu.classList.remove("show")
    body.classList.remove('fixed')
}

mobileMenuButton.onclick = showMobileNavMenu;
mobileMenuCloseButton.onclick = hideMobileNavMenu;