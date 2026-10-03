(() => {
    'use strict';
    const panel = document.querySelector('[data-base-stats]');
    if (!panel) return;
    const baseStats = JSON.parse(panel.dataset.baseStats);
    const labels = Object.keys(baseStats);
    const cards = [...document.querySelectorAll('.origin-card[data-bonuses]')];
    const display = document.getElementById('current-origin-display');
    const canvas = document.getElementById('statsChart');
    const allValues = [baseStats, ...cards.map(card => {
        const bonuses = JSON.parse(card.dataset.bonuses);
        return Object.fromEntries(labels.map(key => [key, baseStats[key] + (bonuses[key] || 0)]));
    })].flatMap(stats => Object.values(stats));
    // Shift the radar values so negative modifiers are not clipped at its center.
    const minimum = Math.min(0, ...allValues) - 1;
    const maximum = Math.max(4, ...allValues) + 1;
    const toChart = stats => labels.map(key => stats[key] - minimum);
    const theme = getComputedStyle(document.body);
    const color = name => theme.getPropertyValue(name).trim();
    const accent = color('--accent');
    let chart = null;
    if (canvas && typeof Chart !== 'undefined') {
        chart = new Chart(canvas.getContext('2d'), {
            type: 'radar',
            data: { labels, datasets: [{ label: 'Caractéristiques', data: toChart(baseStats), borderColor: accent, backgroundColor: color('--chart-fill'), pointBackgroundColor: accent, pointBorderColor: color('--ink'), pointRadius: 4, borderWidth: 2 }] },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { r: { min: 0, max: maximum - minimum, ticks: { stepSize: 2, color: color('--muted'), backdropColor: color('--surface'), callback: value => value + minimum }, pointLabels: { color: color('--ink'), font: { size: 14 } }, grid: { color: color('--chart-grid') }, angleLines: { color: color('--chart-grid') } } },
                plugins: { legend: { display: false }, tooltip: { callbacks: { label: context => `${context.label} : ${context.parsed.r + minimum}` } } }
            }
        });
    } else if (canvas) {
        canvas.hidden = true;
        const fallback = document.getElementById('chart-fallback');
        if (fallback) fallback.hidden = false;
    }
    function selectOrigin(card) {
        const bonuses = card ? JSON.parse(card.dataset.bonuses) : {};
        const stats = Object.fromEntries(labels.map(key => [key, baseStats[key] + (bonuses[key] || 0)]));
        cards.forEach(item => {
            const selected = item === card;
            item.classList.toggle('selected', selected);
            const button = item.querySelector('[data-select-origin]');
            button.setAttribute('aria-pressed', String(selected));
        });
        panel.querySelectorAll('[data-stat]').forEach(item => {
            const key = item.dataset.stat;
            const value = stats[key];
            item.textContent = `${key} : ${value > 0 ? '+' : ''}${value}`;
            item.classList.remove('positive', 'negative', 'neutral');
            item.classList.add(value > 0 ? 'positive' : value < 0 ? 'negative' : 'neutral');
        });
        if (display) display.textContent = card ? `Origine : ${card.dataset.originName}` : 'Caractéristiques de base';
        if (chart) {
            chart.data.datasets[0].data = toChart(stats);
            chart.update();
        }
    }
    cards.forEach(card => card.querySelector('[data-select-origin]').addEventListener('click', () => selectOrigin(card.classList.contains('selected') ? null : card)));
    document.querySelector('[data-reset-origin]')?.addEventListener('click', () => selectOrigin(null));
})();
