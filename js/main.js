/**
 * Aryan Singh Parmar - Portfolio Interactive Scripts
 * Handles AI Neural Canvas, 3D Card Tilt, Interactive Terminal,
 * Animated Counters, Scroll Progress, Project Filters, and Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypingEffect();
  initMobileMenu();
  initScrollSpy();
  initNeuralCanvas();
  initScrollReveal();
  init3DTilt();
  initAnimatedCounters();
  initScrollProgress();
});

/* -------------------------------------------------------------------------
   1. THEME TOGGLING (DARK / LIGHT)
   ------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const sunIcon = themeToggleBtn.querySelector('.sun-icon');
  const moonIcon = themeToggleBtn.querySelector('.moon-icon');
  const htmlEl = document.documentElement;

  const savedTheme = localStorage.getItem('asp-portfolio-theme') || 'dark';
  applyTheme(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const isDark = htmlEl.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('asp-portfolio-theme', newTheme);
  });

  function applyTheme(theme) {
    if (theme === 'light') {
      htmlEl.classList.remove('dark');
      htmlEl.classList.add('light');
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    } else {
      htmlEl.classList.remove('light');
      htmlEl.classList.add('dark');
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    }
  }
}

/* -------------------------------------------------------------------------
   2. DYNAMIC TYPING EFFECT
   ------------------------------------------------------------------------- */
function initTypingEffect() {
  const target = document.getElementById('typed-text');
  if (!target) return;

  const words = [
    "Computer Vision & AI Systems",
    "Scalable Backend Architectures",
    "Real-Time Browser Extensions",
    "Full-Stack Web Applications",
    "Smart Python Automation Tools"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 80;
  const deleteSpeed = 40;
  const pauseEnd = 1800;
  const pauseStart = 350;

  function type() {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      target.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, pauseEnd);
        return;
      }
      setTimeout(type, typingSpeed);
    } else {
      target.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, pauseStart);
        return;
      }
      setTimeout(type, deleteSpeed);
    }
  }

  type();
}

/* -------------------------------------------------------------------------
   3. MOBILE NAVIGATION MENU
   ------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

/* -------------------------------------------------------------------------
   4. SCROLLSPY (ACTIVE NAV LINK HIGHLIGHT)
   ------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* -------------------------------------------------------------------------
   5. INTERACTIVE AI NEURAL NETWORK CANVAS BACKGROUND
   ------------------------------------------------------------------------- */
function initNeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Mouse interaction coordinates
  const mouse = { x: null, y: null, radius: 140 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Generate particles based on screen density
  const particleCount = Math.min(Math.floor((width * height) / 16000), 70);
  const particles = [];

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.75;
      this.vy = (Math.random() - 0.5) * 0.75;
      this.radius = Math.random() * 2 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interactivity: gentle nudge
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }
    }

    draw(isDark) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? 'rgba(99, 102, 241, 0.7)' : 'rgba(79, 70, 229, 0.5)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    const isDark = document.documentElement.classList.contains('dark');

    // Connect particles within proximity
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 125) {
          const alpha = (1 - dist / 125) * 0.22;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = isDark
            ? `rgba(99, 102, 241, ${alpha})`
            : `rgba(79, 70, 229, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Connect particles to mouse
    if (mouse.x !== null && mouse.y !== null) {
      for (let i = 0; i < particles.length; i++) {
        const dx = mouse.x - particles[i].x;
        const dy = mouse.y - particles[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const alpha = (1 - dist / mouse.radius) * 0.4;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(particles[i].x, particles[i].y);
          ctx.strokeStyle = isDark
            ? `rgba(6, 182, 212, ${alpha})`
            : `rgba(2, 132, 199, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    particles.forEach((p) => {
      p.update();
      p.draw(isDark);
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* -------------------------------------------------------------------------
   6. SCROLL REVEAL OBSERVER
   ------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => observer.observe(el));
}

/* -------------------------------------------------------------------------
   7. INTERACTIVE 3D TILT EFFECT
   ------------------------------------------------------------------------- */
function init3DTilt() {
  // Only enable on desktop/laptops to preserve mobile performance
  if (window.innerWidth < 768) return;

  const tiltElements = document.querySelectorAll('.tilt-element');

  tiltElements.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
      const rotateY = ((x - centerX) / centerX) * 6;

      el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });
}

