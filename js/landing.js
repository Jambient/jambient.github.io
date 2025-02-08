mobileMenuButton = document.getElementById('mobile-menu-button')
mobileNavMenu = document.getElementById('mobile-nav-menu')
projectsContainer = document.getElementById('projects')
showMoreBtn = document.getElementById('show-more-btn')
showingMore = false

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

function toggleShowMore()
{
    projects = projectsContainer.querySelectorAll('li')

    if (showingMore)
    {
        showMoreBtn.innerHTML = "Show More"
    }
    else
    {
        showMoreBtn.innerHTML = "Show Less"
    }

    for (const project of projects)
    {
        if (!project.classList.contains("filter-highlighted"))
        {
            if (showingMore)
            {
                project.classList.add('display-hide')
            }
            else
            {
                project.classList.remove('display-hide')
            }

            project.classList.add('opacity-hide')
            project.classList.remove('visible')
            setTimeout(() =>
            {
                project.classList.remove('opacity-hide')
                project.classList.add('visible')
            }, 50)
        }
    }

    showingMore = !showingMore
}

showingMore = true
toggleShowMore()

showMoreBtn.onclick = toggleShowMore