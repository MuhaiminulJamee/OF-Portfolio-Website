export type Publication = {
  title: string;
  authors: string;
  venue: string;
  year: number;
  type: 'Journal' | 'Conference';
  area: string;
  metric?: string;
  quartile?: string;
  doi: string;
  featured?: boolean;
};

export const publications: Publication[] = [
  {
    title: 'A Novel Framework for Short-Term Wind Power Prediction with RL-based Hyper-parameter Optimization',
    authors: 'M. O. Faruque, M. A. Hossain, S. M. M. Alam, M. Negnevitsky & M. Rahman',
    venue: 'IEEE Transactions on Consumer Electronics · 71, 10467–10478', year: 2025, type: 'Journal', area: 'Wind forecasting', metric: 'IF 10.9', quartile: 'Q1', doi: 'https://doi.org/10.1109/TCE.2025.3628745', featured: true,
  },
  {
    title: 'Enhancing Microgrid Forecasting Accuracy with a TCNN-TLS Framework',
    authors: 'M. O. Faruque, M. M. Islam, M. J. Talukder, A. Mia, S. Tasnim, M. A. Hossain & S. M. Muyeen',
    venue: 'Results in Engineering · 27, 105606', year: 2025, type: 'Journal', area: 'Microgrid intelligence', metric: 'IF 7.9', quartile: 'Q1', doi: 'https://doi.org/10.1016/j.rineng.2025.105606', featured: true,
  },
  {
    title: 'Constraint-aware wind power forecasting with an optimized hybrid machine learning model',
    authors: 'M. O. Faruque, M. A. Hossain, S. M. Alam & M. Khalid',
    venue: 'Energy Conversion and Management: X · 22, 101026', year: 2025, type: 'Journal', area: 'Decision-aware forecasting', metric: 'IF 7.6', quartile: 'Q1', doi: 'https://doi.org/10.1016/j.ecmx.2025.101026', featured: true,
  },
  {
    title: 'Enhancing Solar Irradiance Forecasting Accuracy with a Multi-Head Weather-Aware Hybrid Model',
    authors: 'M. O. Faruque, K. Akter, S. M. Alam, M. A. Hossain, M. R. Islam, M. S. Alam & M. Rahman',
    venue: 'Arabian Journal for Science and Engineering · 50, 1–26', year: 2025, type: 'Journal', area: 'Solar forecasting', metric: 'IF 2.9', quartile: 'Q1', doi: 'https://doi.org/10.1007/s13369-025-10649-1', featured: true,
  },
  {
    title: 'Very short-term wind power forecasting for real-time operation using a hybrid deep learning model with optimization algorithm',
    authors: 'M. O. Faruque, M. A. Hossain, M. R. Islam, S. M. Alam & A. K. Karmaker',
    venue: 'Cleaner Energy Systems · 1, 100129', year: 2024, type: 'Journal', area: 'Wind forecasting', metric: 'CiteScore 5.8', quartile: 'Q2', doi: 'https://doi.org/10.1016/j.cles.2024.100129',
  },
  {
    title: 'A comparative analysis to forecast carbon dioxide emissions',
    authors: 'M. O. Faruque, M. A. J. Rabby, M. A. Hossain, M. R. Islam, M. M. U. Rashid & S. M. Muyeen',
    venue: 'Energy Reports · 8, 8046–8060', year: 2022, type: 'Journal', area: 'Carbon intelligence', metric: 'IF 5.1', quartile: 'Q1', doi: 'https://doi.org/10.1016/j.egyr.2022.06.025',
  },
  {
    title: 'Secured energy data transaction for prosumers under diverse cyberattack scenarios',
    authors: 'F. Tabassum, M. R. Islam, M. I. Azim, M. A. Rahman, M. O. Faruque & M. J. Hossain',
    venue: 'Sustainable Energy, Grids and Networks · 40, 101555', year: 2024, type: 'Journal', area: 'Energy cybersecurity', metric: 'IF 5.6', quartile: 'Q1', doi: 'https://doi.org/10.1016/j.segan.2024.101555', featured: true,
  },
  {
    title: 'Renewable energy integration with DC microgrids: Challenges and opportunities',
    authors: 'M. S. Alam, M. A. Hossain, M. Shafiullah, A. Islam, M. O. Faruque & M. A. Abido',
    venue: 'Electric Power Systems Research · 234, 110548', year: 2024, type: 'Journal', area: 'Renewable integration', metric: 'IF 4.2', quartile: 'Q1', doi: 'https://doi.org/10.1016/j.epsr.2024.110548', featured: true,
  },
  {
    title: 'Optimizing short-term photovoltaic power forecasting with Gaussian process regression and Bayesian hyperparameter tuning',
    authors: 'M. S. S. Islam, P. Ghosh, M. O. Faruque, M. A. Hossain, M. S. Alam & M. R. I. Sheikh',
    venue: 'Processes · 12(3), 546', year: 2024, type: 'Journal', area: 'Solar forecasting', metric: 'IF 2.8', quartile: 'Q2', doi: 'https://doi.org/10.3390/pr12030546',
  },
  {
    title: 'Smart city transformation: An analysis of Dhaka and its challenges and opportunities',
    authors: 'A. K. Karmaker, S. R. Islam, M. Kamruzzaman, M. U. Rashid, M. O. Faruque & M. A. Hossain',
    venue: 'Smart Cities · 6(2), 1087–1108', year: 2023, type: 'Journal', area: 'Smart cities', metric: 'IF 5.5', quartile: 'Q1', doi: 'https://doi.org/10.3390/smartcities6020052',
  },
  {
    title: 'A hybrid LSTM-LightGBM model for precise short-term wind power forecasting',
    authors: 'M. O. Faruque, M. A. Hossain, S. M. Alam, M. R. Islam, M. R. Islam & Y. Guo',
    venue: '2023 IEEE ASEMD', year: 2023, type: 'Conference', area: 'Wind forecasting', doi: 'https://doi.org/10.1109/ASEMD59061.2023.10368796',
  },
  {
    title: 'CNN-XGBoost Based Ensemble Model for Short-Term Load Forecasting',
    authors: 'K. R. Hossain, M. S. S. Islam, M. R. Islam, M. R. I. Sheikh & M. O. Faruque',
    venue: '2024 IEEE ICRAAI', year: 2024, type: 'Conference', area: 'Load forecasting', doi: 'https://doi.org/10.1109/RAAICON64172.2024.10928686',
  },
  {
    title: 'A Comparative Analysis of Short-Term Solar Power Forecasting Using Machine Learning Methods',
    authors: 'N. Sultana, M. S. S. Islam, M. R. Islam, M. R. I. Sheikh & M. O. Faruque',
    venue: '2024 IEEE ICRAAI', year: 2024, type: 'Conference', area: 'Solar forecasting', doi: 'https://doi.org/10.1109/RAAICON64172.2024.10928438',
  },
];

