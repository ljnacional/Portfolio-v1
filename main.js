// main.js

/* =========================================
   1. IMPORTS
   ========================================= */
import {
    heroData, aboutData, skillsData,
    projectData, contactData, socialLinks, uiIcons
} from './data.js';

/* =========================================
   2. CONSTANTS
   ========================================= */
// (Any static configuration constants would go here)

/* =========================================
   3. STATE
   ========================================= */
let track;
let isAnimating = false;

/* =========================================
   4. DOM SELECTION
   ========================================= */
const selectors = {
    // Header & Global
    header: document.querySelector('header'),
    currentYearSpan: document.querySelector('#current-year'),
    headerSocials: document.querySelector('#social-container'),
    themeToggle: document.querySelector('#theme-toggle'),
    menuBtn: document.querySelector('#menu-btn'),
    navbar: document.querySelector('#navbar'),

    // Hero Section
    heroGreeting: document.querySelector('#hero-greeting'),
    heroHeadline: document.querySelector('#hero-headline'),
    heroBtnPrimary: document.querySelector('#hero-btn-primary'),
    heroBtnSecondary: document.querySelector('#hero-btn-secondary'),

    // About Section
    profileImg: document.querySelector('#profile-img'),
    aboutBio: document.querySelector('#about-bio'),
    eduContainer: document.querySelector('#education-list'),
    aboutContainer: document.querySelector('.about-container'),

    // Skills Section
    skillsContainer: document.querySelector('#skills-list'),

    // Projects Section
    carouselWrapper: document.querySelector('#carousel-wrapper'),
    projectTitle: document.querySelector('#project-title'),
    projectTextContainer: document.querySelector('.project-text'),
    projectDetails: document.querySelector('#project-details'),
    prevBtn: document.querySelector('#prevBtn'),
    nextBtn: document.querySelector('#nextBtn'),

    // Contact Section
    contactTitle: document.querySelector('#contact-title'),
    formName: document.querySelector('#form-name'),
    formEmail: document.querySelector('#form-email'),
    formMessage: document.querySelector('#form-message'),
    formBtn: document.querySelector('#form-btn'),
    connectWord1: document.querySelector('#connect-word-1'),
    connectWord2: document.querySelector('#connect-word-2'),
    contactSocials: document.querySelector('#connect-icons-list')
};

/* =========================================
   5. HELPER FUNCTIONS 
   ========================================= */
const getStep = () => {
    if (!track) return 770; // safe fallback

    const firstCard = track.querySelector('.project-card');
    if (!firstCard) return 770;

    // offsetWidth gives the CSS-computed width (respects min(), clamp(), etc.)
    const cardWidth = firstCard.offsetWidth;

    // gap is set as a CSS property on .project-track; read it live too
    const gap = parseFloat(getComputedStyle(track).gap) || 60;

    return cardWidth + gap;
};

const wrapText = (text) =>
    text.split(' ').map(word => {
        const chars = word.split('').map(c => `<span class="char">${c}</span>`).join('');
        return `<span class="word-wrapper">${chars}</span>`;
    }).join(' ');

const createIcon = (link, isHeader) => {
    const a = document.createElement('a');
    a.href = link.url;
    a.target = '_blank';
    if (isHeader) {
        a.className = 'nav-icon-link';
        a.innerHTML = `<div class="nav-icon">${link.icon}</div>`;
    } else {
        a.className = 'icon-box';
        a.innerHTML = link.icon;
    }
    return a;
};

/* =========================================
   6. CORE FUNCTIONS (Generators & Logic)
   ========================================= */
const initHero = () => {
    if (selectors.heroGreeting) {
        selectors.heroGreeting.innerHTML = wrapText(heroData.greeting);
        selectors.heroGreeting.querySelectorAll('.char').forEach((c, i) => c.style.setProperty('--char-index', i));
    }
    if (selectors.heroHeadline) {
        selectors.heroHeadline.innerHTML = wrapText(heroData.headline);
        selectors.heroHeadline.querySelectorAll('.char').forEach((c, i) => c.style.setProperty('--char-index', i));
    }
    if (selectors.heroBtnPrimary) selectors.heroBtnPrimary.innerText = heroData.primaryBtn;
    if (selectors.heroBtnSecondary) selectors.heroBtnSecondary.innerText = heroData.secondaryBtn;
    selectors.heroBtnPrimary.classList.add('btn-fade-in');
    selectors.heroBtnSecondary.classList.add('btn-fade-in');
};

const initAbout = () => {
    if (selectors.profileImg) selectors.profileImg.src = aboutData.profileImage;
    if (selectors.aboutBio) selectors.aboutBio.innerText = aboutData.bio;
    if (selectors.eduContainer) {
        selectors.eduContainer.innerHTML = `<h3 class="card-title">EDUCATION</h3><hr class="card-line">`;
        aboutData.education.forEach(edu => {
            const div = document.createElement('div');
            div.className = 'edu-item';
            div.innerHTML = `
                <div class="edu-info">
                    <h4>${edu.school}</h4>
                    <span>${edu.degree}</span>
                </div>
                <span class="edu-year">${edu.year}</span>`;
            selectors.eduContainer.appendChild(div);
        });
    }
};

