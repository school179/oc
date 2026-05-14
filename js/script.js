// ===== NAVIGATION =====
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  if (toggle && navList) {
    toggle.addEventListener('click', () => {
      navList.classList.toggle('open');
      toggle.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !navList.contains(e.target)) {
        navList.classList.remove('open');
        toggle.classList.remove('open');
      }
    });
  }

  // Mark active nav link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// ===== ACCORDION (FAQ) =====
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.closest('.accordion-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.accordion-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ===== FILTER BUTTONS =====
document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
  btn.addEventListener('click', () => {
    const group = btn.closest('.filter-bar, .faq-categories');
    group.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    const target = btn.dataset.target;
    const items = document.querySelectorAll(target || '[data-category]');
    items.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ===== NEWS FILTER =====
document.querySelectorAll('.filter-btn[data-news]').forEach(btn => {
  btn.addEventListener('click', () => {
    const group = btn.closest('.filter-bar');
    group.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.news;
    document.querySelectorAll('[data-news-category]').forEach(item => {
      if (filter === 'all' || item.dataset.newsCategory === filter) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ===== SUBJECT PAGE =====
function initSubjectPage() {
  if (!document.querySelector('.subject-page')) return;

  const params = new URLSearchParams(window.location.search);
  const subjectId = params.get('subject');
  const subject = SUBJECTS[subjectId];

  if (!subject) {
    document.querySelector('.subject-page').innerHTML = '<div class="container section"><h2>Предмет не найден</h2><a href="olympiads.html" class="btn btn-primary mt-24">← К олимпиадам</a></div>';
    return;
  }

  document.title = subject.name + ' — Олимпиадный центр';

  // Fill hero
  document.getElementById('subject-emoji').textContent = subject.emoji;
  document.getElementById('subject-name').textContent = subject.name;
  document.getElementById('subject-name-bc').textContent = subject.name;
  document.getElementById('subject-desc').textContent = subject.description;

  // Fill olympiads
  renderOlympiads(subject.olympiads, 'all');

  // Fill materials
  const matGrid = document.getElementById('materials-grid');
  if (matGrid) {
    matGrid.innerHTML = subject.materials.map(m => `
      <div class="material-card">
        <div class="material-icon">${m.icon}</div>
        <div class="material-title">${m.title}</div>
        <div class="material-desc">${m.desc}</div>
        <div class="material-download">
          <a href="${m.file}" class="btn btn-outline btn-sm">Скачать / Открыть</a>
        </div>
      </div>
    `).join('');
  }

  // Fill tips
  const tipsGrid = document.getElementById('tips-grid');
  if (tipsGrid) {
    tipsGrid.innerHTML = subject.tips.map((t, i) => `
      <div class="tip-card">
        <div class="tip-number">${i + 1}</div>
        <div class="tip-title">${t.title}</div>
        <div class="tip-text">${t.text}</div>
      </div>
    `).join('');
  }

  // Level filter
  document.querySelectorAll('.level-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.level-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderOlympiads(subject.olympiads, btn.dataset.level);
    });
  });

  // Tabs
  document.querySelectorAll('.subject-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.subject-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.subject-tab-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.tab);
      if (target) target.classList.add('active');
    });
  });
}

function renderOlympiads(olympiads, filter) {
  const list = document.getElementById('olympiad-list');
  if (!list) return;

  let filtered;
  if (filter === 'all') {
    filtered = olympiads;
  } else if (filter === 'vsosh') {
    filtered = olympiads.filter(o => o.type === 'vsosh');
  } else if (filter === 'perechen') {
    filtered = olympiads.filter(o => o.type === 'perechen');
  } else {
    filtered = olympiads;
  }

  if (filtered.length === 0) {
    list.innerHTML = '<p class="text-muted" style="padding:24px 0;">Олимпиады по выбранному критерию не найдены.</p>';
    return;
  }

  list.innerHTML = filtered.map(o => {
    let badgeClass, levelLabel;
    if (o.type === 'perechen') {
      const plvl = { 1: 'badge-p1', 2: 'badge-p2', 3: 'badge-p3' };
      const plbl = { 1: 'I уровень', 2: 'II уровень', 3: 'III уровень' };
      badgeClass = plvl[o.plevel] || 'badge-gray';
      levelLabel  = plbl[o.plevel] || 'Перечневая';
    } else {
      const vsoshClass = {
        school: 'badge-school', municipal: 'badge-municipal',
        regional: 'badge-regional', final: 'badge-vsosh-final'
      };
      const vsoshLabel = {
        school: 'Школьный', municipal: 'Муниципальный',
        regional: 'Региональный', final: 'Заключительный'
      };
      badgeClass = vsoshClass[o.level] || 'badge-gray';
      levelLabel  = vsoshLabel[o.level] || o.level;
    }
    return `
      <div class="olympiad-item">
        <div class="olympiad-info">
          <div class="olympiad-name">${o.name}</div>
          <div class="olympiad-dates">
            <span>📅 ${formatDate(o.start)} — ${formatDate(o.end)}</span>
          </div>
        </div>
        <div class="olympiad-actions">
          <span class="badge ${badgeClass}">${levelLabel}</span>
          <a href="${o.reg}" class="btn btn-outline btn-sm">Подробнее</a>
        </div>
      </div>
    `;
  }).join('');
}

function formatDate(str) {
  const d = new Date(str);
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}

// ===== FAQ SEARCH =====
function initFaqSearch() {
  const input = document.getElementById('faq-search');
  if (!input) return;
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase();
    document.querySelectorAll('.accordion-item').forEach(item => {
      const text = item.querySelector('.accordion-question').textContent.toLowerCase();
      const body = item.querySelector('.accordion-body').textContent.toLowerCase();
      item.style.display = (text.includes(q) || body.includes(q)) ? '' : 'none';
    });
  });
}

// ===== NEWS SEARCH =====
function initNewsSearch() {
  const input = document.getElementById('news-search');
  if (!input) return;
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase();
    document.querySelectorAll('[data-news-category]').forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(q) ? '' : 'none';
    });
  });
}

