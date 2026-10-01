#!/usr/bin/env node

import { access, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const args = process.argv.slice(2);
const inputPath = args[0];
const budgetFlag = args.indexOf("--budget-mib");
const budgetMiB = budgetFlag >= 0 ? Number(args[budgetFlag + 1]) : 256;

if (!inputPath || args.includes("--help")) {
  console.log("Usage: node validate-assets.mjs <asset-manifest.json> [--budget-mib 256]");
  process.exit(inputPath ? 0 : 2);
}

let manifest;
try {
  manifest = JSON.parse(await readFile(inputPath, "utf8"));
} catch (error) {
  console.error("Could not read asset manifest:", error.message);
  process.exit(2);
}

const assets = Array.isArray(manifest.assets) ? manifest.assets : [];
const ids = new Set();
const errors = [];
const warnings = [];
let decodedBytes = 0;

for (const [index, asset] of assets.entries()) {
  const label = asset.id || "asset[" + index + "]";

  if (!asset.id) errors.push(label + ": missing id");
  if (asset.id && ids.has(asset.id)) errors.push(label + ": duplicate id");
  if (asset.id) ids.add(asset.id);
  if (!asset.type) errors.push(label + ": missing type");
  if (!asset.path) errors.push(label + ": missing path");

  const width = Number(asset.width || 0);
  const height = Number(asset.height || 0);
  const frames = asset.type === "image-sequence" ? Number(asset.frameCount || 0) : 1;

  if (asset.type === "image-sequence" && frames <= 0) {
    errors.push(label + ": image-sequence requires frameCount");
  }

  if (width > 0 && height > 0 && frames > 0) {
    decodedBytes += width * height * 4 * frames;
  } else if (asset.type === "image" || asset.type === "image-sequence") {
    warnings.push(label + ": width/height missing; decoded memory not estimated");
  }

  if (asset.informative !== false && asset.type === "image" && !asset.alt) {
    warnings.push(label + ": informative image has no alt");
  }

  if (asset.status !== "planned" && asset.path) {
    const absolute = resolve(dirname(resolve(inputPath)), asset.path);
    try {
      await access(absolute);
    } catch {
      errors.push(label + ": file not found at " + absolute);
    }
  }
}

const decodedMiB = decodedBytes / 1024 / 1024;
if (decodedMiB > budgetMiB) {
  warnings.push(
    "decoded media estimate " + decodedMiB.toFixed(1) +
    " MiB exceeds " + budgetMiB + " MiB"
  );
}

console.log("Assets: " + assets.length);
console.log("Estimated decoded media: " + decodedMiB.toFixed(1) + " MiB");
warnings.forEach((warning) => console.warn("WARN:", warning));
errors.forEach((error) => console.error("ERROR:", error));
process.exit(errors.length ? 1 : 0);

