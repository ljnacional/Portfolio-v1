// main.js

// 1. IMPORT ALL DATA
import { heroData, aboutData, skillsData, projectData, socialLinks } from './data.js';

/* =========================================
   2. SELECT DOM ELEMENTS
   ========================================= */

// Hero Section
const heroGreeting = document.querySelector('#hero-greeting');
const heroHeadline = document.querySelector('#hero-headline');
const heroBtnPrimary = document.querySelector('#hero-btn-primary');
const heroBtnSecondary = document.querySelector('#hero-btn-secondary');

// About Section
const profileImg = document.querySelector('#profile-img');
const aboutBio = document.querySelector('#about-bio');
const educationContainer = document.querySelector('#education-list');

// Skills Section
const skillsContainer = document.querySelector('#skills-list');

// Projects Section (Carousel)
const carouselWrapper = document.querySelector('#carousel-wrapper');
const projectTitle = document.querySelector('#project-title');
const projectDetails = document.querySelector('#project-details');
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

// Socials & Footer
const socialContainer = document.querySelector('#social-container');
const currentYearSpan = document.querySelector('#current-year');


/* =========================================
   3. STATE VARIABLES
   ========================================= */
let currentIndex = 0;
let cards = []; // Will hold the project cards after we create them


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

    // Clear old items first
    const oldItems = educationContainer.querySelectorAll('.edu-item');
    oldItems.forEach(item => item.remove());

    // Create Education Items
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
    // IMPORTANT: Now that they exist, select them!
    cards = document.querySelectorAll('.project-card');
};

// --- E. Build Social Icons ---
const initSocials = () => {
    socialContainer.innerHTML = '';
    socialLinks.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.target = "_blank";
        a.innerHTML = `<img src="${link.icon}" alt="${link.name}" class="nav-icon">`;
        socialContainer.appendChild(a);
    });
};

// --- F. Build Footer Year ---
const initFooter = () => {
    currentYearSpan.innerText = new Date().getFullYear();
};


/* =========================================
   5. LOGIC (Movement & Interaction)
   ========================================= */

// Helper: Infinite loop math
const getModIndex = (index, length) => {
    return ((index % length) + length) % length;
};

// Update Carousel (The Core Logic)
const updateCarousel = () => {
    if (cards.length === 0) return;

    // 1. Clean up old classes
    cards.forEach(card => card.classList.remove('active', 'prev', 'next'));

    // 2. Calculate who is where
    const activeIndex = getModIndex(currentIndex, cards.length);
    const prevIndex = getModIndex(currentIndex - 1, cards.length);
    const nextIndex = getModIndex(currentIndex + 1, cards.length);

    // 3. Assign new classes
    cards[activeIndex].classList.add('active');
    cards[prevIndex].classList.add('prev');
    cards[nextIndex].classList.add('next');

    // 4. Update Text
    const data = projectData[activeIndex];
    projectTitle.innerText = data.title;
    projectDetails.innerText = data.tech;
};

// Click Handlers
const handleNext = () => {
    currentIndex++;
    updateCarousel();
};

const handlePrev = () => {
    currentIndex--;
    updateCarousel();
};


/* =========================================
   6. INITIALIZATION (Start Engine)
   ========================================= */

// 1. Run all generators to build the HTML
initHero();
initAbout();
initSkills();
initProjects();
initSocials();
initFooter();

// 2. Run logic to position the carousel
updateCarousel();

// 3. Attach Event Listeners
nextBtn.addEventListener('click', handleNext);
prevBtn.addEventListener('click', handlePrev);

// Keyboard Support
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'ArrowLeft') handlePrev();
});