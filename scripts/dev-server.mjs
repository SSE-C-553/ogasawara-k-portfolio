import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { site } from "../data/site.js";

const sourceMode = process.argv.includes("--source");
const root = resolve(import.meta.dirname, "..", ...(sourceMode ? [] : ["dist"]));
const port = Number(process.env.PORTFOLIO_PORT || 8000);
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
};

const server = createServer(async (request, response) => {
  let url;
  let pathname;
  try {
    url = new URL(request.url || "/", "http://localhost");
    pathname = decodeURIComponent(url.pathname);
  } catch {
    response.writeHead(400);
    response.end("Invalid URL");
    return;
  }
  if (!sourceMode && pathname.startsWith(site.basePath)) pathname = pathname.slice(site.basePath.length);
  const filePath = resolve(root, pathname.replace(/^\/+/, "") || "index.html");
  if (!filePath.startsWith(`${root}${sep}`) && filePath !== root) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }
  try {
    const fileStats = await stat(filePath);
    if (fileStats.isDirectory() && !url.pathname.endsWith("/")) {
      response.writeHead(301, { Location: `${url.pathname}/${url.search}` });
      response.end();
      return;
    }
    const target = fileStats.isDirectory() ? resolve(filePath, "index.html") : filePath;
    response.writeHead(200, {
      "Cache-Control": "no-store",
      "Content-Type": mimeTypes[extname(target).toLowerCase()] || "application/octet-stream",
    });
    response.end(await readFile(target));
  } catch {
    try {
      const notFound = await readFile(resolve(root, "404.html"));
      response.writeHead(404, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
      response.end(notFound);
    } catch {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found. Run npm run build first.");
    }
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Portfolio ${sourceMode ? "source" : "built"} preview: http://127.0.0.1:${port}/`);
});
