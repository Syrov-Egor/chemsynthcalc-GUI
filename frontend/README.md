# Chemical synthesis calculator Web App
A single-page web app for calculating the masses of substances required for chemical synthesis directly from the reaction string. It includes solutions for all intermediate steps, including chemical formula parsing, molar mass calculation and reaction balancing with different matrix methods. This can be considered as a GUI for the original [chemsynthcalc](https://github.com/Syrov-Egor/chemsynthcalc/) package with the Go backend [gosynthcalc](https://github.com/Syrov-Egor/gosynthcalc) running natively through [Wails](https://wails.io/).

## How to use
[Open the app](https://syrov-egor.github.io/chemsynthcalc-web/).

See [GitHub Wiki](https://github.com/Syrov-Egor/chemsynthcalc-GUI/wiki/How-to-use) for instructions.

## Desktop and Android apps
See [chemsynthcalc-GUI](https://github.com/Syrov-Egor/chemsynthcalc-GUI/releases).

## Build
This app is using [Svelte](https://svelte.dev/) and [shadcn-svelte](https://www.shadcn-svelte.com/). To build:
`git clone` this repo, then:
```Bash
npm install
npm run build
```

To publish it on GitHub pages:
```Bash
npm run deploy
```

The calculation backend is native Go code run by Wails, so no WASM toolchain is required.

## License
The code is provided under the MIT license.
