/* =========================================
   1. CONSTANTS & SELECTION
   ========================================= */
const cards = document.querySelectorAll('.project-card');
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');
const projectTitle = document.querySelector('#project-title');
const projectDetails = document.querySelector('#project-details');

/* =========================================
   2. STATE VARIABLES
   ========================================= */
// Defines the text content for each project
const projectData = [
    { title: "3. EYECUE", tech: "Figma, Illustrator, Branding" },
    { title: "1. QUANTA PC", tech: "TailwindCSS, Supabase, React" },
    { title: "2. PORTFOLIO", tech: "HTML5, CSS, Vanilla JS" }
];

let currentIndex = 1; // Start with the middle card (Index 1) active

/* =========================================
   3. FUNCTIONS
   ========================================= */

// Helper: safe index wrapping (so 0 - 1 becomes 2, not -1)
const getModIndex = (index, length) => {
    return ((index % length) + length) % length;
};

const updateCarousel = () => {
    // 1. Remove all special classes first
    cards.forEach(card => {
        card.classList.remove('active', 'prev', 'next');
    });

    // 2. Calculate indices
    const activeIndex = getModIndex(currentIndex, cards.length);
    const prevIndex = getModIndex(currentIndex - 1, cards.length);
    const nextIndex = getModIndex(currentIndex + 1, cards.length);

    // 3. Add classes to the correct cards
    cards[activeIndex].classList.add('active');
    cards[prevIndex].classList.add('prev');
    cards[nextIndex].classList.add('next');

    // 4. Update Text Content using Modern Template Literals
    const currentData = projectData[activeIndex];
    projectTitle.innerText = currentData.title;
    projectDetails.innerText = currentData.tech;
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
   4. EVENT LISTENERS
   ========================================= */

// Initialize on load
updateCarousel();

// Click Events
nextBtn.addEventListener('click', handleNext);
prevBtn.addEventListener('click', handlePrev);

// Keyboard Navigation (Bonus)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'ArrowLeft') handlePrev();
});