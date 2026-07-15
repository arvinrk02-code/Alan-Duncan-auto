# DESIGN.md — Alan Duncan Garage Services

Sculpted from the refero *engineering-blueprint* rigor (structure, precise grid,
technical drawing, mono data) but recoloured into **their real brand** and warmed
up. Not the refero clone; not the `design.md` sapphire language. Its own thing:

> **"A workshop manual crossed with a car dashboard."** Charcoal dashboard moments
> where orange/green/amber glow; clean light bands for the trustworthy detail.

## Colour — Full-palette strategy (their real brand)
Reference: their charcoal business card (amber text + dashboard warning lights) and
orange forecourt sign (green hand-script name, black spark plug). Colour is the voice.

| Token | Hex | Role |
|---|---|---|
| `--char` | `#211E1A` | charcoal — dashboard/hero/feature bands (business-card black) |
| `--char-deep` | `#17150F` | deepest panel / footer |
| `--paper` | `#F3F1EC` | light band base — near-neutral off-white (low chroma, NOT cream) |
| `--paper-2` | `#E9E5DC` | light panel / stroke |
| `--orange` | `#F2851E` | PRIMARY — forecourt sign; CTAs, key emphasis |
| `--orange-hot`| `#FF6A1A` | pressed / glow |
| `--amber` | `#E0982F` | warm text on charcoal, warning-light glow (business card) |
| `--green` | `#33B24A` | SECONDARY — the "Alan Duncan" green; pass/go, links, ticks |
| `--green-deep`| `#1C8A38` | green pressed / on-light contrast |
| `--ink` | `#1C1A16` | text on paper |
| `--ink-soft` | `#5A544A` | secondary text on paper (AA verified) |
| `--cream-ink` | `#F0E9DA` | text on charcoal (AA verified) |

Contrast is verified in build (body ≥4.5:1). Amber/orange are for large text,
accents, and glows — never small body on light.

## Type — Archivo system (reflex-reject list honoured)
Reflex fonts rejected: Inter, Space Grotesk, DM Sans. Chosen for "sturdy, engineered,
signage": **Archivo** (a real grotesque with an Expanded cut that reads like a
forecourt nameplate). One family, committed weight/width contrast. Mono only for
genuine data (phone, mileage, prices, hours, torque) — data, not costume.

- **Display / hero:** Archivo Expanded 700–800, tight tracking, signage feel.
- **Headings / UI:** Archivo 500–700.
- **Body:** Archivo 400, 1.65 leading, ≤68ch.
- **Data / labels:** Spline Sans Mono 400–500, for numerals + short unit labels.

## Motifs (theirs, hand-built as SVG — imagery = crafted scenes)
1. **Dashboard warning lights** — temp, battery, check-engine, oil (their exact
   business-card glyphs), redrawn as clean SVG. Used as the hero scene + service icons.
2. **Spark plug** — from the sign; a section motif + the click easter egg.
3. **"For all your car needs"** — their real tagline.
4. **Registration-plate chip** — mono data on a plate (phone, car regs).

## Signature + delight (impeccable delight / overdrive — restrained)
- **Ignition self-check (hero, the one overdrive moment):** on load the charcoal
  dashboard runs a warning-light startup sweep — lights flare amber in sequence then
  settle, exactly like turning a key. <1.4s, static lit fallback for reduced-motion.
- **Service hover = "we clear it":** each warning-light icon is lit; on hover/focus it
  goes out (amber → dim) — meaning "we fix that". Micro, tied to sense.
- **Spark-plug easter egg:** click the plug → a small electric spark arcs. Hidden.
- **Console hello** for curious devs. Honest alt text as voice.
Everything else stays quiet. One memorable moment, not ten.

## Motion
ease-out-expo/quart, no bounce. Entrances fit what they reveal (staggered where a
list, single where a band). `prefers-reduced-motion` → final states, ~0ms, static
dashboard. Reveals enhance already-visible content (never gate visibility on JS).

## Accessibility floor
Semantic landmarks, skip link, visible focus (orange ring on charcoal, green-deep on
paper), AA contrast verified, 44px targets, reduced-motion honoured, mobile hamburger.
