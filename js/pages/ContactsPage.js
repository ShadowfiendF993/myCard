import { BasePage } from './BasePage.js';
import { validateFIO, validatePhone, parseFIO } from '../utils/helpers.js';

export class ContactsPage extends BasePage {
    constructor() {
        super();
        this.initForm();
        this.initPhotoPreview();
    }

    initForm() {
        const form = document.getElementById('feedback-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const fioInput = document.getElementById('user-fio');
            const fio = fioInput.value.trim();
            if (!validateFIO(fio)) {
                this.showModal('Ошибка', 'В ФИО только буквы.');
                fioInput.value = '';
                fioInput.focus();
                return;
            }

            const phoneInput = document.getElementById('user-phone');
            const phone = phoneInput.value.trim();
            if (!validatePhone(phone)) {
                this.showModal('Ошибка', 'Неверный телефон.');
                phoneInput.value = '';
                phoneInput.focus();
                return;
            }

            const dateInput = document.getElementById('contact-date');
            const dateValue = dateInput.value;
            if (!dateValue) {
                this.showModal('Ошибка', 'Выберите дату.');
                dateInput.value = '';
                dateInput.focus();
                return;
            }

            const selectedDate = new Date(dateValue);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today) {
                this.showModal('Ошибка', 'Желаемая дата не может быть в прошлом!');
                dateInput.value = '';
                dateInput.focus();
                return;
            }

            const { surname, name, patronymic } = parseFIO(fio);
            const outputDiv = document.getElementById('fio-output');
            if (outputDiv) {
                outputDiv.classList.remove('hidden');
                document.getElementById('res-surname').innerText = `Фамилия: ${surname}`;
                document.getElementById('res-name').innerText = `Имя: ${name}`;
                document.getElementById('res-patronymic').innerText = `Отчество: ${patronymic}`;
                document.getElementById('res-phone').innerText = `Телефон: ${phone}`;
                const [year, month, day] = dateValue.split('-');
                const displayDate = `${day}.${month}.${year}`;
                document.getElementById('res-date').innerText = `Дата связи: ${displayDate}`;
            }
            this.showModal('Успех', 'Данные формы приняты!');
        });
    }

    initPhotoPreview() {
        const photoInput = document.getElementById('user-photo');
        const preview = document.getElementById('photo-preview');
        if (photoInput && preview) {
            photoInput.addEventListener('change', () => {
                const file = photoInput.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        preview.innerHTML = `<img src="${e.target.result}" class="thumb-preview">`;
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    }
}