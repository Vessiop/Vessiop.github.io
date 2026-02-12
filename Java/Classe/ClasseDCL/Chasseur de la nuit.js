// ─── GRAPHIQUE RADAR ──────────────────────────────────────────────────────
const ctx = document.getElementById('statsChart').getContext('2d');

// Stats de base du Chasseur de la Nuit
const baseStats = {
    FOR: 2,
    CST: 2,
    DEX: 2,
    INT: 3,
    SAG: -3,
    PER: 3,
    CHA: -3
};

// Bonus par Section (delta appliqué sur les stats de base)
const sectionBonuses = {
    'section-filature':   { DEX: 2, PER: 3, CHA: -2 },
    'section-masques':    { CHA: 6, SAG: 5, CST: -2 }, // CHA -3→+3 = +6 ; SAG -3→+2 = +5
    'section-voile':      { DEX: 3, PER: 2, FOR: -2 },
    'section-archives':   { INT: 3, PER: 2, FOR: -2 },
    'section-artifices':  { INT: 2, DEX: 2, SAG: -2 },
    'section-extraction': { CST: 3, PER: 2, CHA: -2 },
    'section-chatiment':  { FOR: 3, CST: 2, INT: -2 }
};

const sectionNames = {
    'section-filature':   'Section Filature',
    'section-masques':    'Section Masques & Serments',
    'section-voile':      'Section Voile Obscur',
    'section-archives':   'Section Archives Nocturnes',
    'section-artifices':  'Section Artifices Silencieux',
    'section-extraction': 'Section Extraction',
    'section-chatiment':  'Section Châtiment des Horreurs'
};

let currentSection = null;

function calculateStats(section) {
    const s = { ...baseStats };
    if (section && sectionBonuses[section]) {
        for (const [k, v] of Object.entries(sectionBonuses[section])) {
            s[k] += v;
        }
    }
    return s;
}

// offset +4 pour centrer 0 sur le graphique
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
            backgroundColor: 'rgba(90, 106, 154, 0.22)',
            borderColor:     'rgba(138, 155, 196, 0.9)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(138,155,196,1)',
            pointBorderColor:     'rgba(194,205,224,0.9)',
            pointHoverBackgroundColor: '#c2cde0',
            pointHoverBorderColor:     'rgba(138,155,196,1)',
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
                backgroundColor: 'rgba(6,8,16,0.6)',
                ticks: {
                    stepSize: 2,
                    callback: v => v - 4,
                    color: '#5a6a8a',
                    backdropColor: 'rgba(6,8,16,0.8)',
                    font: { size: 11, weight: 'bold' }
                },
                grid:        { color: 'rgba(138,155,196,0.18)', circular: true },
                angleLines:  { color: 'rgba(138,155,196,0.18)' },
                pointLabels: {
                    color: '#8a9bc4',
                    font: { size: 14, weight: 'bold', family: "'Cinzel', serif" }
                }
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(6,8,16,0.95)',
                titleColor: '#8a9bc4',
                bodyColor:  '#c2cde0',
                borderColor: 'rgba(138,155,196,0.5)',
                borderWidth: 1,
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

// ─── INTERACTIVITÉ SECTIONS ───────────────────────────────────────────────
function updateChart(section) {
    statsChart.data.datasets[0].data = toChartData(calculateStats(section));
    statsChart.update();
    currentSection = section;
    updateSelection(section);
    updateDisplay(section);
}

function updateSelection(section) {
    document.querySelectorAll('.origin-card').forEach(c => c.classList.remove('selected'));
    if (section) {
        const card = document.querySelector(`.origin-card.${section}`);
        if (card) {
            card.classList.add('selected');
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

function updateDisplay(section) {
    const el = document.getElementById('section-display');
    if (!el) return;

    if (section) {
        const bonuses = sectionBonuses[section];
        const parts = Object.entries(bonuses).map(([k, v]) => `${k} ${v >= 0 ? '+' : ''}${v}`);
        el.innerHTML =
            `<strong>Section sélectionnée :</strong> ${sectionNames[section]}<br>
             <strong>Gains appliqués :</strong> ${parts.join(' · ')}`;
        el.style.display = 'block';
    } else {
        el.innerHTML = '<strong>Aucune section sélectionnée</strong> — Stats de base';
        el.style.display = 'block';
    }
}

// ─── INIT ────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const sectionKeys = Object.keys(sectionBonuses);

    document.querySelectorAll('.origin-card').forEach(card => {
        card.addEventListener('click', () => {
            const key = Array.from(card.classList).find(c => sectionKeys.includes(c));
            if (!key) return;
            updateChart(currentSection === key ? null : key);
        });
    });

    // Créer l'indicateur sous le graphique
    const chartContainer = document.querySelector('.chart-container');
    if (chartContainer) {
        const div = document.createElement('div');
        div.id = 'section-display';
        div.style.cssText = `
            margin-top: 18px; padding: 13px 16px;
            background: rgba(30,42,74,0.25);
            border: 1px solid rgba(138,155,196,0.25);
            text-align: center; font-size: 0.92rem;
            color: #8a9bc4; display: none;
            line-height: 1.6;
        `;
        chartContainer.appendChild(div);
    }

    // ─── PARTICULES ADDITIONNELLES ─────────────────────────────────
    const particlesEl = document.getElementById('particles');
    if (!particlesEl) return;

    const count = 18;
    for (let i = 0; i < count; i++) {
        const dot = document.createElement('div');
        const size = 2 + Math.random() * 3;
        const opacity = 0.05 + Math.random() * 0.18;
        const duration = 12 + Math.random() * 20;
        const delay = -(Math.random() * duration);
        const startX = Math.random() * 100;
        const startY = 100 + Math.random() * 20;
        const endY = -(10 + Math.random() * 20);

        dot.style.cssText = `
            position: absolute;
            width: ${size}px; height: ${size}px;
            border-radius: 50%;
            background: rgba(138,155,196,${opacity});
            left: ${startX}%;
            top: ${startY}%;
            animation: floatUp ${duration}s ${delay}s linear infinite;
            pointer-events: none;
        `;
        particlesEl.appendChild(dot);
    }

    // Injecter l'animation si pas déjà présente
    if (!document.getElementById('float-keyframes')) {
        const style = document.createElement('style');
        style.id = 'float-keyframes';
        style.textContent = `
            @keyframes floatUp {
                0%   { transform: translateY(0) translateX(0); opacity: 0; }
                10%  { opacity: 1; }
                90%  { opacity: 0.6; }
                100% { transform: translateY(-110vh) translateX(${(Math.random()-0.5)*60}px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
});