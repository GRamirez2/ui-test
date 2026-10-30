(function () {
  const STORAGE_KEY = 'workDays';

  const grid = document.getElementById('calendarGrid');
  const monthLabel = document.getElementById('monthLabel');
  const summaryCount = document.getElementById('summaryCount');
  const prevBtn = document.getElementById('prevMonth');
  const nextBtn = document.getElementById('nextMonth');

  const monthFormatter = new Intl.DateTimeFormat(undefined, { month: 'long', year: 'numeric' });

  let viewDate = startOfMonth(new Date());

  function loadWorkDays() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch {
      return new Set();
    }
  }

  function saveWorkDays(set) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
    } catch {
      // storage unavailable; state stays in memory for this session
    }
  }

  let workDays = loadWorkDays();

  function startOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  function dateKey(year, month, day) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  function isToday(year, month, day) {
    const today = new Date();
    return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
  }

  function render() {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    monthLabel.textContent = monthFormatter.format(viewDate);

    const firstWeekday = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    grid.innerHTML = '';

    for (let i = 0; i < firstWeekday; i++) {
      const filler = document.createElement('div');
      filler.className = 'day-cell';
      grid.appendChild(filler);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const key = dateKey(year, month, day);
      const pressed = workDays.has(key);

      const cell = document.createElement('div');
      cell.className = 'day-cell';

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'day-btn';
      if (isToday(year, month, day)) btn.classList.add('is-today');
      btn.setAttribute('aria-pressed', String(pressed));
      btn.setAttribute('aria-label', `${monthFormatter.format(viewDate)} ${day}, ${pressed ? 'marked as worked' : 'not worked'}`);
      btn.dataset.key = key;

      const checkIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      checkIcon.setAttribute('class', 'check-icon');
      checkIcon.setAttribute('viewBox', '0 0 24 24');
      checkIcon.setAttribute('fill', 'none');
      checkIcon.setAttribute('stroke', 'currentColor');
      checkIcon.setAttribute('stroke-width', '3');
      checkIcon.setAttribute('stroke-linecap', 'round');
      checkIcon.setAttribute('stroke-linejoin', 'round');
      checkIcon.setAttribute('aria-hidden', 'true');
      checkIcon.setAttribute('focusable', 'false');
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M5 13l4 4L19 7');
      checkIcon.appendChild(path);

      const dayNum = document.createElement('span');
      dayNum.textContent = String(day);

      btn.appendChild(dayNum);
      btn.appendChild(checkIcon);
      btn.addEventListener('click', () => toggleDay(key, btn, day));

      cell.appendChild(btn);
      grid.appendChild(cell);
    }

    updateSummary(year, month);
  }

  function toggleDay(key, btn, day) {
    const nowPressed = !workDays.has(key);
    if (nowPressed) {
      workDays.add(key);
    } else {
      workDays.delete(key);
    }
    saveWorkDays(workDays);

    btn.setAttribute('aria-pressed', String(nowPressed));
    btn.setAttribute('aria-label', `${monthFormatter.format(viewDate)} ${day}, ${nowPressed ? 'marked as worked' : 'not worked'}`);

    updateSummary(viewDate.getFullYear(), viewDate.getMonth());
  }

  function updateSummary(year, month) {
    const prefix = `${year}-${String(month + 1).padStart(2, '0')}-`;
    let count = 0;
    workDays.forEach((key) => {
      if (key.startsWith(prefix)) count++;
    });
    summaryCount.textContent = String(count);
  }

  prevBtn.addEventListener('click', () => {
    viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
    render();
  });

  nextBtn.addEventListener('click', () => {
    viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
    render();
  });

  render();
})();
