package main

import (
	"fmt"
	"math"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/theme"
	"fyne.io/fyne/v2/widget"
)

type EnableDisableWidget interface {
	Enable()
	Disable()
}

type AppState struct {
	Mode       string
	Algorithm  string
	RunMode    string
	Target     int
	TargetMass int
	Intify     bool
	Precision  int
	Tolerance  int
	InputText  string
}

type Widgets struct {
	Name       *widget.Label
	FormOrReac *widget.RadioGroup
	Algorithm  *widget.Select
	RunMode    *widget.Select
	Target     *NumberEdit
	TargetMass *NumberEdit
	Intify     *widget.Check
	Precision  *NumberEdit
	Tolerance  *NumberEdit
	TextInput  *widget.Entry
	SendButton *widget.Button
}

var (
	appState *AppState
	widgets  *Widgets
)

func initState() {
	appState = &AppState{
		Mode:       "Masses",
		Algorithm:  "Auto",
		RunMode:    "Balance",
		Target:     0,
		TargetMass: 1,
		Intify:     true,
		Precision:  4,
		Tolerance:  8,
		InputText:  "",
	}
}

func GetAppState() AppState {
	return *appState
}

func UpdateAppState() {
	if widgets == nil {
		return
	}

	appState.Mode = widgets.FormOrReac.Selected
	appState.Algorithm = widgets.Algorithm.Selected
	appState.RunMode = widgets.RunMode.Selected
	appState.Target = widgets.Target.GetValue()
	appState.TargetMass = widgets.TargetMass.GetValue()
	appState.Intify = widgets.Intify.Checked
	appState.Precision = widgets.Precision.GetValue()
	appState.Tolerance = widgets.Tolerance.GetValue()
	appState.InputText = widgets.TextInput.Text
}

func PrintAppState() {
	UpdateAppState()
	fmt.Printf("Current App State:\n")
	fmt.Printf("  Mode: %s\n", appState.Mode)
	fmt.Printf("  Algorithm: %s\n", appState.Algorithm)
	fmt.Printf("  RunMode: %s\n", appState.RunMode)
	fmt.Printf("  Target: %d\n", appState.Target)
	fmt.Printf("  TargetMass: %d\n", appState.TargetMass)
	fmt.Printf("  Intify: %t\n", appState.Intify)
	fmt.Printf("  Precision: %d\n", appState.Precision)
	fmt.Printf("  Tolerance: %d\n", appState.Tolerance)
	fmt.Printf("  InputText: %s\n", appState.InputText)
	fmt.Printf("------------------------\n")
}

func setWidgetStates(enable bool, widgets ...EnableDisableWidget) {
	for _, w := range widgets {
		if enable {
			w.Enable()
		} else {
			w.Disable()
		}
	}
}

func updateWidgetStates(selection string) {
	if widgets == nil {
		return
	}

	appState.Mode = selection

	switch selection {
	case "Formula":
		setWidgetStates(true, widgets.Precision)
		setWidgetStates(false, widgets.Algorithm, widgets.RunMode, widgets.Target, widgets.TargetMass, widgets.Intify, widgets.Tolerance)
	case "Balance":
		setWidgetStates(true, widgets.Algorithm)
		setWidgetStates(false, widgets.RunMode, widgets.Target, widgets.TargetMass, widgets.Intify, widgets.Tolerance)
	case "Masses":
		setWidgetStates(true, widgets.RunMode, widgets.Target, widgets.TargetMass, widgets.Intify, widgets.Tolerance)
		setWidgetStates(false, widgets.Algorithm)
	}

	updatePlaceholderText(selection)
}

func updatePlaceholderText(selection string) {
	if widgets == nil || widgets.TextInput == nil {
		return
	}

	switch selection {
	case "Formula":
		widgets.TextInput.SetPlaceHolder("Enter chemical formula: H2SO4")
	case "Balance":
		widgets.TextInput.SetPlaceHolder("Enter equation to balance: H2+O2=H2O")
	case "Masses":
		widgets.TextInput.SetPlaceHolder("Enter equation with masses: H2+O2=H2O")
	}
}

func handleRunAction() {
	UpdateAppState()
	PrintAppState()

	text := appState.InputText
	if text != "" {
		fmt.Printf("Processing in %s mode: %s\n", appState.Mode, text)
	}
}