/* -------------------------------------------------------------------------
   8. ANIMATED NUMBER COUNTERS
   ------------------------------------------------------------------------- */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseFloat(counter.getAttribute('data-target'));
          const decimals = parseInt(counter.getAttribute('data-decimals') || '0', 10);
          const suffix = counter.getAttribute('data-suffix') || '';
          const duration = 1600; // ms
          const startTime = performance.now();

          function updateCounter(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = easeProgress * target;

            counter.textContent = current.toFixed(decimals) + suffix;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target.toFixed(decimals) + suffix;
            }
          }

          requestAnimationFrame(updateCounter);
          obs.unobserve(counter);
        }
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((c) => observer.observe(c));
}

/* -------------------------------------------------------------------------
   9. SCROLL PROGRESS & BACK TO TOP BUTTON
   ------------------------------------------------------------------------- */
function initScrollProgress() {
  const backToTopBtn = document.getElementById('back-to-top');
  const progressCircle = document.getElementById('progress-circle');
  if (!backToTopBtn || !progressCircle) return;

  const circumference = 2 * Math.PI * 21; // r=21 -> ~131.94
  progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = Math.min(scrollTop / scrollHeight, 1);

    const offset = circumference - progress * circumference;
    progressCircle.style.strokeDashoffset = offset;

    if (scrollTop > 350) {
      backToTopBtn.classList.remove('hidden');
    } else {
      backToTopBtn.classList.add('hidden');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* -------------------------------------------------------------------------
   10. INTERACTIVE TERMINAL COMMAND HANDLER
   ------------------------------------------------------------------------- */
function runTerminalCmd(cmd) {
  const history = document.getElementById('terminal-history');
  if (!history) return;

  if (cmd === 'clear') {
    history.innerHTML = '';
    return;
  }

  const cmdLine = document.createElement('div');
  cmdLine.innerHTML = `<span class="text-emerald-400">aryan@tit-bhopal</span>:<span class="text-cyan-400">~</span>$ <span class="text-title">${cmd}</span>`;

  const output = document.createElement('div');
  output.className = 'text-secondary pl-4 border-l-2 border-indigo-500/30 my-1 text-xs';

  switch (cmd) {
    case 'whoami':
      output.innerHTML = `
        <strong>Aryan Singh Parmar</strong> (B.Tech AIML @ TIT Bhopal, 2024–Present)<br>
        📧 <a href="mailto:aryansinghparmar05@gmail.com" class="text-indigo-400 hover:underline">aryansinghparmar05@gmail.com</a> | 📱 +91 90748-06913<br>
        📍 Bhopal, Madhya Pradesh, India
      `;
      break;

    case 'skills':
      output.innerHTML = `
        ⚡ <strong>Languages:</strong> Python, C++, JavaScript (ES6+), SQL, HTML5/CSS3<br>
        🧠 <strong>AI & Vision:</strong> OpenCV, MediaPipe, NumPy, Generative & Agentic AI<br>
        🌐 <strong>Backend:</strong> Node.js, Express.js, REST APIs, DOM Mutations<br>
        🛠️ <strong>Systems:</strong> Linux CLI, Shell Scripting, Git/GitHub, VS Code
      `;
      break;

    case 'projects':
      output.innerHTML = `
        1. 🎨 <strong>AI Virtual Painter</strong> (Python, OpenCV, MediaPipe, NumPy)<br>
        2. 🛡️ <strong>AI Censor Bot</strong> (Chrome Extension, DOM MutationObserver)<br>
        3. ⚙️ <strong>Backend & System Automation Suite</strong> (Node.js, Express, SQL)
      `;
      break;

    case 'contact':
      output.innerHTML = `
        ✉️ Email: <a href="mailto:aryansinghparmar05@gmail.com" class="text-cyan-400 hover:underline">aryansinghparmar05@gmail.com</a><br>
        💬 WhatsApp: <a href="https://wa.me/919074806913" target="_blank" class="text-emerald-400 hover:underline">+91 90748 06913</a><br>
        💼 Status: Open to Full-Stack & AIML Internships / Roles
      `;
      break;

    default:
      output.innerHTML = `<span class="text-rose-400">Command not found: '${cmd}'. Try whoami, skills, projects, contact, or clear.</span>`;
  }

  history.appendChild(cmdLine);
  history.appendChild(output);
  history.scrollTop = history.scrollHeight;
}

/* -------------------------------------------------------------------------
   11. PROJECT FILTERING
   ------------------------------------------------------------------------- */
function filterProjects(category, btnElement) {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  buttons.forEach((b) => b.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');

  cards.forEach((card) => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
      card.classList.remove('is-filtered-out');
      card.style.opacity = '0';
      card.style.transform = 'scale(0.96)';
      setTimeout(() => {
        card.style.transition = 'all 0.3s ease';
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      }, 50);
    } else {
      card.classList.add('is-filtered-out');
    }
  });
}

/* -------------------------------------------------------------------------
   12. COPY TO CLIPBOARD & TOAST NOTIFICATION
   ------------------------------------------------------------------------- */
function copyToClipboard(text, message = 'Copied to clipboard!') {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(message);
    }).catch(() => {
      fallbackCopy(text, message);
    });
  } else {
    fallbackCopy(text, message);
  }
}

