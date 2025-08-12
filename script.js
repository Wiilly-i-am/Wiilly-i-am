// Global variables
let currentTypeIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const typeSpeed = 100;
const deleteSpeed = 50;
const pauseTime = 2000;

const typingTexts = [
    "I like to say I'm the God of stacks...",
    "But really I just run the stack.",
    "Building cybersecurity tools.",
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    initializeLoading();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize typing animation
    initializeTypingAnimation();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Project filtering removed
    
    // Initialize skill animations
    initializeSkillAnimations();
    

    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize easter egg
    initializeEasterEgg();
});

// Loading Screen
function initializeLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        // Start other animations after loading
        setTimeout(() => {
            document.body.style.overflow = 'visible';
            initializeHeroAnimations();
        }, 500);
    }, 2000);
}

// Navigation
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksArray = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link
        updateActiveNavLink();
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on links
    navLinksArray.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Hero Animations
function initializeHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero-content > *');
    
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Typing Animation
function initializeTypingAnimation() {
    const typingElement = document.getElementById('typingText');
    
    function typeText() {
        const currentText = typingTexts[currentTypeIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            
            if (currentCharIndex === 0) {
                isDeleting = false;
                currentTypeIndex = (currentTypeIndex + 1) % typingTexts.length;
                setTimeout(typeText, 500);
                return;
            }
            
            setTimeout(typeText, deleteSpeed);
        } else {
            typingElement.textContent = currentText.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            
            if (currentCharIndex === currentText.length) {
                isDeleting = true;
                setTimeout(typeText, pauseTime);
                return;
            }
            
            setTimeout(typeText, typeSpeed);
        }
    }
    
    setTimeout(typeText, 1000);
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger specific animations based on element
                if (entry.target.classList.contains('skill-progress')) {
                    animateSkillBar(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Make all content immediately visible instead of using fade animations
    document.querySelectorAll('.section-header, .project-card, .about-text, .about-image').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0) translateX(0)';
    });
    

}

// Project Filtering
function initializeProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// Skill Animations
function initializeSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Make skill bars visible immediately without fade-in animation
    skillBars.forEach(bar => {
        setTimeout(() => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        }, 500);
    });
}

function animateSkillBar(skillBar) {
    const progress = skillBar.getAttribute('data-progress');
    
    setTimeout(() => {
        skillBar.style.width = progress + '%';
    }, 500);
}



// Smooth Scrolling
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Tech Icon Interactions
document.addEventListener('DOMContentLoaded', function() {
    const techIcons = document.querySelectorAll('.tech-icon');
    
    techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            const tech = this.getAttribute('data-tech');
            showTechTooltip(this, tech);
        });
        
        icon.addEventListener('mouseleave', function() {
            hideTechTooltip();
        });
    });
});

function showTechTooltip(element, tech) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tech-tooltip';
    tooltip.textContent = `${tech}`;
    tooltip.style.cssText = `
        position: absolute;
        bottom: -40px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--bg-primary);
        color: var(--text-primary);
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        white-space: nowrap;
        border: 1px solid var(--border-color);
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.2s ease;
    `;
    
    element.style.position = 'relative';
    element.appendChild(tooltip);
    
    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 100);
}

function hideTechTooltip() {
    const tooltip = document.querySelector('.tech-tooltip');
    if (tooltip) {
        tooltip.style.opacity = '0';
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 200);
    }
}

// Particle animation for hero background
function initializeParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 1;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const duration = Math.random() * 20 + 10;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(99, 102, 241, 0.5);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        animation: float ${duration}s ease-in-out infinite;
        pointer-events: none;
    `;
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
        createParticle(container); // Create new particle
    }, duration * 1000);
}

// Initialize particles after page load
window.addEventListener('load', () => {
    setTimeout(initializeParticles, 1000);
});



// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize all features
document.addEventListener('DOMContentLoaded', function() {
    // Add loading delay for better UX
    setTimeout(() => {
        initializeLazyLoading();
    }, 3000);
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    showNotification('Something went wrong. Please refresh the page.', 'error');
});

// Service worker registration for PWA features (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker would be registered here for offline functionality
        console.log('PWA features available');
    });
}

// Easter Egg - Poetry
function initializeEasterEgg() {
    const poem = `The caterpillar is a prisoner to the streets that conceived it
