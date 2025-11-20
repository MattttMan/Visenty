// Interactive particle system
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let mouseTarget = { x: mouse.x, y: mouse.y };

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.baseOpacity = this.opacity;
    }

    update() {
        // Mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;
        
        if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const angle = Math.atan2(dy, dx);
            this.speedX -= Math.cos(angle) * force * 0.1;
            this.speedY -= Math.sin(angle) * force * 0.1;
            this.opacity = Math.min(1, this.baseOpacity + force * 0.5);
        } else {
            this.opacity = this.baseOpacity;
        }
        
        this.x += this.speedX;
        this.y += this.speedY;

        // Boundary bounce
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        
        // Friction
        this.speedX *= 0.98;
        this.speedY *= 0.98;
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const particles = [];
for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
}

// Mouse trail particles
const mouseTrail = [];
const maxTrailLength = 15;

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Smooth mouse position
    mouse.x += (mouseTarget.x - mouse.x) * 0.1;
    mouse.y += (mouseTarget.y - mouse.y) * 0.1;
    
    // Add to mouse trail
    mouseTrail.push({ x: mouse.x, y: mouse.y, opacity: 0.6 });
    if (mouseTrail.length > maxTrailLength) {
        mouseTrail.shift();
    }
    
    // Draw mouse trail
    mouseTrail.forEach((point, index) => {
        const opacity = (point.opacity * index) / mouseTrail.length;
        ctx.fillStyle = `rgba(0, 245, 255, ${opacity * 0.3})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
        ctx.fill();
    });
    
    // Draw mouse glow
    const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 100);
    gradient.addColorStop(0, 'rgba(0, 245, 255, 0.1)');
    gradient.addColorStop(1, 'rgba(0, 245, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(mouse.x - 100, mouse.y - 100, 200, 200);
    
    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        // Interactive connections
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 200) {
                const opacity = 0.05 * (1 - distance / 200);
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
        
        // Connect particles to mouse
        const dx = mouse.x - particles[i].x;
        const dy = mouse.y - particles[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
            const opacity = 0.15 * (1 - distance / 150);
            ctx.strokeStyle = `rgba(0, 245, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    }
    
    requestAnimationFrame(animateParticles);
}

animateParticles();

// Update mouse position
document.addEventListener('mousemove', (e) => {
    mouseTarget.x = e.clientX;
    mouseTarget.y = e.clientY;
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = Math.max(window.innerHeight, document.documentElement.scrollHeight);
});

// Update canvas height on scroll
function updateCanvasHeight() {
    canvas.height = Math.max(window.innerHeight, document.documentElement.scrollHeight);
}
updateCanvasHeight();
window.addEventListener('scroll', updateCanvasHeight);

// 3D Parallax effect - ultra smooth and premium
const content = document.querySelector('.content');
const companyName = document.querySelector('.company-name');
const word = document.querySelector('.word');
const tagline = document.querySelector('.tagline');
const taglineText = document.querySelector('.tagline-text');

// Magnetic hover setup
let magneticElements = [companyName, tagline];
let magneticTargets = {};
const magneticOffsets = {};

let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;
let isHovering = false;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) / window.innerWidth;
    mouseY = (e.clientY - window.innerHeight / 2) / window.innerHeight;
    
    // Update interactive lighting
    updateInteractiveLighting(e.clientX, e.clientY);
});

companyName.addEventListener('mouseenter', () => {
    isHovering = true;
});

companyName.addEventListener('mouseleave', () => {
    isHovering = false;
});

// Parallax disabled - keeping text fixed
function animateParallax() {
    // Text stays fixed - no movement
    content.style.transform = `none`;
    word.style.transform = `none`;
    tagline.style.transform = `none`;
}

// Only run once to set fixed position
animateParallax();

// Custom cursor - minimal and elegant
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.style.opacity = '1';
document.body.appendChild(cursor);

const cursorDot = document.createElement('div');
cursorDot.className = 'custom-cursor-dot';
cursorDot.style.opacity = '1';
document.body.appendChild(cursorDot);

