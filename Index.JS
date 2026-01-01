// ========================================
// SYSTÈME D'ANIMATIONS TERMION
// Version Premium - Zéro Emoji
// ========================================

// ========================================
// WINDRESS - FLOCONS DESSINÉS
// ========================================
class SnowflakeSystem {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.snowflakes = [];
        this.maxSnowflakes = 60;
        this.animationId = null;
        this.isActive = false;
    }

    init() {
        if (this.canvas) return;

        this.canvas = document.createElement("canvas");
        this.canvas.id = "snowflake-canvas";
        
        Object.assign(this.canvas.style, {
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            zIndex: "3",
            pointerEvents: "none",
            opacity: "0",
            transition: "opacity 0.8s ease"
        });
        
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d", { alpha: true });
        
        this.resize();
        window.addEventListener("resize", () => this.resize());
        
        for (let i = 0; i < this.maxSnowflakes; i++) {
            this.snowflakes.push(new Snowflake(this.canvas.width, this.canvas.height));
        }
    }

    resize() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    start() {
        if (this.isActive) return;
        this.init();
        this.isActive = true;
        this.canvas.style.opacity = "1";
        this.animate();
    }

    stop() {
        if (!this.isActive) return;
        this.isActive = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        if (this.canvas) {
            this.canvas.style.opacity = "0";
        }
    }

    animate() {
        if (!this.isActive) return;
        this.animationId = requestAnimationFrame(() => this.animate());
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.snowflakes.forEach(flake => {
            flake.update(this.canvas.width, this.canvas.height);
            flake.draw(this.ctx);
        });
    }
}

class Snowflake {
    constructor(canvasWidth, canvasHeight) {
        this.reset(canvasWidth, canvasHeight);
    }

    reset(canvasWidth, canvasHeight) {
        this.x = Math.random() * canvasWidth;
        this.y = -20;
        this.size = Math.random() * 4 + 2;
        this.speedY = Math.random() * 1 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.opacity = Math.random() * 0.6 + 0.4;
    }

    update(canvasWidth, canvasHeight) {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
        
        if (this.y > canvasHeight + 20) {
            this.reset(canvasWidth, canvasHeight);
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        
        // Dessiner flocon (6 branches)
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        
        for (let i = 0; i < 6; i++) {
            ctx.save();
            ctx.rotate((Math.PI * 2 / 6) * i);
            
            // Branche principale
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -this.size * 3);
            ctx.stroke();
            
            // Branches secondaires
            ctx.beginPath();
            ctx.moveTo(0, -this.size * 1.5);
            ctx.lineTo(-this.size * 0.7, -this.size * 2.2);
            ctx.moveTo(0, -this.size * 1.5);
            ctx.lineTo(this.size * 0.7, -this.size * 2.2);
            ctx.stroke();
            
            ctx.restore();
        }
        
        ctx.restore();
    }
}

// ========================================
// PYLORIANNE - SYSTÈME VOLCANIQUE
// ========================================
class VolcanicSystem {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.bubbles = [];
        this.flows = [];
        this.ashes = [];
        this.flames = [];
        this.maxBubbles = 50;
        this.maxFlows = 15;
        this.maxAshes = 30;
        this.maxFlames = 120;
        this.animationId = null;
        this.isActive = false;
        this.gradientOffset = 0;
    }

    init() {
        if (this.canvas) return;

        this.canvas = document.createElement("canvas");
        this.canvas.id = "volcanic-canvas";
        
        Object.assign(this.canvas.style, {
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            zIndex: "0",
            pointerEvents: "none",
            opacity: "0",
            transition: "opacity 1s ease"
        });
        
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d", { alpha: false });
        
        this.resize();
        window.addEventListener("resize", () => this.resize());
        
        // Init éléments
        for (let i = 0; i < this.maxBubbles; i++) {
            this.bubbles.push(new LavaBubble(this.canvas.width, this.canvas.height));
        }
        for (let i = 0; i < this.maxFlows; i++) {
            this.flows.push(new LavaFlow(this.canvas.width, this.canvas.height));
        }
        for (let i = 0; i < this.maxAshes; i++) {
            this.ashes.push(new Ash(this.canvas.width, this.canvas.height));
        }
        for (let i = 0; i < this.maxFlames; i++) {
            this.flames.push(new Flame(this.canvas.width, this.canvas.height));
        }
    }

    resize() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    start() {
        if (this.isActive) return;
        this.init();
        this.isActive = true;
        this.canvas.style.opacity = "1";
        this.animate();
    }

    stop() {
        if (!this.isActive) return;
        this.isActive = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        if (this.canvas) {
            this.canvas.style.opacity = "0";
        }
    }

    drawGradient() {
        const w = this.canvas.width;
        const h = this.canvas.height;
        const pulse = Math.sin(this.gradientOffset * 0.02) * 0.1 + 0.9;
        
        const gradient = this.ctx.createLinearGradient(0, 0, 0, h);
        gradient.addColorStop(0, `rgba(20, 10, 5, ${pulse})`);
        gradient.addColorStop(0.4, `rgba(80, 20, 10, ${pulse})`);
        gradient.addColorStop(0.7, `rgba(180, 50, 20, ${pulse * 0.9})`);
        gradient.addColorStop(1, `rgba(220, 80, 30, ${pulse * 0.8})`);
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, w, h);
        
        this.gradientOffset += 0.5;
    }

    animate() {
        if (!this.isActive) return;
        this.animationId = requestAnimationFrame(() => this.animate());
        
        this.drawGradient();
        
        // Tout dessiner
        [...this.flows, ...this.bubbles, ...this.ashes, ...this.flames].forEach(elem => {
            elem.update(this.canvas.width, this.canvas.height);
            elem.draw(this.ctx);
        });
    }
}

