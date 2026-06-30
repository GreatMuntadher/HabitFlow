/*
  HabitFlow Google Apps Script backup endpoint

  Setup:
  1. Create a new Google Apps Script project bound to a Google account.
  2. Open Project Settings > Script Properties.
  3. Add:
     BACKUP_SECRET = your-secret-token
  4. Paste this file into Apps Script.
  5. Run setupDailyTrigger() once manually to create the daily snapshot trigger.
  6. Deploy as Web App:
     - Execute as: Me
     - Who has access: Anyone with the link (or your preferred scope)
*/

const SHEET_LATEST = 'Latest_Backup';
const SHEET_LOG = 'Sync_Log';
const SHEET_SNAPSHOTS = 'Daily_Snapshots';

function doPost(e) {
  try {
    const body = parseRequestBody_(e);
    if (body.action !== 'saveBackup') {
      return jsonResponse_({ success:false, error:'Unsupported action.' });
    }

    verifyToken(body.token);
    const result = saveBackup(body.payload);
    return jsonResponse_({ success:true, message:'Backup saved successfully.', data:result });
  } catch (err) {
    logSync_('error', err.message || 'Unknown error', 0, 'apps-script');
    return jsonResponse_({ success:false, error:err.message || 'Unknown error' });
  }
}

function saveBackup(payload) {
  if (!payload || payload.appName !== 'HabitFlow' || !payload.data) {
    throw new Error('Invalid HabitFlow payload.');
  }

  const latestSheet = getOrCreateSheet(SHEET_LATEST, [
    'updatedAt',
    'appName',
    'backupVersion',
    'appVersion',
    'payloadJson'
  ]);
  const payloadJson = JSON.stringify(payload);
  const size = payloadJson.length;
  latestSheet.clearContents();
  latestSheet.getRange(1, 1, 1, 5).setValues([[
    'updatedAt',
    'appName',
    'backupVersion',
    'appVersion',
    'payloadJson'
  ]]);
  latestSheet.getRange(2, 1, 1, 5).setValues([[
    new Date().toISOString(),
    payload.appName,
    payload.backupVersion,
    payload.appVersion || 'local',
    payloadJson
  ]]);

  logSync_('success', 'Backup received', size, payload.source || 'web-app');
  return { payloadSize:size };
}

function dailySnapshot() {
  const latestSheet = getOrCreateSheet(SHEET_LATEST, [
    'updatedAt',
    'appName',
    'backupVersion',
    'appVersion',
    'payloadJson'
  ]);
  const snapshotsSheet = getOrCreateSheet(SHEET_SNAPSHOTS, [
    'snapshotDate',
    'createdAt',
    'payloadJson',
    'payloadSize'
  ]);

  if (latestSheet.getLastRow() < 2) {
    logSync_('error', 'No latest backup available for snapshot.', 0, 'daily-snapshot');
    return;
  }

  const row = latestSheet.getRange(2, 1, 1, 5).getValues()[0];
  const payloadJson = row[4];
  if (!payloadJson) {
    logSync_('error', 'Latest backup row is empty.', 0, 'daily-snapshot');
    return;
  }

  const timezone = Session.getScriptTimeZone();
  snapshotsSheet.appendRow([
    Utilities.formatDate(new Date(), timezone, 'yyyy-MM-dd'),
    new Date().toISOString(),
    payloadJson,
    payloadJson.length
  ]);
  logSync_('success', 'Daily snapshot created.', payloadJson.length, 'daily-snapshot');
}

function setupDailyTrigger() {
  ScriptApp.getProjectTriggers()
    .filter(trigger => trigger.getHandlerFunction() === 'dailySnapshot')
    .forEach(trigger => ScriptApp.deleteTrigger(trigger));

  ScriptApp.newTrigger('dailySnapshot')
    .timeBased()
    .everyDays(1)
    .atHour(3)
    .create();
}

function verifyToken(token) {
  const secret = PropertiesService.getScriptProperties().getProperty('BACKUP_SECRET');
  if (!secret) {
    throw new Error('BACKUP_SECRET is not configured in Script Properties.');
  }
  if (!token || token !== secret) {
    throw new Error('Invalid secret token.');
  }
  return true;
}

function getOrCreateSheet(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  if (sheet.getLastRow() === 0 && headers && headers.length) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function logSync_(status, message, payloadSize, source) {
  const logSheet = getOrCreateSheet(SHEET_LOG, [
    'timestamp',
    'status',
    'message',
    'payloadSize',
    'source'
  ]);
  logSheet.appendRow([
    new Date().toISOString(),
    status,
    message,
    payloadSize || 0,
    source || 'unknown'
  ]);
}

function parseRequestBody_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error('Empty request body.');
  }
  return JSON.parse(e.postData.contents);
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
