export const COMMANDS = [
  'help', 'home', 'about', 'experience', 'projects',
  'skills', 'awards', 'contact', 'clear', 'history',
]

export const PANE_COMMANDS = [
  'help', 'home', 'about', 'experience', 'projects',
  'skills', 'awards', 'contact',
]

export const about = {
  identity: [
    { key: 'NAME', value: 'Mohamed Amine Zouaoui' },
    { key: 'ALIAS', value: 'Vortrix5' },
    { key: 'ROLE', value: 'Software Engineering Student @ MedTech, Tunis' },
    { key: 'STATUS', value: 'Actively seeking ML/AI and full-stack internships' },
    { key: 'LOCATION', value: 'Tunis, Tunisia (UTC+1)' },
    { key: 'LANGUAGES', value: 'Arabic [native] · French [native] · English [fluent] · Spanish [intermediate]' },
  ],
  bio: [
    'I build things that run in production. My background is full-stack engineering - I have shipped features used by hundreds of users, led an 11-person team, and processed 100,000+ data points a day through distributed systems I architected.',
    'On the side, I compete. I placed 49th globally in IEEEXtreme 18.0 out of 6,500+ teams. I have won two international hackathon awards building AI-powered systems. I founded Tunisia\'s first IEEE-HKN chapter.',
    'I am particularly drawn to the intersection of solid engineering and applied intelligence - building systems that do not just work, but think.',
  ],
  stats: [
    { value: '3+', label: 'Years shipping\nproduction code' },
    { value: '49th', label: 'Global rank\nIEEEXtreme 18.0\n(6,500+ teams)' },
    { value: '2', label: 'International\nhackathon awards' },
    { value: '1st', label: 'IEEE-HKN chapter\nfounded in Tunisia' },
  ],
}

export const experience = [
  {
    company: 'BYSUR',
    role: 'Full-Stack Developer',
    location: 'Paris, France (Remote)',
    dates: 'Nov 2024 - Present',
    current: true,
    description: 'Spearheaded a full redesign of the company website, improving UI/UX from scratch and contributing to a 20% increase in user engagement. Developed and integrated production features into a drag-and-drop API builder platform serving 200+ active users. Designed and implemented a scalable backend architecture that improved system efficiency by 15% and handles 1,000+ daily API requests.',
    tags: ['react', 'node.js', 'prisma', 'postgresql', 'redis', 'tailwind'],
  },
  {
    company: 'Orange Tunisia',
    role: 'Scrum Master',
    location: 'Tunis, Tunisia',
    dates: 'Jun 2024 - Aug 2024',
    current: false,
    description: 'Led and mentored a team of 11 developers across two major simultaneous projects using Agile/Scrum, improving project completion time by 15%. Conducted 45+ technical interviews and code reviews to select and onboard a cohort of interns. Facilitated sprint ceremonies and ensured delivery of both projects within a two-month window.',
    tags: ['agile', 'scrum', 'team leadership', 'mentorship'],
  },
  {
    company: 'THIQAB',
    role: 'Back-End Developer',
    location: 'Tunis, Tunisia',
    dates: 'Jan 2024 - May 2024',
    current: false,
    description: 'Engineered the backend for a high-performance AI-powered stock market analysis platform using Kafka, Docker, and Kubernetes - supporting 500+ concurrent users with sub-200ms response times. Processed 100,000+ real-time data points daily through Python microservices. Delivered a Streamlit dashboard with real-time WebSocket market visualization across 50+ stocks simultaneously, cutting user interaction time by 12%.',
    tags: ['python', 'kafka', 'docker', 'kubernetes', 'websockets', 'streamlit'],
  },
  {
    company: 'AxeFinance',
    role: 'Web Designer',
    location: 'Tunis, Tunisia',
    dates: 'Jun 2020 - Aug 2020',
    current: false,
    description: 'Designed and developed UX landing pages using Angular, achieving a 34% increase in user engagement. Optimized front-end code for responsive design across devices. Conducted 40+ comprehensive tests on web and mobile applications, reducing bugs by 20%.',
    tags: ['angular', 'ux design', 'responsive design', 'testing'],
  },
]

