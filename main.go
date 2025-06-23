package main

import (
	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/app"
)

func main() {
	csc := app.New()
	w := csc.NewWindow("chemsynthcalc")
	w.Resize(fyne.NewSize(800, 600))

	content := createUI(w)

	w.SetContent(content)
	w.ShowAndRun()
}
