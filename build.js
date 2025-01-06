import * as dts from "dts-bundle-generator"
import * as esbuild from "esbuild";
import { writeFile } from "node:fs/promises";

const args = process.argv.slice(2)

const VERSION = "0.0.1"

const name = (n) => `blackberry.${n}@${VERSION}`

if(args.includes("src")) {
  esbuild.build({
    outdir: "dist",
    entryPoints: [
      {in: "builds/alpine.ts", out: name("alpine")},
      {in: "builds/element.ts", out: name("element")},
      {in: "builds/logo.ts", out: name("logo")},
    ],
    bundle: true,
    minify: true,
    format: "esm",
    platform: "browser",
    target: ["es2022"],
  })
}

if (args.includes("types")) {

  const alpineTypes = dts.generateDtsBundle([
      {filePath: "builds/alpine.ts"},
    ]).join("\n")

  const elementTypes = dts.generateDtsBundle([
      {filePath: "builds/element.ts"},
    ]).join("\n")

  const logoTypes = dts.generateDtsBundle([
      {filePath: "builds/logo.ts"},
    ]).join("\n")

  await writeFile(`dist/${name("alpine")}.d.ts`, alpineTypes)
  await writeFile(`dist/${name("element")}.d.ts`, elementTypes)
  await writeFile(`dist/${name("logo")}.d.ts`, logoTypes)
}
