// ========== TYPEWRITER EFFECT ==========
function typewriterEffect(element, text, speed = 100) {
    let index = 0;
    element.textContent = '';
    element.style.borderRight = '3px solid #ff006e';

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        } else {
            element.style.borderRight = 'none';
        }
    }
    type();
}

// ========== PARTICLE SYSTEM ==========
class Particle {
    constructor(container) {
        this.container = container;
        this.element = document.createElement('div');
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = Math.random() * -2 - 1;
        this.life = 1;
        this.decay = Math.random() * 0.01 + 0.005;
        this.type = Math.random() > 0.7 ? 'heart' : 'glow';

        this.element.className = `particle ${this.type}`;
        if (this.type === 'heart') {
            this.element.textContent = '💜';
        }
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
        this.container.appendChild(this.element);
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy -= 0.1; // gravity
        this.life -= this.decay;

        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
        this.element.style.opacity = this.life;

        return this.life > 0;
    }
}

let particles = [];
const particlesContainer = document.getElementById('particles-container');

function animateParticles() {
    particles = particles.filter(p => p.update());
    requestAnimationFrame(animateParticles);
}

function createParticles(x, y, count = 5) {
    for (let i = 0; i < count; i++) {
        const particle = new Particle(particlesContainer);
        particle.x = x;
        particle.y = y;
        particles.push(particle);
    }
}

animateParticles();

// ========== BACKGROUND PARTICLES ON SCROLL ==========
window.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.95) {
        createParticles(e.clientX, e.clientY, 2);
    }
});

// ========== TYPEWRITER INITIALIZATION ==========
window.addEventListener('load', () => {
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        typewriterEffect(typewriterElement, 'Happy Birthday!', 80);
    }
});

// ========== BACKGROUND MUSIC CONTROL ==========
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
let isPlaying = false;

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicToggle.textContent = '🎵 Play Music';
        isPlaying = false;
    } else {
        bgMusic.play().catch(err => console.log('Audio play error:', err));
        musicToggle.textContent = '⏸ Pause Music';
        isPlaying = true;
    }
});

// ========== SCROLL REVEAL ANIMATION ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = entry.target.dataset.animation || 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all timeline items and gallery items
document.querySelectorAll('.timeline-item, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.dataset.animation = 'fadeInUp 0.8s ease forwards';
    observer.observe(el);
});

// ========== SURPRISE BUTTON ==========
const surpriseBtn = document.getElementById('surpriseBtn');
const surpriseBox = document.getElementById('surpriseBox');
const confetti = document.getElementById('confetti');

surpriseBtn.addEventListener('click', () => {
    if (surpriseBox.classList.contains('hidden')) {
        surpriseBox.classList.remove('hidden');
        createConfetti();
        triggerPartyAnimation();
        surpriseBtn.textContent = 'Clicked! 🎊';
    } else {
        surpriseBox.classList.add('hidden');
        confetti.innerHTML = '';
        surpriseBtn.textContent = 'Click Me! 🎉';
    }
});

// ========== CONFETTI ANIMATION ==========
function createConfetti() {
    confetti.innerHTML = ''; // Clear previous confetti
    const confettiCount = 30;

    for (let i = 0; i < confettiCount; i++) {
        const confettiPiece = document.createElement('div');
        confettiPiece.className = 'confetti';
        confettiPiece.style.left = Math.random() * 100 + '%';
        confettiPiece.style.backgroundColor = [
            '#ff006e',
            '#8338ec',
            '#3a86ff',
            '#fb5607',
            '#ffbe0b'
        ][Math.floor(Math.random() * 5)];
        confettiPiece.style.setProperty('--tx', (Math.random() - 0.5) * 200 + 'px');
        confetti.appendChild(confettiPiece);
    }
}

function triggerPartyAnimation() {
    // Create particles around the surprise box
    const box = surpriseBox.getBoundingClientRect();
    const centerX = box.left + box.width / 2;
    const centerY = box.top + box.height / 2;

    for (let i = 0; i < 20; i++) {
        createParticles(centerX, centerY, 1);
    }
}

// ========== SMOOTH SCROLL ENHANCEMENT ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== PARALLAX EFFECT ==========
window.addEventListener('scroll', () => {
    const heroSection = document.querySelector('.hero-section');
    const scrollPosition = window.pageYOffset;
    if (heroSection) {
        heroSection.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    }
});

// ========== GLOW CURSOR EFFECT ==========
const hero = document.querySelector('.hero-section');
if (hero) {
    hero.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        hero.style.backgroundPosition = `${x * 100}% ${y * 100}%`;
    });
}

// ========== WINDOW RESIZE HANDLER ==========
window.addEventListener('resize', () => {
    // Handle responsive adjustments if needed
});

// ========== LAZY LOAD IMAGES ==========
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                imageObserver.unobserve(entry.target);
            }
        });
    });
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        imageObserver.observe(img);
    });
}

// ========== SOUND EFFECTS (OPTIONAL) ==========
function playSound(frequency = 440, duration = 100) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.1, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
}

// Play sound on surprise
surpriseBtn.addEventListener('click', () => {
    playSound(523.25, 100); // C5 note
    setTimeout(() => playSound(659.25, 100), 100); // E5 note
    setTimeout(() => playSound(783.99, 150), 200); // G5 note
});

// ========== INITIALIZATION ==========
console.log('🎂 Happy Birthday Website Loaded! 🎂');

// Create initial floating particles
for (let i = 0; i < 15; i++) {
    setTimeout(() => {
        createParticles(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight,
            1
        );
    }, i * 200);
}