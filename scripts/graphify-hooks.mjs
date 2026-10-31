import { spawnSync } from 'node:child_process';
import { chmodSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const markerStart = '# rsa-graphify-start';
const markerEnd = '# rsa-graphify-end';
const mode = process.argv[2] || 'install';

function git(...args) {
  const result = spawnSync('git', args, { encoding: 'utf8', windowsHide: true });
  if (result.error || result.status !== 0) {
    throw new Error(result.error?.message || result.stderr.trim() || 'Git command failed.');
  }
  return result.stdout.trim();
}

function findPython(root) {
  const savedPath = join(root, 'graphify-out', '.graphify_python');
  const candidates = [];
  if (existsSync(savedPath)) candidates.push([readFileSync(savedPath, 'utf8').trim()]);
  candidates.push(['python'], ['python3'], ['py', '-3']);
  const probe =
    "import importlib.util, sys; found = importlib.util.find_spec('graphify'); print(sys.executable) if found else None; sys.exit(0 if found else 1)";
  for (const [command, ...args] of candidates) {
    if (!command) continue;
    const result = spawnSync(command, [...args, '-c', probe], {
      encoding: 'utf8',
      windowsHide: true,
      timeout: 10000,
    });
    if (!result.error && result.status === 0 && result.stdout.trim()) {
      return result.stdout.trim().replaceAll('\\', '/');
    }
  }
  throw new Error(
    'Graphify is missing. Install graphifyy with Python, then run npm run graph:hooks.',
  );
}

function shellQuote(value) {
  return `'${value.replaceAll("'", "'\\''")}'`;
}

function hookContents(previous, python, event) {
  let existing = previous.replace(/^\uFEFF/, '').replaceAll('\r\n', '\n');
  const start = existing.indexOf(markerStart);
  if (start !== -1) {
    const end = existing.indexOf(markerEnd, start);
    if (end === -1)
      throw new Error(`${event} has an incomplete Graphify hook; it was left unchanged.`);
    existing = existing.slice(0, start) + existing.slice(end + markerEnd.length).replace(/^\n/, '');
  }
  if (existing && !/^#![^\n]*\b(?:ba|da|k|z)?sh\b/.test(existing)) {
    throw new Error(`${event} is an existing non-shell hook; it was left unchanged.`);
  }
  if (!existing) existing = '#!/bin/sh\n';
  const newline = existing.indexOf('\n');
  const shebang = newline === -1 ? `${existing}\n` : existing.slice(0, newline + 1);
  const body = newline === -1 ? '' : existing.slice(newline + 1);
  const onFailure = event === 'pre-push' ? 'exit 1' : ':';
  const block = `${markerStart}
(
  RSA_GRAPHIFY_ROOT=$(git rev-parse --show-toplevel) || exit 1
  printf '%s\\n' '[graphify] Updating local code graph (${event})...'
  GRAPHIFY_MAX_WORKERS=1 PYTHONHASHSEED=0 PYTHONUTF8=1 ${shellQuote(python)} -m graphify update "$RSA_GRAPHIFY_ROOT" --force
) </dev/null || {
  printf '%s\\n' '[graphify] Update failed. Run npm run graph:update to retry.' >&2
  ${onFailure}
}
${markerEnd}
`;
  return shebang + block + body;
}

try {
  if (!['install', 'update'].includes(mode)) throw new Error('Use install or update.');
  const root = git('rev-parse', '--show-toplevel');
  const python = findPython(root);
  if (mode === 'update') {
    const result = spawnSync(python, ['-m', 'graphify', 'update', root, '--force'], {
      cwd: root,
      env: { ...process.env, GRAPHIFY_MAX_WORKERS: '1', PYTHONHASHSEED: '0', PYTHONUTF8: '1' },
      stdio: ['ignore', 'inherit', 'inherit'],
      windowsHide: true,
    });
    if (result.error) throw result.error;
    process.exitCode = result.status ?? 1;
  } else {
    const hooksDir = git('rev-parse', '--path-format=absolute', '--git-path', 'hooks');
    const hooks = ['post-commit', 'pre-push'].map((event) => {
      const path = join(hooksDir, event);
      const previous = existsSync(path) ? readFileSync(path, 'utf8') : '';
      return { path, contents: hookContents(previous, python, event) };
    });
    for (const { path, contents } of hooks) {
      mkdirSync(dirname(path), { recursive: true });
      writeFileSync(path, contents, { encoding: 'utf8', mode: 0o755 });
      chmodSync(path, 0o755);
    }
    console.log(`Graphify post-commit and pre-push hooks installed in ${hooksDir}`);
    console.log('Existing shell hooks are preserved. Generated graph files stay local.');
  }
} catch (error) {
  console.error(`[graphify] ${error.message}`);
  process.exitCode = 1;
}
