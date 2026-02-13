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
    // --- Global / Layout ---
    currentYearSpan: document.querySelector('#current-year'),

    // --- Header Section ---
    headerSocials: document.querySelector('#social-container'),

    // --- Hero Section ---
    heroGreeting: document.querySelector('#hero-greeting'),
    heroHeadline: document.querySelector('#hero-headline'),
    heroBtnPrimary: document.querySelector('#hero-btn-primary'),
    heroBtnSecondary: document.querySelector('#hero-btn-secondary'),

    // --- About Section ---
    profileImg: document.querySelector('#profile-img'),
    aboutBio: document.querySelector('#about-bio'),
    eduContainer: document.querySelector('#education-list'),
    aboutContainer: document.querySelector('.about-container'), // Trigger for scroll logic

    // --- Skills Section ---
    skillsContainer: document.querySelector('#skills-list'),

    // --- Projects Section (Carousel) ---
    carouselWrapper: document.querySelector('#carousel-wrapper'),
    projectTitle: document.querySelector('#project-title'),
    projectTextContainer: document.querySelector('.project-text'),
    projectDetails: document.querySelector('#project-details'),
    prevBtn: document.querySelector('#prevBtn'),
    nextBtn: document.querySelector('#nextBtn'),

    // --- Contact Section ---
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
   3. STATE VARIABLES [cite: 82]
   ========================================= */
let track;
let isAnimating = false;
const CARD_WIDTH = 710;
const GAP = 60;
const STEP = CARD_WIDTH + GAP; // 770px

/* =========================================
   4. HELPER FUNCTIONS 
   ========================================= */
const wrapText = (text) => {
    return text.split('').map((char, index) => {
        const content = char === ' ' ? '&nbsp;' : char;
        return `<span class="char" style="--char-index: ${index};">${content}</span>`;
    }).join('');
};

const createIcon = (link, isHeader) => {
    const a = document.createElement('a');
    a.href = link.url;
    a.target = "_blank";
    if (isHeader) {
        a.className = 'nav-icon-link';
        a.innerHTML = `<img src="${link.icon}" alt="${link.name}" class="nav-icon">`;
    } else {
        a.className = 'icon-box';
        a.innerHTML = `<img src="${link.icon}" alt="${link.name}">`;
    }
    return a;
};

/* =========================================
   5. CORE GENERATORS (Rendering) 
   ========================================= */

// --- Hero ---
const initHero = () => {
    if (selectors.heroGreeting) selectors.heroGreeting.innerHTML = wrapText(heroData.greeting);
    if (selectors.heroHeadline) selectors.heroHeadline.innerHTML = wrapText(heroData.headline);
    if (selectors.heroBtnPrimary) {
        selectors.heroBtnPrimary.innerText = heroData.primaryBtn;
        selectors.heroBtnPrimary.classList.add('btn-fade-in');
    }
    if (selectors.heroBtnSecondary) {
        selectors.heroBtnSecondary.innerText = heroData.secondaryBtn;
        selectors.heroBtnSecondary.classList.add('btn-fade-in');
    }
};

// --- About ---
const initAbout = () => {
    if (selectors.profileImg) selectors.profileImg.src = aboutData.profileImage;
    if (selectors.aboutBio) selectors.aboutBio.innerText = aboutData.bio;
    if (selectors.eduContainer) {
        selectors.eduContainer.innerHTML = `
            <h3 class="card-title">EDUCATION</h3>
            <hr class="card-line">
        `;
        aboutData.education.forEach(edu => {
            const div = document.createElement('div');
            div.className = 'edu-item';
            div.innerHTML = `
                <div class="edu-info">
                  <h4>${edu.school}</h4>
                  <span>${edu.degree}</span>
                </div>
                <span class="edu-year">${edu.year}</span>
            `;
            selectors.eduContainer.appendChild(div);
        });
    }
};

// --- Skills ---
const initSkills = () => {
    selectors.skillsContainer.innerHTML = '';
    const half = Math.ceil(skillsData.length / 2);
    const firstRowData = skillsData.slice(0, half);
    const secondRowData = skillsData.slice(half);

    const createMarquee = (items, direction) => {
        const marquee = document.createElement('div');
        marquee.className = `marquee ${direction}`;
        const trackInner = document.createElement('div');
        trackInner.className = 'track';

        // Loop items 4 times to ensure infinite scroll
        const loopItems = Array(4).fill(items).flat();

        loopItems.forEach(skill => {
            const box = document.createElement('div');
            box.className = 'skill-box';
            box.innerHTML = `
                <div class="icon-wrapper">
                    <img src="${skill.icon}" alt="${skill.name}">
                </div>
                <span>${skill.name}</span>
            `;
            trackInner.appendChild(box);
        });
        marquee.appendChild(trackInner);
        selectors.skillsContainer.appendChild(marquee);
    };

    createMarquee(firstRowData, 'scroll-left');
    createMarquee(secondRowData, 'scroll-right');
};

// --- Projects (Carousel) ---
const initProjects = () => {
    if (!selectors.carouselWrapper) return;
    selectors.carouselWrapper.innerHTML = '';
    track = document.createElement('div');
    track.className = 'project-track';

    const infiniteData = [...projectData, ...projectData];

    infiniteData.forEach((project) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.dataset.title = project.title;
        card.dataset.tech = project.tech;
        card.innerHTML = `<img src="${project.img}" alt="${project.title}" class="card-img" draggable="false">`;
        track.appendChild(card);
    });

    selectors.carouselWrapper.appendChild(track);
    if (track.children.length > 0) {
        track.prepend(track.lastElementChild); // Physical alignment
    }
    updateActiveState();
};

const updateActiveState = () => {
    if (!track) return;
    const allCards = Array.from(track.children);
    allCards.forEach(c => c.classList.remove('active'));
    const activeCard = allCards[1]; // Center index

    if (activeCard) {
        activeCard.classList.add('active');
        selectors.projectTitle.innerText = activeCard.dataset.title;
        selectors.projectDetails.innerText = activeCard.dataset.tech;
        if (selectors.projectTextContainer) {
            selectors.projectTextContainer.classList.remove('text-fade-out');
        }
    }
};

// --- Contact ---
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
   6. LOGIC (Interactions)
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
        void track.offsetWidth;
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
    const aboutItems = [
        selectors.profileImg,
        document.querySelector('.about-card'),
        document.querySelector('.education-card')
    ];

    const aboutObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                aboutItems.forEach(item => { if (item) item.classList.add('animate-visible'); });
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
};

/* =========================================
   7. INITIALIZATION 
   ========================================= */
const init = () => {
    // 1. Static Assets
    selectors.prevBtn.innerHTML = uiIcons.arrowLeft;
    selectors.nextBtn.innerHTML = uiIcons.arrowRight;
    selectors.currentYearSpan.innerText = new Date().getFullYear();

    // 2. Render UI
    initHero();
    initAbout();
    initSkills();
    initProjects();
    initContact();
    initSocials();
    initScrollAnimations();

    // 3. Listeners
    selectors.nextBtn.addEventListener('click', handleNext);
    selectors.prevBtn.addEventListener('click', handlePrev);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
    });

    if (selectors.formBtn) {
        selectors.formBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert("Message Submitted!");
        });
    }
};

document.addEventListener('DOMContentLoaded', init);