import { THEME_KEY, DARK_CLASS, PHONE_REGEX, FIO_REGEX } from '../data/constants.js';

export function initTheme() {
    if (localStorage.getItem(THEME_KEY) === 'dark') {
        document.body.classList.add(DARK_CLASS);
    }
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle(DARK_CLASS);
            if (document.body.classList.contains(DARK_CLASS)) {
                localStorage.setItem(THEME_KEY, 'dark');
            } else {
                localStorage.setItem(THEME_KEY, 'light');
            }
        });
    }
}

export function animateValue(element) {
    if (!element) return;
    element.classList.add('value-updated');
    setTimeout(() => element.classList.remove('value-updated'), 200);
}

export function validateFIO(fio) {
    return FIO_REGEX.test(fio.trim());
}

export function validatePhone(phone) {
    return PHONE_REGEX.test(phone.trim());
}

export function parseFIO(fio) {
    const parts = fio.trim().split(/\s+/).filter(Boolean);
    return {
        surname: parts[0] || '—',
        name: parts[1] || '—',
        patronymic: parts[2] || '—'
    };
}

export function getGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Доброе утро';
    if (hour >= 12 && hour < 18) return 'Добрый день';
    if (hour >= 18 && hour < 23) return 'Добрый вечер';
    return 'Доброй ночи';
}