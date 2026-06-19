const SHEET_NAME = "Responses";

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const row = flattenPayload(payload);
    const sheet = getResponseSheet(Object.keys(row));
    appendRow(sheet, row);
    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error) });
  }
}

function flattenPayload(payload) {
  const output = {
    submittedAt: payload.submittedAt || new Date().toISOString(),
    endedEarly: payload.endedEarly === true,
    endReason: payload.endReason || "",
  };

  const answers = payload.answers || {};
  Object.keys(answers).forEach((questionId) => {
    const answer = answers[questionId] || {};

    if (Array.isArray(answer.value)) {
      output[questionId] = answer.value.join("; ");
    } else if (answer.value !== undefined) {
      output[questionId] = answer.value;
    }

    if (answer.other) {
      Object.keys(answer.other).forEach((key) => {
        output[`${questionId}_${key}_text`] = answer.other[key];
      });
    }

    if (answer.values) {
      Object.keys(answer.values).forEach((itemId) => {
        output[itemId] = answer.values[itemId];
      });
    }

    if (answer.explanation) {
      output[`${questionId}_explanation`] = answer.explanation;
    }
  });

  return output;
}

function getResponseSheet(newKeys) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  const existingHeader = getHeader(sheet);
  const allKeys = mergeHeaders(existingHeader, newKeys);
  if (allKeys.length !== existingHeader.length) {
    sheet.getRange(1, 1, 1, allKeys.length).setValues([allKeys]);
  }
  return sheet;
}

function appendRow(sheet, rowObject) {
  const header = getHeader(sheet);
  const row = header.map((key) => rowObject[key] === undefined ? "" : rowObject[key]);
  sheet.appendRow(row);
}

function getHeader(sheet) {
  const lastColumn = sheet.getLastColumn();
  if (lastColumn === 0) return [];
  return sheet.getRange(1, 1, 1, lastColumn).getValues()[0].filter(String);
}

function mergeHeaders(existingHeader, newKeys) {
  const preferred = [
    "submittedAt",
    "endedEarly",
    "endReason",
    "consent",
    "A1",
    "A2",
    "A3",
    "A3_other_text",
    "A4",
    "A5",
    "A5_other_text",
    "A6",
    "A6_other_text",
    "A7",
    "A7_other_text",
    "A8",
    "A9",
  ];
  const merged = [];
  preferred.concat(existingHeader, newKeys).forEach((key) => {
    if (key && merged.indexOf(key) === -1) merged.push(key);
  });
  return merged;
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
