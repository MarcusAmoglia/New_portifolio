// src/utils/dataManager.js
const STORAGE_KEY = 'portfolio_data'

const getFallbackData = () => ({
  hero: {
    badge:       { pt: 'Disponível para novos desafios', en: 'Available for new challenges' },
    name:        { pt: 'Marcus',  en: 'Marcus'  },
    lastName:    { pt: 'Amoglia', en: 'Amoglia' },
    description: {
      pt: 'Graduando em Engenharia de Software e Técnico em Desenvolvimento de Sistemas pelo IF Sudeste MG. Atuo como Analista de QA e Desenvolvedor Full Stack, com foco em automação de testes end-to-end, APIs e construção de aplicações web.',
      en: 'Software Engineering undergraduate and Systems Development Technician student at IF Sudeste MG. Working as a QA Analyst and Full Stack Developer, focused on end-to-end test automation, APIs, and web application development.',
    },
    linkedin: 'https://www.linkedin.com/in/marcus-amoglia-464071361',
    github:   'https://github.com/MarcusAmoglia',
    email:    'marcus.amoglia7@gmail.com',
  },
  heroStats: [
    { num: '3+',   label: 'Projetos'   },
    { num: '540h', label: 'Residência' },
    { num: '2+',   label: 'Formações'  },
  ],
  typingRoles: {
    pt: ['Product Owner', 'QA Tester', 'Engenheiro de Software'],
    en: ['Product Owner', 'QA Tester', 'Software Engineer'],
  },
  skills: {
    tech: {
      title: { pt: 'QA & Desenvolvimento', en: 'QA & Development' },
      icon: '🐍',
      items: {
        pt: [
          'Python (Django) – Desenvolvimento Back-end',
          'React + Tailwind CSS – Interfaces modernas',
          'Cypress & Robot Framework – Automação E2E',
          'Postman – Automação e testes de API',
          'SQL (PostgreSQL) – Modelagem e consultas',
          'Git/GitHub – Controle de versão',
          'Java (Spring Boot) – Noções',
        ],
        en: [
          'Python (Django) – Back-end Development',
          'React + Tailwind CSS – Modern interfaces',
          'Cypress & Robot Framework – E2E test automation',
          'Postman – API testing & automation',
          'SQL (PostgreSQL) – Modeling & queries',
          'Git/GitHub – Version control',
          'Java (Spring Boot) – Basics',
        ],
      },
    },
    processes: {
      title: { pt: 'Gestão & Estratégia', en: 'Management & Strategy' },
      icon: '♟️',
      items: {
        pt: [
          'Product Ownership – Visão de produto e backlog',
          'Metodologias Ágeis – Scrum / Kanban',
          'Levantamento de Requisitos e Mapeamento de Processos',
          'Ciclo PDCA – Melhoria contínua',
          'Comunicação Técnica e Liderança',
        ],
        en: [
          'Product Ownership – Product vision & backlog',
          'Agile Methodologies – Scrum / Kanban',
          'Requirements Gathering & Process Mapping',
          'PDCA Cycle – Continuous improvement',
          'Technical Communication & Leadership',
        ],
      },
    },
  },
  trajectory: [
    { status: { pt: 'Em andamento', en: 'In progress' }, title: { pt: 'Engenharia de Software', en: 'Software Engineering' }, institution: { pt: 'Estácio', en: 'Estácio' }, badge: { pt: 'Graduação', en: "Bachelor's" }, period: '2025–presente' },
    { status: { pt: 'Em andamento', en: 'In progress' }, title: { pt: 'Técnico em Desenvolvimento de Sistemas', en: 'Systems Development Technician' }, institution: { pt: 'IF Fluminense', en: 'IF Fluminense' }, badge: { pt: 'Técnico', en: 'Technical' }, period: '2025–presente' },
    { status: { pt: 'Concluído', en: 'Completed' }, title: { pt: 'Residência em Software (Programa STEM)', en: 'Software Residency (STEM Program)' }, institution: { pt: 'Brisa / UNIFASE', en: 'Brisa / UNIFASE' }, badge: { pt: 'Especialização', en: 'Specialization' }, period: '2025–2026' },
    { status: { pt: 'Concluído', en: 'Completed' }, title: { pt: 'Back-End Python - Django', en: 'Back-End Python - Django' }, institution: { pt: 'Softex / Bolsa Futuro Digital', en: 'Softex / Digital Future Scholarship' }, badge: { pt: 'Formação', en: 'Training' }, period: '2025–2026' },
    { status: { pt: 'Concluído', en: 'Completed' }, title: { pt: 'IQS – Introdução à Qualidade de Software', en: 'IQS – Introduction to Software Quality' }, institution: { pt: 'FEST / UFF / T2M', en: 'FEST / UFF / T2M' }, badge: { pt: 'Curso', en: 'Course' }, period: '2026' },
  ],
  projects: [
    { id: 1, titulo: { pt: 'Simulador Corporativo', en: 'Corporate Simulator' }, subtitulo: { pt: 'Gestão & Estratégia de Negócios', en: 'Business Management & Strategy' }, descricao: { pt: 'Plataforma web de alta fidelidade para simulação corporativa e análise de mercado, com motor de cálculo proprietário.', en: 'High-fidelity web platform for corporate simulation and market analysis, with proprietary calculation engine.' }, videoId: 'w793MSipWZM', github: 'https://github.com/MarcusAmoglia/Simulador-corporativo.git', pdf: '', tags: ['Product Owner', 'QA Testing', 'Análise de Dados'], cor: '#00eeff', ano: '' },
    { id: 2, titulo: { pt: 'Educa Sustenta', en: 'Edu Sustenta' }, subtitulo: { pt: 'Plataforma Educacional Interativa', en: 'Interactive Educational Platform' }, descricao: { pt: 'Plataforma educacional com trilhas de conhecimento interativas para aprendizado sustentável.', en: 'Educational platform with interactive knowledge paths for sustainable learning.' }, videoId: 'W79oKJh1dLs', github: 'https://github.com/thiagobellato/edu-sustenta-back.git', pdf: '', tags: ['Product Ownership', 'QA Engineering', 'Data Modeling'], cor: '#a855f7', ano: '' },
    { id: 3, titulo: { pt: 'Robô Bypass Captcha', en: 'Captcha Bypass Robot' }, subtitulo: { pt: 'Automação com Python/Robot Framework', en: 'Automation with Python/Robot Framework' }, descricao: { pt: 'Solução de automação para bypass de captcha em login.', en: 'Automation solution for captcha bypass in login.' }, videoId: 'Vy4nyD_0BAA', github: 'https://github.com/MarcusAmoglia/Robot_projeto.git', pdf: '', tags: ['Python', 'Robot Framework', 'Automação'], cor: '#22e3ff', ano: '' },
    { id: 4, titulo: { pt: 'Em Breve', en: 'Coming Soon' }, subtitulo: { pt: 'Novo Projeto', en: 'New Project' }, descricao: { pt: 'Novo projeto em desenvolvimento utilizando React e Node.js.', en: 'New project in development using React and Node.js.' }, videoId: null, github: null, pdf: '', tags: ['React', 'Node.js', 'Em Breve'], cor: '#00eeff', ano: '' },
  ],
  certifications: [
    { title: { pt: 'Back-End Python - Django', en: 'Back-End Python - Django' }, issuer: { pt: 'Softex / Bolsa Futuro Digital', en: 'Softex / Digital Future Scholarship' }, hours: 200, year: 2025, pdf: '/certificados/backend.pdf', preview: '/thumbs_certificados/backend.jpg' },
    { title: { pt: 'Residência TIC 16 - Imersão em Computação Avançada', en: 'TIC 16 Residency - Advanced Computing Immersion' }, issuer: { pt: 'Brisa / Serratec', en: 'Brisa / Serratec' }, hours: 540, year: '2025–2026', pdf: '/certificados/residencia.pdf', preview: '/thumbs_certificados/residencia.jpg' },
    { title: { pt: 'IQS – Introdução à Qualidade de Software', en: 'IQS – Introduction to Software Quality' }, issuer: { pt: 'FEST / UFF / T2M', en: 'FEST / UFF / T2M' }, hours: 80, year: 2026, pdf: '/certificados/iqs.pdf', preview: '/thumbs_certificados/iqs.jpg' },
  ],
  colors: {
    dark: {
      primary:       '#00eeff',
      primaryHover:  '#22e3ff',
      secondary:     '#a855f7',
      cardBg:        '#0d0d1a',
    },
    light: {
      primary:       '#0284c7',
      primaryHover:  '#0369a1',
      secondary:     '#7c3aed',
      cardBg:        '#ffffff',
    }
  },
  contacts: {
    email:    'marcus.amoglia7@gmail.com',
    linkedin: 'https://www.linkedin.com/in/marcus-amoglia-464071361',
    github:   'https://github.com/MarcusAmoglia',
  },
})

