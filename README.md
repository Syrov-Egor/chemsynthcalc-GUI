# Chemical synthesis calculator GUI
A desktop GUI app for calculating the masses of substances required for chemical synthesis directly from the reaction string. It includes solutions for all intermediate steps, including chemical formula parsing, molar mass calculation and reaction balancing with different matrix methods. This can be considered as a GUI for the original [chemsynthcalc](https://github.com/Syrov-Egor/chemsynthcalc/) package with Go backend [gosynthcalc](https://github.com/Syrov-Egor/gosynthcalc) compiled to executables with [Wails](https://wails.io/). The web version with WASM backend is [also avaliable](https://syrov-egor.github.io/chemsynthcalc-web/). Unlike a web application, a desktop application can save/load calculation files and export results to txt, csv, and xlsx files.
![A UI of chemsynthcalc-GUI app](/build/UI.jpg)

## Download the binary
The app in available for Windows 10/11, Linux, MacOS and Andoird. See [releases](https://github.com/Syrov-Egor/chemsynthcalc-GUI/releases).

**Warning** The code for all compiled applications is unsigned, so they will not work out of the box without warning on any system. See the [releases](https://github.com/Syrov-Egor/chemsynthcalc-GUI/releases) page for detailed instructions.

## How to use
See [GitHub Wiki](https://github.com/Syrov-Egor/chemsynthcalc-GUI/wiki) for instructions.

## Build it yourself
This app is using [Wails](https://wails.io/). To build:
1. [Install Wails](https://wails.io/docs/gettingstarted/installation). 
2. Run `wails doctor` to check if all dependencies are installed.
3. `git clone` this repo and `cd` into the directory.
4. Run `wails build` with specific flags (see [reference](https://wails.io/docs/reference/cli)).
5. Your executable will be in /build/bin dir.

## License
The code is provided under the MIT license.