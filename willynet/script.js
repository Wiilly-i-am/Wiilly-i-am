// Network Background Animation
class NetworkBackground {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.connections = [];
        this.mouse = { x: 0, y: 0 };
        this.animationId = null;

        this.init();
    }

    init() {
        this.createCanvas();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '0.1';
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.resize();
    }

    createParticles() {
        const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 15000);

        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.8 + 0.2,
                pulse: Math.random() * Math.PI * 2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach((particle, i) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.pulse += 0.02;

            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Draw particle
            const alpha = particle.opacity * (0.5 + 0.5 * Math.sin(particle.pulse));
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0, 212, 255, ${alpha})`;
            this.ctx.fill();

            // Draw connections
            this.particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    const alpha = (1 - distance / 100) * 0.2;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = `rgba(0, 255, 136, ${alpha})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            });
        });

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;

            // Add mouse interaction effect
            this.particles.forEach(particle => {
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    const force = (100 - distance) / 100;
                    particle.vx -= (dx / distance) * force * 0.01;
                    particle.vy -= (dy / distance) * force * 0.01;
                }
            });
        });
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas) {
            document.body.removeChild(this.canvas);
        }
    }
}

// Network Status Manager
class NetworkStatus {
    constructor() {
        this.metrics = {
            latency: 12,
            activeLobbies: 47,
            throughput: 2.4,
            status: 'online'
        };

        this.init();
    }

    init() {
        this.updateMetrics();
        this.createLatencyChart();

        // Update metrics every 5 seconds
        setInterval(() => this.updateMetrics(), 5000);
    }

    updateMetrics() {
        // Simulate real-time metrics
        this.metrics.latency = Math.floor(Math.random() * 20) + 8;
        this.metrics.activeLobbies = Math.floor(Math.random() * 20) + 40;
        this.metrics.throughput = (Math.random() * 2 + 1.5).toFixed(1);

        // Calculate lobby breakdown
        const casualCount = Math.floor(this.metrics.activeLobbies * 0.5) + Math.floor(Math.random() * 5);
        const rankedCount = Math.floor(this.metrics.activeLobbies * 0.35) + Math.floor(Math.random() * 3);
        const customCount = this.metrics.activeLobbies - casualCount - rankedCount + Math.floor(Math.random() * 3);

        // Update DOM elements
        const latencyEl = document.getElementById('globalLatency');
        const lobbiesEl = document.getElementById('activeLobbies');
        const throughputEl = document.getElementById('throughput');
        const casualEl = document.getElementById('casualLobbies');
        const rankedEl = document.getElementById('rankedLobbies');
        const customEl = document.getElementById('customLobbies');

        if (latencyEl) latencyEl.textContent = `${this.metrics.latency}ms`;
        if (lobbiesEl) lobbiesEl.textContent = this.metrics.activeLobbies;
        if (throughputEl) throughputEl.textContent = `${this.metrics.throughput}MB/s`;
        if (casualEl) casualEl.textContent = casualCount;
        if (rankedEl) rankedEl.textContent = rankedCount;
        if (customEl) customEl.textContent = customCount;

        this.updateConnectionStatus();
    }

    updateConnectionStatus() {
        const statusEl = document.getElementById('connectionStatus');
        if (!statusEl) return;

        const circle = statusEl.querySelector('i');
        const text = statusEl.querySelector('span');

        if (this.metrics.latency < 20) {
            circle.style.color = '#00ff88';
            text.textContent = 'Network Optimal';
        } else if (this.metrics.latency < 50) {
            circle.style.color = '#00d4ff';
            text.textContent = 'Network Good';
        } else {
            circle.style.color = '#ff4757';
            text.textContent = 'Network Slow';
        }
    }

    createLatencyChart() {
        const canvas = document.getElementById('latencyChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const data = Array.from({ length: 20 }, () => Math.random() * 30 + 5);

        const drawChart = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = '#00d4ff';
            ctx.lineWidth = 2;
            ctx.beginPath();

            data.forEach((value, index) => {
                const x = (index / (data.length - 1)) * canvas.width;
                const y = canvas.height - (value / 40) * canvas.height;

                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });

            ctx.stroke();

            // Add glow effect
            ctx.shadowColor = '#00d4ff';
            ctx.shadowBlur = 10;
            ctx.stroke();
            ctx.shadowBlur = 0;
        };

        // Initial draw
        drawChart();

        // Update chart every 2 seconds
        setInterval(() => {
            data.shift();
            data.push(this.metrics.latency);
            drawChart();
        }, 2000);
    }
}

// Smooth Scrolling Navigation
class Navigation {
    constructor() {
        this.init();
    }

    init() {
        this.bindScrollEvents();
        this.bindNavigationClicks();
        this.updateActiveSection();
    }

