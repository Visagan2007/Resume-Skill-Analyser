# Resume Skill Analyser

A React application for building a professional profile, collecting skills, and defining a target role. The workspace provides a local review of your selections. Authentication and automated analysis are not connected to a backend.

The Settings page contains light/dark theme previews and adjustable liquid-glass effects. The interface includes appearance transitions and smooth scrolling. See [DESIGN.md](DESIGN.md) for the visual system and accessibility behavior. The optical effect is adapted from [dashersw/liquid-glass-js](https://github.com/dashersw/liquid-glass-js); its source attribution and MIT license are retained in `src/Components/UI/liquid-glass/`.

## Development

Use Node.js 22.22.0 or newer.

```sh
npm ci
npm run dev
```

## Checks and formatting

```sh
npm run check
npm run format
```

`check` runs lint, formatting verification, Node's built-in tests, and the production build. Each check can also run independently:

```sh
npm run lint
npm run format:check
npm test
npm run build
npm run preview
```

Prettier formats maintained source and documentation. Generated builds, local QA artifacts, the dependency lockfile, and Graphify output are excluded. Oxlint checks application code, startup and maintenance scripts, tests, and the Vite configuration; warnings fail the check.

## Project structure

- `src/App.jsx`: routes, page transitions, and the application shell.
- `src/Components/`: page components and shared interface controls.
- `src/Components/Analyze/`: profile form options, state, validation, and review.
- `src/Components/NavBar/useNavigationMenu.js`: native mobile dialog lifecycle and focus restoration.
- `src/Components/UI/liquid-glass/`: React shell, DOM controller, and optical calculations.
- `src/hooks/`: shared route focus/scroll behavior and page-scoped scroll reveals.
- `src/useTheme.js`, `src/visualEffects.js`, and `src/appearanceTransition.js`: appearance preferences and transitions.
- `src/index.css` and `src/liquid-glass.css`: global design tokens, base styles, and glass materials.
- `public/`: favicon, pre-render preference scripts, and license notices.
- `tests/`: lifecycle regression tests for shared behavior.
- `scripts/graphify-hooks.mjs`: local code-graph updates and Git hook installation.

Vite handles development and production builds. React Router provides client navigation, Tailwind supplies the base CSS reset, and application styles use ordinary CSS.

## Optional code map

Graphify is a separate Python development tool, not an application dependency:

```sh
python -m pip install graphifyy
graphify extract . --code-only
graphify query "How do appearance preferences update the interface?"
```

Generated output lives in the ignored `graphify-out/` directory. The structural map covers JavaScript/JSX symbols and relationships; inspect CSS and documentation directly when they matter to a change.

### Automatic updates on commit and push

Install the local Git hooks once per clone:

```sh
npm run graph:hooks
```

Graphify must already be installed in Python. The installer pins that interpreter so the hooks also work from Git GUI clients, respects the configured Git hooks directory, and preserves existing shell hook commands. Running it again refreshes the same hook blocks without duplicating them.

The `post-commit` hook refreshes the code graph after each commit. The `pre-push` hook waits for a refresh before Git sends changes; an update failure stops the push and prints a retry command. A post-commit failure is reported without undoing the commit. Both hooks update `graph.json`, `graph.html`, and `GRAPH_REPORT.md` using local AST extraction, including code removals, with no LLM or API key. They do not stage files, create commits, or push anything themselves. Generated output remains ignored and local.

To refresh manually:

```sh
npm run graph:update
```

Documentation, images, and other semantic sources still need `/graphify --update` in an AI assistant. Git hooks are local configuration, so run `npm run graph:hooks` after cloning on another machine.
