// ─── GRAPHIQUE RADAR ──────────────────────────────────────────────────────
const ctx = document.getElementById('statsChart').getContext('2d');

// Stats de base Berserkeur
const baseStats = {
    FOR: 3,
    CST: 1,
    DEX: -3,
    INT: 0,
    SAG: 4,
    PER: 1,
    CHA: -3
};

// Bonus par Origine
const originBonuses = {
    'origin-primitif':  { FOR: 2, CST: 3 },
    'origin-heraut':    { SAG: 2, PER: 3 },
    'origin-haine':     { SAG: 2, CHA: 6 }      // CHA de -3 → +3 = +6
};

const originNames = {
    'origin-primitif':  'Primitif : Hérauts des terres sauvages/clan tribaux',
    'origin-heraut':    'Héraut spirituel',
    'origin-haine':     'Héraut de la haine'
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
            backgroundColor: 'rgba(216, 88, 40, 0.15)',
            borderColor:     'rgba(216, 168, 104, 0.9)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(232, 184, 120, 1)',
            pointBorderColor:     'rgba(216, 88, 40, 0.9)',
            pointHoverBackgroundColor: '#e8b878',
            pointHoverBorderColor:     'rgba(104, 136, 168, 1)',
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
                backgroundColor: 'rgba(26, 10, 8, 0.85)',
                ticks: {
                    stepSize: 2,
                    callback: v => v - 4,
                    color: '#c89858',
                    backdropColor: 'rgba(26, 10, 8, 0.95)',
                    font: { size: 11, weight: 'bold' }
                },
                grid:        { color: 'rgba(216, 168, 104, 0.25)', circular: true },
                angleLines:  { color: 'rgba(216, 168, 104, 0.25)' },
                pointLabels: {
                    color: '#d8d0c0',
                    font: { size: 14, weight: 'bold', family: "'Cinzel', serif" }
                }
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(26, 10, 8, 0.95)',
                titleColor: '#d8a868',
                bodyColor:  '#d8d0c0',
                borderColor: 'rgba(216, 88, 40, 0.7)',
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
        
        // Note spéciale pour Héraut de la haine
        let note = '';
        if (origin === 'origin-haine') {
            note = '<br><em style="color: #d85828;">Note : RM -6 (non affiché sur le graphique)</em>';
        }
        
        el.innerHTML =
            `<strong>Origine sélectionnée :</strong> ${originNames[origin]}<br>
             <strong>Gains appliqués :</strong> ${parts.join(' · ')}${note}`;
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
            background: linear-gradient(135deg, rgba(216, 88, 40, 0.12), rgba(104, 136, 168, 0.10));
            border: 1px solid rgba(216, 168, 104, 0.35);
            border-radius: 6px;
            text-align: center; font-size: 0.92rem;
            color: #c89858; display: none;
            line-height: 1.6;
            box-shadow: inset 0 1px 0 rgba(216, 168, 104, 0.10), 0 2px 8px rgba(0, 0, 0, 0.6);
        `;
        chartContainer.appendChild(div);
    }

    // ─── ÂMES ERRANTES ET ÉNERGIE TRIBALE ────────────────────────────────
    const soulsEl = document.getElementById('souls');
    if (!soulsEl) return;

    // Âmes errantes (wisp bleu-violet spectraux)
    for (let i = 0; i < 15; i++) {
        const soul = document.createElement('div');
        const size = Math.random() * 8 + 4;
        const duration = Math.random() * 8 + 5;
        const delay = Math.random() * 8;
        const left = Math.random() * 100;
        const top = Math.random() * 100;

        soul.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size * 1.5}px;
            background: radial-gradient(ellipse at center, 
                rgba(104, 136, 168, 0.6) 0%, 
                rgba(136, 168, 200, 0.3) 50%, 
                transparent 70%);
            left: ${left}%;
            top: ${top}%;
            border-radius: 50%;
            animation: soulDrift ${duration}s ${delay}s ease-in-out infinite;
            pointer-events: none;
            filter: blur(2px);
            box-shadow: 0 0 ${size * 2}px rgba(104, 136, 168, 0.4);
        `;
        soulsEl.appendChild(soul);
    }

    // Flammes tribales (orange-rouge rituelles)
    for (let i = 0; i < 12; i++) {
        const flame = document.createElement('div');
        const width = Math.random() * 6 + 3;
        const height = Math.random() * 15 + 10;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 4;
        const left = Math.random() * 100;
        const top = Math.random() * 100;

        flame.style.cssText = `
            position: absolute;
            width: ${width}px;
            height: ${height}px;
            background: linear-gradient(180deg, 
                rgba(232, 120, 72, 0.7) 0%, 
                rgba(216, 88, 40, 0.5) 50%, 
                transparent 100%);
            left: ${left}%;
            top: ${top}%;
            border-radius: 50% 50% 0 0;
            animation: flameFlicker ${duration}s ${delay}s ease-in-out infinite;
            pointer-events: none;
            filter: blur(1px);
            box-shadow: 0 0 ${width * 3}px rgba(216, 88, 40, 0.5);
        `;
        soulsEl.appendChild(flame);
    }

    // Énergie spirituelle (particules or brillantes)
    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 5 + 3;
        const delay = Math.random() * 6;
        const left = Math.random() * 100;
        const top = Math.random() * 100;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(216, 168, 104, 0.8) 0%, transparent 70%);
            left: ${left}%;
            top: ${top}%;
            border-radius: 50%;
            animation: energyPulse ${duration}s ${delay}s ease-in-out infinite;
            pointer-events: none;
            box-shadow: 0 0 ${size * 3}px rgba(216, 168, 104, 0.6);
        `;
        soulsEl.appendChild(particle);
    }

    // Marques tribales flottantes (runes/symboles)
    for (let i = 0; i < 8; i++) {
        const mark = document.createElement('div');
        const size = Math.random() * 20 + 15;
        const duration = Math.random() * 12 + 8;
        const delay = Math.random() * 10;
        const left = Math.random() * 100;
        const top = Math.random() * 100;

        mark.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, 
                rgba(216, 88, 40, 0.2) 0%, 
                rgba(216, 168, 104, 0.1) 50%, 
                transparent 70%);
            left: ${left}%;
            top: ${top}%;
            border-radius: 50%;
            animation: tribalRotate ${duration}s ${delay}s linear infinite;
            pointer-events: none;
            filter: blur(3px);
            border: 1px solid rgba(216, 88, 40, 0.2);
        `;
        soulsEl.appendChild(mark);
    }

    // Vagues de transe (ondes de pouvoir concentriques)
    for (let i = 0; i < 6; i++) {
        const wave = document.createElement('div');
        const size = Math.random() * 100 + 60;
        const duration = Math.random() * 8 + 6;
        const delay = Math.random() * 8;
        const left = Math.random() * 100;
        const top = Math.random() * 100;

        wave.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, 
                transparent 40%, 
                rgba(104, 136, 168, 0.15) 50%, 
                transparent 60%);
            left: ${left}%;
            top: ${top}%;
            border-radius: 50%;
            animation: tranceWave ${duration}s ${delay}s ease-in-out infinite;
            pointer-events: none;
            filter: blur(2px);
            border: 2px solid rgba(104, 136, 168, 0.1);
        `;
        soulsEl.appendChild(wave);
    }

    // Injecter les animations si pas déjà présentes
    if (!document.getElementById('soul-keyframes')) {
        const style = document.createElement('style');
        style.id = 'soul-keyframes';
        style.textContent = `
            @keyframes soulDrift {
                0%, 100% { 
                    opacity: 0.3; 
                    transform: translateY(0px) translateX(0px) scale(1);
                }
                25% { 
                    opacity: 0.7; 
                    transform: translateY(-30px) translateX(15px) scale(1.2);
                }
                50% { 
                    opacity: 0.5; 
                    transform: translateY(-50px) translateX(-10px) scale(0.9);
                }
                75% { 
                    opacity: 0.8; 
                    transform: translateY(-25px) translateX(20px) scale(1.1);
                }
            }
            
            @keyframes flameFlicker {
                0%, 100% { 
                    opacity: 0.5; 
                    transform: translateY(0px) scaleY(1);
                }
                50% { 
                    opacity: 0.9; 
                    transform: translateY(-5px) scaleY(1.3);
                }
            }
            
            @keyframes energyPulse {
                0%, 100% { 
                    opacity: 0.4; 
                    transform: scale(1);
                }
                50% { 
                    opacity: 1; 
                    transform: scale(1.8);
                }
            }
            
            @keyframes tribalRotate {
                0% { 
                    opacity: 0.2; 
                    transform: rotate(0deg) scale(1);
                }
                50% { 
                    opacity: 0.4; 
                    transform: rotate(180deg) scale(1.3);
                }
                100% { 
                    opacity: 0.2; 
                    transform: rotate(360deg) scale(1);
                }
            }
            
            @keyframes tranceWave {
                0%, 100% { 
                    opacity: 0.15; 
                    transform: scale(1);
                }
                50% { 
                    opacity: 0.35; 
                    transform: scale(1.5);
                }
            }
        `;
        document.head.appendChild(style);
    }
});