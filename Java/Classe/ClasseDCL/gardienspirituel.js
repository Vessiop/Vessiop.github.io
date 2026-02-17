// ─── GRAPHIQUE RADAR ──────────────────────────────────────────────────────
const ctx = document.getElementById('statsChart').getContext('2d');

// Stats de base Gardien Spirituel
const baseStats = {
    FOR: 2,
    CST: 3,
    DEX: -3,
    INT: 2,
    SAG: 4,
    PER: -3,
    CHA: -1
};

// Bonus par Origine
const originBonuses = {
    'origin-veilleur':    { PER: 6, CST: 2 },     // PER de -3 → +3 = +6
    'origin-serment':     { CST: 3, SAG: 2 },
    'origin-forgeron':    { SAG: 2, INT: 3 },
    'origin-tranche':     { FOR: 3, DEX: 5 }      // DEX de -3 → +2 = +5
};

const originNames = {
    'origin-veilleur':    'Veilleur du Seuil Pâle',
    'origin-serment':     'Porte-Serment Inachevé',
    'origin-forgeron':    'Forgeron d\'Incarna',
    'origin-tranche':     'Tranche-Âme des Champs Froids'
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
            backgroundColor: 'rgba(168, 200, 184, 0.15)',
            borderColor:     'rgba(168, 184, 200, 0.9)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(192, 208, 224, 1)',
            pointBorderColor:     'rgba(168, 200, 184, 0.9)',
            pointHoverBackgroundColor: '#c0d0e0',
            pointHoverBorderColor:     'rgba(168, 200, 184, 1)',
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
                backgroundColor: 'rgba(13, 18, 21, 0.85)',
                ticks: {
                    stepSize: 2,
                    callback: v => v - 4,
                    color: '#a8b8c8',
                    backdropColor: 'rgba(13, 18, 21, 0.95)',
                    font: { size: 11, weight: 'bold' }
                },
                grid:        { color: 'rgba(168, 184, 200, 0.25)', circular: true },
                angleLines:  { color: 'rgba(168, 184, 200, 0.25)' },
                pointLabels: {
                    color: '#d0e0e8',
                    font: { size: 14, weight: 'bold', family: "'Cinzel', serif" }
                }
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(13, 18, 21, 0.95)',
                titleColor: '#a8c8b8',
                bodyColor:  '#c0d0e0',
                borderColor: 'rgba(168, 184, 200, 0.7)',
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
            background: linear-gradient(135deg, rgba(168, 184, 200, 0.10), rgba(168, 200, 184, 0.08));
            border: 1px solid rgba(168, 184, 200, 0.30);
            border-radius: 6px;
            text-align: center; font-size: 0.92rem;
            color: #a8b8c8; display: none;
            line-height: 1.6;
            box-shadow: inset 0 1px 0 rgba(192, 208, 224, 0.08), 0 2px 8px rgba(0, 0, 0, 0.6);
        `;
        chartContainer.appendChild(div);
    }

    // ─── BRUME D'ÂMES SPECTRALES ──────────────────────────────────────────
    const mistEl = document.getElementById('mist');
    if (!mistEl) return;

    const mistCount = 40;
    
    // Particules de brume spectrale (blanc-bleuté, éthérées)
    for (let i = 0; i < mistCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 5 + 2;
        const duration = Math.random() * 6 + 4;
        const delay = Math.random() * 7;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const opacity = Math.random() * 0.3 + 0.1;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(192, 208, 224, ${opacity}) 0%, transparent 70%);
            left: ${left}%;
            top: ${top}%;
            border-radius: 50%;
            animation: mistFloat ${duration}s ${delay}s ease-in-out infinite;
            pointer-events: none;
            filter: blur(1px);
        `;
        mistEl.appendChild(particle);
    }

    // Particules éthérées (vertes-spectrales)
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 5 + 3;
        const delay = Math.random() * 6;
        const left = Math.random() * 100;
        const top = Math.random() * 100;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(168, 200, 184, 0.5) 0%, transparent 60%);
            left: ${left}%;
            top: ${top}%;
            border-radius: 50%;
            animation: etherealDrift ${duration}s ${delay}s ease-in-out infinite;
            pointer-events: none;
            box-shadow: 0 0 ${size * 2}px rgba(168, 200, 184, 0.3);
        `;
        mistEl.appendChild(particle);
    }

    // Âmes errantes (grandes brumes fantomatiques)
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        const width = Math.random() * 15 + 10;
        const height = Math.random() * 25 + 15;
        const duration = Math.random() * 8 + 6;
        const delay = Math.random() * 8;
        const left = Math.random() * 100;
        const top = Math.random() * 100;

        particle.style.cssText = `
            position: absolute;
            width: ${width}px;
            height: ${height}px;
            background: linear-gradient(180deg, 
                rgba(200, 208, 216, 0.15) 0%, 
                rgba(168, 184, 200, 0.20) 50%, 
                rgba(200, 208, 216, 0.10) 100%);
            left: ${left}%;
            top: ${top}%;
            border-radius: 50%;
            animation: soulWander ${duration}s ${delay}s ease-in-out infinite;
            pointer-events: none;
            filter: blur(3px);
            box-shadow: 0 0 ${width}px rgba(168, 184, 200, 0.2);
        `;
        mistEl.appendChild(particle);
    }

    // Quelques lueurs d'ancrage (points brillants fixes qui pulsent)
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 3 + 2;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 4;
        const left = Math.random() * 100;
        const top = Math.random() * 100;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(208, 224, 232, 0.8) 0%, transparent 50%);
            left: ${left}%;
            top: ${top}%;
            border-radius: 50%;
            animation: anchorPulse ${duration}s ${delay}s ease-in-out infinite;
            pointer-events: none;
            box-shadow: 0 0 ${size * 4}px rgba(192, 208, 224, 0.5);
        `;
        mistEl.appendChild(particle);
    }

    // Injecter les animations si pas déjà présentes
    if (!document.getElementById('mist-keyframes')) {
        const style = document.createElement('style');
        style.id = 'mist-keyframes';
        style.textContent = `
            @keyframes mistFloat {
                0%, 100% { 
                    opacity: 0.2; 
                    transform: translateY(0px) translateX(0px);
                }
                25% { 
                    opacity: 0.5; 
                    transform: translateY(-15px) translateX(8px);
                }
                50% { 
                    opacity: 0.4; 
                    transform: translateY(-25px) translateX(-5px);
                }
                75% { 
                    opacity: 0.6; 
                    transform: translateY(-10px) translateX(12px);
                }
            }
            
            @keyframes etherealDrift {
                0%, 100% { 
                    opacity: 0.3; 
                    transform: translateX(0px) translateY(0px) scale(1);
                }
                33% { 
                    opacity: 0.7; 
                    transform: translateX(10px) translateY(-20px) scale(1.2);
                }
                66% { 
                    opacity: 0.5; 
                    transform: translateX(-8px) translateY(-30px) scale(0.9);
                }
            }
            
            @keyframes soulWander {
                0%, 100% { 
                    opacity: 0.15; 
                    transform: translateY(0px) translateX(0px) rotate(0deg);
                }
                25% { 
                    opacity: 0.25; 
                    transform: translateY(-30px) translateX(20px) rotate(5deg);
                }
                50% { 
                    opacity: 0.30; 
                    transform: translateY(-50px) translateX(-10px) rotate(-3deg);
                }
                75% { 
                    opacity: 0.20; 
                    transform: translateY(-25px) translateX(15px) rotate(4deg);
                }
            }
            
            @keyframes anchorPulse {
                0%, 100% { 
                    opacity: 0.4; 
                    transform: scale(1);
                    box-shadow: 0 0 8px rgba(192, 208, 224, 0.3);
                }
                50% { 
                    opacity: 0.9; 
                    transform: scale(1.5);
                    box-shadow: 0 0 16px rgba(192, 208, 224, 0.7);
                }
            }
        `;
        document.head.appendChild(style);
    }
});