package main

type Mode int

const (
	ModeDevelop Mode = iota
	ModeBuild
	ModeServe
)

type CompilerOptions struct {
	Mode Mode
	Bundle bool
	Outdir string
}

func compilerMiddleware() {}
