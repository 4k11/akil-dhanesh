// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navList = document.getElementById('nav-list');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Terminal "test run" sequence
const lines = [
  { text: '$ run-tests --suite=akil_dhanesh', cls: 'cmd', pause: 400 },
  { text: '', cls: '', pause: 100 },
  { text: "describe('Akil Dhanesh — SDET')", cls: 'muted', pause: 250 },
  { text: '  ✓ builds scalable automation frameworks', cls: 'ok', pause: 180 },
  { text: '  ✓ integrates tests into CI/CD pipelines', cls: 'ok', pause: 180 },
  { text: '  ✓ validates distributed systems via API & DB', cls: 'ok', pause: 180 },
  { text: '  ✓ ships across web, mobile & enterprise platforms', cls: 'ok', pause: 180 },
  { text: '  ✓ mentors junior engineers', cls: 'ok', pause: 260 },
  { text: '', cls: '', pause: 120 },
  { text: 'Test Suites: 1 passed, 1 total', cls: 'summary', pause: 90 },
  { text: 'Tests:       5 passed, 5 total', cls: 'summary', pause: 90 },
  { text: 'Time:        1.847s', cls: 'summary', pause: 0 },
];

const body = document.getElementById('terminal-body');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function renderStatic() {
  body.innerHTML = lines.map(l => l.cls
    ? `<span class="${l.cls}">${l.text}</span>`
    : l.text
  ).join('\n');
}

function typeLine(el, text, speed) {
  return new Promise(resolve => {
    let i = 0;
    const span = document.createElement('span');
    el.appendChild(span);
    const timer = setInterval(() => {
      span.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(timer);
        resolve(span);
      }
    }, speed);
  });
}

async function runSequence() {
  body.textContent = '';
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  body.appendChild(cursor);

  for (const line of lines) {
    cursor.remove();
    if (line.cls) {
      const span = document.createElement('span');
      span.className = line.cls;
      body.appendChild(span);
      await typeLine(span, line.text, 14);
    } else {
      body.appendChild(document.createTextNode(line.text));
    }
    body.appendChild(document.createTextNode('\n'));
    body.appendChild(cursor);
    await new Promise(r => setTimeout(r, line.pause));
  }
  cursor.remove();
}

if (body) {
  if (prefersReducedMotion) {
    renderStatic();
  } else {
    runSequence();
  }
}
