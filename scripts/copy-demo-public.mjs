import { cp, mkdir, copyFile } from "node:fs/promises";
for (const dir of ["r", "downloads", "fonts"])
  await cp(
    new URL(`../public/${dir}`, import.meta.url),
    new URL(`../demo-dist/${dir}`, import.meta.url),
    { recursive: true },
  );
await mkdir(new URL("../demo-dist/art", import.meta.url), { recursive: true });
await copyFile(
  new URL("../public/art/royal-castle.png", import.meta.url),
  new URL("../demo-dist/art/royal-castle.png", import.meta.url),
);
console.log(
  "Copied public delivery files; retained original PNGs stay in the source workspace.",
);
