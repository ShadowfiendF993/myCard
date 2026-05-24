export function initStats() {
    let totalVisits = parseInt(localStorage.getItem('total_visits') || '0');
    let totalTime = parseInt(localStorage.getItem('total_time_sec') || '0');
    
    if (!sessionStorage.getItem('session_active')) {
        totalVisits++;
        localStorage.setItem('total_visits', totalVisits);
        sessionStorage.setItem('session_active', 'true');
    }

    const statsPlate = document.createElement('div');
    statsPlate.className = 'stats-popup';
    const avgTime = totalVisits > 0 ? Math.round(totalTime / totalVisits) : 0;
    
    statsPlate.innerHTML = `
        <div class="stats-content">
            <p>Визитов: <strong>${totalVisits}</strong></p>
            <p>Среднее время: <strong>${avgTime} сек.</strong></p>
        </div>
        <button class="stats-close" title="Закрыть">&times;</button>
    `;
    
    document.body.appendChild(statsPlate);
    const closeBtn = statsPlate.querySelector('.stats-close');
    closeBtn.addEventListener('click', () => {
        statsPlate.classList.add('hidden-popup');
        setTimeout(() => statsPlate.remove(), 300);
    });

    const sessionStart = Date.now();
    window.addEventListener('beforeunload', () => {
        const sessionDuration = Math.floor((Date.now() - sessionStart) / 1000);
        localStorage.setItem('total_time_sec', totalTime + sessionDuration);
    });
}