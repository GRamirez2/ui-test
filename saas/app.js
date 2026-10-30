(function () {
  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    mobileMenu.hidden = isOpen;
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.hidden = true;
    });
  });

  // FAQ accordion
  document.querySelectorAll('.faq-trigger').forEach((trigger) => {
    const panel = document.getElementById(trigger.getAttribute('aria-controls'));

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!isOpen));
      panel.classList.toggle('is-open', !isOpen);
    });
  });

  // Hero dice demo
  const demoDie = document.getElementById('demoDie');
  const demoRollBtn = document.getElementById('demoRollBtn');
  const diceHint = document.getElementById('diceHint');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const PIP_LAYOUTS = {
    1: ['pip-center'],
    2: ['pip-tl', 'pip-br'],
    3: ['pip-tl', 'pip-center', 'pip-br'],
    4: ['pip-tl', 'pip-tr', 'pip-bl', 'pip-br'],
    5: ['pip-tl', 'pip-tr', 'pip-center', 'pip-bl', 'pip-br'],
    6: ['pip-tl', 'pip-tr', 'pip-ml', 'pip-mr', 'pip-bl', 'pip-br'],
  };
  const ALL_PIP_CLASSES = ['pip-center', 'pip-tl', 'pip-tr', 'pip-bl', 'pip-br', 'pip-ml', 'pip-mr'];

  let rolling = false;

  function renderFace(value) {
    demoDie.innerHTML = '';
    const activeClasses = new Set(PIP_LAYOUTS[value]);
    ALL_PIP_CLASSES.forEach((cls) => {
      if (!activeClasses.has(cls)) return;
      const pip = document.createElement('span');
      pip.className = `pip ${cls}`;
      pip.style.opacity = '1';
      demoDie.appendChild(pip);
    });
    demoDie.setAttribute('aria-label', `Demo die showing ${value}`);
  }

  demoRollBtn.addEventListener('click', () => {
    if (rolling) return;
    rolling = true;

    const result = Math.floor(Math.random() * 6) + 1;

    if (prefersReducedMotion) {
      renderFace(result);
      diceHint.textContent = `Rolled a ${result}`;
      rolling = false;
      return;
    }

    demoDie.classList.add('is-rolling');
    diceHint.textContent = 'Rolling...';

    window.setTimeout(() => {
      demoDie.classList.remove('is-rolling');
      renderFace(result);
      diceHint.textContent = `Rolled a ${result}`;
      rolling = false;
    }, 500);
  });

  renderFace(1);
})();
