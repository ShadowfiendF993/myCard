export class Footer {
    constructor() {
        this.updateYear();
    }

    updateYear() {
        const footer = document.querySelector('#main-footer p');
        if (footer) {
            const year = new Date().getFullYear();
            footer.innerHTML = `&copy; ${year} Кирилл &nbsp;|&nbsp; Сделано с помощью &lt;html&gt; и &lt;CSS&gt;`;
        }
    }
}