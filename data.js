// data.js

// 1. HERO SECTION
export const heroData = {
  greeting: "HELLO, I AM LUKE NACIONAL",
  headline: "Translating creative concepts into responsive, high-performance interfaces using modern web frameworks.",
  primaryBtn: "Projects",
  secondaryBtn: "About Me"
};

// 2. ABOUT ME DATA
export const aboutData = {
  profileImage: "/Images/Profile Picture.png",
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  education: [
    {
      school: "University of the East - Manila",
      degree: "3rd Year College",
      year: "2023 - Present"
    },
    {
      school: "La Salle College of Antipolo",
      degree: "Secondary Education",
      year: "2021 - 2023"
    }
  ]
};

// 3. SKILLS DATA
export const skillsData = [
  { name: "HTML 5", icon: "/Images/html5.svg" },
  { name: "CSS", icon: "/Images/ccs.svg" },
  { name: "JavaScript", icon: "/Images/javascript.svg" },
  { name: "Bootstrap", icon: "/Images/bootstrap.svg" },
  { name: "Git / Github", icon: "/Images/github.svg" },
  { name: "Figma", icon: "/Images/image.svg" },
  { name: "Add Skill", icon: "/Images/image.svg" },
  { name: "Add Skill", icon: "/Images/image.svg" }
];

// 5. UI ASSETS (Icons)
export const uiIcons = {
  arrowLeft: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m12 19-7-7 7-7"/>
      <path d="M19 12H5"/>
    </svg>
  `,
  arrowRight: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M5 12h14"/>
      <path d="m12 5 7 7-7 7"/>
    </svg>
  `
};

// 4. PROJECTS DATA
export const projectData = [
  {
    id: 1,
    title: "1. QUANTA PC",
    tech: "TailwindCSS, Supabase, React",
    img: "/Images/image.svg"
  },
  {
    id: 2,
    title: "2. EYECUE BRAND",
    tech: "Figma, Illustrator, Branding",
    img: "/Images/image.svg"
  },
  {
    id: 3,
    title: "3. PORTFOLIO V1",
    tech: "HTML5, CSS, Vanilla JS",
    img: "/Images/image.svg"
  }
];

// CONTACT SECTION DATA
export const contactData = {
  title: "CONTACT ME",
  form: {
    namePlaceholder: "Juan Dela Cruz",
    emailPlaceholder: "juandelacruz1@gmail.com",
    messagePlaceholder: "How can I help you?",
    btnText: "Submit Message"
  },
  connectTitle: {
    word1: "LET’S",
    word2: "CONNECT"
  }
};

// 5. SOCIAL LINKS
export const socialLinks = [
  { name: "LinkedIn", url: "https://linkedin.com/in/yourusername", icon: "/Images/linkedin.svg" },
  { name: "GitHub", url: "https://github.com/ljnacional", icon: "/Images/github.svg" },
  { name: "Email", url: "mailto:ljnacional01@gmail.com", icon: "/Images/mail.svg" }
];