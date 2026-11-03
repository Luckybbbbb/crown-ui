import { mkdir } from "node:fs/promises";
import { spawnSync } from "node:child_process";
await mkdir(new URL("../public/downloads", import.meta.url), {
  recursive: true,
});
const npmCli=process.env.npm_execpath;
if(!npmCli)throw new Error('Run packaging through npm run build:demo.');
const result=spawnSync(process.execPath,[npmCli,'pack','--pack-destination','public/downloads'],{stdio:'inherit'});
process.exitCode = result.status ?? 1;
