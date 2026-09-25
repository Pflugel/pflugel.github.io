// Pflugel.com V4 interactions

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Scroll reveal
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.10 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Current year
document.querySelectorAll('#year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// Interactive Professional Dashboard
const dashboardContent = {
  build: {
    label: 'BUILD',
    title: 'From rough idea to working structure.',
    body: 'I use modern AI, automation and straightforward systems thinking to turn an idea into something people can actually use, test and improve.',
    points: ['Prototype quickly', 'Document the logic', 'Test with real use cases']
  },
  improve: {
    label: 'IMPROVE',
    title: 'Learn the operation before changing the operation.',
    body: 'I look for friction, repetitive work, communication gaps and avoidable complexity—then improve the process without disrupting what already works.',
    points: ['Understand the workflow', 'Find the bottleneck', 'Automate selectively']
  },
  teach: {
    label: 'TEACH',
    title: 'Make complex technology usable.',
    body: 'Technical knowledge only creates value when people can understand and apply it. My background in training and support shapes how I document, explain and roll out new systems.',
    points: ['Plain-language guidance', 'Practical documentation', 'Support adoption']
  },
  lead: {
    label: 'LEAD',
    title: 'Connect people, priorities and execution.',
    body: 'I am comfortable working across customers, technical teams, operations and leadership—keeping the work organized while maintaining focus on service and outcomes.',
    points: ['Coordinate stakeholders', 'Create clarity', 'Keep work moving']
  }
};

const dashCards = document.querySelectorAll('.dash-card');
const dashDetail = document.querySelector('#dashboard-detail');

dashCards.forEach(card => {
  card.addEventListener('click', () => {
    const key = card.dataset.panel;
    const data = dashboardContent[key];
    if (!data || !dashDetail) return;

    dashCards.forEach(c => {
      c.classList.remove('active');
      c.setAttribute('aria-pressed', 'false');
    });
    card.classList.add('active');
    card.setAttribute('aria-pressed', 'true');

    dashDetail.innerHTML = `
      <div>
        <span class="detail-label">${data.label}</span>
        <h3>${data.title}</h3>
        <p>${data.body}</p>
      </div>
      <div class="detail-points">
        ${data.points.map(point => `<span>${point}</span>`).join('')}
      </div>
    `;
  });
});

// Project dialog
const projectData = {
  crew: {
    title: 'Crew Clerks',
    subtitle: 'Voice-powered field operations concept',
    summary: 'A voice-first assistant concept for contractors and service companies. The goal is to let a user speak naturally while the system structures customer information, labor, materials, estimates, change orders, job updates and follow-up actions.',
    bullets: ['Voice-first customer/job capture', 'Materials and labor by spoken update', 'Estimates and change-order workflows', 'Field-service oriented design']
  },
  fanduel: {
    title: 'FanDuel ATI Engine',
    subtitle: 'Simulation, optimization and portfolio experimentation',
    summary: 'An iterative software project for building and evaluating DFS lineups using projections, constraints, exposure controls, simulations, contest strategy and historical results.',
    bullets: ['Lineup generation and portfolio diversity', 'Simulation and exposure controls', 'Late-swap workflow concepts', 'Historical learning and evaluation']
  },
  opportunity: {
    title: 'AI Opportunity Engine',
    subtitle: 'n8n + structured scoring + AI-assisted research',
    summary: 'A learning and prototyping project for evaluating product or business opportunities using structured evidence, scoring rules, automated workflows and LLM-assisted analysis.',
    bullets: ['n8n workflow orchestration', 'Structured scoring and hard gates', 'Evidence-based decision logic', 'AI-assisted research workflow']
  },
  sunbridge: {
    title: 'SunBridge Digital Solutions',
    subtitle: 'Independent technology-services side project',
    summary: 'A small side project designed around approachable technical help, device support, digital technology coaching and practical AI guidance.',
    bullets: ['Computer and device support', 'Digital technology coaching', 'AI assistance and guidance', 'Small-business technical support']
  }
};

const dialog = document.querySelector('#project-dialog');
const dialogContent = document.querySelector('#project-dialog-content');
const closeDialog = document.querySelector('.dialog-close');

document.querySelectorAll('.project-detail-trigger').forEach(button => {
  button.addEventListener('click', () => {
    const data = projectData[button.dataset.project];
    if (!data || !dialog || !dialogContent) return;
    dialogContent.innerHTML = `
      <p class="section-kicker">CASE STUDY PREVIEW</p>
      <h2>${data.title}</h2>
      <p><strong>${data.subtitle}</strong></p>
      <p>${data.summary}</p>
      <ul>${data.bullets.map(item => `<li>${item}</li>`).join('')}</ul>
      <p><em>V4 placeholder:</em> the full case-study pages will add screenshots, architecture, my role, lessons learned and current status.</p>
    `;
    dialog.showModal();
  });
});

if (closeDialog && dialog) {
  closeDialog.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const r = dialog.getBoundingClientRect();
    const outside = event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom;
    if (outside) dialog.close();
  });
}


// Showcase page project filtering
const filterButtons = document.querySelectorAll('.filter-button');
const showcaseProjects = document.querySelectorAll('.showcase-project-card');

if (filterButtons.length && showcaseProjects.length) {
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;

      showcaseProjects.forEach(card => {
        const cats = (card.dataset.category || '').split(' ');
        const show = filter === 'all' || cats.includes(filter);
        card.classList.toggle('hidden-project', !show);
      });
    });
  });
}


