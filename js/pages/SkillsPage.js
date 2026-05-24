import { BasePage } from './BasePage.js';
import { Calculator } from '../components/Calculator.js';
import { CurrencyConverter } from '../components/CurrencyConverter.js';
import { fetchGitHubRepos } from '../utils/api.js';
import { renderGitHubRepos } from '../utils/render.js';

export class SkillsPage extends BasePage {
    constructor() {
        super();
        this.initCalculator();
        this.initCurrencyConverter();
        this.initGitHubSearch();
    }

    initCalculator() {
        new Calculator('calculator-section');
    }

    initCurrencyConverter() {
        new CurrencyConverter('currency-section');
    }

    initGitHubSearch() {
        const searchInput = document.getElementById('github-username');
        const searchBtn = document.getElementById('github-search-btn');
        const container = document.getElementById('github-repos-container');

        if (!searchInput || !searchBtn || !container) return;

        const performSearch = async () => {
            const username = searchInput.value.trim();
            if (!username) {
                renderGitHubRepos([], container, 'Введите имя пользователя GitHub');
                return;
            }
            container.innerHTML = '<div class="loading">Загрузка репозиториев...</div>';
            try {
                const repos = await fetchGitHubRepos(username);
                if (repos.length === 0) {
                    renderGitHubRepos([], container, 'У этого пользователя нет публичных репозиториев');
                } else {
                    renderGitHubRepos(repos, container);
                }
            } catch (error) {
                renderGitHubRepos([], container, error.message);
            }
        };

        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }
}