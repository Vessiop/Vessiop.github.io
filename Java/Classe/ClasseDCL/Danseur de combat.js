// ─── GRAPHIQUE RADAR ──────────────────────────────────────────────────────
const ctx = document.getElementById('statsChart').getContext('2d');

// Stats de base Danseur de Combat
const baseStats = {
    FOR: -2,
    CST: 0,
    DEX: 1,
    INT: 1,
    SAG: 3,
    PER: -1,
    CHA: 3
};

// Bonus par Origine
const originBonuses = {
    'origin-nomade':      { PER: 4, CST: 2 },       // PER de -1 → +3 = +4, CST de 0 → +2 = +2
    'origin-spectacle':   { CHA: 3, SAG: 2 },
    'origin-feu':         { INT: 3, DEX: 2 },
    'origin-desert':      { FOR: 5, PER: 3 },       // FOR de -2 → +3 = +5, PER de -1 → +2 = +3
    'origin-charma':      { CHA: 3, PER: 3 },       // PER de -1 → +2 = +3
    'origin-ombres':      { DEX: 3, SAG: 2 }
};

const originNames = {
    'origin-nomade':      'Danseur nomade',
    'origin-spectacle':   'Danse de spectacle',
    'origin-feu':         'Danseur des terres du feu',
    'origin-desert':      'Danseur du désert',
    'origin-charma':      'Valse de la Charma',
    'origin-ombres':      'Valse des ombres'
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
            backgroundColor: 'rgba(216, 136, 184, 0.15)',
            borderColor:     'rgba(168, 120, 200, 0.9)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(216, 184, 232, 1)',
            pointBorderColor:     'rgba(216, 136, 184, 0.9)',
            pointHoverBackgroundColor: '#d8b8e8',
            pointHoverBorderColor:     'rgba(168, 120, 200, 1)',
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
                backgroundColor: 'rgba(26, 8, 40, 0.85)',
                ticks: {
                    stepSize: 2,
                    callback: v => v - 4,
                    color: '#a878c8',
                    backdropColor: 'rgba(26, 8, 40, 0.95)',
                    font: { size: 11, weight: 'bold' }
                },
                grid:        { color: 'rgba(168, 120, 200, 0.25)', circular: true },
                angleLines:  { color: 'rgba(168, 120, 200, 0.25)' },
                pointLabels: {
                    color: '#e8d8f8',
                    font: { size: 14, weight: 'bold', family: "'Cinzel', serif" }
                }
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(26, 8, 40, 0.95)',
                titleColor: '#d888b8',
                bodyColor:  '#d8b8e8',
                borderColor: 'rgba(168, 120, 200, 0.7)',
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
            background: linear-gradient(135deg, rgba(168, 120, 200, 0.12), rgba(216, 136, 184, 0.10));
            border: 1px solid rgba(168, 120, 200, 0.35);
            border-radius: 6px;
            text-align: center; font-size: 0.92rem;
            color: #a878c8; display: none;
            line-height: 1.6;
            box-shadow: inset 0 1px 0 rgba(216, 184, 232, 0.10), 0 2px 8px rgba(0, 0, 0, 0.6);
        `;
        chartContainer.appendChild(div);
    }

    // ─── RUBANS FLOTTANTS ÉLÉGANTS ────────────────────────────────────────
    const ribbonsEl = document.getElementById('ribbons');
    if (!ribbonsEl) return;

    const ribbonCount = 12;
    
    // Grands rubans flottants (soie violette/rose)
    for (let i = 0; i < ribbonCount; i++) {
        const ribbon = document.createElement('div');
        const width = Math.random() * 80 + 40;
        const height = Math.random() * 3 + 1;
        const duration = Math.random() * 8 + 6;
        const delay = Math.random() * 8;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const hue = Math.random() > 0.5 ? 280 : 320; // violet ou rose
        const opacity = Math.random() * 0.3 + 0.2;

        ribbon.style.cssText = `
            position: absolute;
            width: ${width}px;
            height: ${height}px;
            background: linear-gradient(90deg, 
                hsla(${hue}, 50%, 70%, 0) 0%, 
                hsla(${hue}, 50%, 70%, ${opacity}) 50%, 
                hsla(${hue}, 50%, 70%, 0) 100%);
            left: ${left}%;
            top: ${top}%;
            border-radius: 2px;
            animation: ribbonFlow ${duration}s ${delay}s ease-in-out infinite;
            pointer-events: none;
            filter: blur(1px);
            box-shadow: 0 0 ${height * 4}px hsla(${hue}, 60%, 70%, ${opacity * 0.6});
        `;
        ribbonsEl.appendChild(ribbon);
    }

    // Particules de soie (petites étincelles violettes/dorées)
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 5 + 4;
        const delay = Math.random() * 6;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const isGold = Math.random() > 0.7;
        const color = isGold ? 'rgba(216, 184, 120, 0.6)' : 'rgba(168, 120, 200, 0.5)';

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, ${color} 0%, transparent 70%);
            left: ${left}%;
            top: ${top}%;
            border-radius: 50%;
            animation: silkTwinkle ${duration}s ${delay}s ease-in-out infinite;
            pointer-events: none;
            box-shadow: 0 0 ${size * 2}px ${color};
        `;
        ribbonsEl.appendChild(particle);
    }

    // Vagues de danse (ondes circulaires qui pulsent)
    for (let i = 0; i < 8; i++) {
        const wave = document.createElement('div');
        const size = Math.random() * 120 + 80;
        const duration = Math.random() * 7 + 5;
        const delay = Math.random() * 7;
        const left = Math.random() * 100;
        const top = Math.random() * 100;

        wave.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, 
                rgba(216, 136, 184, 0.15) 0%, 
                rgba(168, 120, 200, 0.08) 50%, 
                transparent 70%);
            left: ${left}%;
            top: ${top}%;
            border-radius: 50%;
            animation: danceWave ${duration}s ${delay}s ease-in-out infinite;
            pointer-events: none;
            filter: blur(3px);
        `;
        ribbonsEl.appendChild(wave);
    }

    // Spirales dorées (lignes courbes qui tournent)
    for (let i = 0; i < 6; i++) {
        const spiral = document.createElement('div');
        const width = Math.random() * 60 + 30;
        const height = Math.random() * 2 + 1;
        const duration = Math.random() * 10 + 8;
        const delay = Math.random() * 9;
        const left = Math.random() * 100;
        const top = Math.random() * 100;

        spiral.style.cssText = `
            position: absolute;
            width: ${width}px;
            height: ${height}px;
            background: linear-gradient(90deg, 
                transparent 0%, 
                rgba(216, 184, 120, 0.4) 50%, 
                transparent 100%);
            left: ${left}%;
            top: ${top}%;
            border-radius: 50%;
            animation: spiralDance ${duration}s ${delay}s ease-in-out infinite;
            pointer-events: none;
            filter: blur(1px);
            transform-origin: center;
        `;
        ribbonsEl.appendChild(spiral);
    }

    // Injecter les animations si pas déjà présentes
    if (!document.getElementById('ribbon-keyframes')) {
        const style = document.createElement('style');
        style.id = 'ribbon-keyframes';
        style.textContent = `
            @keyframes ribbonFlow {
                0%, 100% { 
                    opacity: 0.3; 
                    transform: translateX(0px) translateY(0px) rotate(0deg);
                }
                25% { 
                    opacity: 0.7; 
                    transform: translateX(30px) translateY(-40px) rotate(5deg);
                }
                50% { 
                    opacity: 0.5; 
                    transform: translateX(-20px) translateY(-70px) rotate(-3deg);
                }
                75% { 
                    opacity: 0.8; 
                    transform: translateX(40px) translateY(-50px) rotate(7deg);
                }
            }
            
            @keyframes silkTwinkle {
                0%, 100% { 
                    opacity: 0.3; 
                    transform: scale(1) translateY(0px);
                }
                50% { 
                    opacity: 0.9; 
                    transform: scale(1.5) translateY(-30px);
                }
            }
            
            @keyframes danceWave {
                0%, 100% { 
                    opacity: 0.15; 
                    transform: scale(1) rotate(0deg);
                }
                33% { 
                    opacity: 0.30; 
                    transform: scale(1.3) rotate(120deg);
                }
                66% { 
                    opacity: 0.20; 
                    transform: scale(0.9) rotate(240deg);
                }
            }
            
            @keyframes spiralDance {
                0% { 
                    opacity: 0.2; 
                    transform: rotate(0deg) translateX(0px);
                }
                25% { 
                    opacity: 0.5; 
                    transform: rotate(90deg) translateX(20px);
                }
                50% { 
                    opacity: 0.6; 
                    transform: rotate(180deg) translateX(-10px);
                }
                75% { 
                    opacity: 0.4; 
                    transform: rotate(270deg) translateX(15px);
                }
                100% { 
                    opacity: 0.2; 
                    transform: rotate(360deg) translateX(0px);
                }
            }
        `;
        document.head.appendChild(style);
    }
});