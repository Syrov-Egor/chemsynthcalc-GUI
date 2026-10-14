//go:build js && wasm

// chemsynthcalc WASM entrypoint. It exposes the shared calculation bridge to
// the JavaScript worker running in the browser (see
// frontend/src/scripts/wasm.worker.ts). Build with TinyGo:
//
//	tinygo build -o frontend/src/lib/wasm/main.wasm -target wasm -no-debug ./cmd/wasm
package main

import (
	"encoding/json"
	"syscall/js"

	"github.com/Syrov-Egor/chemsynthcalc-GUI/internal/bridge"
)

var controller = bridge.NewController()

func main() {
	ch := make(chan struct{})

	js.Global().Set("runCalculation", js.FuncOf(runCalculation))
	js.Global().Set("stopCalculation", js.FuncOf(stopCalculation))
	js.Global().Set("isCalculating", js.FuncOf(isCalculating))

	<-ch
}

func runCalculation(_ js.Value, args []js.Value) any {
	if len(args) != 1 {
		return nil
	}

	jsObject := args[0]
	jsonString := js.Global().Get("JSON").Call("stringify", jsObject).String()

	var params bridge.CalculationParams
	if err := json.Unmarshal([]byte(jsonString), &params); err != nil {
		js.Global().Get("console").Call("error", "runCalculation: invalid params:", err.Error())
		return nil
	}

	result := controller.PerformCalculation(params)

	out, err := json.Marshal(result)
	if err != nil {
		js.Global().Get("console").Call("error", "runCalculation: marshal error:", err.Error())
		return nil
	}
	return string(out)
}

func stopCalculation(_ js.Value, _ []js.Value) any {
	controller.StopCalculation()
	return nil
}

func isCalculating(_ js.Value, _ []js.Value) any {
	return js.ValueOf(controller.IsCalculating())
}
