# AI Programming Learning Questionnaire

This is a static frontend prototype for the questionnaire in `问卷2.1.docx`, styled after the provided PDF sample.

## Preview

Open `index.html` directly in a browser, or serve this folder with any static server.

## Anonymous Browser Preview

This branch runs as an anonymous browser-only questionnaire. It does not log in, identify respondents, save browser progress, or submit responses to a server.

Start a local static server:

```bash
npm start
```

Then open `http://127.0.0.1:8080`.

## Current Frontend Logic

- Each question page must be completed before the respondent can continue.
- There is no back button.
- A4, A5, A7, A8, and A9 end the questionnaire when the respondent selects a none/never option.
- Multiple-choice none/never options are exclusive.
- Each Likert table is shown as one page.
- English text appears first and Chinese text starts on a new line.
- Explanation text boxes stay on the same page as their corresponding table.
- Current submission behavior downloads an anonymous JSON file in the respondent's browser.

## Backend Collection Options

Recommended choice for this project:

1. Google Sheets via Apps Script
   - The browser submits JSON.
   - Apps Script receives the JSON and writes one row into Google Sheet.
   - Google Sheet can be exported as CSV for analysis.
   - Setup instructions are in `google-apps-script/SETUP.md`.

Other choices:

2. Supabase
   - Best if you want a real database without much server setup.
   - Supports CSV export, authentication, and row-level security.
   - Good balance for academic study data.

3. Custom API plus PostgreSQL
   - Best for stricter control, audit logs, and larger deployment.
   - More setup and maintenance.

The frontend submission point is `downloadResponses()` in `app.js`. Keep it browser-only if the study must not collect server-side identifiers such as IP addresses.

## Online Deployment Options

Recommended choices:

1. Netlify or Vercel
   - Best for quick public deployment.
   - Drag-and-drop or Git-based deploy.
   - Works well for this static frontend.

2. GitHub Pages
   - Free and simple for static hosting.
   - Good if the repository can be public or your organization supports private Pages.

3. University server
   - Best if ethics/data governance requires institutional hosting.
   - Usually needs coordination with IT.
