import { platform } from "$platform";
import type { CalcRequest, CalcResult } from "$lib/platform/types";

class CalculationManager {
    public isCalculating = $state(false)
    public parsedResult = $state<CalcResult | null>(null)
    public calculationError = $state<string | null>(null)
    private shouldAbort = $state(false)

    async run(controlInput: Omit<CalcRequest, "equation">, textInput: string) {
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

        try {
            const params: CalcRequest = {
                ...controlInput,
                equation: textInput
            }

            // Run the calculation via the active platform (WASM worker or Wails)
            const parsed = await platform.calculate(params)

            // Check if we aborted during the calculation
            if (this.shouldAbort) {
                return
            }

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
        } catch (error) {
            if (this.shouldAbort) {
            } else {
                this.calculationError = error instanceof Error ? error.message : String(error)
                console.error('Calculation error:', this.calculationError)
            }
        } finally {
            this.isCalculating = false
            this.shouldAbort = false
        }
    }

    private abort() {
        platform.stop()
    }

    // Reset the manager state
    reset() {
        this.isCalculating = false
        this.parsedResult = null
        this.calculationError = null
        this.shouldAbort = false
        platform.reset?.()
    }
}

export const calculationManager = new CalculationManager()