// ===== SUBJECT SEARCH (olympiads page) =====
function initSubjectSearch() {
  const input = document.getElementById('subject-search');
  if (!input) return;
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase();
    document.querySelectorAll('.subject-card').forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(q) ? '' : 'none';
    });
    document.querySelectorAll('.subjects-category').forEach(cat => {
      const visible = [...cat.querySelectorAll('.subject-card')].some(c => c.style.display !== 'none');
      cat.style.display = visible ? '' : 'none';
    });
  });
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
  document.querySelectorAll('.stat-number[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + suffix;
      if (current >= target) clearInterval(timer);
    }, 16);
  });
}

function observeCounters() {
  const section = document.querySelector('.stats-section');
  if (!section) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { animateCounters(); obs.disconnect(); } });
  }, { threshold: 0.3 });
  obs.observe(section);
}

// ===== INDEX: DYNAMIC STATS =====
// Автоматически подсчитывает количество олимпиад и материалов из SUBJECTS.
// Обновляет data-count на элементах #stat-olympiads и #stat-materials.
function updateDynamicStats() {
  if (typeof SUBJECTS === 'undefined') return;
  let totalOlympiads = 0;
  let totalMaterials = 0;
  Object.values(SUBJECTS).forEach(s => {
    totalOlympiads += (s.olympiads || []).length;
    totalMaterials += (s.materials || []).length;
  });
  const elO = document.getElementById('stat-olympiads');
  const elM = document.getElementById('stat-materials');
  if (elO) { elO.dataset.count = totalOlympiads; elO.dataset.suffix = '+'; elO.textContent = totalOlympiads + '+'; }
  if (elM) { elM.dataset.count = totalMaterials; elM.dataset.suffix = ''; elM.textContent = totalMaterials; }
}

