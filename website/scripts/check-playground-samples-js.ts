import { globSync } from "glob";
import { spawn } from "child_process";

const files = globSync("src/website/data/playground-samples/*/*/*.js");

for (const file of files) {
    console.log(`[CHECK] Processing: ${file}`);
    const proc = spawn(
        "yarn",
        ["tsc", "--noEmit", "--allowJs", "--checkJs", file],
        { shell: true }
    );
    proc.stderr.on("data", (d) => console.error(d.toString()));
}
