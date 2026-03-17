import { spawnSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SYSTEM_UI_DIR = 'src/components/ui';
const SYSTEM_ICONS_DIR = 'src/components/icons';
const SYSTEM_CORE_DIR = 'src/components/core';
const SYSTEM_STYLE_DIR = 'src/styles';
const SYSTEM_TYPES_DIR = 'src/types';
const SYSTEM_TOKEN_FILE = 'src/config/design-tokens.ts';
const READ_ONLY_SYSTEM_PATHS = [
  SYSTEM_UI_DIR,
  SYSTEM_ICONS_DIR,
  SYSTEM_CORE_DIR,
  SYSTEM_STYLE_DIR,
  SYSTEM_TYPES_DIR,
  SYSTEM_TOKEN_FILE,
];
const BASELINE_FILE = '.void-starter-baseline';
const SNAPSHOT_BASELINE_FILE = '.void-starter-baseline.json';
const CONSUMER_ROOTS = ['src/components', 'src/layouts', 'src/pages'];
const CONSUMER_EXCLUDED_DIRS = new Set([
  SYSTEM_UI_DIR,
  SYSTEM_ICONS_DIR,
  SYSTEM_CORE_DIR,
  SYSTEM_TYPES_DIR,
  'src/components/ui-library',
]);
const CONSUMER_EXTENSIONS = new Set([
  '.astro',
  '.js',
  '.jsx',
  '.svelte',
  '.ts',
  '.tsx',
]);
const ALLOWED_PIXELS = new Set([
  '0px',
  '1px',
  '2px',
  '3px',
  '-1px',
  '-2px',
  '-3px',
]);
const VOID_IGNORE_DIRECTIVE_REGEX = /^\s*\/\/\s*void-ignore\b/;
const RAW_VALUE_REGEX =
  /#(?:[0-9a-fA-F]{3,8})\b|\b(?:rgb|rgba|hsl|hsla)\([^)]*\)|\b-?\d*\.?\d+px\b/g;
const IGNORED_BASELINE_FILES = new Set(['.DS_Store']);

type RawValueHit = {
  filePath: string;
  line: number;
  value: string;
};

type Baseline = {
  kind: 'git';
  ref: string;
  commit: string;
};

type SnapshotBaseline = {
  kind: 'snapshot';
  ref: string;
  entries: Record<string, string>;
};

type SnapshotFile = {
  version: number;
  generatedAt: string;
  entries: Record<string, string>;
};

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

function replaceWithWhitespace(match: string) {
  return match.replace(/[^\n]/g, ' ');
}

function readText(filePath: string) {
  return fs.readFileSync(filePath, 'utf8');
}

function hashFile(filePath: string) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function readFirstNonCommentLine(filePath: string) {
  if (!fs.existsSync(filePath)) return null;

  return readText(filePath)
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line && !line.startsWith('#')) ?? null;
}

