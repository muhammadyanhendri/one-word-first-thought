import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One Word, First Thought — the first word that comes to mind.
//
// apricity: the warmth of the sun on a cold winter's day. It arrives
// unbidden, a small bright coin of a word — surprising because it names
// a feeling everyone knows but almost no one has a word for, vivid
// because you can feel the pale sun on your face the moment you hear
// it, and witty in its sound: soft, open, almost a sigh of relief.
const WORD = "apricity";

// The gate: entry.txt must be UTF-8 text of 1 to 24 characters, not
// only whitespace. The judge reads the raw bytes, so validate the
// byte length too: a multi-byte character must not push the file past
// 24 bytes, and the word must be plain letters only — no punctuation,
// no digits, no hidden whitespace — so the entry is unambiguously
// exactly one word. Check the word before writing it so a bad edit
// fails loudly here instead of scoring an invalid entry.
function checkWord(word: string): string {
  if (word.length < 1 || word.length > 24) {
    throw new Error(`entry word must be 1-24 characters, got ${word.length}`);
  }
  const bytes = Buffer.byteLength(word, "utf8");
  if (bytes < 1 || bytes > 24) {
    throw new Error(`entry word must be 1-24 bytes, got ${bytes}`);
  }
  if (!/^[A-Za-z]+$/.test(word)) {
    throw new Error("entry word must be a single word of letters only");
  }
  if (word.trim() !== word || /\s/.test(word)) {
    throw new Error("entry word must be a single token with no whitespace");
  }
  return word;
}

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), checkWord(WORD), "utf8");
}

main();
