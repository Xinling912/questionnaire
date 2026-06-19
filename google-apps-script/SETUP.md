# Google Sheet Backend Setup

This setup stores questionnaire responses in Google Sheet rows. The frontend sends JSON. Apps Script flattens that JSON into spreadsheet columns, so the sheet can be exported as CSV.

## Steps

1. Create a new Google Sheet.
2. Rename it if useful, for example `AI Programming Questionnaire Responses`.
3. In the sheet, open `Extensions` -> `Apps Script`.
4. Delete the default code and paste the contents of `Code.gs`.
5. Click `Save`.
6. Click `Deploy` -> `New deployment`.
7. Select type: `Web app`.
8. Set:
   - Execute as: `Me`
   - Who has access: `Anyone`
9. Click `Deploy`.
10. Copy the Web app URL.
11. In `app.js`, replace:

```js
const SUBMISSION_ENDPOINT = "";
```

with:

```js
const SUBMISSION_ENDPOINT = "PASTE_YOUR_WEB_APP_URL_HERE";
```

## Data Format

The browser submits JSON. Apps Script writes one row per respondent.

Likert items such as `C1.1`, `C1.2`, `C2.1` become individual columns.

Multiple-choice answers are stored in one cell separated by `; `. Other text is stored in columns such as `A5_other_text`.

## Export CSV

Open the Google Sheet and choose `File` -> `Download` -> `Comma-separated values (.csv)`.