// ======================================================
// V13 CAREER TIMELINE
// ======================================================
const careerData = {
  reuters: {
    index: '01 / 08',
    dates: '1992–1998',
    company: 'REUTERS',
    title: 'Computer Technician · Hauppauge, NY',
    summary: 'Built the technical foundation: desktop support, computer hardware, software troubleshooting, networking fundamentals, equipment setup, and customer-focused end-user support.',
    responsibilities: ['Desktop hardware and software support','Equipment setup and troubleshooting','End-user support and issue resolution'],
    impact: ['Built hands-on enterprise technology skills','Learned customer-facing technical support','Developed the base for later project work'],
    skills: ['Technical Support','Hardware','Software Troubleshooting','Customer Support'],
    progress: 12,
    progressLabel: '1992 →'
  },
  darby: {
    index: '02 / 08',
    dates: '1998–2001',
    company: 'Darby Corporate Solutions',
    title: 'IT / Relocation Project Manager · Westbury, NY',
    summary: 'Moved from pure technical support into project execution: coordinating full corporate relocations, data center builds and relocations, low voltage cabling, field service, user support, and technology work across active corporate client environments.',
    responsibilities: ['Desktop and field-service support','Full corporate relocation project coordination','Data center builds and relocations','Low voltage cabling','Technology and client communication'],
    impact: ['Expanded from technician to project-oriented work','Built multi-location coordination skills','Worked directly in customer operating environments'],
    skills: ['Technical Support','Hardware','Customer Support','Project Coordination','Full Corporate Relocations','Data Center Builds','Data Center Relocations','Low Voltage Cabling','Field Service'],
    progress: 24,
    progressLabel: '1998 →'
  },
  summerbay: {
    index: '03 / 08',
    dates: '2003–2004',
    company: 'Summer Bay Resort',
    title: 'Customer Service Manager — Call Center · Orlando, FL',
    summary: 'Added high-volume customer-operations leadership to the technology foundation, managing service quality, staff performance, escalations, and daily execution.',
    responsibilities: ['Customer-service operations','Staff performance support','Escalation and service-quality management'],
    impact: ['Strengthened people-management experience','Added high-volume operating discipline','Expanded customer-facing leadership'],
    skills: ['Technical Support','Project Coordination','Customer Support','Call Center Operations','Staff Performance','Escalation Management'],
    progress: 36,
    progressLabel: '2003 →'
  },
  lydian: {
    index: '04 / 08',
    dates: '2004–2006',
    company: 'Lydian Data Services',
    title: 'Director of Facilities & Support Services · Boca Raton, FL',
    summary: 'Integrated facilities, administrative services, and internal IT support across a multi-site corporate environment spanning five locations in three states.',
    responsibilities: ['Multi-site facilities and administrative services','Internal IT support operations','Onboarding, deployments, relocations, security systems, and vendors'],
    impact: ['Standardized policies and procedures','Improved cross-site consistency','Connected technology support with business operations'],
    skills: ['Technical Support','Project Coordination','Customer Support','Facilities','Internal IT Support','Multi-site Operations','Vendor Management'],
    progress: 48,
    progressLabel: '2004 →'
  },
  amys: {
    index: '05 / 08',
    dates: '2006–2008',
    company: 'Amy’s Restaurant — CGP of Nashville Inc.',
    title: 'Owner / General Manager · Nashville, TN',
    summary: 'Moved from supporting businesses to owning and operating one: staffing, scheduling, training, purchasing, customer service, financial oversight, and daily operating decisions.',
    responsibilities: ['Business ownership and daily operations','Staffing, scheduling, training, and purchasing','Customer service and financial oversight'],
    impact: ['Led a team of approximately 15 employees','Managed service quality and operating consistency','Developed first-hand owner/operator perspective'],
    skills: ['Technical Support','Project Coordination','Facilities','Vendor Management','Business Ownership','Staffing','Scheduling','Customer Operations','Financial Oversight'],
    progress: 60,
    progressLabel: '2006 →'
  },
  raytheon: {
    index: '06 / 08',
    dates: '2009–2023',
    company: 'Raytheon Technologies',
    title: 'Senior Analyst — Technical Training · Remote / TN',
    summary: 'Spent more than a decade supporting a specialized global digital-forensics training and certification program serving law-enforcement, government, corporate, and academic organizations.',
    responsibilities: ['Training operations and program support','Stakeholder communications and documentation','Customer relationships, issue resolution, and administrative coordination'],
    impact: ['Supported ATF, DHS, DEA, FBI and other organizations','Maintained continuity across leadership transitions','Certified Raytheon Six Sigma Specialist (R60)'],
    skills: ['Technical Support','Project Coordination','Business Operations','Technical Training','Program Operations','Stakeholder Management','Government / Enterprise Customers','Documentation','Process Improvement'],
    progress: 74,
    progressLabel: '2009 →'
  },
  recovery: {
    index: '07 / 08',
    dates: '2024–2025',
    company: 'Medical Recovery & Professional Development',
    title: 'Career Recovery Period',
    summary: 'Took a planned period away from full-time employment to recover from significant medical issues while continuing professional development in emerging technology, generative AI, automation, and modern digital workflows.',
    responsibilities: ['Focused on recovery before returning to full-time professional work','Continued structured learning in emerging technology and AI','Explored workflow design and AI-assisted productivity'],
    impact: ['Maintained professional development during the career pause','Built familiarity with modern LLM tools and automation concepts','Created the foundation for the next phase of independent technology work'],
    skills: ['Professional Development','Generative AI','LLM Exploration','Emerging Technology','Workflow Design','AI-Assisted Productivity'],
    progress: 87,
    progressLabel: '2024 →'
  },
  current: {
    index: '08 / 08',
    dates: '2026–Present',
    company: 'AI, Automation & Independent Technology Projects',
    title: 'Independent Professional Development · Florida',
    summary: 'Applying the accumulated technology, operations, training, and business experience to modern AI workflows, automation, structured decision systems, and product experimentation.',
    responsibilities: ['Generative-AI workflow design','Automation and n8n experimentation','Product prototyping, documentation, and practical AI adoption'],
    impact: ['Built Crew Clerks voice-workflow concept','Designed AI Opportunity Engine decision architecture','Iterated FanDuel ATI simulation/portfolio engine','Built SunBridge technology-services side project'],
    skills: ['Technical Support','Project Coordination','Business Operations','Technical Training','Process Improvement','Generative AI','LLM Workflows','Automation','n8n','Product Prototyping','AI-Assisted Development'],
    progress: 100,
    progressLabel: 'Now'
  }
};

const eraButtons = document.querySelectorAll('.career-era');
const eraPanel = document.querySelector('#career-era-panel');

function listItems(items) {
  return items.map(item => `<li>${item}</li>`).join('');
}
function skillPills(items) {
  return items.map(item => `<span>${item}</span>`).join('');
}

