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

// document.onmousemove = handleMouseMove;

// function handleMouseMove(event) {
//     var eventDoc, doc, body;
//     event = event || window.event; // IE-ism

//     // If pageX/Y aren't available and clientX/Y are,
//     // calculate pageX/Y - logic taken from jQuery.
//     // (This is to support old IE)
//     if (event.pageX == null && event.clientX != null) {
//         eventDoc = (event.target && event.target.ownerDocument) || document;
//         doc = eventDoc.documentElement;
//         body = eventDoc.body;

//         event.pageX = event.clientX +
//             (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
//             (doc && doc.clientLeft || body && body.clientLeft || 0);
//         event.pageY = event.clientY +
//             (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
//             (doc && doc.clientTop  || body && body.clientTop  || 0 );
//     }

//     console.log(event.clientX, event.clientY)
// }

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