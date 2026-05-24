import { BasePage } from './BasePage.js';
import { getGreeting } from '../utils/helpers.js';

export class HomePage extends BasePage {
    constructor() {
        super();
        this.setGreeting();
    }

    setGreeting() {
        const greetingEl = document.getElementById('greeting-text');
        if (greetingEl) {
            greetingEl.textContent = getGreeting();
        }
    }
}