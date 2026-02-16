// ─── GRAPHIQUE RADAR ──────────────────────────────────────────────────────
const ctx = document.getElementById('statsChart').getContext('2d');

// Stats de base Pati-mage
const baseStats = {
    FOR: -2,
    CST: 0,
    DEX: 3,
    INT: 4,
    SAG: 1,
    PER: 3,
    CHA: -2
};

// Bonus par Origine
const originBonuses = {
    'origin-confiseur':    { SAG: 3, PER: 2 },
    'origin-patissier':    { PER: 3, INT: 2 },
    'origin-apothi':       { INT: 3, DEX: 2 },
    'origin-sucrier':      { CHA: 3, SAG: 2 },
    'origin-aromaturge':   { PER: 3, SAG: 2 },
    'origin-cuisto':       { DEX: 3, PER: 2 }
};

const originNames = {
    'origin-confiseur':    'Confiseur de Pouvoir',
    'origin-patissier':    'Pâtissier de Rupture',
    'origin-apothi':       'Apothi-Gourmand',
    'origin-sucrier':      'Sucrier Envoûtant',
    'origin-aromaturge':   'Aromaturge de Combat',
    'origin-cuisto':       'Cuisto Aventurier'
};

let currentOrigin = null;

function calculateStats(origin) {
    const s = { ...baseStats };
    if (origin && originBonuses[origin]) {
        for (const [k, v] of Object.entries(originBonuses[origin])) {
            s[k] = (s[k] || 0) + v;
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
            backgroundColor: 'rgba(200, 168, 120, 0.20)',
            borderColor:     'rgba(200, 168, 120, 0.9)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(232, 200, 120, 1)',
            pointBorderColor:     'rgba(232, 168, 184, 0.9)',
            pointHoverBackgroundColor: '#d8b888',
            pointHoverBorderColor:     'rgba(232, 168, 184, 1)',
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
                backgroundColor: 'rgba(42, 24, 8, 0.8)',
                ticks: {
                    stepSize: 2,
                    callback: v => v - 4,
                    color: '#c8a878',
                    backdropColor: 'rgba(42, 24, 8, 0.95)',
                    font: { size: 11, weight: 'bold' }
                },
                grid:        { color: 'rgba(200, 168, 120, 0.3)', circular: true },
                angleLines:  { color: 'rgba(200, 168, 120, 0.3)' },
                pointLabels: {
                    color: '#f4e4d4',
                    font: { size: 14, weight: 'bold', family: "'Cinzel', serif" }
                }
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(42, 24, 8, 0.95)',
                titleColor: '#e8c878',
                bodyColor:  '#f8e8d8',
                borderColor: 'rgba(200, 168, 120, 0.8)',
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
            background: linear-gradient(135deg, rgba(200, 168, 120, 0.20), rgba(232, 168, 184, 0.18));
            border: 1px solid rgba(200, 168, 120, 0.4);
            border-radius: 6px;
            text-align: center; font-size: 0.92rem;
            color: #c8a878; display: none;
            line-height: 1.6;
            box-shadow: inset 0 1px 0 rgba(216, 184, 136, 0.1), 0 2px 8px rgba(0, 0, 0, 0.4);
        `;
        chartContainer.appendChild(div);
    }

    // ─── PAILLETTES SUCRÉES ───────────────────────────────────────────────
    const sparklesEl = document.getElementById('sparkles');
    if (!sparklesEl) return;

    const sparkleCount = 40;
    
    // Paillettes variées (couleurs sucrées)
    const colors = [
        'rgba(248, 232, 216, 0.7)',  // vanille
        'rgba(232, 200, 120, 0.7)',  // miel
        'rgba(232, 168, 184, 0.7)',  // fraise
        'rgba(168, 216, 200, 0.7)',  // menthe
        'rgba(216, 184, 136, 0.7)',  // caramel
        'rgba(248, 200, 200, 0.7)'   // rose
    ];
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 4 + 2;
        const delay = Math.random() * 5;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const color = colors[Math.floor(Math.random() * colors.length)];

        sparkle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, ${color} 0%, transparent 70%);
            left: ${left}%;
            top: ${top}%;
            border-radius: 50%;
            animation: sparkleTwinkle ${duration}s ${delay}s ease-in-out infinite;
            pointer-events: none;
        `;
        sparklesEl.appendChild(sparkle);
    }

    // Quelques étoiles de sucre plus brillantes
    for (let i = 0; i < 15; i++) {
        const sparkle = document.createElement('div');
        const size = Math.random() * 6 + 3;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 4;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const rotation = Math.random() * 360;

        sparkle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(248, 232, 216, 0.9) 0%, transparent 60%);
            left: ${left}%;
            top: ${top}%;
            border-radius: 50%;
            animation: sparkleRotate ${duration}s ${delay}s ease-in-out infinite;
            pointer-events: none;
            box-shadow: 0 0 ${size * 2}px rgba(232, 200, 120, 0.6);
            transform: rotate(${rotation}deg);
        `;
        
        // Forme d'étoile en utilisant clip-path
        sparkle.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
        
        sparklesEl.appendChild(sparkle);
    }

    // Injecter les animations si pas déjà présentes
    if (!document.getElementById('sparkle-keyframes')) {
        const style = document.createElement('style');
        style.id = 'sparkle-keyframes';
        style.textContent = `
            @keyframes sparkleTwinkle {
                0%, 100% { opacity: 0.3; transform: scale(1); }
                50% { opacity: 0.9; transform: scale(1.4); }
            }
            @keyframes sparkleRotate {
                0%, 100% { opacity: 0.5; transform: scale(1) rotate(0deg); }
                50% { opacity: 1; transform: scale(1.3) rotate(180deg); }
            }
        `;
        document.head.appendChild(style);
    }
});