if (eraButtons.length && eraPanel) {
  eraButtons.forEach(button => {
    button.addEventListener('click', () => {
      const data = careerData[button.dataset.era];
      if (!data) return;

      eraButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected','false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected','true');

      eraPanel.classList.add('switching');

      window.setTimeout(() => {
        eraPanel.innerHTML = `
          <div class="era-main">
            <div class="era-header">
              <div>
                <span class="era-dates">${data.dates}</span>
                <h3>${data.company}</h3>
                <p class="era-title">${data.title}</p>
              </div>
              <span class="era-index">${data.index}</span>
            </div>
            <p class="era-summary">${data.summary}</p>
            <div class="era-detail-grid">
              <section>
                <span>RESPONSIBILITIES</span>
                <ul>${listItems(data.responsibilities)}</ul>
              </section>
              <section>
                <span>IMPACT / DEVELOPMENT</span>
                <ul>${listItems(data.impact)}</ul>
              </section>
            </div>
          </div>
          <aside class="era-skills">
            <p class="section-kicker">SKILLS GAINED ALONG THE WAY</p>
            <div class="era-skill-pills">${skillPills(data.skills)}</div>
            <div class="career-progress">
              <span>Career progression</span>
              <div class="progress-track"><i style="width:${data.progress}%"></i></div>
              <strong>${data.progressLabel}</strong>
            </div>
          </aside>`;
        eraPanel.classList.remove('switching');
      }, 120);
    });
  });
}

// Experience accordion
document.querySelectorAll('.experience-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const card = toggle.closest('.experience-card');
    const open = card.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));

    const label = toggle.querySelector(':scope > strong');
    if (label && window.innerWidth > 700) {
      label.textContent = open ? 'Hide Details −' : 'View Details +';
    }
  });
});

// Resume skills filters with soft fade and reflow
const skillFilters = document.querySelectorAll('.skill-filter');
const competencyItems = document.querySelectorAll('.competency-grid [data-skill-category]');

if (skillFilters.length && competencyItems.length) {
  skillFilters.forEach(button => {
    button.addEventListener('click', () => {
      skillFilters.forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.skillFilter;

      competencyItems.forEach(item => {
        const categories = (item.dataset.skillCategory || '').split(' ');
        const visible = filter === 'all' || categories.includes(filter);

        if (visible) {
          item.classList.remove('skill-fading-out');
          item.classList.remove('skill-hidden');
          requestAnimationFrame(() => item.classList.add('skill-fading-in'));
          window.setTimeout(() => item.classList.remove('skill-fading-in'), 260);
        } else {
          item.classList.remove('skill-fading-in');
          item.classList.add('skill-fading-out');
          window.setTimeout(() => {
            if (item.classList.contains('skill-fading-out')) {
              item.classList.add('skill-hidden');
              item.classList.remove('skill-fading-out');
            }
          }, 180);
        }
      });
    });
  });
}


// ======================================================
// V15 CREWCLERKS CASE STUDY INTERACTIONS
// ======================================================
const ccWorkflowData = {
  capture: {
    number: '01 / CAPTURE',
    title: 'Say what happened without choosing a form first.',
    text: 'Voice, typed input, photos, measurements, labor, materials, schedule details, and reminders can begin as one natural update.',
    label: 'INPUT',
    sample: '“Mrs. Johnson approved the estimate. Schedule Tuesday morning, add two hours of labor, order another ceiling fan, and remind me to call the electrician.”'
  },
  organize: {
    number: '02 / ORGANIZE',
    title: 'Identify the destination, then separate the work.',
    text: 'CrewClerks determines the customer and exact job, then separates one mixed update into the records and actions it contains.',
    label: 'SYSTEM LOGIC',
    sample: 'Customer + job → approval record + schedule draft + labor entry + material task + reminder.'
  },
  review: {
    number: '03 / REVIEW',
    title: 'Ask only what is missing and show one coordinated review.',
    text: 'Essential gaps become short conversational questions. The user can correct details naturally by voice or touch before approval.',
    label: 'HUMAN CHECK',
    sample: 'Confirm destinations, scope, quantities, dates, prices, measurements, and proposed actions before anything consequential happens.'
  },
  approve: {
    number: '04 / APPROVE & SAVE',
    title: 'Turn approved understanding into completed business records.',
    text: 'After approval, records are saved, paperwork is prepared, reminders or follow-up are queued, and the activity history shows what happened.',
    label: 'OUTPUT',
    sample: 'Approved job records + proposal/billing paperwork + follow-up + auditable activity history.'
  }
};

const ccSteps = document.querySelectorAll('.cc-step');
const ccWorkflowDetail = document.querySelector('#cc-workflow-detail');

if (ccSteps.length && ccWorkflowDetail) {
  ccSteps.forEach(button => {
    button.addEventListener('click', () => {
      const data = ccWorkflowData[button.dataset.ccStep];
      if (!data) return;
      ccSteps.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected','false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected','true');
      ccWorkflowDetail.style.opacity = '0';
      ccWorkflowDetail.style.transform = 'translateY(4px)';
      setTimeout(() => {
        ccWorkflowDetail.innerHTML = `
          <div>
            <span class="cc-detail-number">${data.number}</span>
            <h3>${data.title}</h3>
            <p>${data.text}</p>
          </div>
          <div class="cc-flow-code">
            <span>${data.label}</span>
            <strong>${data.sample}</strong>
          </div>`;
        ccWorkflowDetail.style.opacity = '1';
        ccWorkflowDetail.style.transform = 'translateY(0)';
      }, 120);
    });
  });
}