const loadFromJsonFile = async () => {
  try {
    const r = await fetch('/data.json?t=' + Date.now())
    if (r.ok) return await r.json()
  } catch (e) { console.warn('Erro ao carregar data.json:', e) }
  return null
}

// Migração: se colors existir mas for objeto antigo (sem dark/light), converte
const migrateColors = (data) => {
  if (!data.colors) return data
  if (data.colors.dark && data.colors.light) return data // já novo formato
  // Formato antigo: { primary, primaryHover, secondary, cardBg }
  const old = data.colors
  data.colors = {
    dark: {
      primary:       old.primary       || '#00eeff',
      primaryHover:  old.primaryHover  || '#22e3ff',
      secondary:     old.secondary     || '#a855f7',
      cardBg:        old.cardBg        || '#0d0d1a',
    },
    light: {
      primary:       '#0284c7',
      primaryHover:  '#0369a1',
      secondary:     '#7c3aed',
      cardBg:        '#ffffff',
    }
  }
  return data
}

export const loadData = async () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed && Object.keys(parsed).length > 0) {
        return migrateColors(parsed)
      }
    }
  } catch (e) { console.error('Erro localStorage:', e) }
  const jsonData = await loadFromJsonFile()
  if (jsonData) return migrateColors(jsonData)
  return getFallbackData()
}

export const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    window.dispatchEvent(new StorageEvent('storage', { key: STORAGE_KEY, newValue: JSON.stringify(data) }))
    return true
  } catch (e) { console.error('Erro ao salvar:', e); return false }
}

export const resetData = async () => {
  const json = await loadFromJsonFile()
  if (json) { saveData(migrateColors(json)); return migrateColors(json) }
  const fallback = getFallbackData()
  saveData(fallback)
  return fallback
}

export const getDefaultData = async () => {
  const json = await loadFromJsonFile()
  if (json) return migrateColors(json)
  return getFallbackData()
}