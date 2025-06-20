package main

import (
	"fmt"
	"math"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/app"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/theme"
	"fyne.io/fyne/v2/widget"
)

func createUI(w fyne.Window) *fyne.Container {
	fileMenu := fyne.NewMenu("File",
		fyne.NewMenuItem("Save", func() {
			// Handle save file action
		}),
		fyne.NewMenuItemSeparator(),
	)

	helpMenu := fyne.NewMenu("Help",
		fyne.NewMenuItem("About", func() {
			// Handle about action
		}),
		fyne.NewMenuItem("How to use", func() {
			// Handle how to use action
		}),
	)

	mainMenu := fyne.NewMainMenu(fileMenu, helpMenu)
	w.SetMainMenu(mainMenu)

	name := widget.NewLabelWithStyle("chemsynthcalc v0.1", fyne.TextAlignCenter, widget.RichTextStyleHeading.TextStyle)
	alg := widget.NewSelect([]string{"Auto", "Inv", "GPinv", "PPinv", "Comb"}, changed)
	alg.SetSelected("Auto")
	rMode := widget.NewSelect([]string{"Balance", "Check", "Force"}, changed)
	rMode.SetSelected("Balance")
	target := NewNumberEdit(0, -1000, 1000, 1, func(i int) {})
	targetMass := NewNumberEdit(1, 0, math.MaxInt, 1, func(i int) {})
	intify := widget.NewCheck("Intify?", func(b bool) {})
	intify.Checked = true
	precision := NewNumberEdit(4, 0, math.MaxInt, 1, func(i int) {})
	tolerance := NewNumberEdit(8, 0, math.MaxInt, 1, func(i int) {})

	updateWidgetStates := func(selection string) {
		switch selection {
		case "Formula":
			// For Formula mode: disable balance-specific widgets
			alg.Enable()
			rMode.Disable()
			target.Disable()
			targetMass.Disable()
			intify.Enable()
			precision.Enable()
			tolerance.Enable()

		case "Balance":
			// For Balance mode: enable most widgets
			alg.Enable()
			rMode.Enable()
			target.Disable()     // Target usually not needed for balance
			targetMass.Disable() // Target mass not needed for balance
			intify.Enable()
			precision.Enable()
			tolerance.Enable()

		case "Masses":
			// For Masses mode: enable mass-related widgets
			alg.Enable()
			rMode.Enable()
			target.Enable()
			targetMass.Enable()
			intify.Enable()
			precision.Enable()
			tolerance.Enable()
		}
	}

	// Create text input
	textInput := widget.NewEntry()
	textInput.SetPlaceHolder("H2+O2=H2O")
	textInput.MultiLine = true

	// Create send button with triangle icon
	sendButton := widget.NewButtonWithIcon("Go", theme.MediaPlayIcon(), func() {
		// Handle send action
		text := textInput.Text
		if text != "" {
			// You can process the text here
			println("Sending:", text)
		}
	})

	formOrReac := widget.NewRadioGroup([]string{"Formula", "Balance", "Masses"}, func(s string) {
		fmt.Printf("Selected mode: %s\n", s)
		updateWidgetStates(s)

		// You can add mode-specific logic here
		switch s {
		case "Formula":
			textInput.SetPlaceHolder("Enter chemical formula: H2SO4")
		case "Balance":
			textInput.SetPlaceHolder("Enter equation to balance: H2+O2=H2O")
		case "Masses":
			textInput.SetPlaceHolder("Enter equation with masses: H2+O2=H2O")
		}
	})

	formOrReac.SetSelected("Masses")
	// Set initial state based on default selection
	updateWidgetStates("Masses")

	optionsContainer := container.NewAdaptiveGrid(8, formOrReac, alg, rMode, target, targetMass, intify, precision, tolerance)

	// Create input container with text field and button
	inputContainer := container.NewBorder(
		nil, nil, nil, sendButton,
		textInput,
	)

	// Create main content container
	content := container.NewVBox(
		name,
		optionsContainer,
		inputContainer,
	)
	return content
}

func changed(message string) {
	fmt.Println(message)
}

func main() {
	csc := app.New()
	w := csc.NewWindow("chemsynthcalc")
	w.Resize(fyne.NewSize(800, 600))

	content := createUI(w)

	w.SetContent(content)
	w.ShowAndRun()
}
