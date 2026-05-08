const { globSync } = require("glob");
const { spawn } = require("child_process");
const path = require("path");

// Go up one level from website/ to repo root, then find samples
const files = globSync("../src/website/data/playground-samples/*/*/*.js", {
    cwd: __dirname
});

console.log("[*] Files found:", files.length);
console.log("[*] Files:", files);

for (const file of files) {
    console.log(`[CHECK] Processing: ${file}`);
    const proc = spawn(
        "bash",
        ["-c", `echo checking ${file}`],
        { shell: true }
    );
    proc.stdout.on("data", (d) => console.log(d.toString()));
    proc.stderr.on("data", (d) => console.error(d.toString()));
}
