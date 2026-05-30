import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");

const deployEntries = [
  "index.html",
  "about",
  "assets",
  "contact",
  "data",
  "products",
  "resources",
  "series",
  "script.js",
  "styles.css"
];

async function exists(target) {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}

async function copyEntry(entry) {
  const source = path.join(root, entry);
  const target = path.join(publicDir, entry);

  if (!(await exists(source))) {
    return;
  }

  await fs.cp(source, target, {
    recursive: true,
    force: true,
    filter: (sourcePath) => {
      const normalized = sourcePath.replaceAll("\\", "/");
      return !normalized.includes("/.git/")
        && !normalized.includes("/node_modules/")
        && !normalized.includes("/picture/")
        && !normalized.includes("/product picture/")
        && !normalized.includes("/.edge-profile");
    }
  });
}

await import("./generate-site.mjs");
await fs.rm(publicDir, { recursive: true, force: true });
await fs.mkdir(publicDir, { recursive: true });

for (const entry of deployEntries) {
  await copyEntry(entry);
}

console.log(`Built Cloudflare Pages output in ${path.relative(root, publicDir)}/`);
