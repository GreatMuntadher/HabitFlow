/* ═══════════════════════════════════════════════════════
   HABITFLOW — script.js v2 (مع لوحة الإدارة)
   النسخة العربية الكاملة
═══════════════════════════════════════════════════════ */
'use strict';

/* ══════════════════════════════════════════
   1. البيانات الافتراضية
══════════════════════════════════════════ */

const DEFAULT_CATEGORIES = [
  { id:'health',        name:'الصحة',                    icon:'💪', color:'#4ade80', description:'العناية بالجسم والصحة البدنية',          enabled:true, order:0 },
  { id:'work',          name:'العمل والإنتاجية',          icon:'⚡', color:'#60a5fa', description:'المهام المهنية والكفاءة في العمل',        enabled:true, order:1 },
  { id:'learning',      name:'التعلم والتطوير',           icon:'📚', color:'#a78bfa', description:'النمو المعرفي وبناء المهارات',           enabled:true, order:2 },
  { id:'mental',        name:'الانضباط الذهني',           icon:'🧠', color:'#fbbf24', description:'تدريب العقل والصحة العاطفية',            enabled:true, order:3 },
  { id:'relationships', name:'العلاقات والتوازن',         icon:'❤️', color:'#f472b6', description:'العلاقات الاجتماعية وانسجام الحياة',     enabled:true, order:4 },
];

const DEFAULT_HABITS = [
  { id:'h1', name:'النوم 8 ساعات',                description:'الحصول على 8 ساعات نوم كاملة ومريحة',           categoryId:'health',        type:'boolean', enabled:true, order:0,  createdAt:'2026-01-01' },
  { id:'h2', name:'الرياضة / التمرين',             description:'أي نشاط بدني لمدة 20 دقيقة على الأقل',          categoryId:'health',        type:'boolean', enabled:true, order:1,  createdAt:'2026-01-01' },
  { id:'h3', name:'شرب 2 لتر ماء',                description:'الحفاظ على ترطيب الجسم طوال اليوم',             categoryId:'health',        type:'boolean', enabled:true, order:2,  createdAt:'2026-01-01' },
  { id:'h4', name:'الأكل الصحي',                  description:'تقييم جودة التغذية اليوم',                       categoryId:'health',        type:'rating',  enabled:true, order:3,  createdAt:'2026-01-01' },
  { id:'h5', name:'تجنب الأكل غير الصحي',          description:'الابتعاد عن الأطعمة المصنّعة وغير الصحية',      categoryId:'health',        type:'boolean', enabled:true, order:4,  createdAt:'2026-01-01' },
  { id:'w1', name:'جلسة عمل عميق',                description:'تقييم جودة وقت التركيز والإنجاز',               categoryId:'work',          type:'rating',  enabled:true, order:0,  createdAt:'2026-01-01' },
  { id:'w2', name:'إنجاز أهم 3 مهام',             description:'إتمام أهم ثلاث مهام في اليوم',                  categoryId:'work',          type:'boolean', enabled:true, order:1,  createdAt:'2026-01-01' },
  { id:'w3', name:'عدم استخدام السوشيال ميديا',    description:'البقاء مركزاً بعيداً عن مشتتات التواصل الاجتماعي',categoryId:'work',         type:'boolean', enabled:true, order:2,  createdAt:'2026-01-01' },
  { id:'w4', name:'مراجعة اليوم والتخطيط للغد',   description:'إنهاء اليوم بمراجعة وخطة لليوم التالي',          categoryId:'work',          type:'boolean', enabled:true, order:3,  createdAt:'2026-01-01' },
  { id:'w5', name:'مستوى الإنتاجية',              description:'تقييم إنتاجيتك العامة اليوم',                   categoryId:'work',          type:'rating',  enabled:true, order:4,  createdAt:'2026-01-01' },
  { id:'l1', name:'قراءة 30 دقيقة',               description:'وقت قراءة مخصص للتعلم',                          categoryId:'learning',      type:'boolean', enabled:true, order:0,  createdAt:'2026-01-01' },
  { id:'l2', name:'تعلم شيء جديد',                description:'تقييم مقدار المعرفة الجديدة المكتسبة',           categoryId:'learning',      type:'rating',  enabled:true, order:1,  createdAt:'2026-01-01' },
  { id:'l3', name:'ممارسة مهارة',                 description:'تطبيق فعلي لمهارة تعمل على تطويرها',             categoryId:'learning',      type:'boolean', enabled:true, order:2,  createdAt:'2026-01-01' },
  { id:'l4', name:'محتوى تعليمي',                 description:'مشاهدة أو الاستماع لمحتوى تعليمي',              categoryId:'learning',      type:'boolean', enabled:true, order:3,  createdAt:'2026-01-01' },
  { id:'l5', name:'قيمة التعلم اليوم',             description:'القيمة التعليمية الإجمالية لليوم',               categoryId:'learning',      type:'rating',  enabled:true, order:4,  createdAt:'2026-01-01' },
  { id:'m1', name:'التأمل',                       description:'ممارسة اليقظة الذهنية أو التأمل',                categoryId:'mental',        type:'boolean', enabled:true, order:0,  createdAt:'2026-01-01' },
  { id:'m2', name:'ممارسة الامتنان',               description:'الكتابة أو التفكير في أشياء تشعر بالامتنان تجاهها',categoryId:'mental',     type:'boolean', enabled:true, order:1,  createdAt:'2026-01-01' },
  { id:'m3', name:'دش بارد',                      description:'بناء الصمود الذهني عبر الدش البارد',             categoryId:'mental',        type:'boolean', enabled:true, order:2,  createdAt:'2026-01-01' },
  { id:'m4', name:'تقييم المزاج',                  description:'تقييم مزاجك وحالتك العاطفية العامة',             categoryId:'mental',        type:'rating',  enabled:true, order:3,  createdAt:'2026-01-01' },
  { id:'m5', name:'بدون شكوى',                    description:'ممارسة التفكير الإيجابي طوال اليوم',              categoryId:'mental',        type:'boolean', enabled:true, order:4,  createdAt:'2026-01-01' },
  { id:'r1', name:'وقت جيد مع العائلة',            description:'وقت ذو معنى مع أفراد العائلة',                  categoryId:'relationships', type:'boolean', enabled:true, order:0,  createdAt:'2026-01-01' },
  { id:'r2', name:'التواصل مع صديق',               description:'التواصل مع صديق أو شخص عزيز',                   categoryId:'relationships', type:'boolean', enabled:true, order:1,  createdAt:'2026-01-01' },
  { id:'r3', name:'التوازن بين العمل والحياة',     description:'تقييم التوازن بين العمل والحياة اليوم',           categoryId:'relationships', type:'rating',  enabled:true, order:2,  createdAt:'2026-01-01' },
  { id:'r4', name:'عمل لطيف',                     description:'فعل شيء طيب لشخص ما اليوم',                     categoryId:'relationships', type:'boolean', enabled:true, order:3,  createdAt:'2026-01-01' },
  { id:'r5', name:'الإشباع الاجتماعي',             description:'تقييم إحساسك بالتواصل الاجتماعي اليوم',          categoryId:'relationships', type:'rating',  enabled:true, order:4,  createdAt:'2026-01-01' },
];

const RATING_LABELS = {
  0:'غير مقيّم',1:'ضعيف جداً',2:'ضعيف',3:'أقل من المتوسط',4:'مقبول',
  5:'متوسط',6:'فوق المتوسط',7:'جيد',8:'جيد جداً',9:'ممتاز',10:'مثالي'
};
const RATING_COLORS = ['','#ef4444','#f97316','#f59e0b','#eab308','#84cc16','#22c55e','#10b981','#06b6d4','#6366f1','#8b5cf6'];
const MOTIVATIONAL_MESSAGES = [
  { text:'التحسينات اليومية الصغيرة هي مفتاح النتائج الكبيرة على المدى البعيد.', attr:'روبن شارما' },
  { text:'نحن ما نفعله بشكل متكرر. التميز إذن ليس فعلاً بل عادة.', attr:'أرسطو' },
  { text:'النجاح هو مجموع الجهود الصغيرة المتكررة يوماً بعد يوم.', attr:'روبرت كولير' },
  { text:'سر نجاحك يكمن في أجندتك اليومية.', attr:'جون ماكسويل' },
  { text:'الدافعية تبدأك، والعادة تُبقيك مستمراً.', attr:'جيم ريون' },
  { text:'لا ترتفع إلى مستوى أهدافك، بل تنخفض إلى مستوى أنظمتك.', attr:'جيمس كلير' },
  { text:'العادات هي الفائدة المركبة لتطوير الذات.', attr:'جيمس كلير' },
  { text:'بعد عام من الآن ستتمنى أنك بدأت اليوم.', attr:'كارين لامب' },
  { text:'الطريقة الوحيدة لعمل رائع هي أن تحب ما تفعله.', attr:'ستيف جوبز' },
  { text:'الانضباط هو الجسر بين الأهداف والإنجاز.', attr:'جيم رون' },
  { text:'كل فعل تقوم به هو صوت للشخص الذي تريد أن تصبح.', attr:'جيمس كلير' },
  { text:'افعل اليوم شيئاً يشكرك عليه نفسك في المستقبل.', attr:'شون فلانري' },
];
const COLOR_PRESETS = ['#4ade80','#60a5fa','#a78bfa','#fbbf24','#f472b6','#fb923c','#2dd4bf','#f87171','#e879f9','#34d399','#38bdf8','#facc15'];
const ICON_PRESETS  = ['💪','⚡','📚','🧠','❤️','💰','🙏','🏃','🎯','🎨','🎸','✈️','🌱','🔥','💡','🌟','💻','🍎','😴','🏋️','💧','🧘','🎓','📖','🚀','🎵'];

const TIMELINE_CATEGORIES = [
  { id:'personal',  name:'شخصي',      color:'#a78bfa', icon:'👤' },
  { id:'work',      name:'العمل',     color:'#60a5fa', icon:'💼' },
  { id:'health',    name:'الصحة',     color:'#4ade80', icon:'💪' },
  { id:'education', name:'التعليم',   color:'#fbbf24', icon:'📚' },
  { id:'travel',    name:'السفر',     color:'#2dd4bf', icon:'✈️' },
  { id:'milestone', name:'معلم مهم',  color:'#f472b6', icon:'🏆' },
  { id:'other',     name:'أخرى',      color:'#94a3b8', icon:'📌' },
];

const DEFAULT_TIMELINES = [
  { id:'tl_personal', name:'الحياة الشخصية', description:'معالم وأحداث الحياة الشخصية', color:'#a78bfa', icon:'👤', createdAt:'2026-01-01',
    events:[
      { id:'pe1', date:'2026-01-01', name:'عام جديد — بداية جديدة',         notes:'التزمت ببناء عادات يومية أفضل وتتبع أهداف الحياة بجدية.',           category:'milestone', icon:'🌟', important:true  },
      { id:'pe2', date:'2026-01-07', name:'بدأت تمارين الصباح',              notes:'بدأت نظام تمرين الساعة 5 صباحاً. الصباح الباكر يصنع نتائج كبيرة.', category:'health',    icon:'💪', important:false },
      { id:'pe3', date:'2026-02-14', name:'أكملت دورة تعليمية',              notes:'أنهيت دورة تطوير مواقع كاملة — أكثر من 40 ساعة تعلم مركّز.',       category:'education', icon:'🎓', important:false },
      { id:'pe4', date:'2026-04-01', name:'معلم 90 يوم صحة',                notes:'حافظت على سلسلة تمارين منتظمة لمدة 90 يوماً متواصلاً.',             category:'health',    icon:'🏆', important:true  },
      { id:'pe5', date:'2026-07-10', name:'رحلة الصيف المخططة',             notes:'حجزت رحلة عائلية طال انتظارها.',                                    category:'travel',    icon:'✈️', important:false },
    ]
  },
  { id:'tl_work', name:'العمل والمسيرة', description:'معالم المسيرة والإنجازات المهنية', color:'#60a5fa', icon:'💼', createdAt:'2026-01-01',
    events:[
      { id:'we1', date:'2026-01-20', name:'انطلاق مشروع جديد',    notes:'انطلقنا في مشروع عمل جديد ومثير مع الفريق.',                   category:'work',      icon:'🚀', important:false },
      { id:'we2', date:'2026-05-15', name:'يوم إطلاق المشروع',    notes:'أطلقنا المشروع بنجاح للإنتاج. معلم ضخم!',                      category:'milestone', icon:'🎉', important:true  },
      { id:'we3', date:'2026-06-01', name:'توسع الفريق',           notes:'انضم مهندسان جديدان للفريق. طاقة وزخم رائعان.',                category:'work',      icon:'👥', important:false },
    ]
  },
];

const TL_ICON_PRESETS  = ['🌟','🚀','🎯','🏆','💡','🔥','❤️','💪','📚','💼','✈️','🎓','🎉','🙏','💰','🏃','🧠','🎸','📖','🌱','🎨','🏋️','🌍','⚡','💻','🎵'];
const TL_TL_PRESETS    = ['🗓️','👤','💼','💪','📚','✈️','⚖️','🏠','🌍','🎓','💡','🎮','📈','🏋️','🎭','🧪'];
const TL_PX_PER_DAY   = 6;
const TL_MIN_WIDTH     = 900;
const TL_PADDING       = 80;
const TL_ZOOM_STEPS    = [0.25, 0.5, 0.75, 1, 1.5, 2, 3, 5, 8, 12];

/* ══════════════════════════════════════════
   2. مفاتيح التخزين والطبقة
══════════════════════════════════════════ */

const KEYS = {
  HABITS:       'hf_habits_v2',
  RECORDS:      'hf_records_v2',
  NOTES:        'hf_notes_v2',
  CATEGORIES:   'hf_categories_v2',
  SETTINGS:     'hf_settings_v2',
  TIMELINE:     'hf_timelines_v2',
  CHALLENGES:   'hf_challenges_v1',
  TASKS:        'hf_tasks_v1',
  TASKS_DONE:   'hf_tasks_done',
  JOURNAL:      'hf_journal_v1',
  ACHIEVEMENTS: 'hf_achievements_v1',
  BACKUP_SETTINGS: 'hf_backup_settings_v1',
  BACKUP_LAST_SYNC:'hf_backup_last_sync_v1',
  BACKUP_PRE_RESTORE:'hf_backup_pre_restore_v1',
};

const APP_VERSION = '0.1';
const BACKUP_VERSION = 1;
const BACKUP_AUTO_SYNC_DEBOUNCE_MS = 15000;
const ENABLE_ADMIN_PAGE = false;
const DEVELOPER_MODE_KEY = 'hf_developer_mode';
const ONBOARDING_DONE_KEY = 'hf_onboarding_done_v1';
const DEFAULT_APP_SETTINGS = {
  appName:'HabitFlow',
  weekStart:'monday',
  language:'ar',
  direction:'rtl',
  theme:'space',
  visualEffects:true,
  animatedBackground:true,
};

function isPlainObject(val) {
  return !!val && typeof val === 'object' && !Array.isArray(val);
}

function isBackupInternalKey(key) {
  return key===KEYS.BACKUP_SETTINGS || key===KEYS.BACKUP_LAST_SYNC || key===KEYS.BACKUP_PRE_RESTORE;
}

function canAccessAdminPage() {
  try {
    return ENABLE_ADMIN_PAGE || localStorage.getItem(DEVELOPER_MODE_KEY)==='true';
  } catch {
    return ENABLE_ADMIN_PAGE;
  }
}

function normalizeSettings(settings) {
  const next = { ...DEFAULT_APP_SETTINGS };
  if(!isPlainObject(settings)) return next;
  if(typeof settings.appName==='string' && settings.appName.trim()) next.appName=settings.appName.trim();
  if(settings.weekStart==='sunday' || settings.weekStart==='monday') next.weekStart=settings.weekStart;
  if(settings.language==='ar') next.language='ar';
  if(settings.direction==='rtl' || settings.direction==='ltr') next.direction=settings.direction;
  if(settings.theme==='space') next.theme='space';
  if(typeof settings.visualEffects==='boolean') next.visualEffects=settings.visualEffects;
  if(typeof settings.animatedBackground==='boolean') next.animatedBackground=settings.animatedBackground;
  return next;
}

const Storage = {
  _get(key)       { try { const r=localStorage.getItem(key); return r?JSON.parse(r):null; } catch { return null; } },
  _set(key,val)   {
    localStorage.setItem(key,JSON.stringify(val));
    if(!isBackupInternalKey(key)) queueBackupAutoSync(key);
  },

  getHabits()     { return this._get(KEYS.HABITS); },
  saveHabits(h)   { this._set(KEYS.HABITS,h); },

  getCategories() { return this._get(KEYS.CATEGORIES); },
  saveCategories(c){ this._set(KEYS.CATEGORIES,c); },

  getRecords()    { return this._get(KEYS.RECORDS)||{}; },
  saveRecords(r)  { this._set(KEYS.RECORDS,r); },

  getNotes()      { return this._get(KEYS.NOTES)||{}; },
  saveNotes(n)    { this._set(KEYS.NOTES,n); },

  getSettings()        { return normalizeSettings(this._get(KEYS.SETTINGS)); },
  saveSettings(s)      { this._set(KEYS.SETTINGS,normalizeSettings(s)); },
  getTimelines()       { return this._get(KEYS.TIMELINE); },
  saveTimelines(t)     { this._set(KEYS.TIMELINE,t); },
  getChallenges()      { return this._get(KEYS.CHALLENGES)||[]; },
  saveChallenges(c)    { this._set(KEYS.CHALLENGES,c); },
  getTasks()           { return this._get(KEYS.TASKS)||[]; },
  saveTasks(t)         { this._set(KEYS.TASKS,t); },
  getTasksDone()       { return this._get(KEYS.TASKS_DONE)||{}; },
  saveTasksDone(t)     { this._set(KEYS.TASKS_DONE,t); },
  getJournal()         { return this._get(KEYS.JOURNAL)||[]; },
  saveJournal(j)       { this._set(KEYS.JOURNAL,j); },
  getAchievements()    { return this._get(KEYS.ACHIEVEMENTS)||[]; },
  saveAchievements(a)  { this._set(KEYS.ACHIEVEMENTS,a); },
  getBackupSettings()  { return this._get(KEYS.BACKUP_SETTINGS)||{ webAppUrl:'', secretToken:'', autoSync:false }; },
  saveBackupSettings(s){ this._set(KEYS.BACKUP_SETTINGS,s); },
  getLastSyncInfo()    {
    return this._get(KEYS.BACKUP_LAST_SYNC)||{
      lastSuccessAt:null,
      lastAttemptAt:null,
      lastErrorAt:null,
      lastError:'',
      lastStatus:'idle',
      message:'',
      source:null,
    };
  },
  saveLastSyncInfo(info){ this._set(KEYS.BACKUP_LAST_SYNC,info); },
  getPreRestoreBackup(){ return this._get(KEYS.BACKUP_PRE_RESTORE); },
  savePreRestoreBackup(data){ this._set(KEYS.BACKUP_PRE_RESTORE,data); },

  getDayRecord(date) { return this.getRecords()[date]||{}; },
  setHabitValue(date,habitId,value) {
    const r=this.getRecords(); if(!r[date])r[date]={}; r[date][habitId]=value; this.saveRecords(r);
  },
  getDayNote(date) { return this.getNotes()[date]||''; },
  setDayNote(date,note) { const n=this.getNotes(); n[date]=note; this.saveNotes(n); },
};

/* ══════════════════════════════════════════
   3. أدوات مساعدة
══════════════════════════════════════════ */

const Utils = {
  pad: n=>String(n).padStart(2,'0'),
  toDateStr(d){ return `${d.getFullYear()}-${this.pad(d.getMonth()+1)}-${this.pad(d.getDate())}`; },
  today(){ return this.toDateStr(new Date()); },
  parseDate(s){ const[y,m,d]=s.split('-').map(Number); return new Date(y,m-1,d); },
  formatFull(s){ return this.parseDate(s).toLocaleDateString('ar',{weekday:'long',year:'numeric',month:'long',day:'numeric'}); },
  formatShort(s){ return this.parseDate(s).toLocaleDateString('ar',{month:'short',day:'numeric'}); },
  dayName(s){ return this.parseDate(s).toLocaleDateString('ar',{weekday:'short'}); },
  daysAgo(n){ const d=new Date(); d.setDate(d.getDate()-n); return this.toDateStr(d); },
  lastNDays(n){ return Array.from({length:n},(_,i)=>this.daysAgo(n-1-i)); },
  monthDates(y,m){ const days=[],d=new Date(y,m,1); while(d.getMonth()===m){days.push(this.toDateStr(d));d.setDate(d.getDate()+1);} return days; },
  uid(){ return 'u_'+Date.now()+'_'+Math.random().toString(36).slice(2,7); },
  el:  id=>document.getElementById(id),
  qs:  (s,c=document)=>c.querySelector(s),
  qsa: (s,c=document)=>[...c.querySelectorAll(s)],
  hexToRgba(hex,a){ const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16); return `rgba(${r},${g},${b},${a})`; },
  rafThrottle(fn){
    let rafId=null, lastArgs=null;
    return(...args)=>{
      lastArgs=args;
      if(rafId!==null) return;
      rafId=requestAnimationFrame(()=>{
        rafId=null;
        fn(...lastArgs);
      });
    };
  },
  esc: s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'),
};

/* ══════════════════════════════════════════
   4. حالة التطبيق
══════════════════════════════════════════ */

const State = {
  page:            'dashboard',
  dailyDate:       Utils.today(),
  reportPeriod:    'week',
  manageFilter:    'all',
  adminTab:        'overview',
  adminHabitFilter:'all',
  habits:          [],
  categories:      [],
  settings:        { ...DEFAULT_APP_SETTINGS },
  timelines:       [],
  activeTimelineId: null,
  challenges:      [],
  chFilter:        'all',
  chSearch:        '',
  chDetailId:      null,
  tlZoomIdx:       3,
  tlCatFilter:     'all',
  tlSearch:        '',
  tasks:           [],
  _taskCatFilter:  'all',
  journal:         [],
  achievements:    [],
  tasksDate:       Utils.today(),
  calYear:         new Date().getFullYear(),
  calMonth:        new Date().getMonth(),
  calSelectedDate: Utils.today(),
  achFilter:       'all',
  achSearch:       '',
  journalSearch:   '',
  journalMoodFilter:'all',
  authUser:        null,
  uid:             null,
  isSignedIn:      false,
  authLoading:     true,
};

/* ══════════════════════════════════════════
   5. دوال الوصول للفئات
══════════════════════════════════════════ */

function getCategories()       { return State.categories; }
function getActiveCategories() { return State.categories.filter(c=>c.enabled!==false); }
function getCatById(id)        { return State.categories.find(c=>c.id===id); }

function getAuthDisplayName(user) {
  if(!user) return 'غير مسجل';
  return user.displayName || user.email || 'مستخدم HabitFlow';
}

function getAuthAvatarMarkup(user) {
  const label = getAuthDisplayName(user);
  const initial = (label.trim().charAt(0) || 'H').toUpperCase();
  if(user?.photoURL) return `<img class="auth-avatar-image" src="${Utils.esc(user.photoURL)}" alt="${Utils.esc(label)}">`;
  return `<span class="auth-avatar-letter">${Utils.esc(initial)}</span>`;
}

function getCloudSyncSummary() {
  const backupSettings = loadBackupSettings();
  const lastSync = getLastSyncInfo();
  if(State.isSignedIn) {
    return 'تم تسجيل الدخول، ومزامنة العادات السحابية ستضاف في المرحلة القادمة.';
  }
  if(backupSettings.webAppUrl) {
    return lastSync.lastSuccessAt ? `آخر نسخة احتياطية ناجحة: ${formatDateTime(lastSync.lastSuccessAt)}` : 'النسخ الاحتياطي السحابي جاهز لكن لم يتم تنفيذ مزامنة بعد.';
  }
  return 'غير مفعّلة حالياً. يمكنك المتابعة محلياً أو إعداد النسخ الاحتياطي من الإعدادات.';
}

function getSafePage(page) {
  return page==='admin' && !canAccessAdminPage() ? 'dashboard' : page;
}

function isOnboardingDone() {
  try {
    return localStorage.getItem(ONBOARDING_DONE_KEY)==='true';
  } catch {
    return true;
  }
}

function markOnboardingDone() {
  try {
    localStorage.setItem(ONBOARDING_DONE_KEY,'true');
  } catch {}
}

function resetOnboarding() {
  try {
    localStorage.removeItem(ONBOARDING_DONE_KEY);
  } catch {}
}

function finishOnboarding() {
  markOnboardingDone();
  navigate('dashboard');
}

function renderSidebarAccountAction() {
  const slot = Utils.el('sidebar-account-slot');
  if(!slot) return;

  if(State.authLoading) {
    slot.innerHTML = `
      <button class="sidebar-account-link is-loading" type="button" disabled>
        <span class="sidebar-account-avatar">…</span>
        <span class="sidebar-account-text">
          <strong>جارٍ التحقق</strong>
          <small>ربط حالة الحساب</small>
        </span>
      </button>`;
    return;
  }

  if(State.isSignedIn && State.authUser) {
    slot.innerHTML = `
      <a class="sidebar-account-link" href="#" data-page="settings">
        <span class="sidebar-account-avatar">${getAuthAvatarMarkup(State.authUser)}</span>
        <span class="sidebar-account-text">
          <strong>${Utils.esc(getAuthDisplayName(State.authUser))}</strong>
          <small>فتح الحساب والإعدادات</small>
        </span>
      </a>`;
    return;
  }

  slot.innerHTML = `
    <a class="sidebar-account-link sidebar-account-cta" href="#" data-page="login">
      <span class="sidebar-account-avatar">🔐</span>
      <span class="sidebar-account-text">
        <strong>تسجيل الدخول</strong>
        <small>مزامنة تقدمك لاحقاً</small>
      </span>
    </a>`;
}

function renderMobileAuthNav() {
  const item = Utils.el('mob-auth-item');
  const label = Utils.el('mob-auth-label');
  const icon = Utils.el('mob-auth-icon');
  if(!item || !label || !icon) return;

  if(State.authLoading) {
    item.dataset.page = 'login';
    label.textContent = 'الحساب';
    icon.textContent = '…';
    return;
  }

  if(State.isSignedIn) {
    item.dataset.page = 'settings';
    label.textContent = 'الحساب';
    icon.textContent = '👤';
    return;
  }

  item.dataset.page = 'login';
  label.textContent = 'تسجيل الدخول';
  icon.textContent = '🔐';
}

function renderAuthSurfaces() {
  renderSidebarAccountAction();
  renderMobileAuthNav();
}

async function handleGoogleSignIn({ navigateToPage='settings' }={}) {
  if(!window.HabitFlowFirebase) {
    showToast('Firebase Auth غير جاهز حالياً.','error');
    return;
  }
  try {
    State.authLoading = true;
    renderAuthSurfaces();
    if(State.page==='login') renderLoginPage();
    const user = await window.HabitFlowFirebase.signInWithGoogle();
    updateAuthState(user);
    showToast('تم تسجيل الدخول بنجاح.','success');
    if(navigateToPage) navigate(navigateToPage);
  } catch(err) {
    State.authLoading = false;
    renderAuthSurfaces();
    if(State.page==='login') renderLoginPage();
    showToast(err?.message || 'فشل تسجيل الدخول عبر Google.','error');
  }
}

async function handleGoogleSignOut({ navigateToPage='login' }={}) {
  try {
    if(!window.HabitFlowFirebase) return;
    await window.HabitFlowFirebase.signOutFirebaseUser();
    updateAuthState(null);
    showToast('تم تسجيل الخروج.','success');
    if(navigateToPage) navigate(navigateToPage);
  } catch(err) {
    showToast(err?.message || 'فشل تسجيل الخروج.','error');
  }
}

function updateAuthState(user) {
  State.authUser = user || null;
  State.uid = user?.uid || null;
  State.isSignedIn = !!user;
  State.authLoading = false;
  renderAuthSurfaces();
  if(State.page==='login') renderLoginPage();
  if(State.page==='settings') renderSettingsPage();
}

function initFirebaseAuthBridge() {
  const firebaseApi = window.HabitFlowFirebase;
  if(!firebaseApi?.initFirebaseAuth) {
    State.authLoading = false;
    renderAuthSurfaces();
    if(State.page==='login') renderLoginPage();
    return;
  }

  firebaseApi.initFirebaseAuth(user => {
    updateAuthState(user);
  });

  updateAuthState(firebaseApi.getFirebaseCurrentUser?.() || null);
}

function applyAppSettings() {
  State.settings = normalizeSettings(State.settings);
  document.documentElement.lang = State.settings.language;
  document.documentElement.dir = State.settings.direction;
  document.body?.classList.toggle('effects-minimal', !State.settings.visualEffects);
  document.body?.classList.toggle('background-static', !State.settings.animatedBackground);
  const logoNameEl = Utils.qs('.logo-name');
  if(logoNameEl) logoNameEl.textContent = State.settings.appName || 'HabitFlow';
}

/* ══════════════════════════════════════════
   6. محرك الحسابات
══════════════════════════════════════════ */

const Compute = {
  activeHabits() {
    const activeCatIds = new Set(getActiveCategories().map(c=>c.id));
    return State.habits.filter(h=>h.enabled && activeCatIds.has(h.categoryId));
  },
  dayStats(date, habits=null) {
    habits = habits||this.activeHabits();
    const rec=Storage.getDayRecord(date);
    let completed=0,ratingSum=0,ratingCount=0;
    habits.forEach(h=>{
      const v=rec[h.id];
      if(h.type==='boolean'){ if(v===true)completed++; }
      else { if(v!=null&&v>0){completed++;ratingSum+=v;ratingCount++;} }
    });
    const total=habits.length;
    return { total, completed, missed:total-completed, pct:total>0?Math.round((completed/total)*100):0, avgRating:ratingCount>0?+(ratingSum/ratingCount).toFixed(1):null };
  },
  categoryDayStats(catId, date, habits=null) {
    habits = habits||this.activeHabits();
    return this.dayStats(date, habits.filter(h=>h.categoryId===catId));
  },
  bestWeakCategories(date) {
    const results=getActiveCategories().map(cat=>({...cat,stats:this.categoryDayStats(cat.id,date)})).filter(c=>c.stats.total>0);
    if(!results.length)return{best:null,weak:null};
    const sorted=[...results].sort((a,b)=>b.stats.pct-a.stats.pct);
    return{best:sorted[0],weak:sorted[sorted.length-1]};
  },
  streak(habitId) {
    const habit=State.habits.find(h=>h.id===habitId); if(!habit)return 0;
    let streak=0; const d=new Date();
    for(let i=0;i<365;i++){
      const ds=Utils.toDateStr(d),v=Storage.getDayRecord(ds)[habitId];
      const done=habit.type==='boolean'?v===true:(v!=null&&v>0);
      if(!done)break; streak++; d.setDate(d.getDate()-1);
    }
    return streak;
  },
  weeklyData() {
    return Utils.lastNDays(7).map(date=>({date,label:Utils.dayName(date),shortDate:Utils.formatShort(date),stats:this.dayStats(date)}));
  },
  monthlyData() {
    const now=new Date();
    return Utils.monthDates(now.getFullYear(),now.getMonth()).map(date=>({date,stats:this.dayStats(date)}));
  },
  categoryWeeklyStats() {
    const days=Utils.lastNDays(7);
    return getActiveCategories().map(cat=>{
      const ds=days.map(d=>this.categoryDayStats(cat.id,d));
      return{...cat,avgPct:Math.round(ds.reduce((s,st)=>s+st.pct,0)/days.length)};
    });
  },
  topStreaks(n=6) {
    return this.activeHabits().map(h=>({habit:h,streak:this.streak(h.id)}))
      .sort((a,b)=>b.streak-a.streak).slice(0,n);
  },
  bestWeakDays(dayData) {
    const filled=dayData.filter(d=>d.stats.total>0);
    if(!filled.length)return{best:null,weak:null};
    const s=[...filled].sort((a,b)=>b.stats.pct-a.stats.pct);
    return{best:s[0],weak:s[s.length-1]};
  },
  todayMessage() {
    const d=new Date(),doy=Math.floor((d-new Date(d.getFullYear(),0,0))/86400000);
    return MOTIVATIONAL_MESSAGES[doy%MOTIVATIONAL_MESSAGES.length];
  },
};

/* ══════════════════════════════════════════
   7. الموجه
══════════════════════════════════════════ */

function navigate(page) {
  page=getSafePage(page);
  if(State.page===page) return;
  State.page=page;
  // تحديث مؤشرات التنقل فوراً
  Utils.qsa('.nav-item,.mob-item,.mob-more-item').forEach(el=>el.classList.toggle('active',el.dataset.page===page));
  // إخفاء كل الصفحات بدون تشغيل الأنيميشن
  Utils.qsa('.page').forEach(p=>p.classList.remove('active'));
  // رندر المحتوى أولاً بينما الصفحة مخفية (display:none)
  renderPage(page);
  UIEnhancer.refresh(page);
  // إظهار الصفحة بعد إطار واحد — المحتوى جاهز الآن
  requestAnimationFrame(()=>{
    const t=Utils.el(`page-${page}`); if(t) t.classList.add('active');
  });
}

function renderPage(page) {
  page=getSafePage(page);
  switch(page){
    case 'dashboard':    renderDashboard();    break;
    case 'daily':        renderDaily();        break;
    case 'categories':   renderCategories();   break;
    case 'reports':      renderReports();      break;
    case 'manage':       renderManage();       break;
    case 'admin':        renderAdmin();        break;
    case 'timeline':     renderTimeline();     break;
    case 'challenges':   renderChallenges();   break;
    case 'tasks':        renderTasks();        break;
    case 'calendar':     renderCalendar();     break;
    case 'achievements': renderAchievements(); break;
    case 'journal':      renderJournal();      break;
    case 'onboarding':   renderOnboardingPage(); break;
    case 'login':        renderLoginPage();    break;
    case 'settings':     renderSettingsPage(); break;
  }
}

