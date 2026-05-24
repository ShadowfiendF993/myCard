import { initTheme } from '../utils/helpers.js';

export class Header {
    constructor() {
        this.initBurgerMenu();
        initTheme();
        this.highlightCurrentLink();
    }

    initBurgerMenu() {
        const menuToggle = document.getElementById('menu-toggle');
        const burgerIcon = document.querySelector('.burger-icon');
    }

    highlightCurrentLink() {
        const currentPath = window.location.pathname.split('/').pop();
        const links = document.querySelectorAll('.nav-link');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath) {
                link.classList.add('current');
            } else {
                link.classList.remove('current');
            }
        });
    }
}