export const education = [
  {
    institution: 'Mediterranean Institute of Technology',
    degree: 'Software Engineering (Degree of Engineering)',
    dates: 'Sep 2022 - Jun 2027',
    note: 'Excellence-based Scholarship (Top 5% of admitted students)',
    relevant: 'System Programming · Data Structures and Algorithms · Distributed Systems · Machine Learning',
  },
  {
    institution: 'Esprit Education (Al-Fikr)',
    degree: 'Tunisian Baccalaureate in Mathematics',
    dates: 'Sep 2018 - Jun 2022',
    note: 'Valedictorian, Class of 2022 · National Ranking: Top 1%',
    relevant: null,
  },
]

export const projects = [
  {
    id: 'echogarden',
    name: 'EchoGarden',
    award: '[ AWARD ]',
    awardDetail: '1st Place - AI Minds National Hackathon, Tunisia · 2024',
    status: null,
    tagline: 'A local-first multimodal knowledge platform',
    highlights: [
      { icon: 'Brain', text: 'Multimodal ingestion: Tika (documents), Whisper (audio), OpenCLIP (image embeddings), OCR' },
      { icon: 'Database', text: 'Qdrant vector search with FastAPI backend and SQLite persistence' },
      { icon: 'Network', text: 'Graph-based knowledge exploration - search, ask, digest, and graph workflows' },
      { icon: 'Shield', text: 'Fully local - no cloud dependency, no data leaves the machine' },
    ],
    stack: 'python · fastapi · qdrant · whisper · openclip · sqlite · ocr',
    aiml: true,
    github: 'https://github.com/Vortrix5/echogarden',
  },
  {
    id: 'sentinex',
    name: 'SentineX',
    award: '[ AWARD ]',
    awardDetail: 'Best Innovation - Coding4Integrity by Microsoft, Qatar · 2024',
    status: null,
    tagline: 'A secure AI-powered exam creation and distribution platform',
    highlights: [
      { icon: 'GitBranch', text: 'Multi-objective genetic algorithm for exam generation - 80% reduction in creation time vs. manual' },
      { icon: 'Lock', text: 'Azure Confidential Ledger for tamper-evident, verifiable exam delivery' },
      { icon: 'Shuffle', text: 'Unique question ordering per student - cryptographically enforced integrity' },
      { icon: 'Monitor', text: 'ReactJS frontend with full exam lifecycle management' },
    ],
    stack: 'python · react · azure · confidential ledger · genetic algorithms',
    aiml: true,
    github: 'https://github.com/Vortrix5/sentinex',
  },
  {
    id: 'teamup',
    name: 'TeamUp',
    award: '[ AWARD ]',
    awardDetail: 'Best Project Award - Mediterranean Institute of Technology · 2024',
    status: null,
    tagline: 'An AI-powered HR platform for building high-performing teams',
    highlights: [
      { icon: 'Users', text: 'Personality trait analysis engine for team composition optimization' },
      { icon: 'BarChart2', text: 'Real-time team dynamics dashboard with collaboration insights' },
      { icon: 'Cloud', text: 'Vue.js frontend with Google Cloud Firebase backend' },
    ],
    stack: 'vue.js · firebase · google cloud · ai/ml',
    aiml: true,
    github: null,
  },
  {
    id: 'stock-platform',
    name: 'AI Stock Analysis Platform',
    context: 'at THIQAB',
    award: null,
    awardDetail: null,
    status: '[ LIVE ]',
    tagline: 'High-throughput distributed platform for real-time stock market analysis',
    highlights: [
      { icon: 'TrendingUp', text: '100,000+ real-time stock data points processed daily' },
      { icon: 'Cpu', text: 'Kafka + Kubernetes microservices architecture - 35% latency reduction' },
      { icon: 'Activity', text: 'Real-time WebSocket dashboard visualizing 50+ stocks simultaneously' },
    ],
    stack: 'python · kafka · kubernetes · docker · websockets · streamlit',
    aiml: false,
    github: null,
  },
]