const ccScreens = {
  speak: {
    image: 'assets/crewclerks-speak.png',
    number: '01 / 09',
    title: 'Speak',
    purpose: 'Natural-language capture for mixed field updates.',
    value: 'The user can begin with the work itself instead of hunting through menus and document types.'
  },
  customers: {
    image: 'assets/crewclerks-customers.png',
    number: '02 / 09',
    title: 'Customers',
    purpose: 'Persistent customer and job memory.',
    value: 'Customer profiles keep the work anchored to the right person, address, job, and history.'
  },
  proposals: {
    image: 'assets/crewclerks-proposals.png',
    number: '03 / 09',
    title: 'Proposals',
    purpose: 'Voice-first estimate and proposal creation.',
    value: 'Scope, measurements, labor, materials, equipment, options, exclusions, schedule, and terms can be captured without starting in a traditional form.'
  },
  billing: {
    image: 'assets/crewclerks-billing.png',
    number: '04 / 09',
    title: 'Billing',
    purpose: 'Export-ready paperwork and accounting output.',
    value: 'Approved billing data can become invoice, estimate, service-report, and accounting export outputs without silently charging or sending anything.'
  },
  activity: {
    image: 'assets/crewclerks-activity.png',
    number: '05 / 09',
    title: 'Activity',
    purpose: 'Audit history linked to the correct customer and job.',
    value: 'Approved records, reminders, schedule items, notes, and bilingual documents remain visible as part of the work history.'
  },
  interpreter: {
    image: 'assets/crewclerks-interpreter.png',
    number: '06 / 09',
    title: 'Interpreter',
    purpose: 'Built-in two-way bilingual communication.',
    value: 'English and Spanish speakers can communicate through translated text and spoken playback without making the customer become a CrewClerks user.'
  },
  help: {
    image: 'assets/crewclerks-help.png',
    number: '07 / 09',
    title: 'Help',
    purpose: 'Embedded onboarding and searchable workflow support.',
    value: 'The product teaches the workflow inside the application instead of depending on a separate support manual.'
  },
  team: {
    image: 'assets/crewclerks-team.png',
    number: '08 / 09',
    title: 'Team',
    purpose: 'Role-based permissions for company workflows.',
    value: 'Owners, managers, crew chiefs, billing administrators, and crew members can have different authority instead of sharing one unrestricted account.'
  },
  admin: {
    image: 'assets/crewclerks-admin.png',
    number: '09 / 09',
    title: 'Admin',
    purpose: 'Company access, beta setup, and private-workspace controls.',
    value: 'The administration model is being built around company separation, authorized users, usage controls, and protected customer data.'
  }
};

const ccScreenTabs = document.querySelectorAll('.cc-screen-tab, .cc-screen-thumbs button');
const ccScreenImage = document.querySelector('#cc-screen-image');
const ccScreenNumber = document.querySelector('#cc-screen-number');
const ccScreenTitle = document.querySelector('#cc-screen-title');
const ccScreenPurpose = document.querySelector('#cc-screen-purpose');
const ccScreenValue = document.querySelector('#cc-screen-value');
const ccNextScreen = document.querySelector('.cc-next-screen');
const ccKeys = Object.keys(ccScreens);
let ccCurrentScreen = 'speak';

function showCcScreen(key) {
  const data = ccScreens[key];
  if (!data || !ccScreenImage) return;
  ccCurrentScreen = key;
  document.querySelectorAll('[data-screen]').forEach(el => {
    el.classList.toggle('active', el.dataset.screen === key);
  });
  ccScreenImage.style.opacity = '0';
  ccScreenImage.style.transform = 'translateY(3px)';
  setTimeout(() => {
    ccScreenImage.src = data.image;
    ccScreenImage.alt = `CrewClerks ${data.title} screen`;
    ccScreenNumber.textContent = data.number;
    ccScreenTitle.textContent = data.title;
    ccScreenPurpose.textContent = data.purpose;
    ccScreenValue.textContent = data.value;
    ccScreenImage.style.opacity = '1';
    ccScreenImage.style.transform = 'translateY(0)';
  }, 120);
}

ccScreenTabs.forEach(button => {
  button.addEventListener('click', () => showCcScreen(button.dataset.screen));
});

if (ccNextScreen) {
  ccNextScreen.addEventListener('click', () => {
    const idx = ccKeys.indexOf(ccCurrentScreen);
    showCcScreen(ccKeys[(idx + 1) % ccKeys.length]);
  });
}

// Screenshot lightbox
const ccLightbox = document.querySelector('#cc-lightbox');
const ccLightboxImage = document.querySelector('#cc-lightbox-image');
const ccLightboxTitle = document.querySelector('#cc-lightbox-title');
const ccExpandImage = document.querySelector('.cc-expand-image');
const ccLightboxClose = document.querySelector('.cc-lightbox-close');

function openCcLightbox() {
  if (!ccLightbox || !ccScreenImage) return;
  const data = ccScreens[ccCurrentScreen];
  ccLightboxImage.src = data.image;
  ccLightboxImage.alt = `CrewClerks ${data.title} screenshot`;
  ccLightboxTitle.textContent = data.title;
  ccLightbox.classList.add('open');
  ccLightbox.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}
function closeCcLightbox() {
  if (!ccLightbox) return;
  ccLightbox.classList.remove('open');
  ccLightbox.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}

if (ccExpandImage) ccExpandImage.addEventListener('click', openCcLightbox);
if (ccLightboxClose) ccLightboxClose.addEventListener('click', closeCcLightbox);
if (ccLightbox) {
  ccLightbox.addEventListener('click', e => {
    if (e.target === ccLightbox) closeCcLightbox();
  });
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && ccLightbox && ccLightbox.classList.contains('open')) closeCcLightbox();
});

