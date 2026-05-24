import { CURRENCY_RATES, CURRENCY_SYMBOLS } from '../data/constants.js';
import { animateValue } from '../utils/helpers.js';

export class CurrencyConverter {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        this.rubInput = this.container.querySelector('#rub-input');
        this.currencySelect = this.container.querySelector('#currency-select');
        this.resultSpan = this.container.querySelector('#currency-result');
        this.symbolSpan = this.container.querySelector('#currency-symbol');
        this.initEvents();
        this.updateCurrency();
    }

    initEvents() {
        this.rubInput.addEventListener('input', () => this.updateCurrency());
        this.currencySelect.addEventListener('change', () => this.updateCurrency());
    }

    updateCurrency() {
        const rub = parseFloat(this.rubInput.value) || 0;
        const currency = this.currencySelect.value;
        const rate = CURRENCY_RATES[currency];
        const result = (rub * rate).toFixed(2);
        this.resultSpan.textContent = result;
        this.symbolSpan.textContent = CURRENCY_SYMBOLS[currency];
        animateValue(this.resultSpan);
    }
}