export const projects = [
  { title: 'Decision-aware wind forecasting', lab: 'Power Systems', status: 'Active', methods: ['Deep learning', 'Differentiable optimization'], summary: 'Embedding downstream operating decisions directly into forecasting objectives.' },
  { title: 'Renewable-load uncertainty in microgrids', lab: 'Power Systems', status: 'Ongoing', methods: ['TCNN', 'Transfer learning'], summary: 'Joint forecasting of renewable generation and demand under changing operating conditions.' },
  { title: 'Quantum LSTM architecture analysis', lab: 'Quantum Cyber', status: 'Active', methods: ['PennyLane', 'Qiskit', 'PyTorch'], summary: 'Studying trainability, expressivity and resource trade-offs in hybrid recurrent models.' },
  { title: 'Secure energy data intelligence', lab: 'Quantum Cyber', status: 'Under Review', methods: ['Threat detection', 'Energy transactions'], summary: 'Resilient data pipelines for prosumer transactions under diverse cyberattack scenarios.' },
];

export const courses = [
  { slug: 'python-power-systems-research', title: 'Python for Power Systems Research', category: 'AI in Power Systems', level: 'Foundation', duration: '6 weeks', price: '$120', description: 'A research-first path from scientific Python to clean, reproducible energy analysis.' },
  { slug: 'machine-learning-energy-forecasting', title: 'Machine Learning for Energy Forecasting', category: 'AI in Power Systems', level: 'Intermediate', duration: '8 weeks', price: '$180', description: 'Build, evaluate and communicate forecasting models for load, wind and solar data.' },
  { slug: 'optimization-power-systems', title: 'Optimization for Intelligent Power Systems', category: 'AI in Power Systems', level: 'Advanced', duration: '8 weeks', price: '$220', description: 'Connect optimization, learning and operational constraints in modern grids.' },
  { slug: 'introduction-quantum-machine-learning', title: 'Introduction to Quantum Machine Learning', category: 'Quantum Cyber Intelligence', level: 'Foundation', duration: '6 weeks', price: '$150', description: 'Understand qubits, variational circuits and hybrid learning through guided experiments.' },
  { slug: 'quantum-neural-networks', title: 'Quantum Neural Networks', category: 'Quantum Cyber Intelligence', level: 'Advanced', duration: '8 weeks', price: '$240', description: 'Design and analyze hybrid QNNs with PennyLane, Qiskit and PyTorch.' },
  { slug: 'ai-cybersecurity', title: 'AI for Cybersecurity', category: 'Quantum Cyber Intelligence', level: 'Intermediate', duration: '7 weeks', price: '$190', description: 'Use machine learning for anomaly detection, threat analysis and secure energy systems.' },
];

