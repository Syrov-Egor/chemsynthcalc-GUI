import { wailsService } from "./wailsService";
import { updateGlobalState } from "./globalState";

class CalculationManager {
    public isCalculating = $state(false)
    public parsedResult = $state<any | null>(null)
    public calculationError = $state<string | null>(null)
    private shouldAbort = $state(false)

    async run(controlInput: object, textInput: string) {
        // If already calculating, abort current calculation
        if (this.isCalculating) {
            this.shouldAbort = true
            this.abort()
            return
        }

        // Reset state
        this.shouldAbort = false
        this.isCalculating = true
        this.parsedResult = null
        this.calculationError = null

        // Update global state
        updateGlobalState({
            isCalculating: true,
            parsedResult: null,
            calculationError: null
        })

        try {
            // Map controlInput properties to match CalculationParams interface
            const params = {
                equation: textInput,
                mode: (controlInput as any).mode,
                algorithm: (controlInput as any).algorithm,
                runMode: (controlInput as any).runMode,
                targetNum: (controlInput as any).targetNumber,
                targetMass: (controlInput as any).targetMass,
                intify: (controlInput as any).intify,
                outputPrecision: (controlInput as any).outputPrecision,
                floatTolerance: (controlInput as any).floatTolerance,
                maxComb: (controlInput as any).maxCombinations,
            }

            // Run calculation via Wails Go binding
            const result = await wailsService.calculate(params)

            // Check if we aborted during the calculation
            if (this.shouldAbort) {
                return
            }

            try {
                const parsed = JSON.parse(result)
                this.calculationError = null
                if (parsed.cancelled) {
                    this.parsedResult = null
                } else if (parsed.success) {
                    this.parsedResult = parsed
                } else {
                    console.error('✗ Calculation failed:', parsed.message)
                    if (parsed.details) {
                        console.error('Error details:', parsed.details)
                    }
                    this.parsedResult = null
                    this.calculationError = parsed.message || 'Calculation failed'
                }
            } catch (e) {
                console.error('Parse error:', e)
                console.log('Raw result:', result)
                this.parsedResult = null
                this.calculationError = 'Invalid result format'
            }

        } catch (error) {
            if (this.shouldAbort) {
            } else {
                this.calculationError = error instanceof Error ? error.message : String(error)
                console.error('Calculation error:', this.calculationError)
            }
        } finally {
            this.isCalculating = false
            this.shouldAbort = false

            // Update global state with final results
            updateGlobalState({
                isCalculating: false,
                parsedResult: this.parsedResult,
                calculationError: this.calculationError
            })
        }
    }

    private abort() {
        wailsService.abort()
    }

    // Reset the manager state
    reset() {
        this.isCalculating = false
        this.parsedResult = null
        this.calculationError = null
        this.shouldAbort = false
        wailsService.terminate()

        // Update global state
        updateGlobalState({
            isCalculating: false,
            parsedResult: null,
            calculationError: null
        })
    }
}

export const calculationManager = new CalculationManager()
