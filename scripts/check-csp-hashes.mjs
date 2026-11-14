import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import process from 'node:process';

const htmlPath = 'dist/index.html';
const html = readFileSync(htmlPath, 'utf8');
const scriptPattern = /<script\b[^>]*>(?<content>[\s\S]*?)<\/script\s*>/giu;
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
  const headerFiles = [
    {
      content: readFileSync('public/_headers', 'utf8'),
      name: 'public/_headers',
    },
    { content: readFileSync('nginx.conf', 'utf8'), name: 'nginx.conf' },
  ];
  let failed = false;

  for (const { content, name } of headerFiles) {
    const missing = hashes.filter((hash) => !content.includes(hash));

    if (missing.length === 0) continue;

    process.stderr.write(
      `Missing CSP hashes in ${name}: ${missing.join(', ')}\n`,
    );
    failed = true;
  }

  if (failed) {
    process.exitCode = 1;
  } else {
    process.stdout.write(
      `CSP hashes verified in ${headerFiles.map(({ name }) => name).join(', ')} (${hashes.length})\n`,
    );
  }
}