// ===== V18 AI Opportunity Engine interactions =====
const oeData={
 evidence:{l:'01 / GATHER EVIDENCE',t:'Collect the inputs before asking the system to judge them.',p:'Supplier, product, economics, logistics, demand, risk, and growth evidence are gathered as distinct inputs instead of being blended into one free-form AI answer.',x:['Supplier evidence','Economics','Logistics','Demand','Risk','Growth']},
 gates:{l:'02 / HARD GATES',t:'Evaluate non-negotiable rejection rules first.',p:'Hard-gate rejection always overrides later scoring. Fatal problems stay visible instead of being averaged away.',x:['Non-negotiable rules','Fail closed','Reject override','Explicit logic']},
 opportunity:{l:'03 / OPPORTUNITY SCORE',t:'Score commercial attractiveness independently.',p:'The Opportunity Score drives LIST, TEST, WATCH, or REJECT after hard gates pass.',x:['80–100 LIST','65–79.99 TEST','50–64.99 WATCH','< 50 REJECT']},
 confidence:{l:'04 / CONFIDENCE SCORE',t:'Measure the strength of the evidence behind the conclusion.',p:'Confidence stays separate so a promising opportunity can still be flagged as weakly supported.',x:['80+ HIGH','60–79.99 MODERATE','40–59.99 LOW','< 40 VERY LOW']},
 persist:{l:'05 / PERSIST THE EVALUATION',t:'Keep one Score record for one complete evaluation run.',p:'The same Score row is updated with economics, logistics, demand, risk, growth, opportunity, confidence, and final decision.',x:['One evaluation run','One Score row','Incremental update','Repeatable state']},
 decision:{l:'06 / FINAL DECISION',t:'Return the decision, confidence, evidence, and gate result together.',p:'The final output remains inspectable instead of collapsing everything into one opaque answer.',x:['Decision','Confidence','Supporting scores','Gate result']}
};
const oeStages=document.querySelectorAll('.oe-stage'),oeDetail=document.querySelector('#oe-stage-detail');
if(oeStages.length&&oeDetail)oeStages.forEach(b=>b.addEventListener('click',()=>{const d=oeData[b.dataset.oeStage];oeStages.forEach(x=>{x.classList.remove('active');x.setAttribute('aria-selected','false')});b.classList.add('active');b.setAttribute('aria-selected','true');oeDetail.style.opacity='0';setTimeout(()=>{oeDetail.innerHTML=`<div><span class="oe-detail-label">${d.l}</span><h3>${d.t}</h3><p>${d.p}</p></div><div class="oe-detail-stack">${d.x.map(v=>`<span>${v}</span>`).join('')}</div>`;oeDetail.style.opacity='1'},100)}));
const gateBtns=document.querySelectorAll('.oe-gate-toggle'),gateResult=document.querySelector('#oe-gate-result');
if(gateBtns.length&&gateResult)gateBtns.forEach(b=>b.addEventListener('click',()=>{gateBtns.forEach(x=>x.classList.remove('active'));b.classList.add('active');const fail=b.dataset.gate==='fail';gateResult.classList.toggle('fail',fail);gateResult.innerHTML=fail?'<small>RESULT</small><strong>REJECT</strong><span>Hard-gate rejection overrides later scoring.</span>':'<small>RESULT</small><strong>Continue to scoring</strong><span>Opportunity and confidence evaluation remain available.</span>'}));
document.querySelectorAll('.oe-score-bands button,.oe-confidence-bands button').forEach(b=>b.addEventListener('click',()=>{b.parentElement.querySelectorAll('button').forEach(x=>x.classList.remove('active'));b.classList.add('active')}));


// ======================================================
// V19 FANDUEL ATI ENGINE PRODUCT WALKTHROUGH
// ======================================================
const fdScreens={build:{image:'assets/fanduel-build-lineups.png',number:'01 / 05',title:'Build Lineups',description:'Creates contest-aware lineups for currently supported MLB and NFL slates, with NBA and NHL being added to the same multi-sport workflow.',detail:'Slate files, reserved contests, optional projection override, build mode, slate status and adaptive Monte Carlo settings are brought together in the primary operating screen.'},update:{image:'assets/fanduel-update-data.png',number:'02 / 05',title:'Update Data',description:'Refreshes intelligence, projections and calibration inputs for the selected slate.',detail:'The intelligence lab supports selected-slate refreshes, ensemble creation, output inspection and MLB post-slate calibration while keeping external projection files optional.'},late:{image:'assets/fanduel-late-swap.png',number:'03 / 05',title:'Late Swap',description:'Supports live-slate repair and adjustment when status changes happen after lock.',detail:'The live-slate workflow can restore a portfolio, refresh lock state, scan for affected entries, repair lineups and watch official MLB lineups for changes.'},results:{image:'assets/fanduel-results-history.png',number:'04 / 05',title:'Results / History',description:'Learns from prior slates and tracks outcomes to improve future decision-making.',detail:'The morning workflow imports FanDuel history, finds archived FINAL snapshots, evaluates process versus outcome and carries bounded player-season lessons into future slates.'},advanced:{image:'assets/fanduel-advanced.png',number:'05 / 05',title:'Advanced',description:'Houses testing, development and controlled non-standard settings outside the normal user workflow.',detail:'Risk settings, payout inputs, baseline and overlay modes and developer testing are intentionally separated from the live-money Build Lineups workflow.'}};
const fdTabs=document.querySelectorAll('.fd-screen-tab,.fd-screen-thumbs button');const fdImage=document.querySelector('#fd-screen-image');const fdNumber=document.querySelector('#fd-screen-number');const fdTitle=document.querySelector('#fd-screen-title');const fdDescription=document.querySelector('#fd-screen-description');const fdDetail=document.querySelector('#fd-screen-detail');const fdNext=document.querySelector('.fd-next-screen');const fdKeys=Object.keys(fdScreens);let fdCurrent='build';function showFdScreen(key){const d=fdScreens[key];if(!d||!fdImage)return;fdCurrent=key;document.querySelectorAll('[data-fd-screen]').forEach(el=>{const a=el.dataset.fdScreen===key;el.classList.toggle('active',a);if(el.classList.contains('fd-screen-tab'))el.setAttribute('aria-selected',a?'true':'false')});fdImage.style.opacity='0';fdImage.style.transform='translateY(3px)';setTimeout(()=>{fdImage.src=d.image;fdImage.alt=`FanDuel ATI Engine ${d.title} screen`;fdNumber.textContent=d.number;fdTitle.textContent=d.title;fdDescription.textContent=d.description;fdDetail.textContent=d.detail;fdImage.style.opacity='1';fdImage.style.transform='translateY(0)'},110)}fdTabs.forEach(b=>b.addEventListener('click',()=>showFdScreen(b.dataset.fdScreen)));if(fdNext)fdNext.addEventListener('click',()=>{const i=fdKeys.indexOf(fdCurrent);showFdScreen(fdKeys[(i+1)%fdKeys.length])});const fdLightbox=document.querySelector('#fd-lightbox');const fdLightboxImage=document.querySelector('#fd-lightbox-image');const fdLightboxTitle=document.querySelector('#fd-lightbox-title');const fdExpand=document.querySelector('.fd-expand-screen');const fdClose=document.querySelector('.fd-lightbox-close');function openFdLightbox(){if(!fdLightbox||!fdImage)return;const d=fdScreens[fdCurrent];fdLightboxImage.src=d.image;fdLightboxImage.alt=`FanDuel ATI Engine ${d.title} screenshot`;fdLightboxTitle.textContent=d.title;fdLightbox.classList.add('open');fdLightbox.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}function closeFdLightbox(){if(!fdLightbox)return;fdLightbox.classList.remove('open');fdLightbox.setAttribute('aria-hidden','true');document.body.style.overflow=''}if(fdExpand)fdExpand.addEventListener('click',openFdLightbox);if(fdClose)fdClose.addEventListener('click',closeFdLightbox);if(fdLightbox)fdLightbox.addEventListener('click',e=>{if(e.target===fdLightbox)closeFdLightbox()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&fdLightbox&&fdLightbox.classList.contains('open'))closeFdLightbox()});


