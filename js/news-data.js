// ===== NEWS DATA =====
// Единый источник данных для страниц «Главная» и «Новости».
//
// КАК ДОБАВИТЬ НОВОСТЬ:
//   1. Скопируйте любой блок ниже и вставьте В НАЧАЛО массива (самые свежие — сверху).
//   2. Заполните все поля. Сохраните файл — новость появится автоматически.
//
// ПОЛЯ:
//   id         — уникальный идентификатор (строка, латиница-дефисы)
//   date       — дата в формате 'ГГГГ-ММ-ДД'
//   category   — 'achievement' | 'event' | 'update' | 'announcement'
//   emoji      — эмодзи (показывается вместо фото, если поле img не задано)
//   bg         — CSS-градиент фона карточки (строка)
//   badgeClass — класс бейджа: 'badge-green' (достижение) | 'badge-blue' (мероприятие) | 'badge-pink' (обновление/анонс)
//   badgeLabel — текст бейджа: 'Достижение' | 'Мероприятие' | 'Обновление' | 'Анонс'
//   title      — заголовок
//   excerpt    — краткое описание (1–2 предложения)
//   link       — ссылка на статью (напр. 'news/math-regional-2026.html')
//   img        — (опционально) путь к фотографии: 'img/news/photo.jpg'
//               Если поле отсутствует или пустое — используется emoji + bg.
//   imgPosition — (опционально) кадрирование фото: 'X% Y%'
//               '50% 50%'  — центр (по умолчанию, можно не указывать)
//               '50% 0%'   — верх снимка (если лица находятся вверху)
//               '50% 25%'  — чуть выше центра
//               '50% 100%' — низ снимка
//               '20% 50%'  — сдвинуть левее
//               Пример: imgPosition: '50% 20%'
//   imgScale   — (опционально) приближение фото, число ≥ 1.0
//               1.0  — без изменений (по умолчанию, можно не указывать)
//               1.2  — приблизить на 20%
//               1.5  — приблизить в полтора раза
//               Пример: imgScale: 1.3
//
// ПРИМЕР НОВОЙ ЗАПИСИ (вставьте в самое начало массива):
// ─────────────────────────────────────────────────────────
// {
//   id: 'math-final-2027', date: '2027-04-10', category: 'achievement',
//   emoji: '🥇', bg: 'linear-gradient(135deg,#e8f4fb,#fceef6)',
//   badgeClass: 'badge-green', badgeLabel: 'Достижение',
//   title: 'Победа на заключительном этапе ВсОШ по математике',
//   excerpt: 'Наш ученик стал победителем заключительного этапа!',
//   link: 'news/math-final-2027.html',
//   img: 'img/news/math-final-2027.jpg',   // ← фото (необязательно)
//   imgPosition: '50% 20%',                // ← кадрирование (необязательно)
//   imgScale: 1.2                          // ← приближение (необязательно)
// },
// ─────────────────────────────────────────────────────────

