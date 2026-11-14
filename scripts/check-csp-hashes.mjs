/* eslint-disable security/detect-non-literal-fs-filename -- Build script reads repository files */
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import process from 'node:process';

const htmlPath = process.argv[2] ?? 'dist/index.html';
const html = readFileSync(htmlPath, 'utf8');
const scriptPattern = /<script\b[^>]*>(?<content>[\s\S]*?)<\/script>/giu;
const hashes = [];

let match;
while ((match = scriptPattern.exec(html)) !== null) {
  if (/\bsrc\s*=/u.test(match[0])) continue;

  const content = match.groups?.content ?? '';
  hashes.push(
    `sha256-${createHash('sha256').update(content).digest('base64')}`,
  );
}

if (hashes.length === 0) {
  process.stderr.write(`No inline scripts found in ${htmlPath}\n`);
  process.exitCode = 1;
} else {
  const headerFiles = ['public/_headers', 'nginx.conf'];
  let failed = false;

  for (const file of headerFiles) {
    const content = readFileSync(file, 'utf8');
    const missing = hashes.filter((hash) => !content.includes(hash));

    if (missing.length === 0) continue;

    process.stderr.write(
      `Missing CSP hashes in ${file}: ${missing.join(', ')}\n`,
    );
    failed = true;
  }

  if (failed) {
    process.exitCode = 1;
  } else {
    process.stdout.write(
      `CSP hashes verified in ${headerFiles.join(', ')} (${hashes.length})\n`,
    );
  }
}
