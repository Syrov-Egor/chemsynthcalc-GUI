import path from "path";
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'
import tailwindcss from "@tailwindcss/vite";

// The platform adapter is picked at build time via the `$platform` alias:
//
//   --mode web      → src/lib/platform/web.ts    (TinyGo WASM in a worker)
//   --mode desktop  → src/lib/platform/wails.ts  (Wails v3 bindings)
//
// `web` mode also sets the GitHub Pages base path; `desktop` uses relative
// paths because assets are served by the embedded Wails asset server.
// Components import `$platform` and never reference WASM or Wails directly,
// so the desktop bundle contains no WASM and the web bundle no bindings.
export default defineConfig(({ mode }) => {
    const isDesktop = mode === "desktop";

    return {
        base: isDesktop ? "./" : "/chemsynthcalc-GUI/",
        plugins: [tailwindcss(), svelte()],
        server: {
            host: '127.0.0.1',
            port: isDesktop ? 9245 : 5173,
        },
        resolve: {
            alias: {
                $lib: path.resolve("./src/lib"),
                $platform: path.resolve(`./src/lib/platform/${isDesktop ? "wails" : "web"}.ts`),
                $bindings: path.resolve("./bindings"),
            },
        },
    };
});