// ======================================================
// V20 AI LAB INTERACTIONS
// ======================================================
const labConsoleData={
focus:[['lab --focus','Practical AI applied to real workflows'],['method --current','Understand → structure → prototype → evaluate → improve'],['control','Human review stays in the loop']],
stack:[['models','ChatGPT · Claude · Gemini · Copilot · Perplexity'],['build','n8n · Python · Visual Studio · VS Code · Docker Desktop · pgAdmin 4'],['systems','Microsoft 365 · Windows 11 · website development · workflow design']],
projects:[['active --products','CrewClerks · FanDuel ATI Engine'],['active --systems','AI Opportunity Engine'],['active --portfolio','Pflugel.com'],['status','Build → test → learn → revise']],
principles:[['rule 01','Workflow before model'],['rule 02','Evidence before confidence'],['rule 03','Human control stays visible'],['rule 04','Useful beats impressive sounding']]
};
const labConsole=document.querySelector('#ailab-console-body'),labConsoleButtons=document.querySelectorAll('[data-lab-console]');
if(labConsole&&labConsoleButtons.length)labConsoleButtons.forEach(btn=>btn.addEventListener('click',()=>{const d=labConsoleData[btn.dataset.labConsole];labConsoleButtons.forEach(b=>b.classList.remove('active'));btn.classList.add('active');labConsole.style.opacity='0';setTimeout(()=>{labConsole.innerHTML=d.map(r=>`<p><span>$</span> ${r[0]}</p><strong>${r[1]}</strong>`).join('')+'<div class="ailab-cursor"></div>';labConsole.style.opacity='1'},100)}));

const labToolData={
chatgpt:{name:'ChatGPT',purpose:'Used as a hands-on partner for workflow design, product prototyping, structured analysis, requirements development, and iterative testing.',where:'CrewClerks · AI Opportunity Engine · FanDuel ATI Engine · Pflugel.com',how:'Frame → structure → build → review → revise'},
claude:{name:'Claude',purpose:'Used for long-form review, comparison, alternate reasoning paths, and examining complex requirements from another model perspective.',where:'Requirements review · long-form analysis · cross-checking',how:'Compare → challenge → refine'},
gemini:{name:'Gemini',purpose:'Used as another model perspective for research, comparison, ideation, and checking how different systems interpret the same task.',where:'Research · comparison · visual and web experimentation',how:'Ask → compare → verify'},
copilot:{name:'Copilot',purpose:'Used in Microsoft-oriented workflows and as an additional coding or productivity assistant when working inside familiar enterprise tooling.',where:'Microsoft workflows · productivity · coding support',how:'Assist inside the existing toolchain'},
perplexity:{name:'Perplexity',purpose:'Used for source-oriented discovery and research exploration when a fast view of available public information is useful.',where:'Research discovery · source finding',how:'Discover → inspect → verify'},
n8n:{name:'n8n',purpose:'Used to think through and build multi-step automation where research, logic, AI calls, persistence, and outputs need to be orchestrated as separate stages.',where:'AI Opportunity Engine · workflow automation experiments',how:'Trigger → route → evaluate → persist → output'},
python:{name:'Python',purpose:'Used for data processing, decision logic, prototyping, simulation, and the FanDuel ATI Engine desktop application.',where:'FanDuel ATI Engine · data processing · automation',how:'Model the logic → execute → inspect'},
visualstudio:{name:'Visual Studio',purpose:'Used as an application development workspace when building and testing software components in a desktop development environment.',where:'Application development · testing',how:'Build → run → debug'},
vscode:{name:'VS Code',purpose:'Used for fast code editing, configuration work, scripts, website files, and iterative development.',where:'Web work · scripts · configuration · automation',how:'Edit → test → revise'},
docker:{name:'Docker Desktop',purpose:'Used for local services and isolated development environments when a project needs repeatable infrastructure without contaminating the host setup.',where:'Local development infrastructure',how:'Isolate → run → reset'},
pgadmin:{name:'pgAdmin 4',purpose:'Used to inspect and administer PostgreSQL data structures during database-backed workflow experiments.',where:'Database-backed development · structured persistence',how:'Inspect → query → validate'},
webdev:{name:'Website Development',purpose:'Used to turn product, career, and project information into responsive, interactive experiences that work on desktop and mobile.',where:'Pflugel.com · SunBridge · product presentation',how:'Structure → design → build → test'},
m365:{name:'Microsoft 365',purpose:'Used across documentation, communication, business workflows, file handling, and enterprise productivity.',where:'Business operations · documentation · collaboration',how:'Document → communicate → coordinate'},
windows:{name:'Windows 11',purpose:'A strong hands-on support and troubleshooting area, including configuration, application support, device setup, and practical end-user problem solving.',where:'Technical support · computer repair · end-user systems',how:'Diagnose → isolate → fix → explain'},
prompting:{name:'Prompt / System Design',purpose:'Used to define instructions, constraints, output structure, decision logic, and review points so AI behavior is more consistent and inspectable.',where:'CrewClerks · Opportunity Engine · structured workflows',how:'Define role → constrain → structure → review'},
agentic:{name:'Agentic Concepts',purpose:'Explored for workflows where a system needs to make multiple tool-assisted steps while remaining bounded by explicit rules and human review.',where:'Automation concepts · workflow orchestration',how:'Plan → act → inspect → approve'}
};

