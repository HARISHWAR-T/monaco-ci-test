const { globSync } = require("glob");
const { spawn } = require("child_process");
const path = require("path");

// Script runs from repo root via "cd website && node scripts/..."
// So process.cwd() = /home/runner/work/monaco-ci-test/monaco-ci-test/website
// We need to go up one level to reach src/
const repoRoot = path.resolve(process.cwd(), "..");

console.log("[*] CWD:", process.cwd());
console.log("[*] Repo root:", repoRoot);

const pattern = "src/website/data/playground-samples/*/*/*.js";
const files = globSync(pattern, { cwd: repoRoot });

console.log("[*] Files found:", files.length);
console.log("[*] Files:", JSON.stringify(files));

for (const file of files) {
    const fullPath = path.join(repoRoot, file);
    console.log(`[CHECK] Processing: ${fullPath}`);
    const proc = spawn(
        "bash",
        ["-c", `echo checking ${fullPath}`],
        { shell: true }
    );
    proc.stdout.on("data", (d) => process.stdout.write(d));
    proc.stderr.on("data", (d) => process.stderr.write(d));
}
