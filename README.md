# HabitFlow — لوحة الحياة

HabitFlow هو تطبيق ويب شخصي مبني بـ `Vanilla JS + CSS` لتتبع العادات والمهام والتحديات والمذكرات والإنجازات، مع دعم PWA والعمل المحلي بدون خادم خلفي.

## Current Stable Version

`stable-after-login-settings-cleanup-v21`

## Current State

- 13 صفحة أساسية للمستخدم
- صفحة `login` مستقلة
- صفحة `settings` مبسطة ونظيفة
- توجد صفحة `admin` داخلية في الكود لكنها غير مفعلة للمستخدم العادي افتراضياً
- البيانات محفوظة حالياً في `localStorage` فقط
- Firebase مستخدم للمصادقة فقط عبر Google Sign-In
- لا توجد مزامنة سحابية تلقائية حالياً
- Cloud Sync مؤجل لمرحلة لاحقة
- Service Worker الحالي: `habitflow-v22`

## Main Pages

`dashboard` / `daily` / `tasks` / `calendar` / `challenges` / `timeline` / `achievements` / `journal` / `categories` / `reports` / `manage` / `settings` / `login`

## Run

يمكن فتح `index.html` مباشرة، لكن للحصول على تجربة PWA كاملة يفضَّل تشغيله عبر local server مثل:

```bash
npx serve .
```

## Notes

- المصادقة عبر Firebase Auth فقط
- الحفظ المحلي هو المصدر الأساسي للبيانات حالياً
- النسخ الاحتياطي/الاستيراد ما زالا محليين، والمزامنة السحابية ليست مفعلة بعد
- توثيق النسخ الاحتياطي موجود في [docs/BACKUP_AND_SYNC.md](docs/BACKUP_AND_SYNC.md)
