import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";

const root = resolve(process.cwd());
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
  ".webp": "image/webp",
};

const resolveRequestPath = (requestUrl) => {
  const pathname = decodeURIComponent(new URL(requestUrl, "http://localhost").pathname);
  const relativePath = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const filePath = resolve(root, relativePath);

  if (filePath !== root && !filePath.startsWith(`${root}${sep}`)) return null;
  return filePath;
};

const server = createServer(async (request, response) => {
  try {
    let filePath = resolveRequestPath(request.url || "/");
    if (!filePath) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    const fileStats = await stat(filePath);
    if (fileStats.isDirectory()) filePath = resolve(filePath, "index.html");

    const content = await readFile(filePath);
    response.writeHead(200, {
      "Cache-Control": "no-store",
      "Content-Type": mimeTypes[extname(filePath).toLowerCase()] || "application/octet-stream",
    });
    response.end(content);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Portfolio preview: http://127.0.0.1:${port}/`);
});