let cursorX = window.innerWidth / 2;
let cursorY = window.innerHeight / 2;
let cursorDotX = cursorX;
let cursorDotY = cursorY;

document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
});

function animateCursor() {
    cursorDotX += (cursorX - cursorDotX) * 0.2;
    cursorDotY += (cursorY - cursorDotY) * 0.2;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    cursor.style.opacity = '1';
    cursor.style.transform = `translate(-50%, -50%) scale(${1 + Math.sin(Date.now() * 0.004) * 0.08})`;
    
    cursorDot.style.left = cursorDotX + 'px';
    cursorDot.style.top = cursorDotY + 'px';
    cursorDot.style.opacity = '1';
    cursorDot.style.transform = 'translate(-50%, -50%)';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Interactive hover effects for cursor
const interactiveElements = [companyName, taglineText];
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorDot.classList.add('hover');
        element.classList.add('interactive-hover');
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorDot.classList.remove('hover');
        element.classList.remove('interactive-hover');
    });
});

magneticElements.forEach(element => {
    magneticTargets[element] = { x: 0, y: 0 };
    
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        magneticTargets[element].x = x * 0.3;
        magneticTargets[element].y = y * 0.3;
    });
    
    element.addEventListener('mouseleave', () => {
        magneticTargets[element].x = 0;
        magneticTargets[element].y = 0;
    });
});

magneticElements.forEach(element => {
    magneticOffsets[element] = { x: 0, y: 0 };
});

// Animate magnetic effect
function animateMagnetic() {
    magneticElements.forEach(element => {
        const target = magneticTargets[element];
        const offset = magneticOffsets[element];
        
        offset.x += (target.x - offset.x) * 0.1;
        offset.y += (target.y - offset.y) * 0.1;
    });
    
    requestAnimationFrame(animateMagnetic);
}
animateMagnetic();

// Interactive lighting that follows mouse
function updateInteractiveLighting(x, y) {
    const light = document.querySelector('.light-3');
    if (light) {
        const moveX = (x / window.innerWidth - 0.5) * 200;
        const moveY = (y / window.innerHeight - 0.5) * 200;
        light.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
    }
}

// Interactive grid effect
const gridOverlay = document.querySelector('.grid-overlay');
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    gridOverlay.style.backgroundPosition = `${x * 0.5}% ${y * 0.5}%`;
});

// Smooth entrance animation with premium effects
window.addEventListener('load', () => {
    companyName.style.animation = 'fadeInUp 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
    tagline.style.animation = 'fadeInUp 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both';
    
    // Add subtle pulse effect
    setTimeout(() => {
        companyName.style.animation = 'fadeInUp 1.2s cubic-bezier(0.4, 0, 0.2, 1), pulse 4s ease-in-out infinite 2s';
    }, 2000);
});

// Add interactive ripple effect
companyName.addEventListener('click', (e) => {
    createRipple(e, companyName);
});

taglineText.addEventListener('click', (e) => {
    createRipple(e, tagline);
});

function createRipple(e, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(0, 245, 255, 0.4) 0%, transparent 70%);
        width: 100px;
        height: 100px;
        left: ${e.clientX - rect.left}px;
        top: ${e.clientY - rect.top}px;
        transform: translate(-50%, -50%);
        animation: ripple 0.8s ease-out;
        pointer-events: none;
        z-index: -1;
    `;
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 800);
}

// Add sparkle effect on hover
companyName.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.7) {
        createSparkle(e, companyName);
    }
});

function createSparkle(e, element) {
    const sparkle = document.createElement('div');
    const rect = element.getBoundingClientRect();
    sparkle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--accent);
        border-radius: 50%;
        left: ${e.clientX - rect.left}px;
        top: ${e.clientY - rect.top}px;
        transform: translate(-50%, -50%);
        animation: sparkle 0.6s ease-out;
        pointer-events: none;
        z-index: 100;
        box-shadow: 0 0 10px var(--accent);
    `;
    element.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 600);
}

