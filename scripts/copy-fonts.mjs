import { mkdir, copyFile } from "node:fs/promises";
await mkdir(new URL("../dist/fonts", import.meta.url), { recursive: true });
for (const name of [
  "zcool-kuaile.woff2",
  "crown-latin-display.woff2",
  "crown-rounded-sc.woff2",
  "ZCOOLKuaiLe-OFL.txt",
  "LilitaOne-OFL.txt",
  "ResourceHanRounded-OFL.txt",
]) {
  await copyFile(
    new URL(`../src/fonts/${name}`, import.meta.url),
    new URL(`../dist/fonts/${name}`, import.meta.url),
  );
}
await copyFile(
  new URL("../src/fonts.css", import.meta.url),
  new URL("../dist/fonts.css", import.meta.url),
);
