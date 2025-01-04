package main

import (
	"flag"
	"log"
	"net/http"
	"os"

	"github.com/evanw/esbuild/pkg/api"
)

func serve() {
	http.Handle("/", http.FileServer(http.Dir(".")))
	log.Printf("Serving on HTTP port: 8000")
	log.Fatal(http.ListenAndServe(":"+"8000", nil))
}

func build() {
	result := api.Build(api.BuildOptions{
		EntryPointsAdvanced: []api.EntryPoint{
			{InputPath: "src/blackberry.js", OutputPath: "blackberry@0.1.0.min"},
			{InputPath: "src/bundle.js", OutputPath: "blackberry@0.1.0.bundle"},
		},
		Bundle:           true,
		Outdir:           "dist",
		Write:            true,
		MinifyWhitespace: true,
		MinifySyntax:     true,
		Format:           api.FormatESModule,
		KeepNames:        true,
		Sourcemap: api.SourceMapNone,
	})

	if len(result.Errors) != 0 {
		os.Stderr.WriteString("Build failed with errors:\n")
		for _, msg := range result.Errors {
			os.Stderr.WriteString(msg.Text + "\n")
		}
		os.Exit(1)
	} else {
		os.Stdout.WriteString("Build succeeded\n")
	}
}

func main() {
	mode := flag.String("m", "serve", "mode to run in")
	flag.Parse()

	if *mode == "serve" {
		serve()
	} else if *mode == "build" {
		build()
	} else {
		log.Fatal("Invalid mode")
	}
}
