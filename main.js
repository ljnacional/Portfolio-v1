// main.js

// 1. IMPORT DATA
import { projectData, socialLinks } from './data.js';

/* =========================================
   2. CONSTANTS & SELECTION
   ========================================= */
const cards = document.querySelectorAll('.project-card');
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');
const projectTitle = document.querySelector('#project-title');
const projectDetails = document.querySelector('#project-details');
const projectImages = document.querySelectorAll('.card-img'); // Selects all images in cards

// Select social links (Header & Contact Section)
const githubLinks = document.querySelectorAll('a[href="#git"]');
const linkedinLinks = document.querySelectorAll('a[href="#link"]');
const emailInputs = document.querySelectorAll('input[type="email"]');

/* =========================================
   3. STATE VARIABLES
   ========================================= */
let currentIndex = 0; // Start with the middle card (Index 1) active

/* =========================================
   4. LOGIC / FUNCTIONS
   ========================================= */

// Helper: safe index wrapping
const getModIndex = (index, length) => {
    return ((index % length) + length) % length;
};

// Updates the Carousel (Classes + Content)
const updateCarousel = () => {
    // A. Remove old classes
    cards.forEach(card => card.classList.remove('active', 'prev', 'next'));

    // B. Calculate Indices
    const activeIndex = getModIndex(currentIndex, cards.length);
    const prevIndex = getModIndex(currentIndex - 1, cards.length);
    const nextIndex = getModIndex(currentIndex + 1, cards.length);

    // C. Update Classes (Visual Position)
    cards[activeIndex].classList.add('active');
    cards[prevIndex].classList.add('prev');
    cards[nextIndex].classList.add('next');

    // D. Update Content (Text & Image)
    // We use the 'activeIndex' to pull the correct data object
    const data = projectData[activeIndex];

    projectTitle.innerText = data.title;
    projectDetails.innerText = data.tech;

    // Optional: If you want the images to change dynamically based on data order
    // (Currently your HTML has hardcoded images, but this ensures they sync)
    // projectImages[activeIndex].src = data.img; 
};

// Navigation Handlers
const handleNext = () => {
    currentIndex++;
    updateCarousel();
};

const handlePrev = () => {
    currentIndex--;
    updateCarousel();
};

// Initialize Social Links (Bonus: Auto-fill links)
const initSocials = () => {
    // Find all links intended for Github/LinkedIn and set their HREF
    // Note: You need to update HTML hrefs to match selectors if you want this auto-filled
    // For now, this is just a placeholder to show how you WOULD do it.
    console.log("Social data loaded:", socialLinks);
};


/* =========================================
   5. EVENT LISTENERS
   ========================================= */
// Initialize
updateCarousel();
initSocials();

// Click Events
nextBtn.addEventListener('click', handleNext);
prevBtn.addEventListener('click', handlePrev);

// Keyboard
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'ArrowLeft') handlePrev();
});