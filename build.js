import * as dts from "dts-bundle-generator"
import * as esbuild from "esbuild";
import * as fs from "node:fs/promises";

let args = process.argv.slice(2)

const VERSION = "0.1.1"

let name = (n) => `${n}@${VERSION}`

let config = (c) => ({
  outdir: "dist",
  entryPoints: [
    {in: "src/mod.js", out: name(c.name)},
    {in: "src/logo.ts", out: name("logo")},
  ],
  bundle: c.bundle,
  minify: true,
  format: "esm",
  platform: "browser",
  target: ["es2022"],
  treeShaking: true,
  lineLimit: 120,
})

esbuild.build(config({name: "blackberry", bundle: true}))
esbuild.build(config({name: "blackberry.min", bundle: false}))

if(args.includes("types")) {
  let dtsFile = dts.generateDtsBundle([
    {
      filePath: "src/mod.d.ts",
      libraries: {
        inlinedLibraries: ["ivysaur"]
      }
    }
  ])

  fs.writeFile(`dist/${name("blackberry")}.d.ts`, dtsFile)
}