const NEWS = [
  {
    id: 'season-end-2026',
    date: '2026-05-01',
    category: 'achievement',
    emoji: '🏆',
    bg: 'linear-gradient(135deg,#eef7f0,#d1fae5)',
    badgeClass: 'badge-green',
    badgeLabel: 'Достижение',
    title: 'Завершён олимпиадный сезон 2025/26!',
    excerpt: 'Желаем удачи участникам в следующем году, а пока что набирайтесь сил и готовьтесь к новому олимпиадному сезону!',
    img: "img/vsosh.png",
    link: 'news/new-1.html'
  },
  
  {
    id: 'shipov-geography-2026',
    date: '2026-04-20',
    category: 'achievement',
    emoji: '🥇',
    bg: 'linear-gradient(135deg,#e8f4fb,#fceef6)',
    badgeClass: 'badge-green',
    badgeLabel: 'Достижение',
    title: 'Ярослав Шипов стал призёром заключительного этапа ВсОШ по географии!',
    excerpt: 'Ученик 9IT класса Ярослав Шипов стал призёром на заключительном этапе ВсОШ по географии! Поздравляем его и педагога Вилкову Людмилу Петровну!',
    link: '#'
  },
  {
    id: 'materials-added-apr-2026',
    date: '2026-04-19',
    category: 'update',
    emoji: '📂',
    bg: 'linear-gradient(135deg,#fef9ee,rgba(253,230,138,0.25))',
    badgeClass: 'badge-pink',
    badgeLabel: 'Обновление',
    title: 'На сайт ОЦ добавлены материалы по 3 предметам',
    excerpt: 'Обновлены разделы по математике, физике и химии. Загружены новые конспекты и сборники задач.',
    link: '#'
  },
  {
    id: 'season-ending-2026',
    date: '2026-04-19',
    category: 'update',
    emoji: '📅',
    bg: 'linear-gradient(135deg,#fff3cd,#fce5f0)',
    badgeClass: 'badge-pink',
    badgeLabel: 'Обновление',
    title: 'Подходит к концу олимпиадный сезон 2025/2026',
    excerpt: 'Большинство этапов олимпиад завершены. Публикуем итоговую сводку и планы на следующий год.',
    link: '#'
  },
  {
    id: 'curator-recruit-2026',
    date: '2026-04-17',
    category: 'announcement',
    emoji: '📢',
    bg: 'linear-gradient(135deg,#fceef6,#fde8f5)',
    badgeClass: 'badge-pink',
    badgeLabel: 'Анонс',
    title: 'Ведётся набор кураторов на 2026/2027 учебный год',
    excerpt: 'Если ты призёр или победитель олимпиады и хочешь помогать другим — присоединяйся к команде ОЦ.',
    link: '#'
  },
  {
    id: 'site-beta-2026',
    date: '2026-04-15',
    category: 'update',
    emoji: '🚀',
    bg: 'linear-gradient(135deg,#eff6ff,#dbeafe)',
    badgeClass: 'badge-pink',
    badgeLabel: 'Обновление',
    title: 'Запущена бета-версия сайта ОЦ',
    excerpt: 'Открыт обновлённый сайт Олимпиадного Центра с разделами по каждому предмету, материалами и актуальными датами олимпиад.',
    link: '#'
  },
  {
    id: 'physics-lecture-2026',
    date: '2026-04-05',
    category: 'event',
    emoji: '🎤',
    bg: 'linear-gradient(135deg,#e8f4fb,#dbeafe)',
    badgeClass: 'badge-blue',
    badgeLabel: 'Мероприятие',
    title: 'Лекция по олимпиадной физике: разбор задач регионального этапа',
    excerpt: 'Более 40 учеников посетили разбор заданий регионального этапа ВсОШ по физике. Лектор — призёр заключительного этапа.',
    link: '#'
  },
  {
    id: 'chemistry-materials-2026',
    date: '2026-04-01',
    category: 'update',
    emoji: '📂',
    bg: 'linear-gradient(135deg,#fef9ee,rgba(253,230,138,0.25))',
    badgeClass: 'badge-pink',
    badgeLabel: 'Обновление',
    title: 'Добавлены новые конспекты по химии и китайскому языку',
    excerpt: 'Загружены 8 новых материалов по химии и 3 материала по китайскому языку.',
    link: '#'
  },
  {
    id: 'cs-classes-2026',
    date: '2026-03-28',
    category: 'announcement',
    emoji: '📢',
    bg: 'linear-gradient(135deg,#fceef6,#fce7f3)',
    badgeClass: 'badge-pink',
    badgeLabel: 'Анонс',
    title: 'Открывается запись на подготовительные занятия по информатике',
    excerpt: 'С 1 апреля по вторникам и пятницам в 15:30 — занятия по олимпиадной информатике для 8–10 классов.',
    link: '#'
  },
  {
    id: 'municipal-results-2026',
    date: '2026-03-15',
    category: 'event',
    emoji: '🌿',
    bg: 'linear-gradient(135deg,#eef7f0,#d1fae5)',
    badgeClass: 'badge-blue',
    badgeLabel: 'Мероприятие',
    title: 'Встреча Олимпиадного Центра: итоги муниципального этапа',
    excerpt: 'Подвели итоги муниципального этапа ВсОШ: 18 победителей и призёров по 9 предметам. Обсудили планы подготовки к региональному этапу.',
    link: '#'
  },
  {
    id: 'english-regional-2026',
    date: '2026-03-10',
    category: 'achievement',
    emoji: '🇬🇧',
    bg: 'linear-gradient(135deg,#e8f4fb,#bfdbfe)',
    badgeClass: 'badge-green',
    badgeLabel: 'Достижение',
    title: 'Пятеро учеников прошли на региональный этап по английскому языку',
    excerpt: 'По итогам муниципального этапа пять наших учеников приглашены на региональный этап ВсОШ по английскому языку.',
    link: '#',
    img: "img/englishresp.jpg",
    imgPosition: '50% 50%'
  },
  {
    id: 'math-solutions-2026',
    date: '2026-03-05',
    category: 'update',
    emoji: '📐',
    bg: 'linear-gradient(135deg,#f3e8ff,#ede9fe)',
    badgeClass: 'badge-pink',
    badgeLabel: 'Обновление',
    title: 'Загружены разборы задач муниципального этапа по математике',
    excerpt: 'Опубликованы подробные решения всех задач муниципального этапа ВсОШ по математике 2025/2026 года.',
    link: '#'
  },
  {
    id: 'regional',
    date: '2026-03-01',
    category: 'announcement',
    emoji: '🗓️',
    bg: 'linear-gradient(135deg,#fceef6,#fce7f3)',
    badgeClass: 'badge-pink',
    badgeLabel: 'Анонс',
    title: 'Региональный этап ВсОШ: расписание и советы по подготовке',
    excerpt: 'Публикуем актуальное расписание регионального этапа и рекомендации по финальной подготовке от наших кураторов.',
    link: '#'
  }
];
