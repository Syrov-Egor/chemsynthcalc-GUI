import { appTemplate } from './template.js';

// Import Wails Go bindings
import { PerformCalculation } from '../wailsjs/go/main/App';

// Function to load HTML template
function loadTemplate() {
    document.querySelector('#app').innerHTML = appTemplate;
}

// Function to update status indicator
function updateStatus(status, message) {
    const indicator = document.getElementById('status-indicator');
    const text = document.getElementById('status-text');
    
    if (indicator && text) {
        switch(status) {
            case 'ready':
                indicator.className = 'w-3 h-3 bg-gray-500 rounded-full';
                text.textContent = message || 'Ready';
                break;
            case 'loading':
                indicator.className = 'w-3 h-3 bg-yellow-500 rounded-full animate-pulse';
                text.textContent = message || 'Calculating...';
                break;
            case 'success':
                indicator.className = 'w-3 h-3 bg-green-500 rounded-full';
                text.textContent = message || 'Complete';
                break;
            case 'error':
                indicator.className = 'w-3 h-3 bg-red-500 rounded-full';
                text.textContent = message || 'Error';
                break;
        }
    }
}

// Function to handle mode changes and enable/disable controls
function handleModeChange() {
    const selectedMode = document.querySelector('input[name="mode"]:checked').value;
    
    // Get all control elements
    const algorithm = document.getElementById('algorithm');
    const runmode = document.getElementById('runmode');
    const targetNum = document.getElementById('target-num');
    const targetMass = document.getElementById('target-mass');
    const intify = document.getElementById('intify');
    const outputPrecision = document.getElementById('output-precision');
    const floatTolerance = document.getElementById('float-tolerance');
    const maxComb = document.getElementById('max-comb');
    
    // Reset all to enabled first
    [algorithm, runmode, targetNum, targetMass, intify, outputPrecision, floatTolerance, maxComb].forEach(el => {
        if (el) {
            el.disabled = false;
            el.parentElement.classList.remove('opacity-50');
        }
    });
    
    // Apply mode-specific enable/disable rules
    switch(selectedMode) {
        case 'formula':
            // Disable: algorithm, runmode, target-num, target-mass, intify, float-tolerance, max-comb
            [algorithm, runmode, targetNum, targetMass, intify, floatTolerance, maxComb].forEach(el => {
                if (el) {
                    el.disabled = true;
                    el.parentElement.classList.add('opacity-50');
                }
            });
            break;
            
        case 'balance':
            // Disable: runmode, target-num, target-mass, output-precision
            [runmode, targetNum, targetMass, outputPrecision].forEach(el => {
                if (el) {
                    el.disabled = true;
                    el.parentElement.classList.add('opacity-50');
                }
            });
            break;
            
        case 'masses':
            // Disable: algorithm, max-comb
            [algorithm, maxComb].forEach(el => {
                if (el) {
                    el.disabled = true;
                    el.parentElement.classList.add('opacity-50');
                }
            });
            break;
    }
}

// Enhanced run calculation function with better UX
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
    const runButton = document.querySelector('button[onclick="runCalculation()"]');
    
    if (!equation.trim()) {
        results.textContent = 'Error: Please enter a chemical equation.';
        results.className = 'p-4 h-full overflow-y-auto text-red-400 font-mono text-sm leading-6 whitespace-pre-wrap';
        updateStatus('error', 'Invalid input');
        return;
    }
    
    // Show calculation in progress
    results.textContent = 'Running calculation...';
    results.className = 'p-4 h-full overflow-y-auto text-yellow-400 font-mono text-sm leading-6 whitespace-pre-wrap';
    updateStatus('loading');
    
    // Disable run button during calculation
    if (runButton) {
        runButton.disabled = true;
        runButton.classList.add('opacity-50', 'cursor-not-allowed');
    }
    
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
                results.className = 'p-4 h-full overflow-y-auto text-green-400 font-mono text-sm leading-6 whitespace-pre-wrap';
                updateStatus('success');
            } else {
                results.textContent = result.message;
                results.className = 'p-4 h-full overflow-y-auto text-red-400 font-mono text-sm leading-6 whitespace-pre-wrap';
                updateStatus('error');
            }
        })
        .catch((error) => {
            console.error('Calculation error:', error);
            results.textContent = `Error: ${error.message || 'Calculation failed'}`;
            results.className = 'p-4 h-full overflow-y-auto text-red-400 font-mono text-sm leading-6 whitespace-pre-wrap';
            updateStatus('error');
        })
        .finally(() => {
            // Re-enable run button
            if (runButton) {
                runButton.disabled = false;
                runButton.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        });
};

// Enhanced keyboard shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to run calculation
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            runCalculation();
        }
        
        // Escape to focus equation input
        if (e.key === 'Escape') {
            const equationInput = document.getElementById('equation-input');
            if (equationInput) {
                equationInput.focus();
            }
        }
    });
}

// Initialize UI after template loads
function initializeUI() {
    console.log('ChemSynthCalc initialized with modern UI');
    
    // Focus on equation input
    const equationInput = document.getElementById('equation-input');
    if (equationInput) {
        equationInput.focus();
        
        // Add Enter key support for equation input
        equationInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                runCalculation();
            }
        });
    }
    
    // Add event listeners for mode radio buttons
    const modeRadios = document.querySelectorAll('input[name="mode"]');
    modeRadios.forEach(radio => {
        radio.addEventListener('change', handleModeChange);
    });
    
    // Initialize with current mode selection
    handleModeChange();
    
    // Setup keyboard shortcuts
    setupKeyboardShortcuts();
    
    // Set initial status
    updateStatus('ready');
    
    // Add smooth transitions for disabled elements
    const style = document.createElement('style');
    style.textContent = `
        .opacity-50 {
            transition: opacity 0.2s ease-in-out;
        }
        input:disabled, select:disabled {
            cursor: not-allowed;
        }
    `;
    document.head.appendChild(style);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadTemplate();
    initializeUI();
});