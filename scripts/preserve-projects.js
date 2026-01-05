#!/usr/bin/env node

/**
 * Copy preserved project folders into the static export directory.
 * Intended to run after `next build` (static export) to ensure existing
 * projects remain accessible on GitHub Pages.
 *
 * Usage:
 *   node scripts/preserve-projects.js
 *
 * Environment variables:
 *   OUT_DIR - Output directory (default: "out")
 */

const fs = require('fs');
const path = require('path');

// Configuration
const OUT_DIR = process.env.OUT_DIR || 'out';
const PROJECTS_TO_PRESERVE = [
  'aurelia-salat-time',
  'candidate-showcase',
  'compression',
];

/**
 * Copy a directory recursively using Node built-ins (Node 20+).
 * @param {string} src
 * @param {string} dest
 */
function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const child of fs.readdirSync(src)) {
      copyRecursive(path.join(src, child), path.join(dest, child));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

/**
 * Main: copy each preserved project folder into OUT_DIR.
 */
function main() {
  console.log(`🔧 Preserving projects to ${OUT_DIR}/`);

  // Ensure OUT_DIR exists
  if (!fs.existsSync(OUT_DIR)) {
    console.error(`❌ Output directory "${OUT_DIR}" does not exist. Run the Next.js static export first.`);
    process.exit(1);
  }

  // Copy each project
  for (const project of PROJECTS_TO_PRESERVE) {
    const src = project;
    const dest = path.join(OUT_DIR, project);

    if (!fs.existsSync(src)) {
      console.warn(`⚠️  Source project "${src}" not found; skipping.`);
      continue;
    }

    console.log(`📁 Copying ${src}/ → ${dest}/`);
    copyRecursive(src, dest);
  }

  // Ensure .nojekyll exists in OUT_DIR (GitHub Pages requirement)
  const nojekyllPath = path.join(OUT_DIR, '.nojekyll');
  if (!fs.existsSync(nojekyllPath)) {
    fs.writeFileSync(nojekyllPath, '');
    console.log('✅ Created .nojekyll in output directory.');
  }

  console.log('✅ Project preservation complete.');
}

if (require.main === module) {
  main();
}

module.exports = { copyRecursive, PROJECTS_TO_PRESERVE };
