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
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempors incididunt ut labore et dolore magna aliqua.",
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

// 5. CONTACT & SOCIAL DATA
export const contactData = {
  title: "CONTACT ME",
  form: {
    namePlaceholder: "Luke Nacional",
    emailPlaceholder: "ljnacional01@gmail.com",
    messagePlaceholder: "How can I help you?",
    btnText: "Submit Message"
  },
  connectTitle: {
    word1: "LET’S",
    word2: "CONNECT"
  }
};

export const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/yourusername",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin-icon lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`
  },
  {
    name: "GitHub",
    url: "https://github.com/ljnacional",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github-icon lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`
  },
  {
    name: "Email",
    url: "mailto:ljnacional01@gmail.com",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width=1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>`
  }
];

// 6. UI ASSETS
export const uiIcons = {
  arrowLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>`,
  arrowRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
  darkMode: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon-icon lucide-moon"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>`
};