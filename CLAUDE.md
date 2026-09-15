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
commented-out bench of alternates, both ranked strongest first. To tailor for an
application, swap one in and one out. See the `ONE PAGE CUT LINE` comment.

## Confidentiality

`src/` is gitignored and must stay that way. It holds Pareto-internal source
notes (performance reviews, Slack-derived metrics, HR documents). Before
publishing any new Pareto copy, check it against the anonymization rules: no
project or client codenames, no colleague names, no Slack links. The client is
referred to only as "a frontier-AI data company".
