// Create grid lines dynamically for cyberpunk effect
document.addEventListener('DOMContentLoaded', () => {
    createGridLines();
    createCyberpunkElements();
    
    // Immediately activate home section elements
    document.querySelectorAll('#home .animate').forEach(el => {
        el.classList.add('active');
    });
});

function createGridLines() {
    const gridContainer = document.querySelector('.bg-grid');
    
    // Create vertical lines
    for (let i = 1; i < 20; i++) {
        const line = document.createElement('div');
        line.classList.add('grid-line', 'grid-line-vertical');
        line.style.left = `${i * 5}%`;
        gridContainer.appendChild(line);
    }
    
    // Create horizontal lines
    for (let i = 1; i < 20; i++) {
        const line = document.createElement('div');
        line.classList.add('grid-line', 'grid-line-horizontal');
        line.style.top = `${i * 5}%`;
        gridContainer.appendChild(line);
    }
}

function createCyberpunkElements() {
    // Add random floating particles
    const body = document.body;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('cyber-particle');
        particle.style.width = `${Math.random() * 3 + 1}px`;
        particle.style.height = `${Math.random() * 3 + 1}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        body.appendChild(particle);
    }
}

// Toggle Menu Icon
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
};

// Scroll Section Active Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

// Handle scroll events
window.addEventListener('scroll', () => {
    // Sticky Header
    const header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);
    
    // Hide mobile menu on scroll
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
    
    // Active section detection
    let currentSection = '';
    
    sections.forEach(sec => {
        const sectionTop = sec.offsetTop - 150;
        const sectionHeight = sec.offsetHeight;
        const scrollY = window.scrollY;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = sec.getAttribute('id');
            
            // Animate elements in current section
            const animElements = sec.querySelectorAll('.animate');
            animElements.forEach(el => {
                el.classList.add('active');
            });
            
            // Animate skill bars in skills section
            if (currentSection === 'skills') {
                document.querySelectorAll('.skill-box').forEach(box => {
                    box.classList.add('animate');
                });
            }
        }
    });
    
    // Update active navigation link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
    
    // Add glitch effect randomly
    addRandomGlitch();
});

// Add random glitch effects
function addRandomGlitch() {
    if (Math.random() < 0.01) { // Rare chance of glitch effect
        const glitchEffect = document.createElement('div');
        glitchEffect.classList.add('screen-glitch');
        document.body.appendChild(glitchEffect);
        
        setTimeout(() => {
            glitchEffect.remove();
        }, 500);
    }
}

// Handle form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add success animation
        const btn = contactForm.querySelector('.btn');
        btn.innerHTML = 'Message Sent!';
        btn.classList.add('sent');
        
        // Simulate API request
        setTimeout(() => {
            contactForm.reset();
            btn.innerHTML = 'Send Message';
            btn.classList.remove('sent');
        }, 3000);
    });
}

// Add intersection observer for animate elements
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all elements with .animate class
document.querySelectorAll('.animate:not(.delay-1):not(.delay-2):not(.delay-3):not(.delay-4):not(.delay-5)').forEach(el => {
    observer.observe(el);
});

// Add animation to education boxes, project boxes and contact cards
document.querySelectorAll('.education-box, .project-box, .contact-card, .about-content h3, .about-content p, .skill-box').forEach(el => {
    el.classList.add('animate');
    observer.observe(el);
});

// Add hover effect to project boxes
document.querySelectorAll('.project-box').forEach(box => {
    box.addEventListener('mouseenter', () => {
        const layer = box.querySelector('.project-layer');
        layer.style.transition = '0.5s ease';
    });
});

// Add interactive effect for cyber circles
document.addEventListener('mousemove', (e) => {
    const circles = document.querySelectorAll('.cyber-circle');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    circles.forEach((circle, index) => {
        const depth = (index + 1) * 0.1;
        const moveX = (mouseX - 0.5) * depth * 50;
        const moveY = (mouseY - 0.5) * depth * 50;
        
        circle.style.transform = `rotate(${moveX}deg) translateX(${moveX}px) translateY(${moveY}px)`;
    });
});

// Add typing animation effect
const typingTextElement = document.querySelector('.typing-text span');
if (typingTextElement) {
    const professions = [
        "Computer Science Student",
        "Frontend Developer",
        "UI/UX Enthusiast", 
        "Tech Problem Solver"
    ];
    
    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150; // Typing speed in milliseconds
    
    function typeEffect() {
        const currentProfession = professions[currentIndex];
        
        // Set typing speed based on whether adding or removing characters
        typingSpeed = isDeleting ? 80 : 150;
        
        // If typing
        if (!isDeleting && charIndex < currentProfession.length) {
            typingTextElement.setAttribute('data-text', currentProfession.substring(0, charIndex + 1));
            charIndex++;
        } 
        // If deleting
        else if (isDeleting && charIndex > 0) {
            typingTextElement.setAttribute('data-text', currentProfession.substring(0, charIndex - 1));
            charIndex--;
        }
        
        // Switch between typing and deleting
        if (!isDeleting && charIndex === currentProfession.length) {
            typingSpeed = 2000; // Pause at the end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            currentIndex = (currentIndex + 1) % professions.length;
            isDeleting = false;
            typingSpeed = 500; // Pause before typing next word
        }
        
        setTimeout(typeEffect, typingSpeed);
    }
    
    // Start the typing effect
    typeEffect();
}
// JavaScript amélioré pour la section Skills - Version Rouge et Noir CORRIGÉ
document.addEventListener('DOMContentLoaded', function() {
    // Configuration des icônes avec positions optimisées
    const skillIcons = [
        { id: 'js-icon', angle: 10, depth: -30 },
        { id: 'java-icon', angle: 30, depth: 20 },
        { id: 'react-icon', angle: 50, depth: -10 },
        { id: 'ts-icon', angle: 70, depth: 40 },
        { id: 'node-icon', angle: 90, depth: -20 },
        { id: 'php-icon', angle: 110, depth: 30 },
        { id: 'python-icon', angle: 130, depth: -40 },
        { id: 'csharp-icon', angle: 150, depth: 10 },
        { id: 'express-icon', angle: 170, depth: -30 },
        { id: 'html-icon', angle: 190, depth: 20 },
        { id: 'css-icon', angle: 210, depth: -15 },
        { id: 'cpp-icon', angle: 230, depth: 35 },
        { id: 'processing-icon', angle: 250, depth: -25 },
        { id: 'nextjs-icon', angle: 270, depth: 15 },
        { id: 'sql-icon', angle: 290, depth: -10 },
        { id: 'oracle-icon', angle: 310, depth: 25 },
        { id: 'linux-icon', angle: 330, depth: -35 },
        { id: 'azure-icon', angle: 350, depth: 30 },
        { id: 'django-icon', angle: 30, depth: 15 },
        { id: 'git-icon', angle: 50, depth: -5 }
    ];
    // Variables de rotation et d'animation
    let rotationAngle = 0;
    let rotationSpeed = 0.05;
    let isRotating = true;
    let autoRotation = true;
    let mouseX = 0, mouseY = 0;
    let targetRotationY = 0, targetRotationX = 0;
    let currentRotationY = 0, currentRotationX = 0;
    
    // Récupérer les éléments clés
    const skillsSection = document.getElementById('skills');
    const container = document.querySelector('.skills-orbit-container');
    const centerGlow = document.querySelector('.center-glow');
    const skillsOrbit = document.querySelector('.skills-orbit');
    
    // Fonction de positionnement des icônes en 3D
    function positionIcons() {
        skillIcons.forEach(icon => {
            const element = document.getElementById(icon.id);
            if (element) {
                // Convertir en radians avec l'angle de rotation global
                const angleRad = ((icon.angle + rotationAngle) * Math.PI) / 180;
                
                // Calculer la position sur l'orbite avec effet 3D
                const orbitRadius = 42; // Pourcentage du rayon de l'orbite
                const x = 50 + orbitRadius * Math.cos(angleRad);
                const y = 50 + orbitRadius * Math.sin(angleRad);
                
                // Appliquer position et effet 3D
                element.style.left = `${x}%`;
                element.style.top = `${y}%`;
                
                // Ajouter l'effet de profondeur (z-index)
                const zDepth = Math.sin(angleRad) * 50;
                element.style.zIndex = Math.round(zDepth + 50);
                
                // Effet de taille selon la "profondeur"
                const scaleFactor = 0.7 + (Math.sin(angleRad) * 0.3 + 0.3);
                element.style.transform = `translate(-50%, -50%) scale(${scaleFactor})`;
                
                // Effet d'opacité selon la "profondeur"
                const opacityFactor = 0.6 + (Math.sin(angleRad) * 0.4);
                element.style.opacity = opacityFactor;
                
                // Appliquer un flou basé sur la "profondeur"
                const blurFactor = Math.abs(Math.sin(angleRad)) < 0.7 ? (0.7 - Math.abs(Math.sin(angleRad))) * 2 : 0;
                element.style.filter = `blur(${blurFactor}px)`;
            }
        });
    }
    
    // Animation principale
    function animate() {
        if (autoRotation && isRotating) {
            rotationAngle += rotationSpeed;
        }
        
        // Ajustement fluide de la rotation 3D
        currentRotationY += (targetRotationY - currentRotationY) * 0.05;
        currentRotationX += (targetRotationX - currentRotationX) * 0.05;
        
        if (container) {
            container.style.transform = `rotateY(${currentRotationY}deg) rotateX(${currentRotationX}deg)`;
        }
        
        positionIcons();
        requestAnimationFrame(animate);
    }
    
    // Créer les effets visuels supplémentaires
    function createVisualEffects() {
        // Effet de pulsation de l'orbite
        const pulseEffect = document.createElement('div');
        pulseEffect.className = 'orbit-pulse';
        container.appendChild(pulseEffect);
        
        // Ajouter des particules flottantes
        for (let i = 0; i < 15; i++) {
            createFloatingParticle();
        }
    }
    
    // Créer des particules flottantes
    function createFloatingParticle() {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        // Style aléatoire pour chaque particule
        const size = 2 + Math.random() * 5;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const opacity = 0.1 + Math.random() * 0.4;
        const animDuration = 15 + Math.random() * 20;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 0, 0, ${opacity});
            border-radius: 50%;
            top: ${posY}%;
            left: ${posX}%;
            filter: blur(${size/2}px);
            animation: floatParticle ${animDuration}s infinite linear;
            z-index: 1;
        `;
        
        // Animation aléatoire
        const keyframes = `
        @keyframes floatParticle {
            0% { transform: translate(0, 0); }
            25% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); }
            50% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); }
            75% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); }
            100% { transform: translate(0, 0); }
        }`;
        
        // Ajouter les keyframes au document
        const styleSheet = document.createElement("style");
        styleSheet.textContent = keyframes;
        document.head.appendChild(styleSheet);
        
        // Ajouter la particule au conteneur
        container.appendChild(particle);
    }
    
    // Effet de parallaxe pour la section
    function handleParallax(e) {
        if (!skillsSection) return;
        
        const rect = skillsSection.getBoundingClientRect();
        
        // Vérifier si la souris est sur la section
        if (
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom &&
            e.clientX >= rect.left &&
            e.clientX <= rect.right
        ) {
            // Calculer la position relative de la souris dans la section
            mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
            
            // Mettre à jour la cible de rotation 3D basée sur la position de la souris
            targetRotationY = mouseX * 15; // Rotation maximale de 15 degrés
            targetRotationX = -mouseY * 10; // Rotation maximale de 10 degrés
            
            // Effet parallaxe pour le centre lumineux
            if (centerGlow) {
                const moveX = mouseX * 30;
                const moveY = mouseY * 30;
                centerGlow.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
            }
            
            // Ralentir la rotation automatique lors du survol
            rotationSpeed = 0.02;
        } else {
            // Restaurer la rotation automatique
            rotationSpeed = 0.05;
        }
    }
    
    // Gérer les interactions utilisateur
    function setupInteractions() {
        // Configurer les boutons de contrôle
        const pauseBtn = document.getElementById('skills-pause-btn');
        const speedUpBtn = document.getElementById('skills-speed-up-btn');
        const speedDownBtn = document.getElementById('skills-speed-down-btn');
        const resetBtn = document.getElementById('skills-reset-btn');
        
        if (pauseBtn) {
            pauseBtn.addEventListener('click', function() {
                autoRotation = !autoRotation;
                this.innerHTML = autoRotation ? 
                    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 4H6V20H10V4Z" fill="currentColor"/><path d="M18 4H14V20H18V4Z" fill="currentColor"/></svg>' : 
                    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 5V19L19 12L8 5Z" fill="currentColor"/></svg>';
                
                // Animation de clic
                this.style.transform = 'scale(0.9)';
                setTimeout(() => { this.style.transform = ''; }, 200);
            });
        }
        
        if (speedUpBtn) {
            speedUpBtn.addEventListener('click', function() {
                rotationSpeed = Math.min(rotationSpeed * 1.5, 0.2);
                
                // Animation de clic
                this.style.transform = 'scale(0.9)';
                setTimeout(() => { this.style.transform = ''; }, 200);
            });
        }
        
        if (speedDownBtn) {
            speedDownBtn.addEventListener('click', function() {
                rotationSpeed = Math.max(rotationSpeed * 0.5, 0.01);
                
                // Animation de clic
                this.style.transform = 'scale(0.9)';
                setTimeout(() => { this.style.transform = ''; }, 200);
            });
        }
        
        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                // Réinitialiser les paramètres
                rotationSpeed = 0.05;
                autoRotation = true;
                targetRotationY = 0;
                targetRotationX = 0;
                
                // Animation de reset
                container.style.animation = 'containerEntranceScale 1s ease-out forwards';
                setTimeout(() => { container.style.animation = ''; }, 1000);
                
                // Animation de clic
                this.style.transform = 'scale(0.9)';
                setTimeout(() => { this.style.transform = ''; }, 200);
            });
        }
        
        // Ralentir au survol de l'orbite
        container.addEventListener('mouseenter', function() {
            rotationSpeed = 0.02;
        });
        
        // Vitesse normale en quittant l'orbite
        container.addEventListener('mouseleave', function() {
            rotationSpeed = 0.05;
            // Réinitialiser la rotation 3D
            targetRotationY = 0;
            targetRotationX = 0;
        });
        
        // Parallaxe au mouvement de la souris
        document.addEventListener('mousemove', handleParallax);
        
        // Détection pour l'effet de scrolling
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    isRotating = true;
                    skillsSection.classList.add('in-view');
                } else {
                    skillsSection.classList.remove('in-view');
                }
            });
        }, { threshold: 0.2 });
        
        if (skillsSection) {
            skillsObserver.observe(skillsSection);
        }
        
        // Faire briller aléatoirement les icônes
        setInterval(randomIconGlow, 2000);
    }
    
    // Effet de brillance aléatoire sur les icônes
    function randomIconGlow() {
        // Choisir une icône aléatoire
        const randomIndex = Math.floor(Math.random() * skillIcons.length);
        const randomIconId = skillIcons[randomIndex].id;
        const iconElement = document.getElementById(randomIconId);
        
        if (iconElement) {
            const innerElement = iconElement.querySelector('.skill-icon-inner');
            if (!innerElement) return;
            
            // Ajouter une classe temporaire pour l'animation
            innerElement.classList.add('glowing');
            
            // Ajouter une brillance intense - rouge pure
            innerElement.style.boxShadow = '0 0 30px rgba(255, 0, 0, 1), inset 0 0 20px rgba(255, 0, 0, 0.7)';
            innerElement.style.transform = 'scale(1.2)';
            
            // Effet sur l'image
            const imgElement = innerElement.querySelector('img');
            if (imgElement) {
                imgElement.style.filter = 'drop-shadow(0 0 8px rgba(255, 255, 255, 1))';
                imgElement.style.transform = 'scale(1.1)';
            }
            
            // Retirer après un court délai
            setTimeout(function() {
                innerElement.classList.remove('glowing');
                innerElement.style.boxShadow = '';
                innerElement.style.transform = '';
                
                if (imgElement) {
                    imgElement.style.filter = '';
                    imgElement.style.transform = '';
                }
            }, 800);
        }
    }
    
    // Initialiser
    positionIcons();
    createVisualEffects();
    setupInteractions();
    animate();
});