import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '../public/images/thumbnails');

// ── 서브카테고리별 악센트 컬러 ──
const accents = {
  'Creational':        { primary: '#7cff7a' },
  'Behavioral':        { primary: '#6ee7b7' },
  'Structural':        { primary: '#93c5fd' },
  'Game Programming':  { primary: '#c4b5fd' },
  'Unity Package':     { primary: '#67e8f9' },
};

function generateSVG({ title, accent }) {
  const { primary } = accent;
  const fontSize = title.length > 20 ? 72 : title.length > 14 ? 88 : 104;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#06090d"/>
  <text x="600" y="315" text-anchor="middle" dominant-baseline="middle"
    fill="${primary}" font-size="${fontSize}" font-weight="800"
    font-family="'Pretendard','Segoe UI',system-ui,sans-serif"
    letter-spacing="-2">${title}</text>
</svg>`;
}

// ── Design Pattern: GoF ──
const gofPatterns = {
  creational: ['Singleton', 'Builder', 'Prototype', 'AbstractFactory'],
  behavioral: [
    'Command', 'Observer', 'Strategy', 'State', 'Iterator',
    'Mediator', 'Memento', 'Visitor', 'Interpreter',
    'TemplateMethod', 'ChainOfResponsibility'
  ],
  structural: [
    'Adapter', 'Bridge', 'Composite', 'Decorator',
    'Facade', 'Flyweight', 'Proxy', 'FactoryMethod'
  ],
};

const subLabels = {
  creational: 'Creational',
  behavioral: 'Behavioral',
  structural: 'Structural',
};

for (const [sub, patterns] of Object.entries(gofPatterns)) {
  for (const name of patterns) {
    const slug = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    const filename = `designpattern-go-f-${sub}-${slug}.svg`;
    const displayTitle = name.replace(/([a-z])([A-Z])/g, '$1 $2');
    const svg = generateSVG({
      title: displayTitle,
      accent: accents[subLabels[sub]],
    });
    writeFileSync(resolve(outDir, filename), svg);
    console.log(`✓ ${filename}`);
  }
}

// ── Design Pattern: Game Programming ──
const gamePatterns = [
  'Component', 'Data Locality', 'Dirty Flag', 'Event Queue',
  'Game Loop', 'Object Pool', 'Service Locator',
  'Subclass Sandbox', 'Type Object'
];

for (const name of gamePatterns) {
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  const filename = `designpattern-game-programming-${slug}.svg`;
  const svg = generateSVG({
    title: name,
    accent: accents['Game Programming'],
  });
  writeFileSync(resolve(outDir, filename), svg);
  console.log(`✓ ${filename}`);
}

// ── Packages ──
const packages = [
  { name: 'BreezeIAP', slug: 'breeze-iap' },
  { name: 'Data Protector', slug: 'data-protector' },
  { name: 'Game Framework', slug: 'game-framework' },
  { name: 'Infinity Value', slug: 'infinity-value' },
  { name: 'LiteDB', slug: 'lite-db' },
  { name: 'QuickSave', slug: 'quick-save' },
  { name: 'Smart Addressables', slug: 'smart-addresssables' },
];

for (const pkg of packages) {
  const filename = `packages-${pkg.slug}.svg`;
  const svg = generateSVG({
    title: pkg.name,
    accent: accents['Unity Package'],
  });
  writeFileSync(resolve(outDir, filename), svg);
  console.log(`✓ ${filename}`);
}

console.log(`\n✅ Done — ${39} thumbnails generated`);
