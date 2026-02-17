// ─── GRAPHIQUE RADAR ──────────────────────────────────────────────────────
const ctx = document.getElementById('statsChart').getContext('2d');

// Stats de base Chasseur de Gemme
const baseStats = {
    FOR: -3,
    CST: 0,
    DEX: 4,
    INT: -3,
    SAG: 2,
    PER: 3,
    CHA: 1
};

// Bonus par Origine
const originBonuses = {
    'origin-explorateur':  { PER: 3, CST: 2 },
    'origin-liturgiste':   { SAG: 3, INT: 2 },
    'origin-chapardeur':   { CHA: 3, DEX: 2 },
    'origin-sables':       { FOR: 6, SAG: 2 }      // FOR de -3 → +3 = +6
};

const originNames = {
    'origin-explorateur':  'Explorateur des Cristaux',
    'origin-liturgiste':   'Liturgiste du Karûn',
    'origin-chapardeur':   'Chapardeur d\'Éclats',
    'origin-sables':       'Né des Sables Brillants'
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
            backgroundColor: 'rgba(136, 216, 232, 0.15)',
            borderColor:     'rgba(104, 200, 216, 0.9)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(136, 216, 232, 1)',
            pointBorderColor:     'rgba(104, 200, 216, 0.9)',
            pointHoverBackgroundColor: '#88d8e8',
            pointHoverBorderColor:     'rgba(200, 136, 216, 1)',
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
                backgroundColor: 'rgba(26, 24, 40, 0.85)',
                ticks: {
                    stepSize: 2,
                    callback: v => v - 4,
                    color: '#68c8d8',
                    backdropColor: 'rgba(26, 24, 40, 0.95)',
                    font: { size: 11, weight: 'bold' }
                },
                grid:        { color: 'rgba(136, 216, 232, 0.25)', circular: true },
                angleLines:  { color: 'rgba(136, 216, 232, 0.25)' },
                pointLabels: {
                    color: '#c8d0d8',
                    font: { size: 14, weight: 'bold', family: "'Cinzel', serif" }
                }
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(26, 24, 40, 0.95)',
                titleColor: '#88d8e8',
                bodyColor:  '#c8d0d8',
                borderColor: 'rgba(104, 200, 216, 0.7)',
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
            background: linear-gradient(135deg, rgba(104, 200, 216, 0.12), rgba(200, 136, 216, 0.10));
            border: 1px solid rgba(136, 216, 232, 0.35);
            border-radius: 6px;
            text-align: center; font-size: 0.92rem;
            color: #68c8d8; display: none;
            line-height: 1.6;
            box-shadow: inset 0 1px 0 rgba(136, 216, 232, 0.10), 0 2px 8px rgba(0, 0, 0, 0.6);
        `;
        chartContainer.appendChild(div);
    }

    // ─── GEMMES SCINTILLANTES ET CRISTAUX ─────────────────────────────────
    const gemsEl = document.getElementById('gems');
    if (!gemsEl) return;

    // Cristaux turquoise (grands fragments anguleux)
    for (let i = 0; i < 10; i++) {
        const crystal = document.createElement('div');
        const size = Math.random() * 12 + 6;
        const duration = Math.random() * 6 + 4;
        const delay = Math.random() * 6;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const rotation = Math.random() * 360;

        crystal.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size * 1.5}px;
            background: linear-gradient(135deg, 
                rgba(104, 200, 216, 0.6) 0%, 
                rgba(136, 216, 232, 0.3) 50%, 
                transparent 100%);
            left: ${left}%;
            top: ${top}%;
            clip-path: polygon(50% 0%, 100% 35%, 80% 100%, 20% 100%, 0% 35%);
            animation: crystalFloat ${duration}s ${delay}s ease-in-out infinite;
            pointer-events: none;
            transform: rotate(${rotation}deg);
            box-shadow: 0 0 ${size * 2}px rgba(104, 200, 216, 0.5);
        `;
        gemsEl.appendChild(crystal);
    }

    // Gemmes améthyste (cristaux violets)
    for (let i = 0; i < 8; i++) {
        const amethyst = document.createElement('div');
        const size = Math.random() * 10 + 5;
        const duration = Math.random() * 7 + 5;
        const delay = Math.random() * 7;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const rotation = Math.random() * 360;

        amethyst.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size * 1.5}px;
            background: linear-gradient(135deg, 
                rgba(200, 136, 216, 0.6) 0%, 
                rgba(216, 168, 232, 0.3) 50%, 
                transparent 100%);
            left: ${left}%;
            top: ${top}%;
            clip-path: polygon(50% 0%, 100% 35%, 80% 100%, 20% 100%, 0% 35%);
            animation: gemDrift ${duration}s ${delay}s ease-in-out infinite;
            pointer-events: none;
            transform: rotate(${rotation}deg);
            box-shadow: 0 0 ${size * 2}px rgba(200, 136, 216, 0.5);
        `;
        gemsEl.appendChild(amethyst);
    }

    // Particules de sable doré (petites et nombreuses)
    for (let i = 0; i < 30; i++) {
        const sand = document.createElement('div');
        const size = Math.random() * 2 + 1;
        const duration = Math.random() * 5 + 3;
        const delay = Math.random() * 6;
        const left = Math.random() * 100;
        const top = Math.random() * 100;

        sand.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(232, 200, 120, 0.8) 0%, transparent 70%);
            left: ${left}%;
            top: ${top}%;
            border-radius: 50%;
            animation: sandFloat ${duration}s ${delay}s ease-in-out infinite;
            pointer-events: none;
            box-shadow: 0 0 ${size * 3}px rgba(232, 200, 120, 0.6);
        `;
        gemsEl.appendChild(sand);
    }

    // Éclats de lumière (scintillements rapides)
    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 3 + 1;
        const delay = Math.random() * 5;
        const left = Math.random() * 100;
        const top = Math.random() * 100;

        sparkle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, 
                rgba(136, 216, 232, 1) 0%, 
                rgba(200, 136, 216, 0.5) 50%, 
                transparent 70%);
            left: ${left}%;
            top: ${top}%;
            border-radius: 50%;
            animation: sparkle ${duration}s ${delay}s ease-in-out infinite;
            pointer-events: none;
            box-shadow: 0 0 ${size * 4}px rgba(136, 216, 232, 0.8);
        `;
        gemsEl.appendChild(sparkle);
    }

    // Fragments de cristal en suspension (gros morceaux)
    for (let i = 0; i < 6; i++) {
        const fragment = document.createElement('div');
        const size = Math.random() * 20 + 15;
        const duration = Math.random() * 10 + 8;
        const delay = Math.random() * 10;
        const left = Math.random() * 100;
        const top = Math.random() * 100;

        fragment.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(ellipse at 30% 30%, 
                rgba(136, 216, 232, 0.3) 0%, 
                rgba(104, 200, 216, 0.15) 40%, 
                transparent 70%);
            left: ${left}%;
            top: ${top}%;
            border-radius: 50%;
            animation: fragmentRotate ${duration}s ${delay}s linear infinite;
            pointer-events: none;
            filter: blur(2px);
            border: 1px solid rgba(136, 216, 232, 0.2);
        `;
        gemsEl.appendChild(fragment);
    }

    // Ondes de Gemsight (cercles pulsants)
    for (let i = 0; i < 8; i++) {
        const wave = document.createElement('div');
        const size = Math.random() * 100 + 70;
        const duration = Math.random() * 7 + 5;
        const delay = Math.random() * 8;
        const left = Math.random() * 100;
        const top = Math.random() * 100;

        wave.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, 
                transparent 40%, 
                rgba(200, 136, 216, 0.12) 50%, 
                transparent 60%);
            left: ${left}%;
            top: ${top}%;
            border-radius: 50%;
            animation: gemsightWave ${duration}s ${delay}s ease-in-out infinite;
            pointer-events: none;
            filter: blur(1px);
            border: 2px solid rgba(104, 200, 216, 0.08);
        `;
        gemsEl.appendChild(wave);
    }

    // Injecter les animations si pas déjà présentes
    if (!document.getElementById('gem-keyframes')) {
        const style = document.createElement('style');
        style.id = 'gem-keyframes';
        style.textContent = `
            @keyframes crystalFloat {
                0%, 100% { 
                    opacity: 0.4; 
                    transform: translateY(0px) rotate(0deg) scale(1);
                }
                25% { 
                    opacity: 0.8; 
                    transform: translateY(-20px) rotate(90deg) scale(1.1);
                }
                50% { 
                    opacity: 0.6; 
                    transform: translateY(-35px) rotate(180deg) scale(0.95);
                }
                75% { 
                    opacity: 0.9; 
                    transform: translateY(-15px) rotate(270deg) scale(1.05);
                }
            }
            
            @keyframes gemDrift {
                0%, 100% { 
                    opacity: 0.3; 
                    transform: translateX(0px) translateY(0px) rotate(0deg);
                }
                33% { 
                    opacity: 0.7; 
                    transform: translateX(15px) translateY(-25px) rotate(120deg);
                }
                66% { 
                    opacity: 0.5; 
                    transform: translateX(-10px) translateY(-40px) rotate(240deg);
                }
            }
            
            @keyframes sandFloat {
                0%, 100% { 
                    opacity: 0.3; 
                    transform: translateY(0px) translateX(0px);
                }
                50% { 
                    opacity: 0.8; 
                    transform: translateY(-20px) translateX(10px);
                }
            }
            
            @keyframes sparkle {
                0%, 100% { 
                    opacity: 0; 
                    transform: scale(0.5);
                }
                50% { 
                    opacity: 1; 
                    transform: scale(1.5);
                }
            }
            
            @keyframes fragmentRotate {
                0% { 
                    opacity: 0.2; 
                    transform: rotate(0deg) scale(1);
                }
                50% { 
                    opacity: 0.4; 
                    transform: rotate(180deg) scale(1.2);
                }
                100% { 
                    opacity: 0.2; 
                    transform: rotate(360deg) scale(1);
                }
            }
            
            @keyframes gemsightWave {
                0%, 100% { 
                    opacity: 0.1; 
                    transform: scale(1);
                }
                50% { 
                    opacity: 0.3; 
                    transform: scale(1.3);
                }
            }
        `;
        document.head.appendChild(style);
    }
});