class LavaBubble {
    constructor(w, h) {
        this.reset(w, h);
    }
    reset(w, h) {
        this.x = Math.random() * w;
        this.y = h + Math.random() * 200;
        this.size = Math.random() * 30 + 15;
        this.speedY = Math.random() * 1.2 + 0.4;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.04 + 0.02;
        this.opacity = Math.random() * 0.25 + 0.15;
    }
    update(w, h) {
        this.y -= this.speedY;
        this.wobble += this.wobbleSpeed;
        this.x += Math.sin(this.wobble) * 0.5;
        if (this.y < -this.size * 2) this.reset(w, h);
    }
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        grad.addColorStop(0, 'rgba(255, 180, 50, 0.7)');
        grad.addColorStop(0.6, 'rgba(255, 100, 30, 0.4)');
        grad.addColorStop(1, 'rgba(180, 50, 20, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

class LavaFlow {
    constructor(w, h) {
        this.reset(w, h);
    }
    reset(w, h) {
        this.x = Math.random() * w;
        this.y = -50;
        this.width = Math.random() * 20 + 8;
        this.height = Math.random() * 120 + 80;
        this.speedY = Math.random() * 1.5 + 0.8;
        this.opacity = Math.random() * 0.25 + 0.1;
    }
    update(w, h) {
        this.y += this.speedY;
        if (this.y > h + this.height) this.reset(w, h);
    }
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        const grad = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.height);
        grad.addColorStop(0, 'rgba(255, 200, 50, 0.5)');
        grad.addColorStop(0.6, 'rgba(255, 120, 30, 0.3)');
        grad.addColorStop(1, 'rgba(200, 60, 20, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
    }
}

class Ash {
    constructor(w, h) {
        this.reset(w, h);
    }
    reset(w, h) {
        this.x = Math.random() * w;
        this.y = h + Math.random() * 100;
        this.size = Math.random() * 2.5 + 0.8;
        this.speedY = Math.random() * 0.6 + 0.2;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.opacity = Math.random() * 0.4 + 0.2;
    }
    update(w, h) {
        this.y -= this.speedY;
        this.x += this.speedX;
        if (this.y < -10) this.reset(w, h);
    }
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = 'rgba(100, 80, 70, 0.7)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

class Flame {
    constructor(w, h) {
        this.reset(w, h);
    }
    reset(w, h) {
        this.x = Math.random() * w;
        this.y = h + Math.random() * 50;
        this.size = Math.random() * 10 + 4;
        this.speedY = Math.random() * 3 + 1.5;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.life = Math.random() * 60 + 40;
        this.maxLife = this.life;
        this.hue = Math.random() * 35;
    }
    update(w, h) {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.speedX *= 0.96;
        this.size *= 0.97;
        this.life--;
        this.hue = Math.max(0, this.hue - 0.3);
        if (this.life <= 0 || this.size < 0.5 || this.y < -50) this.reset(w, h);
    }
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = (this.life / this.maxLife) * 0.7;
        ctx.shadowBlur = 20;
        ctx.shadowColor = `hsl(${this.hue}, 100%, 60%)`;
        ctx.fillStyle = `hsl(${this.hue}, 100%, 60%)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// ========================================
// ARZASS - ÉTOILES MYSTIQUES
// ========================================
class StarSystem {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.stars = [];
        this.maxStars = 50;
        this.animationId = null;
        this.isActive = false;
    }

    init() {
        if (this.canvas) return;

        this.canvas = document.createElement("canvas");
        this.canvas.id = "star-canvas";
        
        Object.assign(this.canvas.style, {
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            zIndex: "3",
            pointerEvents: "none",
            opacity: "0",
            transition: "opacity 0.8s ease"
        });
        
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d", { alpha: true });
        
        this.resize();
        window.addEventListener("resize", () => this.resize());
        
        for (let i = 0; i < this.maxStars; i++) {
            this.stars.push(new MysticStar(this.canvas.width, this.canvas.height));
        }
    }

    resize() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    start() {
        if (this.isActive) return;
        this.init();
        this.isActive = true;
        this.canvas.style.opacity = "1";
        this.animate();
    }

    stop() {
        if (!this.isActive) return;
        this.isActive = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        if (this.canvas) {
            this.canvas.style.opacity = "0";
        }
    }

    animate() {
        if (!this.isActive) return;
        this.animationId = requestAnimationFrame(() => this.animate());
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.stars.forEach(star => {
            star.update();
            star.draw(this.ctx);
        });
    }
}

class MysticStar {
    constructor(canvasWidth, canvasHeight) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 3 + 2;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.03 + 0.02;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
    }

    update() {
        this.pulsePhase += this.pulseSpeed;
        this.rotation += this.rotationSpeed;
    }

    draw(ctx) {
        const pulse = Math.sin(this.pulsePhase) * 0.5 + 0.5;
        const opacity = pulse * 0.7 + 0.3;
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = opacity;
        
        // Étoile à 8 branches
        ctx.fillStyle = '#b794f6';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#b794f6';
        
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
            const angle = (Math.PI * 2 / 8) * i;
            const outerRadius = this.size * (1 + pulse * 0.3);
            const innerRadius = this.size * 0.4;
            
            const x1 = Math.cos(angle) * outerRadius;
            const y1 = Math.sin(angle) * outerRadius;
            const x2 = Math.cos(angle + Math.PI / 8) * innerRadius;
            const y2 = Math.sin(angle + Math.PI / 8) * innerRadius;
            
            if (i === 0) ctx.moveTo(x1, y1);
            else ctx.lineTo(x1, y1);
            ctx.lineTo(x2, y2);
        }
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
    }
}

// ========================================
// MARKARANE - DÉSERT
// ========================================
class DesertSystem {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.sands = [];
        this.nightStars = [];
        this.maxSands = 40;
        this.maxNightStars = 100;
        this.animationId = null;
        this.isActive = false;
    }

    init() {
        if (this.canvas) return;

        this.canvas = document.createElement("canvas");
        this.canvas.id = "desert-canvas";
        
        Object.assign(this.canvas.style, {
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            zIndex: "3",
            pointerEvents: "none",
            opacity: "0",
            transition: "opacity 0.8s ease"
        });
        
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d", { alpha: true });
        
        this.resize();
        window.addEventListener("resize", () => this.resize());
        
        for (let i = 0; i < this.maxSands; i++) {
            this.sands.push(new SandGrain(this.canvas.width, this.canvas.height));
        }
        
        for (let i = 0; i < this.maxNightStars; i++) {
            this.nightStars.push(new NightStar(this.canvas.width, this.canvas.height));
        }
    }

    resize() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    start() {
        if (this.isActive) return;
        this.init();
        this.isActive = true;
        this.canvas.style.opacity = "1";
        this.animate();
    }

    stop() {
        if (!this.isActive) return;
        this.isActive = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        if (this.canvas) {
            this.canvas.style.opacity = "0";
        }
    }

    animate() {
        if (!this.isActive) return;
        this.animationId = requestAnimationFrame(() => this.animate());
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Dessiner étoiles nocturnes si mode nuit
        const isNight = document.body.classList.contains('night');
        if (isNight) {
            this.nightStars.forEach(star => {
                star.update();
                star.draw(this.ctx);
            });
        }
        
        // Dessiner sable
        this.sands.forEach(sand => {
            sand.update(this.canvas.width, this.canvas.height);
            sand.draw(this.ctx);
        });
    }
}

class SandGrain {
    constructor(w, h) {
        this.reset(w, h);
    }
    reset(w, h) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 2 + 1;
        this.speedY = Math.random() * 0.4 + 0.1;
        this.speedX = Math.random() * 0.3;
        this.opacity = Math.random() * 0.3 + 0.2;
    }
    update(w, h) {
        this.y += this.speedY;
        this.x += this.speedX;
        if (this.y > h + 10) {
            this.y = -10;
            this.x = Math.random() * w;
        }
    }
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = 'rgba(212, 161, 84, 0.7)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

class NightStar {
    constructor(w, h) {
        this.x = Math.random() * w;
        this.y = Math.random() * (h * 0.6);
        this.size = Math.random() * 1.5 + 0.5;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
    }
    update() {
        this.pulsePhase += this.pulseSpeed;
    }
    draw(ctx) {
        const pulse = Math.sin(this.pulsePhase) * 0.5 + 0.5;
        ctx.save();
        ctx.globalAlpha = pulse * 0.8 + 0.2;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.shadowBlur = 3;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// ========================================
// GESTION GLOBALE
// ========================================
const snowflakeSystem = new SnowflakeSystem();
const volcanicSystem = new VolcanicSystem();
const starSystem = new StarSystem();
const desertSystem = new DesertSystem();

window.snowflakeSystem = snowflakeSystem;
window.volcanicSystem = volcanicSystem;
window.starSystem = starSystem;
window.desertSystem = desertSystem;

// ========================================
// SYSTÈME DE THÈMES
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.theme-tab');
    const body = document.body;
    const sun = document.getElementById('sun');
    let currentTheme = 'base';
    let isDragging = false;
    let sunFollowEnabled = false;
    let dayPhase = 'day'; // 'day', 'sunset', 'night'

    function changeTheme(themeName) {
        // Arrêter ancien
        snowflakeSystem.stop();
        volcanicSystem.stop();
        starSystem.stop();
        desertSystem.stop();
        
        body.className = body.className.replace(/theme-\w+/g, '').trim();
        body.classList.remove('sunset', 'night');
        
        if (themeName !== 'base') {
            body.classList.add(`theme-${themeName}`);
        }
        
        tabs.forEach(tab => {
            if (tab.dataset.theme === themeName) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        
        // Démarrer nouveau
        if (themeName === 'windress') {
            snowflakeSystem.start();
        } else if (themeName === 'pylorianne') {
            volcanicSystem.start();
        } else if (themeName === 'arzass') {
            starSystem.start();
        } else if (themeName === 'markarane') {
            desertSystem.start();
            dayPhase = 'day';
        }
        
        currentTheme = themeName;
        localStorage.setItem('termion-theme', themeName);
    }

    // Event listeners onglets
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            changeTheme(this.dataset.theme);
        });
    });

    // Soleil Markarane - Cycle jour/nuit
    if (sun) {
        sun.addEventListener('click', function() {
            if (isDragging || currentTheme !== 'markarane') return;
            
            if (dayPhase === 'day') {
                dayPhase = 'sunset';
                body.classList.add('sunset');
            } else if (dayPhase === 'sunset') {
                dayPhase = 'night';
                body.classList.remove('sunset');
                body.classList.add('night');
            } else {
                dayPhase = 'day';
                body.classList.remove('night');
            }
        });

        // Drag & drop du soleil
        sun.addEventListener('mousedown', startDrag);
        sun.addEventListener('touchstart', startDrag);
        
        function startDrag(e) {
            if (currentTheme !== 'markarane') return;
            isDragging = true;
            sunFollowEnabled = true;
            e.preventDefault();
        }
        
        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag);
        
        function drag(e) {
            if (!sunFollowEnabled) return;
            
            const x = e.clientX || (e.touches && e.touches[0].clientX);
            const y = e.clientY || (e.touches && e.touches[0].clientY);
            
            if (x && y) {
                const sunContainer = document.querySelector('.sun-container');
                if (sunContainer) {
                    sunContainer.style.left = x + 'px';
                    sunContainer.style.top = y + 'px';
                    sunContainer.style.transform = 'translate(-50%, -50%)';
                }
            }
        }
        
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('touchend', stopDrag);
        
        function stopDrag() {
            setTimeout(() => { isDragging = false; }, 100);
        }
    }
    
    // Charger le thème sauvegardé
    const savedTheme = localStorage.getItem('termion-theme') || 'base';
    changeTheme(savedTheme);
    
    console.log('✨ Termion animation system ready!');
    console.log('🎨 Premium animations - Zero emoji');
});