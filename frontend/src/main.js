import './style.css';
import './app.css';

// Import Wails Go bindings
import { PerformCalculation } from '../wailsjs/go/main/App';

// Create the main UI
document.querySelector('#app').innerHTML = `
    <div class="app-container">
        <div class="menu-bar">
            <div class="menu-item">File</div>
            <div class="menu-item">Help</div>
        </div>

        <div class="title-bar">
            chemsynthcalc v0.0.1
        </div>

        <div class="controls-grid">
            <div class="control-group">
                <div class="control-label">Mode</div>
                <div class="radio-group">
                    <div class="radio-item">
                        <input type="radio" id="formula" name="mode" value="formula" class="radio-input">
                        <label for="formula" class="radio-label">Formula</label>
                    </div>
                    <div class="radio-item">
                        <input type="radio" id="balance" name="mode" value="balance" class="radio-input">
                        <label for="balance" class="radio-label">Balance</label>
                    </div>
                    <div class="radio-item">
                        <input type="radio" id="masses" name="mode" value="masses" class="radio-input" checked>
                        <label for="masses" class="radio-label">Masses</label>
                    </div>
                </div>
            </div>

            <div class="control-group">
                <div class="control-label">Algorithm</div>
                <select class="select-field" id="algorithm">
                    <option value="auto">Auto</option>
                    <option value="gauss">Inv</option>
                    <option value="matrix">GPinv</option>
                    <option value="matrix">PPinv</option>
                    <option value="matrix">Comb</option>
                </select>
            </div>

            <div class="control-group">
                <div class="control-label">Run mode</div>
                <select class="select-field" id="runmode">
                    <option value="balance">Balance</option>
                    <option value="check">Check</option>
                    <option value="force">Force</option>
                </select>
            </div>

            <div class="control-group">
                <div class="control-label">Target #</div>
                <div class="increment-control">
                    <input type="number" class="input-field" id="target-num" value="0" style="width: 60px;">
                </div>
            </div>

            <div class="control-group">
                <div class="control-label">Target mass, g</div>
                <div class="increment-control">
                    <input type="number" class="input-field" id="target-mass" value="1.000000"  min="0" step="1.000000" style="width: 80px;">
                </div>
            </div>

            <div class="control-group">
                <div class="control-label">Intify coefs</div>
                <div class="checkbox-item">
                    <input type="checkbox" id="intify" class="checkbox-input" checked>
                    <label for="intify" class="checkbox-label">Intify?</label>
                </div>
            </div>

            <div class="control-group">
                <div class="control-label">Output precision</div>
                <div class="increment-control">
                    <input type="number" class="input-field" id="output-precision" value="4" min="0" max="20" style="width: 50px;">
                </div>
            </div>

            <div class="control-group">
                <div class="control-label">Float tolerance, 1e-x</div>
                <div class="increment-control">
                    <input type="number" class="input-field" id="float-tolerance" value="8" min="1" max="15" style="width: 50px;">
                </div>
            </div>

        </div>

        <div class="equation-area">
            <div class="equation-input-bar">
                <span style="color: #cccccc;">Input:</span>
                <input type="text" class="equation-input" id="equation-input" placeholder="H2+O2=H2O" value="H2+O2=H2O">
                <button class="run-button" onclick="runCalculation()">
                    ▶ Run
                </button>
            </div>

            <div class="results-area">
                <div class="results-content" id="results">Ready to calculate. Enter your chemical equation above and click Run.</div>
            </div>
        </div>
    </div>
`;

// Global functions for the UI controls
window.incrementValue = function(fieldId, delta) {
    const field = document.getElementById(fieldId);
    const currentValue = parseFloat(field.value) || 0;
    const newValue = currentValue + delta;
    
    // Apply constraints based on field
    if (fieldId === 'target-num') {
        field.value = Math.max(0, Math.floor(newValue));
    } else if (fieldId === 'output-precision') {
        field.value = Math.max(1, Math.min(10, Math.floor(newValue)));
    } else if (fieldId === 'float-tolerance') {
        field.value = Math.max(1, Math.min(15, Math.floor(newValue)));
    } else {
        field.value = Math.max(0, newValue).toFixed(6);
    }
};

window.runCalculation = function() {
    const equation = document.getElementById('equation-input').value;
    const mode = document.querySelector('input[name="mode"]:checked').value;
    const algorithm = document.getElementById('algorithm').value;
    const runMode = document.getElementById('runmode').value;
    const targetNum = parseInt(document.getElementById('target-num').value) || 0;
    const targetMass = parseFloat(document.getElementById('target-mass').value) || 1.0;
    const intify = document.getElementById('intify').checked;
    const outputPrecision = parseInt(document.getElementById('output-precision').value) || 4;
    const floatTolerance = parseInt(document.getElementById('float-tolerance').value) || 8;
    
    const results = document.getElementById('results');
    
    if (!equation.trim()) {
        results.textContent = 'Error: Please enter a chemical equation.';
        results.className = 'results-content error';
        return;
    }
    
    // Show calculation in progress
    results.textContent = 'Running calculation...';
    results.className = 'results-content loading';
    
    // Create parameters object for Go backend
    const params = {
        equation: equation,
        mode: mode,
        algorithm: algorithm,
        runMode: runMode,
        targetNum: targetNum,
        targetMass: targetMass,
        intify: intify,
        outputPrecision: outputPrecision,
        floatTolerance: floatTolerance
    };
    
    // Call Go backend function
    PerformCalculation(params)
        .then((result) => {
            if (result.success) {
                results.textContent = result.details;
                results.className = 'results-content success';
            } else {
                results.textContent = result.message;
                results.className = 'results-content error';
            }
        })
        .catch((error) => {
            console.error('Calculation error:', error);
            results.textContent = `Error: ${error.message || 'Calculation failed'}`;
            results.className = 'results-content error';
        });
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('ChemSynthCalc initialized');
    
    // Focus on equation input
    const equationInput = document.getElementById('equation-input');
    if (equationInput) {
        equationInput.focus();
    }
    
    // Add Enter key support for equation input
    document.getElementById('equation-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            runCalculation();
        }
    });
});