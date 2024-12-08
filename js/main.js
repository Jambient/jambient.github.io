mobileMenuButton = document.getElementById('mobile-menu-button')
mobileNavMenu = document.getElementById('mobile-nav-menu')

filterDropdownContainer = document.getElementById('filter-dropdown')
filterDropdownButton = filterDropdownContainer.querySelector('.dropdown-button')
filterDropdownContent = filterDropdownContainer.querySelector('.dropdown-content')
filterResultText = document.getElementById('filter-result-text')
projectsContainer = document.getElementById('projects')

body = document.querySelector('body')

isMobileNavMenuOpen = false
wasNavScrolled = false
isFilterDropdownOpen = false

function toggleMobileNavMenu() 
{
    if (!isMobileNavMenuOpen) {
        mobileMenuButton.classList.add("open")
        mobileNavMenu.classList.add("show")
        body.classList.add('fixed')
        wasNavScrolled = navbar.classList.contains('scrolled');
        navbar.classList.remove('scrolled');
    } else {
        mobileMenuButton.classList.remove("open")
        mobileNavMenu.classList.remove("show")
        body.classList.remove('fixed')
        if (wasNavScrolled)
        {
            navbar.classList.add('scrolled');
        }
    }

    isMobileNavMenuOpen = !isMobileNavMenuOpen
}

mobileMenuButton.onclick = toggleMobileNavMenu;

function toggleDropdown()
{
    if (!isFilterDropdownOpen)
    {
        filterDropdownContainer.classList.add('dropdown-open')
    } else
    {
        filterDropdownContainer.classList.remove('dropdown-open')
    }

    isFilterDropdownOpen = !isFilterDropdownOpen;
}
filterDropdownButton.onclick = toggleDropdown;

function filterGames()
{
    filterIds = []
    filterDropdownContent.querySelectorAll('input[type=checkbox]').forEach((checkbox) => {
        if (checkbox.checked)
        {
            filterIds.push(checkbox.id)
        }
    })

    visibleProjectCount = 0
    projects = projectsContainer.querySelectorAll('li')

    projects.forEach((element) => {
        visible = true
        for (const filterId of filterIds)
        {
            if (!element.classList.contains(filterId))
            {
                visible = false
                break
            }
        }

        if (visible)
        {
            visibleProjectCount += 1
            element.classList.remove('display-hide')
        }
        else
        {
            element.classList.add('display-hide')
        }
    })

    for (const project of projects)
    {
        project.classList.add('opacity-hide')
        project.classList.remove('visible')
        setTimeout(() =>
        {
            project.classList.remove('opacity-hide')
            project.classList.add('visible')
        }, 50)
    }

    filterResultText.innerHTML = `Showing ${visibleProjectCount} out of ${projects.length} projects`
}

filterDropdownContent.querySelectorAll('input[type=checkbox]').forEach((checkbox) => {
    checkbox.onclick = filterGames;
})

filterGames()

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

// move nav
const navbar = document.querySelector('nav');
const fixedClassThreshold = 100;

window.addEventListener('scroll', () => {
    if (window.scrollY > fixedClassThreshold) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});