// ===== INDEX: UPCOMING OLYMPIADS =====
// Читает все олимпиады из SUBJECTS, фильтрует те, чья дата окончания ещё не прошла,
// группирует этапы ВсОШ (один блок на этап — «все предметы»),
// сортирует по дате начала и показывает первые 4.
function renderUpcomingOlympiads() {
  const container = document.getElementById('upcoming-list');
  if (!container || typeof SUBJECTS === 'undefined') return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Собираем все олимпиады с будущей датой окончания
  const all = [];
  Object.values(SUBJECTS).forEach(s => {
    (s.olympiads || []).forEach(o => {
      if (new Date(o.end) >= today) all.push(o);
    });
  });

  // Сортировка по дате начала
  all.sort((a, b) => new Date(a.start) - new Date(b.start));

  // Дедупликация:
  // ВсОШ одного этапа (school/municipal/regional/final) — один элемент «все предметы»
  // Перечневые — по name+start
  const seen = new Set();
  const deduped = [];
  const vsoshLabels = { school: 'Школьный этап', municipal: 'Муниципальный этап', regional: 'Региональный этап', final: 'Заключительный этап' };
  all.forEach(o => {
    let key;
    if (o.type === 'vsosh') {
      key = 'vsosh-' + o.level + '-' + o.start + '-' + o.end;
    } else {
      key = o.name + '-' + o.start;
    }
    if (!seen.has(key)) {
      seen.add(key);
      if (o.type === 'vsosh') {
        deduped.push({ ...o, name: 'ВсОШ — ' + (vsoshLabels[o.level] || o.level) + ' (все предметы)' });
      } else {
        deduped.push(o);
      }
    }
  });

  if (deduped.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:32px 16px;color:var(--text-muted)">
        <div style="font-size:36px;margin-bottom:12px">📅</div>
        <p style="font-weight:600;margin-bottom:6px">Ближайших олимпиад пока нет</p>
        <p style="font-size:14px">Следите за новостями — скоро начнётся сезон 2026/2027!</p>
      </div>`;
    return;
  }

  const upcoming = deduped.slice(0, 4);
  const vsoshClass = { school: 'badge-school', municipal: 'badge-municipal', regional: 'badge-regional', final: 'badge-vsosh-final' };
  const vsoshLabel = { school: 'Школьный', municipal: 'Муниципальный', regional: 'Региональный', final: 'Заключительный' };
  const pClass = { 1: 'badge-p1', 2: 'badge-p2', 3: 'badge-p3' };
  const pLabel = { 1: 'I уровень', 2: 'II уровень', 3: 'III уровень' };

  container.innerHTML = upcoming.map(o => {
    let badgeClass, levelLabel;
    if (o.type === 'perechen') {
      badgeClass = pClass[o.plevel] || 'badge-gray';
      levelLabel  = pLabel[o.plevel] || 'Перечневая';
    } else {
      badgeClass = vsoshClass[o.level] || 'badge-gray';
      levelLabel  = vsoshLabel[o.level] || o.level;
    }
    const href = o.reg && o.reg !== '#' ? o.reg : 'olympiads.html';
    return `
      <div class="olympiad-item">
        <div class="olympiad-info">
          <div class="olympiad-name">${o.name}</div>
          <div class="olympiad-dates"><span>📅 ${formatDate(o.start)} — ${formatDate(o.end)}</span></div>
        </div>
        <div class="olympiad-actions">
          <span class="badge ${badgeClass}">${levelLabel}</span>
          <a href="${href}" class="btn btn-outline btn-sm">Подробнее</a>
        </div>
      </div>`;
  }).join('');
}

// ===== INDEX: RECENT NEWS =====
// Показывает 3 последние новости из массива NEWS (news-data.js).
function renderRecentNews() {
  const grid = document.getElementById('recent-news-grid');
  if (!grid || typeof NEWS === 'undefined') return;

  const recent = [...NEWS].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
  grid.innerHTML = recent.map(n => {
    const dateStr = new Date(n.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
    const imgHtml = n.img
      ? `<div class="news-card-img"><img src="${n.img}" alt="${n.title}"${buildImgStyle(n)} onerror="this.parentElement.innerHTML='${n.emoji}';this.parentElement.style.background='${n.bg}'"></div>`
      : `<div class="news-card-img" style="background:${n.bg}">${n.emoji}</div>`;
    return `
      <div class="news-card">
        ${imgHtml}
        <div class="news-card-body">
          <div class="news-card-meta">
            <span class="badge ${n.badgeClass}">${n.badgeLabel}</span>
            <span class="news-date">${dateStr}</span>
          </div>
          <div class="news-card-title">${n.title}</div>
          <div class="news-card-excerpt">${n.excerpt}</div>
          <div class="news-card-footer">
            <a href="${n.link}" class="btn btn-primary btn-sm">Читать →</a>
          </div>
        </div>
      </div>`;
  }).join('');
}

// ===== NEWS PAGE: RENDER FROM DATA =====
// Заполняет страницу news.html из массива NEWS:
//   - первый элемент → «featured» (крупная карточка)
//   - элементы 2–5   → боковая панель (sidebar)
//   - элементы 6+    → сетка (по PAGE_SIZE штук, кнопка «Загрузить ещё»)
const NEWS_PAGE_SIZE = 6;

// Строит атрибут style для тега <img> новости на основе полей imgPosition и imgScale
function buildImgStyle(item) {
  const parts = [];
  if (item.imgPosition) parts.push(`object-position:${item.imgPosition}`);
  if (item.imgScale)    parts.push(`transform:scale(${item.imgScale})`);
  return parts.length ? ` style="${parts.join(';')}"` : '';
}

function makeNewsCard(item, dateStr) {
  const imgStyle = item.img ? buildImgStyle(item) : '';
  const imgHtml = item.img
    ? `<div class="news-card-img"><img src="${item.img}" alt="${item.title}"${imgStyle} onerror="this.parentElement.innerHTML='${item.emoji}';this.parentElement.style.background='${item.bg}'"></div>`
    : `<div class="news-card-img" style="background:${item.bg}">${item.emoji}</div>`;
  return `
    <div class="news-card" data-news-category="${item.category}">
      ${imgHtml}
      <div class="news-card-body">
        <div class="news-card-meta">
          <span class="badge ${item.badgeClass}">${item.badgeLabel}</span>
          <span class="news-date">${dateStr(item)}</span>
        </div>
        <div class="news-card-title">${item.title}</div>
        <div class="news-card-excerpt">${item.excerpt}</div>
        <div class="news-card-footer"><span></span><a href="${item.link}" class="btn btn-primary btn-sm">Читать →</a></div>
      </div>
    </div>`;
}

function renderNewsPage() {
  const featuredSection = document.getElementById('news-featured-section');
  if (!featuredSection || typeof NEWS === 'undefined') return;

  const sorted = [...NEWS].sort((a, b) => new Date(b.date) - new Date(a.date));
  const dateStr = item => new Date(item.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

  const featured  = sorted[0];
  const sidebar   = sorted.slice(1, 5);
  const gridItems = sorted.slice(5);

  // Render featured + sidebar
  const featuredImgHtml = featured.img
    ? `<div class="news-featured-img"><img src="${featured.img}" alt="${featured.title}"${buildImgStyle(featured)} onerror="this.parentElement.innerHTML='${featured.emoji}';this.parentElement.style.background='${featured.bg}'"></div>`
    : `<div class="news-featured-img">${featured.emoji}</div>`;
  featuredSection.innerHTML = `
    <div class="news-featured-main" data-news-category="${featured.category}">
      ${featuredImgHtml}
      <div class="news-featured-body">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
          <span class="badge ${featured.badgeClass}">${featured.badgeLabel}</span>
          <span class="news-date">${dateStr(featured)}</span>
        </div>
        <div class="news-featured-title">${featured.title}</div>
        <p class="news-featured-excerpt">${featured.excerpt}</p>
        <div style="margin-top:20px">
          <a href="${featured.link}" class="btn btn-primary">Читать полностью →</a>
        </div>
      </div>
    </div>
    <div class="news-sidebar">
      ${sidebar.map(item => `
        <div class="news-sidebar-item" data-news-category="${item.category}">
          <div class="news-sidebar-emoji">${item.emoji}</div>
          <div class="news-sidebar-content">
            <div class="title">${item.title}</div>
            <div class="date">${dateStr(item)} · ${item.badgeLabel}</div>
          </div>
        </div>`).join('')}
    </div>`;

  // Render grid with pagination
  const newsGrid    = document.getElementById('news-grid');
  const loadMoreBtn = document.getElementById('load-more-btn');
  const collapseBtn = document.getElementById('collapse-btn');
  if (!newsGrid) return;

  if (gridItems.length === 0) {
    newsGrid.innerHTML = '<p class="text-muted" style="grid-column:1/-1;padding:24px 0">Новостей пока нет.</p>';
    if (loadMoreBtn) loadMoreBtn.style.display = 'none';
    return;
  }

  newsGrid.innerHTML = ''; // убираем плейсхолдер «Загрузка...»
  let shown = 0;

  function updateButtons() {
    const allLoaded = shown >= gridItems.length;
    if (loadMoreBtn) {
      loadMoreBtn.textContent = allLoaded ? 'Больше новостей нет' : 'Загрузить ещё';
      loadMoreBtn.disabled = allLoaded;
    }
    // Кнопка «Свернуть» появляется, как только загружено больше первой порции
    if (collapseBtn) {
      collapseBtn.style.display = shown > NEWS_PAGE_SIZE ? '' : 'none';
    }
  }

  function showMore() {
    const next = gridItems.slice(shown, shown + NEWS_PAGE_SIZE);
    next.forEach(item => {
      newsGrid.insertAdjacentHTML('beforeend', makeNewsCard(item, dateStr));
    });
    shown += next.length;
    updateButtons();
  }

  function collapse() {
    // Убираем все карточки сверх первой порции
    const cards = newsGrid.querySelectorAll('.news-card');
    cards.forEach((card, i) => { if (i >= NEWS_PAGE_SIZE) card.remove(); });
    shown = Math.min(NEWS_PAGE_SIZE, gridItems.length);
    updateButtons();
    // Плавно прокручиваем к заголовку «Все новости»
    const heading = newsGrid.previousElementSibling;
    if (heading) heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Первый рендер
  showMore();

  if (loadMoreBtn) loadMoreBtn.addEventListener('click', showMore);
  if (collapseBtn) collapseBtn.addEventListener('click', collapse);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initSubjectPage();
  initFaqSearch();
  initNewsSearch();
  initSubjectSearch();
  updateDynamicStats();
  renderUpcomingOlympiads();
  renderRecentNews();
  renderNewsPage();
  observeCounters();
});
