import { readFile, mkdir, writeFile } from "node:fs/promises";
const pkg = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf8"),
);
const names = [
  "index.ts",
  "icons.tsx",
  "core.tsx",
  "motion-preference.ts",
  "controls.tsx",
  "feedback.tsx",
  "style.css",
  "typography.css",
  "legibility.css",
  "motion.css",
  "art.ts",
  "illustrations.tsx",
  "fonts.css",
  "fonts/ZCOOLKuaiLe-OFL.txt",
  "fonts/LilitaOne-OFL.txt",
  "fonts/ResourceHanRounded-OFL.txt",
];
async function contentFor(name) {
  let content = await readFile(
    new URL(`../src/${name}`, import.meta.url),
    "utf8",
  );
  if (name === "fonts.css")
    for (const font of [
      "zcool-kuaile.woff2",
      "crown-latin-display.woff2",
      "crown-rounded-sc.woff2",
    ]) {
      const encoded = (
        await readFile(new URL(`../src/fonts/${font}`, import.meta.url))
      ).toString("base64");
      content = content.replace(
        `./fonts/${font}`,
        `data:font/woff2;base64,${encoded}`,
      );
    }
  if (name === "art.ts") {
    const pattern = /import (art\d+) from ['"]\.\/assets\/([^'"]+)['"];?/g;
    const replacements = [];
    for (const match of content.matchAll(pattern)) {
      const data = await readFile(
        new URL(`../src/assets/${match[2]}`, import.meta.url),
      );
      replacements.push([
        match[0],
        `const ${match[1]} = "data:image/webp;base64,${data.toString("base64")}";`,
      ]);
    }
    for (const [from, to] of replacements) content = content.replace(from, to);
  }
  return (name.endsWith(".tsx") ? '"use client";\n' : "") + content;
}
const item = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "crown-ui",
  type: "registry:block",
  title: "Crown UI",
  description:
    "Original European cartoon React UI kit: components, game cards, level nodes and feedback.",
  dependencies: ["react@>=18", "react-dom@>=18"],
  files: await Promise.all(
    names.map(async (name) => ({
      path: `src/${name}`,
      type: "registry:file",
      target: `components/crown-ui/${name}`,
      content: await contentFor(name),
    })),
  ),
};
await mkdir(new URL("../public/r", import.meta.url), { recursive: true });
await writeFile(
  new URL("../public/r/crown-ui.json", import.meta.url),
  JSON.stringify(item, null, 2) + "\n",
);
await writeFile(
  new URL("../registry.json", import.meta.url),
  JSON.stringify(
    {
      $schema: "https://ui.shadcn.com/schema/registry.json",
      name: "crown-ui",
      homepage: pkg.homepage,
      items: [
        { ...item, files: item.files.map(({ content, ...file }) => file) },
      ],
    },
    null,
    2,
  ) + "\n",
);
console.log(`Registry built: ${item.files.length} source files.`);
