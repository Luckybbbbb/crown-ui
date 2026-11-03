import { readFile, access } from "node:fs/promises";

const root = new URL("../demo-dist/", import.meta.url);
const html = await readFile(new URL("index.html", root), "utf8");
const styles = [...html.matchAll(/href="([^"]+\.css)"/g)].map((m) => m[1]);
if (!styles.length) throw new Error("Demo has no stylesheet.");
const css = (await Promise.all(styles.map((path) => readFile(new URL(path, root), "utf8")))).join("\n");
// The docs can render while source-barrel tree shaking silently drops component CSS.
for (const marker of [".cr-tone-blue", ".cr-navigation-icon", "mask-size:contain", "@keyframes cr-star-slam"]) {
  if (!css.includes(marker)) throw new Error(`Missing component styles in demo: ${marker}`);
}
for (const match of html.matchAll(/(?:src|href)="(\.\/assets\/[^"]+)"/g)) {
  await access(new URL(match[1], root));
}
await access(new URL("downloads/crown-ui-react-0.1.0.tgz", root));
await access(new URL("r/crown-ui.json", root));
console.log("Verified demo entry assets, component styles, motion CSS, package and registry.");