function fallbackCopy(text, message) {
  const tempInput = document.createElement('textarea');
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  try {
    document.execCommand('copy');
    showToast(message);
  } catch (err) {
    alert(text);
  }
  document.body.removeChild(tempInput);
}

let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.remove('hidden');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.add('hidden');
  }, 2800);
}

/* -------------------------------------------------------------------------
   13. PROJECT ARCHITECTURE MODAL WITH LIVE INTERACTIVE DEMO CANVAS
   ------------------------------------------------------------------------- */
const projectData = {
  painter: {
    title: "AI Virtual Painter - System Architecture & Live Demo",
    body: `
      <div class="space-y-4">
        <p><strong>Core Objective:</strong> Develop an intuitive, lag-free human-computer interaction (HCI) system that transforms physical hand gestures in webcam view into high-precision digital brushstrokes without requiring a physical stylus or tablet.</p>
        
        <!-- Interactive Live Canvas Sandbox -->
        <div class="space-y-2">
          <div class="flex items-center justify-between text-xs font-mono text-indigo-400">
            <span>Interactive Virtual Canvas Simulator:</span>
            <button onclick="clearDemoCanvas()" class="text-rose-400 hover:text-rose-300 font-bold">Clear Canvas ✕</button>
          </div>
          <div class="demo-canvas-container">
            <canvas id="virtual-draw-canvas" width="600" height="240"></canvas>
          </div>
          <div class="flex items-center gap-2 text-xs text-muted">
            <span>Color:</span>
            <button onclick="setDrawColor('#6366f1')" class="w-5 h-5 rounded-full bg-indigo-500 border border-white/20"></button>
            <button onclick="setDrawColor('#06b6d4')" class="w-5 h-5 rounded-full bg-cyan-500 border border-white/20"></button>
            <button onclick="setDrawColor('#10b981')" class="w-5 h-5 rounded-full bg-emerald-500 border border-white/20"></button>
            <button onclick="setDrawColor('#f59e0b')" class="w-5 h-5 rounded-full bg-amber-500 border border-white/20"></button>
            <span class="ml-2 text-[11px]">(Click & drag inside box to draw in real time!)</span>
          </div>
        </div>

        <h4 class="font-bold text-title text-sm pt-2">Key Engineering Innovations:</h4>
        <ul class="list-disc pl-5 space-y-1.5 text-xs text-secondary">
          <li><strong>Hand Landmark Extraction:</strong> Employs Google MediaPipe Hands model to track 21 discrete coordinate points at high FPS.</li>
          <li><strong>Dual Mode State Machine:</strong> Dynamically differentiates between <em>Selection Mode</em> (index + middle finger raised) for picking colors/brushes and <em>Drawing Mode</em> (only index finger raised).</li>
          <li><strong>Bitwise Live Blending:</strong> Creates an isolated canvas layer in NumPy, inverted with bitwise NOT and masked onto the BGR video stream for seamless composite rendering.</li>
          <li><strong>Vector Acceleration:</strong> Uses NumPy array slicing and matrix operations to minimize frame processing latency on standard consumer CPUs without requiring a dedicated discrete GPU.</li>
        </ul>

        <div class="p-3 rounded-lg bg-secondary-bg border border-border font-mono text-xs text-indigo-400">
          Technologies: Python • OpenCV • MediaPipe • NumPy Vectorization • HCI
        </div>
      </div>
    `,
    github: "https://github.com/aryanparmar",
    hasCanvas: true
  },
  censor: {
    title: "AI Censor Bot - Real-Time Dynamic Filter",
    body: `
      <div class="space-y-3">
        <p><strong>Core Objective:</strong> Create a zero-latency, privacy-first Chrome Extension capable of censoring offensive text, slurs, and explicit dynamic DOM nodes on live web applications without transmitting user browsing telemetry to any external cloud API.</p>
        
        <h4 class="font-bold text-title text-sm pt-2">Key Engineering Innovations:</h4>
        <ul class="list-disc pl-5 space-y-1.5 text-xs text-secondary">
          <li><strong>MutationObserver Surveillance:</strong> Observes childList and characterData mutations across deeply nested DOM subtrees in single-page applications (SPAs) like Twitter/X, Reddit, and forums.</li>
          <li><strong>Optimized RegEx Trie:</strong> Compiles user and default wordlists into optimized regular expression trees to prevent UI thread freezing during high-throughput DOM modifications.</li>
          <li><strong>Chrome Storage API Integration:</strong> Persists user preferences, customizable sensitive word dictionaries, and toggle modes locally via <code>chrome.storage.local</code>.</li>
          <li><strong>Privacy-by-Design:</strong> 100% of text and node processing takes place entirely in-memory on the client's browser with zero network egress.</li>
        </ul>

        <div class="p-3 rounded-lg bg-secondary-bg border border-border font-mono text-xs text-cyan-400 mt-3">
          Technologies: JavaScript (ES6+) • Chrome Extensions API • MutationObserver • Regex • Client Security
        </div>
      </div>
    `,
    github: "https://github.com/aryanparmar",
    hasCanvas: false
  },
  backend: {
    title: "Backend & System Automation Suite",
    body: `
      <div class="space-y-3">
        <p><strong>Core Objective:</strong> Build a reusable repository of performant backend services, algorithmic calculations, error-handling mechanisms, and clean Object-Oriented design patterns for web platforms.</p>
        
        <h4 class="font-bold text-title text-sm pt-2">Key Engineering Innovations:</h4>
        <ul class="list-disc pl-5 space-y-1.5 text-xs text-secondary">
          <li><strong>Node.js & Express REST Endpoints:</strong> Designed modular routing with centralized error handling middleware and structured JSON response schemas.</li>
          <li><strong>Python OOP & Defensive Programming:</strong> Built automated calculation engines (speed computations, expense splitters, data classes) with explicit try/except safety boundaries.</li>
          <li><strong>Relational Data Modeling:</strong> Developed normalized SQL schemas with primary/foreign key integrity, optimized indexes, and parameterized queries.</li>
          <li><strong>Linux Automation:</strong> Engineered 15+ automated shell utility scripts for directory backups, file searching, and process monitoring.</li>
        </ul>

        <div class="p-3 rounded-lg bg-secondary-bg border border-border font-mono text-xs text-emerald-400 mt-3">
          Technologies: Node.js • Express • Python • SQL • Linux Bash • OOP
        </div>
      </div>
    `,
    github: "https://github.com/aryanparmar",
    hasCanvas: false
  }
};