function runCommand(command: string, args: string[], label: string) {
  console.log(`\n[validate] ${label}`);
  const result = spawnSync(command, args, {
    cwd: ROOT,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function git(args: string[], options?: { allowFailure?: boolean }) {
  const result = spawnSync('git', args, {
    cwd: ROOT,
    encoding: 'utf8',
  });

  if (result.status !== 0 && !options?.allowFailure) {
    const stderr = result.stderr.trim();
    fail(
      stderr
        ? `[validate] git ${args.join(' ')} failed:\n${stderr}`
        : `[validate] git ${args.join(' ')} failed.`,
    );
  }

  return result;
}

function gitOutput(args: string[], options?: { allowFailure?: boolean }) {
  return git(args, options).stdout.trim();
}

function shouldIgnoreBaselineFile(relativePath: string) {
  return IGNORED_BASELINE_FILES.has(path.basename(relativePath));
}

function listProtectedFiles(relativePath: string, entries: string[]) {
  const fullPath = path.join(ROOT, relativePath);
  if (!fs.existsSync(fullPath)) return;

  const stat = fs.statSync(fullPath);
  if (stat.isDirectory()) {
    for (const dirent of fs.readdirSync(fullPath, { withFileTypes: true })) {
      listProtectedFiles(path.join(relativePath, dirent.name), entries);
    }
    return;
  }

  if (shouldIgnoreBaselineFile(relativePath)) return;
  entries.push(relativePath);
}

export function createSystemSnapshotEntries() {
  const entries: Record<string, string> = {};
  const files: string[] = [];

  for (const protectedPath of READ_ONLY_SYSTEM_PATHS) {
    listProtectedFiles(protectedPath, files);
  }

  for (const filePath of files.sort()) {
    entries[filePath] = hashFile(path.join(ROOT, filePath));
  }

  return entries;
}

function loadSnapshotBaseline(): SnapshotBaseline | null {
  const snapshotPath = path.join(ROOT, SNAPSHOT_BASELINE_FILE);
  if (!fs.existsSync(snapshotPath)) return null;

  const parsed = JSON.parse(readText(snapshotPath)) as SnapshotFile;
  if (
    typeof parsed !== 'object' ||
    parsed === null ||
    typeof parsed.version !== 'number' ||
    typeof parsed.generatedAt !== 'string' ||
    typeof parsed.entries !== 'object' ||
    parsed.entries === null
  ) {
    fail(`[validate] ${SNAPSHOT_BASELINE_FILE} is invalid.`);
  }

  return {
    kind: 'snapshot',
    ref: SNAPSHOT_BASELINE_FILE,
    entries: parsed.entries,
  };
}

export function writeStarterSnapshotBaseline() {
  const snapshotPath = path.join(ROOT, SNAPSHOT_BASELINE_FILE);
  const snapshot: SnapshotFile = {
    version: 1,
    generatedAt: new Date().toISOString(),
    entries: createSystemSnapshotEntries(),
  };

  fs.writeFileSync(snapshotPath, `${JSON.stringify(snapshot, null, 2)}\n`);
  console.log(
    `[baseline] Wrote ${Object.keys(snapshot.entries).length} protected file hashes to ${SNAPSHOT_BASELINE_FILE}.`,
  );
}

export function resolveBaseline(): Baseline | SnapshotBaseline {
  const explicitRef = process.env.VOID_VALIDATE_BASELINE_REF?.trim();

  if (explicitRef) {
    const commit = gitOutput(['rev-parse', '--verify', explicitRef]);
    return { kind: 'git', ref: explicitRef, commit };
  }

  const fileRef = readFirstNonCommentLine(path.join(ROOT, BASELINE_FILE));
  if (fileRef) {
    const commit = gitOutput(['rev-parse', '--verify', fileRef]);
    return { kind: 'git', ref: `${BASELINE_FILE}:${fileRef}`, commit };
  }

  const snapshotBaseline = loadSnapshotBaseline();
  if (snapshotBaseline) {
    return snapshotBaseline;
  }

  const rootCommit = gitOutput(['rev-list', '--max-parents=0', 'HEAD'])
    .split('\n')
    .map((line) => line.trim())
    .find(Boolean);

  if (!rootCommit) {
    fail('[validate] Could not resolve a starter baseline commit.');
  }

  return {
    kind: 'git',
    ref: 'root commit',
    commit: rootCommit,
  };
}

export function checkSystemBaseline() {
  const baseline = resolveBaseline();
  if (baseline.kind === 'snapshot') {
    const currentEntries = createSystemSnapshotEntries();
    const allPaths = new Set([
      ...Object.keys(baseline.entries),
      ...Object.keys(currentEntries),
    ]);
    const violations: string[] = [];

    for (const filePath of [...allPaths].sort()) {
      const baselineHash = baseline.entries[filePath];
      const currentHash = currentEntries[filePath];

      if (!baselineHash && currentHash) {
        violations.push(`A\t${filePath}`);
        continue;
      }

      if (baselineHash && !currentHash) {
        violations.push(`D\t${filePath}`);
        continue;
      }

      if (baselineHash !== currentHash) {
        violations.push(`M\t${filePath}`);
      }
    }

    console.log(
      `[validate] System baseline: ${baseline.ref} (${Object.keys(baseline.entries).length} files)`,
    );

    if (violations.length === 0) {
      console.log('[validate] No direct edits detected in shipped system paths.');
      return;
    }

    console.error('\n[validate] Direct edits to read-only system files are not allowed.');
    console.error(
      `[validate] Update ${SNAPSHOT_BASELINE_FILE} only when you intentionally approve a new shipped system.\n`,
    );

    for (const violation of violations) {
      console.error(`  ${violation}`);
    }

    process.exit(1);
  }

  const trackedChanges = gitOutput(
    ['diff', '--name-status', '--find-renames', baseline.commit, '--', ...READ_ONLY_SYSTEM_PATHS],
    { allowFailure: true },
  );
  const untrackedChanges = gitOutput(
    ['ls-files', '--others', '--exclude-standard', '--', ...READ_ONLY_SYSTEM_PATHS],
    { allowFailure: true },
  );
  const violations = [
    ...trackedChanges.split('\n').map((line) => line.trim()).filter(Boolean),
    ...untrackedChanges
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => `??\t${line}`),
  ];

  console.log(
    `[validate] System baseline: ${baseline.ref} (${baseline.commit.slice(0, 12)})`,
  );

  if (violations.length === 0) {
    console.log(
      '[validate] No direct edits detected in shipped system paths.',
    );
    return;
  }

  console.error(
    '\n[validate] Direct edits to read-only system files are not allowed.',
  );
  console.error(
    `[validate] Pin a different baseline with ${BASELINE_FILE} or VOID_VALIDATE_BASELINE_REF if needed.\n`,
  );

  for (const violation of violations) {
    console.error(`  ${violation}`);
  }

  process.exit(1);
}

export const checkUiBaseline = checkSystemBaseline;

function maskNonCodeContent(content: string, extension: string) {
  let masked = content
    .replace(/\/\*[\s\S]*?\*\//g, replaceWithWhitespace)
    .replace(/(^|[^:\\])\/\/.*$/gm, (match, prefix: string) => {
      const suffix = match.slice(prefix.length);
      return prefix + replaceWithWhitespace(suffix);
    });

  if (extension === '.astro' || extension === '.svelte') {
    masked = masked
      .replace(/<!--[\s\S]*?-->/g, replaceWithWhitespace)
      .replace(/<pre\b[\s\S]*?<\/pre>/gi, replaceWithWhitespace);
  }

  return masked;
}

function walkConsumerFiles(rootDir: string, hits: RawValueHit[]) {
  for (const entry of fs.readdirSync(rootDir, { withFileTypes: true })) {
    const fullPath = path.join(rootDir, entry.name);
    const relativePath = path.relative(ROOT, fullPath);

    if (entry.isDirectory()) {
      if (CONSUMER_EXCLUDED_DIRS.has(relativePath)) continue;
      walkConsumerFiles(fullPath, hits);
      continue;
    }

    if (!CONSUMER_EXTENSIONS.has(path.extname(entry.name))) continue;
    hits.push(...scanConsumerFile(fullPath));
  }
}

function scanConsumerFile(filePath: string): RawValueHit[] {
  const hits: RawValueHit[] = [];
  const content = readText(filePath);
  const masked = maskNonCodeContent(content, path.extname(filePath));
  const maskedLines = masked.split('\n');
  const originalLines = content.split('\n');

  for (let index = 0; index < maskedLines.length; index += 1) {
    const line = maskedLines[index];
    const originalLine = originalLines[index] ?? '';
    const trimmed = originalLine.trim();
    const prevLine = index > 0 ? originalLines[index - 1] : '';
    const shouldSkip =
      trimmed.startsWith('//') ||
      trimmed.startsWith('/*') ||
      trimmed.startsWith('*') ||
      trimmed.startsWith('*/') ||
      originalLine.includes('// void-ignore') ||
      VOID_IGNORE_DIRECTIVE_REGEX.test(prevLine);

    if (!shouldSkip) {
      collectLineHits(line, filePath, index + 1, hits);
    }
  }

  return hits;
}

function collectLineHits(
  line: string,
  filePath: string,
  lineNumber: number,
  hits: RawValueHit[],
) {
  let match: RegExpExecArray | null;
  RAW_VALUE_REGEX.lastIndex = 0;

  while ((match = RAW_VALUE_REGEX.exec(line)) !== null) {
    const value = match[0];
    if (ALLOWED_PIXELS.has(value)) continue;
    hits.push({ filePath, line: lineNumber, value });
  }
}

export function checkConsumerRawValues(label = 'validate') {
  const hits: RawValueHit[] = [];

  for (const relativeRoot of CONSUMER_ROOTS) {
    const fullRoot = path.join(ROOT, relativeRoot);
    if (!fs.existsSync(fullRoot)) continue;
    walkConsumerFiles(fullRoot, hits);
  }

  if (hits.length === 0) {
    console.log(`[${label}] No raw token-law values found in consumer code.`);
    return;
  }

  console.error(`\n[${label}] Raw values found in consumer code:`);

  for (const hit of hits) {
    console.error(
      `  ${path.relative(ROOT, hit.filePath)}:${hit.line} -> ${hit.value}`,
    );
  }

  process.exit(1);
}

export function main() {
  console.log('[validate] Running starter validation...');
  checkSystemBaseline();
  checkConsumerRawValues('validate');
  runCommand(
    process.platform === 'win32' ? 'npm.cmd' : 'npm',
    ['run', 'check'],
    'Checking import resolution and registries',
  );
  console.log('\n[validate] Validation passed.');
}

const entryHref = process.argv[1]
  ? pathToFileURL(path.resolve(process.argv[1])).href
  : null;

if (entryHref === import.meta.url) {
  main();
}
