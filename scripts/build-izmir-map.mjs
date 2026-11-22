// Builds src/assets/izmir-ilceler.svg from district boundary data.
//
// Source:      geoBoundaries gbOpen, Turkey ADM2 (districts), simplified GeoJSON, pinned commit 9469f09
//              https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/TUR/ADM2/geoBoundaries-TUR-ADM2_simplified.geojson
// Metadata:    https://www.geoboundaries.org/api/current/gbOpen/TUR/ADM2/ (checked 2026-11-22), which states:
//                boundarySource:    "OpenStreetMap, OSM Boundaries"
//                boundarySourceURL: "osm-boundaries.com"
//                boundaryLicense:   "Open Data Commons Open Database License 1.0"
//                licenseSource:     "www.openstreetmap.org/copyright"
//                boundaryYearRepresented: "2021"
// Licence:     ODbL 1.0 (data derived from OpenStreetMap)
// Attribution: ODbL requires crediting OpenStreetMap contributors. The page shows
//              "© OpenStreetMap katkıda bulunanlar" linking to https://www.openstreetmap.org/copyright
//
// The GeoJSON is treated as data only and is never committed. Download it into an
// empty folder outside src/ and pass its path:
//   node scripts/build-izmir-map.mjs path/to/geoBoundaries-TUR-ADM2_simplified.geojson
//
// The file holds all of Turkey with no province field, so the 30 İzmir districts
// are picked by name plus a bounding box around the province.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Plain Node cannot import the extensionless TS modules, so read the district list as text.
const ilceSource = readFileSync(fileURLToPath(new URL('../src/data/ilceler.ts', import.meta.url)), 'utf8');
const ilceler = [...ilceSource.matchAll(/name: ["']([^"']+)["'],\s*slug: ["']([^"']+)["']/g)].map((m) => ({ name: m[1], slug: m[2] }));
if (ilceler.length !== 30) throw new Error(`expected 30 districts, found ${ilceler.length}`);

const input = process.argv[2];
if (!input) {
  console.error('usage: node scripts/build-izmir-map.mjs <geoBoundaries-TUR-ADM2.geojson>');
  process.exit(1);
}

const TR = { ç: 'c', ğ: 'g', ı: 'i', İ: 'i', ö: 'o', ş: 's', ü: 'u' };
const slugify = (n) => n.replace(/[Iİ]/g, (c) => (c === 'I' ? 'i' : 'i')).toLowerCase().replace(/[çğıöşü]/g, (c) => TR[c]).replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const BBOX = { minLon: 26.1, maxLon: 28.5, minLat: 37.8, maxLat: 39.4 };
const TOLERANCE = 0.0016; // degrees, Douglas-Peucker
const MIN_RING_AREA = 0.00004; // square degrees; drops specks
const WIDTH = 1000;

const wanted = new Map(ilceler.map((i) => [i.slug, i.name]));
const geo = JSON.parse(readFileSync(input, 'utf8'));

function* points(c) {
  if (typeof c[0] === 'number') yield c;
  else for (const x of c) yield* points(x);
}

function centroidOf(coords) {
  let sx = 0, sy = 0, n = 0;
  for (const [x, y] of points(coords)) { sx += x; sy += y; n++; }
  return [sx / n, sy / n];
}

const found = new Map();
for (const f of geo.features) {
  const slug = slugify(f.properties.shapeName);
  if (!wanted.has(slug)) continue;
  const [cx, cy] = centroidOf(f.geometry.coordinates);
  if (cx < BBOX.minLon || cx > BBOX.maxLon || cy < BBOX.minLat || cy > BBOX.maxLat) continue;
  if (found.has(slug)) throw new Error(`duplicate match for ${slug}`);
  found.set(slug, f);
}
const missing = [...wanted.keys()].filter((s) => !found.has(s));
if (missing.length) throw new Error(`missing districts: ${missing.join(', ')}`);

function dp(pts, tol) {
  if (pts.length < 3) return pts;
  const keep = new Uint8Array(pts.length);
  keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    let max = 0, idx = -1;
    const [ax, ay] = pts[a], [bx, by] = pts[b];
    const dx = bx - ax, dy = by - ay, len = Math.hypot(dx, dy) || 1e-12;
    for (let i = a + 1; i < b; i++) {
      const d = Math.abs(dy * (pts[i][0] - ax) - dx * (pts[i][1] - ay)) / len;
      if (d > max) { max = d; idx = i; }
    }
    if (max > tol) { keep[idx] = 1; stack.push([a, idx], [idx, b]); }
  }
  return pts.filter((_, i) => keep[i]);
}

const ringArea = (r) => {
  let s = 0;
  for (let i = 0; i < r.length - 1; i++) s += r[i][0] * r[i + 1][1] - r[i + 1][0] * r[i][1];
  return Math.abs(s / 2);
};

const polygons = (g) => (g.type === 'Polygon' ? [g.coordinates] : g.coordinates);

let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
const shaped = [];
for (const [slug, f] of found) {
  const rings = [];
  for (const poly of polygons(f.geometry)) {
    poly.forEach((ring, i) => {
      if (i === 0 && ringArea(ring) < MIN_RING_AREA) return;
      if (i > 0 && ringArea(ring) < MIN_RING_AREA) return;
      // A closed ring has a zero-length chord, so split it at the point farthest from the start.
      let far = 1;
      for (let j = 2; j < ring.length - 1; j++) {
        if (Math.hypot(ring[j][0] - ring[0][0], ring[j][1] - ring[0][1]) > Math.hypot(ring[far][0] - ring[0][0], ring[far][1] - ring[0][1])) far = j;
      }
      const s = [...dp(ring.slice(0, far + 1), TOLERANCE), ...dp(ring.slice(far), TOLERANCE).slice(1)];
      if (s.length >= 4) rings.push(s);
    });
  }
  for (const r of rings) for (const [x, y] of r) {
    minX = Math.min(minX, x); maxX = Math.max(maxX, x);
    minY = Math.min(minY, y); maxY = Math.max(maxY, y);
  }
  shaped.push({ slug, name: wanted.get(slug), rings, centroid: centroidOf(f.geometry.coordinates) });
}

const k = Math.cos(((minY + maxY) / 2) * Math.PI / 180);
const scale = WIDTH / ((maxX - minX) * k);
const height = Math.round((maxY - minY) * scale);
const px = (x) => Math.round((x - minX) * k * scale * 10) / 10;
const py = (y) => Math.round((maxY - y) * scale * 10) / 10;

const out = [`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${height}">`];
for (const d of shaped.sort((a, b) => a.slug.localeCompare(b.slug))) {
  const path = d.rings
    .map((r) => 'M' + r.slice(0, -1).map(([x, y]) => `${px(x)} ${py(y)}`).join('L') + 'Z')
    .join('');
  const [cx, cy] = d.centroid;
  out.push(`<path data-ilce="${d.slug}" data-name="${d.name}" data-cx="${px(cx)}" data-cy="${py(cy)}" d="${path}"/>`);
}
out.push('</svg>');

const target = fileURLToPath(new URL('../src/assets/izmir-ilceler.svg', import.meta.url));
writeFileSync(target, out.join('\n') + '\n');
console.log(`wrote ${target}: ${shaped.length} districts, ${out.join('\n').length} bytes`);
