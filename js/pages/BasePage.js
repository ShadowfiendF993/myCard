export class BasePage {
    constructor() {
        this.modal = null;
        this.initModal();
    }

    initModal() {
        this.modal = document.getElementById('myModal');
        if (!this.modal) return;
        const closeBtn = this.modal.querySelector('.close-modal');
        closeBtn?.addEventListener('click', () => this.hideModal());
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) this.hideModal();
        });
    }

    showModal(title, text) {
        if (!this.modal) {
            alert(`${title}: ${text}`);
            return;
        }
        document.getElementById('modal-title').innerText = title;
        document.getElementById('modal-text').innerText = text;
        this.modal.classList.remove('hidden');
    }

    hideModal() {
        this.modal?.classList.add('hidden');
    }
}