export const skills = {
  languages: ['Python', 'TypeScript', 'JavaScript', 'Java', 'C++', 'C'],
  frontend: ['React', 'Vue.js', 'Angular', 'Tailwind CSS', 'HTML/CSS'],
  backend: ['Node.js', 'FastAPI', 'Express.js', 'REST APIs', 'WebSockets', 'Prisma'],
  databases_infra: ['PostgreSQL', 'Redis', 'MySQL', 'MongoDB', 'SQLite', 'Docker', 'Kubernetes', 'Kafka', 'CI/CD', 'Linux'],
  ai_ml: ['scikit-learn', 'Qdrant (vector search)', 'OpenCLIP', 'Whisper', 'sentence-transformers', 'RAG pipelines', 'Genetic Algorithms', 'Real-time ML inference', 'Streamlit'],
  cloud_tools: ['Azure', 'AWS', 'Google Cloud Firebase', 'Git', 'GitHub Actions', 'ODOO', 'Figma', 'Adobe XD'],
  design: ['Adobe XD', 'Figma', 'Adobe Illustrator'],
  spoken: ['Arabic (native)', 'French (native)', 'English (fluent)', 'Spanish (intermediate)'],
}

export const awards = [
  {
    year: '2025',
    title: 'Founding President · IEEE-HKN Nu Tau Chapter, Tunisia',
    desc: 'First IEEE-HKN chapter in Tunisia - IEEE\'s global honor society',
  },
  {
    year: '2024',
    title: '1st Place · AI Minds National Hackathon, Tunisia',
    desc: 'EchoGarden: local-first multimodal AI knowledge platform',
  },
  {
    year: '2024',
    title: 'Best Innovation · Coding4Integrity by Microsoft, Qatar',
    desc: 'SentineX: secure AI exam platform with genetic algorithms',
  },
  {
    year: '2024',
    title: '49th Globally · IEEEXtreme 18.0 Programming Competition',
    desc: '3rd nationally · 6,500+ participating teams worldwide',
  },
  {
    year: '2024',
    title: 'Best Project Award · Mediterranean Institute of Technology',
    desc: 'TeamUp: AI-powered HR team formation platform',
  },
  {
    year: '2024',
    title: 'Professional Scrum Master I (PSM I) · Scrum.org',
    desc: null,
  },
  {
    year: '2023',
    title: 'Best Project Award · Mediterranean Institute of Technology',
    desc: null,
  },
  {
    year: '2022',
    title: 'Excellence-Based Scholarship · Mediterranean Institute of Technology',
    desc: 'Awarded to top 5% of admitted students',
  },
  {
    year: '2022',
    title: 'Valedictorian · Tunisian Baccalaureate in Mathematics',
    desc: 'GPA: 16.94/20 · National ranking: Top 1%',
  },
]

export const contact = {
  intro: [
    'Currently open to:',
    '  - ML/AI internships',
    '  - Full-stack engineering roles',
    '  - Interesting technical research collaborations',
  ],
  channels: [
    { icon: 'Mail', label: 'amine.zouaoui@ieee.org', href: 'mailto:amine.zouaoui@ieee.org' },
    { icon: 'Linkedin', label: 'linkedin.com/in/mohamed-amine-zouaoui', href: 'https://linkedin.com/in/mohamed-amine-zouaoui' },
    { icon: 'Github', label: 'github.com/Vortrix5', href: 'https://github.com/Vortrix5' },
    { icon: 'FileDown', label: 'Resume (PDF)', href: '/portfolio/resume.pdf' },
  ],
}

export const BOOT_LINES = [
  { text: 'BIOS v2.4.1 - Mohamed Amine Zouaoui Portfolio OS', delay: 0 },
  { text: 'Initializing memory...                          [ OK ]', delay: 80 },
  { text: 'Loading kernel modules...                       [ OK ]', delay: 80 },
  { text: 'Mounting /experience...                         [ OK ]', delay: 80 },
  { text: 'Mounting /projects...                           [ OK ]', delay: 80 },
  { text: 'Starting network interfaces...                  [ OK ]', delay: 80 },
  { text: 'Checking system integrity...                    [ OK ]', delay: 80 },
  { text: '', delay: 160 },
  { text: 'Welcome to AZ-OS v1.0.0', delay: 120 },
  { text: "Type 'help' to list available commands.", delay: 80 },
  { text: '', delay: 200 },
]
