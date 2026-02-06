// main.js

// 1. IMPORT ALL DATA (Added contactData)
import { heroData, aboutData, skillsData, projectData, contactData, socialLinks, uiIcons } from './data.js';

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
const aboutCard = document.querySelector('.about-card');

// Skills
const skillsContainer = document.querySelector('#skills-list');

// Projects (Carousel)
const carouselWrapper = document.querySelector('#carousel-wrapper');
const projectTitle = document.querySelector('#project-title');
const projectTextContainer = document.querySelector('.project-text');
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
let track;
let isAnimating = false;
const cardWidth = 710;
const gap = 60;
const step = cardWidth + gap; // 770px


/* =========================================
   4. GENERATOR FUNCTIONS (Build HTML)
   ========================================= */

// --- A. Build Hero ---
const initHero = () => {
    // 1. Build Text (CSS Animation runs automatically on these chars)
    if (heroGreeting) heroGreeting.innerHTML = wrapText(heroData.greeting);
    if (heroHeadline) heroHeadline.innerHTML = wrapText(heroData.headline);

    // 2. Build Buttons
    if (heroBtnPrimary) {
        heroBtnPrimary.innerText = heroData.primaryBtn;
        heroBtnPrimary.classList.add('btn-fade-in');
    }
    if (heroBtnSecondary) {
        heroBtnSecondary.innerText = heroData.secondaryBtn;
        heroBtnSecondary.classList.add('btn-fade-in');
    }
};

