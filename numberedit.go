package main

import (
	"strconv"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/layout"
	"fyne.io/fyne/v2/theme"
	"fyne.io/fyne/v2/widget"
)

// NumberEdit is a custom widget that combines an entry with up/down buttons
type NumberEdit struct {
	widget.BaseWidget
	entry    *widget.Entry
	upBtn    *widget.Button
	downBtn  *widget.Button
	value    int
	min      int
	max      int
	step     int
	onChange func(int)
	disabled bool // Track disabled state
}

// NewNumberEdit creates a new NumberEdit widget
func NewNumberEdit(value, min, max, step int, onChange func(int)) *NumberEdit {
	n := &NumberEdit{
		value:    value,
		min:      min,
		max:      max,
		step:     step,
		onChange: onChange,
		disabled: false,
	}

	// Create entry widget
	n.entry = widget.NewEntry()
	n.entry.SetText(strconv.Itoa(value))
	n.entry.OnChanged = func(text string) {
		if n.disabled {
			return // Don't process changes when disabled
		}
		if val, err := strconv.Atoi(text); err == nil {
			n.setValue(val)
		}
	}

	// Create up button
	n.upBtn = widget.NewButtonWithIcon("", theme.MoveUpIcon(), func() {
		if !n.disabled {
			n.increment()
		}
	})
	n.upBtn.Resize(fyne.NewSize(30, 15))

	// Create down button
	n.downBtn = widget.NewButtonWithIcon("", theme.MoveDownIcon(), func() {
		if !n.disabled {
			n.decrement()
		}
	})
	n.downBtn.Resize(fyne.NewSize(30, 15))

	n.ExtendBaseWidget(n)
	return n
}

// CreateRenderer creates the visual representation of the NumberEdit
func (n *NumberEdit) CreateRenderer() fyne.WidgetRenderer {
	// Create vertical container for buttons
	buttonContainer := container.New(layout.NewVBoxLayout(), n.upBtn, n.downBtn)

	// Create horizontal container for entry and buttons
	content := container.New(layout.NewBorderLayout(nil, nil, nil, buttonContainer), n.entry, buttonContainer)

	return widget.NewSimpleRenderer(content)
}

// setValue sets the value and updates the entry
func (n *NumberEdit) setValue(value int) {
	if value < n.min {
		value = n.min
	}
	if value > n.max {
		value = n.max
	}

	if n.value != value {
		n.value = value
		n.entry.SetText(strconv.Itoa(value))
		if n.onChange != nil && !n.disabled {
			n.onChange(value)
		}
	}
}

// increment increases the value by step
func (n *NumberEdit) increment() {
	if !n.disabled {
		n.setValue(n.value + n.step)
	}
}

// decrement decreases the value by step
func (n *NumberEdit) decrement() {
	if !n.disabled {
		n.setValue(n.value - n.step)
	}
}

// GetValue returns the current value
func (n *NumberEdit) GetValue() int {
	return n.value
}

// SetValue sets the value programmatically
func (n *NumberEdit) SetValue(value int) {
	n.setValue(value)
}

// Enable enables the NumberEdit widget
func (n *NumberEdit) Enable() {
	n.disabled = false
	n.entry.Enable()
	n.upBtn.Enable()
	n.downBtn.Enable()
	n.Refresh() // Refresh the widget to update visual state
}

// Disable disables the NumberEdit widget
func (n *NumberEdit) Disable() {
	n.disabled = true
	n.entry.Disable()
	n.upBtn.Disable()
	n.downBtn.Disable()
	n.Refresh() // Refresh the widget to update visual state
}

// Disabled returns whether the widget is currently disabled
func (n *NumberEdit) Disabled() bool {
	return n.disabled
}

// Enhanced simple NumberEdit function with enable/disable support
func createSimpleNumberEdit(initialValue, min, max, step int, onChange func(int)) (*fyne.Container, func(), func(), func() bool) {
	currentValue := initialValue
	disabled := false

	entry := widget.NewEntry()
	entry.SetText(strconv.Itoa(currentValue))

	updateValue := func(newValue int) {
		if disabled {
			return
		}
		if newValue < min {
			newValue = min
		}
		if newValue > max {
			newValue = max
		}
		currentValue = newValue
		entry.SetText(strconv.Itoa(currentValue))
		if onChange != nil {
			onChange(currentValue)
		}
	}

	// Handle manual entry changes
	entry.OnChanged = func(text string) {
		if disabled {
			return
		}
		if val, err := strconv.Atoi(text); err == nil {
			updateValue(val)
		}
	}

	// Create buttons
	upBtn := widget.NewButtonWithIcon("", theme.MoveUpIcon(), func() {
		if !disabled {
			updateValue(currentValue + step)
		}
	})

	downBtn := widget.NewButtonWithIcon("", theme.MoveDownIcon(), func() {
		if !disabled {
			updateValue(currentValue - step)
		}
	})

	// Arrange in a container
	buttonContainer := container.NewVBox(upBtn, downBtn)
	container := container.NewBorder(nil, nil, nil, buttonContainer, entry)

	// Return container and control functions
	enableFunc := func() {
		disabled = false
		entry.Enable()
		upBtn.Enable()
		downBtn.Enable()
	}

	disableFunc := func() {
		disabled = true
		entry.Disable()
		upBtn.Disable()
		downBtn.Disable()
	}

	isDisabledFunc := func() bool {
		return disabled
	}

	return container, enableFunc, disableFunc, isDisabledFunc
}
