# Alan Duncan Garage Services — website scaffold

Static marketing site for an independent garage in Dufftown, Moray. Built as a
single scrolling landing page. **This is a scaffold** — structure, design system
and placeholder content are done; real content (car stock, confirmed services,
form wiring) gets dropped in next. See [BRIEF.md](BRIEF.md) for the business facts.

Zero build step, zero dependencies. Just HTML, CSS and a little vanilla JS.

## Files
```
alan-duncan-garage-services/
├── index.html        # the whole page + LocalBusiness (AutoRepair) JSON-LD
├── css/styles.css    # design system (tokens in :root) + all styles
├── js/main.js        # mobile nav, footer year, scroll-reveal (progressive enhancement)
├── assets/favicon.svg
├── BRIEF.md          # business facts, sources, design direction
└── README.md
```

## Run it locally
It's static, so any static server works. From the repo root (`~/DanDan`):
```bash
python3 -m http.server 4610 --directory alan-duncan-garage-services
# → http://localhost:4610
```
(There's also an `alan-duncan` entry in `.claude/launch.json` for the preview tooling.)

## Deploy
Drag-and-drop the folder onto **Netlify**, or `vercel`, or push to **GitHub Pages** —
all free tiers are plenty for a single-location garage. No server needed.

## Design system (quick reference)
Direction: engineering-blueprint / neo-brutalist, "clean & trustworthy".
All tokens are CSS variables at the top of `css/styles.css`:

| Token | Value | Use |
|---|---|---|
| `--ink` | `#0a0a0a` | text, borders, hard shadows |
| `--paper` | `#fafaf7` | page background |
| `--panel` | `#f2f0e9` | alt section background |
| `--signal` | `#ff5b29` | the one accent — CTAs, key numerals |
| `--signal-ink` | `#c73d13` | orange text on paper (contrast-safe) |
| fonts | Geist + Geist Mono | mono = every numeral |
| `--shadow` | `5px 5px 0 ink` | hard offset card shadow |

Signature elements: graph-paper grid (`.grid-bg`), the blueprint car SVG in the
hero (inline in `index.html`), and the number-plate chip (`.plate`).

## What still needs doing (client input) — the TODOs

1. **Cars for sale** — the 3 cards in `#stock` are placeholders. Replace with real
   stock (make/model, year, mileage, fuel, reg, price, photo). To pull the current
   stock I need access to their Facebook page — the individual sale posts sit behind
   FB's login wall. Once you share it, I can populate these (and we can decide whether
   to hand-maintain the HTML or wire a simple CMS/spreadsheet).
   *If they turn out not to sell cars, delete the whole `#stock` section + its nav link.*
2. **Services** — currently the common general-garage set (servicing, MOT prep,
   diagnostics, brakes/tyres, mechanical, seasonal). Confirm the real list and whether
   they're an **MOT test station** or MOT-prep only (changes the wording + JSON-LD).
3. **Enquiry form** — markup only; `action="#"` is a placeholder. Wire to
   [Formspree](https://formspree.io) or Netlify Forms (add `data-netlify="true"` +
   a hidden `form-name` field). Phone remains the primary CTA regardless.
4. **Map / geo** — "Get directions" links to a Google Maps search now. Add exact
   lat/long to the JSON-LD `geo` and optionally embed a map in `#find-us`.
5. **Logo & photos** — using an "ADGS" text mark. Swap for a real logo if they have
   one (their FB cover has a script wordmark). Real workshop/team/car photos will
   lift the whole page.
6. **Brand copy** — hero/about copy is written from their verified reputation; give it
   a read-through with Alan for anything he'd phrase differently.
7. **Domain + `og:url` / JSON-LD `url`** — fill in once a domain is chosen.

## Accessibility / quality floor
Semantic landmarks, skip link, visible focus rings, `prefers-reduced-motion`
respected, responsive to mobile (hamburger < 680px), and the scroll-reveal is
progressive enhancement — with JS off, all content shows normally.
