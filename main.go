package main

import (
	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/app"
)

const (
	width  float32 = 800
	height float32 = 600
)

func main() {
	csc := app.New()
	w := csc.NewWindow("chemsynthcalc")
	w.Resize(fyne.NewSize(width, height))

	content := createUI(w)

	w.SetContent(content)
	w.ShowAndRun()
}
