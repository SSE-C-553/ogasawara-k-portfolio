import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import { join, relative, resolve } from "node:path";
import { site } from "../data/site.js";

const root = resolve(import.meta.dirname, "..", "dist");
const htmlFiles = [];
const walk = async (directory) => {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await walk(path);
    else {
      assert.ok(!/\.(md|mjs|toml)$/.test(entry.name), `Internal file in build: ${path}`);
      if (entry.name.endsWith(".html")) htmlFiles.push(path);
    }
  }
};
await walk(root);
assert.equal(htmlFiles.length, 29, "Expected 28 localized pages and a 404 page");
const canonicals = new Set();
for (const path of htmlFiles) {
  const html = await readFile(path, "utf8");
  assert.ok(!html.startsWith("\uFEFF") && !html.includes("\r"), `Encoding: ${path}`);
  assert.match(html, /<main\b[\s\S]*<h1\b/);
  assert.match(html, /application\/ld\+json/);
  assert.doesNotMatch(html, /roi-corner|scan-overlay/);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)[1];
  if (path !== join(root, "404.html")) {
    assert.ok(!canonicals.has(canonical), `Duplicate canonical: ${path}`);
    assert.ok(canonical.startsWith(site.url));
    canonicals.add(canonical);
  } else assert.match(html, /name="robots" content="noindex, follow"/);
  const baseHref = html.match(/<base href="([^"]+)"/)[1];
  const entryURL = new URL(relative(root, path).replaceAll("\\", "/"), site.url);
  const baseURL = new URL(baseHref, entryURL);
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value = match[1].replaceAll("&amp;", "&");
    if (value.startsWith("mailto:") || value.startsWith("#")) continue;
    const url = new URL(value, baseURL);
    if (url.origin !== new URL(site.url).origin || !url.pathname.startsWith(site.basePath)) continue;
    const assetPath = decodeURIComponent(url.pathname.slice(site.basePath.length));
    if (path === join(root, "404.html") && /not-found/.test(assetPath)) continue;
    const target = resolve(root, assetPath, ...(url.pathname.endsWith("/") ? ["index.html"] : []));
    await access(target).catch(() => { throw new Error(`Broken built link ${value} in ${path}`); });
  }
  const image = html.match(/property="og:image" content="([^"]+)"/)[1];
  await access(resolve(root, new URL(image).pathname.slice(site.basePath.length)));
}
assert.equal(canonicals.size, 28);
assert.equal((await readFile(join(root, "sitemap.xml"), "utf8")).match(/<loc>/g).length, 28);
for (const file of ["README.md", "BIOGRAPHY.md", "package.json", ".git", ".github", "scripts", "tests", ".codex-remote-attachments"]) {
  await assert.rejects(access(join(root, file)), `Private build input leaked: ${file}`);
}
console.log("Build verified: 28 localized pages, metadata, images, internal links, 404 and public-file isolation.");