Its only job is to eat or consume everything around it, in order to protect itself from this mad city
While consuming its environment the caterpillar begins to notice ways to survive
One thing it noticed is how much the world shuns him, but praises the butterfly
The butterfly represents the talent, the thoughtfulness, and the beauty within the caterpillar
But having a harsh outlook on life the caterpillar sees the butterfly as weak and figures out a way to pimp it to his own benefits
Already surrounded by this mad city the caterpillar goes to work on the cocoon which institutionalizes him
He can no longer see past his own thoughts He's trapped
When trapped inside these walls certain ideas take roots, such as going home, and bringing back new concepts to this mad city
The result?
Wings begin to emerge, breaking the cycle of feeling stagnant
Finally free, the butterfly sheds light on situations that the caterpillar never considered, ending the internal struggle
Although the butterfly and caterpillar are completely different, they are one and the same.`;

    // Console access
    console.log('🔑 Easter egg available! Try the key combo: ↑ ↓ M O R');
    console.butterfly = () => {
        console.log('%c' + poem, 'color: #6366f1; font-style: italic; line-height: 1.6; font-size: 14px; font-family: serif;');
    };

    // Key sequence tracking
    let keySequence = [];
    const targetSequence = ['ArrowUp', 'ArrowDown', 'KeyM', 'KeyO', 'KeyR'];
    
    document.addEventListener('keydown', function(e) {
        keySequence.push(e.code);
        
        // Keep only the last 5 keys
        if (keySequence.length > targetSequence.length) {
            keySequence.shift();
        }
        
        // Check if sequence matches
        if (keySequence.length === targetSequence.length && 
            keySequence.every((key, index) => key === targetSequence[index])) {
            
            // Display the poem
            displayPoem(poem);
            keySequence = []; // Reset sequence
        }
    });
}

function displayPoem(poem) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.5s ease;
    `;
    
    // Create poem container
    const poemContainer = document.createElement('div');
    poemContainer.style.cssText = `
        background: linear-gradient(135deg, #1a1a2e, #16213e);
        color: #e2e8f0;
        padding: 40px;
        border-radius: 16px;
        width: 90vw;
        max-width: 1200px;
        max-height: 85vh;
        overflow-y: auto;
        margin: 20px;
        border: 2px solid #6366f1;
        box-shadow: 0 20px 40px rgba(99, 102, 241, 0.3);
        transform: scale(0.8);
        transition: transform 0.5s ease;
    `;
    
    poemContainer.innerHTML = `
        <div style="text-align: center; margin-bottom: 25px;">
            <h3 style="color: #6366f1; margin: 0; font-size: 24px; font-weight: 600;">🦋 The Caterpillar & The Butterfly</h3>
        </div>
        <div style="display: flex; gap: 40px; align-items: flex-start;">
            <div style="flex: 1; min-width: 450px;">
                <div style="font-family: serif; line-height: 1.8; font-size: 18px; font-style: italic; white-space: pre-line; margin-bottom: 25px;">
${poem}
                </div>
                <div style="text-align: right; font-style: italic; color: #94a3b8; font-size: 16px; margin-top: 20px;">
                    — Kendrick Lamar Duckworth, Mortal Man
                </div>
            </div>
            <div style="flex: 0 0 350px; display: flex; flex-direction: column; gap: 20px;">
                <div style="text-align: center; color: #6366f1; font-weight: 600; font-size: 18px; margin-bottom: 10px;">
                    🎵 Listen to the Song
                </div>
                <iframe data-testid="embed-iframe" style="border-radius:12px; border: 1px solid #374151; display: block;" src="https://open.spotify.com/embed/track/1WT11QmhZutciEv1NsHt1R?utm_source=generator&theme=0" width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            </div>
        </div>
        <div style="text-align: center; margin-top: 30px;">
            <button id="closePoem" style="
                background: #6366f1;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 16px;
                font-weight: 500;
                transition: background 0.3s ease;
            ">Close</button>
        </div>
    `;
    
    overlay.appendChild(poemContainer);
    document.body.appendChild(overlay);
    
    // Animate in
    setTimeout(() => {
        overlay.style.opacity = '1';
        poemContainer.style.transform = 'scale(1)';
    }, 50);
    
    // Close functionality
    document.getElementById('closePoem').addEventListener('click', () => {
        overlay.style.opacity = '0';
        poemContainer.style.transform = 'scale(0.8)';
        setTimeout(() => {
            document.body.removeChild(overlay);
        }, 500);
    });
    
    // Close on backdrop click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            document.getElementById('closePoem').click();
        }
    });
}
