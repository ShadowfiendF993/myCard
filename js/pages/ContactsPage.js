import { BasePage } from './BasePage.js';
import { validateFIO, validatePhone, parseFIO } from '../utils/helpers.js';

export class ContactsPage extends BasePage {
    constructor() {
        super();
        this.initForm();
        this.initPhotoPreview();
        this.initDateRestriction();
    }

    initForm() {
        const form = document.getElementById('feedback-form');
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const fio = document.getElementById('user-fio').value.trim();
            const phone = document.getElementById('user-phone').value.trim();
            const date = document.getElementById('contact-date').value;
            
            if (!validateFIO(fio)) return this.showModal('Ошибка', 'В ФИО только буквы.');
            if (!validatePhone(phone)) return this.showModal('Ошибка', 'Неверный телефон.');
            if (!date) return this.showModal('Ошибка', 'Выберите дату.');
            
            const { surname, name, patronymic } = parseFIO(fio);
            const outputDiv = document.getElementById('fio-output');
            if (outputDiv) {
                outputDiv.classList.remove('hidden');
                document.getElementById('res-surname').innerText = `Фамилия: ${surname}`;
                document.getElementById('res-name').innerText = `Имя: ${name}`;
                document.getElementById('res-patronymic').innerText = `Отчество: ${patronymic}`;
                document.getElementById('res-phone').innerText = `Телефон: ${phone}`;
                document.getElementById('res-date').innerText = `Дата связи: ${date}`;
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

    initDateRestriction() {
        const dateInput = document.getElementById('contact-date');
        if (dateInput) {
            dateInput.addEventListener('input', () => {
                const selected = new Date(dateInput.value);
                const today = new Date();
                today.setHours(0,0,0,0);
                if (selected < today) {
                    this.showModal('Ошибка', 'Желаемая дата не может быть в прошлом!');
                    dateInput.value = '';
                }
            });
        }
    }
}