const toolFilters=document.querySelectorAll('[data-tool-filter]'),labTools=document.querySelectorAll('.ailab-tool'),toolDetail=document.querySelector('#ailab-tool-detail');
if(toolFilters.length&&labTools.length)toolFilters.forEach(btn=>btn.addEventListener('click',()=>{const f=btn.dataset.toolFilter;toolFilters.forEach(b=>b.classList.remove('active'));btn.classList.add('active');labTools.forEach(t=>t.classList.toggle('filtered-out',f!=='all'&&t.dataset.category!==f));const visible=[...labTools].filter(t=>!t.classList.contains('filtered-out'));if(visible.length&&!visible.some(t=>t.classList.contains('active')))visible[0].click()}));
if(labTools.length&&toolDetail)labTools.forEach(tool=>tool.addEventListener('click',()=>{const d=labToolData[tool.dataset.tool];if(!d)return;labTools.forEach(t=>t.classList.remove('active'));tool.classList.add('active');toolDetail.style.opacity='0';toolDetail.style.transform='translateY(4px)';setTimeout(()=>{toolDetail.innerHTML=`<span>SELECTED TOOL</span><h3>${d.name}</h3><p class="tool-purpose">${d.purpose}</p><div class="tool-use-block"><small>WHERE IT SHOWS UP</small><strong>${d.where}</strong></div><div class="tool-use-block"><small>HOW I USE IT</small><strong>${d.how}</strong></div>`;toolDetail.style.opacity='1';toolDetail.style.transform='translateY(0)'},100)}));

const labMethodData={
frame:{label:'01 / FRAME',title:'Start with the real-world friction.',text:'Define the user, the work, the decision, the constraint, and the outcome before deciding whether AI is even useful.',checks:['Who is doing the work?','What currently slows them down?','What must remain under human control?']},
structure:{label:'02 / STRUCTURE',title:'Separate the workflow into understandable parts.',text:'Identify inputs, evidence, business rules, actions, state, exceptions, and approval points so the system is easier to inspect and automate.',checks:['What data enters the system?','What rules are non-negotiable?','Where should state be persisted?']},
build:{label:'03 / BUILD',title:'Create the smallest useful testable version.',text:'Use AI-assisted development, Python, n8n, web tools, or other appropriate technologies to move from an idea into something that can actually be used.',checks:['Can someone interact with it?','Can the logic be seen?','Can the output be checked?']},
evaluate:{label:'04 / EVALUATE',title:'Treat failure as evidence.',text:'Look at what the system missed, where users become confused, what data was weak, and whether the output actually improved the workflow.',checks:['What failed?','Was the process or the input wrong?','What assumption needs to change?']},
iterate:{label:'05 / ITERATE',title:'Turn what happened into the next requirement.',text:'Refine the interface, rules, model usage, data flow, controls, or architecture based on the evidence produced by the test.',checks:['What should be simplified?','What needs a stronger guardrail?','What becomes the next build?']}
};
const labMethodButtons=document.querySelectorAll('[data-lab-stage]'),labMethodDetail=document.querySelector('#ailab-method-detail');
if(labMethodButtons.length&&labMethodDetail)labMethodButtons.forEach(btn=>btn.addEventListener('click',()=>{const d=labMethodData[btn.dataset.labStage];labMethodButtons.forEach(b=>{b.classList.remove('active');b.setAttribute('aria-selected','false')});btn.classList.add('active');btn.setAttribute('aria-selected','true');labMethodDetail.style.opacity='0';labMethodDetail.style.transform='translateY(4px)';setTimeout(()=>{labMethodDetail.innerHTML=`<div><span>${d.label}</span><h3>${d.title}</h3><p>${d.text}</p></div><div class="ailab-method-checks"><strong>Questions I ask</strong>${d.checks.map(x=>`<span>${x}</span>`).join('')}</div>`;labMethodDetail.style.opacity='1';labMethodDetail.style.transform='translateY(0)'},100)}));


// ======================================================
// V21 WRITINGS FILTER
// ======================================================
const writingFilters=document.querySelectorAll('[data-writing-filter]');
const writingCards=document.querySelectorAll('[data-writing-category]');
if(writingFilters.length&&writingCards.length){
  writingFilters.forEach(btn=>btn.addEventListener('click',()=>{
    const filter=btn.dataset.writingFilter;
    writingFilters.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    writingCards.forEach(card=>{
      card.classList.toggle('filtered-out',filter!=='all'&&card.dataset.writingCategory!==filter);
    });
  }));
}


// ======================================================
// V22 SUNBRIDGE SERVICE SELECTOR
// ======================================================
const sbServiceData={
support:{
label:'01 / COMPUTER & DEVICE SUPPORT',
title:'Fix the problem, then explain what happened.',
text:'Hands-on help with Windows PCs, device setup, software troubleshooting, peripherals, home and small-business technology, and practical technical issues.',
items:['Computer repair','Windows 11 support','Device setup','Software troubleshooting','Peripheral support','Home / small-business technology']
},
coaching:{
label:'02 / DIGITAL TECHNOLOGY COACHING',
title:'Help people become more comfortable with the technology they already own.',
text:'Patient, practical guidance for customers who need help using devices, software, online services, accounts, or common digital workflows.',
items:['Device coaching','Microsoft Office help','Online accounts','Digital organization','Social media cleanup','Digital footprint cleanup']
},
ai:{
label:'03 / AI ASSISTANCE & GUIDANCE',
title:'Start with a real task, not an AI lecture.',
text:'Practical help using generative AI for everyday work such as drafting, research, organization, communication, brainstorming, and learning new workflows.',
items:['ChatGPT','Claude','Gemini','Copilot','Perplexity','Prompt guidance']
},
forensics:{
label:'04 / DIGITAL FORENSICS COLLECTION',
title:'Collection-focused support with a clearly defined boundary.',
text:'Digital forensics services are limited to acquisition and collection support. SunBridge is not positioned as providing forensic analysis, expert testimony, legal conclusions, or investigative findings.',
items:['Data acquisition','Collection support','Documentation','Chain-of-custody awareness','No expert testimony','No forensic analysis']
}
};