// --- B. Build About ---
const initAbout = () => {
    const profileImg = document.querySelector('#profile-img');
    const aboutBio = document.querySelector('#about-bio');
    const educationContainer = document.querySelector('#education-list');

    // 1. Fill Data
    if (profileImg) profileImg.src = aboutData.profileImage;
    if (aboutBio) aboutBio.innerText = aboutData.bio;

    if (educationContainer) {
        // Clear loading/old content
        educationContainer.innerHTML = `
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
            educationContainer.appendChild(div);
        });
    }

    // 2. Setup Scroll Trigger
    initScrollAnimations();
};

// --- C. Build Skills ---
const initSkills = () => {
    // Clear any existing content
    skillsContainer.innerHTML = '';

    // 1. Split Data Strategy
    // We split the skills list in half to create two distinct rows
    const half = Math.ceil(skillsData.length / 2);
    const firstRowData = skillsData.slice(0, half);
    const secondRowData = skillsData.slice(half);

    // 2. Marquee Generator Function
    const createMarquee = (items, direction) => {
        const marquee = document.createElement('div');
        marquee.className = `marquee ${direction}`;

        const track = document.createElement('div');
        track.className = 'track';

        // 3. Infinity Loop Logic (The "DRY" Fix)
        // We repeat the data 4 times. This ensures the track is long enough
        // to scroll continuously without seeing a gap, regardless of screen width.
        // [cite: 5]
        const repeatCount = 4;
        const loopItems = Array(repeatCount).fill(items).flat();

        // 4. HTML Injection
        loopItems.forEach(skill => {
            const box = document.createElement('div');
            box.className = 'skill-box'; // CSS handles the rest
            box.innerHTML = `
                <div class="icon-wrapper">
                    <img src="${skill.icon}" alt="${skill.name}">
                </div>
                <span>${skill.name}</span>
            `;
            track.appendChild(box);
        });

        marquee.appendChild(track);
        skillsContainer.appendChild(marquee);
    };

    // 5. Execute
    createMarquee(firstRowData, 'scroll-left');
    createMarquee(secondRowData, 'scroll-right');
};

// --- Build UI Icons ---
const initUI = () => {
    if (prevBtn) prevBtn.innerHTML = uiIcons.arrowLeft;
    if (nextBtn) nextBtn.innerHTML = uiIcons.arrowRight;
};

// --- D. Build Projects ---
const initProjects = () => {
    if (!carouselWrapper) return;

    // Clear and Rebuild
    carouselWrapper.innerHTML = '';
    track = document.createElement('div');
    track.className = 'project-track';

    // Duplicate data x2 so we never run out of cards
    const infiniteData = [...projectData, ...projectData];

    infiniteData.forEach((project) => {
        const card = document.createElement('div');
        card.className = 'project-card';

        // Store text data in the DOM element
        card.dataset.title = project.title;
        card.dataset.tech = project.tech;

        card.innerHTML = `<img src="${project.img}" alt="${project.title}" class="card-img">`;
        track.appendChild(card);
    });

    carouselWrapper.appendChild(track);

    // Set initial active state
    updateActiveState();
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

const updateActiveState = () => {
    if (!track) return;

    const allCards = Array.from(track.children);
    allCards.forEach(c => c.classList.remove('active'));

    const activeCard = allCards[1]; // Center item

    if (activeCard) {
        activeCard.classList.add('active');

        // 1. UPDATE CONTENT
        projectTitle.innerText = activeCard.dataset.title;
        projectDetails.innerText = activeCard.dataset.tech;

        // 2. TRIGGER FADE IN
        // We remove the class, causing CSS to transition opacity back to 1
        if (projectTextContainer) {
            projectTextContainer.classList.remove('text-fade-out');
        }
    }
};

// --- C. Handle Next (Slide Left -> Rotate) ---
const handleNext = () => {
    if (isAnimating || !track) return;
    isAnimating = true;

    // 1. TRIGGER FADE OUT
    if (projectTextContainer) {
        projectTextContainer.classList.add('text-fade-out');
    }

    // 2. LOCK BUTTONS
    nextBtn.style.pointerEvents = 'none';
    prevBtn.style.pointerEvents = 'none';

    // 3. SLIDE TRACK
    track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
    track.style.transform = `translateX(-${step}px)`;

    // 4. CLEANUP (Wait for slide to finish)
    const unlock = (e) => {
        if (e.target !== track) return; // Ignore bubbling
        track.removeEventListener('transitionend', unlock);

        track.appendChild(track.firstElementChild);
        track.style.transition = 'none';
        track.style.transform = 'translateX(0)';
        void track.offsetWidth;

        updateActiveState(); // This triggers the text Fade In

        isAnimating = false;
        nextBtn.style.pointerEvents = 'auto';
        prevBtn.style.pointerEvents = 'auto';
    };

    track.addEventListener('transitionend', unlock);
    setTimeout(() => { if (isAnimating) unlock({ target: track }); }, 550);
};

// --- Handle Prev (The "Fade Out" Moment) ---
const handlePrev = () => {
    if (isAnimating || !track) return;
    isAnimating = true;

    // 1. TRIGGER FADE OUT
    if (projectTextContainer) {
        projectTextContainer.classList.add('text-fade-out');
    }

    // 2. LOCK BUTTONS
    nextBtn.style.pointerEvents = 'none';
    prevBtn.style.pointerEvents = 'none';

    track.style.transition = 'none';
    track.prepend(track.lastElementChild);
    track.style.transform = `translateX(-${step}px)`;
    void track.offsetWidth;

    track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
    track.style.transform = 'translateX(0)';

    const unlock = (e) => {
        if (e.target !== track) return;
        track.removeEventListener('transitionend', unlock);

        updateActiveState(); // This triggers the text Fade In

        isAnimating = false;
        nextBtn.style.pointerEvents = 'auto';
        prevBtn.style.pointerEvents = 'auto';
    };

    track.addEventListener('transitionend', unlock);
    setTimeout(() => { if (isAnimating) unlock({ target: track }); }, 550);
};

const wrapText = (text) => {
    return text.split('').map((char, index) => {
        if (char === ' ') {
            return `<span class="char" style="--char-index: ${index};">&nbsp;</span>`;
        }
        return `<span class="char" style="--char-index: ${index};">${char}</span>`;
    }).join('');
};

const initScrollAnimations = () => {
    // We observe the container to sync all 3 items
    const sectionContainer = document.querySelector('.about-container');

    // The items to reveal
    const itemsToAnimate = [
        document.querySelector('#profile-img'),
        document.querySelector('.about-card'),
        document.querySelector('.education-card')
    ];

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Reveal all items at once
                itemsToAnimate.forEach(item => {
                    if (item) item.classList.add('animate-visible');
                });
                obs.unobserve(entry.target);
            }
        });
    }, {
        // THE FIX:
        // "-250px" forces the user to scroll 250px PAST the start of the section
        // before the animation triggers.
        rootMargin: "0px 0px -250px 0px",
        threshold: 0.1
    });

    if (sectionContainer) {
        observer.observe(sectionContainer);
    }
};


/* =========================================
   6. INITIALIZATION
   ========================================= */

// Run Generators
initUI();
initHero();
initAbout();
initSkills();
initProjects();
initContact();
initSocials();
initFooter();

// Listeners
if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', handleNext);
    prevBtn.addEventListener('click', handlePrev);
}

// Keyboard Navigation (Enhancement)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'ArrowLeft') handlePrev();
});

// --- ANIMATION OBSERVER ---
// This watches for elements with '.fade-up' entering the screen
const observerOptions = {
    threshold: 0.1 // Trigger when 10% of the item is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Add the class that forces opacity: 1
            entry.target.classList.add('visible');

            // Stop watching this element (runs only once)
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Attach observer to all fade elements
document.querySelectorAll('.fade-up').forEach((el) => {
    observer.observe(el);
});