// ─── GRAPHIQUE RADAR ──────────────────────────────────────────────────────
const ctx = document.getElementById('statsChart').getContext('2d');

// Stats de base Astrologue
const baseStats = {
    FOR: -3,
    CST: -3,
    DEX: -1,
    INT: 3,
    SAG: 3,
    PER: 2,
    CHA: -1
};

// Bonus par Origine
const originBonuses = {
    'origin-solaire':       { SAG: 4, CHA: 2 },
    'origin-lunaire':       { SAG: 2, PER: 2, DEX: 2 },
    'origin-constellation': { SAG: 3, PER: 2, INT: 1 },
    'origin-gravite':       { INT: 3, CST: 4, PER: 1 },  // CST: -3 → +1
    'origin-stellaire':     { PER: 3, SAG: 2, DEX: 1 }
};

const originNames = {
    'origin-solaire':       'Adepte Solaire',
    'origin-lunaire':       'Adepte de la Lune',
    'origin-constellation': 'Adepte des Constellations',
    'origin-gravite':       'Adepte de la Gravité',
    'origin-stellaire':     'Adepte Stellaire'
};

let currentOrigin = null;

function calculateStats(origin) {
    const s = { ...baseStats };
    if (origin && originBonuses[origin]) {
        for (const [k, v] of Object.entries(originBonuses[origin])) {
            s[k] += v;
        }
    }
    return s;
}

// offset +4 pour centrer 0
function toChartData(stats) {
    return Object.values(stats).map(v => v + 4);
}

const statsChart = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: ['FOR', 'CST', 'DEX', 'INT', 'SAG', 'PER', 'CHA'],
        datasets: [{
            label: 'Caractéristiques',
            data: toChartData(baseStats),
            backgroundColor: 'rgba(122, 95, 216, 0.20)',
            borderColor:     'rgba(122, 95, 216, 0.9)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(155, 125, 232, 1)',
            pointBorderColor:     'rgba(244, 213, 141, 0.9)',
            pointHoverBackgroundColor: '#9b7de8',
            pointHoverBorderColor:     'rgba(244, 213, 141, 1)',
            pointRadius: 5,
            pointHoverRadius: 7
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        animation: { duration: 700, easing: 'easeInOutQuart' },
        scales: {
            r: {
                min: 0, max: 10,
                backgroundColor: 'rgba(5, 3, 8, 0.7)',
                ticks: {
                    stepSize: 2,
                    callback: v => v - 4,
                    color: '#9b7de8',
                    backdropColor: 'rgba(5, 3, 8, 0.9)',
                    font: { size: 11, weight: 'bold' }
                },
                grid:        { color: 'rgba(122, 95, 216, 0.3)', circular: true },
                angleLines:  { color: 'rgba(122, 95, 216, 0.3)' },
                pointLabels: {
                    color: '#c0d8e8',
                    font: { size: 14, weight: 'bold', family: "'Cinzel', serif" }
                }
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(5, 3, 8, 0.95)',
                titleColor: '#f4d58d',
                bodyColor:  '#e8e4f0',
                borderColor: 'rgba(122, 95, 216, 0.8)',
                borderWidth: 2,
                callbacks: {
                    label: ctx => {
                        const v = ctx.parsed.r - 4;
                        return ctx.label + ': ' + (v >= 0 ? '+' : '') + v;
                    }
                }
            }
        }
    }
});

// ─── INTERACTIVITÉ ORIGINES ───────────────────────────────────────────────
function updateChart(origin) {
    statsChart.data.datasets[0].data = toChartData(calculateStats(origin));
    statsChart.update();
    currentOrigin = origin;
    updateSelection(origin);
    updateDisplay(origin);
}

function updateSelection(origin) {
    document.querySelectorAll('.origin-card').forEach(c => c.classList.remove('selected'));
    if (origin) {
        const card = document.querySelector(`.origin-card.${origin}`);
        if (card) {
            card.classList.add('selected');
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

function updateDisplay(origin) {
    const el = document.getElementById('origin-display');
    if (!el) return;

    if (origin) {
        const bonuses = originBonuses[origin];
        const parts = Object.entries(bonuses).map(([k, v]) => `${k} ${v >= 0 ? '+' : ''}${v}`);
        el.innerHTML =
            `<strong>Origine sélectionnée :</strong> ${originNames[origin]}<br>
             <strong>Gains appliqués :</strong> ${parts.join(' · ')}`;
        el.style.display = 'block';
    } else {
        el.innerHTML = '<strong>Aucune origine sélectionnée</strong> — Stats de base';
        el.style.display = 'block';
    }
}

// ─── INIT ────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const originKeys = Object.keys(originBonuses);

    document.querySelectorAll('.origin-card').forEach(card => {
        card.addEventListener('click', () => {
            const key = Array.from(card.classList).find(c => originKeys.includes(c));
            if (!key) return;
            updateChart(currentOrigin === key ? null : key);
        });
    });

    // Créer l'indicateur sous le graphique
    const chartContainer = document.querySelector('.chart-container');
    if (chartContainer) {
        const div = document.createElement('div');
        div.id = 'origin-display';
        div.style.cssText = `
            margin-top: 18px; padding: 13px 16px;
            background: linear-gradient(135deg, rgba(122, 95, 216, 0.20), rgba(138, 180, 216, 0.15));
            border: 1px solid rgba(122, 95, 216, 0.4);
            border-radius: 6px;
            text-align: center; font-size: 0.92rem;
            color: #9b7de8; display: none;
            line-height: 1.6;
            box-shadow: inset 0 1px 0 rgba(155, 125, 232, 0.1), 0 2px 8px rgba(0, 0, 0, 0.4);
        `;
        chartContainer.appendChild(div);
    }

    // ─── ÉTOILES ANIMÉES ──────────────────────────────────────────────────
    const starsEl = document.getElementById('stars');
    if (!starsEl) return;

    const starCount = 120;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 2.5 + 0.5;
        const duration = Math.random() * 4 + 2;
        const delay = Math.random() * 5;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const opacity = Math.random() * 0.6 + 0.2;

        star.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(244, 213, 141, ${opacity}) 0%, transparent 70%);
            left: ${left}%;
            top: ${top}%;
            border-radius: 50%;
            animation: starTwinkle ${duration}s ${delay}s ease-in-out infinite;
            pointer-events: none;
        `;
        starsEl.appendChild(star);
    }

    // Quelques étoiles plus brillantes (constellations)
    for (let i = 0; i < 15; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 3 + 1.5;
        const delay = Math.random() * 3;
        const left = Math.random() * 100;
        const top = Math.random() * 100;

        star.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(192, 216, 232, 0.9) 0%, transparent 60%);
            left: ${left}%;
            top: ${top}%;
            border-radius: 50%;
            animation: starPulse ${duration}s ${delay}s ease-in-out infinite;
            pointer-events: none;
            box-shadow: 0 0 ${size * 2}px rgba(192, 216, 232, 0.6);
        `;
        starsEl.appendChild(star);
    }

    // Injecter les animations si pas déjà présentes
    if (!document.getElementById('star-keyframes')) {
        const style = document.createElement('style');
        style.id = 'star-keyframes';
        style.textContent = `
            @keyframes starTwinkle {
                0%, 100% { opacity: 0.2; transform: scale(1); }
                50% { opacity: 0.8; transform: scale(1.2); }
            }
            @keyframes starPulse {
                0%, 100% { opacity: 0.6; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.4); }
            }
        `;
        document.head.appendChild(style);
    }
});