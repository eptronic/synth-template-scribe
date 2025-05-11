
# Product Requirements Document (PRD)

## 1. Purpose
Build a micro‑web‑app that turns any CC chart into a Novation SL MkIII template .syx file in one click. The app eliminates manual editing inside Components.

## 2. Primary User Story
As an SL MkIII owner, I want to paste or upload a CC table for a synth/effect and instantly download a valid .syx template so I can drag it into Novation Components and send it to my keyboard.

## 3. Core Features
|#|Feature|Acceptance Criteria|
|---|---|---|
|F1|Upload / Paste CC Chart|User can: (a) paste plain text, or (b) upload a PDF/manual.|
|F2|Name Field|Free‑text field populates template name and LCD labels.|
|F3|AI Parser|GPT‑4o endpoint extracts {parameter, CC#, type} tuples into JSON. If parsing fails, return a human‑readable error with a link to "manual edit" modal.|
|F4|Template Builder|Backend converts JSON → SL MkIII template JSON → .syx via libslmkiii. Output passes checksum validation.|
|F5|Download Button|Browser initiates download: MySynth_Template.syx.|
|F6|Audit Preview (MVP‑nice‑to‑have)|Render a simple table preview so the user can eyeball mappings before download.|

## 4. Technical Architecture
|Layer|Stack Choice|Notes|
|---|---|---|
|Front‑end|React + Vite (tiny) or Next.js Pages Router|Single page with drag‑and‑drop zone + two inputs.|
|Back‑end|FastAPI (Python 3.11)|Lightweight, async‑friendly, easy to deploy on Render/Fly.io/Heroku.|
|AI Service|OpenAI GPT‑4o (1 req per upload)|Model prompt lives server‑side for security.|
|Template Engine|libslmkiii (MIT) for JSON↔︎SysEx. [GitHub](https://github.com/inno/slmkiii)|
|Storage|Temp filesystem (no DB)|Files auto‑delete after 30 min.|
|CI/CD|GitHub → Render Auto‑Deploy|Free tier is fine; cold start <15 s.|

## 5. Endpoints
|Method|Route|Body|Returns|
|---|---|---|---|
|POST|/api/parse|`{file|text, synthName}`|200 JSON `{controls: []}`|
|POST|/api/build|{jsonMapping, synthName}|200 binary .syx (octet‑stream)|

## 6. Non‑Functional Requirements
Security: Reject files >5 MB, scan MIME type, rate‑limit 10 req/min/IP.

Compliance: Use HTTPS; no PII stored.

Performance: End‑to‑end generation <15 s for a 500‑row PDF.

Accessibility: WCAG 2.1 AA for the single page.

## 7. Out‑of‑Scope (Phase 2)
Multi‑page SL layouts, NRPN / RPN support.

Direct MIDI push to keyboard (bypass Components).

Account system & template library.
