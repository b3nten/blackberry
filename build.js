import * as dts from "dts-bundle-generator"
import * as esbuild from "esbuild";
import { writeFile } from "node:fs/promises";

const args = process.argv.slice(2)

const VERSION = "0.0.1"

const name = (n) => `${n}@${VERSION}`

if(args.includes("src")) {
  esbuild.build({
    outdir: "dist",
    entryPoints: [
      {in: "builds/blackberry.ts", out: name("blackberry")},
      {in: "builds/logo.ts", out: name("logo")},
    ],
    bundle: true,
    minify: false,
    format: "esm",
    platform: "browser",
    target: ["es2022"],
  })
}

if (args.includes("types")) {

  const blackberryTypes = dts.generateDtsBundle([
      {filePath: "builds/blackberry.ts"},
    ]).join("\n")

  const logoTypes = dts.generateDtsBundle([
      {filePath: "builds/logo.ts"},
    ]).join("\n")

  await writeFile(`dist/${name("blackberry")}.d.ts`, blackberryTypes)
  await writeFile(`dist/${name("logo")}.d.ts`, logoTypes)
}
