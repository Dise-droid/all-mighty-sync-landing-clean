// Minifies the hand-written JS files for production. Source files in js/
// stay readable; this generates js/<name>.min.js alongside them.
// Run with: node build/minify.js

const { execSync } = require("child_process");
const path = require("path");

const FILES = ["i18n.js", "industry.js", "consent.js", "script.js", "ga-config.js"];
const JS_DIR = path.join(__dirname, "..", "js");

for (const file of FILES) {
  const src = path.join(JS_DIR, file);
  const out = path.join(JS_DIR, file.replace(/\.js$/, ".min.js"));
  execSync(`npx --yes terser "${src}" --compress --mangle -o "${out}"`, { stdio: "inherit" });
}

console.log(`Minified ${FILES.length} files.`);
