// chemsynthcalc desktop entry point (Wails v3).
//
// The frontend is the single Svelte app in frontend/, shared with the WASM
// (browser) build. Wails-only logic lives in the desktop/ package; the shared
// calculation core lives in internal/bridge/.
package main

import (
	"embed"
	"log"

	"github.com/Syrov-Egor/chemsynthcalc-GUI/desktop"
	"github.com/wailsapp/wails/v3/pkg/application"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	app := application.New(application.Options{
		Name:        "chemsynthcalc",
		Description: "Chemistry synthesis calculator",
		Services: []application.Service{
			application.NewService(desktop.NewCalcService()),
		},
		Assets: application.AssetOptions{
			Handler: application.AssetFileServerFS(assets),
		},
		Mac: application.MacOptions{
			ApplicationShouldTerminateAfterLastWindowClosed: true,
		},
	})

	// The file service needs the app instance for native dialogs, so it is
	// registered after the app has been created.
	app.RegisterService(application.NewService(desktop.NewFileService(app)))

	app.Window.NewWithOptions(application.WebviewWindowOptions{
		Title:            "chemsynthcalc",
		Width:            1600,
		Height:           900,
		MinWidth:         854,
		MinHeight:        480,
		BackgroundColour: application.RGBA{Red: 27, Green: 38, Blue: 54, Alpha: 255},
		URL:              "/",
	})

	if err := app.Run(); err != nil {
		log.Fatal(err)
	}
}
