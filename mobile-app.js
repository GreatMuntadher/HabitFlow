/* ═══════════════════════════════════════════════════════
   HabitFlow — Mobile App V2 (mobile-app.js)
   تطبيق موبايل مستقل — يقرأ ويكتب على نفس مفاتيح localStorage
   التي يستخدمها script.js (النسخة الحالية) بنفس الشكل تماماً.
   لا يوجد نظام بيانات منفصل، ولا تغيير في أسماء المفاتيح
   أو أشكال الكائنات — طبقة عرض/تفاعل إضافية فقط.
═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ══════════════════════════════════════════
     1. مفاتيح التخزين — يجب أن تُطابق KEYS في
        script.js حرفياً. لا تُغيَّر هذه القيم أبداً.
  ══════════════════════════════════════════ */
  const KEYS = {
    HABITS:     'hf_habits_v2',
    RECORDS:    'hf_records_v2',
    CATEGORIES: 'hf_categories_v2',
    TASKS:      'hf_tasks_v1',
    TASKS_DONE: 'hf_tasks_done',
    JOURNAL:    'hf_journal_v1',
  };

  /* ══════════════════════════════════════════
     2. أدوات التاريخ — نفس خوارزمية Utils في
        script.js تماماً (تاريخ محلي وليس UTC)
        لضمان توافق صيغة "YYYY-MM-DD" بين النسختين.
  ══════════════════════════════════════════ */
  const pad = n => String(n).padStart(2, '0');
  const DateUtil = {
    toDateStr(d) { return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; },
    today() { return this.toDateStr(new Date()); },
    parseDate(s) { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); },
    dayShort(s) { return this.parseDate(s).toLocaleDateString('ar', { weekday: 'short' }); },
    fullLabel(s) { return this.parseDate(s).toLocaleDateString('ar', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }); },
    daysAgo(n) { const d = new Date(); d.setDate(d.getDate() - n); return this.toDateStr(d); },
    lastNDays(n) { return Array.from({ length: n }, (_, i) => this.daysAgo(n - 1 - i)); },
  };

  function uid() { return 'u_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7); }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ══════════════════════════════════════════
     3. طبقة القراءة/الكتابة — نفس بنية Storage
        في script.js بالضبط. أي تعديل هنا لا يمس
        الشكل المخزَّن، فقط يقرأ/يكتب بنفس الصيغة.
  ══════════════════════════════════════════ */
  const DB = {
    _get(key, fallback) {
      try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }
      catch { return fallback; }
    },
    _set(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} },

    getHabits()     { return this._get(KEYS.HABITS, []) || []; },
    getCategories() { return this._get(KEYS.CATEGORIES, []) || []; },
    getRecords()    { return this._get(KEYS.RECORDS, {}) || {}; },
    saveRecords(r)  { this._set(KEYS.RECORDS, r); },
    getTasks()      { return this._get(KEYS.TASKS, []) || []; },
    saveTasks(t)    { this._set(KEYS.TASKS, t); },
    getTasksDone()  { return this._get(KEYS.TASKS_DONE, {}) || {}; },
    saveTasksDone(t){ this._set(KEYS.TASKS_DONE, t); },
    getJournal()    { return this._get(KEYS.JOURNAL, []) || []; },
    saveJournal(j)  { this._set(KEYS.JOURNAL, j); },

    getDayRecord(date) { return this.getRecords()[date] || {}; },
    setHabitValue(date, habitId, value) {
      const r = this.getRecords();
      if (!r[date]) r[date] = {};
      r[date][habitId] = value;
      this.saveRecords(r);
    },
  };

  /* ══════════════════════════════════════════
     4. محرك الحسابات — يطابق منطق Compute في
        script.js (نفس تعريف "منجز" تماماً):
        boolean → value===true ، rating → value>0
  ══════════════════════════════════════════ */
  const Compute = {
    activeCategories() { return App.categories.filter(c => c.enabled !== false); },
    activeHabits() {
      const activeCatIds = new Set(this.activeCategories().map(c => c.id));
      return App.habits.filter(h => h.enabled && activeCatIds.has(h.categoryId));
    },
    isDone(habit, value) {
      return habit.type === 'boolean' ? value === true : (value != null && value > 0);
    },
    dayStats(date, habits) {
      habits = habits || this.activeHabits();
      const rec = DB.getDayRecord(date);
      let completed = 0;
      habits.forEach(h => { if (this.isDone(h, rec[h.id])) completed++; });
      const total = habits.length;
      return { total, completed, missed: total - completed, pct: total > 0 ? Math.round((completed / total) * 100) : 0 };
    },
    habitWeekPct(habit) {
      const days = DateUtil.lastNDays(7);
      let done = 0;
      days.forEach(d => { if (this.isDone(habit, DB.getDayRecord(d)[habit.id])) done++; });
      return Math.round((done / 7) * 100);
    },
    categoryWeekStats() {
      const days = DateUtil.lastNDays(7);
      const habits = this.activeHabits();
      return this.activeCategories().map(cat => {
        const catHabits = habits.filter(h => h.categoryId === cat.id);
        if (!catHabits.length) return null;
        let completed = 0;
        days.forEach(d => {
          const rec = DB.getDayRecord(d);
          catHabits.forEach(h => { if (this.isDone(h, rec[h.id])) completed++; });
        });
        const total = catHabits.length * days.length;
        return { ...cat, completed, total, pct: total > 0 ? Math.round((completed / total) * 100) : 0 };
      }).filter(Boolean).sort((a, b) => b.pct - a.pct);
    },
  };

  /* ══════════════════════════════════════════
     5. الحالة في الذاكرة
  ══════════════════════════════════════════ */
  const App = {
    page: 'home',
    habits: [],
    categories: [],
    tasks: [],
    journal: [],
  };

  function loadAll() {
    App.habits = DB.getHabits().slice().sort((a, b) => (a.order || 0) - (b.order || 0));
    App.categories = DB.getCategories().slice().sort((a, b) => (a.order || 0) - (b.order || 0));
    App.tasks = DB.getTasks();
    App.journal = DB.getJournal();
  }

  function catFor(habit) {
    return App.categories.find(c => c.id === habit.categoryId) || { id: '_none', name: 'بدون تصنيف', icon: '🗂️', color: '#8b8fa3' };
  }

  const PRIO_COLOR = { high: '#f87171', medium: '#fbbf24', low: '#4ade80' };
  const PRIO_LABEL = { high: 'عالية', medium: 'متوسطة', low: 'منخفضة' };
  const MOODS = [
    { id: 'amazing', icon: '🌟', label: 'رائع' },
    { id: 'good',    icon: '😊', label: 'جيد' },
    { id: 'okay',    icon: '😐', label: 'عادي' },
    { id: 'hard',    icon: '😔', label: 'صعب' },
    { id: 'rough',   icon: '😤', label: 'قاسٍ' },
  ];
  const QUOTES = [
    { text: 'سر نجاحك يكمن في أجندتك اليومية.', attr: 'جون ماكسويل' },
    { text: 'العادات الصغيرة تصنع نتائج كبيرة مع الوقت.', attr: 'جيمس كلير' },
    { text: 'لا تنتظر اللحظة المثالية، ابدأ بخطوة صغيرة اليوم.', attr: 'مجهول' },
    { text: 'الاستمرارية أهم من الكمال.', attr: 'مجهول' },
    { text: 'أنت لا تُبنى بيوم واحد، بل بيوم بعد يوم.', attr: 'مجهول' },
  ];
  function todayQuote() {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    return QUOTES[dayOfYear % QUOTES.length];
  }

  /* ══════════════════════════════════════════
     6. أدوات واجهة عامة
  ══════════════════════════════════════════ */
  function $(id) { return document.getElementById(id); }

  let toastTimer = null;
  function showToast(msg) {
    const t = $('m-toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
  }

  function openSheet(html) {
    $('m-sheet-body').innerHTML = html;
    $('m-sheet-overlay').classList.add('open');
  }
  function closeSheet() {
    $('m-sheet-overlay').classList.remove('open');
  }

  function updateTopbar() {
    const stats = Compute.dayStats(DateUtil.today());
    $('m-topbar-date').textContent = DateUtil.fullLabel(DateUtil.today());
    $('m-ring-pct').textContent = stats.pct + '%';
    const circumference = 100.5;
    const offset = circumference * (1 - stats.pct / 100);
    $('m-ring-fill').setAttribute('stroke-dashoffset', offset.toFixed(2));
  }

  /* ══════════════════════════════════════════
     7. التنقل بين الصفحات
  ══════════════════════════════════════════ */
  const RENDERERS = {
    home: renderHome,
    daily: renderDaily,
    tasks: renderTasks,
    habits: renderHabits,
    journal: renderJournal,
    reports: renderReports,
    more: renderMore,
  };

  function switchPage(page) {
    if (!RENDERERS[page]) return;
    App.page = page;
    document.querySelectorAll('.m-page').forEach(p => p.classList.toggle('active', p.dataset.page === page));
    document.querySelectorAll('.m-nav-item').forEach(b => b.classList.toggle('active', b.dataset.nav === page));
    RENDERERS[page]();
    updateTopbar();
    $('m-main').scrollTop = 0;
  }

  /* ══════════════════════════════════════════
     8. الرئيسية
  ══════════════════════════════════════════ */
  function renderHome() {
    const today = DateUtil.today();
    const stats = Compute.dayStats(today);
    const quote = todayQuote();
    const doneTasks = new Set((DB.getTasksDone()[today] || []));
    const todayTasks = App.tasks.filter(t => t.date === today);
    const nextTask = todayTasks
      .filter(t => !doneTasks.has(t.id))
      .sort((a, b) => {
        const pOrder = { high: 0, medium: 1, low: 2 };
        if (pOrder[a.priority] !== pOrder[b.priority]) return pOrder[a.priority] - pOrder[b.priority];
        return (a.time || '99:99').localeCompare(b.time || '99:99');
      })[0];

    $('m-page-home').innerHTML = `
      <div class="m-home-hero">
        <div class="m-home-hero-pct">${stats.pct}%</div>
        <div class="m-home-hero-sub">من عاداتك أُنجزت اليوم</div>
      </div>
      <div class="m-stats-row">
        <div class="m-card m-stat-chip"><div class="m-stat-chip-val" style="color:var(--success)">${stats.completed}</div><div class="m-stat-chip-lbl">مكتملة</div></div>
        <div class="m-card m-stat-chip"><div class="m-stat-chip-val" style="color:var(--danger)">${stats.missed}</div><div class="m-stat-chip-lbl">متبقية</div></div>
        <div class="m-card m-stat-chip"><div class="m-stat-chip-val" style="color:var(--info)">${stats.total}</div><div class="m-stat-chip-lbl">إجمالي العادات</div></div>
      </div>
      <button class="m-btn m-btn-primary" id="m-home-cta" type="button" style="margin-bottom:16px">✅ سجّل عاداتك الآن</button>
      ${nextTask ? `
        <div class="m-section-title">أقرب مهمة لم تُنجز</div>
        <div class="m-card m-mini-task-row">
          <span class="m-mini-task-dot" style="background:${PRIO_COLOR[nextTask.priority] || PRIO_COLOR.medium}"></span>
          <span class="m-mini-task-name">${esc(nextTask.title)}</span>
          <span class="m-badge">${PRIO_LABEL[nextTask.priority] || '—'}</span>
        </div>
      ` : ''}
      <div class="m-section-title">اقتباس اليوم</div>
      <div class="m-card m-quote-card">
        <div class="m-quote-text">"${esc(quote.text)}"</div>
        <div class="m-quote-attr">— ${esc(quote.attr)}</div>
      </div>
    `;
    $('m-home-cta')?.addEventListener('click', () => switchPage('daily'));
  }

  /* ══════════════════════════════════════════
     9. تسجيل اليوم
  ══════════════════════════════════════════ */
  function renderDaily() {
    const date = DateUtil.today();
    const record = DB.getDayRecord(date);
    const habits = Compute.activeHabits();
    const stats = Compute.dayStats(date, habits);

    if (!habits.length) {
      $('m-page-daily').innerHTML = `
        <div class="m-section-title">تسجيل اليوم</div>
        <div class="m-card m-empty">لا توجد عادات مفعّلة بعد.<br>أضف عادات من النسخة الكاملة على الحاسوب.</div>
      `;
      return;
    }

    const groups = {};
    habits.forEach(h => {
      const cat = catFor(h);
      if (!groups[cat.id]) groups[cat.id] = { cat, habits: [] };
      groups[cat.id].habits.push(h);
    });

    const groupsHtml = Object.values(groups).map(g => `
      <div class="m-cat-group">
        <div class="m-cat-head">
          <span class="m-cat-icon" style="border-color:${g.cat.color}44">${esc(g.cat.icon)}</span>
          <span class="m-cat-name">${esc(g.cat.name)}</span>
        </div>
        ${g.habits.map(h => renderHabitControlCard(h, record[h.id])).join('')}
      </div>
    `).join('');

    $('m-page-daily').innerHTML = `
      <div class="m-section-title">تسجيل اليوم — ${stats.pct}% مكتمل</div>
      ${groupsHtml}
    `;

    $('m-page-daily').querySelectorAll('[data-bool]').forEach(btn => {
      btn.addEventListener('click', () => {
        const habitId = btn.dataset.bool;
        const val = btn.dataset.val === 'true';
        DB.setHabitValue(date, habitId, val);
        renderDaily();
        updateTopbar();
      });
    });
    $('m-page-daily').querySelectorAll('[data-rating]').forEach(chip => {
      chip.addEventListener('click', () => {
        const habitId = chip.dataset.rating;
        const val = parseInt(chip.dataset.val, 10);
        DB.setHabitValue(date, habitId, val);
        renderDaily();
        updateTopbar();
      });
    });
  }

  function renderHabitControlCard(h, value) {
    const isDone = value === true;
    const isSkipped = value === false;
    let control;
    if (h.type === 'boolean') {
      control = `
        <div style="display:flex;gap:8px;margin-top:10px">
          <button class="m-check-btn ${isDone ? 'done' : ''}" data-bool="${h.id}" data-val="true" type="button">✓ منجز</button>
          <button class="m-check-btn ${isSkipped ? 'done' : ''}" data-bool="${h.id}" data-val="false" type="button" style="${isSkipped ? 'background:rgba(248,113,113,.14);border-color:rgba(248,113,113,.4);color:var(--danger)' : ''}">○ لم يُنجز</button>
        </div>`;
    } else {
      const rows = Array.from({ length: 10 }, (_, i) => i + 1).map(n =>
        `<span class="m-rating-chip ${value === n ? 'active' : ''}" data-rating="${h.id}" data-val="${n}">${n}</span>`
      ).join('');
      control = `<div class="m-rating-row">${rows}</div>`;
    }
    return `
      <div class="m-card m-habit-card">
        <div class="m-habit-row">
          <div class="m-habit-info">
            <div class="m-habit-name">${esc(h.name)}</div>
            ${h.description ? `<div class="m-habit-desc">${esc(h.description)}</div>` : ''}
          </div>
        </div>
        ${control}
      </div>`;
  }

  /* ══════════════════════════════════════════
     10. المهام
  ══════════════════════════════════════════ */
  function renderTasks() {
    const date = DateUtil.today();
    const doneMap = DB.getTasksDone();
    const doneIds = new Set(doneMap[date] || []);
    const list = App.tasks
      .filter(t => t.date === date)
      .sort((a, b) => {
        const aDone = doneIds.has(a.id), bDone = doneIds.has(b.id);
        if (aDone !== bDone) return aDone ? 1 : -1;
        const pOrder = { high: 0, medium: 1, low: 2 };
        if (pOrder[a.priority] !== pOrder[b.priority]) return (pOrder[a.priority] ?? 1) - (pOrder[b.priority] ?? 1);
        return (a.time || '99:99').localeCompare(b.time || '99:99');
      });

    const itemsHtml = list.length ? list.map(t => {
      const done = doneIds.has(t.id);
      return `
        <div class="m-card m-task-card">
          <button class="m-task-check ${done ? 'done' : ''}" data-taskdone="${t.id}" type="button" aria-label="تبديل الإنجاز">
            ${done ? '<svg viewBox="0 0 24 24" fill="none" width="15" height="15"><path d="M5 13l4 4L19 7" stroke="#07070e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>' : ''}
          </button>
          <div class="m-task-body">
            <div class="m-task-title ${done ? 'done-text' : ''}">${esc(t.title)}</div>
            <div class="m-task-meta">
              <span class="m-prio-dot" style="background:${PRIO_COLOR[t.priority] || PRIO_COLOR.medium}"></span>
              <span class="m-task-time">${PRIO_LABEL[t.priority] || ''}${t.time ? ' · ' + esc(t.time) : ''}</span>
            </div>
          </div>
          <button class="m-task-del" data-taskdel="${t.id}" type="button" aria-label="حذف المهمة">
            <svg viewBox="0 0 24 24" fill="none" width="16" height="16"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          </button>
        </div>`;
    }).join('') : `<div class="m-card m-empty">لا توجد مهام اليوم.<br>اضغط + لإضافة مهمة جديدة.</div>`;

    $('m-page-tasks').innerHTML = `
      <div class="m-section-title">مهام اليوم</div>
      ${itemsHtml}
    `;

    $('m-page-tasks').querySelectorAll('[data-taskdone]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.taskdone;
        const all = DB.getTasksDone();
        if (!all[date]) all[date] = [];
        const idx = all[date].indexOf(id);
        if (idx >= 0) all[date].splice(idx, 1); else all[date].push(id);
        DB.saveTasksDone(all);
        renderTasks();
        updateTopbar();
      });
    });
    $('m-page-tasks').querySelectorAll('[data-taskdel]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!confirm('حذف هذه المهمة نهائياً؟')) return;
        App.tasks = App.tasks.filter(t => t.id !== btn.dataset.taskdel);
        DB.saveTasks(App.tasks);
        renderTasks();
        showToast('تم حذف المهمة.');
      });
    });
  }

  function openAddTaskSheet() {
    openSheet(`
      <div class="m-sheet-title">إضافة مهمة</div>
      <div class="m-field">
        <label class="m-field-label">عنوان المهمة *</label>
        <input class="m-input" id="mt-title" maxlength="80" placeholder="مثال: الرد على الإيميلات">
      </div>
      <div class="m-field">
        <label class="m-field-label">الوقت (اختياري)</label>
        <input class="m-input" id="mt-time" type="time">
      </div>
      <div class="m-field">
        <label class="m-field-label">الأولوية</label>
        <div class="m-radio-row" id="mt-priority">
          <div class="m-radio-chip" data-val="low">منخفضة</div>
          <div class="m-radio-chip active" data-val="medium">متوسطة</div>
          <div class="m-radio-chip" data-val="high">عالية</div>
        </div>
      </div>
      <div class="m-sheet-actions">
        <button class="m-btn m-btn-ghost" id="mt-cancel" type="button">إلغاء</button>
        <button class="m-btn m-btn-primary" id="mt-save" type="button">حفظ المهمة</button>
      </div>
    `);
    let priority = 'medium';
    $('mt-priority').querySelectorAll('.m-radio-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        $('mt-priority').querySelectorAll('.m-radio-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        priority = chip.dataset.val;
      });
    });
    $('mt-cancel').addEventListener('click', closeSheet);
    $('mt-save').addEventListener('click', () => {
      const title = $('mt-title').value.trim();
      if (!title) { showToast('عنوان المهمة مطلوب.'); return; }
      const task = {
        id: uid(),
        title,
        description: '',
        date: DateUtil.today(),
        time: $('mt-time').value || '',
        priority,
        category: '',
        repeat: 'none',
        createdAt: new Date().toISOString(),
      };
      App.tasks.push(task);
      DB.saveTasks(App.tasks);
      closeSheet();
      renderTasks();
      showToast('تمت إضافة المهمة! 🎉');
    });
  }

  /* ══════════════════════════════════════════
     11. العادات (نظرة عامة)
  ══════════════════════════════════════════ */
  function renderHabits() {
    const today = DateUtil.today();
    const record = DB.getDayRecord(today);
    const habits = Compute.activeHabits();

    if (!habits.length) {
      $('m-page-habits').innerHTML = `
        <div class="m-section-title">العادات</div>
        <div class="m-card m-empty">لا توجد عادات مفعّلة بعد.<br>أضف عادات من النسخة الكاملة على الحاسوب.</div>
      `;
      return;
    }

    const groups = {};
    habits.forEach(h => {
      const cat = catFor(h);
      if (!groups[cat.id]) groups[cat.id] = { cat, habits: [] };
      groups[cat.id].habits.push(h);
    });

    const groupsHtml = Object.values(groups).map(g => `
      <div class="m-cat-group">
        <div class="m-cat-head">
          <span class="m-cat-icon" style="border-color:${g.cat.color}44">${esc(g.cat.icon)}</span>
          <span class="m-cat-name">${esc(g.cat.name)}</span>
        </div>
        ${g.habits.map(h => {
          const done = Compute.isDone(h, record[h.id]);
          const weekPct = Compute.habitWeekPct(h);
          return `
            <div class="m-card m-habit-card">
              <div class="m-habit-row">
                <span class="m-mini-task-dot" style="background:${done ? 'var(--success)' : 'rgba(255,255,255,.18)'}"></span>
                <div class="m-habit-info">
                  <div class="m-habit-name">${esc(h.name)}</div>
                </div>
                <span class="m-badge">${h.type === 'boolean' ? 'نعم/لا' : 'تقييم'}</span>
              </div>
              <div class="m-habit-week-mini">
                <div class="m-week-bar"><div class="m-week-bar-fill" style="width:${weekPct}%;background:${g.cat.color}"></div></div>
                <span class="m-week-pct">${weekPct}%</span>
              </div>
            </div>`;
        }).join('')}
      </div>
    `).join('');

    $('m-page-habits').innerHTML = `
      <div class="m-section-title">العادات — نسبة آخر 7 أيام</div>
      ${groupsHtml}
      <button class="m-btn m-btn-ghost" id="m-habits-goto-daily" type="button" style="margin-top:6px">✅ اذهب إلى تسجيل اليوم</button>
    `;
    $('m-habits-goto-daily')?.addEventListener('click', () => switchPage('daily'));
  }

  /* ══════════════════════════════════════════
     12. المذكرات
  ══════════════════════════════════════════ */
  function renderJournal() {
    const entries = App.journal.slice().sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    const itemsHtml = entries.length ? entries.map(e => {
      const mood = MOODS.find(m => m.id === e.mood);
      return `
        <div class="m-card m-journal-card">
          <div class="m-journal-head">
            <div class="m-journal-title">${esc(e.title || 'بدون عنوان')}</div>
            ${mood ? `<span class="m-journal-mood">${mood.icon}</span>` : ''}
          </div>
          <div class="m-journal-date">${DateUtil.fullLabel(e.date || DateUtil.today())}</div>
          <div class="m-journal-body clamped" data-journalbody="${e.id}">${esc(e.body)}</div>
          ${(e.tags && e.tags.length) ? `<div class="m-journal-tags">${e.tags.map(t => `<span class="m-journal-tag">#${esc(t)}</span>`).join('')}</div>` : ''}
          <div class="m-journal-actions">
            <button class="m-task-del" data-journaldel="${e.id}" type="button" aria-label="حذف">
              <svg viewBox="0 0 24 24" fill="none" width="16" height="16"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </button>
          </div>
        </div>`;
    }).join('') : `<div class="m-card m-empty">لا توجد تدوينات بعد.<br>اضغط + لكتابة أول تدوينة.</div>`;

    $('m-page-journal').innerHTML = `
      <div class="m-section-title">المذكرات</div>
      ${itemsHtml}
    `;

    $('m-page-journal').querySelectorAll('[data-journalbody]').forEach(el => {
      el.addEventListener('click', () => el.classList.toggle('clamped'));
    });
    $('m-page-journal').querySelectorAll('[data-journaldel]').forEach(btn => {
      btn.addEventListener('click', (ev) => {
        ev.stopPropagation();
        if (!confirm('حذف هذه التدوينة نهائياً؟')) return;
        App.journal = App.journal.filter(e => e.id !== btn.dataset.journaldel);
        DB.saveJournal(App.journal);
        renderJournal();
        showToast('تم حذف التدوينة.');
      });
    });
  }

  function openAddJournalSheet() {
    openSheet(`
      <div class="m-sheet-title">تدوينة جديدة</div>
      <div class="m-field">
        <label class="m-field-label">المزاج</label>
        <div class="m-mood-row" id="mj-mood">
          ${MOODS.map(m => `<div class="m-mood-chip" data-val="${m.id}">${m.icon}<span class="m-mood-chip-label">${m.label}</span></div>`).join('')}
        </div>
      </div>
      <div class="m-field">
        <label class="m-field-label">العنوان (اختياري)</label>
        <input class="m-input" id="mj-title" maxlength="100" placeholder="عنوان لهذه التدوينة...">
      </div>
      <div class="m-field">
        <label class="m-field-label">أفكارك *</label>
        <textarea class="m-textarea" id="mj-body" maxlength="4000" placeholder="اكتب بحرية..."></textarea>
      </div>
      <div class="m-field">
        <label class="m-field-label">الوسوم (مفصولة بفواصل)</label>
        <input class="m-input" id="mj-tags" placeholder="امتنان، نمو، تأمل...">
      </div>
      <div class="m-sheet-actions">
        <button class="m-btn m-btn-ghost" id="mj-cancel" type="button">إلغاء</button>
        <button class="m-btn m-btn-primary" id="mj-save" type="button">حفظ التدوينة</button>
      </div>
    `);
    let mood = '';
    $('mj-mood').querySelectorAll('.m-mood-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        $('mj-mood').querySelectorAll('.m-mood-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        mood = chip.dataset.val;
      });
    });
    $('mj-cancel').addEventListener('click', closeSheet);
    $('mj-save').addEventListener('click', () => {
      const body = $('mj-body').value.trim();
      if (!body) { showToast('اكتب شيئاً في محتوى التدوينة.'); return; }
      const tags = $('mj-tags').value.split(',').map(t => t.trim()).filter(Boolean);
      const entry = {
        id: uid(),
        date: DateUtil.today(),
        title: $('mj-title').value.trim(),
        body,
        mood,
        tags,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      App.journal.unshift(entry);
      DB.saveJournal(App.journal);
      closeSheet();
      renderJournal();
      showToast('تم حفظ التدوينة! 🎉');
    });
  }

  /* ══════════════════════════════════════════
     13. التقارير
  ══════════════════════════════════════════ */
  function renderReports() {
    const today = DateUtil.today();
    const todayStats = Compute.dayStats(today);
    const days = DateUtil.lastNDays(7);
    const dayBars = days.map(d => ({ date: d, stats: Compute.dayStats(d) }));
    const catStats = Compute.categoryWeekStats();

    $('m-page-reports').innerHTML = `
      <div class="m-section-title">تقرير اليوم</div>
      <div class="m-card m-report-pct-row">
        <div class="m-report-pct-num" style="color:var(--success)">${todayStats.pct}%</div>
        <div class="m-report-pct-lbl">مكتمل اليوم<br>${todayStats.completed} من ${todayStats.total} عادة</div>
      </div>

      <div class="m-section-title">آخر 7 أيام</div>
      <div class="m-card">
        <div class="m-week-chart">
          ${dayBars.map(d => `
            <div class="m-week-chart-col">
              <div class="m-week-chart-bar-wrap"><div class="m-week-chart-bar" style="height:${Math.max(d.stats.pct, 2)}%"></div></div>
              <span class="m-week-chart-day">${DateUtil.dayShort(d.date)}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="m-section-title">الجوانب هذا الأسبوع</div>
      <div class="m-card">
        ${catStats.length ? catStats.map(c => `
          <div class="m-cat-report-row">
            <span class="m-cat-report-icon">${esc(c.icon)}</span>
            <div class="m-cat-report-info">
              <div class="m-cat-report-name">${esc(c.name)}</div>
              <div class="m-cat-report-bar"><div class="m-cat-report-fill" style="width:${c.pct}%;background:${c.color}"></div></div>
            </div>
            <span class="m-cat-report-pct" style="color:${c.color}">${c.pct}%</span>
          </div>
        `).join('') : `<div class="m-empty">لا توجد بيانات كافية بعد.</div>`}
      </div>
    `;
  }

  /* ══════════════════════════════════════════
     14. المزيد
  ══════════════════════════════════════════ */
  function renderMore() {
    $('m-page-more').innerHTML = `
      <div class="m-section-title">تصفح</div>
      <div class="m-more-list">
        <button class="m-card m-more-item" data-nav="habits" type="button">
          <span class="m-more-icon">📋</span><span class="m-more-label">العادات</span>
          <svg class="m-more-chevron" viewBox="0 0 24 24" fill="none" width="16" height="16"><path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <button class="m-card m-more-item" data-nav="reports" type="button">
          <span class="m-more-icon">📊</span><span class="m-more-label">التقارير</span>
          <svg class="m-more-chevron" viewBox="0 0 24 24" fill="none" width="16" height="16"><path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <a class="m-card m-more-item" href="../index.html">
          <span class="m-more-icon">💻</span><span class="m-more-label">فتح النسخة الكاملة (الحاسوب)</span>
          <svg class="m-more-chevron" viewBox="0 0 24 24" fill="none" width="16" height="16"><path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
      </div>
      <div class="m-section-title">عن هذا التطبيق</div>
      <div class="m-card m-more-note">
        HabitFlow Mobile V2 — واجهة موبايل مستقلة تقرأ نفس بياناتك المحفوظة على هذا الجهاز.<br><br>
        الصفحات التالية غير متوفرة بعد في نسخة الموبايل: الإنجازات، الخط الزمني، التقويم، التحديات، إدارة الجوانب، الإعدادات.
        استخدم رابط "النسخة الكاملة" أعلاه للوصول إليها.
      </div>
    `;
    $('m-page-more').querySelectorAll('[data-nav]').forEach(btn => {
      btn.addEventListener('click', () => switchPage(btn.dataset.nav));
    });
  }

  /* ══════════════════════════════════════════
     15. ربط الأحداث العامة
  ══════════════════════════════════════════ */
  function bindEvents() {
    document.querySelectorAll('.m-nav-item').forEach(btn => {
      btn.addEventListener('click', () => switchPage(btn.dataset.nav));
    });
    $('m-sheet-overlay').addEventListener('click', e => {
      if (e.target === $('m-sheet-overlay')) closeSheet();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeSheet();
    });
  }

  function mountFabs() {
    // زر + عائم — يتغيّر حسب الصفحة الحالية (مهام أو مذكرات)
    let fab = $('m-fab');
    if (!fab) {
      fab = document.createElement('button');
      fab.id = 'm-fab';
      fab.className = 'm-fab';
      fab.type = 'button';
      fab.innerHTML = '<svg viewBox="0 0 24 24" fill="none" width="22" height="22"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>';
      document.getElementById('m-app').appendChild(fab);
      fab.addEventListener('click', () => {
        if (App.page === 'tasks') openAddTaskSheet();
        else if (App.page === 'journal') openAddJournalSheet();
      });
    }
    fab.style.display = (App.page === 'tasks' || App.page === 'journal') ? 'flex' : 'none';
  }

  const _origSwitchPage = switchPage;
  switchPage = function (page) { _origSwitchPage(page); mountFabs(); };

  /* ══════════════════════════════════════════
     16. التهيئة
  ══════════════════════════════════════════ */
  function init() {
    loadAll();
    bindEvents();
    switchPage('home');
  }

  init();
})();