    bindScrollEvents() {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateActiveSection();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    bindNavigationClicks() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    updateActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
}

// Feature Cards Animation
class FeatureAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.observeElements();
        this.addHoverEffects();
    }

    observeElements() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        this.animateFeatureCard(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        document.querySelectorAll('.feature-card').forEach(card => {
            observer.observe(card);
        });
    }

    animateFeatureCard(card) {
        const icon = card.querySelector('.feature-icon');
        const metric = card.querySelector('.metric');

        if (icon) {
            icon.style.animation = 'iconPulse 0.6s ease-out';
        }

        if (metric) {
            setTimeout(() => {
                metric.style.animation = 'metricGlow 0.8s ease-out';
            }, 300);
        }
    }

    addHoverEffects() {
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.createParticleEffect(card);
            });
        });
    }

    createParticleEffect(element) {
        const rect = element.getBoundingClientRect();
        const particles = [];

        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = '#00d4ff';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1000';

            const x = rect.left + Math.random() * rect.width;
            const y = rect.top + Math.random() * rect.height;

            particle.style.left = x + 'px';
            particle.style.top = y + 'px';

            document.body.appendChild(particle);

            // Animate particle
            const animation = particle.animate([
                {
                    transform: 'translateY(0) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translateY(-${Math.random() * 100 + 50}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 1000 + Math.random() * 500,
                easing: 'ease-out'
            });

            animation.onfinish = () => {
                document.body.removeChild(particle);
            };
        }
    }
}

// Download Button Handler
class DownloadManager {
    constructor() {
        this.init();
    }

    init() {
        const downloadBtn = document.getElementById('downloadBtn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                this.showDownloadNotification();
            });
        }
    }

    showDownloadNotification() {
        // Create notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #b347ff 0%, #00d4ff 100%);
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
            z-index: 10000;
            font-family: 'Inter', sans-serif;
            font-weight: 600;
            max-width: 300px;
        `;

        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <i class="fas fa-info-circle"></i>
                <span>Development in Progress</span>
            </div>
            <div style="font-size: 0.875rem; opacity: 0.9;">
                WillyNet is currently under active development. Follow the GitHub repository for updates on the release.
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        notification.animate([
            { transform: 'translateX(100%)', opacity: 0 },
            { transform: 'translateX(0)', opacity: 1 }
        ], {
            duration: 300,
            easing: 'ease-out'
        });

        // Remove after 5 seconds
        setTimeout(() => {
            const fadeOut = notification.animate([
                { transform: 'translateX(0)', opacity: 1 },
                { transform: 'translateX(100%)', opacity: 0 }
            ], {
                duration: 300,
                easing: 'ease-in'
            });

            fadeOut.onfinish = () => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            };
        }, 5000);
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            fps: 60,
            memoryUsage: 0,
            loadTime: 0
        };

        this.init();
    }

    init() {
        this.measureLoadTime();
        this.startFPSMonitoring();
        this.startMemoryMonitoring();
    }

    measureLoadTime() {
        window.addEventListener('load', () => {
            this.metrics.loadTime = performance.now();
            console.log(`WillyNet loaded in ${this.metrics.loadTime.toFixed(2)}ms`);
        });
    }

    startFPSMonitoring() {
        let frames = 0;
        let lastTime = performance.now();

        const measureFPS = () => {
            frames++;
            const currentTime = performance.now();

            if (currentTime >= lastTime + 1000) {
                this.metrics.fps = Math.round((frames * 1000) / (currentTime - lastTime));
                frames = 0;
                lastTime = currentTime;
            }

            requestAnimationFrame(measureFPS);
        };

        requestAnimationFrame(measureFPS);
    }

    startMemoryMonitoring() {
        if ('memory' in performance) {
            setInterval(() => {
                this.metrics.memoryUsage = (performance.memory.usedJSHeapSize / 1048576).toFixed(2);
            }, 5000);
        }
    }

    getMetrics() {
        return this.metrics;
    }
}

// Add CSS animations
const additionalStyles = `
    @keyframes iconPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }

    @keyframes metricGlow {
        0% { 
            box-shadow: none; 
            transform: scale(1);
        }
        50% { 
            box-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
            transform: scale(1.05);
        }
        100% { 
            box-shadow: none;
            transform: scale(1);
        }
    }

    .animate-in {
        animation: slideInUp 0.6s ease-out;
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .nav-link.active {
        color: var(--neon-blue) !important;
    }

    .nav-link.active::after {
        width: 100% !important;
    }
`;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add additional styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);

    // Initialize components
    const networkBg = new NetworkBackground();
    const networkStatus = new NetworkStatus();
    const navigation = new Navigation();
    const featureAnimations = new FeatureAnimations();
    const downloadManager = new DownloadManager();
    const performanceMonitor = new PerformanceMonitor();

    // Console welcome message
    console.log(`
    ██╗    ██╗██╗██╗     ██╗  ██╗   ██╗███╗   ██╗███████╗████████╗
    ██║    ██║██║██║     ██║  ╚██╗ ██╔╝████╗  ██║██╔════╝╚══██╔══╝
    ██║ █╗ ██║██║██║     ██║   ╚████╔╝ ██╔██╗ ██║█████╗     ██║   
    ██║███╗██║██║██║     ██║    ╚██╔╝  ██║╚██╗██║██╔══╝     ██║   
    ╚███╔███╔╝██║███████╗███████╗██║   ██║ ╚████║███████╗   ██║   
     ╚══╝╚══╝ ╚═╝╚══════╝╚══════╝╚═╝   ╚═╝  ╚═══╝╚══════╝   ╚═╝   

    🔗 Serverless Lobby Browser for OLDR6s
    🚀 GitHub: https://github.com/Wiilly-i-am/WillyNet
    ⚡ Direct connections without VPN hassle
    `);



    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        networkBg.destroy();
    });
});