const initSkills = () => {
    selectors.skillsContainer.innerHTML = '';
    const half = Math.ceil(skillsData.length / 2);
    const createMarquee = (items, direction) => {
        const marquee = document.createElement('div');
        marquee.className = `marquee ${direction}`;
        const trackInner = document.createElement('div');
        trackInner.className = 'track';
        Array(4).fill(items).flat().forEach(skill => {
            const box = document.createElement('div');
            box.className = 'skill-box';
            box.innerHTML = `<div class="icon-wrapper"><img src="${skill.icon}" alt="${skill.name}"></div><span>${skill.name}</span>`;
            trackInner.appendChild(box);
        });
        marquee.appendChild(trackInner);
        selectors.skillsContainer.appendChild(marquee);
    };
    createMarquee(skillsData.slice(0, half), 'scroll-left');
    createMarquee(skillsData.slice(half), 'scroll-right');
};

const initProjects = () => {
    if (!selectors.carouselWrapper) return;
    selectors.carouselWrapper.innerHTML = '';

    track = document.createElement('div');
    track.className = 'project-track';

    [...projectData, ...projectData].forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.dataset.title = project.title;
        card.dataset.tech = project.tech;
        card.innerHTML = `<img src="${project.img}" alt="${project.title}" class="card-img" draggable="false">`;
        track.appendChild(card);
    });

    selectors.carouselWrapper.appendChild(track);
    track.prepend(track.lastElementChild);

    requestAnimationFrame(() => {
        positionTrack();
        updateActiveState();
    });
};

const positionTrack = () => {
    if (!track || !selectors.carouselWrapper) return;
    const firstCard = track.querySelector('.project-card');
    if (!firstCard) return;

    const wrapperWidth = selectors.carouselWrapper.offsetWidth;
    const cardWidth = firstCard.offsetWidth;
    const gap = parseFloat(getComputedStyle(track).gap) || 60;

    const ml = (wrapperWidth / 2 - cardWidth / 2) - (cardWidth + gap);
    track.style.marginLeft = `${ml}px`;
};

const updateActiveState = () => {
    if (!track) return;
    const allCards = Array.from(track.children);
    allCards.forEach(c => c.classList.remove('active'));

    const activeCard = allCards[1];
    if (activeCard) {
        activeCard.classList.add('active');
        selectors.projectTitle.innerText = activeCard.dataset.title;
        selectors.projectDetails.innerText = activeCard.dataset.tech;
        if (selectors.projectTextContainer) {
            selectors.projectTextContainer.classList.remove('text-fade-out');
            void selectors.projectTextContainer.offsetWidth;
        }
    }
};

const initContact = () => {
    if (selectors.contactTitle) selectors.contactTitle.innerText = contactData.title;
    selectors.formName.placeholder = contactData.form.namePlaceholder;
    selectors.formEmail.placeholder = contactData.form.emailPlaceholder;
    selectors.formMessage.placeholder = contactData.form.messagePlaceholder;
    selectors.formBtn.innerText = contactData.form.btnText;
    selectors.connectWord1.innerText = contactData.connectTitle.word1;
    selectors.connectWord2.innerText = contactData.connectTitle.word2;
};

const initSocials = () => {
    if (selectors.headerSocials) {
        selectors.headerSocials.innerHTML = '';
        socialLinks.forEach(l => selectors.headerSocials.appendChild(createIcon(l, true)));
    }
    if (selectors.contactSocials) {
        selectors.contactSocials.innerHTML = '';
        socialLinks.forEach(l => selectors.contactSocials.appendChild(createIcon(l, false)));
    }
};

const handleNext = () => {
    if (isAnimating || !track) return;
    isAnimating = true;

    if (selectors.projectTextContainer)
        selectors.projectTextContainer.classList.add('text-fade-out');

    const step = getStep();
    track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
    track.style.transform = `translateX(-${step}px)`;

    const unlock = (e) => {
        if (e.target !== track) return;
        track.removeEventListener('transitionend', unlock);
        track.appendChild(track.firstElementChild);
        track.style.transition = 'none';
        track.style.transform = 'translateX(0)';
        updateActiveState();
        isAnimating = false;
    };
    track.addEventListener('transitionend', unlock);
};

const handlePrev = () => {
    if (isAnimating || !track) return;
    isAnimating = true;

    if (selectors.projectTextContainer)
        selectors.projectTextContainer.classList.add('text-fade-out');

    const step = getStep();
    track.style.transition = 'none';
    track.prepend(track.lastElementChild);
    track.style.transform = `translateX(-${step}px)`;
    void track.offsetWidth;

    track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
    track.style.transform = 'translateX(0)';

    const unlock = (e) => {
        if (e.target !== track) return;
        track.removeEventListener('transitionend', unlock);
        updateActiveState();
        isAnimating = false;
    };
    track.addEventListener('transitionend', unlock);
};

