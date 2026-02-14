// ─── GRAPHIQUE RADAR ──────────────────────────────────────────────────────
const ctx = document.getElementById('statsChart').getContext('2d');

// Stats de base Escrimeur
const baseStats = {
    FOR: 2,
    CST: 2,
    DEX: 2,
    INT: -2,
    SAG: 1,
    PER: 3,
    CHA: -2
};

// Bonus par Origine
const originBonuses = {
    'origin-loup':        { PER: 3, DEX: 2 },  // ou FOR +2
    'origin-aurochs':     { CST: 3, DEX: 2 },  // ou FOR +2
    'origin-faucon':      { DEX: 3, REA: 4 },
    'origin-coyote':      { PER: 3, DEX: 2 },  // ou FOR +2
    'origin-duelliste':   { SAG: 5, CST: 2 },  // SAG de -2 → +3 = +5 total
    'origin-archeologue': { PER: 3, CST: 2 }
};

const originNames = {
    'origin-loup':        'École du Loup',
    'origin-aurochs':     'École de l\'Aurochs',
    'origin-faucon':      'École du Faucon',
    'origin-coyote':      'École du Coyote',
    'origin-duelliste':   'Chemin du Duelliste',
    'origin-archeologue': 'Archéologue d\'Armes'
};

let currentOrigin = null;

function calculateStats(origin) {
    const s = { ...baseStats };
    if (origin && originBonuses[origin]) {
        for (const [k, v] of Object.entries(originBonuses[origin])) {
            if (k === 'REA') continue; // REA n'est pas dans le graphique
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
            backgroundColor: 'rgba(138, 154, 168, 0.20)',
            borderColor:     'rgba(138, 154, 168, 0.9)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(176, 192, 208, 1)',
            pointBorderColor:     'rgba(168, 40, 40, 0.9)',
            pointHoverBackgroundColor: '#c8d4e0',
            pointHoverBorderColor:     'rgba(168, 40, 40, 1)',
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
                backgroundColor: 'rgba(13, 13, 13, 0.8)',
                ticks: {
                    stepSize: 2,
                    callback: v => v - 4,
                    color: '#8a9aa8',
                    backdropColor: 'rgba(13, 13, 13, 0.95)',
                    font: { size: 11, weight: 'bold' }
                },
                grid:        { color: 'rgba(138, 154, 168, 0.3)', circular: true },
                angleLines:  { color: 'rgba(138, 154, 168, 0.3)' },
                pointLabels: {
                    color: '#c8d4e0',
                    font: { size: 14, weight: 'bold', family: "'Cinzel', serif" }
                }
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(13, 13, 13, 0.95)',
                titleColor: '#c84848',
                bodyColor:  '#e0e8f0',
                borderColor: 'rgba(138, 154, 168, 0.8)',
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
            background: linear-gradient(135deg, rgba(138, 154, 168, 0.18), rgba(168, 40, 40, 0.15));
            border: 1px solid rgba(138, 154, 168, 0.35);
            border-radius: 6px;
            text-align: center; font-size: 0.92rem;
            color: #8a9aa8; display: none;
            line-height: 1.6;
            box-shadow: inset 0 1px 0 rgba(176, 192, 208, 0.08), 0 2px 8px rgba(0, 0, 0, 0.5);
        `;
        chartContainer.appendChild(div);
    }

    // ─── ÉTINCELLES MÉTALLIQUES ───────────────────────────────────────────
    const sparksEl = document.getElementById('sparks');
    if (!sparksEl) return;

    const sparkCount = 25;
    
    for (let i = 0; i < sparkCount; i++) {
        const spark = document.createElement('div');
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 6;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const opacity = Math.random() * 0.5 + 0.3;

        spark.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(200, 212, 224, ${opacity}) 0%, transparent 70%);
            left: ${left}%;
            top: ${top}%;
            border-radius: 50%;
            animation: sparkFade ${duration}s ${delay}s ease-in-out infinite;
            pointer-events: none;
        `;
        sparksEl.appendChild(spark);
    }

    // Quelques étincelles rouges (sang)
    for (let i = 0; i < 8; i++) {
        const spark = document.createElement('div');
        const size = Math.random() * 2.5 + 1.5;
        const duration = Math.random() * 4 + 2;
        const delay = Math.random() * 5;
        const left = Math.random() * 100;
        const top = Math.random() * 100;

        spark.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(200, 72, 72, 0.7) 0%, transparent 60%);
            left: ${left}%;
            top: ${top}%;
            border-radius: 50%;
            animation: sparkFlash ${duration}s ${delay}s ease-in-out infinite;
            pointer-events: none;
            box-shadow: 0 0 ${size * 2}px rgba(168, 40, 40, 0.5);
        `;
        sparksEl.appendChild(spark);
    }

    // Injecter les animations si pas déjà présentes
    if (!document.getElementById('spark-keyframes')) {
        const style = document.createElement('style');
        style.id = 'spark-keyframes';
        style.textContent = `
            @keyframes sparkFade {
                0%, 100% { opacity: 0.2; transform: scale(1); }
                50% { opacity: 0.8; transform: scale(1.3); }
            }
            @keyframes sparkFlash {
                0%, 100% { opacity: 0.3; transform: scale(1) rotate(0deg); }
                50% { opacity: 1; transform: scale(1.5) rotate(180deg); }
            }
        `;
        document.head.appendChild(style);
    }
});