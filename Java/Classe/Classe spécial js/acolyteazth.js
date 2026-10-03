document.addEventListener('DOMContentLoaded', () => {
    // ─────────────────────────────────────────────────────────────
    // DONNÉES DE BASE
    // ─────────────────────────────────────────────────────────────
    const statsSection = document.querySelector('#statistiques');

    let baseStats = {
        FOR: 0,
        CST: 2,
        DEX: -2,
        INT: 1,
        SAG: 4,
        PER: 2,
        CHA: -3
    };

    if (statsSection?.dataset.baseStats) {
        try {
            baseStats = JSON.parse(statsSection.dataset.baseStats);
        } catch (error) {
            console.warn('Impossible de lire les statistiques de base.', error);
        }
    }

    let currentStats = { ...baseStats };
    let selectedOrigin = null;

    const statLabels = ['FOR', 'CST', 'DEX', 'INT', 'SAG', 'PER', 'CHA'];

    // ─────────────────────────────────────────────────────────────
    // RADAR CHART
    // ─────────────────────────────────────────────────────────────
    const canvas = document.getElementById('statsChart');
    const fallback = document.getElementById('chart-fallback');

    let statsChart = null;

    function transformStats(stats) {
        return statLabels.map(stat => stats[stat] + 5);
    }

    function createChart() {
        if (!canvas || typeof Chart === 'undefined') {
            if (canvas) canvas.hidden = true;
            if (fallback) fallback.hidden = false;
            return;
        }

        const ctx = canvas.getContext('2d');

        statsChart = new Chart(ctx, {
            type: 'radar',

            data: {
                labels: statLabels,
                datasets: [
                    {
                        label: 'Caractéristiques',
                        data: transformStats(currentStats),

                        backgroundColor: 'rgba(130, 0, 20, 0.30)',
                        borderColor: 'rgba(220, 32, 60, 0.95)',
                        borderWidth: 2.5,

                        pointBackgroundColor: '#e8d6b0',
                        pointBorderColor: '#8a0018',
                        pointBorderWidth: 2,

                        pointRadius: 5,
                        pointHoverRadius: 8,

                        pointHoverBackgroundColor: '#ffffff',
                        pointHoverBorderColor: '#c8102e'
                    }
                ]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,

                animation: {
                    duration: 950,
                    easing: 'easeInOutQuart'
                },

                scales: {
                    r: {
                        min: 0,
                        max: 12,

                        ticks: {
                            stepSize: 2,

                            callback(value) {
                                return value - 5;
                            },

                            color: '#c9b58c',
                            backdropColor: 'rgba(10, 5, 8, 0.82)',

                            font: {
                                size: 11,
                                weight: 'bold'
                            }
                        },

                        grid: {
                            color: 'rgba(145, 25, 40, 0.30)',
                            circular: true
                        },

                        angleLines: {
                            color: 'rgba(145, 25, 40, 0.30)'
                        },

                        pointLabels: {
                            color: '#d9c29a',

                            font: {
                                size: 14,
                                weight: 'bold',
                                family: "'Cinzel', serif"
                            }
                        }
                    }
                },

                plugins: {
                    legend: {
                        display: false
                    },

                    tooltip: {
                        backgroundColor: 'rgba(12, 5, 8, 0.96)',

                        titleColor: '#e3c99b',
                        bodyColor: '#f3e7d2',

                        borderColor: 'rgba(170, 20, 40, 0.7)',
                        borderWidth: 1,

                        callbacks: {
                            label(context) {
                                const value = context.parsed.r - 5;

                                return `${context.label} : ${
                                    value >= 0 ? '+' : ''
                                }${value}`;
                            }
                        }
                    }
                }
            }
        });
    }

    createChart();

    // ─────────────────────────────────────────────────────────────
    // MISE À JOUR DES STATS
    // ─────────────────────────────────────────────────────────────
    function calculateOriginStats(originCard) {
        const stats = { ...baseStats };

        if (!originCard) {
            return stats;
        }

        try {
            const bonuses = JSON.parse(originCard.dataset.bonuses || '{}');

            Object.entries(bonuses).forEach(([stat, value]) => {
                if (stats[stat] !== undefined) {
                    stats[stat] += Number(value);
                }
            });
        } catch (error) {
            console.warn('Bonus d’origine invalide.', error);
        }

        return stats;
    }

    function updateStatBoxes(stats) {
        document.querySelectorAll('[data-stat]').forEach(element => {
            const stat = element.dataset.stat;
            const value = stats[stat];

            if (value === undefined) return;

            element.textContent =
                `${stat} : ${value > 0 ? '+' : ''}${value}`;

            element.classList.remove(
                'positive',
                'negative',
                'neutral',
                'stat-flash'
            );

            if (value > 0) {
                element.classList.add('positive');
            } else if (value < 0) {
                element.classList.add('negative');
            } else {
                element.classList.add('neutral');
            }

            void element.offsetWidth;
            element.classList.add('stat-flash');
        });
    }

    function updateChart(stats) {
        if (!statsChart) return;

        statsChart.data.datasets[0].data = transformStats(stats);
        statsChart.update();
    }

    function updateStats(stats) {
        currentStats = stats;

        updateStatBoxes(stats);
        updateChart(stats);
    }

    // ─────────────────────────────────────────────────────────────
    // ORIGINES
    // ─────────────────────────────────────────────────────────────
    const originCards = document.querySelectorAll('.origin-card');
    const currentOriginDisplay =
        document.getElementById('current-origin-display');

    function clearOriginSelection() {
        originCards.forEach(card => {
            card.classList.remove('selected', 'origin-consecrated');

            const button = card.querySelector('[data-select-origin]');

            if (button) {
                button.setAttribute('aria-pressed', 'false');
                button.textContent = 'Consacrer cette origine';
            }
        });
    }

    function selectOrigin(card) {
        if (!card) {
            selectedOrigin = null;
            clearOriginSelection();
            updateStats({ ...baseStats });
            if (currentOriginDisplay) {
                currentOriginDisplay.textContent = 'Caractéristiques de base';
            }
            return;
        }

        clearOriginSelection();

        selectedOrigin = card;

        card.classList.add('selected');

        const button = card.querySelector('[data-select-origin]');

        if (button) {
            button.setAttribute('aria-pressed', 'true');
            button.textContent = 'Origine consacrée';
        }

        const originName =
            card.dataset.originName ||
            card.querySelector('h3')?.textContent ||
            'Origine';

        if (currentOriginDisplay) {
            currentOriginDisplay.innerHTML = `
                <span class="selection-prefix">Origine consacrée</span>
                <strong>${originName}</strong>
            `;
        }

        const stats = calculateOriginStats(card);

        updateStats(stats);

        triggerConsecration(card);
    }

    originCards.forEach(card => {
        const button = card.querySelector('[data-select-origin]');

        if (!button) return;

        button.addEventListener('click', event => {
            event.stopPropagation();

            selectOrigin(selectedOrigin === card ? null : card);
        });

        card.addEventListener('dblclick', () => {
            selectOrigin(card);
        });
    });

    // ─────────────────────────────────────────────────────────────
    // RÉINITIALISATION
    // ─────────────────────────────────────────────────────────────
    const resetButton = document.querySelector('[data-reset-origin]');

    if (resetButton) {
        resetButton.addEventListener('click', () => {
            selectOrigin(null);
        });
    }

    // ─────────────────────────────────────────────────────────────
    // ANIMATION DE CONSÉCRATION
    // ─────────────────────────────────────────────────────────────
    function triggerConsecration(card) {
        card.classList.remove('origin-consecrated');

        void card.offsetWidth;

        card.classList.add('origin-consecrated');

        createBloodPulse(card);

        setTimeout(() => {
            card.classList.remove('origin-consecrated');
        }, 900);
    }

    function createBloodPulse(element) {
        const pulse = document.createElement('span');

        pulse.className = 'blood-selection-pulse';

        element.appendChild(pulse);

        requestAnimationFrame(() => {
            pulse.classList.add('active');
        });

        setTimeout(() => {
            pulse.remove();
        }, 1000);
    }

    // ─────────────────────────────────────────────────────────────
    // PARTICULES RITUELLES
    // ─────────────────────────────────────────────────────────────
    function createRitualParticles() {
        const layer = document.getElementById('ritual-particles');
        if (!layer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const particleCount = window.innerWidth < 768 ? 18 : 34;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('span');

            particle.className = 'ritual-particle';

            const size = 2 + Math.random() * 4;
            const left = Math.random() * 100;
            const duration = 12 + Math.random() * 20;
            const delay = -(Math.random() * duration);
            const drift = -40 + Math.random() * 80;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${left}%`;

            particle.style.setProperty(
                '--duration',
                `${duration}s`
            );

            particle.style.setProperty(
                '--delay',
                `${delay}s`
            );

            particle.style.setProperty(
                '--drift',
                `${drift}px`
            );

            layer.appendChild(particle);
        }
    }

    createRitualParticles();

    // ─────────────────────────────────────────────────────────────
    // SCEAU RITUEL D’ARRIÈRE-PLAN
    // ─────────────────────────────────────────────────────────────
    // ─────────────────────────────────────────────────────────────
    // APPARITION DES SECTIONS AU SCROLL
    // ─────────────────────────────────────────────────────────────
    const revealElements = document.querySelectorAll('.reveal-section');

    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add('is-visible');
                entry.target.classList.remove('reveal-pending');

                revealObserver.unobserve(entry.target);
            });
        },
        {
            threshold: 0,
            rootMargin: '0px'
        }
    );

    revealElements.forEach(element => {
        element.classList.add('reveal-pending');
        revealObserver.observe(element);
    });

    // ─────────────────────────────────────────────────────────────
    // NAVIGATION ACTIVE
    // ─────────────────────────────────────────────────────────────
    const navLinks = document.querySelectorAll('.class-nav a');

    const sectionMap = [];

    navLinks.forEach(link => {
        const href = link.getAttribute('href');

        if (!href?.startsWith('#')) return;

        const section = document.querySelector(href);

        if (!section) return;

        sectionMap.push({
            section,
            link
        });
    });

    const navObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                const match = sectionMap.find(
                    item => item.section === entry.target
                );

                match?.link.classList.add('active');
            });
        },
        {
            rootMargin: '-35% 0px -55% 0px',
            threshold: 0
        }
    );

    sectionMap.forEach(({ section }) => {
        navObserver.observe(section);
    });

    // ─────────────────────────────────────────────────────────────
    // SCROLL DOUX
    // ─────────────────────────────────────────────────────────────
    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            const href = link.getAttribute('href');

            if (!href?.startsWith('#')) return;

            const target = document.querySelector(href);

            if (!target) return;

            event.preventDefault();

            const navHeight = document.querySelector('.class-nav')?.offsetHeight || 0;
            window.scrollTo({
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
                top: window.scrollY + target.getBoundingClientRect().top - navHeight - 20
            });
        });
    });

    // ─────────────────────────────────────────────────────────────
    // HERO : EFFET DE PROFONDEUR
    // ─────────────────────────────────────────────────────────────
    const heroImage = document.querySelector('.relic-frame');

    if (heroImage && window.matchMedia('(pointer:fine)').matches) {
        heroImage.addEventListener('mousemove', event => {
            const rect = heroImage.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) / rect.width - 0.5;

            const y =
                (event.clientY - rect.top) / rect.height - 0.5;

            heroImage.style.transform =
                `perspective(900px)
                 rotateX(${y * -5}deg)
                 rotateY(${x * 5}deg)
                 translateY(-3px)`;
        });

        heroImage.addEventListener('mouseleave', () => {
            heroImage.style.transform = '';
        });
    }

    // ─────────────────────────────────────────────────────────────
    // SANG VÉRITABLE — JAUGE VISUELLE
    // ─────────────────────────────────────────────────────────────
    function initBloodGauge() {
        const gauge = document.querySelector('[data-blood-gauge]');

        if (!gauge) return;

        const segments =
            gauge.querySelectorAll('.blood-gauge-segment');

        const threshold = Number(gauge.dataset.threshold) || 3;

        segments.forEach((segment, index) => {
            segment.dataset.value = index + 1;

            if (index + 1 <= threshold) {
                segment.classList.add('threshold-segment');
            }
        });
    }

    initBloodGauge();

    // ─────────────────────────────────────────────────────────────
    // EFFET SUBTIL SUR LES TITRES
    // ─────────────────────────────────────────────────────────────
    document.querySelectorAll('.section-title, .section h2').forEach(title => {
        title.addEventListener('mouseenter', () => {
            title.classList.add('title-awakened');
        });

        title.addEventListener('mouseleave', () => {
            title.classList.remove('title-awakened');
        });
    });

    // ─────────────────────────────────────────────────────────────
    // ACCESSIBILITÉ : RÉDUCTION DES ANIMATIONS
    // ─────────────────────────────────────────────────────────────
    const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    );

    if (reducedMotion.matches) {
        document.documentElement.classList.add('reduced-motion');
    }

    reducedMotion.addEventListener?.('change', event => {
        document.documentElement.classList.toggle(
            'reduced-motion',
            event.matches
        );
    });

    // ─────────────────────────────────────────────────────────────
    // ÉTAT INITIAL
    // ─────────────────────────────────────────────────────────────
    updateStatBoxes(baseStats);
});