func createMenu() *fyne.MainMenu {
	fileMenu := fyne.NewMenu("File",
		fyne.NewMenuItem("Save", func() {
			UpdateAppState()
			fmt.Println("Save action - current state captured")
		}),
		fyne.NewMenuItemSeparator(),
	)

	helpMenu := fyne.NewMenu("Help",
		fyne.NewMenuItem("About", func() {
			fmt.Println("About ChemSynthCalc v0.1")
		}),
		fyne.NewMenuItem("How to use", func() {
			fmt.Println("How to use ChemSynthCalc")
		}),
	)

	return fyne.NewMainMenu(fileMenu, helpMenu)
}

func createControlWidgets() {
	widgets.Name = widget.NewLabelWithStyle("chemsynthcalc v0.1", fyne.TextAlignCenter, widget.RichTextStyleHeading.TextStyle)

	widgets.Algorithm = widget.NewSelect([]string{"Auto", "Inv", "GPinv", "PPinv", "Comb"}, func(s string) {
		appState.Algorithm = s
	})
	widgets.Algorithm.SetSelected(appState.Algorithm)

	widgets.RunMode = widget.NewSelect([]string{"Balance", "Check", "Force"}, func(s string) {
		appState.RunMode = s
	})
	widgets.RunMode.SetSelected(appState.RunMode)

	widgets.Target = NewNumberEdit(appState.Target, -1000, 1000, 1, func(i int) {
		appState.Target = i
	})

	widgets.TargetMass = NewNumberEdit(appState.TargetMass, 0, math.MaxInt, 1, func(i int) {
		appState.TargetMass = i
	})

	widgets.Intify = widget.NewCheck("Intify?", func(b bool) {
		appState.Intify = b
	})
	widgets.Intify.Checked = appState.Intify

	widgets.Precision = NewNumberEdit(appState.Precision, 0, math.MaxInt, 1, func(i int) {
		appState.Precision = i
	})

	widgets.Tolerance = NewNumberEdit(appState.Tolerance, 0, math.MaxInt, 1, func(i int) {
		appState.Tolerance = i
	})
}

func createTextInputWidgets() {
	widgets.TextInput = widget.NewEntry()
	widgets.TextInput.MultiLine = true
	widgets.TextInput.OnChanged = func(text string) {
		appState.InputText = text
	}

	widgets.SendButton = widget.NewButtonWithIcon("Run", theme.MediaPlayIcon(), handleRunAction)
}

func createModeWidget() {
	widgets.FormOrReac = widget.NewRadioGroup([]string{"Formula", "Balance", "Masses"}, func(s string) {
		fmt.Printf("Selected mode: %s\n", s)
		updateWidgetStates(s)
	})
	widgets.FormOrReac.SetSelected(appState.Mode)
}

func createUI(w fyne.Window) *fyne.Container {
	initState()
	widgets = &Widgets{}

	w.SetMainMenu(createMenu())

	createControlWidgets()
	createTextInputWidgets()
	createModeWidget()

	updateWidgetStates(appState.Mode)

	optionsContainer := container.NewAdaptiveGrid(8,
		container.NewVBox(widget.NewLabelWithStyle("Mode", fyne.TextAlignCenter, widget.RichTextStyleStrong.TextStyle), widgets.FormOrReac),
		container.NewVBox(widget.NewLabelWithStyle("Algorithm", fyne.TextAlignCenter, widget.RichTextStyleStrong.TextStyle), widgets.Algorithm),
		container.NewVBox(widget.NewLabelWithStyle("Run mode", fyne.TextAlignCenter, widget.RichTextStyleStrong.TextStyle), widgets.RunMode),
		container.NewVBox(widget.NewLabelWithStyle("Target #", fyne.TextAlignCenter, widget.RichTextStyleStrong.TextStyle), widgets.Target),
		container.NewVBox(widget.NewLabelWithStyle("Target mass, g", fyne.TextAlignCenter, widget.RichTextStyleStrong.TextStyle), widgets.TargetMass),
		container.NewVBox(widget.NewLabelWithStyle("Intify coefs", fyne.TextAlignCenter, widget.RichTextStyleStrong.TextStyle), widgets.Intify),
		container.NewVBox(widget.NewLabelWithStyle("Output precision", fyne.TextAlignCenter, widget.RichTextStyleStrong.TextStyle), widgets.Precision),
		container.NewVBox(widget.NewLabelWithStyle("Float tolerance, 1e-x", fyne.TextAlignCenter, widget.RichTextStyleStrong.TextStyle), widgets.Tolerance),
	)

	inputContainer := container.NewBorder(
		nil, nil, nil, widgets.SendButton,
		widgets.TextInput,
	)

	content := container.NewVBox(
		widgets.Name,
		optionsContainer,
		inputContainer,
	)

	return content
}
