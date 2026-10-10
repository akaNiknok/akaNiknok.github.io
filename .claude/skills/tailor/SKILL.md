---
name: tailor
description: Tailor Austin's resume to one job. Use when Austin gives a job URL or pastes the text of a job and asks to tailor, fit, or adapt the resume, or asks for a cover letter for a job. Writes a private copy to tailored/, exports a one-page PDF, and drafts the cover letter text.
---

# Tailor the resume to one job

The input is a job URL or the pasted text of a job. The output is a one-page PDF in
`tailored/`, plus a cover letter draft if Austin wants one.

`resume.html` stays the public resume. Never edit it in this workflow, except step 8.

## The facts Claude may use

A tailored resume goes to an employer. Every claim in it must be true. Use only these sources:

1. `resume.html`: the live bullets, and the bench in the `ONE PAGE CUT LINE` comment.
2. `src/`: the confidential source notes (performance reports, metrics, past letters).
3. `index.html`: the project write-ups.

Rules for the facts:

- Copy every number exactly from its source. Never round up, combine, or estimate a number.
- Never add a tool, a skill, a title, or a result that no source shows.
- Rephrase toward the words of the job only when the meaning stays the same. "Coordinated QA
  and engineering" can become "cross-functional delivery". It cannot become "led engineering".
- Apply the anonymization rules in `CLAUDE.md` to every word that leaves `src/`. Name the
  client only as "a frontier-AI data company". No codenames, no colleague names, no Slack links.
- Use no em dash and no en dash in a bullet. See `CLAUDE.md`.

## Steps

1. **Read the job.** For a URL, fetch the page. A board that renders with JavaScript can
   return an empty page. Then ask Austin to paste the text. Do not guess the content.
2. **Extract the requirements.** List the 5 to 8 that matter most, strongest first. Mark the
   must-haves.
3. **Read the sources.** Read `resume.html` in full, including the bench. Read every file in
   `src/` that touches the requirements.
4. **Propose, then stop.** Show Austin one table, and wait for his approval before you write
   a file:

   | Requirement | Current evidence | Proposed change | Source |
   |---|---|---|---|

   - "Proposed change" is one of: keep, reorder, swap in from the bench, rephrase, new bullet,
     or "gap: no evidence".
   - "Source" names the file and the line for every rephrased or new bullet.
   - Below the table, list the gaps plainly. A gap stays a gap. Do not paper over it.
   - Also propose any change to the `.role` line, the summary, and the Core Skills lines.
5. **Write the copy.** After approval, copy `resume.html` to `tailored/<company>-<role>.html`
   (lowercase, hyphens). Make the approved edits in the copy only. Do not change the dates,
   the employers, the job titles, or Education.
6. **Export the PDF and check the page count.**

   ```bash
   "/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="tailored/Austin-Imperial-Resume-<Company>.pdf" "file:///D:/austi/Documents/Personal/akaNiknok.github.io/tailored/<company>-<role>.html"
   grep -a -o "/Count [0-9]*" "tailored/Austin-Imperial-Resume-<Company>.pdf"
   ```

   The grep must print `/Count 1`. If it prints more, cut the weakest bullet and export again.
   Read the PDF once to confirm the layout.
7. **Offer the cover letter.** Ask whether Austin wants one. If yes, write the body to
   `tailored/<company>-<role>-letter.txt`:
   - Plain text. No markdown. Blank lines between paragraphs.
   - Start at "Dear Hiring Team," and end with "Austin G. Imperial". Pipeline Dream prints the
     name and contact header, so do not write one.
   - Three short paragraphs: the role and what Austin already does that matches it; one
     concrete thing he built or measured, with the number; what he looks for next.
   - Under 250 words. Match the voice of any past letter in `src/`.
   - Austin pastes it into the application detail in Pipeline Dream, then prints it there.
8. **Offer to grow the bench.** A new bullet that tested well can join the bench in
   `resume.html`. The bench sits in an HTML comment, and an HTML comment is public in the page
   source. So check the anonymization rules again before you add it. Ask first.
9. **Report.** Give the PDF path, the changes in one line each, and the gaps.

## After the steps

Austin uploads the PDF to the application in Pipeline Dream. Do not commit anything in
`tailored/`. Git ignores that folder.
