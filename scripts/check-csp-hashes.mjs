import { JSDOM } from 'jsdom';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import process from 'node:process';

const htmlPath = 'dist/index.html';
const dom = new JSDOM(readFileSync(htmlPath, 'utf8'));
const scripts = [...dom.window.document.querySelectorAll('script:not([src])')];
const hashes = scripts.map(
  (script) =>
    `sha256-${createHash('sha256')
      .update(script.textContent ?? '')
      .digest('base64')}`,
);

dom.window.close();

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
