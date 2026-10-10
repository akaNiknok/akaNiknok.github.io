# akaNiknok.github.io

Static personal site. No build step: `index.html` and `resume.html` are edited
directly and served as-is by GitHub Pages.

## Writing conventions

**No em dashes in résumé or site bullet points.** Use parentheses, commas, or
regular hyphens instead. Applies to the literal character and to the `&mdash;`
and `&ndash;` entities.

- Yes: `Owned the project end to end (cold start through closeout), growing from 2 to 7.`
- Yes: `scoring identical behavior 0.15-0.85, a real defect rather than an artifact`
- No:  `Owned the project end to end &mdash; cold start through closeout &mdash; growing from 2 to 7.`

Prose paragraphs on `index.html` may still use em dashes; the rule is about
bullets, where a dash reads as padding.

## Résumé bullets

`resume.html` keeps 6 live bullets that print to one page, followed by a
commented-out bench of alternates, both ranked strongest first. See the
`ONE PAGE CUT LINE` comment.

## Tailoring for one job

Tailoring happens in Pipeline Dream (the job tracker), at
`D:\austi\Documents\Personal\pipeline-dream`. Its `tailor` skill reads this repo's
`resume.html`, `src/`, and this file, then writes the tailored copy, the PDF, and
the cover letter on its side. If Austin asks here for a resume or a letter for one
job, tell him to run `/tailor` in a Pipeline Dream session.

`resume.html` stays the public, general resume: edit it only when Austin asks to
change the resume itself, not for one job. The facts and rules in this repo
(the bench, `src/`, the anonymization and dash rules) feed every tailored copy,
so keep them current here.

## Confidentiality

`src/` is gitignored and must stay that way. It holds Pareto-internal source
notes (performance reviews, Slack-derived metrics, HR documents). Before
publishing any new Pareto copy, check it against the anonymization rules: no
project or client codenames, no colleague names, no Slack links. The client is
referred to only as "a frontier-AI data company".
