#!/usr/bin/env node
/**
 * Generates public/og-image.png — the static OpenGraph image for StreamIQ.
 * Run once: node scripts/generate-og.js
 * Requires: sharp (devDependency)
 */

const sharp = require("sharp");
const path = require("path");

const W = 1200;
const H = 630;

// Subtle grid lines
const gridLines = [];
for (let y = 45; y < H; y += 45) {
  gridLines.push(
    `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="#1A1A1A" stroke-width="1"/>`
  );
}
for (let x = 60; x < W; x += 60) {
  gridLines.push(
    `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="#1A1A1A" stroke-width="1"/>`
  );
}

// Abstract bar chart (right side decoration suggesting analytics)
const barsData = [
  { x: 940, h: 100, color: "#C9A84C" },
  { x: 980, h: 175, color: "#2A9D8F" },
  { x: 1020, h: 80, color: "#C9A84C" },
  { x: 1060, h: 230, color: "#2A9D8F" },
  { x: 1100, h: 140, color: "#C9A84C" },
  { x: 1140, h: 195, color: "#2A9D8F" },
];

const barFloor = H / 2 + 80; // baseline y
const barElements = barsData
  .map(
    (b) =>
      `<rect x="${b.x}" y="${barFloor - b.h}" width="26" height="${b.h}" fill="${b.color}" opacity="0.30" rx="3"/>`
  )
  .join("\n  ");

const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="${W}" height="${H}" fill="#0F0F0F"/>

  <!-- Subtle grid -->
  ${gridLines.join("\n  ")}

  <!-- Right-side bar chart decoration -->
  ${barElements}

  <!-- Vertical separator between text and bars -->
  <line x1="900" y1="120" x2="900" y2="${H - 120}" stroke="#2A2A2A" stroke-width="1"/>

  <!-- Gold accent bar under title -->
  <rect x="80" y="278" width="110" height="2" fill="#C9A84C" opacity="0.9"/>

  <!-- StreamIQ wordmark -->
  <text
    x="80" y="254"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="104"
    font-weight="bold"
    fill="#C9A84C"
    letter-spacing="-2">StreamIQ</text>

  <!-- Subtitle -->
  <text
    x="80" y="340"
    font-family="Arial, Helvetica, sans-serif"
    font-size="26"
    fill="#C0C0C0"
    letter-spacing="0.4">AI-Powered Analytics for OTT Streaming Platforms</text>

  <!-- By line -->
  <text
    x="80" y="400"
    font-family="Arial, Helvetica, sans-serif"
    font-size="18"
    fill="#606060"
    letter-spacing="2">by Lotus AI Lab</text>

  <!-- Bottom-left corner accent -->
  <rect x="80" y="${H - 60}" width="40" height="1" fill="#C9A84C" opacity="0.4"/>
  <rect x="80" y="${H - 60}" width="1" height="40" fill="#C9A84C" opacity="0.4"/>
</svg>
`.trim();

async function generate() {
  const outputPath = path.join(__dirname, "..", "public", "og-image.png");
  await sharp(Buffer.from(svg)).png().toFile(outputPath);
  console.log(`✓ OG image saved → ${outputPath}`);
}

generate().catch((err) => {
  console.error("Failed to generate OG image:", err);
  process.exit(1);
});
