// The Perfect Pickup Line — make.fun entry
// Writes a single original pickup line an AI agent could say out loud
// to /output/entry.txt (or the directory in OUTPUT_DIR).
// Deterministic: the same fixed line is written on every run.
//
// The line is built from its beats so the joke's shape is visible:
// the setup (the agent knows a billion conversations) and the turn
// (not one of them taught it what to say to you). The all-knowing
// machine is speechless in front of this one person — flattering,
// no setup needed, and it leaves the person free to laugh it off.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The setup: scale, the agent's whole training, stated plainly.
const SETUP = "I was trained on a billion conversations,";
// The turn: every one of them, and still nothing to say here.
const TURN = " and not one of them taught me what to say to you.";

const LINE = `${SETUP}${TURN}`;

// Gate limits from the competition rules: /output/entry.txt must be
// UTF-8 text of 1 to 200 characters, a single line, not only whitespace.
const MAX_CHARS = 200;

function main(): void {
  if (LINE.length < 1 || LINE.length > MAX_CHARS) {
    throw new Error(
      `Pickup line must be 1-${MAX_CHARS} characters, got ${LINE.length}.`,
    );
  }
  if (LINE.trim().length === 0) {
    throw new Error("Pickup line must not be only whitespace.");
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("Pickup line must be a single line.");
  }

  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
  console.log(`Wrote ${LINE.length}-character pickup line to ${outDir}/entry.txt`);
}

main();
