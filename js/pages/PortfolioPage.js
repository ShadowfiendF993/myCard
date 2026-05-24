import { BasePage } from './BasePage.js';
import { projects } from '../data/projects.js';
import { renderProjects } from '../utils/render.js';

export class PortfolioPage extends BasePage {
    constructor() {
        super();
        this.initFilters();
    }

    initFilters() {
        const searchInput = document.getElementById('project-search');
        const techSelect = document.getElementById('tech-filter');
        
        const filterAndRender = () => {
            const searchText = searchInput ? searchInput.value : '';
            const techValue = techSelect ? techSelect.value : '';
            renderProjects(projects, 'projects-container', searchText, techValue);
        };
        
        if (searchInput) searchInput.addEventListener('input', filterAndRender);
        if (techSelect) techSelect.addEventListener('change', filterAndRender);
        
        filterAndRender();
    }
}