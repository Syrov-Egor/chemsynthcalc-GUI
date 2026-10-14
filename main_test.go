package main

import (
	"io"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/wailsapp/wails/v3/pkg/application"
)

// The window loads "/", so the embedded frontend/dist must resolve index.html
// there. It also catches embedding the wrong bundle: the web build is served
// under /chemsynthcalc-GUI/ by GitHub Pages and cannot be served by the
// desktop asset server.
func TestEmbeddedAssetsServeRoot(t *testing.T) {
	handler := application.AssetFileServerFS(assets)

	rec := httptest.NewRecorder()
	handler.ServeHTTP(rec, httptest.NewRequest("GET", "/", nil))

	if rec.Code != 200 {
		t.Fatalf("GET / = %d, want 200 (frontend built?)", rec.Code)
	}
	body, err := io.ReadAll(rec.Result().Body)
	if err != nil {
		t.Fatal(err)
	}
	html := string(body)
	if !strings.Contains(strings.ToLower(html), "<!doctype html") {
		t.Fatalf("GET / did not return the app HTML, got: %.200s", html)
	}
	if strings.Contains(html, `src="/chemsynthcalc-GUI/`) {
		t.Skip("frontend/dist holds the web build — run `wails3 task frontend:desktop` before testing the desktop app")
	}

	// The desktop bundle references assets relatively (base "./"), so resolve
	// the first script against the same handler.
	src := ""
	if i := strings.Index(html, `src="`); i >= 0 {
		src = strings.SplitN(html[i+len(`src="`):], `"`, 2)[0]
	}
	if src == "" {
		t.Fatal("index.html references no script")
	}

	rec = httptest.NewRecorder()
	handler.ServeHTTP(rec, httptest.NewRequest("GET", "/"+strings.TrimPrefix(src, "./"), nil))
	if rec.Code != 200 {
		t.Fatalf("GET %s = %d, want 200", src, rec.Code)
	}
}
