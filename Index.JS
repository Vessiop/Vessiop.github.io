// ========================================
// SYSTÈME D'ANIMATIONS TERMION
// Version Premium - Effets Météo Extrêmes
// ========================================

// ========================================
// WINDRESS - BLIZZARD AVEC POUDREUSE
// ========================================
class SnowflakeSystem {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.snowflakes = [];
        this.snowDust = [];
        this.maxSnowflakes = 80;
        this.maxSnowDust = 150;
        this.animationId = null;
        this.isActive = false;
        this.windStrength = 0;
        this.windDirection = 0;
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
        
        // Flocons principaux
        for (let i = 0; i < this.maxSnowflakes; i++) {
            this.snowflakes.push(new Snowflake(this.canvas.width, this.canvas.height));
        }
        
        // Poudreuse (petites particules)
        for (let i = 0; i < this.maxSnowDust; i++) {
            this.snowDust.push(new SnowDust(this.canvas.width, this.canvas.height));
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
        
        // Vent variable pour effet blizzard
        this.windStrength = Math.sin(Date.now() * 0.0005) * 2 + 1;
        this.windDirection = Math.cos(Date.now() * 0.0003) * 0.5;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Dessiner poudreuse d'abord (arrière-plan)
        this.snowDust.forEach(dust => {
            dust.update(this.canvas.width, this.canvas.height, this.windStrength, this.windDirection);
            dust.draw(this.ctx);
        });
        
        // Dessiner flocons principaux
        this.snowflakes.forEach(flake => {
            flake.update(this.canvas.width, this.canvas.height, this.windStrength, this.windDirection);
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
        this.speedY = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.opacity = Math.random() * 0.6 + 0.4;
    }

    update(canvasWidth, canvasHeight, windStrength, windDirection) {
        this.y += this.speedY;
        this.x += this.speedX + windStrength + windDirection;
        this.rotation += this.rotationSpeed;
        
        if (this.y > canvasHeight + 20 || this.x < -50 || this.x > canvasWidth + 50) {
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

// Poudreuse de neige (petites particules)
class SnowDust {
    constructor(canvasWidth, canvasHeight) {
        this.reset(canvasWidth, canvasHeight);
    }

    reset(canvasWidth, canvasHeight) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 1.5 + 0.3;
        this.speedY = Math.random() * 0.8 + 0.2;
        this.speedX = Math.random() * 1.5;
        this.opacity = Math.random() * 0.3 + 0.1;
    }

    update(canvasWidth, canvasHeight, windStrength, windDirection) {
        this.y += this.speedY;
        this.x += this.speedX + windStrength * 1.5 + windDirection * 2;
        
        if (this.y > canvasHeight + 10 || this.x < -20 || this.x > canvasWidth + 20) {
            this.x = Math.random() * canvasWidth;
            this.y = -10;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
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
// MARKARANE - TEMPÊTE DE SABLE
// ========================================
class SandstormSystem {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.sandWaves = [];
        this.sandParticles = [];
        this.largeSand = [];
        this.maxWaves = 8;
        this.maxParticles = 200;
        this.maxLargeSand = 60;
        this.animationId = null;
        this.isActive = false;
        this.stormIntensity = 0;
    }

    init() {
        if (this.canvas) return;

        this.canvas = document.createElement("canvas");
        this.canvas.id = "sandstorm-canvas";
        
        Object.assign(this.canvas.style, {
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            zIndex: "3",
            pointerEvents: "none",
            opacity: "0",
            transition: "opacity 1s ease"
        });
        
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d", { alpha: true });
        
        this.resize();
        window.addEventListener("resize", () => this.resize());
        
        // Vagues de sable (arrière-plan)
        for (let i = 0; i < this.maxWaves; i++) {
            this.sandWaves.push(new SandWave(this.canvas.width, this.canvas.height, i));
        }
        
        // Petites particules (nombreuses)
        for (let i = 0; i < this.maxParticles; i++) {
            this.sandParticles.push(new SandParticle(this.canvas.width, this.canvas.height));
        }
        
        // Gros grains de sable
        for (let i = 0; i < this.maxLargeSand; i++) {
            this.largeSand.push(new LargeSandGrain(this.canvas.width, this.canvas.height));
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
        
        // Intensité variable de la tempête
        this.stormIntensity = Math.sin(Date.now() * 0.0004) * 0.3 + 0.7;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Dessiner vagues de sable (arrière-plan)
        this.sandWaves.forEach(wave => {
            wave.update(this.stormIntensity);
            wave.draw(this.ctx);
        });
        
        // Dessiner petites particules
        this.sandParticles.forEach(particle => {
            particle.update(this.canvas.width, this.canvas.height, this.stormIntensity);
            particle.draw(this.ctx);
        });
        
        // Dessiner gros grains
        this.largeSand.forEach(sand => {
            sand.update(this.canvas.width, this.canvas.height, this.stormIntensity);
            sand.draw(this.ctx);
        });
    }
}

// Vagues de sable (effet de brume)
class SandWave {
    constructor(canvasWidth, canvasHeight, index) {
        this.width = canvasWidth;
        this.height = canvasHeight;
        this.y = (index / 8) * canvasHeight;
        this.offset = Math.random() * 1000;
        this.speed = 0.3 + index * 0.05;
        this.opacity = 0.03 + index * 0.01;
    }

    update(intensity) {
        this.offset += this.speed * intensity;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        
        const gradient = ctx.createLinearGradient(0, this.y, this.width, this.y);
        gradient.addColorStop(0, 'rgba(212, 161, 84, 0)');
        gradient.addColorStop(0.5, 'rgba(212, 161, 84, 0.8)');
        gradient.addColorStop(1, 'rgba(212, 161, 84, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, this.y, this.width, 80);
        
        ctx.restore();
    }
}

// Petites particules de sable (nombreuses)
class SandParticle {
    constructor(canvasWidth, canvasHeight) {
        this.reset(canvasWidth, canvasHeight);
    }

    reset(canvasWidth, canvasHeight) {
        this.x = Math.random() * canvasWidth - 100;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 1.2 + 0.3;
        this.speedX = Math.random() * 4 + 2;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.opacity = Math.random() * 0.4 + 0.2;
    }

    update(canvasWidth, canvasHeight, intensity) {
        this.x += this.speedX * intensity;
        this.y += this.speedY;
        
        if (this.x > canvasWidth + 100) {
            this.x = -100;
            this.y = Math.random() * canvasHeight;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = 'rgba(212, 161, 84, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Gros grains de sable
class LargeSandGrain {
    constructor(canvasWidth, canvasHeight) {
        this.reset(canvasWidth, canvasHeight);
    }

    reset(canvasWidth, canvasHeight) {
        this.x = Math.random() * canvasWidth - 150;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 3 + 1.5;
        this.speedX = Math.random() * 6 + 3;
        this.speedY = (Math.random() - 0.5) * 1.5;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.1;
    }

    update(canvasWidth, canvasHeight, intensity) {
        this.x += this.speedX * intensity * 1.3;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        
        if (this.x > canvasWidth + 150) {
            this.x = -150;
            this.y = Math.random() * canvasHeight;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = 'rgba(184, 133, 58, 0.9)';
        ctx.shadowBlur = 3;
        ctx.shadowColor = 'rgba(212, 161, 84, 0.5)';
        
        // Grain irrégulier
        ctx.beginPath();
        ctx.moveTo(-this.size, 0);
        ctx.lineTo(0, -this.size * 0.8);
        ctx.lineTo(this.size, 0);
        ctx.lineTo(0, this.size * 0.8);
        ctx.closePath();
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
const sandstormSystem = new SandstormSystem();

window.snowflakeSystem = snowflakeSystem;
window.volcanicSystem = volcanicSystem;
window.starSystem = starSystem;
window.sandstormSystem = sandstormSystem;

// ========================================
// SYSTÈME DE THÈMES
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.theme-tab');
    const body = document.body;
    let currentTheme = 'base';

    function changeTheme(themeName) {
        // Arrêter ancien
        snowflakeSystem.stop();
        volcanicSystem.stop();
        starSystem.stop();
        sandstormSystem.stop();
        
        body.className = body.className.replace(/theme-\w+/g, '').trim();
        
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
            sandstormSystem.start();
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
    
    // Charger le thème sauvegardé
    const savedTheme = localStorage.getItem('termion-theme') || 'base';
    changeTheme(savedTheme);
    
    console.log('✨ Termion animation system ready!');
    console.log('🌪️ Weather effects: Blizzard & Sandstorm');
});