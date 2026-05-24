import { animateValue } from '../utils/helpers.js';

export class Calculator {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        this.n1 = this.container.querySelector('#calc-n1');
        this.n2 = this.container.querySelector('#calc-n2');
        this.resultSpan = this.container.querySelector('#calc-result');
        this.opVisual = this.container.querySelector('#calc-op-visual');
        this.initButtons();
    }

    initButtons() {
        const buttons = this.container.querySelectorAll('.btn-op');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const op = btn.getAttribute('data-op') || btn.textContent;
                this.calculate(op);
            });
        });
        const clearBtn = this.container.querySelector('.btn-text-only');
        if (clearBtn) clearBtn.addEventListener('click', () => this.clear());
    }

    calculate(operator) {
        let n1Val = parseFloat(this.n1.value);
        let n2Val = parseFloat(this.n2.value);
        this.opVisual.textContent = operator;

        if (isNaN(n1Val) || isNaN(n2Val)) {
            this.resultSpan.textContent = '0';
            return;
        }

        let result;
        switch (operator) {
            case '+': result = n1Val + n2Val; break;
            case '-': result = n1Val - n2Val; break; 
            case '*': result = n1Val * n2Val; break;
            case '÷': result = n2Val !== 0 ? (n1Val / n2Val) : null; break;
            default: result = 0;
        }

        if (result === null || !isFinite(result)) {
            this.resultSpan.textContent = 'Ошибка';
            animateValue(this.resultSpan);
            return;
        }

        let formattedResult;
        if (Math.abs(result) > 1e12) {
            formattedResult = result.toExponential(4);
        } else if (Number.isInteger(result)) {
            formattedResult = result.toString();
        } else {
            formattedResult = result.toFixed(2);
        }

        this.resultSpan.textContent = formattedResult;
        animateValue(this.resultSpan);
    }

    clear() {
        this.n1.value = '';
        this.n2.value = '';
        this.resultSpan.textContent = '0';
        this.opVisual.textContent = '?';
    }
}