const UIEnhancer = {
  accentMap: {
    dashboard:    'rgba(124,58,237,.24)',
    daily:        'rgba(74,222,128,.18)',
    categories:   'rgba(244,114,182,.18)',
    reports:      'rgba(96,165,250,.2)',
    manage:       'rgba(251,191,36,.18)',
    admin:        'rgba(167,139,250,.22)',
    timeline:     'rgba(45,212,191,.18)',
    challenges:   'rgba(249,115,22,.18)',
    tasks:        'rgba(52,211,153,.18)',
    calendar:     'rgba(96,165,250,.2)',
    achievements: 'rgba(251,191,36,.24)',
    journal:      'rgba(244,114,182,.18)',
    login:        'rgba(124,58,237,.22)',
    settings:     'rgba(99,149,255,.2)',
  },
  revealObserver: null,
  init() {
    this.bindSpotlight();
    this.createRevealObserver();
    this.observeRenders();
    this.refresh(State.page);
  },
  bindSpotlight() {
    // على الموبايل (touch-only) لا يوجد cursor — الـ gradient يُشغَّل من القيم الافتراضية ويُخفى عبر CSS
    if(window.matchMedia('(hover: none)').matches) return;
    const root=document.documentElement;
    const update=Utils.rafThrottle((clientX,clientY)=>{
      const x=(clientX / window.innerWidth) * 100;
      const y=(clientY / window.innerHeight) * 100;
      root.style.setProperty('--cursor-x', `${x.toFixed(2)}%`);
      root.style.setProperty('--cursor-y', `${y.toFixed(2)}%`);
    });
    window.addEventListener('pointermove', e=>update(e.clientX,e.clientY), { passive:true });
  },
  createRevealObserver() {
    if(!('IntersectionObserver' in window)) return;
    this.revealObserver = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          this.revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
  },
  observeRenders() {
    // تم حذف MutationObserver — كان يعيد تشغيل refresh() عند كل تغيير DOM
    // مما يُسبب إضافة reveal-item بدون is-visible فيحدث الوميض
    // navigate() يستدعي refresh() صراحةً، وكذلك observeNewItems() داخل دوال الرندر
  },
  refresh(page=State.page) {
    document.documentElement.style.setProperty('--page-accent', this.accentMap[page] || this.accentMap.dashboard);
    const pageEl=Utils.el(`page-${page}`);
    if(!pageEl) return;
    const selectors=[
      '.glass-card','.daily-progress-bar-wrap','.habit-card','.category-section',
      '.report-card','.manage-habit-row','.admin-stat-card','.admin-mini-card',
      '.settings-card','.backup-card','.tl-sel-card','.tl-table-section',
      '.ch-stat-card','.ch-card','.page-header','.login-hero-card',
      '.settings-page-card','.settings-account-card','.about-app-card'
    ];
    const items=Utils.qsa(selectors.join(','), pageEl);
    // هل الصفحة مخفية الآن؟ (نرندر قبل إظهارها في navigate)
    const pageHidden=!pageEl.classList.contains('active');
    items.forEach((item,idx)=>{
      const wasAnimated=item.classList.contains('reveal-item');
      item.classList.add('card-interactive','reveal-item');
      this.bindCardGlow(item);
      // إذا العنصر عنده is-visible بالفعل، لا تُعيد تشغيل الأنيميشن
      if(item.classList.contains('is-visible')) return;
      item.style.setProperty('--reveal-delay', `${Math.min(idx * 40, 240)}ms`);
      if(pageHidden || wasAnimated){
        // صفحة مخفية أو عنصر جديد على صفحة ستُعاد: أضف is-visible فوراً
        item.classList.add('is-visible');
      } else if(this.revealObserver){
        this.revealObserver.observe(item);
      } else {
        item.classList.add('is-visible');
      }
    });
  },
  bindCardGlow(card) {
    if(card.dataset.enhanced==='1') return;
    card.dataset.enhanced='1';
    const move=Utils.rafThrottle((clientX,clientY)=>{
      const rect=card.getBoundingClientRect();
      const x=((clientX - rect.left) / rect.width) * 100;
      const y=((clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', `${x.toFixed(2)}%`);
      card.style.setProperty('--my', `${y.toFixed(2)}%`);
    });
    card.addEventListener('pointermove', e=>move(e.clientX,e.clientY), { passive:true });
  },
  observeNewItems(container) {
    if(!container) return;
    const items=Utils.qsa('.reveal-item', container);
    items.forEach((item,idx)=>{
      if(!item.style.getPropertyValue('--reveal-delay'))
        item.style.setProperty('--reveal-delay', `${Math.min(idx*40,200)}ms`);
      if(!item.classList.contains('is-visible')){
        if(this.revealObserver) this.revealObserver.observe(item);
        else item.classList.add('is-visible');
      }
      if(item.classList.contains('card-interactive')) this.bindCardGlow(item);
    });
  },
};

/* ══════════════════════════════════════════
   8. لوحة التحكم
══════════════════════════════════════════ */

function buildSmartSummary(pct, focusHabit, weakCatWeek, isGoodWeek, habits) {
  if(!habits.length) return 'ابدأ بإضافة عاداتك الأولى لتفعيل التحليل الذكي.';
  if(pct===100) return 'أنجزت كل عاداتك اليوم — يوم مثالي! 🌟';
  if(pct>=80&&isGoodWeek) return 'أداؤك ممتاز هذا الأسبوع. استمر على هذا الإيقاع!';
  if(weakCatWeek&&!isGoodWeek&&focusHabit)
    return `ركّز اليوم على "${Utils.esc(focusHabit.habit.name)}" وجانب ${Utils.esc(weakCatWeek.name)}.`;
  if(weakCatWeek&&!isGoodWeek)
    return `جانب ${Utils.esc(weakCatWeek.name)} يحتاج انتباهاً هذا الأسبوع.`;
  if(focusHabit&&pct>0) return `لديك فرصة لإنهاء اليوم بنسبة أعلى — "${Utils.esc(focusHabit.habit.name)}" لم تُنجز بعد.`;
  if(pct>0) return 'لديك فرصة لإنهاء اليوم بنسبة 100% — واصل!';
  return 'ابدأ بعادة واحدة الآن. الاتساق هو السر.';
}

function renderDashboard() {
  const date=Utils.today(),habits=Compute.activeHabits(),stats=Compute.dayStats(date);
  const{best,weak}=Compute.bestWeakCategories(date),msg=Compute.todayMessage();
  const record=Storage.getDayRecord(date),pct=stats.pct;
  const todayTasks=getTasksForDate(date);
  const tasksDone=Storage.getTasksDone();
  const doneTodayIds=tasksDone[date]||[];
  const doneCount=todayTasks.filter(t=>doneTodayIds.includes(t.id||t.title)).length;
  const lastJournal=State.journal[0];
  const lastAch=State.achievements[0];

  // ── تحليل ذكي للـ Dashboard ──
  const weekDays=Utils.lastNDays(7);
  const habitWeekStats=getHabitPeriodStats(weekDays);
  const undoneHabits=habitWeekStats.filter(hs=>{
    const v=record[hs.habit.id];
    return !(hs.habit.type==='boolean'?v===true:(v!=null&&v>0));
  }).sort((a,b)=>a.pct-b.pct);
  const focusHabit=undoneHabits[0]||null;
  const PRIO={'high':0,'medium':1,'low':2};
  const pendingTasks=todayTasks.filter(t=>!doneTodayIds.includes(t.id||t.title))
    .sort((a,b)=>(PRIO[a.priority]||1)-(PRIO[b.priority]||1));
  const topTask=pendingTasks[0]||null;
  const catWeekArr=Compute.categoryWeeklyStats().sort((a,b)=>a.avgPct-b.avgPct);
  const weakCatWeek=catWeekArr.length>0?catWeekArr[0]:null;
  const isGoodWeek=!weakCatWeek||weakCatWeek.avgPct>=60;
  const PRIOLBL={'high':'🔴 عالية','medium':'🟡 متوسطة','low':'🟢 عادية'};
  const smartSummary=buildSmartSummary(pct,focusHabit,weakCatWeek,isGoodWeek,habits);

  const circum=2*Math.PI*54,offset=circum*(1-pct/100);
  Utils.el('dashboard-date-label').textContent=Utils.formatFull(date);
  Utils.el('dashboard-content').innerHTML=`
    <div class="dash-hero">
      <div class="glass-card ring-card">
        <div class="progress-ring-wrap">
          <svg width="150" height="150" viewBox="0 0 150 150">
            <defs><linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#c4b5fd"/><stop offset="100%" stop-color="#818cf8"/></linearGradient></defs>
            <circle class="ring-bg" cx="75" cy="75" r="54" fill="none" stroke-width="10"/>
            <circle class="ring-fill" cx="75" cy="75" r="54" fill="none" stroke-width="10"
              stroke-dasharray="${circum.toFixed(2)}" stroke-dashoffset="${offset.toFixed(2)}"
              style="stroke:url(#ringGrad);stroke-linecap:round"/>
          </svg>
          <div class="ring-label"><span class="ring-pct">${pct}%</span><span class="ring-sub">مكتمل</span></div>
        </div>
        <div class="ring-title">تقدم اليوم</div>
      </div>
      <div class="stats-grid">
        <div class="glass-card stat-card" style="--cat-glow:rgba(74,222,128,.15)"><div class="stat-icon">✅</div><div class="stat-value" style="color:#4ade80">${stats.completed}</div><div class="stat-label">مكتملة</div></div>
        <div class="glass-card stat-card" style="--cat-glow:rgba(248,113,113,.15)"><div class="stat-icon">❌</div><div class="stat-value" style="color:#f87171">${stats.missed}</div><div class="stat-label">فائتة</div></div>
        <div class="glass-card stat-card" style="--cat-glow:rgba(251,191,36,.15)"><div class="stat-icon">⭐</div><div class="stat-value" style="color:#fbbf24">${stats.avgRating??'—'}</div><div class="stat-label">متوسط التقييم</div></div>
        <div class="glass-card stat-card" style="--cat-glow:rgba(167,139,250,.15)"><div class="stat-icon">📊</div><div class="stat-value" style="color:#a78bfa">${habits.length}</div><div class="stat-label">إجمالي العادات</div></div>
      </div>
    </div>
    <div class="category-row">
      ${best?`<div class="glass-card cat-mini-card" style="border-color:${best.color}33"><div class="cat-mini-label">🏆 أفضل جانب</div><div class="cat-mini-body"><span class="cat-mini-icon" aria-hidden="true">${Utils.esc(best.icon)}</span><div class="cat-mini-copy"><div class="cat-mini-name" style="color:${best.color}">${Utils.esc(best.name)}</div><div class="cat-mini-pct">${best.stats.pct}% اكتمال</div></div></div></div>`:`<div class="glass-card cat-mini-card"><div class="cat-mini-label">🏆 أفضل جانب</div><div class="cat-mini-name" style="color:var(--text-3)">لا توجد بيانات بعد</div></div>`}
      ${weak?`<div class="glass-card cat-mini-card" style="border-color:${weak.color}33"><div class="cat-mini-label">💡 يحتاج اهتماماً</div><div class="cat-mini-body"><span class="cat-mini-icon" aria-hidden="true">${Utils.esc(weak.icon)}</span><div class="cat-mini-copy"><div class="cat-mini-name" style="color:${weak.color}">${Utils.esc(weak.name)}</div><div class="cat-mini-pct">${weak.stats.pct}% اكتمال</div></div></div></div>`:`<div class="glass-card cat-mini-card"><div class="cat-mini-label">💡 يحتاج اهتماماً</div><div class="cat-mini-name" style="color:var(--text-3)">لا توجد بيانات بعد</div></div>`}
    </div>
    <div class="dash-coach-wrap">
      <div class="dash-smart-banner">
        <span class="dsb-icon">🧠</span>
        <span class="dsb-text">${smartSummary}</span>
      </div>
      <div class="dash-insights-row">
        <div class="glass-card dash-ic">
          <div class="dic-head"><span class="dic-head-icon" aria-hidden="true">✅</span><span class="dic-head-label">مهمة اليوم الأهم</span></div>
          ${topTask
            ?`<div class="dic-name">${Utils.esc(topTask.title)}</div><div class="dic-sub">${PRIOLBL[topTask.priority]||'—'}${pendingTasks.length>1?` · ${pendingTasks.length} متبقية`:''}</div>`
            :`<div class="dic-empty">لا توجد مهام اليوم.<br>أضف مهمة لتبدأ يومك.</div>`}
        </div>
        <div class="glass-card dash-ic">
          <div class="dic-head"><span class="dic-head-icon" aria-hidden="true">🎯</span><span class="dic-head-label">لا تفوتها اليوم</span></div>
          ${focusHabit
            ?`<div class="dic-name">${Utils.esc(focusHabit.habit.name)}</div><div class="dic-sub">${focusHabit.pct<40?'الأضعف هذا الأسبوع':focusHabit.streak>0?`سلسلة ${focusHabit.streak} يوم`:'لم تُنجز بعد اليوم'}</div>`
            :`<div class="dic-empty">كل عاداتك اليوم أنجزت! 🎉</div>`}
        </div>
        <div class="glass-card dash-ic">
          <div class="dic-head"><span class="dic-head-icon" aria-hidden="true">💡</span><span class="dic-head-label">تنبيه الأسبوع</span></div>
          ${isGoodWeek
            ?`<div class="dic-name" style="color:#4ade80">أداؤك متوازن</div><div class="dic-sub">استمر على هذا الإيقاع 👍</div>`
            :weakCatWeek
              ?`<div class="dic-name dic-name-with-icon"><span class="dic-name-icon" aria-hidden="true">${Utils.esc(weakCatWeek.icon)}</span><span>${Utils.esc(weakCatWeek.name)}</span></div><div class="dic-sub">${weakCatWeek.avgPct}% هذا الأسبوع — يحتاج اهتماماً</div>`
              :`<div class="dic-empty">لا توجد بيانات كافية بعد.</div>`}
        </div>
      </div>
    </div>
    <div class="glass-card motive-card">
      <p class="motive-text">${msg.text}</p>
      <p class="motive-attr">— ${msg.attr}</p>
    </div>
    <div class="section-title" style="font-size:15px;font-weight:700;margin-bottom:14px">عادات اليوم</div>
    <div class="quick-grid">
      ${habits.length===0?'<p style="color:var(--text-3);font-size:14px">لم يتم إعداد عادات. <a href="#" data-page="admin" style="color:#a78bfa">أضف بعضها →</a></p>':
        habits.map(h=>{
          const cat=getCatById(h.categoryId),v=record[h.id];
          let valHtml='',cardClass='';
          if(h.type==='boolean'){
            if(v===true){valHtml=`<span class="quick-val val-done">✓</span>`;cardClass='is-done';}
            else if(v===false){valHtml=`<span class="quick-val val-miss">✗</span>`;cardClass='is-skipped';}
            else valHtml=`<span class="quick-val val-skip">–</span>`;
          }else{
            if(v>0){valHtml=`<span class="quick-val" style="color:${RATING_COLORS[v]}">${v}/10</span>`;if(v>=7)cardClass='is-done';}
            else valHtml=`<span class="quick-val val-skip">–</span>`;
          }
          return`<div class="glass-card quick-habit-card ${cardClass}"><div class="quick-dot" style="background:${cat?.color||'#888'}"></div><div class="quick-info"><div class="quick-name">${Utils.esc(h.name)}</div><div class="quick-cat">${Utils.esc(cat?.name||'')}</div></div>${valHtml}</div>`;
        }).join('')}
    </div>
    <div class="dashboard-new-modules reveal-item">
      <div class="db-modules-grid">
        <div class="glass-card db-module-card card-interactive" data-page="tasks">
          <div class="db-module-icon">✅</div>
          <div class="db-module-info">
            <div class="db-module-title">المهام اليومية</div>
            <div class="db-module-stat">${doneCount} / ${todayTasks.length} مكتملة اليوم</div>
          </div>
          <svg viewBox="0 0 24 24" fill="none" width="16" height="16" class="db-module-arrow"><path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div class="glass-card db-module-card card-interactive" data-page="journal">
          <div class="db-module-icon">📖</div>
          <div class="db-module-info">
            <div class="db-module-title">المذكرات</div>
            <div class="db-module-stat">${lastJournal?`آخر: ${Utils.formatShort(lastJournal.date)}`:`${State.journal.length} تدوينة`}</div>
          </div>
          <svg viewBox="0 0 24 24" fill="none" width="16" height="16" class="db-module-arrow"><path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div class="glass-card db-module-card card-interactive" data-page="achievements">
          <div class="db-module-icon">🏆</div>
          <div class="db-module-info">
            <div class="db-module-title">الإنجازات</div>
            <div class="db-module-stat">${lastAch?`آخر: ${Utils.esc(lastAch.icon||'')} ${Utils.esc(lastAch.title.slice(0,20))}`:`${State.achievements.length} إجمالي`}</div>
          </div>
          <svg viewBox="0 0 24 24" fill="none" width="16" height="16" class="db-module-arrow"><path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div class="glass-card db-module-card card-interactive" data-page="calendar">
          <div class="db-module-icon">📅</div>
          <div class="db-module-info">
            <div class="db-module-title">التقويم</div>
            <div class="db-module-stat">${new Date().toLocaleDateString('ar',{month:'long',year:'numeric'})}</div>
          </div>
          <svg viewBox="0 0 24 24" fill="none" width="16" height="16" class="db-module-arrow"><path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
      </div>
    </div>`;
}

/* ══════════════════════════════════════════
   9. تسجيل اليوم
══════════════════════════════════════════ */

function renderDaily() {
  const date=State.dailyDate,habits=Compute.activeHabits(),stats=Compute.dayStats(date),record=Storage.getDayRecord(date),note=Storage.getDayNote(date);
  const uncategorizedHabits=habits.filter(h=>!getCatById(h.categoryId));
  const byCategory=[
    ...getActiveCategories().map(cat=>({cat,habits:habits.filter(h=>h.categoryId===cat.id)})),
    ...(uncategorizedHabits.length?[{cat:{id:'general',name:'عام',icon:'✦',color:'#94a3b8'},habits:uncategorizedHabits}]:[])
  ].filter(g=>g.habits.length>0);
  const motivation=dailyProgressMessage(stats);
  const progressStroke=Math.max(0, Math.min(100, stats.pct));
  Utils.el('daily-content').innerHTML=`
    <div class="daily-summary-card glass-card reveal-item">
      <div class="daily-summary-main">
        <div class="daily-summary-copy">
          <div class="daily-summary-kicker">تسجيل اليوم</div>
          <div class="daily-summary-date">${Utils.formatFull(date)}</div>
          <div class="daily-summary-stats">أنجزت <span id="daily-completed-count">${stats.completed}</span> من <span id="daily-total-count">${stats.total}</span> عادة — <span id="daily-pct-inline">${stats.pct}%</span></div>
          <div class="daily-summary-message" id="daily-progress-message">${motivation}</div>
        </div>
        <div class="daily-summary-ring-wrap">
          <div class="daily-summary-ring" id="daily-summary-ring" style="--daily-progress:${progressStroke}%">
            <div class="daily-summary-ring-inner">
              <strong id="daily-pct-ring">${stats.pct}%</strong>
              <span>إنجاز اليوم</span>
            </div>
          </div>
        </div>
      </div>
      <div class="daily-progress-bar-wrap">
        <div class="dp-text">
          <div class="dp-title">التقدم الحالي</div>
          <div class="dp-bar-track"><div class="dp-bar-fill" id="daily-progress-fill" style="width:${stats.pct}%"></div></div>
        </div>
        <div class="dp-pct" id="daily-pct-side">${stats.pct}%</div>
      </div>
    </div>
    ${habits.length===0?`<div class="glass-card daily-empty-card reveal-item">
      <div class="daily-empty-icon">✦</div>
      <div class="daily-empty-title">لا توجد عادات حالياً</div>
      <div class="daily-empty-body">ابدأ بإضافة عادة بسيطة لتسجيلها يومياً.</div>
      <div class="daily-empty-actions">
        <button class="btn-primary" data-page="manage">الانتقال إلى إدارة العادات</button>
      </div>
    </div>`:''}
    ${byCategory.map(({cat,habits})=>{
      const cs=Compute.categoryDayStats(cat.id,date,habits);
      const boolIds=habits.filter(h=>h.type==='boolean').map(h=>h.id).join(',');
      return`<div class="category-section">
        <div class="cat-section-header"><div class="cat-section-dot" style="background:${cat.color}"></div><span style="font-size:19px">${Utils.esc(cat.icon)}</span><span class="cat-section-name">${Utils.esc(cat.name)}</span><span class="cat-section-count">${cs.completed}/${cs.total}</span>${boolIds?`<button class="cat-complete-btn" data-habits="${boolIds}" data-catname="${Utils.esc(cat.name)}">✓ إنجاز الجانب</button>`:''}</div>
        <div class="habits-grid">${habits.sort((a,b)=>(a.order||0)-(b.order||0)).map(h=>renderHabitCard(h,record[h.id],cat)).join('')}</div>
      </div>`;
    }).join('')}
    ${habits.length>0?`<div class="daily-bulk-bar"><button class="daily-complete-all-btn" id="daily-complete-all">⚡ إنجاز كل العادات دفعة واحدة</button></div>`:''}
    <div class="daily-notes-wrap"><label>📝 ملاحظات اليوم</label>
      <textarea class="daily-notes-textarea" id="daily-notes-input" placeholder="كيف كان يومك؟ ما سبب نجاحك أو ما الذي أعاقك اليوم؟">${Utils.esc(note)}</textarea>
    </div>
    <div class="daily-actions">
      <button class="btn-ghost" id="daily-reset-btn">إعادة ضبط اليوم</button>
      <button class="btn-ghost" id="daily-save-btn">حفظ التقدم</button>
      <button class="btn-primary" id="daily-save-continue">حفظ ومتابعة ←</button>
    </div>`;
  // ربط أزرار نعم/لا
  Utils.qsa('.bool-btn').forEach(btn=>btn.addEventListener('click',()=>{
    const habitId=btn.dataset.habit,val=btn.dataset.val==='true';
    Storage.setHabitValue(date,habitId,val);
    const card=btn.closest('.habit-card');
    card.classList.remove('is-done','is-skipped');
    card.querySelectorAll('.bool-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    if(val)card.classList.add('is-done'); else card.classList.add('is-skipped');
    updateDailyProgress();
  }));
  // ربط أزرار التقييم
  Utils.qsa('.rating-num').forEach(num=>num.addEventListener('click',()=>{
    const habitId=num.dataset.habit,val=parseInt(num.dataset.val);
    Storage.setHabitValue(date,habitId,val);
    const scale=num.closest('.rating-scale');
    scale.querySelectorAll('.rating-num').forEach(n=>{n.classList.remove('active');n.style.background='';});
    num.classList.add('active'); num.style.background=RATING_COLORS[val];
    const lbl=scale.querySelector('.rating-label');
    if(lbl){lbl.textContent=RATING_LABELS[val];lbl.style.color=RATING_COLORS[val];}
    const card=num.closest('.habit-card');
    card.classList.remove('is-done','is-skipped');
    if(val>=7)card.classList.add('is-done');
    updateDailyProgress();
  }));
  Utils.el('daily-save-btn')?.addEventListener('click',()=>{
    Storage.setDayNote(date,Utils.el('daily-notes-input')?.value||'');
    showToast('تم حفظ التقدم! 🎉','success');
  });
  Utils.el('daily-save-continue')?.addEventListener('click',()=>{
    Storage.setDayNote(date,Utils.el('daily-notes-input')?.value||'');
    showToast('تم الحفظ! 🎉','success');
    navigate('dashboard');
  });
  Utils.el('daily-reset-btn')?.addEventListener('click',()=>{
    showConfirm({title:'إعادة ضبط اليوم؟',body:'حذف جميع سجلات العادات لهذا اليوم؟',okLabel:'إعادة ضبط',onOk:()=>{
      const r=Storage.getRecords(); delete r[date]; Storage.saveRecords(r);
      Storage.setDayNote(date,''); renderDaily(); UIEnhancer.refresh('daily'); showToast('تم إعادة ضبط اليوم.','');
    }});
  });
  Utils.qsa('.cat-complete-btn').forEach(btn=>btn.addEventListener('click',()=>{
    const ids=btn.dataset.habits.split(',').filter(Boolean);
    const catName=btn.dataset.catname;
    ids.forEach(id=>Storage.setHabitValue(date,id,true));
    ids.forEach(id=>{
      const doneBtn=document.querySelector(`.bool-btn-done[data-habit="${id}"]`);
      const skipBtn=document.querySelector(`.bool-btn-skip[data-habit="${id}"]`);
      if(doneBtn){
        const card=doneBtn.closest('.habit-card');
        card.classList.add('is-done');card.classList.remove('is-skipped');
        doneBtn.classList.add('active');
        if(skipBtn)skipBtn.classList.remove('active');
        const pill=card.querySelector('.habit-status-pill');
        if(pill){pill.textContent='تم اليوم';pill.className='habit-status-pill is-done';}
      }
    });
    const sec=btn.closest('.category-section');
    const catCount=sec?.querySelector('.cat-section-count');
    if(catCount){const t=sec.querySelectorAll('.habit-card').length,d=sec.querySelectorAll('.habit-card.is-done').length;catCount.textContent=`${d}/${t}`;}
    updateDailyProgress();
    showToast(`تم إنجاز "${catName}" بالكامل ✅`,'success');
  }));
  Utils.el('daily-complete-all')?.addEventListener('click',()=>{
    showConfirm({title:'إنجاز كل العادات؟',body:'سيتم تعليم جميع عادات اليوم البوليانية كمنجزة.',okLabel:'نعم، إنجاز الكل',onOk:()=>{
      habits.filter(h=>h.type==='boolean').forEach(h=>Storage.setHabitValue(date,h.id,true));
      renderDaily(); UIEnhancer.refresh('daily'); showToast('تم إنجاز كل عادات اليوم! 🌟','success');
    }});
  });
}

function renderHabitCard(h,value,cat) {
  let isDone=false,isSkipped=false,controlHtml='';
  let statusLabel='بانتظار التسجيل';
  let statusClass='is-idle';
  if(h.type==='boolean'){
    isDone=value===true; isSkipped=value===false;
    statusLabel=isDone?'تم اليوم':isSkipped?'تم الإلغاء':'بانتظار التسجيل';
    statusClass=isDone?'is-done':isSkipped?'is-skipped':'is-idle';
    controlHtml=`<div class="bool-btns">
      <button class="bool-btn bool-btn-done ${isDone?'active':''}" data-habit="${h.id}" data-val="true">
        <svg viewBox="0 0 24 24" fill="none" width="13" height="13"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>تم</button>
      <button class="bool-btn bool-btn-skip ${isSkipped?'active':''}" data-habit="${h.id}" data-val="false">
        <svg viewBox="0 0 24 24" fill="none" width="13" height="13"><path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>إلغاء</button>
    </div>`;
  } else {
    const cur=value>0?value:0; isDone=cur>=7;
    statusLabel=cur>0?`التقييم الحالي: ${cur}/10`:'اختر تقييماً لليوم';
    statusClass=cur>0?(isDone?'is-done':'is-progress'):'is-idle';
    const nums=Array.from({length:10},(_,i)=>i+1).map(n=>{
      const isA=n===cur,bg=isA?`background:${RATING_COLORS[n]};border-color:transparent;color:#fff;transform:scale(1.12) translateY(-2px)`:''; 
      return`<button class="rating-num ${isA?'active':''}" data-habit="${h.id}" data-val="${n}" style="${bg}">${n}</button>`;
    }).join('');
    controlHtml=`<div class="rating-scale"><div class="rating-nums">${nums}</div>
      <div class="rating-label" style="color:${cur?RATING_COLORS[cur]:'var(--text-3)'}">${RATING_LABELS[cur]}</div></div>`;
  }
  return`<div class="habit-card ${isDone?'is-done':''} ${isSkipped?'is-skipped':''}">
    <div class="habit-card-header">
      <div class="habit-card-copy">
        <div class="habit-name">${Utils.esc(h.name)}</div>
        <div class="habit-status-line">
          <span class="habit-status-pill ${statusClass}">${statusLabel}</span>
          <span class="habit-type-badge">${h.type==='boolean'?'نعم/لا':'تقييم'}</span>
        </div>
      </div>
    </div>
    ${controlHtml}</div>`;
}

function dailyProgressMessage(stats) {
  if(!stats.total) return 'ابدأ بإضافة عادتك الأولى لتصنع إيقاع يومك.';
  if(stats.pct===100) return 'رائع! أكملت جميع عادات اليوم';
  if(stats.pct>=75) return 'يوم قوي، واصل';
  if(stats.pct>=50) return 'ممتاز، استمر بهذا الإيقاع';
  if(stats.pct>0) return 'خطوة جميلة اليوم';
  return 'بداية بسيطة اليوم تصنع فرقاً كبيراً لاحقاً.';
}

function updateDailyProgress() {
  const s=Compute.dayStats(State.dailyDate);
  const fill=Utils.el('daily-progress-fill');
  const sidePct=Utils.el('daily-pct-side');
  const ringPct=Utils.el('daily-pct-ring');
  const inlinePct=Utils.el('daily-pct-inline');
  const completed=Utils.el('daily-completed-count');
  const total=Utils.el('daily-total-count');
  const msg=Utils.el('daily-progress-message');
  const ring=Utils.el('daily-summary-ring');
  if(fill) fill.style.width=s.pct+'%';
  if(sidePct) sidePct.textContent=s.pct+'%';
  if(ringPct) ringPct.textContent=s.pct+'%';
  if(inlinePct) inlinePct.textContent=s.pct+'%';
  if(completed) completed.textContent=s.completed;
  if(total) total.textContent=s.total;
  if(msg) msg.textContent=dailyProgressMessage(s);
  if(ring) ring.style.setProperty('--daily-progress', `${Math.max(0, Math.min(100, s.pct))}%`);
  const summaryCard=document.querySelector('#daily-content .daily-summary-card');
  if(summaryCard) summaryCard.classList.toggle('is-perfect',s.pct===100);
}

/* ══════════════════════════════════════════
   10. صفحة الجوانب
══════════════════════════════════════════ */

function renderCategories() {
  const date=Utils.today(),allH=Compute.activeHabits();
  Utils.el('categories-content').innerHTML=`<div class="categories-grid">
    ${getActiveCategories().sort((a,b)=>(a.order||0)-(b.order||0)).map(cat=>{
      const catH=allH.filter(h=>h.categoryId===cat.id),stats=Compute.categoryDayStats(cat.id,date,catH);
      const weekData=Utils.lastNDays(7).map(d=>Compute.categoryDayStats(cat.id,d,catH));
      const avgPct=weekData.length?Math.round(weekData.reduce((s,st)=>s+st.pct,0)/weekData.length):0;
      const rH=catH.filter(h=>h.type==='rating'),rec=Storage.getDayRecord(date);
      const ratings=rH.map(h=>rec[h.id]).filter(v=>v>0);
      const avgR=ratings.length?(ratings.reduce((s,v)=>s+v,0)/ratings.length).toFixed(1):null;
      return`<div class="glass-card cat-card" style="border-color:${cat.color}22"
        onmouseenter="this.style.boxShadow='0 12px 48px ${Utils.hexToRgba(cat.color,.18)}'"
        onmouseleave="this.style.boxShadow=''">
        <div class="cat-card-glow" style="background:radial-gradient(ellipse at 50% 0%,${cat.color},transparent 70%)"></div>
        <div class="cat-card-top">
          <div class="cat-card-icon" style="background:${Utils.hexToRgba(cat.color,.12)};color:${cat.color}">${Utils.esc(cat.icon)}</div>
          <span class="cat-count-badge">${catH.length} عادة</span>
        </div>
        <div class="cat-card-name">${Utils.esc(cat.name)}</div>
        <div class="cat-card-sub">اليوم: ${stats.completed}/${stats.total} مكتملة</div>
        <div class="cat-stats-row">
          <div class="cat-stat"><div class="cat-stat-val" style="color:${cat.color}">${stats.pct}%</div><div class="cat-stat-key">اليوم</div></div>
          <div class="cat-stat"><div class="cat-stat-val" style="color:${cat.color}">${avgPct}%</div><div class="cat-stat-key">متوسط 7 أيام</div></div>
          ${avgR!=null?`<div class="cat-stat"><div class="cat-stat-val" style="color:${cat.color}">${avgR}</div><div class="cat-stat-key">متوسط التقييم</div></div>`:''}
        </div>
        <div class="cat-prog-track"><div class="cat-prog-fill" style="width:${stats.pct}%;background:linear-gradient(90deg,${cat.color},${cat.color}bb)"></div></div>
      </div>`;
    }).join('')}
  </div>`;
}

/* ══════════════════════════════════════════
   11. التقارير
══════════════════════════════════════════ */

function getReportPeriodData(period) {
  const MN=['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
  switch(period) {
    case 'day': {
      const today=Utils.today(), stats=Compute.dayStats(today);
      return { mode:'single', title:'ملخص اليوم', subtitle:'نسبة إنجاز عادات اليوم الحالي',
        points:[{ label:'اليوم', pct:stats.pct, date:today, stats }] };
    }
    case 'week':
      return { mode:'line', title:'تقدم الأسبوع', subtitle:'نسبة اكتمال العادات — آخر 7 أيام',
        points:Utils.lastNDays(7).map(date=>{ const s=Compute.dayStats(date);
          return { label:Utils.dayName(date), pct:s.pct, date, stats:s }; }) };
    case 'month':
      return { mode:'line', title:'تقدم الشهر', subtitle:'نسبة اكتمال العادات — آخر 30 يوماً',
        points:Utils.lastNDays(30).map((date,i)=>{ const s=Compute.dayStats(date), d=parseInt(date.split('-')[2]);
          return { label:(i===0||d%5===0||i===29)?Utils.formatShort(date):'', pct:s.pct, date, stats:s }; }) };
    case 'quarter': {
      const days=Utils.lastNDays(91), weeks=[];
      for(let i=0;i<days.length;i+=7){
        const chunk=days.slice(i,i+7);
        const avg=Math.round(chunk.reduce((s,d)=>s+Compute.dayStats(d).pct,0)/chunk.length);
        weeks.push({ label:Utils.formatShort(chunk[0]), pct:avg, date:chunk[0],
          stats:{ pct:avg, total:1, completed:avg>0?1:0, missed:avg>0?0:1 } });
      }
      return { mode:'line', title:'تقدم 3 أشهر', subtitle:'متوسط أسبوعي — آخر 91 يوماً', points:weeks };
    }
    case 'year': {
      const now=new Date(), pts=[];
      for(let i=11;i>=0;i--){
        const d=new Date(now.getFullYear(),now.getMonth()-i,1);
        const dates=Utils.monthDates(d.getFullYear(),d.getMonth());
        const avg=dates.length?Math.round(dates.reduce((s,dt)=>s+Compute.dayStats(dt).pct,0)/dates.length):0;
        pts.push({ label:MN[d.getMonth()], pct:avg, date:Utils.toDateStr(d),
          stats:{ pct:avg, total:1, completed:avg>0?1:0, missed:avg>0?0:1 } });
      }
      return { mode:'line', title:'تقدم السنة', subtitle:'متوسط شهري — آخر 12 شهراً', points:pts };
    }
    default: return getReportPeriodData('week');
  }
}

function buildLineChartSVG(points) {
  const n=points.length;
  if(!n) return '<p class="report-no-data">لا توجد بيانات كافية بعد ✦</p>';
  const W=800,H=224,padL=40,padR=20,padT=50,padB=34;
  const cW=W-padL-padR, cH=H-padT-padB;
  const isDense=n>14;
  function dotCol(p){ return p>=80?'#4ade80':p>=60?'#60a5fa':p>=50?'#a78bfa':p>0?'#f87171':'rgba(255,255,255,.18)'; }
  const coords=points.map((p,i)=>({
    x:padL+(n===1?cW/2:(i/(n-1))*cW),
    y:padT+cH-(Math.max(0,Math.min(100,p.pct))/100)*cH,
    pct:p.pct, label:p.label||''
  }));
  // smooth cubic bezier
  let path=`M ${coords[0].x.toFixed(1)} ${coords[0].y.toFixed(1)}`;
  for(let i=1;i<n;i++){
    const p=coords[i-1],c=coords[i],t=(c.x-p.x)*0.32;
    path+=` C ${(p.x+t).toFixed(1)} ${p.y.toFixed(1)} ${(c.x-t).toFixed(1)} ${c.y.toFixed(1)} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`;
  }
  const bY=(padT+cH).toFixed(1);
  const fill=`${path} L ${coords[n-1].x.toFixed(1)} ${bY} L ${coords[0].x.toFixed(1)} ${bY} Z`;
  // grid
  const grid=[25,50,75,100].map(g=>{
    const gy=(padT+cH-(g/100)*cH).toFixed(1);
    return `<line x1="${padL}" y1="${gy}" x2="${W-padR}" y2="${gy}" stroke="rgba(255,255,255,.07)" stroke-width="1"/>
<text x="${padL-5}" y="${(+gy+4).toFixed(1)}" fill="rgba(255,255,255,.28)" font-size="10" text-anchor="end" font-family="Cairo,sans-serif">${g}%</text>`;
  }).join('');
  // notable dots for dense charts
  let maxI=0,minI=0;
  coords.forEach((c,i)=>{ if(c.pct>coords[maxI].pct)maxI=i; if(c.pct<coords[minI].pct)minI=i; });
  const notable=new Set([0,n-1,maxI,minI]);
  const xStep=n<=10?1:n<=20?3:5;
  // elements
  const elems=coords.map((c,i)=>{
    const col=dotCol(c.pct), hasVal=c.pct>0;
    const showPct=!isDense||notable.has(i);
    const showX=c.label&&(i===0||i===n-1||i%xStep===0);
    const r=isDense?3.5:5;
    const pTxt=showPct&&hasVal
      ?`<text x="${c.x.toFixed(1)}" y="${(c.y-r-5).toFixed(1)}" fill="${col}" font-size="${isDense?9.5:11}" font-weight="700" text-anchor="middle" font-family="Cairo,sans-serif">${c.pct}%</text>`:''
    const xTxt=showX
      ?`<text x="${c.x.toFixed(1)}" y="${(+bY+14).toFixed(1)}" fill="rgba(255,255,255,.4)" font-size="9.5" text-anchor="middle" font-family="Cairo,sans-serif">${c.label}</text>`:''
    const dot=hasVal
      ?`<circle cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="${r+3}" fill="${col}" opacity="0.15"/><circle cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="${r}" fill="${col}" stroke="rgba(1,8,32,.8)" stroke-width="1.5"><title>${c.label}: ${c.pct}%</title></circle>`
      :`<circle cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="2.5" fill="rgba(255,255,255,.1)"><title>${c.label}: —</title></circle>`;
    return pTxt+xTxt+dot;
  }).join('');
  const uid=`r${n}${coords[0].pct}`;
  return `<svg class="report-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="rLG${uid}" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#3b82f6"/><stop offset="55%" stop-color="#8b5cf6"/><stop offset="100%" stop-color="#7c3aed"/>
  </linearGradient>
  <linearGradient id="rFG${uid}" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.3"/><stop offset="100%" stop-color="#3b82f6" stop-opacity="0.01"/>
  </linearGradient>
</defs>
${grid}
<path d="${fill}" fill="url(#rFG${uid})"/>
<path d="${path}" fill="none" stroke="url(#rLG${uid})" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
${elems}
</svg>`;
}

/* ══════════════════════════════════════════
   11b. مساعدات التقارير المتقدمة
══════════════════════════════════════════ */

function getReportPeriodDays(period) {
  switch(period) {
    case 'day':     return [Utils.today()];
    case 'week':    return Utils.lastNDays(7);
    case 'month':   return Utils.lastNDays(30);
    case 'quarter': return Utils.lastNDays(91);
    case 'year':    return Utils.lastNDays(365);
    default:        return Utils.lastNDays(7);
  }
}

function getPreviousPeriodDays(period) {
  const n=getReportPeriodDays(period).length;
  return Array.from({length:n},(_,i)=>Utils.daysAgo(n*2-1-i));
}

function getCurrentWeekDates() {
  const weekStart=State.settings?.weekStart==='sunday'?'sunday':'monday';
  const today=Utils.parseDate(Utils.today());
  const day=today.getDay();
  const shift=weekStart==='sunday' ? day : (day+6)%7;
  const start=new Date(today);
  start.setDate(today.getDate()-shift);
  return Array.from({length:7},(_,i)=>{
    const d=new Date(start);
    d.setDate(start.getDate()+i);
    return Utils.toDateStr(d);
  });
}

function formatWeekRangeLabel(startDate,endDate) {
  const start=Utils.parseDate(startDate);
  const end=Utils.parseDate(endDate);
  const sameYear=start.getFullYear()===end.getFullYear();
  const sameMonth=sameYear&&start.getMonth()===end.getMonth();
  const startText=start.toLocaleDateString('ar', sameMonth ? { day:'numeric', month:'long' } : { day:'numeric', month:'long', year:'numeric' });
  const endText=end.toLocaleDateString('ar', sameYear ? { day:'numeric', month:'long' } : { day:'numeric', month:'long', year:'numeric' });
  return `الأسبوع من ${startText} إلى ${endText}`;
}

function getWeeklyReviewMessage(pct) {
  if(pct>80) return 'أسبوع قوي، حاول الحفاظ على نفس الإيقاع.';
  if(pct>=50) return 'أداء جيد، ركّز على عادة واحدة لتحسين الأسبوع القادم.';
  return 'لا بأس، البداية الصغيرة أفضل من التوقف. اختر 3 عادات فقط للأسبوع القادم.';
}

function getWeeklyReviewDayTone(pct, hasEntry) {
  if(!hasEntry) return { label:'لا بيانات', cls:'is-empty' };
  if(pct>=100) return { label:'ممتاز', cls:'is-great' };
  if(pct>=70) return { label:'جيد', cls:'is-good' };
  if(pct>=40) return { label:'متوسط', cls:'is-mid' };
  return { label:'منخفض', cls:'is-low' };
}

function getWeeklyReviewData() {
  const habits=Compute.activeHabits();
  const weekDates=getCurrentWeekDates();
  const days=weekDates.map(date=>{
    const stats=Compute.dayStats(date, habits);
    const record=Storage.getDayRecord(date);
    const hasEntry=Object.keys(record).length>0;
    return {
      date,
      label:Utils.dayName(date),
      shortDate:Utils.formatShort(date),
      stats,
      hasEntry,
      tone:getWeeklyReviewDayTone(stats.pct, hasEntry),
    };
  });
  const recordedDays=days.filter(day=>day.hasEntry);
  const totalCompleted=days.reduce((sum,day)=>sum+day.stats.completed,0);
  const totalPossible=days.reduce((sum,day)=>sum+day.stats.total,0);
  const weeklyPct=totalPossible>0?Math.round((totalCompleted/totalPossible)*100):0;
  const perfectDays=recordedDays.filter(day=>day.stats.pct===100).length;
  const bestDay=[...recordedDays].sort((a,b)=>b.stats.pct-a.stats.pct||b.stats.completed-a.stats.completed||a.date.localeCompare(b.date))[0]||null;
  const weakDay=[...recordedDays].sort((a,b)=>a.stats.pct-b.stats.pct||a.stats.completed-b.stats.completed||a.date.localeCompare(b.date))[0]||null;

  const habitStats=habits.map(habit=>{
    let completed=0;
    weekDates.forEach(date=>{
      const value=Storage.getDayRecord(date)[habit.id];
      const done=habit.type==='boolean'?value===true:(value!=null&&value>0);
      if(done) completed++;
    });
    return { habit, completed, total:weekDates.length, pct:weekDates.length?Math.round((completed/weekDates.length)*100):0 };
  });
  const bestHabit=[...habitStats].sort((a,b)=>b.pct-a.pct||b.completed-a.completed||a.habit.name.localeCompare(b.habit.name))[0]||null;
  const weakHabit=[...habitStats].sort((a,b)=>a.pct-b.pct||a.completed-b.completed||a.habit.name.localeCompare(b.habit.name))[0]||null;

  const categoryStats=getActiveCategories().map(cat=>{
    const catHabits=habits.filter(h=>h.categoryId===cat.id);
    if(!catHabits.length) return null;
    let completed=0;
    weekDates.forEach(date=>{
      const record=Storage.getDayRecord(date);
      catHabits.forEach(habit=>{
        const value=record[habit.id];
        const done=habit.type==='boolean'?value===true:(value!=null&&value>0);
        if(done) completed++;
      });
    });
    const total=catHabits.length*weekDates.length;
    return { ...cat, completed, total, pct:total>0?Math.round((completed/total)*100):0 };
  }).filter(Boolean);

  return {
    startDate:weekDates[0],
    endDate:weekDates[weekDates.length-1],
    weekLabel:formatWeekRangeLabel(weekDates[0],weekDates[weekDates.length-1]),
    days,
    recordedDays:recordedDays.length,
    perfectDays,
    totalCompleted,
    weeklyPct,
    totalHabits:habits.length,
    hasData:recordedDays.length>0,
    bestDay,
    weakDay,
    bestHabit:recordedDays.length?bestHabit:null,
    weakHabit:recordedDays.length?weakHabit:null,
    strongCategory:recordedDays.length?[...categoryStats].sort((a,b)=>b.pct-a.pct||b.completed-a.completed||a.name.localeCompare(b.name))[0]||null:null,
    weakCategory:recordedDays.length?[...categoryStats].sort((a,b)=>a.pct-b.pct||a.completed-b.completed||a.name.localeCompare(b.name))[0]||null:null,
    message:getWeeklyReviewMessage(weeklyPct),
  };
}

function getReportSummaryStats(days) {
  const daysData=days.map(date=>({date,stats:Compute.dayStats(date)}));
  const withData=daysData.filter(d=>d.stats.total>0);
  const avgPct=withData.length?Math.round(withData.reduce((s,d)=>s+d.stats.pct,0)/withData.length):0;
  const bestDay=withData.length?withData.reduce((b,d)=>d.stats.pct>b.stats.pct?d:b,withData[0]):null;
  const worstDay=withData.length>1?withData.reduce((w,d)=>d.stats.pct<w.stats.pct?d:w,withData[0]):null;
  const greatDays=withData.filter(d=>d.stats.pct>=80).length;
  const totalCompleted=daysData.reduce((s,d)=>s+d.stats.completed,0);
  const totalMissed=daysData.reduce((s,d)=>s+d.stats.missed,0);
  const activeCount=Compute.activeHabits().length;
  const topStreakEntry=Compute.topStreaks(1)[0]||null;
  let ratingSum=0,ratingCount=0;
  const rHabits=Compute.activeHabits().filter(h=>h.type==='rating');
  days.forEach(date=>{
    const rec=Storage.getDayRecord(date);
    rHabits.forEach(h=>{ const v=rec[h.id]; if(v!=null&&v>0){ratingSum+=v;ratingCount++;} });
  });
  return{avgPct,bestDay,worstDay,greatDays,totalCompleted,totalMissed,activeCount,topStreakEntry,avgRating:ratingCount>0?+(ratingSum/ratingCount).toFixed(1):null,daysWithData:withData.length};
}

function getCategoryPeriodStats(days) {
  return getActiveCategories().map(cat=>{
    const habits=Compute.activeHabits().filter(h=>h.categoryId===cat.id);
    if(!habits.length)return null;
    let total=0,completed=0;
    days.forEach(date=>{
      const rec=Storage.getDayRecord(date);
      habits.forEach(h=>{
        total++;
        const v=rec[h.id],done=h.type==='boolean'?v===true:(v!=null&&v>0);
        if(done)completed++;
      });
    });
    const pct=total>0?Math.round((completed/total)*100):0;
    return{...cat,pct,completed,total,habitsCount:habits.length};
  }).filter(Boolean).sort((a,b)=>b.pct-a.pct);
}

function getHabitPeriodStats(days) {
  return Compute.activeHabits().map(h=>{
    let completed=0,rSum=0,rCount=0;
    days.forEach(date=>{
      const v=Storage.getDayRecord(date)[h.id];
      if(h.type==='boolean'){ if(v===true)completed++; }
      else{ if(v!=null&&v>0){completed++;rSum+=v;rCount++;} }
    });
    const pct=days.length>0?Math.round((completed/days.length)*100):0;
    const cat=getCatById(h.categoryId);
    return{habit:h,cat,completed,pct,avgRating:rCount>0?+(rSum/rCount).toFixed(1):null,streak:Compute.streak(h.id)};
  });
}

function generateReportInsight(summary,comparison,catStats) {
  if(!summary.daysWithData)return'لا توجد بيانات كافية لهذه الفترة — ابدأ التسجيل اليومي لتظهر التقارير الذكية 🌱';
  const parts=[];
  if(summary.avgPct>=80)parts.push(`أداؤك هذه الفترة ممتاز — معدل إنجاز ${summary.avgPct}% نتيجة استثنائية 🌟`);
  else if(summary.avgPct>=60)parts.push(`معدل إنجازك ${summary.avgPct}% جيد — واصل الحفاظ على هذا المستوى 💪`);
  else if(summary.avgPct>0)parts.push(`معدل إنجازك ${summary.avgPct}% — ركّز على الاتساق يوماً بيوم ✦`);
  if(comparison.direction==='up'&&comparison.change>=5)parts.push(`تحسّن ملحوظ +${comparison.change}% مقارنة بالفترة السابقة`);
  else if(comparison.direction==='down'&&comparison.change<=-5)parts.push(`انخفاض ${Math.abs(comparison.change)}% عن الفترة السابقة — راجع ما تغيّر`);
  if(catStats.length>0&&catStats[0].pct>0)parts.push(`أقوى جانب: ${Utils.esc(catStats[0].icon)} ${Utils.esc(catStats[0].name)} (${catStats[0].pct}%)`);
  const weakCat=catStats.find(c=>c.pct<50&&c.pct>0);
  if(weakCat&&catStats.length>1)parts.push(`يحتاج اهتمام: ${Utils.esc(weakCat.icon)} ${Utils.esc(weakCat.name)} (${weakCat.pct}%)`);
  if(summary.topStreakEntry&&summary.topStreakEntry.streak>=7)parts.push(`سلسلة رائعة: ${Utils.esc(summary.topStreakEntry.habit.name)} — ${summary.topStreakEntry.streak} يوم متواصل 🔥`);
  return parts.slice(0,3).join(' · ')||'واصل التسجيل اليومي لتحصل على تحليلات أعمق ✦';
}

function renderReports() {
  const period=State.reportPeriod;
  const pd=getReportPeriodData(period);
  const days=getReportPeriodDays(period);
  const prevDays=getPreviousPeriodDays(period);
  const weeklyReview=getWeeklyReviewData();
  const summary=getReportSummaryStats(days);
  const prevSummary=getReportSummaryStats(prevDays);
  const delta=summary.avgPct-prevSummary.avgPct;
  const comparison={current:summary.avgPct,previous:prevSummary.avgPct,change:delta,direction:delta>2?'up':delta<-2?'down':'same'};
  const catStats=getCategoryPeriodStats(days);
  const bestCat=catStats.length>0?catStats[0]:null;
  const worstCat=catStats.length>1?catStats[catStats.length-1]:null;
  const habitStats=getHabitPeriodStats(days);
  const insight=generateReportInsight(summary,comparison,catStats);
  const monthData=Compute.monthlyData(), now=new Date();

  const PERIODS=[
    {value:'day',label:'يومي'},{value:'week',label:'أسبوعي'},
    {value:'month',label:'شهري'},{value:'quarter',label:'3 أشهر'},{value:'year',label:'سنة'}
  ];
  const periodBtns=PERIODS.map(p=>`<button class="period-btn${period===p.value?' active':''}" data-period="${p.value}">${p.label}</button>`).join('');

  // main chart / day card
  let mainHtml;
  if(pd.mode==='single'){
    const pt=pd.points[0];
    const col=pt.pct>=80?'#4ade80':pt.pct>=60?'#60a5fa':pt.pct>=50?'#a78bfa':pt.pct>0?'#f87171':'rgba(255,255,255,.3)';
    const lbl=pt.pct>=80?'ممتاز 🌟':pt.pct>=60?'جيد 👍':pt.pct>=50?'متوسط':pt.pct>0?'يحتاج تحسيناً':'لا توجد بيانات';
    mainHtml=`<div class="report-day-card">
      <div class="report-day-ring"><div class="report-day-pct-big" style="color:${col}">${pt.pct}%</div><div class="report-day-grade">${lbl}</div></div>
      <div class="report-day-stats">
        <div class="report-day-stat"><span class="report-day-stat-val" style="color:#4ade80">${pt.stats.completed}</span><span class="report-day-stat-lbl">مكتمل</span></div>
        <div class="report-day-stat-div"></div>
        <div class="report-day-stat"><span class="report-day-stat-val" style="color:#f87171">${pt.stats.missed}</span><span class="report-day-stat-lbl">غائب</span></div>
        <div class="report-day-stat-div"></div>
        <div class="report-day-stat"><span class="report-day-stat-val" style="color:var(--text-2)">${pt.stats.total}</span><span class="report-day-stat-lbl">الإجمالي</span></div>
      </div>
    </div>`;
  } else {
    mainHtml=buildLineChartSVG(pd.points);
  }

  // helpers
  const pctCol=p=>p>=80?'#4ade80':p>=60?'#60a5fa':p>=50?'#a78bfa':p>0?'#f87171':'rgba(255,255,255,.25)';

  // summary cards
  const summaryCards=[
    {icon:'📊',label:'معدل الإنجاز',val:`${summary.avgPct}%`,sub:summary.daysWithData?`${summary.daysWithData} يوم بيانات`:'لا بيانات',col:pctCol(summary.avgPct)},
    {icon:'🏆',label:'أفضل يوم',val:summary.bestDay?`${summary.bestDay.stats.pct}%`:'—',sub:summary.bestDay?Utils.formatShort(summary.bestDay.date):'لا بيانات',col:'#4ade80'},
    {icon:'⭐',label:'أيام ممتازة',val:summary.greatDays,sub:`من ${summary.daysWithData||0} يوم`,col:'#facc15'},
    {icon:'✅',label:'مجموع المكتملة',val:summary.totalCompleted,sub:'عادة مكتملة',col:'#4ade80'},
    {icon:'❌',label:'مجموع الغائبة',val:summary.totalMissed,sub:'عادة غائبة',col:'#f87171'},
    {icon:'🎯',label:'عادات نشطة',val:summary.activeCount,sub:'عادة مفعّلة',col:'#60a5fa'},
    {icon:'🔥',label:'أطول سلسلة',val:summary.topStreakEntry?`${summary.topStreakEntry.streak} يوم`:'—',sub:summary.topStreakEntry?Utils.esc(summary.topStreakEntry.habit.name):'لا سلاسل',col:'#fb923c'},
    {icon:'🌟',label:'معدل التقييم',val:summary.avgRating!=null?`${summary.avgRating}/10`:'—',sub:'متوسط التقييمات',col:'#c084fc'},
  ].map(c=>`<div class="report-summary-card">
    <div class="rsc-icon">${Utils.esc(c.icon)}</div>
    <div class="rsc-val" style="color:${c.col}">${c.val}</div>
    <div class="rsc-label">${c.label}</div>
    <div class="rsc-sub">${c.sub}</div>
  </div>`).join('');

  // comparison
  const chgSign=comparison.change>0?'+':'';
  const chgCol=comparison.direction==='up'?'#4ade80':comparison.direction==='down'?'#f87171':'#94a3b8';
  const chgIcon=comparison.direction==='up'?'↑':comparison.direction==='down'?'↓':'→';
  const periodLabel={'day':'الأمس','week':'الأسبوع الماضي','month':'الشهر الماضي','quarter':'الربع السابق','year':'السنة الماضية'}[period]||'الفترة السابقة';
  const compMsg=!summary.daysWithData?'أداءك مستقر تقريباً مقارنة بالفترة السابقة':comparison.direction==='up'?`أداءك أفضل من الفترة السابقة بنسبة ${Math.abs(Math.round(comparison.change))}%`:comparison.direction==='down'?`أداءك أقل من الفترة السابقة بنسبة ${Math.abs(Math.round(comparison.change))}%`:'أداءك مستقر تقريباً مقارنة بالفترة السابقة';

  // best/worst day cards (only for multi-day periods)
  const showBestWorst=pd.mode!=='single';
  const bdHtml=summary.bestDay?`<div class="rbi-date">${Utils.formatFull(summary.bestDay.date)}</div><div class="rbi-pct" style="color:#4ade80">${summary.bestDay.stats.pct}%</div><div class="rbi-sub">${summary.bestDay.stats.completed} من ${summary.bestDay.stats.total} عادات مكتملة</div>`:`<p class="report-no-data">لا توجد بيانات كافية بعد</p>`;
  const wdHtml=summary.worstDay?`<div class="rbi-date">${Utils.formatFull(summary.worstDay.date)}</div><div class="rbi-pct" style="color:#f87171">${summary.worstDay.stats.pct}%</div><div class="rbi-sub">${summary.worstDay.stats.completed} من ${summary.worstDay.stats.total} عادات مكتملة</div>`:`<p class="report-no-data">لا توجد بيانات كافية بعد</p>`;
  const bestWorstDaySection=showBestWorst?`<div class="report-duo-grid"><div class="report-glass-card report-compact-card"><div class="report-card-title">🏆 أفضل يوم</div><div class="report-card-sub">الأعلى إنجازاً في هذه الفترة</div>${bdHtml}</div><div class="report-glass-card report-compact-card"><div class="report-card-title">📉 أضعف يوم</div><div class="report-card-sub">الأقل إنجازاً في هذه الفترة</div>${wdHtml}</div></div>`:'';

  // best/worst category cards
  const bcHtml=bestCat?`<div class="rbi-icon">${Utils.esc(bestCat.icon)}</div><div class="rbi-name">${Utils.esc(bestCat.name)}</div><div class="rbi-pct" style="color:${bestCat.color||'#4ade80'}">${bestCat.pct}%</div><div class="rbi-sub">${bestCat.completed} من ${bestCat.total} عادة</div>`:`<p class="report-no-data">لا توجد جوانب نشطة</p>`;
  const wcHtml=worstCat?`<div class="rbi-icon">${Utils.esc(worstCat.icon)}</div><div class="rbi-name">${Utils.esc(worstCat.name)}</div><div class="rbi-pct" style="color:#f87171">${worstCat.pct}%</div><div class="rbi-sub">${worstCat.completed} من ${worstCat.total} عادة</div>`:`<p class="report-no-data">لا توجد بيانات كافية بعد</p>`;
  const bestWorstCatSection=catStats.length>=1?`<div class="report-duo-grid"><div class="report-glass-card report-compact-card"><div class="report-card-title">⭐ أفضل جانب</div><div class="report-card-sub">الجانب الأعلى إنجازاً في الفترة</div>${bcHtml}</div><div class="report-glass-card report-compact-card"><div class="report-card-title">🎯 يحتاج اهتمام</div><div class="report-card-sub">الجانب الأقل إنجازاً في الفترة</div>${wcHtml}</div></div>`:'';

  // category cards
  const catCards=catStats.map(cat=>{
    const badge=cat.pct>=80?{label:'ممتاز',cls:'badge-great'}:cat.pct>=60?{label:'جيد',cls:'badge-good'}:cat.pct>=40?{label:'متوسط',cls:'badge-mid'}:cat.pct>0?{label:'ضعيف',cls:'badge-low'}:{label:'لا بيانات',cls:'badge-empty'};
    return`<div class="report-category-card">
      <div class="rcc-header">
        <span class="rcc-icon">${Utils.esc(cat.icon)}</span>
        <span class="rcc-name">${Utils.esc(cat.name)}</span>
        <span class="report-status-badge ${badge.cls}">${badge.label}</span>
      </div>
      <div class="rcc-bar-wrap"><div class="rcc-bar-fill" style="width:${cat.pct}%;background:linear-gradient(90deg,${cat.color},${cat.color}88)"></div></div>
      <div class="rcc-footer">
        <span class="rcc-pct" style="color:${cat.color}">${cat.pct}%</span>
        <span class="rcc-sub">${cat.completed} من ${cat.total}</span>
      </div>
    </div>`;
  }).join('')||'<p class="report-no-data">لا توجد فئات نشطة</p>';

  // habit rows helper
  function habitRow(hs,showStreak=true){
    const col=pctCol(hs.pct);
    return`<div class="report-habit-row">
      <div class="rhr-dot" style="background:${hs.cat?.color||'#888'}"></div>
      <div class="rhr-info">
        <div class="rhr-name">${Utils.esc(hs.habit.name)}</div>
        <div class="rhr-cat">${Utils.esc(hs.cat?.icon||'')} ${Utils.esc(hs.cat?.name||'')}</div>
      </div>
      <div class="rhr-right">
        <div class="report-mini-progress"><div class="rmp-fill" style="width:${hs.pct}%;background:${col}"></div></div>
        <div class="rhr-pct" style="color:${col}">${hs.pct}%</div>
        <div class="rhr-days">${hs.completed}/${days.length}د</div>
        ${showStreak&&hs.streak>0?`<div class="rhr-streak">🔥${hs.streak}</div>`:''}
      </div>
    </div>`;
  }

  const sorted=[...habitStats].sort((a,b)=>b.pct-a.pct);
  const topHabitsHtml=sorted.filter(h=>h.pct>0).slice(0,5).map(h=>habitRow(h)).join('')||'<p class="report-no-data">لا توجد بيانات بعد</p>';
  const worstHabitsHtml=[...habitStats].sort((a,b)=>a.pct-b.pct).slice(0,5).map(h=>habitRow(h,false)).join('')||'<p class="report-no-data">لا توجد بيانات بعد</p>';

  // heat map
  const firstDay=new Date(now.getFullYear(),now.getMonth(),1).getDay();
  const heatCells=Array.from({length:firstDay},()=>`<div class="report-cal-day report-day-empty" style="opacity:0;pointer-events:none"></div>`);
  monthData.forEach(d=>{
    const p=d.stats.pct, dayNum=parseInt(d.date.split('-')[2]);
    const cls=p===0?'report-day-empty':p<50?'report-day-low':p<60?'report-day-mid':p<80?'report-day-good':'report-day-great';
    const pctHtml=p>0?`<div class="report-cal-day-pct">${p}%</div>`:`<div class="report-cal-day-pct report-cal-day-pct-empty">—</div>`;
    heatCells.push(`<div class="report-cal-day ${cls}" title="${Utils.formatShort(d.date)}: ${p}%"><div class="report-cal-day-num">${dayNum}</div>${pctHtml}</div>`);
  });
  const MN=['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];

  const weeklyMetric=(label,val,sub,accent='')=>`<div class="weekly-review-metric">
    <span class="weekly-review-metric-label">${label}</span>
    <strong class="weekly-review-metric-value"${accent?` style="color:${accent}"`:''}>${val}</strong>
    <span class="weekly-review-metric-sub">${sub}</span>
  </div>`;
  const weeklyInsightCard=(title,body,tone='')=>`<article class="weekly-review-insight-card ${tone}">
    <div class="weekly-review-insight-title">${title}</div>
    <div class="weekly-review-insight-body">${body}</div>
  </article>`;
  const weeklyCategoryText=item=>item?`${Utils.esc(item.icon||'')} ${Utils.esc(item.name)} · ${item.pct}%`:'لا توجد بيانات كافية بعد';
  const weeklyOverviewHtml=weeklyReview.hasData ? `
    <section class="report-glass-card weekly-review-card reveal-item">
      <div class="weekly-review-hero">
        <div class="weekly-review-copy">
          <div class="weekly-review-kicker">المراجعة الأسبوعية</div>
          <h3 class="weekly-review-title">مراجعة الأسبوع</h3>
          <p class="weekly-review-range">${weeklyReview.weekLabel}</p>
          <div class="weekly-review-message">${weeklyReview.message}</div>
        </div>
        <div class="weekly-review-score">
          <div class="weekly-review-score-ring">
            <strong>${weeklyReview.weeklyPct}%</strong>
            <span>نسبة الأسبوع</span>
          </div>
        </div>
      </div>
      <div class="weekly-review-metrics-grid">
        ${weeklyMetric('نسبة الإنجاز',`${weeklyReview.weeklyPct}%`,'من إجمالي العادات خلال 7 أيام',pctCol(weeklyReview.weeklyPct))}
        ${weeklyMetric('أيام فيها تسجيل',weeklyReview.recordedDays,`من أصل ${weeklyReview.days.length} أيام`,'#60a5fa')}
        ${weeklyMetric('أيام مكتملة 100%',weeklyReview.perfectDays,'أيام وصلت إلى الكمال','#4ade80')}
        ${weeklyMetric('إجمالي العادات المكتملة',weeklyReview.totalCompleted,`من أصل ${weeklyReview.totalHabits*weeklyReview.days.length}`,'#c084fc')}
      </div>
      <div class="weekly-review-insights-grid">
        ${weeklyInsightCard('أفضل يوم',weeklyReview.bestDay?`${Utils.formatFull(weeklyReview.bestDay.date)} · ${weeklyReview.bestDay.stats.pct}%`:'لا توجد بيانات كافية بعد','is-best')}
        ${weeklyInsightCard('أضعف يوم',weeklyReview.weakDay?`${Utils.formatFull(weeklyReview.weakDay.date)} · ${weeklyReview.weakDay.stats.pct}%`:'لا توجد بيانات كافية بعد','is-weak')}
        ${weeklyInsightCard('أفضل عادة',weeklyReview.bestHabit?`${Utils.esc(weeklyReview.bestHabit.habit.name)} · ${weeklyReview.bestHabit.pct}% (${weeklyReview.bestHabit.completed}/${weeklyReview.bestHabit.total})`:'لا توجد بيانات كافية بعد','is-best')}
        ${weeklyInsightCard('أصعب عادة',weeklyReview.weakHabit?`${Utils.esc(weeklyReview.weakHabit.habit.name)} · ${weeklyReview.weakHabit.pct}% (${weeklyReview.weakHabit.completed}/${weeklyReview.weakHabit.total})`:'لا توجد بيانات كافية بعد','is-weak')}
        ${weeklyInsightCard('الجانب الأقوى',weeklyCategoryText(weeklyReview.strongCategory),'is-best')}
        ${weeklyInsightCard('الجانب الأضعف',weeklyCategoryText(weeklyReview.weakCategory),'is-weak')}
      </div>
      <div class="weekly-review-days-head">
        <div>
          <div class="weekly-review-days-title">أيام الأسبوع</div>
          <div class="weekly-review-days-sub">لقطة سريعة توضح أين كان الزخم أعلى وأين احتاج اليوم دعمًا أكثر.</div>
        </div>
        <div class="weekly-review-days-legend">
          <span class="weekly-review-legend-chip is-empty">لا بيانات</span>
          <span class="weekly-review-legend-chip is-low">منخفض</span>
          <span class="weekly-review-legend-chip is-mid">متوسط</span>
          <span class="weekly-review-legend-chip is-good">جيد</span>
          <span class="weekly-review-legend-chip is-great">ممتاز</span>
        </div>
      </div>
      <div class="weekly-review-days-grid">
        ${weeklyReview.days.map(day=>`
          <article class="weekly-review-day-card ${day.tone.cls}">
            <div class="weekly-review-day-top">
              <div>
                <div class="weekly-review-day-name">${day.label}</div>
                <div class="weekly-review-day-date">${day.shortDate}</div>
              </div>
              <span class="weekly-review-day-badge">${day.tone.label}</span>
            </div>
            <div class="weekly-review-day-pct">${day.hasEntry?`${day.stats.pct}%`:'—'}</div>
            <div class="weekly-review-day-meta">${day.hasEntry?`${day.stats.completed} من ${day.stats.total} عادات مكتملة`:'لا يوجد تسجيل لهذا اليوم'}</div>
            <div class="weekly-review-day-progress"><span style="width:${day.hasEntry?Math.max(day.stats.pct,8):8}%"></span></div>
          </article>
        `).join('')}
      </div>
      <div class="weekly-review-actions">
        <button class="btn-primary" type="button" id="weekly-review-go-daily">اذهب إلى تسجيل اليوم</button>
        <button class="btn-secondary" type="button" id="weekly-review-go-calendar">عرض التقويم</button>
      </div>
    </section>
  ` : `
    <section class="report-glass-card weekly-review-card weekly-review-empty reveal-item">
      <div class="weekly-review-kicker">المراجعة الأسبوعية</div>
      <h3 class="weekly-review-title">مراجعة الأسبوع</h3>
      <p class="weekly-review-range">${weeklyReview.weekLabel}</p>
      <div class="weekly-review-empty-title">لا توجد سجلات لهذا الأسبوع بعد</div>
      <div class="weekly-review-empty-copy">ابدأ بتسجيل عاداتك اليوم لتظهر مراجعتك هنا.</div>
      <div class="weekly-review-actions">
        <button class="btn-primary" type="button" id="weekly-review-go-daily">اذهب إلى تسجيل اليوم</button>
      </div>
    </section>
  `;

  Utils.el('reports-content').innerHTML=`
  <div class="report-period-bar">${periodBtns}</div>
  <div class="reports-dashboard">

    ${weeklyOverviewHtml}

    <div class="report-glass-card report-chart-card">
      <div class="report-card-title">${pd.title}</div>
      <div class="report-card-sub">${pd.subtitle}</div>
      <div class="report-line-chart">${mainHtml}</div>
    </div>

    <div>
      <div class="report-section-label">ملخص الفترة</div>
      <div class="report-summary-grid">${summaryCards}</div>
    </div>

    ${bestWorstDaySection}

    <div class="report-duo-grid">
      <div class="report-glass-card report-compact-card">
        <div class="report-card-title">المقارنة مع الفترة السابقة</div>
        <div class="report-card-sub">${periodLabel}</div>
        <div class="rcomp-body">
          <div class="rcomp-col">
            <div class="rcomp-lbl">الفترة الحالية</div>
            <div class="rcomp-val" style="color:${pctCol(comparison.current)}">${comparison.current}%</div>
          </div>
          <div class="rcomp-arrow" style="color:${chgCol}">${chgIcon}<span class="rcomp-delta">${chgSign}${comparison.change}%</span></div>
          <div class="rcomp-col">
            <div class="rcomp-lbl">${periodLabel}</div>
            <div class="rcomp-val" style="color:${pctCol(comparison.previous)}">${comparison.previous}%</div>
          </div>
        </div>
        <div class="rcomp-msg" style="color:${chgCol}">${compMsg}</div>
      </div>
      <div class="report-glass-card report-compact-card">
        <div class="report-card-title">قراءة ذكية للفترة</div>
        <div class="report-card-sub">تحليل بناءً على بياناتك</div>
        <div class="report-insight-inner">
          <div class="ri-icon">🧠</div>
          <div class="ri-body"><div class="ri-text">${insight}</div></div>
        </div>
      </div>
    </div>

    ${bestWorstCatSection}

    <div>
      <div class="report-section-label">تحليل الجوانب</div>
      <div class="report-category-grid">${catCards}</div>
    </div>

    <div class="report-duo-grid">
      <div class="report-glass-card report-compact-card">
        <div class="report-card-title">⭐ أفضل العادات</div>
        <div class="report-card-sub">الأعلى التزاماً في هذه الفترة</div>
        <div class="report-habits-list">${topHabitsHtml}</div>
      </div>
      <div class="report-glass-card report-compact-card">
        <div class="report-card-title">💡 تحتاج اهتماماً</div>
        <div class="report-card-sub">الأقل التزاماً في هذه الفترة</div>
        <div class="report-habits-list">${worstHabitsHtml}</div>
      </div>
    </div>

    <div class="report-glass-card report-compact-card">
      <div class="report-card-title">نظرة شهرية — ${MN[now.getMonth()]} ${now.getFullYear()}</div>
      <div class="report-card-sub">خريطة حرارة الاكتمال اليومي</div>
      <div class="cal-wrap">
        <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-bottom:5px">${['أحد','إثن','ثلا','أرب','خمي','جمع','سبت'].map(d=>`<div style="font-size:10px;font-weight:700;color:var(--text-3);text-align:center">${d}</div>`).join('')}</div>
        <div class="cal-days-grid">${heatCells.join('')}</div>
        <div class="report-cal-legend">
          <div class="report-cal-legend-item report-day-empty"><span>0%</span> لا يوجد</div>
          <div class="report-cal-legend-item report-day-low"><span>1-49%</span> منخفض</div>
          <div class="report-cal-legend-item report-day-mid"><span>50-59%</span> متوسط</div>
          <div class="report-cal-legend-item report-day-good"><span>60-79%</span> جيد</div>
          <div class="report-cal-legend-item report-day-great"><span>≥80%</span> ممتاز</div>
        </div>
      </div>
    </div>

  </div>`;

  Utils.qsa('.period-btn').forEach(btn=>btn.addEventListener('click',()=>{
    State.reportPeriod=btn.dataset.period; renderReports();
  }));
  Utils.el('weekly-review-go-daily')?.addEventListener('click',()=>{
    State.dailyDate=Utils.today();
    const dp=Utils.el('daily-date-picker');
    if(dp) dp.value=State.dailyDate;
    navigate('daily');
  });
  Utils.el('weekly-review-go-calendar')?.addEventListener('click',()=>{
    const endDate=Utils.parseDate(weeklyReview.endDate);
    State.calYear=endDate.getFullYear();
    State.calMonth=endDate.getMonth();
    State.calSelectedDate=Utils.today();
    navigate('calendar');
  });
  UIEnhancer.observeNewItems(Utils.el('reports-content'));
}

/* ══════════════════════════════════════════
   12. صفحة إدارة العادات
══════════════════════════════════════════ */

function renderManage() {
  const filter=State.manageFilter;
  const habits=State.habits.filter(h=>filter==='all'||h.categoryId===filter);
  Utils.el('manage-content').innerHTML=`
    <div class="manage-filter-tabs">
      <button class="filter-tab ${filter==='all'?'active':''}" data-filter="all">جميع العادات</button>
      ${getCategories().map(cat=>`<button class="filter-tab ${filter===cat.id?'active':''}" data-filter="${cat.id}" style="${filter===cat.id?`color:${cat.color};border-color:${cat.color}44;background:${Utils.hexToRgba(cat.color,.08)}`:''}">
        ${Utils.esc(cat.icon)} ${Utils.esc(cat.name.split(' ')[0])}</button>`).join('')}
    </div>
    ${habits.length===0?`<div class="empty-state"><div class="empty-icon">🌱</div><div class="empty-title">لا توجد عادات هنا</div><div class="empty-body">أضف عادات من لوحة الإدارة.</div></div>`:`
    <div class="habits-manage-list">${habits.sort((a,b)=>(a.order||0)-(b.order||0)).map(h=>{
      const cat=getCatById(h.categoryId);
      return`<div class="manage-habit-row ${h.enabled?'':'disabled'}" data-id="${h.id}">
        <div class="mhr-dot" style="background:${cat?.color||'#888'}"></div>
        <div class="mhr-info">
          <div class="mhr-name">${Utils.esc(h.name)}</div>
          <div class="mhr-meta"><span class="mhr-cat">${Utils.esc(cat?.icon||'')} ${Utils.esc(cat?.name||'')}</span>
            <span class="mhr-type-badge ${h.type==='boolean'?'badge-bool':'badge-rating'}">${h.type==='boolean'?'نعم/لا':'تقييم'}</span>
          </div>
        </div>
        <div class="mhr-actions">
          <label class="toggle-switch"><input type="checkbox" class="habit-enable-toggle" data-id="${h.id}" ${h.enabled?'checked':''}><span class="toggle-track"><span class="toggle-thumb"></span></span></label>
          <button class="icon-btn edit-habit-btn" data-id="${h.id}" title="تعديل"><svg viewBox="0 0 24 24" fill="none" width="14" height="14"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>
          <button class="icon-btn danger delete-habit-btn" data-id="${h.id}" title="حذف"><svg viewBox="0 0 24 24" fill="none" width="14" height="14"><path d="M3 6h18M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6M10 11v6M14 11v6M9 6V4h6v2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        </div>
      </div>`;
    }).join('')}</div>`}`;
  Utils.qsa('.filter-tab').forEach(t=>t.addEventListener('click',()=>{State.manageFilter=t.dataset.filter;renderManage();}));
  Utils.qsa('.habit-enable-toggle').forEach(tog=>tog.addEventListener('change',()=>{
    toggleHabitStatus(tog.dataset.id);
    tog.closest('.manage-habit-row').classList.toggle('disabled',!tog.checked);
  }));
  Utils.qsa('.edit-habit-btn').forEach(btn=>btn.addEventListener('click',()=>HabitModal.open(btn.dataset.id)));
  Utils.qsa('.delete-habit-btn').forEach(btn=>btn.addEventListener('click',()=>confirmDeleteHabit(btn.dataset.id)));
}

/* ══════════════════════════════════════════
   13. صفحة الإدارة
══════════════════════════════════════════ */

const ADMIN_TABS = [
  { id:'overview',    label:'نظرة عامة',    icon:'📊' },
  { id:'categories',  label:'الفئات',       icon:'🗂️' },
  { id:'habits',      label:'العادات',      icon:'✅' },
  { id:'settings',    label:'الإعدادات',    icon:'⚙️' },
  { id:'backup',      label:'النسخ الاحتياطي', icon:'💾' },
];

function renderAdmin() {
  // شريط علامات التبويب
  Utils.el('admin-tabs-bar').innerHTML=ADMIN_TABS.map(t=>`
    <button class="admin-tab ${State.adminTab===t.id?'active':''}" data-tab="${t.id}">
      <span>${t.icon}</span>${t.label}
    </button>`).join('');
  Utils.qsa('.admin-tab').forEach(btn=>btn.addEventListener('click',()=>{
    State.adminTab=btn.dataset.tab; renderAdmin();
  }));
  // محتوى علامة التبويب
  switch(State.adminTab){
    case 'overview':   renderAdminOverview();   break;
    case 'categories': renderAdminCategories(); break;
    case 'habits':     renderAdminHabits();     break;
    case 'settings':   renderAdminSettings();   break;
    case 'backup':     renderAdminBackup();     break;
  }
}

/* ── نظرة عامة في الإدارة ── */
function renderAdminOverview() {
  const all=State.habits,cats=State.categories;
  const activeH=all.filter(h=>h.enabled),disabledH=all.filter(h=>!h.enabled);
  const boolH=all.filter(h=>h.type==='boolean'),ratingH=all.filter(h=>h.type==='rating');
  const activeCats=cats.filter(c=>c.enabled),disabledCats=cats.filter(c=>!c.enabled);
  // التوزيع حسب الفئة
  const distRows=cats.sort((a,b)=>(a.order||0)-(b.order||0)).map(cat=>{
    const count=all.filter(h=>h.categoryId===cat.id).length;
    const pct=all.length>0?Math.round((count/all.length)*100):0;
    return`<div class="hbar-row"><div class="hbar-top">
      <div class="hbar-name"><span style="margin-right:5px">${Utils.esc(cat.icon)}</span>${Utils.esc(cat.name)}</div>
      <div class="hbar-pct" style="color:${cat.color}">${count} عادة</div>
    </div><div class="hbar-track"><div class="hbar-fill" style="width:${pct}%;background:linear-gradient(90deg,${cat.color},${cat.color}88)"></div></div></div>`;
  }).join('');
  Utils.el('admin-content').innerHTML=`
    <div class="admin-overview-grid">
      <div class="admin-stat-card" style="--glow:rgba(167,139,250,.18)"><div class="asc-icon">🗂️</div><div class="asc-value" style="color:#a78bfa">${cats.length}</div><div class="asc-label">إجمالي الفئات</div></div>
      <div class="admin-stat-card" style="--glow:rgba(96,165,250,.18)"><div class="asc-icon">📋</div><div class="asc-value" style="color:#60a5fa">${all.length}</div><div class="asc-label">إجمالي العادات</div></div>
      <div class="admin-stat-card" style="--glow:rgba(74,222,128,.18)"><div class="asc-icon">✅</div><div class="asc-value" style="color:#4ade80">${activeH.length}</div><div class="asc-label">العادات النشطة</div></div>
      <div class="admin-stat-card" style="--glow:rgba(248,113,113,.18)"><div class="asc-icon">❌</div><div class="asc-value" style="color:#f87171">${disabledH.length}</div><div class="asc-label">العادات المعطّلة</div></div>
      <div class="admin-stat-card" style="--glow:rgba(96,165,250,.18)"><div class="asc-icon">☑️</div><div class="asc-value" style="color:#60a5fa">${boolH.length}</div><div class="asc-label">عادات نعم/لا</div></div>
      <div class="admin-stat-card" style="--glow:rgba(251,191,36,.18)"><div class="asc-icon">⭐</div><div class="asc-value" style="color:#fbbf24">${ratingH.length}</div><div class="asc-label">عادات التقييم</div></div>
    </div>
    <div class="admin-chart-row">
      <div class="admin-mini-card"><div class="admin-mini-title">العادات لكل فئة</div><div class="cat-distribution">${distRows}</div></div>
      <div class="admin-mini-card"><div class="admin-mini-title">حالة النظام</div>
        <div style="display:flex;flex-direction:column;gap:12px;margin-top:4px">
          <div class="settings-row"><div><div class="settings-row-label">الفئات</div><div class="settings-row-hint">${activeCats.length} نشطة، ${disabledCats.length} معطّلة</div></div><span class="status-badge status-active">نشط</span></div>
          <div class="settings-row"><div><div class="settings-row-label">السجلات اليومية</div><div class="settings-row-hint">${Object.keys(Storage.getRecords()).length} يوم مسجّل</div></div><span class="status-badge status-active">محفوظ</span></div>
          <div class="settings-row"><div><div class="settings-row-label">التخزين</div><div class="settings-row-hint">localStorage نشط</div></div><span class="status-badge status-active">جيد</span></div>
        </div>
      </div>
    </div>`;
}

/* ── إدارة الفئات ── */
function renderAdminCategories() {
  const cats=[...State.categories].sort((a,b)=>(a.order||0)-(b.order||0));
  Utils.el('admin-content').innerHTML=`
    <div class="admin-section-header">
      <div class="admin-section-title">إدارة الفئات</div>
      <div class="admin-section-actions">
        <button class="btn-primary btn-sm" id="add-cat-btn"><svg viewBox="0 0 24 24" fill="none" width="14" height="14"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>إضافة فئة</button>
      </div>
    </div>
    ${cats.length===0?`<div class="empty-state"><div class="empty-icon">🗂️</div><div class="empty-title">لا توجد فئات</div><div class="empty-body">أضف فئتك الأولى.</div></div>`:`
    <div class="admin-list">
      ${cats.map((cat,idx)=>{
        const habitCount=State.habits.filter(h=>h.categoryId===cat.id).length;
        return`<div class="admin-row ${cat.enabled?'':'row-disabled'}" data-id="${cat.id}">
          <div class="ar-color-bar" style="background:${cat.color}"></div>
          <div class="ar-icon" style="background:${Utils.hexToRgba(cat.color,.12)};color:${cat.color}">${Utils.esc(cat.icon)}</div>
          <div class="ar-info">
            <div class="ar-name">${Utils.esc(cat.name)}</div>
            <div class="ar-desc">${Utils.esc(cat.description||'لا يوجد وصف')}</div>
          </div>
          <div class="ar-meta">
            <span class="habit-count-pill">${habitCount} عادة</span>
            <span class="status-badge ${cat.enabled?'status-active':'status-disabled'}">${cat.enabled?'نشط':'معطّل'}</span>
          </div>
          <div class="ar-actions">
            <div class="order-btns">
              <button class="order-btn cat-up" data-id="${cat.id}" title="تحريك لأعلى" ${idx===0?'disabled':''}>▲</button>
              <button class="order-btn cat-down" data-id="${cat.id}" title="تحريك لأسفل" ${idx===cats.length-1?'disabled':''}>▼</button>
            </div>
            <label class="toggle-switch" title="${cat.enabled?'تعطيل':'تفعيل'}">
              <input type="checkbox" class="cat-enable-toggle" data-id="${cat.id}" ${cat.enabled?'checked':''}>
              <span class="toggle-track"><span class="toggle-thumb"></span></span>
            </label>
            <button class="icon-btn edit-cat-btn" data-id="${cat.id}" title="تعديل"><svg viewBox="0 0 24 24" fill="none" width="13" height="13"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>
            <button class="icon-btn danger delete-cat-btn" data-id="${cat.id}" title="حذف"><svg viewBox="0 0 24 24" fill="none" width="13" height="13"><path d="M3 6h18M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6M10 11v6M14 11v6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>
          </div>
        </div>`;
      }).join('')}
    </div>`}`;
  Utils.el('add-cat-btn')?.addEventListener('click',()=>CategoryModal.open());
  Utils.qsa('.cat-enable-toggle').forEach(t=>t.addEventListener('change',()=>{ toggleCategoryStatus(t.dataset.id); renderAdminCategories(); }));
  Utils.qsa('.edit-cat-btn').forEach(b=>b.addEventListener('click',()=>CategoryModal.open(b.dataset.id)));
  Utils.qsa('.delete-cat-btn').forEach(b=>b.addEventListener('click',()=>confirmDeleteCategory(b.dataset.id)));
  Utils.qsa('.cat-up').forEach(b=>b.addEventListener('click',()=>{ reorderCategory(b.dataset.id,'up'); renderAdminCategories(); }));
  Utils.qsa('.cat-down').forEach(b=>b.addEventListener('click',()=>{ reorderCategory(b.dataset.id,'down'); renderAdminCategories(); }));
}

/* ── إدارة العادات ── */
function renderAdminHabits() {
  const filter=State.adminHabitFilter;
  const allH=[...State.habits].sort((a,b)=>(a.order||0)-(b.order||0));
  const habits=filter==='all'?allH:allH.filter(h=>h.categoryId===filter);
  const searchVal=(Utils.el('admin-habit-search')?.value||'').toLowerCase();
  const filtered=searchVal?habits.filter(h=>h.name.toLowerCase().includes(searchVal)||h.description?.toLowerCase().includes(searchVal)):habits;
  Utils.el('admin-content').innerHTML=`
    <div class="admin-section-header">
      <div class="admin-section-title">إدارة العادات</div>
      <div class="admin-section-actions">
        <input class="admin-search" id="admin-habit-search" placeholder="بحث في العادات…" value="${Utils.esc(searchVal)}">
        <button class="btn-primary btn-sm" id="admin-add-habit-btn"><svg viewBox="0 0 24 24" fill="none" width="14" height="14"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>إضافة عادة</button>
      </div>
    </div>
    <div class="admin-cat-filter">
      <button class="admin-filter-tab ${filter==='all'?'active':''}" data-filter="all">الكل</button>
      ${State.categories.map(cat=>`<button class="admin-filter-tab ${filter===cat.id?'active':''}" data-filter="${cat.id}" style="${filter===cat.id?`color:${cat.color};border-color:${cat.color}44;background:${Utils.hexToRgba(cat.color,.1)}`:''}">
        ${Utils.esc(cat.icon)} ${Utils.esc(cat.name)}</button>`).join('')}
    </div>
    ${filtered.length===0?`<div class="empty-state"><div class="empty-icon">✅</div><div class="empty-title">لا توجد عادات</div><div class="empty-body">جرّب فلتراً مختلفاً أو أضف عادة جديدة.</div></div>`:`
    <div class="admin-list">
      ${filtered.map((h,idx)=>{
        const cat=getCatById(h.categoryId);
        return`<div class="admin-row ${h.enabled?'':'row-disabled'}" data-id="${h.id}">
          <div class="ar-color-bar" style="background:${cat?.color||'#888'}"></div>
          <div class="ar-info">
            <div class="ar-name">${Utils.esc(h.name)}</div>
            <div class="ar-desc">${Utils.esc(h.description||'لا يوجد وصف')}</div>
          </div>
          <div class="ar-meta">
            ${cat?`<span class="cat-badge" style="background:${Utils.hexToRgba(cat.color,.12)};color:${cat.color};border:1px solid ${Utils.hexToRgba(cat.color,.25)}">${Utils.esc(cat.icon)} ${Utils.esc(cat.name)}</span>`:''}
            <span class="${h.type==='boolean'?'type-bool-badge':'type-rating-badge'}">${h.type==='boolean'?'نعم/لا':'تقييم'}</span>
            <span class="status-badge ${h.enabled?'status-active':'status-disabled'}">${h.enabled?'نشط':'معطّل'}</span>
          </div>
          <div class="ar-actions">
            <label class="toggle-switch">
              <input type="checkbox" class="admin-habit-toggle" data-id="${h.id}" ${h.enabled?'checked':''}>
              <span class="toggle-track"><span class="toggle-thumb"></span></span>
            </label>
            <button class="icon-btn edit-habit-btn" data-id="${h.id}" title="تعديل"><svg viewBox="0 0 24 24" fill="none" width="13" height="13"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>
            <button class="icon-btn danger delete-habit-btn" data-id="${h.id}" title="حذف"><svg viewBox="0 0 24 24" fill="none" width="13" height="13"><path d="M3 6h18M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6M10 11v6M14 11v6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>
          </div>
        </div>`;
      }).join('')}
    </div>`}`;
  Utils.el('admin-add-habit-btn')?.addEventListener('click',()=>HabitModal.open());
  Utils.el('admin-habit-search')?.addEventListener('input',()=>renderAdminHabits());
  Utils.qsa('.admin-filter-tab').forEach(t=>t.addEventListener('click',()=>{State.adminHabitFilter=t.dataset.filter;renderAdminHabits();}));
  Utils.qsa('.admin-habit-toggle').forEach(t=>t.addEventListener('change',()=>{ toggleHabitStatus(t.dataset.id); t.closest('.admin-row').classList.toggle('row-disabled',!t.checked); }));
  Utils.qsa('.edit-habit-btn').forEach(b=>b.addEventListener('click',()=>HabitModal.open(b.dataset.id)));
  Utils.qsa('.delete-habit-btn').forEach(b=>b.addEventListener('click',()=>confirmDeleteHabit(b.dataset.id)));
}

function renderLoginPage() {
  const target = Utils.el('login-content');
  if(!target) return;
  const user = State.authUser;
  const firebaseReady = !!window.HabitFlowFirebase;

  target.innerHTML = `
    <div class="auth-page-shell">
      <section class="glass-card login-hero-card">
        <div class="login-brand-mark">
          <div class="login-brand-icon">
            <svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="10" fill="url(#loginGrad)"/><path d="M8 16.5L13 21.5L24 10.5" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><defs><linearGradient id="loginGrad" x1="0" y1="0" x2="32" y2="32"><stop stop-color="#7c3aed"/><stop offset="1" stop-color="#4f46e5"/></linearGradient></defs></svg>
          </div>
          <div>
            <div class="login-brand-name">HabitFlow</div>
            <div class="login-brand-sub">لوحة الحياة اليومية</div>
          </div>
        </div>
        <h2 class="login-hero-title">مرحباً بك في HabitFlow</h2>
        <p class="login-hero-body">حالياً يتم حفظ بياناتك على هذا الجهاز، وستتوفر المزامنة السحابية لاحقاً.</p>
        ${
          State.authLoading ? `
            <div class="auth-status login-status">جارٍ التحقق من حالة تسجيل الدخول…</div>
          ` : State.isSignedIn && user ? `
            <div class="settings-account-card login-user-card">
              <div class="auth-user">
                <div class="auth-avatar auth-avatar-lg">${getAuthAvatarMarkup(user)}</div>
                <div class="auth-user-meta">
                  <div class="auth-user-name">${Utils.esc(getAuthDisplayName(user))}</div>
                  <div class="auth-user-email">${Utils.esc(user.email || 'تم تسجيل الدخول')}</div>
                </div>
              </div>
              <div class="auth-status">أنت مسجل الدخول بالفعل. يمكنك إدارة حسابك من صفحة الإعدادات.</div>
            </div>
            <div class="login-actions">
              <button class="btn-primary" id="login-open-settings-btn">فتح الإعدادات</button>
              <button class="btn-ghost" data-page="dashboard">العودة إلى لوحة التحكم</button>
            </div>
          ` : `
            <div class="auth-card login-card">
              <div class="auth-title">Google Authentication</div>
              <div class="auth-status">${firebaseReady ? 'اضغط على الزر أدناه لفتح نافذة Google وتسجيل الدخول بأمان.' : 'تعذر تحميل Firebase Auth حالياً. تحقق من الاتصال أو إعدادات Authorized domains.'}</div>
              <button class="auth-btn login-google-btn" id="login-google-btn" ${firebaseReady ? '' : 'disabled'}>تسجيل الدخول بحساب Google</button>
            </div>
            <div class="login-actions">
              <button class="btn-secondary" data-page="dashboard">العودة إلى لوحة التحكم</button>
            </div>
          `
        }
      </section>
    </div>`;

  Utils.el('login-google-btn')?.addEventListener('click',()=>handleGoogleSignIn({ navigateToPage:'settings' }));
  Utils.el('login-open-settings-btn')?.addEventListener('click',()=>navigate('settings'));
}

function renderOnboardingPage() {
  const target = Utils.el('onboarding-content');
  if(!target) return;

  target.innerHTML = `
    <div class="auth-page-shell onboarding-shell">
      <section class="glass-card login-hero-card onboarding-card">
        <div class="login-brand-mark onboarding-brand-mark">
          <div class="login-brand-icon onboarding-brand-icon">
            <svg viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="10" fill="url(#onboardingGrad)"/><path d="M8 16.5L13 21.5L24 10.5" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><defs><linearGradient id="onboardingGrad" x1="0" y1="0" x2="32" y2="32"><stop stop-color="#7c3aed"/><stop offset="1" stop-color="#4f46e5"/></linearGradient></defs></svg>
          </div>
          <div>
            <div class="login-brand-name">HabitFlow</div>
            <div class="login-brand-sub">لوحة الحياة اليومية</div>
          </div>
        </div>
        <h2 class="login-hero-title">مرحباً بك في HabitFlow</h2>
        <p class="login-hero-body">رحلتك اليومية لبناء العادات، متابعة التقدم، وتحسين حياتك خطوة بخطوة.</p>

        <div class="onboarding-steps">
          <article class="onboarding-step">
            <div class="onboarding-step-icon">1</div>
            <div class="onboarding-step-body">
              <h3>اختر عاداتك</h3>
              <p>ابدأ بالعادات التي تناسب يومك وأهدافك.</p>
            </div>
          </article>
          <article class="onboarding-step">
            <div class="onboarding-step-icon">2</div>
            <div class="onboarding-step-body">
              <h3>سجّل يومك</h3>
              <p>علّم ما أنجزته يومياً خلال ثوانٍ.</p>
            </div>
          </article>
          <article class="onboarding-step">
            <div class="onboarding-step-icon">3</div>
            <div class="onboarding-step-body">
              <h3>تابع تقدمك</h3>
              <p>راقب التقويم، الإنجازات، والتقارير لتبقى مستمراً.</p>
            </div>
          </article>
        </div>

        <div class="login-actions onboarding-actions">
          <button class="btn-primary" id="onboarding-start-btn">ابدأ الآن</button>
          <button class="btn-ghost" id="onboarding-skip-btn">تخطي</button>
        </div>
      </section>
    </div>`;

  Utils.el('onboarding-start-btn')?.addEventListener('click',finishOnboarding);
  Utils.el('onboarding-skip-btn')?.addEventListener('click',finishOnboarding);
}

function renderSettingsPage() {
  const target = Utils.el('settings-content');
  if(!target) return;

  const user = State.authUser;

  target.innerHTML = `
    <div class="settings-page-wrap">
      <section class="settings-section">
        <div class="settings-section-title">الحساب</div>
        <div class="settings-card settings-page-card">
          ${
            State.isSignedIn && user ? `
              <div class="settings-account-card">
                <div class="auth-user">
                  <div class="auth-avatar auth-avatar-lg">${getAuthAvatarMarkup(user)}</div>
                  <div class="auth-user-meta">
                    <div class="auth-user-name">${Utils.esc(getAuthDisplayName(user))}</div>
                    <div class="auth-user-email">${Utils.esc(user.email || 'تم تسجيل الدخول')}</div>
                  </div>
                </div>
                <span class="status-badge status-active">تم تسجيل الدخول</span>
              </div>
            ` : `
              <div class="settings-account-card settings-account-empty">
                <div class="auth-avatar auth-avatar-lg">🔐</div>
                <div>
                  <div class="auth-user-name">لم يتم تسجيل الدخول بعد</div>
                  <div class="auth-status">يمكنك تسجيل الدخول الآن لتجهيز مزامنة حسابك بين أجهزتك لاحقاً.</div>
                </div>
              </div>
            `
          }
          <div class="settings-actions-row">
            ${State.isSignedIn ? '<button class="btn-danger" id="settings-signout-btn">تسجيل الخروج</button>' : '<button class="btn-primary" id="settings-signin-btn">تسجيل الدخول بـ Google</button>'}
          </div>
        </div>
      </section>

      <section class="settings-section">
        <div class="settings-section-title">تجربة العرض</div>
        <div class="settings-card settings-page-card">
          <div class="toggle-row">
            <div>
              <div class="settings-row-label">المؤثرات البصرية</div>
              <div class="settings-row-hint">إضاءة الكروت والانتقالات الخفيفة داخل الواجهة.</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="settings-visual-effects" ${State.settings.visualEffects?'checked':''}>
              <span class="toggle-track"><span class="toggle-thumb"></span></span>
            </label>
          </div>
          <div class="toggle-row" style="margin-top:10px">
            <div>
              <div class="settings-row-label">الخلفية المتحركة</div>
              <div class="settings-row-hint">تشغيل أو إيقاف حركة الخلفية مع الحفاظ على نفس الهوية البصرية.</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="settings-animated-bg" ${State.settings.animatedBackground?'checked':''}>
              <span class="toggle-track"><span class="toggle-thumb"></span></span>
            </label>
          </div>
          <div class="settings-actions-row">
            <button class="btn-primary" id="settings-save-ui-btn">حفظ التفضيلات</button>
          </div>
        </div>
      </section>

      <section class="settings-section">
        <div class="settings-section-title">بياناتي</div>
        <div class="settings-card settings-page-card">
          <div class="settings-actions-row">
            <button class="btn-secondary" id="settings-export-btn">تصدير البيانات</button>
            <button class="btn-secondary" id="settings-import-btn">استيراد البيانات</button>
          </div>
          <input type="file" id="settings-import-file" class="backup-file-input" accept=".json,application/json">
          <div class="auth-status settings-data-note">يتم حفظ بياناتك على هذا الجهاز، وستتوفر المزامنة السحابية لاحقاً.</div>
        </div>
      </section>

      <section class="settings-section">
        <div class="settings-section-title">عن HabitFlow</div>
        <div class="settings-card settings-page-card about-app-card">
          <div class="settings-about-name">HabitFlow</div>
          <div class="settings-about-description">لوحة يومية لبناء العادات وتتبع التقدم بطريقة واضحة ومحفزة.</div>
          <div class="settings-about-version">الإصدار ${APP_VERSION}</div>
          <div class="settings-actions-row">
            <button class="btn-ghost" id="settings-show-onboarding-btn">عرض شاشة الترحيب مرة أخرى</button>
          </div>
        </div>
      </section>

      <section class="settings-section">
        <button class="settings-danger-toggle" id="settings-danger-toggle" type="button" aria-expanded="false">
          إظهار الخيارات المتقدمة / منطقة الخطر
        </button>
        <div class="settings-danger-panel" id="settings-danger-panel" hidden>
          <div class="settings-card settings-page-card danger-zone settings-danger-zone">
            <div class="danger-zone-title"><svg viewBox="0 0 24 24" fill="none" width="16" height="16"><path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" stroke-width="1.8"/></svg>منطقة الخطر</div>
            <div class="danger-zone-body">هذا الإجراء سيحذف كل بياناتك المحلية من HabitFlow بعد تأكيد واضح.</div>
            <div class="danger-actions">
              <button class="btn-danger" id="settings-factory-reset-btn">مسح جميع البيانات</button>
            </div>
          </div>
        </div>
      </section>
    </div>`;

  Utils.el('settings-signin-btn')?.addEventListener('click',()=>handleGoogleSignIn({ navigateToPage:'settings' }));
  Utils.el('settings-signout-btn')?.addEventListener('click',()=>handleGoogleSignOut({ navigateToPage:'login' }));
  Utils.el('settings-save-ui-btn')?.addEventListener('click',()=>{
    State.settings = normalizeSettings({
      ...State.settings,
      visualEffects: !!Utils.el('settings-visual-effects')?.checked,
      animatedBackground: !!Utils.el('settings-animated-bg')?.checked,
    });
    Storage.saveSettings(State.settings);
    applyAppSettings();
    renderSettingsPage();
    showToast('تم حفظ إعدادات الواجهة.','success');
  });
  Utils.el('settings-export-btn')?.addEventListener('click',downloadBackupFile);
  Utils.el('settings-import-btn')?.addEventListener('click',()=>Utils.el('settings-import-file')?.click());
  Utils.el('settings-import-file')?.addEventListener('change',async e=>{
    const file = e.target.files?.[0];
    if(file) await restoreFromBackupFile(file);
    e.target.value = '';
  });
  Utils.el('settings-show-onboarding-btn')?.addEventListener('click',()=>{
    resetOnboarding();
    navigate('onboarding');
  });
  Utils.el('settings-danger-toggle')?.addEventListener('click',()=>{
    const panel = Utils.el('settings-danger-panel');
    const btn = Utils.el('settings-danger-toggle');
    if(!panel || !btn) return;
    const isHidden = panel.hasAttribute('hidden');
    if(isHidden) panel.removeAttribute('hidden');
    else panel.setAttribute('hidden','');
    btn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
    btn.textContent = isHidden ? 'إخفاء الخيارات المتقدمة / منطقة الخطر' : 'إظهار الخيارات المتقدمة / منطقة الخطر';
  });
  Utils.el('settings-factory-reset-btn')?.addEventListener('click',()=>showConfirm({
    title:'مسح جميع البيانات؟',
    body:'سيتم حذف جميع بيانات HabitFlow المحلية وإعادة تشغيل التطبيق من الصفر.',
    okLabel:'مسح الكل',
    isDanger:true,
    onOk:factoryReset
  }));
}

/* ── الإعدادات في الإدارة ── */
function renderAdminSettings() {
  const s=State.settings;
  Utils.el('admin-content').innerHTML=`
    <div class="settings-section">
      <div class="settings-section-title">إعدادات التطبيق</div>
      <div class="settings-card">
        <div class="settings-row">
          <div><div class="settings-row-label">اسم التطبيق</div><div class="settings-row-hint">يظهر في الشريط الجانبي</div></div>
          <input class="form-input" id="setting-app-name" value="${s.appName||'HabitFlow'}" style="width:200px;padding:8px 12px">
        </div>
        <div class="settings-row">
          <div><div class="settings-row-label">بداية الأسبوع</div><div class="settings-row-hint">مستخدم في التقارير الأسبوعية</div></div>
          <select class="settings-select" id="setting-week-start">
            <option value="monday" ${s.weekStart==='monday'?'selected':''}>الاثنين</option>
            <option value="sunday" ${s.weekStart==='sunday'?'selected':''}>الأحد</option>
          </select>
        </div>
        <div class="settings-row">
          <div><div class="settings-row-label">إجمالي الفئات</div><div class="settings-row-hint">الفئات المُضافة حالياً</div></div>
          <span style="font-size:14px;font-weight:700;color:#a78bfa">${State.categories.length}</span>
        </div>
        <div class="settings-row">
          <div><div class="settings-row-label">إجمالي العادات</div><div class="settings-row-hint">شاملة المعطّلة</div></div>
          <span style="font-size:14px;font-weight:700;color:#60a5fa">${State.habits.length}</span>
        </div>
        <div class="settings-row">
          <div><div class="settings-row-label">أيام مسجّلة</div><div class="settings-row-hint">السجلات في التخزين</div></div>
          <span style="font-size:14px;font-weight:700;color:#4ade80">${Object.keys(Storage.getRecords()).length}</span>
        </div>
      </div>
      <div style="margin-top:14px"><button class="btn-primary" id="save-settings-btn">حفظ الإعدادات</button></div>
    </div>
    <div class="settings-section">
      <div class="settings-section-title">منطقة الخطر</div>
      <div class="danger-zone">
        <div class="danger-zone-title"><svg viewBox="0 0 24 24" fill="none" width="16" height="16"><path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" stroke-width="1.8"/></svg>إجراءات تدميرية</div>
        <div class="danger-actions">
          <button class="btn-warning" id="reset-defaults-btn">↺ استعادة البيانات الافتراضية</button>
          <button class="btn-danger" id="clear-records-btn">🗑️ مسح جميع السجلات</button>
        </div>
      </div>
    </div>`;
  Utils.el('save-settings-btn')?.addEventListener('click',()=>{
    State.settings = normalizeSettings({
      ...State.settings,
      appName: Utils.el('setting-app-name').value,
      weekStart: Utils.el('setting-week-start').value,
    });
    Storage.saveSettings(State.settings);
    applyAppSettings();
    showToast('تم حفظ الإعدادات!','success');
  });
  Utils.el('reset-defaults-btn')?.addEventListener('click',()=>showConfirm({
    title:'استعادة البيانات الافتراضية؟',
    body:'سيتم استبدال جميع العادات والفئات بالإعدادات الافتراضية. سجلاتك اليومية ستبقى محفوظة.',
    okLabel:'استعادة',isDanger:false,
    onOk:resetToDefaults
  }));
  Utils.el('clear-records-btn')?.addEventListener('click',()=>showConfirm({
    title:'مسح جميع السجلات؟',
    body:'سيتم حذف جميع سجلات التتبع اليومية والملاحظات بشكل دائم. العادات والفئات لن تتأثر.',
    okLabel:'مسح الكل',isDanger:true,
    onOk:()=>{ Storage.saveRecords({}); Storage.saveNotes({}); showToast('تم مسح جميع السجلات.',''); }
  }));
}

/* ── النسخ الاحتياطي في الإدارة ── */
function renderAdminBackup() {
  const syncSettings=loadBackupSettings();
  const lastSync=getLastSyncInfo();
  const payload=getBackupPayload('ui-preview');
  Utils.el('admin-content').innerHTML=`
    <div class="backup-grid">
      <div class="backup-card backup-card-wide">
        <div class="backup-card-title">💾 النسخ الاحتياطي والمزامنة</div>
        <div class="backup-card-desc">احفظ نسخة JSON يدوية أو أرسل آخر نسخة من بيانات HabitFlow إلى Google Sheets، مع الإبقاء على localStorage الحالي كما هو.</div>
        <div class="backup-status-list">
          <div class="backup-status-row"><span>محتوى النسخة الحالية</span><strong>${payload.meta.counts.recordDays} يوم • ${payload.meta.counts.habits} عادة • ${payload.meta.counts.tasks} مهمة</strong></div>
          <div class="backup-status-row"><span>آخر مزامنة ناجحة</span><strong>${formatDateTime(lastSync.lastSuccessAt)}</strong></div>
          <div class="backup-status-row"><span>آخر محاولة</span><strong>${formatDateTime(lastSync.lastAttemptAt)}</strong></div>
          <div class="backup-status-row"><span>الحالة</span><strong class="backup-status-pill ${lastSync.lastStatus||'idle'}">${lastSync.lastStatus==='success'?'ناجحة':lastSync.lastStatus==='error'?'فاشلة':lastSync.lastStatus==='running'?'قيد التنفيذ':'جاهزة'}</strong></div>
          <div class="backup-status-row"><span>آخر خطأ</span><strong>${lastSync.lastError||'لا يوجد'}</strong></div>
        </div>
        <div class="backup-actions">
          <button class="btn-primary" id="backup-sync-now-btn">مزامنة الآن</button>
          <button class="btn-secondary" id="backup-download-btn">تصدير JSON</button>
          <button class="btn-secondary" id="backup-import-trigger-btn">استيراد JSON</button>
          <input type="file" id="backup-file-input" class="backup-file-input" accept=".json,application/json">
        </div>
        <div class="backup-note">الحفظ اليومي الساعة 03:00 AM يتم من Google Apps Script اعتماداً على آخر نسخة تمت مزامنتها من الموقع.</div>
      </div>
      <div class="backup-card">
        <div class="backup-card-title">☁️ إعدادات Google Sheets</div>
        <div class="backup-card-desc">أدخل Web App URL وSecret Token الخاصين بـ Apps Script. سيتم حفظهما محلياً في هذا المتصفح فقط.</div>
        <div class="backup-form-grid">
          <label class="backup-field">
            <span>Google Apps Script Web App URL</span>
            <input class="form-input" id="backup-webapp-url" placeholder="https://script.google.com/macros/s/..." value="${Utils.esc(syncSettings.webAppUrl||'')}">
          </label>
          <label class="backup-field">
            <span>Secret Token</span>
            <input class="form-input" id="backup-secret-token" type="password" placeholder="اختياري لكن موصى به" value="${Utils.esc(syncSettings.secretToken||'')}">
          </label>
        </div>
        <div class="backup-toggle-row">
          <label class="backup-toggle-label" for="backup-auto-sync-toggle">تفعيل Auto Sync بعد تغيّر البيانات</label>
          <input type="checkbox" id="backup-auto-sync-toggle" ${syncSettings.autoSync?'checked':''}>
        </div>
        <div class="backup-actions">
          <button class="btn-primary" id="backup-save-settings-btn">حفظ إعدادات المزامنة</button>
        </div>
        <div class="backup-note">فشل Google Sync لا يمنع استخدام التطبيق. وإذا كان الموقع مغلقاً فلن يعمل حفظ 03:00 AM من المتصفح، بل من Trigger داخل Apps Script.</div>
      </div>
    </div>
    <div style="margin-top:18px" class="backup-card">
      <div class="backup-card-title">⚠️ خيارات إعادة التعيين</div>
      <div class="backup-card-desc">إعادة تعيين أجزاء من بياناتك بشكل دائم. لا يمكن التراجع عن هذه الإجراءات.</div>
      <div class="backup-actions" style="flex-wrap:wrap">
        <button class="btn-warning" id="backup-reset-defaults-btn">↺ استعادة العادات والفئات الافتراضية</button>
        <button class="btn-danger" id="backup-clear-records-btn">🗑️ مسح السجلات اليومية</button>
        <button class="btn-danger" id="factory-reset-btn">💥 إعادة ضبط المصنع</button>
      </div>
    </div>`;
  Utils.el('backup-save-settings-btn')?.addEventListener('click',()=>{
    const saved=saveBackupSettings({
      webAppUrl: Utils.el('backup-webapp-url').value,
      secretToken: Utils.el('backup-secret-token').value,
      autoSync: Utils.el('backup-auto-sync-toggle').checked,
    });
    showToast(saved.autoSync?'تم حفظ الإعدادات وتفعيل Auto Sync.':'تم حفظ إعدادات المزامنة.','success');
    renderAdminBackup();
  });
  Utils.el('backup-sync-now-btn')?.addEventListener('click',()=>{
    saveBackupSettings({
      webAppUrl: Utils.el('backup-webapp-url').value,
      secretToken: Utils.el('backup-secret-token').value,
      autoSync: Utils.el('backup-auto-sync-toggle').checked,
    });
    syncBackupToGoogleSheets({ reason:'manual', silent:false });
  });
  Utils.el('backup-download-btn')?.addEventListener('click',downloadBackupFile);
  Utils.el('backup-import-trigger-btn')?.addEventListener('click',()=>Utils.el('backup-file-input')?.click());
  Utils.el('backup-file-input')?.addEventListener('change',async e=>{
    const file=e.target.files?.[0];
    if(file) await restoreFromBackupFile(file);
    e.target.value='';
  });
  Utils.el('backup-reset-defaults-btn')?.addEventListener('click',()=>showConfirm({title:'استعادة البيانات الافتراضية؟',body:'سيتم استبدال العادات والفئات بالافتراضية. السجلات اليومية ستبقى محفوظة.',okLabel:'استعادة',isDanger:false,onOk:resetToDefaults}));
  Utils.el('backup-clear-records-btn')?.addEventListener('click',()=>showConfirm({title:'مسح جميع السجلات؟',body:'حذف جميع سجلات التتبع اليومية والملاحظات بشكل دائم.',okLabel:'مسح',isDanger:true,onOk:()=>{ Storage.saveRecords({}); Storage.saveNotes({}); showToast('تم مسح السجلات.',''); }}));
  Utils.el('factory-reset-btn')?.addEventListener('click',()=>showConfirm({title:'إعادة ضبط المصنع؟',body:'سيتم حذف كل شيء — العادات والفئات والسجلات والملاحظات والإعدادات. سيُعاد تشغيل التطبيق بالبيانات الافتراضية.',okLabel:'إعادة تعيين الكل',isDanger:true,onOk:factoryReset}));
}

/* ══════════════════════════════════════════
   14. نافذة العادة
══════════════════════════════════════════ */

const HabitModal = {
  open(habitId=null) {
    const h=habitId?State.habits.find(x=>x.id===habitId):null;
    Utils.el('modal-title').textContent=h?'تعديل العادة':'إضافة عادة جديدة';
    Utils.el('habit-edit-id').value=habitId||'';
    Utils.el('habit-name-input').value=h?.name||'';
    Utils.el('habit-desc-input').value=h?.description||'';
    Utils.el('habit-enabled-toggle').checked=h?h.enabled:true;
    // ملء قائمة الفئات
    const sel=Utils.el('habit-category-select');
    sel.innerHTML=State.categories.map(cat=>`<option value="${cat.id}" ${h?.categoryId===cat.id?'selected':''}>${Utils.esc(cat.icon)} ${Utils.esc(cat.name)}</option>`).join('');
    const typeVal=h?.type||'boolean';
    Utils.qsa('input[name="habit-type"]').forEach(r=>r.checked=r.value===typeVal);
    Utils.el('modal-overlay').classList.add('open');
    setTimeout(()=>Utils.el('habit-name-input').focus(),150);
  },
  close() { Utils.el('modal-overlay').classList.remove('open'); },
  save() {
    const name=Utils.el('habit-name-input').value.trim();
    if(!name){ showToast('يرجى إدخال اسم العادة.','error'); return; }
    const desc=Utils.el('habit-desc-input').value.trim();
    const categoryId=Utils.el('habit-category-select').value;
    const type=Utils.qs('input[name="habit-type"]:checked')?.value||'boolean';
    const enabled=Utils.el('habit-enabled-toggle').checked;
    const editId=Utils.el('habit-edit-id').value;
    if(editId) {
      updateHabit(editId,{name,description:desc,categoryId,type,enabled});
    } else {
      addHabit({name,description:desc,categoryId,type,enabled});
    }
    HabitModal.close();
    if(State.page==='manage') renderManage();
    if(State.page==='admin') renderAdmin();
    showToast(editId?'تم تحديث العادة!':'تمت إضافة العادة! 🎉','success');
  },
};

/* ══════════════════════════════════════════
   15. نافذة الفئة
══════════════════════════════════════════ */

const CategoryModal = {
  open(catId=null) {
    const cat=catId?getCatById(catId):null;
    Utils.el('cat-modal-title').textContent=cat?'تعديل الفئة':'إضافة فئة جديدة';
    Utils.el('cat-edit-id').value=catId||'';
    Utils.el('cat-name-input').value=cat?.name||'';
    Utils.el('cat-desc-input').value=cat?.description||'';
    Utils.el('cat-icon-input').value=cat?.icon||'';
    Utils.el('cat-color-input').value=cat?.color||'#4ade80';
    Utils.el('cat-enabled-toggle').checked=cat?cat.enabled!==false:true;
    // بناء شبكة الأيقونات
    const grid=Utils.el('icon-preset-grid');
    grid.innerHTML=ICON_PRESETS.map(ic=>`<button class="icon-preset-btn ${cat?.icon===ic?'selected':''}" data-icon="${ic}">${ic}</button>`).join('');
    grid.querySelectorAll('.icon-preset-btn').forEach(btn=>{
      btn.addEventListener('click',()=>{
        Utils.el('cat-icon-input').value=btn.dataset.icon;
        grid.querySelectorAll('.icon-preset-btn').forEach(b=>b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });
    // بناء ألوان العينات
    const sw=Utils.el('color-swatches');
    sw.innerHTML=COLOR_PRESETS.map(c=>`<div class="color-swatch ${cat?.color===c?'selected':''}" data-color="${c}" style="background:${c}" title="${c}"></div>`).join('');
    sw.querySelectorAll('.color-swatch').forEach(s=>{
      s.addEventListener('click',()=>{
        Utils.el('cat-color-input').value=s.dataset.color;
        sw.querySelectorAll('.color-swatch').forEach(x=>x.classList.remove('selected'));
        s.classList.add('selected');
      });
    });
    Utils.el('cat-color-input').addEventListener('input',()=>{
      sw.querySelectorAll('.color-swatch').forEach(x=>x.classList.remove('selected'));
    });
    Utils.el('cat-modal-overlay').classList.add('open');
    setTimeout(()=>Utils.el('cat-name-input').focus(),150);
  },
  close() { Utils.el('cat-modal-overlay').classList.remove('open'); },
  save() {
    const name=Utils.el('cat-name-input').value.trim();
    if(!name){ showToast('يرجى إدخال اسم الفئة.','error'); return; }
    const desc=Utils.el('cat-desc-input').value.trim();
    const icon=Utils.el('cat-icon-input').value.trim()||'📌';
    const color=Utils.el('cat-color-input').value;
    const enabled=Utils.el('cat-enabled-toggle').checked;
    const editId=Utils.el('cat-edit-id').value;
    if(editId) {
      updateCategory(editId,{name,description:desc,icon,color,enabled});
      showToast('تم تحديث الفئة!','success');
    } else {
      addCategory({name,description:desc,icon,color,enabled});
      showToast('تمت إضافة الفئة! 🎉','success');
    }
    CategoryModal.close();
    if(State.page==='admin') renderAdmin();
  },
};

/* ══════════════════════════════════════════
   16. نافذة التأكيد العامة
══════════════════════════════════════════ */

let _pendingConfirm = null;

function showConfirm({title,body,okLabel='تأكيد',isDanger=true,onOk}) {
  _pendingConfirm=onOk;
  Utils.el('confirm-title').textContent=title;
  Utils.el('confirm-body').textContent=body;
  const ok=Utils.el('confirm-ok');
  ok.textContent=okLabel;
  ok.className=isDanger?'btn-danger':'btn-primary';
  const icon=Utils.el('confirm-icon');
  icon.className=isDanger?'confirm-icon danger-icon':'confirm-icon';
  Utils.el('confirm-overlay').classList.add('open');
}

/* ══════════════════════════════════════════
   17. عمليات CRUD للفئات
══════════════════════════════════════════ */

function addCategory(data) {
  const maxOrder=State.categories.reduce((m,c)=>Math.max(m,c.order||0),-1);
  const cat={
    id: Utils.uid(),
    name: data.name,
    description: data.description||'',
    icon: data.icon||'📌',
    color: data.color||'#4ade80',
    enabled: data.enabled!==false,
    order: maxOrder+1,
  };
  State.categories.push(cat);
  Storage.saveCategories(State.categories);
  return cat;
}

function updateCategory(id,data) {
  const cat=getCatById(id); if(!cat)return;
  Object.assign(cat,{
    name:data.name??cat.name,
    description:data.description??cat.description,
    icon:data.icon??cat.icon,
    color:data.color??cat.color,
    enabled:data.enabled??cat.enabled,
  });
  Storage.saveCategories(State.categories);
}

function deleteCategory(id,deleteHabits=false) {
  if(deleteHabits){
    State.habits=State.habits.filter(h=>h.categoryId!==id);
    Storage.saveHabits(State.habits);
  }
  State.categories=State.categories.filter(c=>c.id!==id);
  Storage.saveCategories(State.categories);
}

function toggleCategoryStatus(id) {
  const cat=getCatById(id); if(!cat)return;
  cat.enabled=!cat.enabled;
  Storage.saveCategories(State.categories);
}

function reorderCategory(id,direction) {
  const cats=[...State.categories].sort((a,b)=>(a.order||0)-(b.order||0));
  const idx=cats.findIndex(c=>c.id===id); if(idx===-1)return;
  const swapIdx=direction==='up'?idx-1:idx+1;
  if(swapIdx<0||swapIdx>=cats.length)return;
  [cats[idx].order,cats[swapIdx].order]=[cats[swapIdx].order,cats[idx].order];
  State.categories=cats;
  Storage.saveCategories(State.categories);
}

/* ── تأكيد حذف الفئة (مع تحذير العادات) ── */
function confirmDeleteCategory(id) {
  const cat=getCatById(id); if(!cat)return;
  const habitCount=State.habits.filter(h=>h.categoryId===id).length;
  if(habitCount>0){
    showConfirm({
      title:`حذف "${cat.name}"؟`,
      body:`تحتوي هذه الفئة على ${habitCount} عادة. حذفها سيؤدي إلى حذف جميع عاداتها وسجلاتها. لا يمكن التراجع عن هذا.`,
      okLabel:'حذف الكل',isDanger:true,
      onOk:()=>{ deleteCategory(id,true); if(State.page==='admin')renderAdmin(); showToast('تم حذف الفئة والعادات.',''); }
    });
  } else {
    showConfirm({
      title:`حذف "${cat.name}"؟`,
      body:'هذه الفئة لا تحتوي على عادات. سيتم إزالتها نهائياً.',
      okLabel:'حذف',isDanger:true,
      onOk:()=>{ deleteCategory(id,false); if(State.page==='admin')renderAdmin(); showToast('تم حذف الفئة.',''); }
    });
  }
}

/* ══════════════════════════════════════════
   18. عمليات CRUD للعادات
══════════════════════════════════════════ */

function addHabit(data) {
  const maxOrder=State.habits.filter(h=>h.categoryId===data.categoryId).reduce((m,h)=>Math.max(m,h.order||0),-1);
  const h={
    id: Utils.uid(),
    name: data.name,
    description: data.description||'',
    categoryId: data.categoryId,
    type: data.type||'boolean',
    enabled: data.enabled!==false,
    order: maxOrder+1,
    createdAt: Utils.today(),
  };
  State.habits.push(h);
  Storage.saveHabits(State.habits);
  return h;
}

function updateHabit(id,data) {
  const h=State.habits.find(x=>x.id===id); if(!h)return;
  Object.assign(h,{
    name:data.name??h.name,
    description:data.description??h.description,
    categoryId:data.categoryId??h.categoryId,
    type:data.type??h.type,
    enabled:data.enabled??h.enabled,
  });
  Storage.saveHabits(State.habits);
}

function deleteHabit(id) {
  State.habits=State.habits.filter(h=>h.id!==id);
  const records=Storage.getRecords();
  Object.values(records).forEach(day=>{ delete day[id]; });
  Storage.saveRecords(records);
  Storage.saveHabits(State.habits);
}

function toggleHabitStatus(id) {
  const h=State.habits.find(x=>x.id===id); if(!h)return;
  h.enabled=!h.enabled;
  Storage.saveHabits(State.habits);
}

function confirmDeleteHabit(id) {
  const h=State.habits.find(x=>x.id===id); if(!h)return;
  showConfirm({
    title:`حذف "${h.name}"؟`,
    body:'سيتم حذف العادة وجميع سجلات تتبعها نهائياً.',
    okLabel:'حذف',isDanger:true,
    onOk:()=>{
      deleteHabit(id);
      if(State.page==='manage') renderManage();
      if(State.page==='admin') renderAdmin();
      showToast('تم حذف العادة.','');
    }
  });
}

function reorderHabit(id,direction) {
  const h=State.habits.find(x=>x.id===id); if(!h)return;
  const catH=[...State.habits].filter(x=>x.categoryId===h.categoryId).sort((a,b)=>(a.order||0)-(b.order||0));
  const idx=catH.findIndex(x=>x.id===id);
  const swapIdx=direction==='up'?idx-1:idx+1;
  if(swapIdx<0||swapIdx>=catH.length)return;
  [catH[idx].order,catH[swapIdx].order]=[catH[swapIdx].order,catH[idx].order];
  Storage.saveHabits(State.habits);
}

/* ══════════════════════════════════════════
   19. وظائف النسخ الاحتياطي والاستعادة
══════════════════════════════════════════ */

let _backupAutoSyncTimer = null;
let _backupImportFileLock = false;
let _backupAutoSyncSuspended = false;

function loadBackupSettings() {
  return Storage.getBackupSettings();
}

function saveBackupSettings(settings) {
  const next = {
    webAppUrl: String(settings?.webAppUrl||'').trim(),
    secretToken: String(settings?.secretToken||'').trim(),
    autoSync: !!settings?.autoSync,
  };
  Storage.saveBackupSettings(next);
  return next;
}

function getLastSyncInfo() {
  return Storage.getLastSyncInfo();
}

function saveLastSyncInfo(patch) {
  const prev = Storage.getLastSyncInfo();
  const next = { ...prev, ...patch };
  Storage.saveLastSyncInfo(next);
  return next;
}

function formatDateTime(value) {
  if(!value) return '—';
  const d = new Date(value);
  if(Number.isNaN(d.getTime())) return '—';
  return d.toLocaleString('ar', {
    year:'numeric',
    month:'short',
    day:'numeric',
    hour:'2-digit',
    minute:'2-digit',
  });
}

function getProjectStorageSnapshot() {
  const snapshot = {};
  Object.values(KEYS).forEach(key => {
    if(key===KEYS.BACKUP_PRE_RESTORE) return;
    const raw = localStorage.getItem(key);
    if(raw!==null) snapshot[key] = Storage._get(key);
  });
  return snapshot;
}

function getBackupPayload(source='manual-export') {
  const backupSettings = loadBackupSettings();
  const lastSyncInfo = getLastSyncInfo();
  return {
    appName: 'HabitFlow',
    backupVersion: BACKUP_VERSION,
    appVersion: APP_VERSION,
    exportedAt: new Date().toISOString(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null,
    source,
    data: {
      categories: State.categories,
      habits: State.habits,
      records: Storage.getRecords(),
      notes: Storage.getNotes(),
      settings: State.settings,
      timelines: State.timelines,
      challenges: State.challenges,
      tasks: Storage.getTasks(),
      tasksDone: Storage.getTasksDone(),
      journal: Storage.getJournal(),
      achievements: Storage.getAchievements(),
      backupSettings,
      lastSyncInfo,
      rawLocalStorage: getProjectStorageSnapshot(),
    },
    meta: {
      storageKeysIncluded: Object.values(KEYS).filter(k=>k!==KEYS.BACKUP_PRE_RESTORE),
      storageKeysExcluded: [KEYS.BACKUP_PRE_RESTORE],
      counts: {
        categories: State.categories.length,
        habits: State.habits.length,
        recordDays: Object.keys(Storage.getRecords()).length,
        notesDays: Object.keys(Storage.getNotes()).length,
        timelines: State.timelines.length,
        challenges: State.challenges.length,
        tasks: State.tasks.length,
        journal: State.journal.length,
        achievements: State.achievements.length,
      },
    },
  };
}

function exportAppData() {
  return JSON.stringify(getBackupPayload('manual-export'), null, 2);
}

function exportData() {
  return exportAppData();
}

function getBackupFileName(date=new Date()) {
  return `habitflow-backup-${date.getFullYear()}-${Utils.pad(date.getMonth()+1)}-${Utils.pad(date.getDate())}-${Utils.pad(date.getHours())}-${Utils.pad(date.getMinutes())}.json`;
}

function downloadBackupFile() {
  const json = exportAppData();
  const blob = new Blob([json], { type:'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = getBackupFileName();
  a.click();
  setTimeout(()=>URL.revokeObjectURL(url), 800);
  showToast('تم تصدير النسخة الاحتياطية!','success');
}

function validateBackupPayload(payload) {
  if(isPlainObject(payload) && payload.appName!=='HabitFlow' && Array.isArray(payload.categories) && Array.isArray(payload.habits)) {
    return {
      appName:'HabitFlow',
      backupVersion:0,
      appVersion:'legacy',
      exportedAt:payload.exportedAt||null,
      timezone:null,
      source:'legacy-json',
      data:{
        categories: payload.categories,
        habits: payload.habits,
        records: isPlainObject(payload.records)?payload.records:{},
        notes: isPlainObject(payload.notes)?payload.notes:{},
        settings: normalizeSettings(payload.settings),
        timelines: Array.isArray(payload.timelines)?payload.timelines:[],
        challenges: Array.isArray(payload.challenges)?payload.challenges:[],
        tasks: Array.isArray(payload.tasks)?payload.tasks:[],
        tasksDone: isPlainObject(payload.tasksDone)?payload.tasksDone:{},
        journal: Array.isArray(payload.journal)?payload.journal:[],
        achievements: Array.isArray(payload.achievements)?payload.achievements:[],
      },
      meta:{ migratedFromLegacy:true },
    };
  }
  if(!isPlainObject(payload)) throw new Error('ملف النسخة الاحتياطية غير صالح.');
  if(payload.appName!=='HabitFlow') throw new Error('هذا الملف لا يخص HabitFlow.');
  if(payload.backupVersion==null) throw new Error('backupVersion مفقود.');
  if(!isPlainObject(payload.data)) throw new Error('بيانات النسخة الاحتياطية غير مكتملة.');

  const validators = {
    categories: Array.isArray,
    habits: Array.isArray,
    records: isPlainObject,
    notes: isPlainObject,
    settings: isPlainObject,
    timelines: Array.isArray,
    challenges: Array.isArray,
    tasks: Array.isArray,
    tasksDone: isPlainObject,
    journal: Array.isArray,
    achievements: Array.isArray,
    backupSettings: isPlainObject,
    lastSyncInfo: isPlainObject,
    rawLocalStorage: isPlainObject,
  };

  Object.entries(validators).forEach(([key,check])=>{
    if(key in payload.data && !check(payload.data[key])) throw new Error(`حقل "${key}" تالف أو غير متوقع.`);
  });

  return payload;
}

function applyImportedBackupData(payload) {
  const data = payload.data;
  _backupAutoSyncSuspended = true;
  try {
    Storage.savePreRestoreBackup(getBackupPayload('pre-restore-auto'));

    if(data.categories)   { State.categories=data.categories; Storage.saveCategories(State.categories); }
    if(data.habits)       { State.habits=data.habits; Storage.saveHabits(State.habits); }
    if(data.records)      { Storage.saveRecords(data.records); }
    if(data.notes)        { Storage.saveNotes(data.notes); }
    if(data.settings)     { State.settings=normalizeSettings(data.settings); Storage.saveSettings(State.settings); }
    if(data.timelines)    { State.timelines=data.timelines; Storage.saveTimelines(State.timelines); }
    if(data.challenges)   { State.challenges=data.challenges; Storage.saveChallenges(State.challenges); }
    if(data.tasks)        { State.tasks=data.tasks; Storage.saveTasks(State.tasks); }
    if(data.tasksDone)    { Storage.saveTasksDone(data.tasksDone); }
    if(data.journal)      { State.journal=data.journal; Storage.saveJournal(State.journal); }
    if(data.achievements) { State.achievements=data.achievements; Storage.saveAchievements(State.achievements); }
    if(data.backupSettings) saveBackupSettings(data.backupSettings);
    if(data.lastSyncInfo) Storage.saveLastSyncInfo(data.lastSyncInfo);

    State.activeTimelineId = State.timelines[0]?.id||null;
    applyAppSettings();
    renderPage(State.page);
    if(State.page==='admin') renderAdmin();
  } finally {
    _backupAutoSyncSuspended = false;
  }
}

function importAppData(input,{skipConfirm=false, source='json-import'}={}) {
  let payload;
  try {
    payload = typeof input==='string' ? JSON.parse(input) : input;
    validateBackupPayload(payload);
  } catch(err) {
    showToast(err?.message||'JSON غير صالح — فشل الاستيراد.','error');
    return false;
  }

  if(!skipConfirm) {
    showConfirm({
      title:'استيراد نسخة احتياطية؟',
      body:'سيتم استبدال البيانات الحالية ببيانات النسخة الاحتياطية. تمهيداً للأمان سنحفظ نسخة تلقائية محلية قبل الاستيراد.',
      okLabel:'استيراد',
      isDanger:true,
      onOk:()=>importAppData(payload,{skipConfirm:true, source}),
    });
    return true;
  }

  try {
    applyImportedBackupData({ ...payload, source });
    showToast('تم استيراد البيانات بنجاح! 🎉','success');
    return true;
  } catch(err) {
    showToast(err?.message||'فشل استيراد النسخة الاحتياطية.','error');
    return false;
  }
}

function importData(json) {
  return importAppData(json,{ source:'legacy-import' });
}

async function restoreFromBackupFile(file) {
  if(!file || _backupImportFileLock) return;
  _backupImportFileLock = true;
  try {
    const text = await file.text();
    importAppData(text,{ source:'file-import' });
  } catch {
    showToast('تعذر قراءة ملف النسخة الاحتياطية.','error');
  } finally {
    _backupImportFileLock = false;
  }
}

function queueBackupAutoSync(reason='data-change') {
  if(_backupAutoSyncSuspended) return;
  const settings = loadBackupSettings();
  if(!settings.autoSync || !settings.webAppUrl) return;
  clearTimeout(_backupAutoSyncTimer);
  _backupAutoSyncTimer = window.setTimeout(()=>{
    syncBackupToGoogleSheets({ silent:true, reason:`auto:${reason}` });
  }, BACKUP_AUTO_SYNC_DEBOUNCE_MS);
}

async function syncBackupToGoogleSheets({silent=false, reason='manual'}={}) {
  const settings = loadBackupSettings();
  if(!settings.webAppUrl) {
    saveLastSyncInfo({
      lastAttemptAt:new Date().toISOString(),
      lastStatus:'error',
      lastErrorAt:new Date().toISOString(),
      lastError:'رابط Google Apps Script غير مضبوط.',
      message:'تعذر بدء المزامنة.',
      source:reason,
    });
    if(!silent) showToast('أدخل رابط Google Apps Script أولاً.','error');
    if(State.page==='admin' && State.adminTab==='backup') renderAdminBackup();
    return { ok:false, error:'missing-url' };
  }

  const payload = getBackupPayload(reason==='manual' ? 'manual-sync' : reason);
  const now = new Date().toISOString();
  saveLastSyncInfo({ lastAttemptAt:now, lastStatus:'running', message:'جارٍ إرسال النسخة الاحتياطية…', source:reason });

  try {
    const res = await fetch(settings.webAppUrl, {
      method:'POST',
      headers:{ 'Content-Type':'text/plain;charset=utf-8' },
      body: JSON.stringify({
        action: 'saveBackup',
        token: settings.secretToken||'',
        payload,
      }),
    });

    const raw = await res.text();
    let parsed = {};
    try { parsed = raw ? JSON.parse(raw) : {}; } catch { parsed = { raw }; }
    if(!res.ok) throw new Error(parsed?.error || `HTTP ${res.status}`);
    if(parsed && parsed.success===false) throw new Error(parsed.error || parsed.message || 'فشل حفظ النسخة في Google Sheets.');

    saveLastSyncInfo({
      lastSuccessAt:now,
      lastAttemptAt:now,
      lastStatus:'success',
      lastErrorAt:null,
      lastError:'',
      message:parsed?.message || 'تمت المزامنة بنجاح.',
      source:reason,
    });

    if(!silent) showToast('تمت المزامنة مع Google Sheets.','success');
    if(State.page==='admin' && State.adminTab==='backup') renderAdminBackup();
    return { ok:true, response:parsed };
  } catch(err) {
    saveLastSyncInfo({
      lastAttemptAt:now,
      lastStatus:'error',
      lastErrorAt:now,
      lastError:err?.message || 'تعذر الاتصال بخدمة المزامنة.',
      message:'فشلت المزامنة.',
      source:reason,
    });
    if(!silent) showToast(err?.message || 'فشلت المزامنة مع Google Sheets.','error');
    if(State.page==='admin' && State.adminTab==='backup') renderAdminBackup();
    return { ok:false, error:err };
  }
}

function resetToDefaults() {
  State.habits=JSON.parse(JSON.stringify(DEFAULT_HABITS));
  State.categories=JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
  Storage.saveHabits(State.habits);
  Storage.saveCategories(State.categories);
  renderPage(State.page);
  showToast('تم استعادة البيانات الافتراضية!','success');
}

function factoryReset() {
  Object.values(KEYS).forEach(k=>localStorage.removeItem(k));
  location.reload();
}

/* ══════════════════════════════════════════
   20. الخط الزمني (متعدد الخطوط)
══════════════════════════════════════════ */

function tlGetCat(id) { return TIMELINE_CATEGORIES.find(c=>c.id===id)||TIMELINE_CATEGORIES[6]; }
function tlZoom()     { return TL_ZOOM_STEPS[State.tlZoomIdx]; }

function getActiveTimeline() {
  if(!State.timelines.length) return null;
  return State.timelines.find(t=>t.id===State.activeTimelineId)||State.timelines[0];
}

function getFilteredEvents(tl) {
  if(!tl) return [];
  let evs=[...tl.events];
  if(State.tlCatFilter!=='all') evs=evs.filter(e=>e.category===State.tlCatFilter);
  if(State.tlSearch.trim()){
    const q=State.tlSearch.trim().toLowerCase();
    evs=evs.filter(e=>e.name.toLowerCase().includes(q)||(e.notes||'').toLowerCase().includes(q));
  }
  return evs.sort((a,b)=>a.date.localeCompare(b.date));
}

/* ── منتقي الخط الزمني ── */
function renderTimelineSelector() {
  const el=Utils.el('tl-selector');
  if(!State.timelines.length){
    el.innerHTML=`<div class="tl-sel-empty">لا توجد خطوط زمنية — انقر على <strong>خط جديد</strong> للبدء.</div>`;
    return;
  }
  el.innerHTML=State.timelines.map(tl=>{
    const isActive=tl.id===(State.activeTimelineId||State.timelines[0]?.id);
    const cnt=tl.events?.length||0;
    return`<div class="tl-sel-card ${isActive?'active':''}" data-tl-id="${tl.id}">
      <div class="tl-sel-color-bar" style="background:${tl.color||'#a78bfa'}"></div>
      <div class="tl-sel-body">
        <div class="tl-sel-icon">${Utils.esc(tl.icon||'🗓️')}</div>
        <div class="tl-sel-info">
          <div class="tl-sel-name">${Utils.esc(tl.name)}</div>
          <div class="tl-sel-count">${cnt} حدث</div>
        </div>
        <div class="tl-sel-actions">
          <button class="tl-sel-edit" title="تعديل" data-tl-edit="${tl.id}">✏️</button>
          <button class="tl-sel-del"  title="حذف" data-tl-del="${tl.id}">🗑️</button>
        </div>
      </div>
    </div>`;
  }).join('')+`<button class="tl-sel-add" id="tl-sel-add-btn">＋ جديد</button>`;

  Utils.qsa('.tl-sel-card').forEach(card=>{
    card.addEventListener('click',e=>{
      if(e.target.closest('[data-tl-edit],[data-tl-del]')) return;
      State.activeTimelineId=card.dataset.tlId;
      State.tlCatFilter='all'; State.tlSearch='';
      renderTimeline();
    });
  });
  Utils.qsa('[data-tl-edit]').forEach(btn=>btn.addEventListener('click',e=>{e.stopPropagation();TlModal.open(btn.dataset.tlEdit);}));
  Utils.qsa('[data-tl-del]').forEach(btn=>btn.addEventListener('click',e=>{e.stopPropagation();confirmDeleteTimeline(btn.dataset.tlDel);}));
  const addBtn=Utils.el('tl-sel-add-btn');
  if(addBtn) addBtn.addEventListener('click',()=>TlModal.open());
}

/* ── شريط الإحصائيات ── */
function renderTimelineStats(tl,evs) {
  const el=Utils.el('tl-stats-bar');
  const all=tl?[...tl.events].sort((a,b)=>a.date.localeCompare(b.date)):[];
  if(!all.length){ el.innerHTML=`<div class="tl-stat"><div class="tl-stat-val">—</div><div class="tl-stat-key">لا توجد أحداث بعد</div></div>`; return; }
  const first=all[0],last=all[all.length-1];
  const totalDays=Math.round((Utils.parseDate(last.date)-Utils.parseDate(first.date))/86400000);
  const imp=all.filter(e=>e.important).length;
  el.innerHTML=`
    <div class="tl-stat"><div class="tl-stat-val">${all.length}</div><div class="tl-stat-key">أحداث</div></div>
    <div class="tl-stat-divider"></div>
    <div class="tl-stat"><div class="tl-stat-val">${totalDays}ي</div><div class="tl-stat-key">المدة</div></div>
    <div class="tl-stat-divider"></div>
    <div class="tl-stat"><div class="tl-stat-val">${Utils.formatShort(first.date)}</div><div class="tl-stat-key">أول حدث</div></div>
    <div class="tl-stat-divider"></div>
    <div class="tl-stat"><div class="tl-stat-val">${Utils.formatShort(last.date)}</div><div class="tl-stat-key">آخر حدث</div></div>
    ${imp>0?`<div class="tl-stat-divider"></div><div class="tl-stat"><div class="tl-stat-val">⭐ ${imp}</div><div class="tl-stat-key">معالم</div></div>`:''}
    ${evs&&evs.length!==all.length?`<div class="tl-stat-divider"></div><div class="tl-stat"><div class="tl-stat-val">${evs.length}</div><div class="tl-stat-key">مفلتر</div></div>`:''}`;
}

/* ── فلاتر الفئات ── */
function renderTimelineCatFilters(tl) {
  const f=State.tlCatFilter,el=Utils.el('tl-cat-filters');
  if(!tl||!tl.events.length){ el.innerHTML=''; return; }
  const activeCats=new Set(tl.events.map(e=>e.category));
  el.innerHTML=`<button class="tl-filter-btn ${f==='all'?'active':''}" data-cat="all" style="${f==='all'?'background:rgba(124,58,237,.22);border-color:rgba(124,58,237,.4);color:#c4b5fd':''}">الكل</button>`
    +TIMELINE_CATEGORIES.filter(c=>activeCats.has(c.id)).map(c=>`
      <button class="tl-filter-btn ${f===c.id?'active':''}" data-cat="${c.id}"
        style="${f===c.id?`background:${Utils.hexToRgba(c.color,.18)};border-color:${Utils.hexToRgba(c.color,.4)};color:${c.color}`:''}">
        ${c.icon} ${c.name}</button>`).join('');
  Utils.qsa('.tl-filter-btn').forEach(b=>b.addEventListener('click',()=>{ State.tlCatFilter=b.dataset.cat; renderTimeline(); }));
}

/* ── المنسق الرئيسي ── */
function renderTimeline() {
  const tl=getActiveTimeline();
  if(tl&&!State.activeTimelineId) State.activeTimelineId=tl.id;

  renderTimelineSelector();

  const subEl=Utils.el('tl-subtitle');
  if(subEl) subEl.textContent=!tl?'أنشئ خطك الزمني الأول للبدء':tl.description||`${tl.events.length} حدث`;

  const searchEl=Utils.el('tl-search');
  if(searchEl&&searchEl.value!==State.tlSearch) searchEl.value=State.tlSearch;
  const zlEl=Utils.el('tl-zoom-label');
  if(zlEl) zlEl.textContent=tlZoom()+'×';

  const evs=tl?getFilteredEvents(tl):[];
  renderTimelineStats(tl,evs);
  renderTimelineCatFilters(tl);

  const visual=Utils.el('timeline-visual');
  if(!tl){
    visual.innerHTML=`<div class="tl-empty"><div class="tl-empty-icon">🗓️</div><div class="tl-empty-title">لا توجد خطوط زمنية بعد</div><div class="tl-empty-body">انقر على <strong>خط جديد</strong> لإنشاء خطك الزمني الأول وبدء تتبع أحداث حياتك.</div></div>`;
    Utils.el('tl-table-wrap').innerHTML=''; return;
  }
  if(!tl.events.length){
    visual.innerHTML=`<div class="tl-empty"><div class="tl-empty-icon">${Utils.esc(tl.icon||'🗓️')}</div><div class="tl-empty-title">لا توجد أحداث في "${Utils.esc(tl.name)}"</div><div class="tl-empty-body">انقر على <strong>إضافة حدث</strong> لوضع أول لحظة على هذا الخط الزمني.</div></div>`;
    renderEventsTable(tl,[]); return;
  }
  if(!evs.length){
    visual.innerHTML=`<div class="tl-empty"><div class="tl-empty-icon">🔍</div><div class="tl-empty-title">لا توجد نتائج</div><div class="tl-empty-body">جرّب بحثاً أو فلتراً مختلفاً.</div></div>`;
    renderEventsTable(tl,evs); return;
  }

  if(window.innerWidth<=640) renderVisualMobile(tl,evs);
  else renderVisualTimeline(tl,evs);
  renderEventsTable(tl,evs);
}

/* ── الخط الزمني الأفقي للحاسوب ── */
function renderVisualTimeline(tl,evs) {
  const visual=Utils.el('timeline-visual');
  const first=Utils.parseDate(evs[0].date),last=Utils.parseDate(evs[evs.length-1].date);
  const totalDays=Math.max(1,(last-first)/86400000);
  const zoom=tlZoom();
  const trackW=Math.max(TL_MIN_WIDTH,Math.ceil(totalDays*TL_PX_PER_DAY*zoom)+2*TL_PADDING);
  const tlColor=tl.color||'#8b5cf6';
  const getLeft=d=>{ const diff=(Utils.parseDate(d)-first)/86400000; return TL_PADDING+(diff/totalDays)*(trackW-2*TL_PADDING); };

  const evHtml=evs.map((ev,idx)=>{
    const left=getLeft(ev.date),cat=tlGetCat(ev.category),color=ev.color||cat.color,isAbove=idx%2===0,icon=ev.icon||cat.icon;
    const notesPrev=ev.notes?`<div class="tl-ev-notes-preview">${Utils.esc(ev.notes.slice(0,38))}${ev.notes.length>38?'…':''}</div>`:'';
    const nameHtml=`<div class="tl-ev-name">${Utils.esc(ev.name)}</div>`;
    const dateHtml=`<div class="tl-ev-date">${Utils.formatShort(ev.date)}</div>`;
    const conn=`<div class="tl-connector" style="background:${color}55"></div>`;
    return`<div class="tl-event ${ev.important?'tl-important':''}" data-id="${ev.id}" style="left:${left}px;animation-delay:${idx*55}ms">
      <div class="tl-ev-above">${isAbove?`${nameHtml}${notesPrev}${conn}${dateHtml}`:''}</div>
      <div class="tl-node" style="background:${Utils.hexToRgba(color,.15)};border-color:${color};box-shadow:0 0 0 5px ${Utils.hexToRgba(color,.1)},0 0 22px ${Utils.hexToRgba(color,.25)}">
        <div class="tl-node-inner">${Utils.esc(icon)}</div>
        ${ev.important?`<div class="tl-star-badge">⭐</div><div class="tl-pulse-ring" style="border-color:${color}"></div>`:''}
      </div>
      <div class="tl-ev-below">${!isAbove?`${dateHtml}${conn}${nameHtml}${notesPrev}`:''}</div>
    </div>`;
  }).join('');

  const gapHtml=evs.slice(1).map((ev,i)=>{
    const days=Math.round((Utils.parseDate(ev.date)-Utils.parseDate(evs[i].date))/86400000);
    if(!days) return'';
    return`<div class="tl-gap-label" style="left:${(getLeft(evs[i].date)+getLeft(ev.date))/2}px">${days} ي</div>`;
  }).join('');

  visual.innerHTML=`<div class="tl-scroll-outer">
    <div class="tl-track-wrap" style="width:${trackW}px">
      <div class="tl-line" style="background:linear-gradient(90deg,transparent,${Utils.hexToRgba(tlColor,.5)} 5%,${Utils.hexToRgba(tlColor,.7)} 50%,${Utils.hexToRgba(tlColor,.5)} 95%,transparent)"></div>
      <div style="position:absolute;inset:0">${evHtml}</div>
      <div style="position:absolute;inset:0;pointer-events:none">${gapHtml}</div>
    </div>
  </div>`;
  bindTimelineNodeEvents(evs,tl);
}

/* ── القائمة العمودية للجوال ── */
function renderVisualMobile(tl,evs) {
  const visual=Utils.el('timeline-visual');
  const sorted=[...evs].sort((a,b)=>a.date.localeCompare(b.date));
  const tlColor=tl.color||'#8b5cf6';
  visual.innerHTML=`<div class="tl-mobile-list">${sorted.map((ev,idx)=>{
    const cat=tlGetCat(ev.category),color=ev.color||cat.color,icon=ev.icon||cat.icon;
    const prev=idx>0?sorted[idx-1]:null;
    const days=prev?Math.round((Utils.parseDate(ev.date)-Utils.parseDate(prev.date))/86400000):null;
    return`<div class="tl-mob-event ${ev.important?'tl-important':''}">
      <div class="tl-mob-left">
        <div class="tl-mob-node" style="background:${Utils.hexToRgba(color,.15)};border:2px solid ${color}">${icon}${ev.important?`<div class="tl-star-badge">⭐</div>`:''}</div>
        <div class="tl-mob-stem" style="background:${Utils.hexToRgba(tlColor,.3)}"></div>
      </div>
      <div class="tl-mob-content">
        ${days!==null?`<div class="tl-mob-gap">+${days} ي</div>`:''}
        <div class="tl-mob-date">${Utils.formatFull(ev.date)}</div>
        <div class="tl-mob-name">${Utils.esc(ev.name)}</div>
        ${ev.notes?`<div class="tl-mob-notes">${Utils.esc(ev.notes)}</div>`:''}
        <div class="tl-mob-cat" style="color:${cat.color}">${Utils.esc(cat.icon)} ${Utils.esc(cat.name)}</div>
        <div class="tl-mob-actions">
          <button class="btn-ghost btn-sm" style="padding:5px 10px;font-size:11px" data-mob-edit="${ev.id}">تعديل</button>
          <button class="btn-danger btn-sm" style="padding:5px 10px;font-size:11px;box-shadow:none" data-mob-del="${ev.id}">حذف</button>
        </div>
      </div>
    </div>`;
  }).join('')}</div>`;
  Utils.qsa('[data-mob-edit]').forEach(b=>b.addEventListener('click',()=>EventModal.open(b.dataset.mobEdit,tl.id)));
  Utils.qsa('[data-mob-del]').forEach(b=>b.addEventListener('click',()=>confirmDeleteTlEvent(b.dataset.mobDel,tl.id)));
}

/* ── جدول الأحداث ── */
function renderEventsTable(tl,evs) {
  const wrap=Utils.el('tl-table-wrap');
  const sorted=[...evs].sort((a,b)=>a.date.localeCompare(b.date));
  wrap.innerHTML=`<div class="tl-table-section">
    <div class="tl-table-head">
      <span class="tl-table-title">الأحداث</span>
      <span class="tl-event-count">${sorted.length} حدث</span>
    </div>
    <div class="tl-table-outer"><table class="tl-table">
      <thead><tr><th>التاريخ</th><th>الحدث</th><th>ملاحظات</th><th>الفئة</th><th>الفجوة</th><th>إجراءات</th></tr></thead>
      <tbody>${sorted.length?sorted.map((ev,idx)=>{
        const prev=idx>0?sorted[idx-1]:null;
        const days=prev?Math.round((Utils.parseDate(ev.date)-Utils.parseDate(prev.date))/86400000):null;
        const cat=tlGetCat(ev.category),d=Utils.parseDate(ev.date);
        return`<tr class="tl-table-row ${ev.important?'tl-row-important':''}">
          <td class="tl-td-date"><div class="tl-td-year">${d.getFullYear()}</div>${Utils.formatShort(ev.date)}</td>
          <td class="tl-td-name">${ev.important?'<span class="tl-star-sm">⭐</span>':''}<span class="tl-td-icon">${Utils.esc(ev.icon||cat.icon)}</span> ${Utils.esc(ev.name)}</td>
          <td class="tl-td-notes">${ev.notes?`<span title="${Utils.esc(ev.notes)}">${Utils.esc(ev.notes.slice(0,50))}${ev.notes.length>50?'…':''}</span>`:'<span class="tl-td-empty">—</span>'}</td>
          <td class="tl-td-cat"><span style="color:${cat.color}">${Utils.esc(cat.icon)} ${Utils.esc(cat.name)}</span></td>
          <td class="tl-td-gap">${days!==null?`+${days} ي`:'—'}</td>
          <td class="tl-td-actions">
            <button class="btn-ghost btn-sm" style="padding:4px 10px;font-size:11px" data-tbl-edit="${ev.id}">تعديل</button>
            <button class="btn-danger btn-sm" style="padding:4px 10px;font-size:11px;box-shadow:none" data-tbl-del="${ev.id}">حذف</button>
          </td>
        </tr>`;
      }).join(''):`<tr><td colspan="6" class="tl-table-empty">لا توجد أحداث تطابق الفلتر الحالي.</td></tr>`}
      </tbody>
    </table></div>
  </div>`;
  Utils.qsa('[data-tbl-edit]').forEach(b=>b.addEventListener('click',()=>EventModal.open(b.dataset.tblEdit,tl.id)));
  Utils.qsa('[data-tbl-del]').forEach(b=>b.addEventListener('click',()=>confirmDeleteTlEvent(b.dataset.tblDel,tl.id)));
}

/* ── تلميحات التمرير ── */
let _tlTooltipTimer=null;
function bindTimelineNodeEvents(evs,tl) {
  const tooltip=Utils.el('tl-tooltip');
  const sorted=[...evs].sort((a,b)=>a.date.localeCompare(b.date));
  Utils.qsa('.tl-event[data-id]').forEach(el=>{
    el.addEventListener('mouseenter',()=>{
      clearTimeout(_tlTooltipTimer);
      const ev=sorted.find(x=>x.id===el.dataset.id); if(!ev)return;
      const myIdx=sorted.findIndex(x=>x.id===ev.id);
      const prev=myIdx>0?sorted[myIdx-1]:null;
      const days=prev?Math.round((Utils.parseDate(ev.date)-Utils.parseDate(prev.date))/86400000):null;
      const cat=tlGetCat(ev.category);
      tooltip.innerHTML=`
        <div class="tl-tt-header">
          <div class="tl-tt-icon">${Utils.esc(ev.icon||cat.icon)}</div>
          <div><div class="tl-tt-name">${Utils.esc(ev.name)}</div><div class="tl-tt-date">${Utils.formatFull(ev.date)}</div></div>
        </div>
        ${tl?`<div class="tl-tt-tl-name" style="color:${tl.color||'#a78bfa'}">${Utils.esc(tl.icon||'🗓️')} ${Utils.esc(tl.name)}</div>`:''}
        <div class="tl-tt-badges">
          <span class="tl-tt-cat" style="background:${Utils.hexToRgba(cat.color,.15)};color:${cat.color};border:1px solid ${Utils.hexToRgba(cat.color,.3)}">${Utils.esc(cat.icon)} ${Utils.esc(cat.name)}</span>
          ${ev.important?'<span class="tl-tt-important">⭐ معلم</span>':''}
        </div>
        ${days!==null?`<div class="tl-tt-gap">⏱ ${days} يوم منذ الحدث السابق</div>`:''}
        ${ev.notes?`<div class="tl-tt-desc">${Utils.esc(ev.notes)}</div>`:''}
        <div class="tl-tt-actions">
          <button class="btn-ghost" style="padding:6px 12px;font-size:11px" onclick="EventModal.open('${ev.id}','${tl?.id||''}')">تعديل</button>
          <button class="btn-danger" style="padding:6px 12px;font-size:11px;box-shadow:none" onclick="confirmDeleteTlEvent('${ev.id}','${tl?.id||''}')">حذف</button>
        </div>`;
      const nodeEl=el.querySelector('.tl-node');
      const rect=nodeEl?nodeEl.getBoundingClientRect():el.getBoundingClientRect();
      tooltip.style.display='block';
      let left=rect.left+rect.width/2-130, top=rect.top-250;
      if(top<8) top=rect.bottom+12;
      left=Math.max(8,Math.min(left,window.innerWidth-268));
      tooltip.style.left=left+'px'; tooltip.style.top=top+'px';
      requestAnimationFrame(()=>tooltip.classList.add('visible'));
    });
    el.addEventListener('mouseleave',()=>{ _tlTooltipTimer=setTimeout(()=>tooltip.classList.remove('visible'),200); });
  });
  tooltip.addEventListener('mouseenter',()=>clearTimeout(_tlTooltipTimer));
  tooltip.addEventListener('mouseleave',()=>tooltip.classList.remove('visible'));
}

/* ── نافذة الحدث ── */
const EventModal = {
  open(eventId=null,timelineId=null) {
    const tlId=timelineId||State.activeTimelineId||State.timelines[0]?.id||'';
    const tl=State.timelines.find(t=>t.id===tlId);
    const ev=tl&&eventId?tl.events.find(x=>x.id===eventId):null;
    Utils.el('tl-modal-title').textContent=ev?'تعديل الحدث':'إضافة حدث';
    Utils.el('tl-edit-id').value=eventId||'';
    Utils.el('tl-edit-timeline-id').value=tlId;
    Utils.el('tl-name-input').value=ev?.name||'';
    Utils.el('tl-date-input').value=ev?.date||Utils.today();
    Utils.el('tl-notes-input').value=ev?.notes||'';
    Utils.el('tl-cat-select').value=ev?.category||'personal';
    Utils.el('tl-icon-input').value=ev?.icon||'';
    Utils.el('tl-important-toggle').checked=!!ev?.important;
    const tlSel=Utils.el('tl-timeline-select');
    tlSel.innerHTML=State.timelines.map(t=>`<option value="${t.id}" ${t.id===tlId?'selected':''}>${Utils.esc(t.icon||'🗓️')} ${Utils.esc(t.name)}</option>`).join('');
    const grid=Utils.el('tl-icon-grid');
    grid.innerHTML=TL_ICON_PRESETS.map(ic=>`<button class="icon-preset-btn ${ev?.icon===ic?'selected':''}" data-icon="${ic}">${ic}</button>`).join('');
    grid.querySelectorAll('.icon-preset-btn').forEach(btn=>btn.addEventListener('click',()=>{
      Utils.el('tl-icon-input').value=btn.dataset.icon;
      grid.querySelectorAll('.icon-preset-btn').forEach(b=>b.classList.remove('selected'));
      btn.classList.add('selected');
    }));
    Utils.el('tl-modal-overlay').classList.add('open');
    setTimeout(()=>Utils.el('tl-name-input').focus(),150);
  },
  close() { Utils.el('tl-modal-overlay').classList.remove('open'); },
  save() {
    const name=Utils.el('tl-name-input').value.trim();
    if(!name){ showToast('يرجى إدخال اسم الحدث.','error'); return; }
    const date=Utils.el('tl-date-input').value;
    if(!date){ showToast('يرجى اختيار تاريخ.','error'); return; }
    const notes=Utils.el('tl-notes-input').value.trim();
    const category=Utils.el('tl-cat-select').value;
    const icon=Utils.el('tl-icon-input').value.trim();
    const important=Utils.el('tl-important-toggle').checked;
    const editId=Utils.el('tl-edit-id').value;
    const tlId=Utils.el('tl-timeline-select').value||Utils.el('tl-edit-timeline-id').value;
    if(editId){ updateTlEvent(editId,tlId,{name,date,notes,category,icon,important}); showToast('تم تحديث الحدث!','success'); }
    else       { addTlEvent(tlId,{name,date,notes,category,icon,important}); showToast('تمت إضافة الحدث! 🎉','success'); }
    if(tlId&&tlId!==State.activeTimelineId){ State.activeTimelineId=tlId; State.tlCatFilter='all'; }
    EventModal.close(); renderTimeline();
  },
};

/* ── نافذة إدارة الخط الزمني ── */
const TlModal = {
  _sw:['#a78bfa','#60a5fa','#4ade80','#fbbf24','#f472b6','#fb923c','#2dd4bf','#f87171','#e879f9','#34d399','#38bdf8','#facc15'],
  open(timelineId=null) {
    const tl=timelineId?State.timelines.find(t=>t.id===timelineId):null;
    Utils.el('tlm-modal-title').textContent=tl?'تعديل الخط الزمني':'خط زمني جديد';
    Utils.el('tlm-edit-id').value=timelineId||'';
    Utils.el('tlm-name-input').value=tl?.name||'';
    Utils.el('tlm-desc-input').value=tl?.description||'';
    Utils.el('tlm-icon-input').value=tl?.icon||'🗓️';
    Utils.el('tlm-color-input').value=tl?.color||'#a78bfa';
    const ig=Utils.el('tlm-icon-grid');
    ig.innerHTML=TL_TL_PRESETS.map(ic=>`<button class="icon-preset-btn ${tl?.icon===ic?'selected':''}" data-icon="${ic}">${ic}</button>`).join('');
    ig.querySelectorAll('.icon-preset-btn').forEach(btn=>btn.addEventListener('click',()=>{
      Utils.el('tlm-icon-input').value=btn.dataset.icon;
      ig.querySelectorAll('.icon-preset-btn').forEach(b=>b.classList.remove('selected'));
      btn.classList.add('selected');
    }));
    const curColor=tl?.color||'#a78bfa';
    const sw=Utils.el('tlm-swatches');
    sw.innerHTML=this._sw.map(c=>`<button class="color-swatch ${c===curColor?'selected':''}" data-color="${c}" style="background:${c}" title="${c}"></button>`).join('');
    sw.querySelectorAll('.color-swatch').forEach(btn=>btn.addEventListener('click',()=>{
      Utils.el('tlm-color-input').value=btn.dataset.color;
      sw.querySelectorAll('.color-swatch').forEach(b=>b.classList.remove('selected'));
      btn.classList.add('selected');
    }));
    Utils.el('tlm-modal-overlay').classList.add('open');
    setTimeout(()=>Utils.el('tlm-name-input').focus(),150);
  },
  close() { Utils.el('tlm-modal-overlay').classList.remove('open'); },
  save() {
    const name=Utils.el('tlm-name-input').value.trim();
    if(!name){ showToast('يرجى إدخال اسم الخط الزمني.','error'); return; }
    const desc=Utils.el('tlm-desc-input').value.trim();
    const icon=Utils.el('tlm-icon-input').value.trim()||'🗓️';
    const color=Utils.el('tlm-color-input').value;
    const editId=Utils.el('tlm-edit-id').value;
    if(editId){ updateTimeline(editId,{name,description:desc,icon,color}); showToast('تم تحديث الخط الزمني!','success'); }
    else       { addTimeline({name,description:desc,icon,color}); showToast('تم إنشاء الخط الزمني! 🎉','success'); }
    TlModal.close(); renderTimeline();
  },
};

/* ── عمليات CRUD للخط الزمني ── */
function addTimeline(data) {
  const tl={id:'tl_'+Utils.uid(),name:data.name,description:data.description||'',icon:data.icon||'🗓️',color:data.color||'#a78bfa',createdAt:Utils.today(),events:[]};
  State.timelines.push(tl); Storage.saveTimelines(State.timelines);
  State.activeTimelineId=tl.id; return tl;
}
function updateTimeline(id,data) {
  const tl=State.timelines.find(t=>t.id===id); if(!tl)return;
  Object.assign(tl,{name:data.name??tl.name,description:data.description??tl.description,icon:data.icon??tl.icon,color:data.color??tl.color});
  Storage.saveTimelines(State.timelines);
}
function deleteTimeline(id) {
  State.timelines=State.timelines.filter(t=>t.id!==id);
  if(State.activeTimelineId===id) State.activeTimelineId=State.timelines[0]?.id||null;
  Storage.saveTimelines(State.timelines);
}
function confirmDeleteTimeline(id) {
  const tl=State.timelines.find(t=>t.id===id); if(!tl)return;
  const cnt=tl.events?.length||0;
  showConfirm({title:`حذف "${tl.name}"؟`,body:cnt?`سيتم حذف الخط الزمني وجميع الأحداث (${cnt}) الموجودة فيه نهائياً.`:'سيتم إزالة هذا الخط الزمني نهائياً.',okLabel:'حذف',isDanger:true,onOk:()=>{ deleteTimeline(id); renderTimeline(); showToast('تم حذف الخط الزمني.',''); }});
}

/* ── عمليات CRUD للحدث ── */
function addTlEvent(timelineId,data) {
  const tl=State.timelines.find(t=>t.id===timelineId); if(!tl)return;
  const ev={id:'ev_'+Utils.uid(),name:data.name,date:data.date,notes:data.notes||'',category:data.category||'personal',icon:data.icon||'',important:!!data.important,createdAt:Utils.today()};
  tl.events.push(ev); Storage.saveTimelines(State.timelines); return ev;
}
function updateTlEvent(eventId,timelineId,data) {
  const tl=State.timelines.find(t=>t.id===timelineId); if(!tl)return;
  const ev=tl.events.find(x=>x.id===eventId); if(!ev)return;
  Object.assign(ev,{name:data.name??ev.name,date:data.date??ev.date,notes:data.notes??ev.notes,category:data.category??ev.category,icon:data.icon??ev.icon,important:data.important??ev.important});
  Storage.saveTimelines(State.timelines);
}
function deleteTlEvent(eventId,timelineId) {
  const tl=State.timelines.find(t=>t.id===timelineId); if(!tl)return;
  tl.events=tl.events.filter(x=>x.id!==eventId);
  Storage.saveTimelines(State.timelines);
}
function confirmDeleteTlEvent(eventId,timelineId) {
  const tlId=timelineId||State.activeTimelineId;
  const tl=State.timelines.find(t=>t.id===tlId); if(!tl)return;
  const ev=tl.events.find(x=>x.id===eventId); if(!ev)return;
  showConfirm({title:`حذف "${ev.name}"؟`,body:'سيتم حذف هذا الحدث من الخط الزمني نهائياً.',okLabel:'حذف',isDanger:true,onOk:()=>{
    deleteTlEvent(eventId,tlId);
    Utils.el('tl-tooltip').classList.remove('visible');
    renderTimeline(); showToast('تم حذف الحدث.','');
  }});
}

/* ══════════════════════════════════════════
   21. الإشعارات
══════════════════════════════════════════ */

let _toastTimer;
function showToast(msg,type='') {
  const t=Utils.el('toast');
  t.textContent=msg; t.className=`toast ${type} show`;
  clearTimeout(_toastTimer);
  _toastTimer=setTimeout(()=>t.classList.remove('show'),2800);
}

/* ══════════════════════════════════════════
   22. الساعة
══════════════════════════════════════════ */

function startClock() {
  function tick() {
    const now=new Date();
    const d=Utils.el('sidebar-date'),tm=Utils.el('sidebar-time');
    if(d)d.textContent=now.toLocaleDateString('ar',{weekday:'long',month:'short',day:'numeric'});
    if(tm)tm.textContent=now.toLocaleTimeString('ar',{hour:'2-digit',minute:'2-digit'});
  }
  tick(); setInterval(tick,30000);
}

/* ══════════════════════════════════════════
   23. ربط الأحداث
══════════════════════════════════════════ */

function bindEvents() {
  // التنقل
  document.addEventListener('click',e=>{
    const nav=e.target.closest('[data-page]');
    if(nav&&nav.dataset.page){ e.preventDefault(); navigate(nav.dataset.page); }
  });
  // زر إضافة عادة (صفحة الإدارة)
  document.addEventListener('click',e=>{ if(e.target.closest('#add-habit-btn'))HabitModal.open(); });
  // نافذة العادة
  Utils.el('modal-save').addEventListener('click',()=>HabitModal.save());
  Utils.el('modal-cancel').addEventListener('click',()=>HabitModal.close());
  Utils.el('modal-close').addEventListener('click',()=>HabitModal.close());
  Utils.el('modal-overlay').addEventListener('click',e=>{ if(e.target===Utils.el('modal-overlay'))HabitModal.close(); });
  Utils.el('habit-name-input').addEventListener('keydown',e=>{ if(e.key==='Enter')HabitModal.save(); });
  // نافذة الفئة
  Utils.el('cat-modal-save').addEventListener('click',()=>CategoryModal.save());
  Utils.el('cat-modal-cancel').addEventListener('click',()=>CategoryModal.close());
  Utils.el('cat-modal-close').addEventListener('click',()=>CategoryModal.close());
  Utils.el('cat-modal-overlay').addEventListener('click',e=>{ if(e.target===Utils.el('cat-modal-overlay'))CategoryModal.close(); });
  Utils.el('cat-name-input').addEventListener('keydown',e=>{ if(e.key==='Enter')CategoryModal.save(); });
  // نافذة التأكيد
  Utils.el('confirm-ok').addEventListener('click',()=>{
    Utils.el('confirm-overlay').classList.remove('open');
    if(_pendingConfirm){ _pendingConfirm(); _pendingConfirm=null; }
  });
  Utils.el('confirm-cancel').addEventListener('click',()=>{
    Utils.el('confirm-overlay').classList.remove('open'); _pendingConfirm=null;
  });
  Utils.el('confirm-overlay').addEventListener('click',e=>{
    if(e.target===Utils.el('confirm-overlay')){ Utils.el('confirm-overlay').classList.remove('open'); _pendingConfirm=null; }
  });
  // منتقي التاريخ
  Utils.el('daily-date-picker').addEventListener('change',e=>{ State.dailyDate=e.target.value; renderDaily(); });
  // نافذة الحدث
  Utils.el('tl-modal-save').addEventListener('click',()=>EventModal.save());
  Utils.el('tl-modal-cancel').addEventListener('click',()=>EventModal.close());
  Utils.el('tl-modal-close').addEventListener('click',()=>EventModal.close());
  Utils.el('tl-modal-overlay').addEventListener('click',e=>{ if(e.target===Utils.el('tl-modal-overlay'))EventModal.close(); });
  Utils.el('tl-name-input').addEventListener('keydown',e=>{ if(e.key==='Enter')EventModal.save(); });
  // نافذة الخط الزمني
  Utils.el('tlm-modal-save').addEventListener('click',()=>TlModal.save());
  Utils.el('tlm-modal-cancel').addEventListener('click',()=>TlModal.close());
  Utils.el('tlm-modal-close').addEventListener('click',()=>TlModal.close());
  Utils.el('tlm-modal-overlay').addEventListener('click',e=>{ if(e.target===Utils.el('tlm-modal-overlay'))TlModal.close(); });
  Utils.el('tlm-name-input').addEventListener('keydown',e=>{ if(e.key==='Enter')TlModal.save(); });

  // أزرار رأس صفحة الخط الزمني
  document.addEventListener('click',e=>{
    if(e.target.closest('#tl-add-event-btn')) EventModal.open();
    if(e.target.closest('#tl-new-timeline-btn')) TlModal.open();
  });
  Utils.el('tl-search').addEventListener('input',e=>{ State.tlSearch=e.target.value; if(State.page==='timeline')renderTimeline(); });
  Utils.el('tl-zoom-in').addEventListener('click',()=>{
    if(State.tlZoomIdx<TL_ZOOM_STEPS.length-1){ State.tlZoomIdx++; if(State.page==='timeline')renderTimeline(); }
  });
  Utils.el('tl-zoom-out').addEventListener('click',()=>{
    if(State.tlZoomIdx>0){ State.tlZoomIdx--; if(State.page==='timeline')renderTimeline(); }
  });

  // مفتاح Escape
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){
      HabitModal.close(); CategoryModal.close(); EventModal.close(); TlModal.close();
      ChallengeModal.close(); ChallengeDetailsModal.close();
      Utils.el('confirm-overlay').classList.remove('open'); _pendingConfirm=null;
      Utils.el('cal-day-overlay')?.classList.remove('open');
    }
  });
}

/* ══════════════════════════════════════════
   24. التهيئة
══════════════════════════════════════════ */

function revealAppShell() {
  document.body?.classList.remove('app-loading');
}

const appLoadingFallbackId = window.setTimeout(revealAppShell, 2000);

function init() {
  // تحميل الفئات
  const storedCats=Storage.getCategories();
  State.categories=storedCats||JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
  if(!storedCats)Storage.saveCategories(State.categories);

  // تحميل العادات
  const storedHabits=Storage.getHabits();
  State.habits=storedHabits||JSON.parse(JSON.stringify(DEFAULT_HABITS));
  if(!storedHabits)Storage.saveHabits(State.habits);

  // تحميل الخطوط الزمنية
  const storedTl=Storage.getTimelines();
  State.timelines=storedTl||JSON.parse(JSON.stringify(DEFAULT_TIMELINES));
  if(!storedTl)Storage.saveTimelines(State.timelines);
  State.activeTimelineId=State.timelines[0]?.id||null;

  // تحميل التحديات
  State.challenges=Storage.getChallenges();

  // تحميل الوحدات الجديدة
  State.tasks=Storage.getTasks();
  State.journal=Storage.getJournal();
  State.achievements=Storage.getAchievements();

  // تحميل الإعدادات
  State.settings=Storage.getSettings();

  // تطبيق اسم التطبيق
  applyAppSettings();

  // تعيين منتقيات التاريخ
  const dp=Utils.el('daily-date-picker');
  if(dp){ dp.value=State.dailyDate; dp.max=Utils.today(); }
  const tdp=Utils.el('tasks-date-picker');
  if(tdp){ tdp.value=State.tasksDate; }

  // تسجيل عامل الخدمة
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./service-worker.js').catch(()=>{});
  }

  renderAuthSurfaces();
  initFirebaseAuthBridge();
  window.addEventListener('habitflow:firebase-ready', initFirebaseAuthBridge, { once:true });

  startClock();
  bindEvents();
  State.page = isOnboardingDone() ? 'dashboard' : 'onboarding';
  Utils.qsa('.page').forEach(p=>p.classList.toggle('active',p.id===`page-${State.page}`));
  Utils.qsa('.nav-item,.mob-item,.mob-more-item').forEach(el=>el.classList.toggle('active',State.page!=='onboarding' && el.dataset.page===State.page));
  renderPage(State.page);
  UIEnhancer.init();
  // إزالة app-loading بعد إطارين لضمان اكتمال الرسم بالتصميم الصحيح أولاً
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      window.clearTimeout(appLoadingFallbackId);
      revealAppShell();
    });
  });
}

/* ══════════════════════════════════════════
   وحدة التحديات
══════════════════════════════════════════ */

const CH_COLOR_PRESETS = ['#8b5cf6','#3b82f6','#10b981','#f59e0b','#ef4444','#ec4899','#6366f1','#14b8a6','#f97316','#84cc16','#a78bfa','#60a5fa'];
const CH_ICON_PRESETS  = ['🏆','🎯','🔥','⚡','💪','📚','🧘','🏃','🚫','🚭','📵','🍕','🍬','🎮','📱','🍷','💧','😴','✍️','🌱','🧠','💼','🎓','🌟','❤️','🎸'];
const CH_MOTIVATIONAL  = {
  build:['كل يوم تحضر فيه هو انتصار.','الخطوات الصغيرة تقود إلى تغييرات كبيرة.','الاتساق هو مفتاح الإتقان.','نفسك المستقبلية يراقبك — لا تخذله.','يوم واحد في كل مرة. عادة واحدة في كل مرة.','التقدم وليس الكمال.','أنت تبني شيئاً عظيماً.','ثق بالمسار. استمر في الحضور.','الأبطال يُصنعون في اللحظات التي لا يشعرون فيها بالرغبة.','الانضباط هو الاختيار بين ما تريده الآن وما تريده أكثر.'],
  quit: ['كل يوم تثبت فيه هو انتصار.','قوتك تنمو مع كل يوم من الانضباط.','أنت أقوى من نزواتك.','التغيير يحدث يوماً بيوم.','كل يوم على المسار الصحيح يجعل اليوم التالي أسهل.','أنت تبني الانضباط الذي يُعرّفك.','إرادتك تتراكم يوماً بعد يوم.','ابقَ قوياً. لقد أتيت بعيداً جداً لتستسلم.','كل يوم على المسار هو دليل على قدرتك.','الأيام الأصعب هي الأكثر أهمية.'],
};

const ChallengeCompute = {
  addDays(dateStr,days){ const d=Utils.parseDate(dateStr); d.setDate(d.getDate()+days); return Utils.toDateStr(d); },
  calcEndDate(start,dur){ return this.addDays(start,dur-1); },
  currentDayNumber(ch){
    const today=Utils.today();
    if(today<ch.startDate) return 0;
    const diff=Math.floor((Utils.parseDate(today)-Utils.parseDate(ch.startDate))/86400000);
    return Math.min(diff+1,ch.duration);
  },
  completedDays(ch){ return ch.records.filter(r=>r.status==='completed').length; },
  missedDays(ch){ return ch.records.filter(r=>r.status==='missed').length; },
  remainingDays(ch){
    const today=Utils.today();
    if(today>ch.endDate) return 0;
    if(today<ch.startDate){ const d=Math.floor((Utils.parseDate(ch.endDate)-Utils.parseDate(ch.startDate))/86400000)+1; return d; }
    return Math.max(0,Math.floor((Utils.parseDate(ch.endDate)-Utils.parseDate(today))/86400000));
  },
  progressPct(ch){
    const completed=this.completedDays(ch);
    return ch.duration>0?Math.round((completed/ch.duration)*100):0;
  },
  checkedInToday(ch){ return ch.records.find(r=>r.date===Utils.today())||null; },
  currentStreak(ch){
    let streak=0; const d=new Date();
    for(let i=0;i<ch.duration;i++){
      const ds=Utils.toDateStr(d);
      const rec=ch.records.find(r=>r.date===ds);
      if(!rec||rec.status!=='completed') break;
      streak++; d.setDate(d.getDate()-1);
    }
    return streak;
  },
  bestStreak(ch){
    let best=0,cur=0;
    for(let i=0;i<ch.duration;i++){
      const d=new Date(Utils.parseDate(ch.startDate)); d.setDate(d.getDate()+i);
      const ds=Utils.toDateStr(d);
      const rec=ch.records.find(r=>r.date===ds);
      if(rec&&rec.status==='completed'){ cur++; if(cur>best)best=cur; }
      else cur=0;
    }
    return best;
  },
  successRate(ch){
    const total=ch.records.length;
    return total>0?Math.round((this.completedDays(ch)/total)*100):0;
  },
  autoUpdateStatus(ch){
    if(ch.status==='failed'||ch.status==='paused') return ch;
    const today=Utils.today();
    if(ch.strictMode&&this.missedDays(ch)>0){ ch.status='failed'; return ch; }
    if(today>ch.endDate){
      const daysPassed=ch.duration;
      const completed=this.completedDays(ch);
      if(completed>=daysPassed) ch.status='completed';
    }
    return ch;
  },
  motivationalMsg(ch){
    const msgs=CH_MOTIVATIONAL[ch.type]||CH_MOTIVATIONAL.build;
    const day=this.currentDayNumber(ch);
    return msgs[day%msgs.length];
  },
};

/* ── عرض صفحة التحديات ── */
function renderChallenges(){
  let changed=false;
  State.challenges.forEach(ch=>{ const b=ch.status; ChallengeCompute.autoUpdateStatus(ch); if(ch.status!==b)changed=true; });
  if(changed) Storage.saveChallenges(State.challenges);
  renderChDashboard();
  renderChControls();
  renderChCards();
}

function renderChDashboard(){
  const chs=State.challenges;
  const total=chs.length;
  const active=chs.filter(c=>c.status==='active').length;
  const completed=chs.filter(c=>c.status==='completed').length;
  const failed=chs.filter(c=>c.status==='failed').length;
  const today=Utils.today(), mon=today.slice(0,7);
  const completedThisMonth=chs.filter(c=>c.status==='completed'&&c.endDate.startsWith(mon)).length;
  let bestStreak=0, currentStreak=0, totalRec=0, totalDone=0;
  chs.forEach(ch=>{
    const bs=ChallengeCompute.bestStreak(ch); if(bs>bestStreak)bestStreak=bs;
    if(ch.status==='active'){ const cs=ChallengeCompute.currentStreak(ch); if(cs>currentStreak)currentStreak=cs; }
    totalRec+=ch.records.length; totalDone+=ChallengeCompute.completedDays(ch);
  });
  const overallRate=totalRec>0?Math.round((totalDone/totalRec)*100):0;

  const stats=[
    {icon:'🏆',val:total,   label:'الإجمالي',          col:''},
    {icon:'⚡',val:active,  label:'نشط',               col:'#60a5fa'},
    {icon:'✅',val:completed,label:'مكتمل',             col:'#4ade80'},
    {icon:'❌',val:failed,  label:'فشل',               col:'#f87171'},
    {icon:'🔥',val:currentStreak,label:'السلسلة الحالية',col:'#fbbf24'},
    {icon:'⭐',val:bestStreak,   label:'أفضل سلسلة',    col:'#fbbf24'},
    {icon:'📊',val:overallRate+'%',label:'نسبة النجاح', col:'#2dd4bf'},
    {icon:'🎉',val:completedThisMonth,label:'مكتمل هذا الشهر',col:'#f472b6'},
  ];
  const glows=['rgba(167,139,250,.15)','rgba(96,165,250,.15)','rgba(74,222,128,.15)','rgba(248,113,113,.15)','rgba(251,191,36,.15)','rgba(251,191,36,.15)','rgba(45,212,191,.15)','rgba(244,114,182,.15)'];
  Utils.el('ch-dashboard').innerHTML=`
    <div class="ch-dashboard-grid">
      ${stats.map((s,i)=>`<div class="glass-card ch-stat-card" style="--ch-glow:${glows[i]}"><div class="ch-stat-icon">${s.icon}</div><div class="ch-stat-value"${s.col?` style="color:${s.col}"`:''}>${s.val}</div><div class="ch-stat-label">${s.label}</div></div>`).join('')}
    </div>`;
}

function renderChControls(){
  const filters=[
    {k:'all',l:'الكل'},{k:'active',l:'نشط'},{k:'completed',l:'مكتمل'},
    {k:'failed',l:'فشل'},{k:'paused',l:'موقوف'},{k:'build',l:'تحدي بناء عادة'},{k:'quit',l:'تحدي ترك عادة'},
  ];
  Utils.el('ch-controls-bar').innerHTML=`
    <div class="ch-filters">
      ${filters.map(f=>`<button class="ch-filter-btn${State.chFilter===f.k?' active':''}" data-chfilter="${f.k}">${f.l}</button>`).join('')}
    </div>
    <div class="ch-search-wrap">
      <svg viewBox="0 0 24 24" fill="none" width="14" height="14"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><path d="m21 21-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      <input class="ch-search-input" id="ch-search-input" placeholder="بحث في التحديات…" value="${Utils.esc(State.chSearch)}">
    </div>`;
  const si=Utils.el('ch-search-input');
  if(si) si.addEventListener('input',e=>{ State.chSearch=e.target.value; renderChCards(); });
}

function renderChCards(){
  let chs=[...State.challenges];
  const f=State.chFilter;
  if(f==='active')chs=chs.filter(c=>c.status==='active');
  else if(f==='completed')chs=chs.filter(c=>c.status==='completed');
  else if(f==='failed')chs=chs.filter(c=>c.status==='failed');
  else if(f==='paused')chs=chs.filter(c=>c.status==='paused');
  else if(f==='build')chs=chs.filter(c=>c.type==='build');
  else if(f==='quit')chs=chs.filter(c=>c.type==='quit');
  if(State.chSearch.trim()){ const q=State.chSearch.toLowerCase(); chs=chs.filter(c=>c.name.toLowerCase().includes(q)); }

  const container=Utils.el('ch-cards-grid');
  if(State.challenges.length===0){
    container.innerHTML=`<div class="ch-empty-state">
      <div class="ch-empty-icon">🏆</div>
      <h2 class="ch-empty-title">ابدأ تحديك الأول اليوم</h2>
      <p class="ch-empty-sub">ابنِ عادات إيجابية أو اترك العادات السيئة. تتبع التزامك اليومي وشاهد نفسك تنمو.</p>
      <button class="btn-primary ch-empty-btn" id="ch-empty-create-btn">
        <svg viewBox="0 0 24 24" fill="none" width="16" height="16"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        إنشاء تحدٍّ
      </button></div>`;
    return;
  }
  if(chs.length===0){
    container.innerHTML=`<div class="ch-empty-state"><div class="ch-empty-icon">🔍</div><h2 class="ch-empty-title">لا توجد تحديات</h2><p class="ch-empty-sub">جرّب تعديل الفلاتر أو مصطلحات البحث.</p></div>`;
    return;
  }
  container.innerHTML=`<div class="ch-cards-grid-inner">${chs.map(ch=>buildChCard(ch)).join('')}</div>`;
}

function buildChCard(ch){
  const dayNum=ChallengeCompute.currentDayNumber(ch);
  const completed=ChallengeCompute.completedDays(ch);
  const missed=ChallengeCompute.missedDays(ch);
  const remaining=ChallengeCompute.remainingDays(ch);
  const pct=ChallengeCompute.progressPct(ch);
  const msg=ChallengeCompute.motivationalMsg(ch);
  const todayRec=ChallengeCompute.checkedInToday(ch);
  const isQuit=ch.type==='quit';
  const today=Utils.today();
  const canCheckin=ch.status==='active'&&today>=ch.startDate&&today<=ch.endDate&&!todayRec;
  const radius=28, circum=2*Math.PI*radius, offset=circum*(1-pct/100);
  const sc={active:{l:'نشط',c:'#60a5fa',bg:'rgba(96,165,250,.12)'},completed:{l:'مكتمل',c:'#4ade80',bg:'rgba(74,222,128,.12)'},failed:{l:'فشل',c:'#f87171',bg:'rgba(248,113,113,.12)'},paused:{l:'موقوف',c:'#fbbf24',bg:'rgba(251,191,36,.12)'}}[ch.status]||{l:'نشط',c:'#60a5fa',bg:'rgba(96,165,250,.12)'};
  const typeColor=isQuit?'#f87171':'#4ade80';
  const typeLabel=isQuit?'تحدي ترك عادة':'تحدي بناء عادة';

  let checkinHtml='';
  if(canCheckin){
    checkinHtml=`<div class="ch-checkin-row">
      <button class="ch-checkin-btn ch-checkin-done" data-chid="${ch.id}" data-chdostatus="completed">
        <svg viewBox="0 0 24 24" fill="none" width="13" height="13"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        ${isQuit?'ثبتُّ اليوم':'تم اليوم'}
      </button>
      <button class="ch-checkin-btn ch-checkin-miss" data-chid="${ch.id}" data-chdostatus="missed">
        <svg viewBox="0 0 24 24" fill="none" width="13" height="13"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>
        ${isQuit?'فشلت اليوم':'غبت اليوم'}
      </button></div>`;
  } else if(todayRec){
    const isDone=todayRec.status==='completed';
    const doneLabel=isQuit?'✅ ثبتُّ اليوم':'✅ تم اليوم';
    const missLabel=isQuit?'❌ فشلت اليوم':'❌ غبت اليوم';
    checkinHtml=`<div class="ch-checked-today ${isDone?'ch-checked-done':'ch-checked-miss'}">
      <span>${isDone?doneLabel:missLabel}</span>
      <button class="ch-undo-btn" data-chundoid="${ch.id}">تراجع</button></div>`;
  }

  return`<div class="glass-card ch-card" style="--ch-color:${ch.color}">
    <div class="ch-card-top">
      <div class="ch-card-icon-name">
        <div class="ch-card-icon" style="background:${ch.color}22;border-color:${ch.color}44">${Utils.esc(ch.icon)}</div>
        <div class="ch-card-name-wrap">
          <div class="ch-card-name">${Utils.esc(ch.name)}</div>
          <div class="ch-card-meta">
            <span class="ch-type-badge" style="color:${typeColor};background:${typeColor}18">${typeLabel}</span>
            <span class="ch-duration-badge">${ch.duration} يوم</span>
          </div>
        </div>
      </div>
      <div class="ch-status-badge" style="color:${sc.c};background:${sc.bg}">${sc.l}</div>
    </div>
    <div class="ch-card-body">
      <div class="ch-progress-section">
        <div class="ch-circular-progress">
          <svg width="72" height="72" viewBox="0 0 72 72">
            <defs><linearGradient id="chGr_${ch.id}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${ch.color}"/><stop offset="100%" stop-color="${ch.color}88"/></linearGradient></defs>
            <circle cx="36" cy="36" r="${radius}" fill="none" stroke="rgba(255,255,255,.06)" stroke-width="7"/>
            <circle cx="36" cy="36" r="${radius}" fill="none" stroke="url(#chGr_${ch.id})" stroke-width="7"
              stroke-dasharray="${circum.toFixed(2)}" stroke-dashoffset="${offset.toFixed(2)}"
              stroke-linecap="round" transform="rotate(-90 36 36)"/>
          </svg>
          <div class="ch-circ-label"><span class="ch-circ-pct" style="color:${ch.color}">${pct}%</span></div>
        </div>
        <div class="ch-progress-stats">
          <div class="ch-prog-row">
            <div class="ch-prog-item"><div class="ch-prog-val" style="color:#60a5fa">يوم&nbsp;${dayNum}</div><div class="ch-prog-key">الآن</div></div>
            <div class="ch-prog-item"><div class="ch-prog-val" style="color:#4ade80">${completed}</div><div class="ch-prog-key">تم</div></div>
            <div class="ch-prog-item"><div class="ch-prog-val" style="color:#f87171">${missed}</div><div class="ch-prog-key">غاب</div></div>
            <div class="ch-prog-item"><div class="ch-prog-val" style="color:#fbbf24">${remaining}</div><div class="ch-prog-key">متبقي</div></div>
          </div>
          <div class="ch-date-row">
            <span>البداية: ${Utils.formatShort(ch.startDate)}</span>
            <span>النهاية: ${Utils.formatShort(ch.endDate)}</span>
          </div>
        </div>
      </div>
      <div class="ch-motivation">${msg}</div>
      ${checkinHtml}
    </div>
    <div class="ch-card-footer">
      <button class="ch-view-btn" data-chdetails="${ch.id}" style="color:${ch.color}">عرض التفاصيل →</button>
      <div class="ch-card-actions">
        <button class="ch-action-btn" data-chedit="${ch.id}" title="تعديل">
          <svg viewBox="0 0 24 24" fill="none" width="13" height="13"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </button>
        ${ch.status==='active'?`<button class="ch-action-btn" data-chpause="${ch.id}" title="إيقاف مؤقت"><svg viewBox="0 0 24 24" fill="none" width="13" height="13"><rect x="6" y="4" width="4" height="16" rx="1" stroke="currentColor" stroke-width="2"/><rect x="14" y="4" width="4" height="16" rx="1" stroke="currentColor" stroke-width="2"/></svg></button>`:ch.status==='paused'?`<button class="ch-action-btn" data-chresume="${ch.id}" title="استئناف"><svg viewBox="0 0 24 24" fill="none" width="13" height="13"><path d="M5 3l14 9-14 9V3z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg></button>`:''}
        <button class="ch-action-btn ch-action-danger" data-chdelete="${ch.id}" title="حذف">
          <svg viewBox="0 0 24 24" fill="none" width="13" height="13"><path d="M3 6h18M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </button>
      </div>
    </div>
  </div>`;
}

/* ── نافذة تفاصيل التحدي ── */
const ChallengeDetailsModal = {
  open(id){
    State.chDetailId=id;
    const ch=State.challenges.find(c=>c.id===id); if(!ch) return;
    _renderChDetails(ch);
    Utils.el('ch-details-overlay').classList.add('open');
  },
  close(){
    Utils.el('ch-details-overlay').classList.remove('open');
    State.chDetailId=null;
  },
  checkin(id,status){
    const ch=State.challenges.find(c=>c.id===id); if(!ch) return;
    const today=Utils.today();
    const dayNum=ChallengeCompute.currentDayNumber(ch);
    const noteEl=Utils.el('ch-detail-note-input');
    const note=noteEl?noteEl.value.trim():'';
    ch.records=ch.records.filter(r=>r.date!==today);
    ch.records.push({date:today,dayNumber:dayNum,status,note});
    ch.records.sort((a,b)=>a.date.localeCompare(b.date));
    ChallengeCompute.autoUpdateStatus(ch);
    Storage.saveChallenges(State.challenges);
    showToast(status==='completed'?'✅ أحسنت! تم تسجيل اليوم.':'📝 تم تسجيل اليوم.');
    _renderChDetails(ch);
    renderChallenges();
  },
  undo(id){
    const ch=State.challenges.find(c=>c.id===id); if(!ch) return;
    ch.records=ch.records.filter(r=>r.date!==Utils.today());
    if(ch.status==='failed'&&!ch.strictMode) ch.status='active';
    Storage.saveChallenges(State.challenges);
    showToast('↩️ تم إلغاء التسجيل.');
    _renderChDetails(ch);
    renderChallenges();
  },
};

function _renderChDetails(ch){
  const card=Utils.el('ch-details-card'); if(!card) return;
  const isQuit=ch.type==='quit';
  const dayNum=ChallengeCompute.currentDayNumber(ch);
  const completed=ChallengeCompute.completedDays(ch);
  const missed=ChallengeCompute.missedDays(ch);
  const remaining=ChallengeCompute.remainingDays(ch);
  const pct=ChallengeCompute.progressPct(ch);
  const streak=ChallengeCompute.currentStreak(ch);
  const bestStrk=ChallengeCompute.bestStreak(ch);
  const successRate=ChallengeCompute.successRate(ch);
  const today=Utils.today();
  const todayRec=ChallengeCompute.checkedInToday(ch);
  const canCheckin=ch.status==='active'&&today>=ch.startDate&&today<=ch.endDate&&!todayRec;
  const sc={active:{l:'نشط',c:'#60a5fa'},completed:{l:'مكتمل',c:'#4ade80'},failed:{l:'فشل',c:'#f87171'},paused:{l:'موقوف',c:'#fbbf24'}}[ch.status]||{l:'نشط',c:'#60a5fa'};
  const typeColor=isQuit?'#f87171':'#4ade80';
  const typeLabel=isQuit?'تحدي ترك عادة':'تحدي بناء عادة';

  // بناء شبكة التقويم
  let calHtml='';
  for(let i=0;i<ch.duration;i++){
    const d=new Date(Utils.parseDate(ch.startDate)); d.setDate(d.getDate()+i);
    const ds=Utils.toDateStr(d);
    const rec=ch.records.find(r=>r.date===ds);
    let cls='ch-day-future',tip='';
    if(ds===today){ cls='ch-day-today'; tip=`يوم ${i+1} — اليوم`; }
    else if(ds<today){
      if(rec){ cls=rec.status==='completed'?'ch-day-completed':'ch-day-missed'; tip=`يوم ${i+1}: ${rec.status==='completed'?(isQuit?'ثبت':'تم'):'غاب'}${rec.note?' — '+rec.note:''}`; }
      else { cls='ch-day-pending'; tip=`يوم ${i+1}: لا يوجد سجل`; }
    } else { tip=`يوم ${i+1} — ${Utils.formatShort(ds)}`; }
    calHtml+=`<div class="ch-cal-day ${cls}" title="${tip}">${i+1}</div>`;
  }

  // قسم تسجيل اليوم
  let checkinHtml='';
  if(canCheckin){
    checkinHtml=`<div class="ch-det-checkin">
      <div class="ch-det-checkin-title">تسجيل اليوم — يوم ${dayNum}</div>
      <textarea class="ch-det-note-input" id="ch-detail-note-input" rows="2" placeholder="أضف ملاحظة لهذا اليوم (اختياري)…"></textarea>
      <div class="ch-det-checkin-btns">
        <button class="ch-checkin-btn ch-checkin-done" style="flex:1" data-chdetcin="${ch.id}" data-chdetstat="completed">
          <svg viewBox="0 0 24 24" fill="none" width="14" height="14"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          ${isQuit?'ثبتُّ اليوم':'تم اليوم'}
        </button>
        <button class="ch-checkin-btn ch-checkin-miss" style="flex:1" data-chdetcin="${ch.id}" data-chdetstat="missed">
          <svg viewBox="0 0 24 24" fill="none" width="14" height="14"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>
          ${isQuit?'فشلت اليوم':'غبت اليوم'}
        </button>
      </div>
    </div>`;
  } else if(todayRec){
    const isDone=todayRec.status==='completed';
    checkinHtml=`<div class="ch-det-checkin">
      <div class="ch-checked-today ${isDone?'ch-checked-done':'ch-checked-miss'}" style="border-radius:var(--r-sm)">
        <span>${isDone?(isQuit?'✅ ثبتُّ اليوم':'✅ تم اليوم'):(isQuit?'❌ فشلت اليوم':'❌ غبت اليوم')}${todayRec.note?` — <em>${Utils.esc(todayRec.note)}</em>`:''}</span>
        <button class="ch-undo-btn" data-chdetundo="${ch.id}">تراجع</button>
      </div>
    </div>`;
  }

  // قائمة السجلات (آخر 15)
  const recList=[...ch.records].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,20);
  const recsHtml=recList.length===0?`<p style="color:var(--text-3);font-size:13px">لا توجد تسجيلات حتى الآن.</p>`:
    recList.map(r=>`<div class="ch-det-record">
      <div class="ch-det-rec-day">يوم&nbsp;${r.dayNumber}</div>
      <div class="ch-det-rec-status ${r.status==='completed'?'ch-det-rec-done':'ch-det-rec-miss'}">${r.status==='completed'?(isQuit?'ثبت':'تم'):'غاب'}</div>
      ${r.note?`<div class="ch-det-rec-note">${Utils.esc(r.note)}</div>`:''}
      <div class="ch-det-rec-date">${Utils.formatShort(r.date)}</div>
    </div>`).join('');

  card.innerHTML=`
    <div class="ch-det-header">
      <div class="ch-det-header-top">
        <div class="ch-det-title-wrap">
          <div class="ch-det-icon" style="background:${ch.color}22;border:1px solid ${ch.color}44">${Utils.esc(ch.icon)}</div>
          <div>
            <div class="ch-det-title">${Utils.esc(ch.name)}</div>
            <div class="ch-det-sub">
              <span class="ch-type-badge" style="color:${typeColor};background:${typeColor}18">${typeLabel}</span>
              <span class="ch-duration-badge">${ch.duration} يوم</span>
              <span class="ch-status-badge" style="color:${sc.c};background:${sc.c}18">${sc.l}</span>
              ${ch.strictMode?`<span class="ch-type-badge" style="color:#fbbf24;background:rgba(251,191,36,.12)">⚡ صارم</span>`:''}
            </div>
          </div>
        </div>
        <button class="ch-det-close" id="ch-det-close-btn">
          <svg viewBox="0 0 24 24" fill="none" width="16" height="16"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </button>
      </div>
      ${ch.description?`<div style="font-size:13px;color:var(--text-2);line-height:1.6;padding-bottom:18px;border-bottom:1px solid var(--border);margin-bottom:0">"${Utils.esc(ch.description)}"</div>`:''}
    </div>
    <div class="ch-det-stats">
      <div class="ch-det-stat"><div class="ch-det-stat-val" style="color:#60a5fa">يوم ${dayNum}/${ch.duration}</div><div class="ch-det-stat-key">التقدم</div></div>
      <div class="ch-det-stat"><div class="ch-det-stat-val" style="color:#4ade80">${completed}</div><div class="ch-det-stat-key">تم</div></div>
      <div class="ch-det-stat"><div class="ch-det-stat-val" style="color:#f87171">${missed}</div><div class="ch-det-stat-key">غاب</div></div>
      <div class="ch-det-stat"><div class="ch-det-stat-val" style="color:#fbbf24">${remaining}</div><div class="ch-det-stat-key">متبقي</div></div>
      <div class="ch-det-stat"><div class="ch-det-stat-val" style="color:#fbbf24">🔥 ${streak}</div><div class="ch-det-stat-key">السلسلة الحالية</div></div>
      <div class="ch-det-stat"><div class="ch-det-stat-val" style="color:#fbbf24">⭐ ${bestStrk}</div><div class="ch-det-stat-key">أفضل سلسلة</div></div>
      <div class="ch-det-stat"><div class="ch-det-stat-val" style="color:#2dd4bf">${pct}%</div><div class="ch-det-stat-key">مكتمل</div></div>
      <div class="ch-det-stat"><div class="ch-det-stat-val" style="color:#a78bfa">${successRate}%</div><div class="ch-det-stat-key">نسبة النجاح</div></div>
    </div>
    <div class="ch-det-body">
      ${checkinHtml}
      <div class="ch-det-section-title">تقويم التحدي</div>
      <div class="ch-cal-legend">
        <div class="ch-cal-legend-item"><div class="ch-cal-legend-dot" style="background:rgba(74,222,128,.4)"></div>${isQuit?'يوم ثبات':'مكتمل'}</div>
        <div class="ch-cal-legend-item"><div class="ch-cal-legend-dot" style="background:rgba(248,113,113,.4)"></div>${isQuit?'يوم تعثّر':'غاب'}</div>
        <div class="ch-cal-legend-item"><div class="ch-cal-legend-dot" style="background:rgba(124,58,237,.5)"></div>اليوم</div>
        <div class="ch-cal-legend-item"><div class="ch-cal-legend-dot" style="background:rgba(255,255,255,.06)"></div>قادم</div>
      </div>
      <div class="ch-cal-grid">${calHtml}</div>
      <div class="ch-det-section-title">السجلات اليومية</div>
      <div class="ch-det-records">${recsHtml}</div>
    </div>
    <div class="ch-det-footer">
      <div class="ch-det-footer-left">
        <button class="btn-ghost btn-sm" data-chdetdelete="${ch.id}">
          <svg viewBox="0 0 24 24" fill="none" width="14" height="14"><path d="M3 6h18M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          حذف
        </button>
        ${ch.status==='active'?`<button class="btn-ghost btn-sm" data-chdetpause="${ch.id}">⏸ إيقاف مؤقت</button>`:ch.status==='paused'?`<button class="btn-ghost btn-sm" data-chdetresume="${ch.id}">▶ استئناف</button>`:''}
      </div>
      <div class="ch-det-footer-right">
        <button class="btn-ghost btn-sm" id="ch-det-close-btn2">إغلاق</button>
        <button class="btn-primary btn-sm" data-chdetedit="${ch.id}">تعديل التحدي</button>
      </div>
    </div>`;
}

/* ── نافذة إنشاء/تعديل التحدي ── */
const ChallengeModal = {
  _color: CH_COLOR_PRESETS[0],
  _icon:  CH_ICON_PRESETS[0],
  open(id=null){
    Utils.el('ch-edit-id').value=id||'';
    Utils.el('ch-modal-title').textContent=id?'تعديل التحدي':'تحدٍّ جديد';
    if(id){
      const ch=State.challenges.find(c=>c.id===id); if(!ch) return;
      Utils.el('ch-modal-name').value=ch.name;
      Utils.el('ch-modal-desc').value=ch.description||'';
      Utils.el('ch-modal-start').value=ch.startDate;
      Utils.el('ch-modal-strict').checked=!!ch.strictMode;
      Utils.qsa('[name="ch-type"]').forEach(r=>r.checked=r.value===ch.type);
      const std=[7,21,30,60,90];
      const isCustom=!std.includes(ch.duration);
      Utils.qsa('.ch-dur-btn').forEach(b=>b.classList.toggle('active',isCustom?b.dataset.chDur==='custom':Number(b.dataset.chDur)===ch.duration));
      const customInput=Utils.el('ch-modal-custom-days');
      customInput.style.display=isCustom?'block':'none';
      if(isCustom)customInput.value=ch.duration;
      this._color=ch.color; this._icon=ch.icon;
    } else {
      Utils.el('ch-modal-name').value='';
      Utils.el('ch-modal-desc').value='';
      Utils.el('ch-modal-start').value=Utils.today();
      Utils.el('ch-modal-strict').checked=false;
      Utils.qsa('[name="ch-type"]').forEach(r=>r.checked=r.value==='build');
      Utils.qsa('.ch-dur-btn').forEach(b=>b.classList.toggle('active',b.dataset.chDur==='30'));
      Utils.el('ch-modal-custom-days').style.display='none';
      Utils.el('ch-modal-custom-days').value='';
      this._color=CH_COLOR_PRESETS[0]; this._icon=CH_ICON_PRESETS[0];
    }
    _renderChColorPicker(); _renderChIconGrid();
    Utils.el('ch-modal-overlay').classList.add('open');
    setTimeout(()=>Utils.el('ch-modal-name').focus(),80);
  },
  save(){
    const name=Utils.el('ch-modal-name').value.trim();
    if(!name){ showToast('⚠️ اسم التحدي مطلوب.'); return; }
    const type=Utils.qs('[name="ch-type"]:checked')?.value||'build';
    const startDate=Utils.el('ch-modal-start').value||Utils.today();
    const desc=Utils.el('ch-modal-desc').value.trim();
    const strict=Utils.el('ch-modal-strict').checked;
    const activeBtn=Utils.qs('.ch-dur-btn.active');
    let duration=30;
    if(activeBtn){
      if(activeBtn.dataset.chDur==='custom') duration=parseInt(Utils.el('ch-modal-custom-days').value)||30;
      else duration=Number(activeBtn.dataset.chDur);
    }
    duration=Math.max(1,Math.min(365,duration));
    const endDate=ChallengeCompute.calcEndDate(startDate,duration);
    const editId=Utils.el('ch-edit-id').value;
    if(editId){
      const ch=State.challenges.find(c=>c.id===editId);
      if(ch){
        ch.name=name; ch.type=type; ch.description=desc; ch.strictMode=strict;
        ch.color=this._color; ch.icon=this._icon;
        if(ch.startDate!==startDate||ch.duration!==duration){ ch.startDate=startDate; ch.duration=duration; ch.endDate=endDate; }
        ChallengeCompute.autoUpdateStatus(ch);
      }
    } else {
      State.challenges.push({
        id:'ch_'+Utils.uid(), name, type, duration,
        startDate, endDate, description:desc, strictMode:strict,
        status:'active', color:this._color, icon:this._icon,
        records:[], createdAt:Utils.today(),
      });
    }
    Storage.saveChallenges(State.challenges);
    this.close();
    renderChallenges();
    showToast(editId?'✏️ تم تحديث التحدي!':'🎯 تم إنشاء التحدي!');
  },
  close(){
    Utils.el('ch-modal-overlay').classList.remove('open');
  },
};

function _renderChColorPicker(){
  const swatches=Utils.el('ch-modal-color-swatches'); if(!swatches)return;
  swatches.innerHTML=CH_COLOR_PRESETS.map(c=>`<div class="color-swatch${ChallengeModal._color===c?' selected':''}" data-chcolor="${c}" style="background:${c}"></div>`).join('');
  const native=Utils.el('ch-modal-color-native');
  if(native){ native.value=ChallengeModal._color;
    native.oninput=e=>{ ChallengeModal._color=e.target.value; _renderChColorPicker(); };
  }
}

function _renderChIconGrid(){
  const grid=Utils.el('ch-modal-icon-grid'); if(!grid)return;
  grid.innerHTML=CH_ICON_PRESETS.map(ic=>`<span class="icon-preset${ChallengeModal._icon===ic?' selected':''}" data-chicon="${ic}">${ic}</span>`).join('');
  const inp=Utils.el('ch-modal-icon-input');
  if(inp){ inp.value=ChallengeModal._icon;
    inp.oninput=e=>{ ChallengeModal._icon=e.target.value; _renderChIconGrid(); };
  }
}

/* ── تفويض الأحداث الخاصة بالتحديات ── */
document.addEventListener('click',e=>{
  // فتح نافذة إنشاء تحدٍّ
  if(e.target.closest('#ch-create-btn')||e.target.closest('#ch-empty-create-btn')) ChallengeModal.open();

  // أزرار الفلتر
  const fb=e.target.closest('[data-chfilter]');
  if(fb&&State.page==='challenges'){ State.chFilter=fb.dataset.chfilter; renderChallenges(); }

  // أزرار المدة في النافذة
  const db=e.target.closest('.ch-dur-btn');
  if(db){ Utils.qsa('.ch-dur-btn').forEach(b=>b.classList.remove('active')); db.classList.add('active');
    Utils.el('ch-modal-custom-days').style.display=db.dataset.chDur==='custom'?'block':'none'; }

  // ألوان التحدي في النافذة
  const cs=e.target.closest('[data-chcolor]');
  if(cs){ ChallengeModal._color=cs.dataset.chcolor; _renderChColorPicker(); }

  // أيقونات التحدي في النافذة
  const ig=e.target.closest('[data-chicon]');
  if(ig){ ChallengeModal._icon=ig.dataset.chicon; const inp=Utils.el('ch-modal-icon-input'); if(inp)inp.value=ig.dataset.chicon; _renderChIconGrid(); }

  // تسجيل سريع من البطاقة
  const ci=e.target.closest('[data-chdostatus]');
  if(ci){
    const id=ci.dataset.chid, status=ci.dataset.chdostatus;
    const ch=State.challenges.find(c=>c.id===id); if(!ch) return;
    const today=Utils.today(), dayNum=ChallengeCompute.currentDayNumber(ch);
    ch.records=ch.records.filter(r=>r.date!==today);
    ch.records.push({date:today,dayNumber:dayNum,status,note:''});
    ch.records.sort((a,b)=>a.date.localeCompare(b.date));
    ChallengeCompute.autoUpdateStatus(ch);
    Storage.saveChallenges(State.challenges);
    showToast(status==='completed'?'✅ تم تحديد اليوم كمكتمل!':'📝 تم تحديد اليوم كغياب.');
    renderChallenges();
  }

  // تراجع من البطاقة
  const undo=e.target.closest('[data-chundoid]');
  if(undo){
    const ch=State.challenges.find(c=>c.id===undo.dataset.chundoid); if(!ch) return;
    ch.records=ch.records.filter(r=>r.date!==Utils.today());
    if(ch.status==='failed'&&!ch.strictMode) ch.status='active';
    Storage.saveChallenges(State.challenges);
    showToast('↩️ تم إلغاء التسجيل.'); renderChallenges();
  }

  // عرض التفاصيل
  const vd=e.target.closest('[data-chdetails]');
  if(vd) ChallengeDetailsModal.open(vd.dataset.chdetails);

  // تعديل من البطاقة
  const ed=e.target.closest('[data-chedit]');
  if(ed) ChallengeModal.open(ed.dataset.chedit);

  // إيقاف مؤقت من البطاقة
  const pa=e.target.closest('[data-chpause]');
  if(pa){ const ch=State.challenges.find(c=>c.id===pa.dataset.chpause); if(ch){ ch.status='paused'; Storage.saveChallenges(State.challenges); renderChallenges(); showToast('⏸ تم إيقاف التحدي مؤقتاً.'); } }

  // استئناف من البطاقة
  const re=e.target.closest('[data-chresume]');
  if(re){ const ch=State.challenges.find(c=>c.id===re.dataset.chresume); if(ch){ ch.status='active'; ChallengeCompute.autoUpdateStatus(ch); Storage.saveChallenges(State.challenges); renderChallenges(); showToast('▶ تم استئناف التحدي!'); } }

  // حذف من البطاقة
  const de=e.target.closest('[data-chdelete]');
  if(de){
    const id=de.dataset.chdelete;
    const ch=State.challenges.find(c=>c.id===id);
    showConfirm({title:`حذف "${ch?.name||'هذا التحدي'}"؟`,body:'سيتم حذف جميع السجلات نهائياً. لا يمكن التراجع عن هذا.',okLabel:'حذف',isDanger:true,onOk:()=>{
      State.challenges=State.challenges.filter(c=>c.id!==id);
      Storage.saveChallenges(State.challenges); renderChallenges(); showToast('🗑️ تم حذف التحدي.');
    }});
  }

  // ── أزرار نافذة التفاصيل ──
  if(e.target.closest('#ch-det-close-btn')||e.target.closest('#ch-det-close-btn2')) ChallengeDetailsModal.close();

  // تسجيل اليوم في التفاصيل
  const dci=e.target.closest('[data-chdetcin]');
  if(dci) ChallengeDetailsModal.checkin(dci.dataset.chdetcin,dci.dataset.chdetstat);

  // تراجع في التفاصيل
  const dundo=e.target.closest('[data-chdetundo]');
  if(dundo) ChallengeDetailsModal.undo(dundo.dataset.chdetundo);

  // تعديل التحدي من التفاصيل
  const dEdit=e.target.closest('[data-chdetedit]');
  if(dEdit){ ChallengeDetailsModal.close(); ChallengeModal.open(dEdit.dataset.chdetedit); }

  // إيقاف مؤقت من التفاصيل
  const dPause=e.target.closest('[data-chdetpause]');
  if(dPause){ const ch=State.challenges.find(c=>c.id===dPause.dataset.chdetpause); if(ch){ ch.status='paused'; Storage.saveChallenges(State.challenges); _renderChDetails(ch); renderChallenges(); showToast('⏸ تم إيقاف التحدي مؤقتاً.'); } }

  // استئناف من التفاصيل
  const dResume=e.target.closest('[data-chdetresume]');
  if(dResume){ const ch=State.challenges.find(c=>c.id===dResume.dataset.chdetresume); if(ch){ ch.status='active'; ChallengeCompute.autoUpdateStatus(ch); Storage.saveChallenges(State.challenges); _renderChDetails(ch); renderChallenges(); showToast('▶ تم استئناف التحدي!'); } }

  // حذف من التفاصيل
  const dDelete=e.target.closest('[data-chdetdelete]');
  if(dDelete){
    const id=dDelete.dataset.chdetdelete;
    const ch=State.challenges.find(c=>c.id===id);
    showConfirm({title:`حذف "${ch?.name||'هذا التحدي'}"؟`,body:'سيتم حذف جميع السجلات نهائياً. لا يمكن التراجع عن هذا.',okLabel:'حذف',isDanger:true,onOk:()=>{
      State.challenges=State.challenges.filter(c=>c.id!==id);
      Storage.saveChallenges(State.challenges); ChallengeDetailsModal.close(); renderChallenges(); showToast('🗑️ تم حذف التحدي.');
    }});
  }

  // إغلاق نافذة التفاصيل بالنقر على الخلفية
  if(e.target===Utils.el('ch-details-overlay')) ChallengeDetailsModal.close();

  // إغلاق نافذة التحدي بالنقر على الخلفية
  if(e.target===Utils.el('ch-modal-overlay')) ChallengeModal.close();
});

// أزرار حفظ/إلغاء في نافذة التحدي
document.addEventListener('click',e=>{
  if(e.target.closest('#ch-modal-save'))  ChallengeModal.save();
  if(e.target.closest('#ch-modal-cancel')||e.target.closest('#ch-modal-close')) ChallengeModal.close();
});

// حفظ التحدي بالضغط على Enter
Utils.el('ch-modal-name')?.addEventListener('keydown',e=>{ if(e.key==='Enter')ChallengeModal.save(); });

document.addEventListener('DOMContentLoaded',init);


/* ══════════════════════════════════════════
   قائمة المزيد للجوال
══════════════════════════════════════════ */

function setMobileMoreOpen(isOpen) {
  const overlay=Utils.el('mob-more-overlay');
  if(!overlay) return;
  overlay.classList.toggle('open', isOpen);
  document.body?.classList.toggle('mobile-nav-open', isOpen);
}

document.addEventListener('click',e=>{
  const moreBtn=e.target.closest('#mob-more-btn');
  if(moreBtn){
    const overlay=Utils.el('mob-more-overlay');
    const shouldOpen=!overlay?.classList.contains('open');
    setMobileMoreOpen(shouldOpen);
    return;
  }
  const overlay=Utils.el('mob-more-overlay');
  if(overlay&&overlay.classList.contains('open')){
    if(!e.target.closest('#mob-more-panel')&&!e.target.closest('#mob-more-btn')){
      setMobileMoreOpen(false);
    }
  }
  const moreItem=e.target.closest('.mob-more-item[data-page]');
  if(moreItem){
    setMobileMoreOpen(false);
    navigate(moreItem.dataset.page);
  }
});

window.addEventListener('resize',()=>{
  if(window.innerWidth>640){
    setMobileMoreOpen(false);
  }
});

/* ══════════════════════════════════════════
   وحدة المهام اليومية
══════════════════════════════════════════ */

const TASK_PRIORITY_LABELS = { low:'🟢 منخفض', medium:'🟡 متوسط', high:'🔴 عالي' };
const TASK_PRIORITY_ORDER  = { high:0, medium:1, low:2 };

function getTasksForDate(date) {
  return State.tasks.filter(t=>{
    if(t.date===date) return true;
    if(t.repeat==='daily') return true;
    if(t.repeat==='weekly'){
      const td=Utils.parseDate(t.date), cd=Utils.parseDate(date);
      return td.getDay()===cd.getDay() && date>=t.date;
    }
    return false;
  });
}

function renderTasks() {
  const el=Utils.el('tasks-content'); if(!el) return;
  const date=State.tasksDate;
  const tasks=getTasksForDate(date).sort((a,b)=>(TASK_PRIORITY_ORDER[a.priority]||1)-(TASK_PRIORITY_ORDER[b.priority]||1));
  const done=Storage.getTasksDone();
  const doneDates=done[date]||[];

  const total=tasks.length;
  const completedCount=tasks.filter(t=>doneDates.includes(t.id||t.title)).length;
  const pct=total?Math.round((completedCount/total)*100):0;

  const cats=[...new Set(tasks.map(t=>t.category).filter(Boolean))];
  const filterCat=State._taskCatFilter||'all';

  const filtered=filterCat==='all'?tasks:tasks.filter(t=>t.category===filterCat);

  el.innerHTML=`
    <div class="tasks-header-stats reveal-item">
      <div class="glass-card tasks-progress-card">
        <div class="tasks-prog-info">
          <span class="tasks-prog-label">${completedCount} من ${total} مهمة مكتملة</span>
          <span class="tasks-prog-pct">${pct}%</span>
        </div>
        <div class="tasks-prog-bar"><div class="tasks-prog-fill" style="width:${pct}%"></div></div>
      </div>
    </div>
    ${cats.length>1?`<div class="tasks-cat-filters reveal-item">
      <button class="ch-filter-btn${filterCat==='all'?' active':''}" data-taskcatfilter="all">الكل</button>
      ${cats.map(c=>`<button class="ch-filter-btn${filterCat===c?' active':''}" data-taskcatfilter="${Utils.esc(c)}">${Utils.esc(c)}</button>`).join('')}
    </div>`:''}
    <div class="tasks-list reveal-item">
      ${filtered.length===0?`<div class="tasks-empty"><div class="tasks-empty-icon">✅</div><p>لا توجد مهام لهذا اليوم. استمتع بوضوحك!</p><button class="btn-primary" id="tasks-add-first-btn">إضافة مهمة</button></div>`:''}
      ${filtered.map(t=>{
        const tid=t.id||t.title;
        const isDone=doneDates.includes(tid);
        return `<div class="task-item${isDone?' task-done':''} card-interactive reveal-item" data-taskid="${Utils.esc(tid)}">
          <button class="task-check${isDone?' checked':''}" data-tasktoggle="${Utils.esc(tid)}" title="${isDone?'إلغاء الإتمام':'تحديد كمكتمل'}">
            ${isDone?`<svg viewBox="0 0 24 24" fill="none" width="16" height="16"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`:''}
          </button>
          <div class="task-body">
            <div class="task-title">${Utils.esc(t.title)}</div>
            ${t.description?`<div class="task-desc">${Utils.esc(t.description)}</div>`:''}
            <div class="task-meta">
              <span class="task-priority task-priority-${t.priority||'medium'}">${TASK_PRIORITY_LABELS[t.priority||'medium']}</span>
              ${t.time?`<span class="task-time">🕐 ${t.time}</span>`:''}
              ${t.category?`<span class="task-cat-tag">${Utils.esc(t.category)}</span>`:''}
              ${t.repeat&&t.repeat!=='none'?`<span class="task-repeat-badge">🔄 ${t.repeat}</span>`:''}
            </div>
          </div>
          <div class="task-actions">
            <button class="task-action-btn" data-taskedit="${Utils.esc(t.id)}" title="تعديل">
              <svg viewBox="0 0 24 24" fill="none" width="14" height="14"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
            </button>
            <button class="task-action-btn task-delete-btn" data-taskdelete="${Utils.esc(t.id)}" title="حذف">
              <svg viewBox="0 0 24 24" fill="none" width="14" height="14"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>
        </div>`;
      }).join('')}
    </div>
  `;
  UIEnhancer.observeNewItems(Utils.el('tasks-content'));
}

const TaskModal = {
  open(id=null) {
    const overlay=Utils.el('task-modal-overlay');
    Utils.el('task-modal-title').textContent=id?'تعديل المهمة':'إضافة مهمة';
    Utils.el('task-edit-id').value=id||'';
    const today=Utils.today();
    if(id){
      const t=State.tasks.find(x=>x.id===id);
      if(!t) return;
      Utils.el('task-title-input').value=t.title||'';
      Utils.el('task-desc-input').value=t.description||'';
      Utils.el('task-date-input').value=t.date||today;
      Utils.el('task-time-input').value=t.time||'';
      Utils.el('task-category-input').value=t.category||'';
      Utils.el('task-repeat-input').value=t.repeat||'none';
      overlay.querySelectorAll('input[name="task-priority"]').forEach(r=>r.checked=(r.value===(t.priority||'medium')));
    } else {
      Utils.el('task-title-input').value='';
      Utils.el('task-desc-input').value='';
      Utils.el('task-date-input').value=State.tasksDate;
      Utils.el('task-time-input').value='';
      Utils.el('task-category-input').value='';
      Utils.el('task-repeat-input').value='none';
      overlay.querySelectorAll('input[name="task-priority"]').forEach(r=>r.checked=(r.value==='medium'));
    }
    overlay.classList.add('open');
    Utils.el('task-title-input').focus();
  },
  close() { Utils.el('task-modal-overlay').classList.remove('open'); },
  save() {
    const title=Utils.el('task-title-input').value.trim();
    if(!title){ showToast('عنوان المهمة مطلوب.','error'); return; }
    const id=Utils.el('task-edit-id').value;
    const priority=Utils.qs('input[name="task-priority"]:checked')?.value||'medium';
    const task={
      id:       id||Utils.uid(),
      title,
      description: Utils.el('task-desc-input').value.trim(),
      date:     Utils.el('task-date-input').value||State.tasksDate,
      time:     Utils.el('task-time-input').value||'',
      priority,
      category: Utils.el('task-category-input').value.trim(),
      repeat:   Utils.el('task-repeat-input').value||'none',
      createdAt:new Date().toISOString(),
    };
    if(id){
      const idx=State.tasks.findIndex(x=>x.id===id);
      if(idx>=0) State.tasks[idx]={...State.tasks[idx],...task};
    } else {
      State.tasks.push(task);
    }
    Storage.saveTasks(State.tasks);
    this.close();
    renderTasks();
    showToast(id?'تم تحديث المهمة!':'تمت إضافة المهمة! 🎉','success');
  },
};

// تفويض أحداث المهام
document.addEventListener('click',e=>{
  if(e.target.closest('#add-task-btn')||e.target.closest('#tasks-add-first-btn')) TaskModal.open();
  if(e.target.closest('#task-modal-save'))  TaskModal.save();
  if(e.target.closest('#task-modal-cancel')||e.target.closest('#task-modal-close')) TaskModal.close();
  if(e.target===Utils.el('task-modal-overlay')) TaskModal.close();

  const toggle=e.target.closest('[data-tasktoggle]');
  if(toggle){
    const tid=toggle.dataset.tasktoggle;
    const date=State.tasksDate;
    const allDone=Storage.getTasksDone();
    if(!allDone[date]) allDone[date]=[];
    const idx=allDone[date].indexOf(tid);
    if(idx>=0) allDone[date].splice(idx,1); else allDone[date].push(tid);
    Storage.saveTasksDone(allDone);
    renderTasks();
  }
  const editTask=e.target.closest('[data-taskedit]');
  if(editTask) TaskModal.open(editTask.dataset.taskedit);

  const delTask=e.target.closest('[data-taskdelete]');
  if(delTask){
    showConfirm({title:'حذف المهمة',body:'هل تريد حذف هذه المهمة نهائياً؟',okLabel:'حذف',isDanger:true,onOk:()=>{
      State.tasks=State.tasks.filter(t=>t.id!==delTask.dataset.taskdelete);
      Storage.saveTasks(State.tasks);
      renderTasks(); showToast('تم حذف المهمة.','success');
    }});
  }
  const catFilter=e.target.closest('[data-taskcatfilter]');
  if(catFilter){ State._taskCatFilter=catFilter.dataset.taskcatfilter; renderTasks(); }
});

document.addEventListener('change',e=>{
  if(e.target.id==='tasks-date-picker'){
    State.tasksDate=e.target.value;
    renderTasks();
  }
});

/* ══════════════════════════════════════════
   وحدة المذكرات
══════════════════════════════════════════ */

const MOOD_LABELS = { amazing:'🌟 رائع', good:'😊 جيد', okay:'😐 عادي', hard:'😔 صعب', rough:'😤 قاسٍ' };
const MOOD_COLORS = { amazing:'#fbbf24', good:'#4ade80', okay:'#60a5fa', hard:'#a78bfa', rough:'#f87171' };

function renderJournal() {
  const el=Utils.el('journal-content'); if(!el) return;
  let entries=[...State.journal].sort((a,b)=>b.date.localeCompare(a.date));
  const search=State.journalSearch.trim().toLowerCase();
  if(search) entries=entries.filter(e=>
    (e.title||'').toLowerCase().includes(search)||
    (e.body||'').toLowerCase().includes(search)||
    (e.tags||[]).some(t=>t.toLowerCase().includes(search))
  );
  if(State.journalMoodFilter!=='all') entries=entries.filter(e=>e.mood===State.journalMoodFilter);

  el.innerHTML=`
    <div class="journal-controls reveal-item">
      <div class="search-wrap">
        <svg viewBox="0 0 24 24" fill="none" width="16" height="16" style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--text-3)"><circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="1.8"/><path d="M21 21l-4.35-4.35" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
        <input class="form-input" id="journal-search-input" placeholder="بحث في المذكرات…" value="${Utils.esc(State.journalSearch)}" style="padding-left:38px">
      </div>
      <div class="mood-filter-row">
        <button class="ch-filter-btn${State.journalMoodFilter==='all'?' active':''}" data-moodfilter="all">جميع المزاجات</button>
        ${Object.entries(MOOD_LABELS).map(([k,v])=>`<button class="ch-filter-btn${State.journalMoodFilter===k?' active':''}" data-moodfilter="${k}">${v}</button>`).join('')}
      </div>
    </div>
    <div class="journal-stats-row reveal-item">
      <div class="glass-card journal-stat-card">
        <div class="journal-stat-num">${State.journal.length}</div>
        <div class="journal-stat-label">إجمالي التدوينات</div>
      </div>
      <div class="glass-card journal-stat-card">
        <div class="journal-stat-num">${[...new Set(State.journal.map(e=>e.date.slice(0,7)))].length}</div>
        <div class="journal-stat-label">شهور مكتوبة</div>
      </div>
      <div class="glass-card journal-stat-card">
        <div class="journal-stat-num">${State.journal.reduce((s,e)=>{const w=(e.body||'').trim().split(/\s+/).filter(Boolean).length;return s+w;},0).toLocaleString()}</div>
        <div class="journal-stat-label">إجمالي الكلمات</div>
      </div>
    </div>
    ${entries.length===0?`<div class="journal-empty reveal-item"><div class="journal-empty-icon">📖</div><p>${search?'لا توجد مذكرات تطابق بحثك.':'ابدأ رحلتك. اكتب أول تدوينة لك اليوم.'}</p></div>`:''}
    <div class="journal-grid">
      ${entries.map(e=>{
        const wordCount=(e.body||'').trim().split(/\s+/).filter(Boolean).length;
        const preview=(e.body||'').slice(0,150);
        const moodColor=MOOD_COLORS[e.mood]||'var(--text-3)';
        return `<div class="glass-card journal-entry-card card-interactive reveal-item" style="--entry-mood-color:${moodColor}">
          <div class="je-header">
            <div class="je-date">${Utils.formatFull(e.date)}</div>
            ${e.mood?`<span class="je-mood" style="color:${moodColor}">${MOOD_LABELS[e.mood]||e.mood}</span>`:''}
          </div>
          ${e.title?`<div class="je-title">${Utils.esc(e.title)}</div>`:''}
          <div class="je-preview">${Utils.esc(preview)}${(e.body||'').length>150?'…':''}</div>
          ${e.tags&&e.tags.length?`<div class="je-tags">${e.tags.map(t=>`<span class="je-tag">#${Utils.esc(t)}</span>`).join('')}</div>`:''}
          <div class="je-footer">
            <span class="je-wordcount">${wordCount} كلمة</span>
            <div class="je-actions">
              <button class="task-action-btn" data-journaledit="${Utils.esc(e.id)}" title="تعديل">
                <svg viewBox="0 0 24 24" fill="none" width="14" height="14"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
              </button>
              <button class="task-action-btn task-delete-btn" data-journaldelete="${Utils.esc(e.id)}" title="حذف">
                <svg viewBox="0 0 24 24" fill="none" width="14" height="14"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
            </div>
          </div>
        </div>`;
      }).join('')}
    </div>
  `;
  Utils.el('journal-search-input')?.addEventListener('input',ev=>{ State.journalSearch=ev.target.value; renderJournal(); });
  UIEnhancer.observeNewItems(el);
}

let _journalAutoSaveTimer=null;
const JournalModal = {
  open(id=null) {
    const overlay=Utils.el('journal-modal-overlay');
    Utils.el('journal-modal-title').textContent=id?'تعديل التدوينة':'تدوينة جديدة';
    Utils.el('journal-edit-id').value=id||'';
    Utils.el('journal-word-count').textContent='0 كلمة';
    Utils.el('journal-save-hint').textContent='';
    overlay.querySelectorAll('.mood-btn').forEach(b=>b.classList.remove('selected'));
    Utils.el('journal-mood-input').value='';
    if(id){
      const e=State.journal.find(x=>x.id===id); if(!e) return;
      Utils.el('journal-date-input').value=e.date||Utils.today();
      Utils.el('journal-title-input').value=e.title||'';
      Utils.el('journal-body-input').value=e.body||'';
      Utils.el('journal-tags-input').value=(e.tags||[]).join(', ');
      Utils.el('journal-mood-input').value=e.mood||'';
      if(e.mood) overlay.querySelector(`.mood-btn[data-mood="${e.mood}"]`)?.classList.add('selected');
      this._updateWordCount();
    } else {
      Utils.el('journal-date-input').value=Utils.today();
      Utils.el('journal-title-input').value='';
      Utils.el('journal-body-input').value='';
      Utils.el('journal-tags-input').value='';
    }
    overlay.classList.add('open');
    setTimeout(()=>Utils.el('journal-body-input').focus(),200);
  },
  close() { Utils.el('journal-modal-overlay').classList.remove('open'); clearTimeout(_journalAutoSaveTimer); },
  save() {
    const body=Utils.el('journal-body-input').value.trim();
    if(!body){ showToast('اكتب شيئاً في محتوى التدوينة.','error'); return; }
    const id=Utils.el('journal-edit-id').value;
    const tagsRaw=Utils.el('journal-tags-input').value;
    const tags=tagsRaw.split(',').map(t=>t.trim()).filter(Boolean);
    const entry={
      id:       id||Utils.uid(),
      date:     Utils.el('journal-date-input').value||Utils.today(),
      title:    Utils.el('journal-title-input').value.trim(),
      body,
      mood:     Utils.el('journal-mood-input').value||'',
      tags,
      updatedAt:new Date().toISOString(),
    };
    if(id){
      const idx=State.journal.findIndex(x=>x.id===id);
      if(idx>=0) State.journal[idx]={...State.journal[idx],...entry};
    } else {
      entry.createdAt=new Date().toISOString();
      State.journal.unshift(entry);
    }
    Storage.saveJournal(State.journal);
    this.close();
    renderJournal();
    showToast('تم حفظ التدوينة! 🎉','success');
  },
  _updateWordCount() {
    const body=Utils.el('journal-body-input')?.value||'';
    const words=body.trim().split(/\s+/).filter(Boolean).length;
    const wc=Utils.el('journal-word-count');
    if(wc) wc.textContent=`${words} كلمة`;
  },
};

document.addEventListener('click',e=>{
  if(e.target.closest('#add-journal-btn')) JournalModal.open();
  if(e.target.closest('#journal-modal-save'))  JournalModal.save();
  if(e.target.closest('#journal-modal-cancel')||e.target.closest('#journal-modal-close')) JournalModal.close();
  if(e.target===Utils.el('journal-modal-overlay')) JournalModal.close();

  const mb=e.target.closest('.mood-btn[data-mood]');
  if(mb){
    Utils.qsa('.mood-btn').forEach(b=>b.classList.remove('selected'));
    mb.classList.add('selected');
    Utils.el('journal-mood-input').value=mb.dataset.mood;
  }
  const jEdit=e.target.closest('[data-journaledit]');
  if(jEdit) JournalModal.open(jEdit.dataset.journaledit);

  const jDel=e.target.closest('[data-journaldelete]');
  if(jDel){
    showConfirm({title:'حذف التدوينة',body:'هل تريد حذف هذه التدوينة نهائياً؟',okLabel:'حذف',isDanger:true,onOk:()=>{
      State.journal=State.journal.filter(e=>e.id!==jDel.dataset.journaldelete);
      Storage.saveJournal(State.journal);
      renderJournal(); showToast('تم حذف التدوينة.','success');
    }});
  }
  const mf=e.target.closest('[data-moodfilter]');
  if(mf){ State.journalMoodFilter=mf.dataset.moodfilter; renderJournal(); }
});

Utils.el('journal-body-input')?.addEventListener('input',function(){
  JournalModal._updateWordCount();
  clearTimeout(_journalAutoSaveTimer);
  _journalAutoSaveTimer=setTimeout(()=>{ const hint=Utils.el('journal-save-hint'); if(hint) hint.textContent='تم حفظ المسودة تلقائياً…'; },3000);
});

/* ══════════════════════════════════════════
   وحدة الإنجازات
══════════════════════════════════════════ */

const ACH_CAT_LABELS = {
  health:'💪 الصحة', work:'💼 العمل', learning:'📚 التعلم',
  personal:'👤 شخصي', relationships:'❤️ العلاقات', financial:'💰 المالية',
  challenge:'🏆 تحدٍّ', other:'📌 أخرى'
};
const ACH_IMPORTANCE_LABELS = { normal:'⭐ عادي', major:'🌟 مهم', legendary:'🔥 أسطوري' };
const ACH_ICON_PRESETS = ['🏆','🥇','🎯','🔥','💪','⭐','🌟','🚀','🎓','💡','❤️','🎉','🎊','🏅','🎖️','🥈','🥉','📚','💰','🌱'];

function renderAchievements() {
  const el=Utils.el('achievements-content'); if(!el) return;
  let achs=[...State.achievements].sort((a,b)=>b.date.localeCompare(a.date));
  const search=State.achSearch.trim().toLowerCase();
  if(search) achs=achs.filter(a=>(a.title||'').toLowerCase().includes(search)||(a.description||'').toLowerCase().includes(search));
  if(State.achFilter!=='all') achs=achs.filter(a=>a.category===State.achFilter);

  const legendary=State.achievements.filter(a=>a.importance==='legendary').length;
  const major=State.achievements.filter(a=>a.importance==='major').length;
  const normal=State.achievements.filter(a=>a.importance==='normal'||!a.importance).length;

  el.innerHTML=`
    <div class="ach-stats-row reveal-item">
      <div class="glass-card ach-stat-card ach-legendary">
        <div class="ach-stat-icon">🔥</div>
        <div class="ach-stat-num">${legendary}</div>
        <div class="ach-stat-label">أسطوري</div>
      </div>
      <div class="glass-card ach-stat-card ach-major">
        <div class="ach-stat-icon">🌟</div>
        <div class="ach-stat-num">${major}</div>
        <div class="ach-stat-label">مهم</div>
      </div>
      <div class="glass-card ach-stat-card ach-normal">
        <div class="ach-stat-icon">⭐</div>
        <div class="ach-stat-num">${normal}</div>
        <div class="ach-stat-label">عادي</div>
      </div>
      <div class="glass-card ach-stat-card ach-total">
        <div class="ach-stat-icon">🏆</div>
        <div class="ach-stat-num">${State.achievements.length}</div>
        <div class="ach-stat-label">الإجمالي</div>
      </div>
    </div>
    <div class="ach-controls reveal-item">
      <div class="search-wrap" style="position:relative;flex:1;min-width:180px">
        <svg viewBox="0 0 24 24" fill="none" width="16" height="16" style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--text-3)"><circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="1.8"/><path d="M21 21l-4.35-4.35" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
        <input class="form-input" id="ach-search-input" placeholder="بحث في الإنجازات…" value="${Utils.esc(State.achSearch)}" style="padding-left:38px">
      </div>
      <div class="ach-filters">
        <button class="ch-filter-btn${State.achFilter==='all'?' active':''}" data-achfilter="all">الكل</button>
        ${Object.entries(ACH_CAT_LABELS).map(([k,v])=>`<button class="ch-filter-btn${State.achFilter===k?' active':''}" data-achfilter="${k}">${v}</button>`).join('')}
      </div>
    </div>
    ${achs.length===0?`<div class="ach-empty reveal-item"><div class="ach-empty-icon">🏆</div><p>${search||State.achFilter!=='all'?'لا توجد إنجازات تطابق بحثك.':'لا توجد إنجازات بعد. ابدأ الاحتفال بانتصاراتك!'}</p></div>`:''}
    <div class="ach-grid">
      ${achs.map(a=>{
        const importanceClass=`ach-${a.importance||'normal'}`;
        return `<div class="glass-card ach-card card-interactive reveal-item ${importanceClass}" style="--ach-color:${a.color||'#fbbf24'}">
          <div class="ach-card-top">
            <div class="ach-card-icon" style="background:${a.color||'#fbbf24'}22;border-color:${a.color||'#fbbf24'}44">${Utils.esc(a.icon||'🏆')}</div>
            <div class="ach-card-importance">${ACH_IMPORTANCE_LABELS[a.importance||'normal']}</div>
          </div>
          <div class="ach-card-title">${Utils.esc(a.title)}</div>
          ${a.description?`<div class="ach-card-desc">${Utils.esc(a.description)}</div>`:''}
          <div class="ach-card-footer">
            <span class="ach-card-date">${Utils.formatShort(a.date)}</span>
            <span class="ach-card-cat">${ACH_CAT_LABELS[a.category]||a.category||''}</span>
            <div class="ach-card-actions">
              <button class="task-action-btn" data-achedit="${Utils.esc(a.id)}" title="تعديل">
                <svg viewBox="0 0 24 24" fill="none" width="14" height="14"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
              </button>
              <button class="task-action-btn task-delete-btn" data-achdelete="${Utils.esc(a.id)}" title="حذف">
                <svg viewBox="0 0 24 24" fill="none" width="14" height="14"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
            </div>
          </div>
        </div>`;
      }).join('')}
    </div>
  `;
  Utils.el('ach-search-input')?.addEventListener('input',ev=>{ State.achSearch=ev.target.value; renderAchievements(); });
  UIEnhancer.observeNewItems(el);
}

const AchievementModal = {
  open(id=null) {
    const overlay=Utils.el('ach-modal-overlay');
    Utils.el('ach-modal-title').textContent=id?'تعديل الإنجاز':'إضافة إنجاز';
    Utils.el('ach-edit-id').value=id||'';
    // بناء منتقي الأيقونات والألوان
    const ig=Utils.el('ach-icon-grid');
    if(ig) ig.innerHTML=ACH_ICON_PRESETS.map(i=>`<button type="button" class="icon-preset-btn" data-achicon="${i}">${i}</button>`).join('');
    const cs=Utils.el('ach-color-swatches');
    if(cs) cs.innerHTML=COLOR_PRESETS.map(c=>`<button type="button" class="color-swatch" data-achcolor="${c}" style="background:${c}" title="${c}"></button>`).join('');
    if(id){
      const a=State.achievements.find(x=>x.id===id); if(!a) return;
      Utils.el('ach-title-input').value=a.title||'';
      Utils.el('ach-desc-input').value=a.description||'';
      Utils.el('ach-date-input').value=a.date||Utils.today();
      Utils.el('ach-category-input').value=a.category||'health';
      Utils.el('ach-icon-input').value=a.icon||'🏆';
      Utils.el('ach-color-input').value=a.color||'#fbbf24';
      overlay.querySelectorAll('input[name="ach-importance"]').forEach(r=>r.checked=(r.value===(a.importance||'normal')));
    } else {
      Utils.el('ach-title-input').value='';
      Utils.el('ach-desc-input').value='';
      Utils.el('ach-date-input').value=Utils.today();
      Utils.el('ach-category-input').value='health';
      Utils.el('ach-icon-input').value='🏆';
      Utils.el('ach-color-input').value='#fbbf24';
      overlay.querySelectorAll('input[name="ach-importance"]').forEach(r=>r.checked=(r.value==='normal'));
    }
    overlay.classList.add('open');
    Utils.el('ach-title-input').focus();
  },
  close() { Utils.el('ach-modal-overlay').classList.remove('open'); },
  save() {
    const title=Utils.el('ach-title-input').value.trim();
    if(!title){ showToast('عنوان الإنجاز مطلوب.','error'); return; }
    const id=Utils.el('ach-edit-id').value;
    const importance=Utils.qs('input[name="ach-importance"]:checked')?.value||'normal';
    const ach={
      id:          id||Utils.uid(),
      title,
      description: Utils.el('ach-desc-input').value.trim(),
      date:        Utils.el('ach-date-input').value||Utils.today(),
      category:    Utils.el('ach-category-input').value||'other',
      importance,
      icon:        Utils.el('ach-icon-input').value||'🏆',
      color:       Utils.el('ach-color-input').value||'#fbbf24',
      createdAt:   new Date().toISOString(),
    };
    if(id){
      const idx=State.achievements.findIndex(x=>x.id===id);
      if(idx>=0) State.achievements[idx]={...State.achievements[idx],...ach};
    } else {
      State.achievements.unshift(ach);
    }
    Storage.saveAchievements(State.achievements);
    this.close();
    renderAchievements();
    showToast('تم حفظ الإنجاز! 🏆','success');
  },
};

document.addEventListener('click',e=>{
  if(e.target.closest('#add-achievement-btn')) AchievementModal.open();
  if(e.target.closest('#ach-modal-save'))   AchievementModal.save();
  if(e.target.closest('#ach-modal-cancel')||e.target.closest('#ach-modal-close')) AchievementModal.close();
  if(e.target===Utils.el('ach-modal-overlay')) AchievementModal.close();

  const aEdit=e.target.closest('[data-achedit]');
  if(aEdit) AchievementModal.open(aEdit.dataset.achedit);

  const aDel=e.target.closest('[data-achdelete]');
  if(aDel){
    showConfirm({title:'حذف الإنجاز',body:'هل تريد إزالة هذا الإنجاز؟',okLabel:'حذف',isDanger:true,onOk:()=>{
      State.achievements=State.achievements.filter(a=>a.id!==aDel.dataset.achdelete);
      Storage.saveAchievements(State.achievements);
      renderAchievements(); showToast('تم حذف الإنجاز.','success');
    }});
  }
  const af=e.target.closest('[data-achfilter]');
  if(af){ State.achFilter=af.dataset.achfilter; renderAchievements(); }

  const ai=e.target.closest('[data-achicon]');
  if(ai){ const inp=Utils.el('ach-icon-input'); if(inp) inp.value=ai.dataset.achicon; }
  const ac=e.target.closest('[data-achcolor]');
  if(ac){ const inp=Utils.el('ach-color-input'); if(inp) inp.value=ac.dataset.achcolor; }
});

/* ══════════════════════════════════════════
   وحدة التقويم
══════════════════════════════════════════ */

function renderCalendarLegacy() {
  const el=Utils.el('calendar-content'); if(!el) return;
  const y=State.calYear, m=State.calMonth;
  const label=Utils.el('cal-month-label');
  if(label) label.textContent=new Date(y,m,1).toLocaleDateString('ar',{month:'long',year:'numeric'});

  const dates=Utils.monthDates(y,m);
  const records=Storage.getRecords();
  const tasksDone=Storage.getTasksDone();

  // رأس الأسبوع
  const weekDays=['أحد','إث','ثل','أر','خم','جم','سب'];
  const firstDay=new Date(y,m,1).getDay();

  // بناء خريطة اكتمال العادات
  const habits=State.habits.filter(h=>h.enabled!==false);

  el.innerHTML=`
    <div class="cal-legend reveal-item">
      <span class="cal-legend-item"><span class="cal-dot cal-dot-great"></span>يوم ممتاز (≥80%)</span>
      <span class="cal-legend-item"><span class="cal-dot cal-dot-good"></span>يوم جيد (60-79%)</span>
      <span class="cal-legend-item"><span class="cal-dot cal-dot-mid"></span>متوسط (50-59%)</span>
      <span class="cal-legend-item"><span class="cal-dot cal-dot-low"></span>منخفض (&lt;50%)</span>
      <span class="cal-legend-item"><span class="cal-dot cal-dot-missed"></span>لا يوجد تسجيل</span>
    </div>
    <div class="cal-grid-wrap reveal-item">
      <div class="cal-grid">
        ${weekDays.map(d=>`<div class="cal-day-hdr">${d}</div>`).join('')}
        ${Array.from({length:firstDay},()=>`<div class="cal-cell cal-cell-empty"></div>`).join('')}
        ${dates.map(date=>{
          const rec=records[date]||{};
          const total=habits.length;
          let completed=0;
          habits.forEach(h=>{
            const v=rec[h.id];
            if(h.type==='boolean'&&v===true) completed++;
            else if(h.type==='rating'&&v>=1) completed++;
          });
          const pct=total>0?Math.round((completed/total)*100):0;
          const hasEntry=Object.keys(rec).length>0;
          const isToday=date===Utils.today();
          const isFuture=date>Utils.today();
          let dotClass='cal-dot-missed';
          let cellTierClass='';
          if(!isFuture&&hasEntry){
            if(pct>=80)      { dotClass='cal-dot-great'; cellTierClass='cal-cell-great'; }
            else if(pct>=60) { dotClass='cal-dot-good';  cellTierClass='cal-cell-good';  }
            else if(pct>=50) { dotClass='cal-dot-mid';   cellTierClass='cal-cell-mid';   }
            else             { dotClass='cal-dot-low';   cellTierClass='cal-cell-low';   }
          }
          const tasks=getTasksForDate(date);
          const doneTasks=(tasksDone[date]||[]).length;
          const d=parseInt(date.split('-')[2]);
          const hasJournal=State.journal.some(j=>j.date===date);
          const hasAch=State.achievements.some(a=>a.date===date);
          return `<button class="cal-cell${isToday?' cal-today':''}${isFuture?' cal-future':''} ${cellTierClass}" data-calday="${date}">
            <div class="cal-day-num">${d}</div>
            ${!isFuture&&hasEntry?`<div class="cal-day-pct-big">${pct}%</div>`:''}
            <div class="cal-day-dot-row">
              ${!isFuture&&tasks.length>0?`<span class="cal-dot cal-dot-task" title="المهام: ${doneTasks}/${tasks.length}"></span>`:''}
              ${hasJournal?`<span class="cal-dot cal-dot-journal" title="مذكرة"></span>`:''}
              ${hasAch?`<span class="cal-dot cal-dot-ach" title="إنجاز"></span>`:''}
            </div>
          </button>`;
        }).join('')}
      </div>
    </div>
  `;
  UIEnhancer.observeNewItems(el);
}

// التنقل في التقويم
document.addEventListener('click',e=>{
  if(e.target.closest('#cal-prev-btn')){
    State.calMonth--; if(State.calMonth<0){State.calMonth=11;State.calYear--;}
    renderCalendar();
  }
  if(e.target.closest('#cal-next-btn')){
    State.calMonth++; if(State.calMonth>11){State.calMonth=0;State.calYear++;}
    renderCalendar();
  }
  const calDay=e.target.closest('[data-calday]');
  if(calDay) openCalDayModal(calDay.dataset.calday);
});

function getCalendarDayDetails(date) {
  const habits=Compute.activeHabits();
  const stats=Compute.dayStats(date, habits);
  const tasks=getTasksForDate(date);
  const tasksDone=Storage.getTasksDone();
  const record=Storage.getDayRecord(date);
  const completedHabits=[];
  const incompleteHabits=[];
  habits.forEach(habit=>{
    const value=record[habit.id];
    const done=habit.type==='boolean' ? value===true : value!=null && value>0;
    if(done) completedHabits.push(habit);
    else incompleteHabits.push(habit);
  });
  const hasEntry=Object.keys(record).length>0;
  const hasJournal=State.journal.some(j=>j.date===date);
  const hasAchievement=State.achievements.some(a=>a.date===date);
  const tier=getCalendarTier(stats.pct, hasEntry);
  return {
    date,
    dayNumber:parseInt(date.split('-')[2],10),
    pct:stats.pct,
    total:stats.total,
    completed:stats.completed,
    hasEntry,
    isToday:date===Utils.today(),
    isFuture:date>Utils.today(),
    totalTasks:tasks.length,
    doneTasks:(tasksDone[date]||[]).length,
    showTaskDot:tasks.length>0,
    hasJournal,
    hasAchievement,
    completedHabits,
    incompleteHabits,
    tierClass:`cal-cell-${tier}`,
    tierFillClass:`cal-fill-${tier}`,
  };
}

function getCalendarTier(pct, hasEntry) {
  if(!hasEntry) return 'empty';
  if(pct>=100) return 'great';
  if(pct>=70) return 'good';
  if(pct>=40) return 'mid';
  return 'low';
}

function getCalendarMonthSummary(monthStats) {
  const recorded=monthStats.filter(day=>day.hasEntry && !day.isFuture);
  const avgPct=recorded.length ? Math.round(recorded.reduce((sum, day)=>sum+day.pct,0)/recorded.length) : 0;
  const perfectDays=recorded.filter(day=>day.pct===100).length;
  const bestDay=recorded.length ? [...recorded].sort((a,b)=>b.pct-a.pct || a.date.localeCompare(b.date))[0] : null;
  return { avgPct, recordedDays:recorded.length, perfectDays, bestDay };
}

function getCalendarSummaryMessage(pct) {
  if(pct>=100) return 'يوم مكتمل';
  if(pct>=70) return 'تقدم قوي';
  if(pct>=40) return 'تقدم جيد';
  if(pct>0) return 'بداية تحتاج دفعاً';
  return 'لم يبدأ بعد';
}

function renderCalendarDayPanel(day) {
  if(!day?.hasEntry){
    return `
      <div class="calendar-day-panel-head">
        <div>
          <div class="calendar-day-panel-title">ملخص اليوم</div>
          <div class="calendar-day-panel-date">${day?Utils.formatFull(day.date):'اختر يوماً من التقويم'}</div>
        </div>
      </div>
      <div class="calendar-day-empty">
        <div class="calendar-day-empty-title">لا توجد سجلات لهذا اليوم</div>
        <div class="calendar-day-empty-copy">سجّل عاداتك اليومية لتظهر هنا نسبة الإنجاز والعادات المكتملة.</div>
        <button class="btn-secondary" type="button" data-page="daily">الانتقال إلى تسجيل اليوم</button>
      </div>
    `;
  }

  const topCompleted=day.completedHabits.slice(0,3);
  const topIncomplete=day.incompleteHabits.slice(0,3);
  return `
    <div class="calendar-day-panel-head">
      <div>
        <div class="calendar-day-panel-title">ملخص اليوم</div>
        <div class="calendar-day-panel-date">${Utils.formatFull(day.date)}</div>
      </div>
      <div class="calendar-day-badge">${day.pct}%</div>
    </div>
    <div class="calendar-day-summary-row">
      <div class="calendar-day-summary-card">
        <span>العادات المكتملة</span>
        <strong>${day.completed} من ${day.total}</strong>
      </div>
      <div class="calendar-day-summary-card">
        <span>حالة اليوم</span>
        <strong>${getCalendarSummaryMessage(day.pct)}</strong>
      </div>
    </div>
    <div class="calendar-day-list-block">
      <div class="calendar-day-list-title">أفضل 3 عادات مكتملة</div>
      ${topCompleted.length ? `<div class="calendar-day-chip-list">${topCompleted.map(h=>`<span class="calendar-day-chip is-done">${Utils.esc(h.name)}</span>`).join('')}</div>` : `<div class="calendar-day-list-empty">لا توجد عادات مكتملة في هذا اليوم.</div>`}
    </div>
    <div class="calendar-day-list-block">
      <div class="calendar-day-list-title">عادات غير مكتملة</div>
      ${topIncomplete.length ? `<div class="calendar-day-chip-list">${topIncomplete.map(h=>`<span class="calendar-day-chip">${Utils.esc(h.name)}</span>`).join('')}</div>` : `<div class="calendar-day-list-empty">رائع، كل العادات المكتوبة لهذا اليوم مكتملة.</div>`}
    </div>
    <div class="calendar-day-meta">
      <span>مهام اليوم: ${day.doneTasks}/${day.totalTasks}</span>
      <span>${day.hasJournal?'توجد مذكرة':'لا توجد مذكرة'}</span>
      <span>${day.hasAchievement?'يوجد إنجاز':'لا يوجد إنجاز'}</span>
    </div>
    <button class="btn-primary calendar-day-open-btn" type="button" id="cal-open-daily-btn" data-date="${day.date}">فتح تسجيل اليوم</button>
  `;
}

function renderCalendar() {
  const el=Utils.el('calendar-content'); if(!el) return;
  const y=State.calYear, m=State.calMonth;
  const label=Utils.el('cal-month-label');
  const monthLabel=new Date(y,m,1).toLocaleDateString('ar',{month:'long',year:'numeric'});
  if(label) label.textContent=monthLabel;

  const dates=Utils.monthDates(y,m);
  const today=Utils.today();
  const weekDays=['أحد','إث','ثل','أر','خم','جم','سب'];
  const firstDay=new Date(y,m,1).getDay();
  const monthStats=dates.map(date=>getCalendarDayDetails(date));
  const selectedFallback=monthStats.find(day=>day.date===today)?.date || monthStats.find(day=>day.hasEntry)?.date || dates[0];
  if(!dates.includes(State.calSelectedDate)) State.calSelectedDate=selectedFallback;
  const selectedDay=getCalendarDayDetails(State.calSelectedDate || selectedFallback);
  const summary=getCalendarMonthSummary(monthStats);
  const hasMonthEntries=summary.recordedDays>0;

  el.innerHTML=`
    <section class="calendar-hero card reveal-item">
      <div>
        <div class="calendar-hero-title">التقويم</div>
        <div class="calendar-hero-copy">راقب تقدمك يوماً بعد يوم وشاهد كيف تتشكل عاداتك عبر الشهر.</div>
      </div>
      <div class="calendar-hero-controls">
        <button class="btn-ghost cal-nav-btn" id="cal-prev-btn">السابق</button>
        <div class="calendar-hero-month">${monthLabel}</div>
        <button class="btn-ghost cal-nav-btn" id="cal-next-btn">التالي</button>
        <button class="btn-secondary cal-today-btn" id="cal-today-btn">اليوم</button>
      </div>
    </section>

    <section class="calendar-stats-grid reveal-item">
      <article class="calendar-stat-card card">
        <span class="calendar-stat-label">متوسط الشهر</span>
        <strong class="calendar-stat-value">${summary.avgPct}%</strong>
        <span class="calendar-stat-hint">متوسط الإنجاز في الأيام المسجّلة</span>
      </article>
      <article class="calendar-stat-card card">
        <span class="calendar-stat-label">أيام فيها تسجيل</span>
        <strong class="calendar-stat-value">${summary.recordedDays}</strong>
        <span class="calendar-stat-hint">من أصل ${dates.length} يوماً في هذا الشهر</span>
      </article>
      <article class="calendar-stat-card card">
        <span class="calendar-stat-label">أيام مكتملة</span>
        <strong class="calendar-stat-value">${summary.perfectDays}</strong>
        <span class="calendar-stat-hint">أيام وصلت إلى 100%</span>
      </article>
      <article class="calendar-stat-card card">
        <span class="calendar-stat-label">أفضل يوم</span>
        <strong class="calendar-stat-value">${summary.bestDay?`${summary.bestDay.pct}%`:'0%'}</strong>
        <span class="calendar-stat-hint">${summary.bestDay?Utils.formatShort(summary.bestDay.date):'لا توجد بيانات بعد'}</span>
      </article>
    </section>

    <div class="cal-legend reveal-item">
      <span class="cal-legend-item"><span class="cal-dot cal-dot-missed"></span>لا توجد بيانات</span>
      <span class="cal-legend-item"><span class="cal-dot cal-dot-low"></span>1% - 39%</span>
      <span class="cal-legend-item"><span class="cal-dot cal-dot-mid"></span>40% - 69%</span>
      <span class="cal-legend-item"><span class="cal-dot cal-dot-good"></span>70% - 99%</span>
      <span class="cal-legend-item"><span class="cal-dot cal-dot-great"></span>100%</span>
    </div>

    <div class="calendar-layout reveal-item">
      <section class="calendar-board card">
        <div class="cal-grid-wrap">
          <div class="cal-grid">
            ${weekDays.map(d=>`<div class="cal-day-hdr">${d}</div>`).join('')}
            ${Array.from({length:firstDay},()=>`<div class="cal-cell cal-cell-empty"></div>`).join('')}
            ${monthStats.map(day=>{
              const isSelected=day.date===selectedDay.date;
              return `<button class="cal-cell ${day.tierClass}${day.isToday?' cal-today':''}${day.isFuture?' cal-future':''}${isSelected?' cal-selected':''}" data-calday-panel="${day.date}" ${day.isFuture?'disabled':''}>
                <div class="cal-day-top">
                  <div class="cal-day-num">${day.dayNumber}</div>
                  ${day.hasEntry && !day.isFuture ? `<div class="cal-day-pct-big">${day.pct}%</div>` : `<div class="cal-day-pct-empty">—</div>`}
                </div>
                <div class="cal-day-indicator"><span class="cal-day-indicator-fill ${day.tierFillClass}" style="width:${day.hasEntry && !day.isFuture ? Math.max(day.pct,8) : 10}%"></span></div>
                <div class="cal-day-dot-row">
                  ${day.showTaskDot?`<span class="cal-dot cal-dot-task" title="المهام: ${day.doneTasks}/${day.totalTasks}"></span>`:''}
                  ${day.hasJournal?`<span class="cal-dot cal-dot-journal" title="مذكرة"></span>`:''}
                  ${day.hasAchievement?`<span class="cal-dot cal-dot-ach" title="إنجاز"></span>`:''}
                </div>
              </button>`;
            }).join('')}
          </div>
        </div>
        ${hasMonthEntries ? '' : `
          <div class="calendar-empty-state">
            <div class="calendar-empty-title">لا توجد سجلات في هذا الشهر بعد</div>
            <div class="calendar-empty-copy">ابدأ بتسجيل عاداتك اليوم لتظهر هنا بصورة أوضح عبر الأيام.</div>
            <button class="btn-primary" type="button" data-page="daily">الانتقال إلى تسجيل اليوم</button>
          </div>
        `}
      </section>

      <aside class="calendar-day-panel card" id="calendar-day-panel">
        ${renderCalendarDayPanel(selectedDay)}
      </aside>
    </div>
  `;
  UIEnhancer.observeNewItems(el);
}

document.addEventListener('click',e=>{
  if(e.target.closest('#cal-today-btn')){
    const now=new Date();
    State.calYear=now.getFullYear();
    State.calMonth=now.getMonth();
    State.calSelectedDate=Utils.today();
    renderCalendar();
  }
  const calDay=e.target.closest('[data-calday-panel]');
  if(calDay && !calDay.disabled){
    e.preventDefault();
    State.calSelectedDate=calDay.dataset.caldayPanel;
    // تحديث التمييز البصري فقط بدون إعادة رندر كاملة
    const calContent=Utils.el('calendar-content');
    if(calContent) Utils.qsa('[data-calday-panel]',calContent).forEach(btn=>btn.classList.remove('cal-selected'));
    calDay.classList.add('cal-selected');
    // تحديث لوحة ملخص اليوم فقط عبر ID
    const panel=Utils.el('calendar-day-panel');
    if(panel){
      panel.innerHTML=renderCalendarDayPanel(getCalendarDayDetails(State.calSelectedDate));
    } else {
      renderCalendar();
    }
  }
  const openDailyBtn=e.target.closest('#cal-open-daily-btn');
  if(openDailyBtn){
    const date=openDailyBtn.dataset.date || Utils.today();
    State.dailyDate=date;
    const dp=Utils.el('daily-date-picker');
    if(dp) dp.value=date;
    navigate('daily');
  }
});

function openCalDayModal(date) {
  const overlay=Utils.el('cal-day-overlay');
  const card=Utils.el('cal-day-card');
  const habits=State.habits.filter(h=>h.enabled!==false);
  const rec=Storage.getDayRecord(date);
  const note=Storage.getDayNote(date);
  const tasks=getTasksForDate(date);
  const tasksDone=Storage.getTasksDone();
  const doneTasks=tasksDone[date]||[];
  const journalEntry=State.journal.find(j=>j.date===date);
  const achs=State.achievements.filter(a=>a.date===date);

  let completed=0;
  const habitRows=habits.map(h=>{
    const v=rec[h.id];
    const cat=State.categories.find(c=>c.id===h.categoryId);
    const color=cat?.color||'#a78bfa';
    let status='—', statusClass='cal-habit-miss';
    if(h.type==='boolean'&&v===true){status='✓';statusClass='cal-habit-done';completed++;}
    else if(h.type==='rating'&&v>=1){status=`${v}/10`;statusClass='cal-habit-done';completed++;}
    return `<div class="cal-habit-row"><span class="cal-habit-dot" style="background:${color}"></span><span class="cal-habit-name">${Utils.esc(h.name)}</span><span class="cal-habit-status ${statusClass}">${status}</span></div>`;
  }).join('');

  const pct=habits.length?Math.round((completed/habits.length)*100):0;

  card.innerHTML=`
    <div class="modal-header">
      <h2 class="modal-title">${Utils.formatFull(date)}</h2>
      <button class="modal-close" id="cal-day-close">
        <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      </button>
    </div>
    <div class="modal-body cal-day-body">
      <div class="cal-day-section">
        <div class="cal-day-section-title">📊 تقدم العادات — ${pct}%</div>
        <div class="cal-day-habits">${habitRows||'<span style="color:var(--text-3)">لا توجد عادات مسجلة.</span>'}</div>
      </div>
      ${tasks.length?`<div class="cal-day-section">
        <div class="cal-day-section-title">✅ المهام (${doneTasks.length}/${tasks.length})</div>
        ${tasks.map(t=>`<div class="cal-habit-row">
          <span style="color:${doneTasks.includes(t.id||t.title)?'var(--success)':'var(--text-3)'}">${doneTasks.includes(t.id||t.title)?'✓':'○'}</span>
          <span class="cal-habit-name">${Utils.esc(t.title)}</span>
        </div>`).join('')}
      </div>`:''}
      ${journalEntry?`<div class="cal-day-section">
        <div class="cal-day-section-title">📖 المذكرة${journalEntry.mood?` — ${MOOD_LABELS[journalEntry.mood]||''}`:''}</div>
        ${journalEntry.title?`<div style="font-weight:600;margin-bottom:4px">${Utils.esc(journalEntry.title)}</div>`:''}
        <div style="color:var(--text-2);font-size:13px">${Utils.esc((journalEntry.body||'').slice(0,200))}${(journalEntry.body||'').length>200?'…':''}</div>
      </div>`:''}
      ${achs.length?`<div class="cal-day-section">
        <div class="cal-day-section-title">🏆 الإنجازات</div>
        ${achs.map(a=>`<div class="cal-habit-row"><span>${Utils.esc(a.icon||'🏆')}</span><span class="cal-habit-name">${Utils.esc(a.title)}</span></div>`).join('')}
      </div>`:''}
      ${note?`<div class="cal-day-section">
        <div class="cal-day-section-title">📝 ملاحظة اليوم</div>
        <div style="color:var(--text-2);font-size:13px">${Utils.esc(note)}</div>
      </div>`:''}
    </div>
    <div class="modal-footer">
      <button class="btn-ghost" id="cal-go-daily-btn" data-date="${date}">فتح تسجيل اليوم</button>
      <button class="btn-primary" id="cal-day-close2">إغلاق</button>
    </div>
  `;
  overlay.classList.add('open');

  Utils.el('cal-day-close')?.addEventListener('click',()=>overlay.classList.remove('open'));
  Utils.el('cal-day-close2')?.addEventListener('click',()=>overlay.classList.remove('open'));
  Utils.el('cal-go-daily-btn')?.addEventListener('click',()=>{
    overlay.classList.remove('open');
    State.dailyDate=date;
    const dp=Utils.el('daily-date-picker');
    if(dp) dp.value=date;
    navigate('daily');
  });
}

document.addEventListener('click',e=>{
  if(e.target===Utils.el('cal-day-overlay')) Utils.el('cal-day-overlay').classList.remove('open');
});

/* ══════════════════════════════════════════
   تحسين لوحة التحكم (ملخص الوحدات الجديدة)
══════════════════════════════════════════ */

// دمج الوحدات الجديدة في لوحة التحكم

/* ──────────────────────────────────────────────
   Space Parallax — matches reference space-theme
   Updates --mx / --my CSS vars on mouse move
────────────────────────────────────────────── */
(function initParallax() {
  if (window.matchMedia('(hover: none)').matches) return; // skip on touch
  let rafId = null;
  let tx = 0, ty = 0;
  document.addEventListener('mousemove', e => {
    tx = (e.clientX / window.innerWidth  - 0.5);
    ty = (e.clientY / window.innerHeight - 0.5);
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      document.documentElement.style.setProperty('--mx', tx.toFixed(4));
      document.documentElement.style.setProperty('--my', ty.toFixed(4));
      rafId = null;
    });
  });
})();