const initScrollAnimations = () => {
    const aboutObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                [selectors.profileImg,
                document.querySelector('.about-card'),
                document.querySelector('.education-card')]
                    .forEach(el => { if (el) el.classList.add('animate-visible'); });
                obs.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -250px 0px', threshold: 0.1 });

    if (selectors.aboutContainer) aboutObserver.observe(selectors.aboutContainer);

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

    window.addEventListener('scroll', () => {
        selectors.header.classList.toggle('scrolled', window.scrollY > 50);
    });
};

const handleResize = () => {
    let resizeTimer;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (!track) return;
        track.style.transition = 'none';
        track.style.transform = 'translateX(0)';
        isAnimating = false;
        positionTrack();
        updateActiveState();
    }, 150);
};

/* =========================================
   7. EVENT LISTENERS
   ========================================= */
// Theme toggle listener
const setupThemeToggle = () => {
    let isThemeSwitching = false;
    selectors.themeToggle.addEventListener('click', () => {
        if (isThemeSwitching) return;
        isThemeSwitching = true;
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        setTimeout(() => { isThemeSwitching = false; }, 300);
    });
};

// Contact Form Logic (Spinner + Web3Forms) ---
const setupContactForm = () => {
    const form = document.querySelector('.contact-form');
    const msgInput = selectors.formMessage;
    const btn = selectors.formBtn;

    // 1. Enforce Character Limit (JS Fallback)
    if (msgInput) {
        msgInput.addEventListener('input', (e) => {
            const limit = 200;
            if (e.target.value.length > limit) {
                e.target.value = e.target.value.slice(0, limit);
            }
        });
    }

    // 2. Submit Logic
    if (form && btn) {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();

            // FIX: Use reportValidity() to show the native error bubble
            // This will highlight EXACTLY which field is missing
            if (!form.checkValidity()) {
                form.reportValidity();
                return; // Stop execution here
            }

            // A. START LOADING STATE
            const originalText = btn.innerText;
            btn.innerHTML = `<div class="loading-spinner"></div>`; // Insert Spinner
            btn.style.pointerEvents = 'none'; // Disable clicking

            // Prepare Data
            const formData = new FormData(form);
            formData.append("access_key", "7828707c-b66f-4a56-8a4e-4c4a8e819b28");

            try {
                // B. API CALL
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });
                const result = await response.json();

                if (result.success) {
                    btn.classList.add('success');
                    btn.innerText = "Message Sent!"; // Success Text
                    form.reset();

                    // Reset button after 3 seconds
                    setTimeout(() => {
                        btn.classList.remove('success');
                        btn.innerText = originalText;
                        btn.style.pointerEvents = 'auto';
                    }, 3000);

                } else {
                    throw new Error(result.message);
                }

            } catch (error) {
                console.error("Error:", error);
                btn.classList.add('error');
                btn.innerText = "Failed. Try Again."; // Error Text

                // Reset button after 3 seconds
                setTimeout(() => {
                    btn.classList.remove('error');
                    btn.innerHTML = originalText;
                    btn.style.pointerEvents = 'auto';
                }, 3000);
            }
        });
    }
};

// Mobile menu & Navbar listeners
const setupNavigation = () => {
    if (selectors.menuBtn) {
        selectors.menuBtn.addEventListener('click', () =>
            selectors.navbar.classList.toggle('active'));
    }

    selectors.navbar.querySelectorAll('a').forEach(link =>
        link.addEventListener('click', () => selectors.navbar.classList.remove('active')));
};

// Carousel & Window listeners
const setupGlobalListeners = () => {
    selectors.nextBtn.addEventListener('click', handleNext);
    selectors.prevBtn.addEventListener('click', handlePrev);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
    });

    window.addEventListener('resize', handleResize);
};

/* =========================================
   8. INITIALIZATION
   ========================================= */
const init = () => {
    // 1. Theme Check
    if (localStorage.getItem('theme') === 'dark')
        document.body.classList.add('dark-mode');

    // 2. Static Assets Population
    selectors.prevBtn.innerHTML = uiIcons.arrowLeft;
    selectors.nextBtn.innerHTML = uiIcons.arrowRight;
    if (selectors.themeToggle) selectors.themeToggle.innerHTML = uiIcons.darkMode;
    selectors.currentYearSpan.innerText = new Date().getFullYear();

    // 3. Render Sections
    initHero();
    initAbout();
    initSkills();
    initProjects();
    initContact();
    initSocials();
    initScrollAnimations();

    // 4. Set up Listeners
    setupThemeToggle();
    setupNavigation();
    setupGlobalListeners();
    setupContactForm();
};

document.addEventListener('DOMContentLoaded', init);