let currentDrawColor = '#6366f1';
function setDrawColor(color) {
  currentDrawColor = color;
}

function clearDemoCanvas() {
  const canvas = document.getElementById('virtual-draw-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function initDrawingCanvas() {
  const canvas = document.getElementById('virtual-draw-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let drawing = false;

  function start(e) {
    drawing = true;
    draw(e);
  }

  function end() {
    drawing = false;
    ctx.beginPath();
  }

  function draw(e) {
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentDrawColor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  canvas.addEventListener('mousedown', start);
  canvas.addEventListener('mouseup', end);
  canvas.addEventListener('mousemove', draw);

  canvas.addEventListener('touchstart', start);
  canvas.addEventListener('touchend', end);
  canvas.addEventListener('touchmove', draw);
}

function openProjectModal(key) {
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const githubLink = document.getElementById('modal-github-link');

  const data = projectData[key];
  if (!data) return;

  modalTitle.textContent = data.title;
  modalBody.innerHTML = data.body;
  githubLink.href = data.github;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  if (data.hasCanvas) {
    setTimeout(initDrawingCanvas, 100);
  }
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

function closeProjectModalOnBackdrop(e) {
  if (e.target.id === 'project-modal') {
    closeProjectModal();
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
  }
});

/* -------------------------------------------------------------------------
   14. CONTACT FORM SUBMISSION
   ------------------------------------------------------------------------- */
function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  const encodedSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject} - from ${name}`);
  const encodedBody = encodeURIComponent(`Hello Aryan,\n\n${message}\n\n---\nSender: ${name}\nEmail: ${email}`);
  
  const mailtoUrl = `mailto:aryansinghparmar05@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
  window.location.href = mailtoUrl;

  showToast('Opening your email app to send message!');
  e.target.reset();
}
