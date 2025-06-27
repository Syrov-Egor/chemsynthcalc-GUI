import './style.css';
import './app.css';
import { appTemplate } from './template.js';

// Import Wails Go bindings
import { PerformCalculation } from '../wailsjs/go/main/App';

// Function to load HTML template
function loadTemplate() {
    document.querySelector('#app').innerHTML = appTemplate;
}

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
    const maxComb = parseInt(document.getElementById('max-comb').value) || 15;
    
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
        floatTolerance: floatTolerance,
        maxComb: maxComb,
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

// Initialize UI after template loads
function initializeUI() {
    console.log('ChemSynthCalc initialized');
    
    // Focus on equation input
    const equationInput = document.getElementById('equation-input');
    if (equationInput) {
        equationInput.focus();
    }
    
    // Add Enter key support for equation input
    const input = document.getElementById('equation-input');
    if (input) {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                runCalculation();
            }
        });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadTemplate();
    initializeUI();
});