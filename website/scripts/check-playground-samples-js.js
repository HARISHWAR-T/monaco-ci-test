const { globSync } = require("glob");
const { spawn } = require("child_process");

const files = globSync("src/website/data/playground-samples/*/*/*.js");

console.log("[*] Files found:", files.length);

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
