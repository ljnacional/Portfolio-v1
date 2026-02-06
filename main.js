// main.js

// 1. IMPORT ALL DATA (Added contactData)
import { heroData, aboutData, skillsData, projectData, contactData, socialLinks } from './data.js';

/* =========================================
   2. SELECT DOM ELEMENTS
   ========================================= */

// Hero
const heroGreeting = document.querySelector('#hero-greeting');
const heroHeadline = document.querySelector('#hero-headline');
const heroBtnPrimary = document.querySelector('#hero-btn-primary');
const heroBtnSecondary = document.querySelector('#hero-btn-secondary');

// About
const profileImg = document.querySelector('#profile-img');
const aboutBio = document.querySelector('#about-bio');
const educationContainer = document.querySelector('#education-list');

// Skills
const skillsContainer = document.querySelector('#skills-list');

// Projects (Carousel)
const carouselWrapper = document.querySelector('#carousel-wrapper');
const projectTitle = document.querySelector('#project-title');
const projectDetails = document.querySelector('#project-details');
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

// Contact Section (NEW SELECTIONS)
const contactTitle = document.querySelector('#contact-title');
const formName = document.querySelector('#form-name');
const formEmail = document.querySelector('#form-email');
const formMessage = document.querySelector('#form-message');
const formBtn = document.querySelector('#form-btn');
const connectWord1 = document.querySelector('#connect-word-1');
const connectWord2 = document.querySelector('#connect-word-2');

// Social Containers (Header & Contact Section)
const headerSocials = document.querySelector('#social-container');
const contactSocials = document.querySelector('#connect-icons-list'); // Right side of contact

// Footer
const currentYearSpan = document.querySelector('#current-year');


/* =========================================
   3. STATE VARIABLES
   ========================================= */
let currentIndex = 0;
let cards = [];


/* =========================================
   4. GENERATOR FUNCTIONS (Build HTML)
   ========================================= */

// --- A. Build Hero ---
const initHero = () => {
    heroGreeting.innerText = heroData.greeting;
    heroHeadline.innerText = heroData.headline;
    heroBtnPrimary.innerText = heroData.primaryBtn;
    heroBtnSecondary.innerText = heroData.secondaryBtn;
};

// --- B. Build About ---
const initAbout = () => {
    profileImg.src = aboutData.profileImage;
    aboutBio.innerText = aboutData.bio;

    const oldItems = educationContainer.querySelectorAll('.edu-item');
    oldItems.forEach(item => item.remove());

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
        educationContainer.appendChild(div);
    });
};

// --- C. Build Skills ---
const initSkills = () => {
    skillsContainer.innerHTML = '';
    skillsData.forEach(skill => {
        const box = document.createElement('div');
        box.className = 'skill-box glass-card-small';
        box.innerHTML = `
            <div class="icon-wrapper">
                <img src="${skill.icon}" alt="${skill.name}">
            </div>
            <span>${skill.name}</span>
        `;
        skillsContainer.appendChild(box);
    });
};

// --- D. Build Projects ---
const initProjects = () => {
    carouselWrapper.innerHTML = '';
    projectData.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-index', index);
        card.innerHTML = `<img src="${project.img}" alt="${project.title}" class="card-img">`;
        carouselWrapper.appendChild(card);
    });
    cards = document.querySelectorAll('.project-card');
};

// --- E. Build Contact Form (NEW) ---
const initContact = () => {
    contactTitle.innerText = contactData.title;
    formName.placeholder = contactData.form.namePlaceholder;
    formEmail.placeholder = contactData.form.emailPlaceholder;
    formMessage.placeholder = contactData.form.messagePlaceholder;
    formBtn.innerText = contactData.form.btnText;

    connectWord1.innerText = contactData.connectTitle.word1;
    connectWord2.innerText = contactData.connectTitle.word2;
};

// --- F. Build Social Icons (UPDATED) ---
// We now render icons into TWO places: Header and Contact Section
const initSocials = () => {
    // 1. Function to create an Icon Link
    const createIcon = (link, isHeader) => {
        const a = document.createElement('a');
        a.href = link.url;
        a.target = "_blank";

        // Header uses class 'nav-icon', Contact uses 'icon-box' (per your CSS)
        if (isHeader) {
            a.innerHTML = `<img src="${link.icon}" alt="${link.name}" class="nav-icon">`;
        } else {
            a.className = 'icon-box';
            a.innerHTML = `<img src="${link.icon}" alt="${link.name}">`;
        }
        return a;
    };

    // 2. Clear containers
    headerSocials.innerHTML = '';
    contactSocials.innerHTML = '';

    // 3. Fill Both Containers
    socialLinks.forEach(link => {
        // Append to Header
        headerSocials.appendChild(createIcon(link, true));
        // Append to Contact Section
        contactSocials.appendChild(createIcon(link, false));
    });
};

// --- G. Build Footer ---
const initFooter = () => {
    currentYearSpan.innerText = new Date().getFullYear();
};


/* =========================================
   5. LOGIC (Movement & Interaction)
   ========================================= */

const getModIndex = (index, length) => {
    return ((index % length) + length) % length;
};

const updateCarousel = () => {
    if (cards.length === 0) return;

    cards.forEach(card => card.classList.remove('active', 'prev', 'next'));

    const activeIndex = getModIndex(currentIndex, cards.length);
    const prevIndex = getModIndex(currentIndex - 1, cards.length);
    const nextIndex = getModIndex(currentIndex + 1, cards.length);

    cards[activeIndex].classList.add('active');
    cards[prevIndex].classList.add('prev');
    cards[nextIndex].classList.add('next');

    const data = projectData[activeIndex];
    projectTitle.innerText = data.title;
    projectDetails.innerText = data.tech;
};

const handleNext = () => {
    currentIndex++;
    updateCarousel();
};

const handlePrev = () => {
    currentIndex--;
    updateCarousel();
};


/* =========================================
   6. INITIALIZATION
   ========================================= */

// Run Generators
initHero();
initAbout();
initSkills();
initProjects();
initContact(); // <--- Added this
initSocials();
initFooter();

// Run Logic
updateCarousel();

// Listeners
nextBtn.addEventListener('click', handleNext);
prevBtn.addEventListener('click', handlePrev);

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'ArrowLeft') handlePrev();
});