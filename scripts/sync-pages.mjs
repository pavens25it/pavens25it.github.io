import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "out");

if (!fs.existsSync(outDir)) {
  console.error("Missing out/ directory. Run `npm run build` first.");
  process.exit(1);
}

// Clean previously exported root artifacts before copying fresh build
const managedEntries = [
  "_next",
  "projects",
  "pictures",
  "404",
  "404.html",
  "index.html",
  "index.txt",
  "icon.svg",
  ".nojekyll",
];

for (const entry of managedEntries) {
  const target = path.join(root, entry);
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
  }
}

for (const entry of fs.readdirSync(outDir)) {
  const src = path.join(outDir, entry);
  const dest = path.join(root, entry);
  fs.cpSync(src, dest, { recursive: true });
}

console.log("Synced static export from out/ to repository root for GitHub Pages.");
