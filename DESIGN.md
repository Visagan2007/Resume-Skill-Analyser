# Resume Skill Analyser design

The interface turns a professional profile into a considered career snapshot. Keep the existing editorial layout, liquid glass materials, and three-stage profile flow when maintaining the site. Sample career snapshots are illustrative; authentication and automated analysis are not connected to a backend.

## Visual system

| Role           | Light     | Dark      |
| -------------- | --------- | --------- |
| Ground         | `#F7F4FA` | `#17111F` |
| Paper          | `#FFFFFF` | `#221A2D` |
| Reading text   | `#2E1A47` | `#F7F4FA` |
| Muted text     | `#695675` | `#C0B1CF` |
| Primary action | `#2E1A47` | `#B8A1D9` |

Manrope carries headings and the wordmark; DM Sans carries reading text and controls. `src/index.css` owns the base tokens and reusable controls. `src/liquid-glass.css` owns the light/dark glass materials, opaque alternatives, and animated scenery. The shared `BrandSymbol` supplies the rising-strokes mark in navigation and footer; the favicon uses the same shape.

The user's Royal Purple/Lavender palette, glass surfaces, rounded panels, and pill actions take precedence over generic design-skill restrictions. Maintain readable text, native control semantics, visible focus, and useful fallbacks in both themes.

## Pages and navigation

- **Home:** three selectable sample career profiles, composed interface illustrations, and section links into the real profile builder.
- **Workspace:** professional details, skills and credentials, target preferences, and an editable review of local selections. Searchable selectors support keyboard navigation.
- **Settings:** separate Theme and Visual effects sections. Light/dark interface previews accompany native radio controls; Full, Device, and Reduced effects use the shared preference model.
- **About:** product purpose and a sample path through the actual profile fields.
- **Account pages:** visible labels, autocomplete, password visibility, native validation, and truthful local preview feedback. The footer is omitted on sign-in and sign-up routes, including trailing-slash variants.
- **Not found:** branded illustration and home/profile destinations.

The navbar and its desktop links are centered with symmetric gutters. Settings is an independent fixed gear at the upper right, outside the header's layout. It is hidden while the mobile modal is open. The footer also links to Settings.

The native mobile navigation dialog retains Escape, outside-click closing, focus return, and scroll locking. Its lifecycle is isolated in `useNavigationMenu`; each opening resets the intended focus destination. Stable scrollbar space prevents horizontal shifts. A skip link targets the main content.

The footer is a compact, full-width glass panel attached to the bottom edge. Desktop uses three columns; phones use a brand/action row above grouped navigation. Back to top focuses the main content. The preview disclosure states the limits of the local application.

## State and persistence

The profile draft, current stage, and review state live in `ProfileDraftProvider`, outside the routed content. Visiting Settings or another page preserves work in progress. Profile data remains in memory and resets on a full reload; it is not written to storage or sent to a server.

Theme selection is owned once by the application shell. The initial theme follows the device unless a valid `rsa-theme` override exists. Theme changes synchronize across tabs. A head script applies the initial theme before rendering; `color-scheme` adapts native controls.

Visual effects use a shared external store and the `rsa-effects` storage key. Full effects is the default. Device settings follows reduced-motion and reduced-transparency preferences; Reduced effects uses opaque surfaces and immediate changes. An explicit Full effects choice enables the requested appearance within this site. Storage failures still allow changes for the current visit.

## Glass rendering

`src/Components/UI/liquid-glass/` adapts the optical model from [dashersw/liquid-glass-js](https://github.com/dashersw/liquid-glass-js). The upstream attribution, pinned revision, and MIT license are retained in that directory; the license also ships at `/licenses/liquid-glass-js.txt`.

`index.jsx` provides the React lifecycle and SVG definitions. `controller.js` owns DOM scanning, preference subscriptions, pointer highlights, map caching, and observer cleanup. `optics.js` calculates rounded-distance edge displacement maps. Maps are shared across surfaces and limited to 48 entries. Only refraction-capable surfaces receive size observation and scheduled map updates; small controls retain CSS glass.

Chromium uses SVG displacement on the live backdrop, with edge displacement below approximately eight CSS pixels. Other engines retain CSS frosted glass. The adapter uses no page screenshots or per-element WebGL contexts. Native content remains semantic and interactive. Reduced transparency disables live filters; forced-colors mode retains control borders.

## Motion

| Interaction                                       | Timing                 |
| ------------------------------------------------- | ---------------------- |
| Page arrival / departure                          | 460ms / 220ms          |
| Phone page arrival / departure                    | 420ms / 180ms          |
| Browser history / unsupported page-transition API | 240ms opacity fallback |
| Theme / visual effects change                     | 360ms / 280ms          |
| Mobile menu opening / closing                     | 480ms / 340ms          |
| Programmatic smooth scrolling                     | 900ms                  |
| Background fold cycles                            | 28s / 36s / 44s        |

A persistent React `ViewTransition` boundary wraps routed content and the footer. Navigation and scenery stay outside it. Route focus and immediate scroll resets occur before the incoming snapshot. Appearance transitions share one interruptible helper; rapid changes retain the latest choice, and device/storage updates cancel pending changes.

Lenis eases wheel scrolling. Touch and nested dropdown/menu scrolling remain native. Route changes cancel momentum; section links, profile stages, and Back to top share one scroll helper. Opening the mobile dialog stops scrolling until it closes. Reduced motion removes smoothing and animations.

Three background folds animate transforms on independent alternating paths. Phones use smaller drift distances. Reduced motion makes folds static; reduced transparency hides them; hidden tabs pause them. Page content remains visible when reveal observers are unavailable.

## Maintenance and verification

`npm run check` runs warning-free Oxlint, Prettier verification, regression tests, and the production build. `npm audit` checks dependency advisories. Keep tests focused on behavior such as validation, interruptible appearance changes, and preference synchronization.

Browser checks cover all routes in both themes, Full/Device/Reduced effects, the full profile workflow and Settings round trip, keyboard selectors, account controls, route/hash scrolling, mobile menu focus and scroll restoration, and responsive layouts. Use the provided computer-use API for screenshots and DOM measurements. Local QA artifacts remain ignored in `.taste-skill/`; generated code graphs remain ignored in `graphify-out/`.

Graphify refreshes after commits and before pushes through the local hooks documented in [README.md](README.md). Reinstall hooks for each new clone. Code graph updates require no LLM; documentation and image semantics need a separate assistant update.

## Design provenance

The existing design applied Design Taste Frontend, Redesign Existing Projects, High-End Visual Design, and Motion guidance. The page direction was **The printed annual**, seed `1521359076`; the app direction was **Accent ladder**, seed `1047621408`; the Settings draw retained that direction with seed `1394872656`. The floating navigation and current palette were retained where dealt layouts conflicted with the established brief. The Motion runtime is not an application dependency.