export const resources = [
  { title: 'Wind Forecasting Experiment Blueprint', category: 'Power Systems', tech: 'Python · PyTorch', kind: 'Notebook', description: 'A reproducible experiment structure for short-term wind forecasting studies.' },
  { title: 'Literature Review Matrix', category: 'Research Methods', tech: 'Spreadsheet · LaTeX', kind: 'Template', description: 'Compare datasets, methods, baselines, limitations and unresolved research gaps.' },
  { title: 'Variational Quantum Classifier Starter', category: 'Quantum Computing', tech: 'PennyLane · Python', kind: 'Code', description: 'A concise hybrid quantum-classical classification experiment.' },
  { title: 'Power-System Threat Taxonomy', category: 'Cybersecurity', tech: 'SCADA · PMU', kind: 'Reference', description: 'A working map of common attack surfaces and data-integrity risks.' },
  { title: 'Paper Reproduction Checklist', category: 'Research Methods', tech: 'Jupyter · Git', kind: 'Checklist', description: 'A practical checklist for reproducing and stress-testing published results.' },
  { title: 'Solar Forecast Evaluation Kit', category: 'Deep Learning', tech: 'Python · Scikit-learn', kind: 'Code', description: 'Metrics and plots for fair solar-irradiance model comparison.' },
];

export const insights = [
  { slug: 'forecasting-is-a-decision-problem', type: 'Research note', title: 'Forecasting is a decision problem', date: 'August 18, 2026', read: '7 min', category: 'Energy AI', excerpt: 'Why the best statistical forecast is not always the most useful operating forecast.' },
  { slug: 'quantum-lstm-questions', type: 'Field note', title: 'The questions to ask before building a Quantum LSTM', date: 'July 30, 2026', read: '6 min', category: 'Quantum ML', excerpt: 'A research checklist for separating architectural novelty from measurement noise.' },
  { slug: 'reading-papers-as-a-researcher', type: 'Video briefing', title: 'How to read papers as a researcher', date: 'July 12, 2026', read: '12 min video', category: 'Research methods', excerpt: 'A structured way to move from summary to critique, reproduction and research gap.' },
];

export const labAreas = {
  power: [
    ['Renewable energy prediction', 'Solar, wind, hydrogen and hybrid-system forecasting under operational uncertainty.'],
    ['Load & EV demand forecasting', 'Data-driven demand intelligence for planning, scheduling and real-time operation.'],
    ['Optimization-embedded learning', 'Models trained around constraints, schedules and the decisions forecasts must support.'],
    ['Grid stability & inertia', 'Forecasting system inertia and stability indicators in renewable-rich networks.'],
    ['SCADA & PMU intelligence', 'Data-driven monitoring, control and optimization for observable, resilient grids.'],
    ['Reinforcement learning', 'Sequential decision systems for energy management and smart-grid operation.'],
  ],
  quantum: [
    ['Quantum-classical learning', 'Hybrid QNNs and variational circuits for measurable, reproducible experiments.'],
    ['Quantum LSTM architectures', 'Resource, trainability and performance analysis of quantum recurrent models.'],
    ['Quantum cryptography', 'Post-quantum protocols and quantum-aware approaches to trusted exchange.'],
    ['ML threat detection', 'Anomaly detection and intelligent threat analysis for complex cyber systems.'],
    ['Secure forecasting pipelines', 'Forecasting systems designed around data-integrity and intervention risks.'],
    ['Graph neural networks', 'Learning over power topologies and complex network-security structures.'],
  ],
};

export const researchPath = [
  ['Month 01', 'Build the foundation', 'Python data structures, linear algebra, calculus and the core language of AI research.'],
  ['Month 02', 'Machine learning', 'Supervised and unsupervised learning, preprocessing, model evaluation and a focused mini-project.'],
  ['Month 03', 'Deep learning', 'Neural-network architecture, TensorFlow or PyTorch, and graph neural-network foundations.'],
  ['Month 04', 'Advanced domain methods', 'Quantum machine learning, power-systems cybersecurity and disciplined paper reading.'],
  ['Month 05', 'Gap analysis', 'Compare methods, map the literature and turn limitations into researchable questions.'],
  ['Month 06', 'Independent research', 'Develop an original idea, validate it, and prepare a publication-quality paper draft.'],
];
