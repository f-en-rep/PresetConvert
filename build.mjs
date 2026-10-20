// Builds extension.js at the repository root from src/, next to manifest.json, so the repository itself is
// the installable package (Marinara folder import and GitHub-based installers read both files from there).
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const read = (file) => readFileSync(join(root, file), 'utf8');
const stripExports = (source) => source.replace(/^export \{[^}]*\};?\s*$/gm, '');

const manifest = JSON.parse(read('manifest.json'));
if (manifest.config?.jsPath !== 'extension.js') throw new Error('manifest.json must point jsPath at extension.js');
const sources = ['src/st-registry.js', 'src/converter.js', 'src/bridge.js', 'src/extension.js'];
writeFileSync(join(root, 'extension.js'), sources.map((file) => stripExports(read(file))).join('\n'));
console.log('Built extension.js');