const sbServiceButtons=document.querySelectorAll('[data-sb-service]');
const sbServiceDetail=document.querySelector('#sb-service-detail');
if(sbServiceButtons.length&&sbServiceDetail){
  sbServiceButtons.forEach(btn=>btn.addEventListener('click',()=>{
    const d=sbServiceData[btn.dataset.sbService];
    sbServiceButtons.forEach(b=>{b.classList.remove('active');b.setAttribute('aria-selected','false')});
    btn.classList.add('active');btn.setAttribute('aria-selected','true');
    sbServiceDetail.style.opacity='0';sbServiceDetail.style.transform='translateY(4px)';
    setTimeout(()=>{
      sbServiceDetail.innerHTML=`<div><span>${d.label}</span><h3>${d.title}</h3><p>${d.text}</p></div><div class="sb-service-capabilities"><strong>Examples</strong>${d.items.map(x=>`<span>${x}</span>`).join('')}</div>`;
      sbServiceDetail.style.opacity='1';sbServiceDetail.style.transform='translateY(0)';
    },100);
  }));
}


// ======================================================
// V23 SUNBRIDGE SERVICE OFFERING
// ======================================================
const sb23ServiceData={
  support:{
    label:'01 / COMPUTER & DIGITAL SUPPORT',
    title:'Help with the technology people use every day.',
    text:'Hands-on support for computers, laptops, smartphones, tablets, printers, software, accounts, security basics, setup, troubleshooting, and remote support.',
    items:['Computers & laptops','Smartphones & tablets','Printers & scanners','Windows 11','Microsoft 365','Remote technical support']
  },
  web:{
    label:'02 / WEBSITE & DOMAIN SERVICES',
    title:'Help establish or clean up a practical web presence.',
    text:'Support with simple websites, domains, basic online presence, account cleanup, digital organization, and customer-facing web content.',
    items:['Website development','Domain setup','Website updates','Online account cleanup','Digital footprint cleanup','Basic web presence']
  },
  ai:{
    label:'03 / AI GUIDANCE & COACHING',
    title:'Make modern AI useful for a real task.',
    text:'Practical coaching for ChatGPT, Claude, Gemini, Copilot, Perplexity, voice assistants, and AI-supported workflows, explained without unnecessary jargon.',
    items:['ChatGPT','Claude','Gemini','Copilot','Perplexity','Prompt and workflow guidance']
  },
  home:{
    label:'04 / SMART HOME & WI-FI',
    title:'Help connect the devices people depend on at home.',
    text:'Practical support for home Wi-Fi, connected devices, smart-home setup, peripheral connections, printers, and everyday network troubleshooting.',
    items:['Wi-Fi troubleshooting','Smart-home setup','Device connections','Printers','Streaming / peripherals','Home technology coaching']
  },
  software:{
    label:'05 / AI WORKFLOW & CUSTOM SOFTWARE',
    title:'Build lightweight software around the way the customer already works.',
    text:'AI-enabled workflow development for small businesses and individuals who need a focused tool rather than a large software platform. This can include lightweight custom applications, internal tools, workflow automation, structured AI assistants, forms, dashboards, and task-specific software designed around an existing process.',
    items:['AI workflow design','Lightweight custom apps','Internal tools','Workflow automation','AI-assisted forms','Task-specific software']
  },
  data:{
    label:'06 / DIGITAL DATA COLLECTION',
    title:'Collection-focused support with a clear boundary.',
    text:'Acquisition, collection, preservation, and documentation support for digital data. The service is not positioned as forensic analysis, expert testimony, or legal conclusions.',
    items:['Data acquisition','Collection support','Preservation','Documentation','Integrity awareness','Collection only']
  }
};

const sb23Buttons=document.querySelectorAll('[data-sb23-service]');
const sb23Detail=document.querySelector('#sb23-service-detail');

if(sb23Buttons.length&&sb23Detail){
  sb23Buttons.forEach(btn=>btn.addEventListener('click',()=>{
    const d=sb23ServiceData[btn.dataset.sb23Service];
    if(!d)return;
    sb23Buttons.forEach(b=>{b.classList.remove('active');b.setAttribute('aria-selected','false')});
    btn.classList.add('active');
    btn.setAttribute('aria-selected','true');
    sb23Detail.style.opacity='0';
    sb23Detail.style.transform='translateY(4px)';
    setTimeout(()=>{
      sb23Detail.innerHTML=`<div><span>${d.label}</span><h3>${d.title}</h3><p>${d.text}</p></div><div class="sb23-service-items"><strong>Examples</strong>${d.items.map(x=>`<span>${x}</span>`).join('')}</div>`;
      sb23Detail.style.opacity='1';
      sb23Detail.style.transform='translateY(0)';
    },100);
  }));
}


// ======================================================
// V26.2 ANALYTICS-READY EVENT LAYER
// No analytics vendor is installed yet.
// If a supported provider is added later, existing events begin flowing
// without changing the page markup.
// ======================================================
window.PflugelAnalytics = window.PflugelAnalytics || {
  track(eventName, properties = {}) {
    // Google Analytics / gtag, if installed later.
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, properties);
    }

    // Plausible, if installed later.
    if (typeof window.plausible === 'function') {
      window.plausible(eventName, { props: properties });
    }

    // Custom hook for any future analytics provider.
    window.dispatchEvent(new CustomEvent('pflugel:analytics', {
      detail: { eventName, properties }
    }));
  }
};

// Track explicitly labeled links and buttons.
document.addEventListener('click', event => {
  const target = event.target.closest('[data-track]');
  if (!target) return;

  window.PflugelAnalytics.track(target.dataset.track, {
    label: (target.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 120),
    href: target.getAttribute('href') || ''
  });
});

// Track contact form intent before the browser leaves the page.
document.querySelectorAll('[data-track-form]').forEach(form => {
  form.addEventListener('submit', () => {
    const topic = form.querySelector('[name="reason"]');
    window.PflugelAnalytics.track('contact_form_submit', {
      reason: topic ? topic.value : ''
    });
  });
});
