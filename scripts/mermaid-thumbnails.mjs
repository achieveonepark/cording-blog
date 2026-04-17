/**
 * Design Pattern 포스트의 mermaid 블록을 추출해 SVG 썸네일로 렌더링합니다.
 * npx @mermaid-js/mermaid-cli 사용
 */
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { tmpdir } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'public/images/thumbnails');
mkdirSync(outDir, { recursive: true });

function walk(dir) {
  const files = [];
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) files.push(...walk(p));
    else if (f.endsWith('.md') && !f.endsWith('.en.md')) files.push(p);
  }
  return files;
}

function extractMermaid(content) {
  const m = content.match(/```mermaid\n([\s\S]*?)```/);
  return m ? m[1].trim() : null;
}

function fileToSlug(filePath) {
  // src/content/blog/DesignPattern/go-f/creational/singleton.md
  // → designpattern-go-f-creational-singleton
  return filePath
    .replace(/.*DesignPattern\//, '')
    .replace(/\.md$/, '')
    .replace(/\//g, '-')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-');
}

// mermaid config: dark theme matching the blog
const mermaidConfig = {
  theme: 'dark',
  themeVariables: {
    background: '#06090d',
    mainBkg: '#0e1820',
    nodeBorder: '#7cff7a',
    clusterBkg: '#0b1018',
    titleColor: '#f0f4f8',
    edgeLabelBackground: '#0a0f14',
    lineColor: '#7cff7a',
    primaryColor: '#0e1820',
    primaryTextColor: '#e8f5e8',
    primaryBorderColor: '#7cff7a',
    secondaryColor: '#0b1418',
    tertiaryColor: '#0e1820',
    fontFamily: 'ui-monospace, SFMono-Regular, Consolas, monospace',
    fontSize: '14px',
  },
};

const configPath = join(tmpdir(), 'mermaid-config.json');
writeFileSync(configPath, JSON.stringify(mermaidConfig));

const files = walk(join(root, 'src/content/blog/DesignPattern'));
let success = 0, skip = 0;

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  const mermaidSrc = extractMermaid(content);
  if (!mermaidSrc) { skip++; console.log(`⚠ skip (no mermaid): ${file}`); continue; }

  const slug = fileToSlug(file);
  const outSvg = join(outDir, `${slug}.svg`);
  const tmpInput = join(tmpdir(), `${slug}.mmd`);

  writeFileSync(tmpInput, mermaidSrc);

  try {
    execSync(
      `npx --yes @mermaid-js/mermaid-cli -i "${tmpInput}" -o "${outSvg}" -c "${configPath}" -b transparent --quiet`,
      { stdio: 'pipe' }
    );
    console.log(`✓ ${slug}.svg`);
    success++;
  } catch (e) {
    console.error(`✗ ${slug}: ${e.stderr?.toString().slice(0, 120)}`);
  }
}

console.log(`\n✅ ${success} rendered, ${skip} skipped`);
