import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '../public/images/thumbnails');

// ── 서브카테고리별 악센트 컬러 ──
const accents = {
  'Creational':        { primary: '#7cff7a', dim: '#3a7a39' },
  'Behavioral':        { primary: '#6ee7b7', dim: '#2d6b55' },
  'Structural':        { primary: '#93c5fd', dim: '#3b5f8a' },
  'Game Programming':  { primary: '#c4b5fd', dim: '#5b4a8a' },
  'Unity Package':     { primary: '#67e8f9', dim: '#2a6f7a' },
};

function generateSVG({ title, badge, sub, accent, seed }) {
  const { primary, dim } = accent;

  // 시드 기반 간단한 해시로 패턴 변형
  let h = 0;
  for (const c of seed) h = ((h << 5) - h + c.charCodeAt(0)) | 0;
  const a = Math.abs(h);

  // 배경 도트 패턴 위치 (시드 기반)
  const dots = Array.from({ length: 24 }, (_, i) => {
    const x = 60 + ((a * (i + 1) * 97) % 1080);
    const y = 60 + ((a * (i + 1) * 53) % 510);
    const r = 1 + ((a * (i + 1)) % 3) * 0.5;
    const op = 0.06 + ((a * (i + 1)) % 5) * 0.02;
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="${primary}" opacity="${op}"/>`;
  }).join('\n    ');

  // 우측 장식: 겹친 원 + 선
  const cx = 980, cy = 260;
  const deco = `
    <circle cx="${cx}" cy="${cy}" r="120" fill="none" stroke="${primary}" stroke-opacity="0.06" stroke-width="1"/>
    <circle cx="${cx}" cy="${cy}" r="80" fill="none" stroke="${primary}" stroke-opacity="0.09" stroke-width="1"/>
    <circle cx="${cx}" cy="${cy}" r="40" fill="none" stroke="${primary}" stroke-opacity="0.14" stroke-width="1"/>
    <circle cx="${cx}" cy="${cy}" r="6" fill="${primary}" opacity="0.2"/>
    <line x1="${cx - 120}" y1="${cy}" x2="${cx - 44}" y2="${cy}" stroke="${primary}" stroke-opacity="0.08" stroke-width="1"/>
    <line x1="${cx}" y1="${cy - 120}" x2="${cx}" y2="${cy - 44}" stroke="${primary}" stroke-opacity="0.08" stroke-width="1"/>`;

  // 타이틀이 길면 폰트 줄이기
  const fontSize = title.length > 16 ? 56 : title.length > 12 ? 64 : 72;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#06090d"/>
      <stop offset="100%" stop-color="#0a1018"/>
    </linearGradient>
  </defs>

  <!-- 배경 -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- 도트 패턴 -->
  <g>
    ${dots}
  </g>

  <!-- 테두리 -->
  <rect x="40" y="40" width="1120" height="550" rx="24" fill="none" stroke="${primary}" stroke-opacity="0.08" stroke-width="1"/>

  <!-- 상단 악센트 라인 -->
  <line x1="90" y1="40" x2="400" y2="40" stroke="${primary}" stroke-opacity="0.4" stroke-width="2"/>

  <!-- 뱃지 -->
  <rect x="90" y="90" rx="14" width="${badge.length * 11 + 28}" height="30" fill="${primary}" fill-opacity="0.08" stroke="${primary}" stroke-opacity="0.2" stroke-width="1"/>
  <text x="104" y="110" fill="${primary}" font-size="13" font-weight="600" font-family="'SF Mono','SFMono-Regular',Consolas,'Liberation Mono',monospace" letter-spacing="1.8">${badge}</text>

  <!-- 서브카테고리 -->
  <text x="92" y="166" fill="${primary}" fill-opacity="0.35" font-size="15" font-weight="500" font-family="'SF Mono','SFMono-Regular',Consolas,monospace" letter-spacing="1">${sub}</text>

  <!-- 구분선 -->
  <line x1="90" y1="186" x2="500" y2="186" stroke="${primary}" stroke-opacity="0.12" stroke-width="1"/>

  <!-- 타이틀 -->
  <text x="90" y="${fontSize > 60 ? 290 : 300}" fill="#f0f4f8" font-size="${fontSize}" font-weight="800" font-family="'Pretendard','Segoe UI',system-ui,sans-serif" letter-spacing="-1.5">${title}</text>

  <!-- 하단 경로 -->
  <text x="92" y="520" fill="${primary}" fill-opacity="0.25" font-size="14" font-family="'SF Mono','SFMono-Regular',Consolas,monospace" letter-spacing="1.5">somblog</text>

  <!-- 우측 장식 -->
  ${deco}
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
      badge: 'DESIGN PATTERN',
      sub: `GoF · ${subLabels[sub]}`,
      accent: accents[subLabels[sub]],
      seed: name,
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
    badge: 'DESIGN PATTERN',
    sub: 'Game Programming',
    accent: accents['Game Programming'],
    seed: name,
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
    badge: 'UNITY PACKAGE',
    sub: 'Package',
    accent: accents['Unity Package'],
    seed: pkg.name,
  });
  writeFileSync(resolve(outDir, filename), svg);
  console.log(`✓ ${filename}`);
}

console.log(`\n✅ Done — ${39} thumbnails generated`);
