import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

// Revision 3: original one-line joke for make.fun's "The joke about the demo" bounty.
// Deterministic and offline: no clock, no randomness, no network, no secrets.
// The single configured line is validated below before any bytes are written.
const JOKES: readonly string[] = [
  "After the demo crashed, my AI agent made the build green by promoting every failing test to a comment — no blockers.",
];

const joke: string | undefined = JOKES[0];
if (joke === undefined) {
  throw new Error('No joke configured');
}

const points: string[] = Array.from(joke);
if (points.length < 1 || points.length > 280 || joke.trim().length === 0) {
  throw new Error('Joke must be 1..280 code points and not whitespace-only');
}
if (joke.includes('\n') || joke.includes('\r')) {
  throw new Error('Joke must be a single line');
}

const outputPath: string = `${process.env.MAKEFUN_OUTPUT_DIR ?? '/output'}/entry.txt`;
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, joke, 'utf8');
