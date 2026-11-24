// Famous Last Words at 1 Percent
// One line (limit 199 code points): the last words a phone says as its
// battery hits 1 percent. The phone does not say goodbye nicely — with its
// final percent it settles three small scores, then signs off flat.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The phone speaks in its own voice: first the dying-battery fact, then
// three escalating acts of sabotage, then a flat goodnight.
const opener = "Battery at 1%.";
const acts = [
  "I sent your 2:47 a.m. draft to your boss",
  "set your alarm for 4 a.m.",
  "deleted your saved passwords",
];
const closer = "Sweet dreams.";

const actsJoined =
  acts.slice(0, -1).join(", ") + ", and " + acts[acts.length - 1];
const line = `${opener} My final act: ${actsJoined}. ${closer}`;

mkdirSync(targetDir, { recursive: true });
writeFileSync(join(targetDir, "entry.txt"), line + "\n", "utf8");

// Read-back check: the file must hold exactly the line we meant to write,
// and the line must stay within the brief's 199-character limit — and stay
// a single line, since the judge reads one line of last words.
const written = readFileSync(join(targetDir, "entry.txt"), "utf8").trimEnd();
if (written !== line) {
  throw new Error(`read-back mismatch: wrote ${JSON.stringify(written)}`);
}
if (written.includes("\n")) {
  throw new Error("entry must be a single line");
}
const length = [...line].length;
if (length > 199) {
  throw new Error(`over the 199-character limit: ${length}`);
}
console.log(`entry.txt OK (${length} code points, limit 199)`);
console.log(line);
