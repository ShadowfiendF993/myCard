import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';
import { initStats } from './utils/storage.js';
import { HomePage } from './pages/HomePage.js';
import { AboutPage } from './pages/AboutPage.js';
import { SkillsPage } from './pages/SkillsPage.js';
import { PortfolioPage } from './pages/PortfolioPage.js';
import { ContactsPage } from './pages/ContactsPage.js';

document.addEventListener('DOMContentLoaded', () => {
    new Header();
    new Footer();
    initStats();

    const path = window.location.pathname.split('/').pop();
    let page = null;
    switch (path) {
        case 'index.html':
        case '':
            page = new HomePage();
            break;
        case 'about.html':
            page = new AboutPage();
            break;
        case 'skills.html':
            page = new SkillsPage();
            break;
        case 'portfolio.html':
            page = new PortfolioPage();
            break;
        case 'contacts.html':
            page = new ContactsPage();
            break;
        default:
            page = new HomePage();
    }
});