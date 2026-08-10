import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const targets = ["public/logo.svg"];
const ogFiles = await readdir("public/og");

for (const file of ogFiles) {
  if (file.endsWith(".svg")) targets.push(path.join("public/og", file));
}

for (const input of targets) {
  const output = input.replace(/\.svg$/, ".png");
  await sharp(input).png().toFile(output);
  console.log(`${input} -> ${output}`);
}
