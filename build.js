import * as dts from "dts-bundle-generator"
import * as esbuild from "esbuild";
import * as fs from "node:fs/promises";

const args = process.argv.slice(2)

const VERSION = "0.0.1"

const name = (n) => `${n}@${VERSION}`

esbuild.build({
  outdir: "dist",
  entryPoints: [
    {in: "src/mod.js", out: name("blackberry")},
    {in: "src/logo.ts", out: name("logo")},
  ],
  bundle: true,
  minify: true,
  format: "esm",
  platform: "browser",
  target: ["es2022"],
  treeShaking: true,
  lineLimit: 120,
})

let types = await fs.readFile("include/ivysaur@1.0.0.d.ts", "utf-8")
await fs.writeFile("dist/blackberry.d.ts", types + "\n" + 'declare let mod: () => void; export default mod;')
