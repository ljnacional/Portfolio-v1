// main.js

// 1. IMPORT ALL DATA
import {
    heroData, aboutData, skillsData,
    projectData, contactData, socialLinks, uiIcons
} from './data.js';

/* =========================================
   2. DOM SELECTION
   ========================================= */
const selectors = {
    // --- Global & Layout ---
    header: document.querySelector('header'),
    currentYearSpan: document.querySelector('#current-year'),

    // --- Navigation & Theme ---
    headerSocials: document.querySelector('#social-container'), // Socials in the top-right
    themeToggle: document.querySelector('#theme-toggle'), // Darkmode button

    // --- Hero Section ---
    heroGreeting: document.querySelector('#hero-greeting'), // "Hello, I am..."
    heroHeadline: document.querySelector('#hero-headline'), // Main creative concept text
    heroBtnPrimary: document.querySelector('#hero-btn-primary'), // "Projects" button
    heroBtnSecondary: document.querySelector('#hero-btn-secondary'), // "About Me" button

    // --- About Section ---
    profileImg: document.querySelector('#profile-img'), // Portfolio picture
    aboutBio: document.querySelector('#about-bio'), // Biography text
    eduContainer: document.querySelector('#education-list'), // Education card list
    aboutContainer: document.querySelector('.about-container'), // Main wrapper for scroll trigger

    // --- Skills Section ---
    skillsContainer: document.querySelector('#skills-list'), // Marquee/grid wrapper

    // --- Projects Section (Carousel) ---
    carouselWrapper: document.querySelector('#carousel-wrapper'), // Carousel container
    projectTitle: document.querySelector('#project-title'), // Active project name
    projectTextContainer: document.querySelector('.project-text'), // Wrapper for title/details text
    projectDetails: document.querySelector('#project-details'), // Active project tech/tools
    prevBtn: document.querySelector('#prevBtn'), // Carousel left nav
    nextBtn: document.querySelector('#nextBtn'), // Carousel right nav

    // --- Contact Section ---
    contactTitle: document.querySelector('#contact-title'), // "CONTACT ME" header
    formName: document.querySelector('#form-name'), // Input: Name
    formEmail: document.querySelector('#form-email'), // Input: Email
    formMessage: document.querySelector('#form-message'), // Textarea: Message
    formBtn: document.querySelector('#form-btn'), // Submit button
    connectWord1: document.querySelector('#connect-word-1'), // "LET'S"
    connectWord2: document.querySelector('#connect-word-2'), // "CONNECT"
    contactSocials: document.querySelector('#connect-icons-list') // Icons in the right contact panel
};

/* =========================================
   3. STATE VARIABLES
   ========================================= */
let track;
let isAnimating = false;
const CARD_WIDTH = 710;
const GAP = 60;
const STEP = CARD_WIDTH + GAP;

/* =========================================
   4. HELPER FUNCTIONS 
   ========================================= */

// NEW: Fixed Word-wrapping text generator
const wrapText = (text) => {
    return text.split(' ').map((word) => {
        const wordChars = word.split('').map((char) => {
            return `<span class="char">${char}</span>`;
        }).join('');
        return `<span class="word-wrapper">${wordChars}</span>`;
    }).join(' ');
};

const createIcon = (link, isHeader) => {
    const a = document.createElement('a');
    a.href = link.url;
    a.target = "_blank";
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
   5. CORE GENERATORS 
   ========================================= */

const initHero = () => {
    if (selectors.heroGreeting) {
        selectors.heroGreeting.innerHTML = wrapText(heroData.greeting);
        selectors.heroGreeting.querySelectorAll('.char').forEach((char, i) => {
            char.style.setProperty('--char-index', i);
        });
    }
    if (selectors.heroHeadline) {
        selectors.heroHeadline.innerHTML = wrapText(heroData.headline);
        selectors.heroHeadline.querySelectorAll('.char').forEach((char, i) => {
            char.style.setProperty('--char-index', i);
        });
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
            div.innerHTML = `<div class="edu-info"><h4>${edu.school}</h4><span>${edu.degree}</span></div><span class="edu-year">${edu.year}</span>`;
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
        const loopItems = Array(4).fill(items).flat();
        loopItems.forEach(skill => {
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
    [...projectData, ...projectData].forEach((project) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.dataset.title = project.title;
        card.dataset.tech = project.tech;
        card.innerHTML = `<img src="${project.img}" alt="${project.title}" class="card-img" draggable="false">`;
        track.appendChild(card);
    });
    selectors.carouselWrapper.appendChild(track);
    track.prepend(track.lastElementChild);
    updateActiveState();
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
        socialLinks.forEach(link => selectors.headerSocials.appendChild(createIcon(link, true)));
    }
    if (selectors.contactSocials) {
        selectors.contactSocials.innerHTML = '';
        socialLinks.forEach(link => selectors.contactSocials.appendChild(createIcon(link, false)));
    }
};

/* =========================================
   6. LOGIC
   ========================================= */

const handleNext = () => {
    if (isAnimating || !track) return;
    isAnimating = true;
    if (selectors.projectTextContainer) selectors.projectTextContainer.classList.add('text-fade-out');
    track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
    track.style.transform = `translateX(-${STEP}px)`;
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
    if (selectors.projectTextContainer) selectors.projectTextContainer.classList.add('text-fade-out');
    track.style.transition = 'none';
    track.prepend(track.lastElementChild);
    track.style.transform = `translateX(-${STEP}px)`;
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
                [selectors.profileImg, document.querySelector('.about-card'), document.querySelector('.education-card')]
                    .forEach(item => { if (item) item.classList.add('animate-visible'); });
                obs.unobserve(entry.target);
            }
        });
    }, { rootMargin: "0px 0px -250px 0px", threshold: 0.1 });
    if (selectors.aboutContainer) aboutObserver.observe(selectors.aboutContainer);

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-up').forEach((el) => fadeObserver.observe(el));

    // Header Scroll Class toggle
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            selectors.header.classList.add('scrolled');
        } else {
            selectors.header.classList.remove('scrolled');
        }
    });
};

/* =========================================
   7. INITIALIZATION 
   ========================================= */
const init = () => {
    // Apply Theme First
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') document.body.classList.add('dark-mode');

    // Static Assets
    selectors.prevBtn.innerHTML = uiIcons.arrowLeft;
    selectors.nextBtn.innerHTML = uiIcons.arrowRight;
    if (selectors.themeToggle) selectors.themeToggle.innerHTML = uiIcons.darkMode;
    selectors.currentYearSpan.innerText = new Date().getFullYear();

    // Render UI
    initHero();
    initAbout();
    initSkills();
    initProjects();
    initContact();
    initSocials();
    initScrollAnimations();

    let isThemeSwitching = false;
    selectors.themeToggle.addEventListener('click', () => {
        if (isThemeSwitching) return;
        isThemeSwitching = true;
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        setTimeout(() => { isThemeSwitching = false; }, 300);
    });

    selectors.nextBtn.addEventListener('click', handleNext);
    selectors.prevBtn.addEventListener('click', handlePrev);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
    });
};

document.addEventListener('DOMContentLoaded', init);