// Generates self-contained SVG placeholder images in the VECXORA palette
// (orange #FF6400 / noir #080808 — voir la charte graphique).
import { writeFileSync, mkdirSync } from 'fs'

mkdirSync('public/img', { recursive: true })

// Rich set — hero and service cards, where the artwork carries the section.
const palettes = [
  ['#121212', '#c24000', '#ff7f2a'],
  ['#080808', '#8f3300', '#ff9c5c'],
  ['#121212', '#ff6400', '#ff7f2a'],
  ['#0a0a0a', '#a03a00', '#ff8c3d'],
  ['#121212', '#1c1c1c', '#ff7000'],
  ['#050505', '#c24000', '#ff9c5c'],
  ['#0d0d0d', '#d14800', '#ff7f2a'],
]

// Muted set — bento tiles, which sit behind copy and must stay near-black.
const darkPalettes = [
  ['#050505', '#141210', '#3a1a06'],
  ['#080808', '#12100e', '#4a2208'],
  ['#050505', '#171310', '#331705'],
  ['#0a0a0a', '#141110', '#42200a'],
]

function svg(w, h, [dark, mid, bright], seed, motif, focus = ['30%', '25%']) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <radialGradient id="g" cx="${focus[0]}" cy="${focus[1]}" r="90%">
      <stop offset="0%" stop-color="${bright}"/>
      <stop offset="45%" stop-color="${mid}"/>
      <stop offset="100%" stop-color="${dark}"/>
    </radialGradient>
    <linearGradient id="l" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${mid}" stop-opacity="0.0"/>
      <stop offset="100%" stop-color="${dark}" stop-opacity="0.9"/>
    </linearGradient>
    <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="${(Math.min(w, h) * 0.18).toFixed(0)}"/>
    </filter>
    <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="${seed}"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.06"/></feComponentTransfer>
      <feComposite operator="over" in2="SourceGraphic"/>
    </filter>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  ${motif}
  <circle cx="${(w * parseFloat(focus[0]) / 100).toFixed(0)}" cy="${(h * parseFloat(focus[1]) / 100).toFixed(0)}" r="${(Math.min(w, h) * 0.34).toFixed(0)}" fill="#ff6400" opacity="0.16" filter="url(#blur)"/>
  <rect width="${w}" height="${h}" fill="url(#l)"/>
  <rect width="${w}" height="${h}" filter="url(#n)" opacity="0.5"/>
</svg>`
}

function blobs(w, h, [_, mid, bright], seed) {
  let s = ''
  let r = seed * 2654435761 % 2147483647
  const rand = () => ((r = (r * 48271) % 2147483647) / 2147483647)
  for (let i = 0; i < 5; i++) {
    const cx = rand() * w
    const cy = rand() * h
    const rad = (0.15 + rand() * 0.3) * Math.min(w, h)
    const col = rand() > 0.5 ? bright : mid
    s += `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${rad.toFixed(0)}" fill="${col}" opacity="${(0.12 + rand() * 0.18).toFixed(2)}"/>`
  }
  return s
}

// Hero (portrait-ish, wide). Its light sits on the right so the left stays dark
// enough for the headline, matching the hero composition.
writeFileSync(
  'public/img/hero.svg',
  svg(1400, 1500, palettes[0], 7, blobs(1400, 1500, palettes[0], 7), ['68%', '32%']),
)

// 6 service cards
for (let i = 0; i < 6; i++) {
  const p = palettes[(i + 1) % palettes.length]
  writeFileSync(
    `public/img/service-${i + 1}.svg`,
    svg(1000, 1200, p, i * 13 + 3, blobs(1000, 1200, p, i * 13 + 3)),
  )
}

// 4 bento visuals for the "difference" section — one per aspect ratio slot.
const bento = [
  ['diff-1', 1000, 1100],
  ['diff-2', 1200, 620],
  ['diff-3', 1200, 620],
  ['diff-4', 900, 1000],
]
bento.forEach(([name, w, h], i) => {
  const p = darkPalettes[i % darkPalettes.length]
  const seed = i * 17 + 5
  writeFileSync(`public/img/${name}.svg`, svg(w, h, p, seed, blobs(w, h, p, seed)))
})

console.log('placeholders generated')
