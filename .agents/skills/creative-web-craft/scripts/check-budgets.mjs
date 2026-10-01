#!/usr/bin/env node

import { readFile } from "node:fs/promises";

const inputPath = process.argv[2];

if (!inputPath || process.argv.includes("--help")) {
  console.log("Usage: node check-budgets.mjs <metrics.json>");
  console.log("Fields: lcpMs, inpMs, cls, droppedFramesPct, recurringLoafCount");
  process.exit(inputPath ? 0 : 2);
}

const limits = {
  lcpMs: { max: 2500, required: true },
  inpMs: { max: 200, required: true },
  cls: { max: 0.1, required: true },
  droppedFramesPct: { max: 2, required: false },
  recurringLoafCount: { max: 0, required: false }
};

let metrics;
try {
  metrics = JSON.parse(await readFile(inputPath, "utf8"));
} catch (error) {
  console.error("Could not read metrics JSON:", error.message);
  process.exit(2);
}

const results = [];
let failed = false;

for (const [name, rule] of Object.entries(limits)) {
  const value = metrics[name];

  if (value === undefined) {
    const status = rule.required ? "FAIL" : "SKIP";
    results.push({ name, status, value: null, max: rule.max });
    failed ||= rule.required;
    continue;
  }

  const numeric = Number(value);
  const pass = Number.isFinite(numeric) && numeric <= rule.max;
  results.push({ name, status: pass ? "PASS" : "FAIL", value: numeric, max: rule.max });
  failed ||= !pass;
}

console.table(results);
process.exit(failed ? 1 : 0);

