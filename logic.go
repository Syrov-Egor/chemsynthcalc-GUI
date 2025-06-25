package main

import (
	"fmt"

	g "github.com/Syrov-Egor/gosynthcalc"
)

func calcFormulaMode() {
	formula, err := g.NewChemicalFormula(appState.InputText, uint(appState.Precision))
	if err == nil {
		fmt.Println(formula.Output())
	} else {
		fmt.Println(err)
	}
}

func calcBalanceMode() {

}

func calcMassesMode() {

}
