import { afterAll, beforeAll, expect, test } from 'vitest';
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';
// @ts-expect-error plain .mjs helper without types
import { createStaticServer } from '../../scripts/static-server.mjs';

let server: Server;
let base: string;

beforeAll(async () => {
  const parent = mkdtempSync(join(tmpdir(), 'static-'));
  const root = join(parent, 'dist-site');
  mkdirSync(root);
  mkdirSync(join(parent, 'dist-site-x'));
  writeFileSync(join(root, 'index.html'), 'ok');
  writeFileSync(join(parent, 'dist-site-x', 'secret.txt'), 'secret');
  server = createStaticServer(root);
  await new Promise<void>((r) => server.listen(0, '127.0.0.1', r));
  base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});
afterAll(() => new Promise((r) => server.close(r)));

const get = (path: string) => fetch(base + path).then((r) => r.status);

test('serves index', async () => expect(await get('/')).toBe(200));
test('malformed URL gets 400 and server survives', async () => {
  expect(await get('/%E0%A4%A')).toBe(400);
  expect(await get('/')).toBe(200);
});
test('traversal and sibling-dir paths are refused', async () => {
  const raw = (p: string) =>
    new Promise<number>((resolve) => {
      import('node:http').then(({ request }) => {
        const u = new URL(base);
        request({ host: u.hostname, port: u.port, path: p }, (res) => resolve(res.statusCode!)).end();
      });
    });
  expect([403, 404]).toContain(await raw('/../package.json')); // URL parser collapses it to /package.json
  expect([403, 404]).toContain(await raw('/%2e%2e/dist-site-x/secret.txt'));
  expect(await raw('/..%2fdist-site-x/secret.txt')).toBe(403);
});
