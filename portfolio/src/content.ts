export const profile = {
  name: 'Aziz Ben Mahmoud', brand: 'Aziz BM', role: 'Tech Founder & Software Engineer', location: 'Tunisia',
  headline: 'Turning imagination into technology that solves real problems.',
  intro: "I'm a software engineer and technology builder working at the intersection of financial technology, artificial intelligence, and product innovation.",
  email: 'contact@spendyway.com', github: 'https://github.com/AzizVerse', linkedin: 'https://www.linkedin.com/in/aziz-ben-mahmoud-328b2b203/',
  // Leave empty until the approved deployment URL is known. Share uses this URL, then the current page.
  siteUrl: 'https://azizverse.github.io', portrait: '',
  philosophy: "I've always been drawn to the space between imagination and reality. Technology gives me a way to explore that space — to question how things work, imagine how they could work differently, and build something useful from the answer."
};
export type Project = { id: string; name: string; subtitle: string; category: string; stage: string; description: string; role: string };
export const projects: Project[] = [
  { id: 'spendyway', name: 'SpendyWay', subtitle: 'Clarity for everyday finance.', category: 'Financial technology', stage: 'In development',
    description: 'A personal finance venture focused on making everyday money decisions feel clearer.', role: 'Founder & software engineer.' },
  { id: 'barmarket', name: 'MarketBeat', subtitle: 'Technology for hospitality.', category: 'Business technology', stage: 'In development',
    description: 'A software venture exploring new possibilities for hospitality businesses.', role: 'Product builder & software engineer.' },
  { id: 'vestia', name: 'Vestia', subtitle: 'Creativity meets technology.', category: 'Creative technology', stage: 'Exploratory',
    description: 'An emerging venture at the intersection of fashion, creativity, and technology.', role: 'Concept development & venture exploration.' }
];
export const experience = [
  { company: 'Colombus Capital', role: 'Financial technology & AI automation', context: 'Software engineering · Financial operations', description: 'Engineering at the intersection of financial operations and intelligent systems: treasury workflows, FX operations, analytics, and AI-assisted transaction processing.', points: ['Treasury-as-a-Service and operational dashboards', 'Market-data integration and financial reporting', 'Email and document workflow automation', 'Coordinating and leading an eight-developer team'] },
  { company: 'GoMyCode', role: 'Programming instructor', context: 'Teaching · Mentoring · Technical communication', description: 'Around three years of teaching and mentoring, helping more than 100 learners build practical programming foundations.', points: ['Web development and Python programming', 'Software engineering foundations and machine learning', 'Making technical ideas understandable and actionable'] }
];
export const earlyWork = [
  { name: 'Chattle', category: 'Mobile · Social', text: 'A social networking and messaging app built with Flutter and Firebase.' },
  { name: 'Docare', category: 'Health · Web', text: 'An online medical consultation platform with appointments and communication tools.' },
  { name: 'EasyFund', category: 'Finance · Web', text: 'A microfinance-focused application exploring digital financial services.' },
  { name: 'AURA', category: 'Python · Voice', text: 'An early virtual assistant experiment exploring voice recognition and interaction.' },
  { name: 'ASC', category: 'Commerce · Agriculture', text: 'Agricultural Supply Company: an e-commerce application for equipment rental.' }
];
export const education = [
  { school: 'ESPRIT', degree: 'Software / computer engineering studies', focus: 'Financial engineering focus: quantitative methods, financial modeling, architecture, and risk analysis.' },
  { school: 'ISET Charguia', degree: "Bachelor’s in Computer Systems Development", focus: 'Foundations in software development, applied programming, and computer systems.' }
];
