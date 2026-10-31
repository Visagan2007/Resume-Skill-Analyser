# Liquid Glass integration

This directory adapts the optical calculations from
[dashersw/liquid-glass-js](https://github.com/dashersw/liquid-glass-js), pinned to
[commit 78cb6ccb0b9987bb60a88b14ccbd13a9e6e8ab2a](https://github.com/dashersw/liquid-glass-js/tree/78cb6ccb0b9987bb60a88b14ccbd13a9e6e8ab2a).
The upstream MIT license is included in `LICENSE` and shipped with production
assets at `/licenses/liquid-glass-js.txt`.

`optics.js` translates `Container`'s rounded rectangle signed distance, shape
normal, exponential edge and rim falloff, corner enhancement, and perpendicular
ripple from its fragment shader into a small RG displacement texture. Its center
warp is deliberately disabled, and edge displacement is limited to approximately
eight CSS pixels so text stays legible.

The texture drives an SVG `feDisplacementMap` through `backdrop-filter` in
Chromium. This refracts the **live backdrop** without distorting foreground text.
The original library takes an html2canvas screenshot and creates a WebGL context
per surface; the adapter uses neither, preserving the site's native forms,
buttons, links, and live theme changes. This is a local adaptation of the library's
optical model, not an npm distribution or its unmodified `Container`/`Button` API.

Render `<LiquidGlassEffects />` once and style `.liquid-glass-surface` with:

```css
backdrop-filter: var(--liquid-glass-filter, blur(18px) saturate(1.15));
```

The default selectors cover the application. `data-liquid-glass` opts a new
surface into the CSS treatment; `data-liquid-glass="refract"` also opts it into
refraction; `data-liquid-glass="off"` opts it out of enhancement.

The adapter shares at most 48 small filter maps, processes new sizes in batches,
observes React route and dropdown changes, releases removed surfaces, and cleans
up observers, listeners, frames and maps on unmount. There is no animation loop.
Foreground controls use CSS glass; optical maps are reserved for larger panels.

Other browser engines retain the CSS backdrop blur. Reduced transparency disables
refraction; reduced motion and coarse pointers disable the pointer highlight.
`data-liquid-glass-ready="true"` is applied only after a map is decoded. CSS should
provide the opaque reduced-transparency and forced-colors treatments.