// Add premium animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            filter: drop-shadow(0 0 30px rgba(0, 245, 255, 0.2));
        }
        50% {
            filter: drop-shadow(0 0 40px rgba(0, 245, 255, 0.3));
        }
    }
    
    @keyframes ripple {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
    
    @keyframes sparkle {
        0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(1) rotate(180deg);
            opacity: 0;
        }
    }
    
    .interactive-hover {
        animation: interactivePulse 0.6s ease-out;
    }
    
    @keyframes interactivePulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
`;
document.head.appendChild(style);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.main-nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll indicator arrow click handler
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const problemSection = document.querySelector('#problem');
        if (problemSection) {
            const navHeight = document.querySelector('.main-nav').offsetHeight;
            const targetPosition = problemSection.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
    
    // Add hover effect to cursor
    scrollIndicator.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorDot.classList.add('hover');
    });
    
    scrollIndicator.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorDot.classList.remove('hover');
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements that need scroll animations
const animatedElements = document.querySelectorAll(`
    .section-header,
    .stat-card,
    .problem-text,
    .work-step,
    .flow-node,
    .flow-connector,
    .solution-main-text,
    .solution-network-text,
    .demo-video-container,
    .capability-card,
    .network-intro,
    .network-item,
    .contact-form
`);

animatedElements.forEach(el => observer.observe(el));

// Animated counters
function animateCounter(element, target, duration = 2000, prefix = '') {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = prefix + formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = prefix + formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace('.0', '') + 'M';
    } else if (num >= 1000) {
        return num.toLocaleString();
    }
    return num.toString();
}

// Observe stat cards and impact stats for counter animation
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const numberElement = entry.target.querySelector('.stat-number');
            const target = parseInt(entry.target.dataset.target || (numberElement && numberElement.dataset.target) || 0);
            const prefix = entry.target.dataset.prefix || '';
            if (numberElement && target) {
                animateCounter(numberElement, target, 2000, prefix);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statObserver.observe(card);
});

// Flow node animation sequence
const flowNodes = document.querySelectorAll('.flow-node');
const flowConnectors = document.querySelectorAll('.flow-connector');

const flowObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            flowNodes.forEach((node, index) => {
                setTimeout(() => {
                    node.classList.add('visible');
                }, index * 300);
            });
            
            flowConnectors.forEach((connector, index) => {
                setTimeout(() => {
                    connector.classList.add('visible');
                }, (index + 1) * 300);
            });
        }
    });
}, { threshold: 0.3 });

const solutionVisual = document.querySelector('.solution-visual');
if (solutionVisual) {
    flowObserver.observe(solutionVisual);
}

// Form handling
const contactForm = document.getElementById('contactForm');
const contactSuccess = document.getElementById('contactSuccess');
const contactSuccessDefault = contactSuccess?.textContent;

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const variables = {
            name: formData.get('name'),
            email: formData.get('email'),
            company: formData.get('company'),
            message: formData.get('message'),
            time: new Date().toLocaleString()
        };

        try {
            await emailjs.send('service_5zkgd8k', 'template_f9qg8j6', variables);
            if (contactSuccessDefault) {
                contactSuccess.textContent = contactSuccessDefault;
            }
            contactSuccess.style.display = 'block';
            contactForm.reset();
        } catch (error) {
            contactSuccess.style.display = 'block';
            contactSuccess.textContent = 'Unable to send right now. Please email matthewdwulff@gmail.com.';
            console.error('EmailJS error', error);
        }
    });
}

// Navbar scroll effect
let lastScroll = 0;
const nav = document.querySelector('.main-nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.background = 'rgba(0, 0, 0, 0.6)';
        nav.style.backdropFilter = 'blur(30px)';
    } else {
        nav.style.background = 'rgba(0, 0, 0, 0.3)';
        nav.style.backdropFilter = 'blur(20px)';
    }
    
    lastScroll = currentScroll;
});

// Add hover effects to interactive elements
const allInteractiveElements = document.querySelectorAll('a, button, .nav-link, .contact-submit');
allInteractiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorDot.classList.add('hover');
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorDot.classList.remove('hover');
    });
});
