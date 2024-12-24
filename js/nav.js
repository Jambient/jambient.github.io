const navbar = document.querySelector('nav');
const fixedClassThreshold = 100;

window.addEventListener('scroll', () => {
    if (window.scrollY > fixedClassThreshold) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});