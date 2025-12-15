import {
    PerformCalculation,
    StopCalculation,
    IsCalculating
} from '../../../wailsjs/go/main/App';

type CalculationParams = {
    equation: string;
    mode: string;
    algorithm: string;
    runMode: string;
    targetNum: number;
    targetMass: number;
    intify: boolean;
    outputPrecision: number;
    floatTolerance: number;
    maxComb: number;
};

type CalculationResult = {
    success: boolean;
    message: string;
    details: string;
    cancelled: boolean;
    tabular?: Array<{
        formula: string;
        molar: number;
        masses: number;
    }>;
};

class WailsCalculationService {
    public isLoading = false;
    private currentCalculation: {
        resolve: (result: string) => void,
        reject: (error: Error) => void
    } | null = null;

    get isLoaded() {
        return true; // Wails is always loaded
    }

    get isCalculating() {
        // Check if a calculation is in progress
        try {
            return IsCalculating();
        } catch (error) {
            console.warn('Failed to check calculation status:', error);
            return false;
        }
    }

    canCalculate(): boolean {
        return !this.isLoading && !this.isCalculating;
    }

    async calculate(params: CalculationParams): Promise<string> {
        // If we have a current calculation, reject it first
        if (this.currentCalculation) {
            this.currentCalculation.reject(new Error('New calculation started before previous completed'));
            this.currentCalculation = null;
        }

        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                if (this.currentCalculation) {
                    this.currentCalculation.reject(new Error('Calculation timeout'));
                    this.currentCalculation = null;
                }
            }, 3000000);

            this.currentCalculation = { resolve, reject };
            this.isLoading = true;

            // Call the Go function directly via Wails
            PerformCalculation(params)
                .then((result: CalculationResult) => {
                    clearTimeout(timeout);
                    this.isLoading = false;
                    this.currentCalculation = null;

                    // Convert the result to the expected string format
                    resolve(JSON.stringify(result));
                })
                .catch((error: Error) => {
                    clearTimeout(timeout);
                    this.isLoading = false;
                    this.currentCalculation = null;

                    // Format error as expected by the frontend
                    const errorResult: CalculationResult = {
                        success: false,
                        message: error.message || 'Calculation failed',
                        details: '',
                        cancelled: false
                    };
                    resolve(JSON.stringify(errorResult));
                });
        });
    }

    abort() {
        try {
            StopCalculation();
        } catch (error) {
            console.error('Failed to stop calculation:', error);
        }

        // Reject the current calculation
        if (this.currentCalculation) {
            this.currentCalculation.reject(new Error('Calculation aborted by user'));
            this.currentCalculation = null;
        }
    }

    terminate() {
        // Clean up any running calculations
        if (this.isCalculating) {
            this.abort();
        }
        this.isLoading = false;
    }
}

export const wailsService = new WailsCalculationService();
