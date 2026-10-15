# Signed AGI: logo guidelines

## 1. The logo
- **Idea**: the long stroke from Austin's signature runs through AGI as a growth curve (flat through the A, under the G, rising past the I).
- **Letters**: Libron Regular capitals (a Newsreader derivative), converted to outlines. The A is the font's V rotated 180°, so the cyan line is its only crossbar.
- **Versions**
  | File | Use |
  |---|---|
  | `agi-lockup-horizontal.svg` | Primary, wherever the name must be read (resume, email signature, banners) |
  | `agi-lockup-stacked.svg` | Square-ish spaces (slides, cards) |
  | `agi-wordmark.svg` | Site nav and anywhere the name is already nearby |
  | `agi-symbol.svg` | Avatar or mark-only uses at 48 px and up |
  | `agi-symbol-small.svg` | Bold small-size cut for 16 to 32 px |
  | `agi-app-icon.svg` | Favicon and app icon tile (dark tile, reads in light and dark tabs) |
  | `*-reversed.svg` | On dark backgrounds |
  | `agi-wordmark-black.svg`, `-white.svg` | One-colour jobs (fax, embossing, single-ink print) |
  | `png/` | Raster copies for tools that can't take SVG |

## 2. Clear space
Keep a clear zone equal to **half the cap height of the A** on every side. Measure it from the letters, not from the tip of the line, which may run into the zone.

## 3. Minimum size
| Version | Screen |
|---|---|
| Horizontal lockup | 160 px wide |
| Wordmark | 56 px wide (the site nav uses 24 px tall, about 66 px wide) |
| Symbol | 48 px; below that use `agi-symbol-small.svg` or the app icon |

## 4. Colour
| Name | HEX | Use |
|---|---|---|
| Ink | `#15171c` | Letters on light backgrounds |
| Paper | `#faf9f7` | Letters on dark backgrounds |
| Signal cyan | `#0891b2` | The line on light backgrounds (3.5:1 on paper) |
| Bright cyan | `#22d3ee` | The line on dark backgrounds (10.7:1 on `#0c0e13`) |

In the site nav the letters follow `currentColor` and the line follows `--accent`, so both themes stay in sync with the CSS tokens.

**Approved pairs**: ink + cyan on paper or white · paper + bright cyan on ink or `#0c0e13` · all black on white · all white on dark.

## 5. Typography
- Logo letters: Libron Regular (OFL, github.com/nicoverbruggen/libron), already outlined. Never retype the logo in a font.
- Name in lockups: Schibsted Grotesk Medium (OFL), the site's sans.

## 6. Don'ts
Don't stretch, rotate, or re-curve the line. Don't recolour the line outside the two cyans. Don't add shadows, outlines, or gradients. Don't move the line off the letters or rebuild the A with a crossbar. Don't place the logo on busy photos without a solid backing.

## 7. Files and source
Generated from scripts (opentype.js, Libron and Schibsted Grotesk) outside this repo. `presentation.html` is the final presentation board with mockups.
