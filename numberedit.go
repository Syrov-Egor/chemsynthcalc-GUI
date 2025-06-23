package main

import (
	"strconv"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/layout"
	"fyne.io/fyne/v2/theme"
	"fyne.io/fyne/v2/widget"
)

// NumberEdit is a custom widget that combines an entry with up/down buttons for integers
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
	disabled bool
}

// NewNumberEdit creates a new NumberEdit widget for integers
func NewNumberEdit(value, min, max, step int, onChange func(int)) *NumberEdit {
	n := &NumberEdit{
		value:    value,
		min:      min,
		max:      max,
		step:     step,
		onChange: onChange,
		disabled: false,
	}

	n.entry = widget.NewEntry()
	n.entry.SetText(strconv.Itoa(value))
	n.entry.OnChanged = func(text string) {
		if n.disabled {
			return
		}
		if val, err := strconv.Atoi(text); err == nil {
			n.setValue(val)
		}
	}

	n.upBtn = widget.NewButtonWithIcon("", theme.MoveUpIcon(), func() {
		if !n.disabled {
			n.increment()
		}
	})
	n.upBtn.Resize(fyne.NewSize(30, 15))

	n.downBtn = widget.NewButtonWithIcon("", theme.MoveDownIcon(), func() {
		if !n.disabled {
			n.decrement()
		}
	})
	n.downBtn.Resize(fyne.NewSize(30, 15))

	n.ExtendBaseWidget(n)
	return n
}

func (n *NumberEdit) CreateRenderer() fyne.WidgetRenderer {
	buttonContainer := container.New(layout.NewVBoxLayout(), n.upBtn, n.downBtn)
	content := container.New(layout.NewBorderLayout(nil, nil, nil, buttonContainer), n.entry, buttonContainer)
	return widget.NewSimpleRenderer(content)
}

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

func (n *NumberEdit) increment() {
	if !n.disabled {
		n.setValue(n.value + n.step)
	}
}

func (n *NumberEdit) decrement() {
	if !n.disabled {
		n.setValue(n.value - n.step)
	}
}

func (n *NumberEdit) GetValue() int {
	return n.value
}

func (n *NumberEdit) SetValue(value int) {
	n.setValue(value)
}

func (n *NumberEdit) Enable() {
	n.disabled = false
	n.entry.Enable()
	n.upBtn.Enable()
	n.downBtn.Enable()
	n.Refresh()
}

func (n *NumberEdit) Disable() {
	n.disabled = true
	n.entry.Disable()
	n.upBtn.Disable()
	n.downBtn.Disable()
	n.Refresh()
}

func (n *NumberEdit) Disabled() bool {
	return n.disabled
}

type FloatEdit struct {
	widget.BaseWidget
	entry     *widget.Entry
	upBtn     *widget.Button
	downBtn   *widget.Button
	value     float64
	min       float64
	max       float64
	step      float64
	precision int
	onChange  func(float64)
	disabled  bool
}

func NewFloatEdit(value, min, max, step float64, precision int, onChange func(float64)) *FloatEdit {
	f := &FloatEdit{
		value:     value,
		min:       min,
		max:       max,
		step:      step,
		precision: precision,
		onChange:  onChange,
		disabled:  false,
	}

	f.entry = widget.NewEntry()
	f.entry.SetText(strconv.FormatFloat(value, 'f', precision, 64))
	f.entry.OnChanged = func(text string) {
		if f.disabled {
			return
		}
		if val, err := strconv.ParseFloat(text, 64); err == nil {
			f.setValue(val)
		}
	}

	f.upBtn = widget.NewButtonWithIcon("", theme.MoveUpIcon(), func() {
		if !f.disabled {
			f.increment()
		}
	})
	f.upBtn.Resize(fyne.NewSize(30, 15))

	f.downBtn = widget.NewButtonWithIcon("", theme.MoveDownIcon(), func() {
		if !f.disabled {
			f.decrement()
		}
	})
	f.downBtn.Resize(fyne.NewSize(30, 15))

	f.ExtendBaseWidget(f)
	return f
}

func (f *FloatEdit) CreateRenderer() fyne.WidgetRenderer {
	buttonContainer := container.New(layout.NewVBoxLayout(), f.upBtn, f.downBtn)
	content := container.New(layout.NewBorderLayout(nil, nil, nil, buttonContainer), f.entry, buttonContainer)
	return widget.NewSimpleRenderer(content)
}

func (f *FloatEdit) setValue(value float64) {
	if value < f.min {
		value = f.min
	}
	if value > f.max {
		value = f.max
	}

	if f.value != value {
		f.value = value
		f.entry.SetText(strconv.FormatFloat(value, 'f', f.precision, 64))
		if f.onChange != nil && !f.disabled {
			f.onChange(value)
		}
	}
}

func (f *FloatEdit) increment() {
	if !f.disabled {
		f.setValue(f.value + f.step)
	}
}

func (f *FloatEdit) decrement() {
	if !f.disabled {
		f.setValue(f.value - f.step)
	}
}

func (f *FloatEdit) GetValue() float64 {
	return f.value
}

func (f *FloatEdit) SetValue(value float64) {
	f.setValue(value)
}

func (f *FloatEdit) Enable() {
	f.disabled = false
	f.entry.Enable()
	f.upBtn.Enable()
	f.downBtn.Enable()
	f.Refresh()
}

func (f *FloatEdit) Disable() {
	f.disabled = true
	f.entry.Disable()
	f.upBtn.Disable()
	f.downBtn.Disable()
	f.Refresh()
}

func (f *FloatEdit) Disabled() bool {
	return f.disabled
}
