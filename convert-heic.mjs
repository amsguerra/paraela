import { readdir, readFile, writeFile } from "fs/promises";
import { join, extname, basename } from "path";
import { fileURLToPath } from "url";
import convert from "heic-convert";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const imgs = join(__dirname, "imgs");

const files = await readdir(imgs);
const heicFiles = files.filter(
  (f) => [".heic", ".HEIC"].includes(extname(f))
);

for (const name of heicFiles) {
  const inputPath = join(imgs, name);
  const outName = `${basename(name, extname(name))}.jpg`;
  const outputPath = join(imgs, outName);

  const buffer = await readFile(inputPath);
  const jpg = await convert({
    buffer,
    format: "JPEG",
    quality: 0.92
  });
  const out = Buffer.isBuffer(jpg) ? jpg : Buffer.from(jpg);
  await writeFile(outputPath, out);
  console.log("OK:", name, "->", outName);
}

console.log("Done. Converted", heicFiles.length, "file(s).");
