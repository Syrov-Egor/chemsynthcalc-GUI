import { appTemplate } from './template.js';

// Import Wails Go bindings
import { PerformCalculation, StopCalculation, IsCalculating } from '../wailsjs/go/main/App';

// Global variable to track calculation state
let isCurrentlyCalculating = false;

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
            case 'cancelled':
                indicator.className = 'w-3 h-3 bg-orange-500 rounded-full';
                text.textContent = message || 'Cancelled';
                break;
        }
    }
}

// Function to update button state
function updateRunButton(isCalculating) {
    const runButton = document.getElementById('run-button');
    const buttonIcon = document.getElementById('button-icon');
    const buttonText = document.getElementById('button-text');
    
    if (!runButton || !buttonIcon || !buttonText) return;
    
    if (isCalculating) {
        // Change to Stop button
        runButton.className = 'px-6 py-3 text-lg font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-300 transition-all duration-200 flex items-center gap-2 min-w-fit';
        runButton.onclick = stopCalculation;
        
        buttonIcon.innerHTML = `
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clip-rule="evenodd"></path>
            </svg>
        `;
        buttonText.textContent = 'Stop Calculation';
    } else {
        // Change back to Run button
        runButton.className = 'px-6 py-3 text-lg font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 transition-all duration-200 flex items-center gap-2 min-w-fit';
        runButton.onclick = runCalculation;
        
        buttonIcon.innerHTML = `
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path>
            </svg>
        `;
        buttonText.textContent = 'Run Calculation';
    }
    
    isCurrentlyCalculating = isCalculating;
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

// Stop calculation function
window.stopCalculation = function() {
    if (!isCurrentlyCalculating) return;
    
    const results = document.getElementById('results');
    
    // Show stopping message
    results.textContent = 'Stopping calculation...';
    results.className = 'p-4 h-full overflow-y-auto text-orange-400 font-mono text-sm leading-6 whitespace-pre-wrap';
    updateStatus('cancelled', 'Stopping...');
    
    // Call Go backend to stop calculation
    StopCalculation()
        .then(() => {
            results.textContent = 'Calculation stopped by user.';
            results.className = 'p-4 h-full overflow-y-auto text-orange-400 font-mono text-sm leading-6 whitespace-pre-wrap';
            updateStatus('cancelled', 'Stopped');
            updateRunButton(false);
        })
        .catch((error) => {
            console.error('Error stopping calculation:', error);
            results.textContent = 'Error stopping calculation.';
            results.className = 'p-4 h-full overflow-y-auto text-red-400 font-mono text-sm leading-6 whitespace-pre-wrap';
            updateStatus('error', 'Stop failed');
            updateRunButton(false);
        });
};

// Enhanced run calculation function with better UX
window.runCalculation = function() {
    if (isCurrentlyCalculating) return;
    
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
        results.className = 'p-4 h-full overflow-y-auto text-red-400 font-mono text-sm leading-6 whitespace-pre-wrap';
        updateStatus('error', 'Invalid input');
        return;
    }
    
    // Show calculation in progress
    results.textContent = 'Running calculation...';
    results.className = 'p-4 h-full overflow-y-auto text-yellow-400 font-mono text-sm leading-6 whitespace-pre-wrap';
    updateStatus('loading');
    
    // Update button to stop button
    updateRunButton(true);
    
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
            if (result.cancelled) {
                results.textContent = 'Calculation was cancelled.';
                results.className = 'p-4 h-full overflow-y-auto text-orange-400 font-mono text-sm leading-6 whitespace-pre-wrap';
                updateStatus('cancelled');
            } else if (result.success) {
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
            // Always restore run button
            updateRunButton(false);
        });
};

// Enhanced keyboard shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to run calculation
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            if (isCurrentlyCalculating) {
                stopCalculation();
            } else {
                runCalculation();
            }
        }
        
        // Escape to stop calculation or focus equation input
        if (e.key === 'Escape') {
            if (isCurrentlyCalculating) {
                stopCalculation();
            } else {
                const equationInput = document.getElementById('equation-input');
                if (equationInput) {
                    equationInput.focus();
                }
            }
        }
    });
}

// Initialize UI after template loads
function initializeUI() {
    console.log('ChemSynthCalc initialized with modern UI and stop functionality');
    
    // Focus on equation input
    const equationInput = document.getElementById('equation-input');
    if (equationInput) {
        equationInput.focus();
        
        // Add Enter key support for equation input
        equationInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                if (isCurrentlyCalculating) {
                    stopCalculation();
                } else {
                    runCalculation();
                }
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
        
        /* Smooth button transitions */
        #run-button {
            transition: all 0.3s ease-in-out;
        }
        
        /* Stop button specific styling */
        .bg-red-600:hover {
            background-color: #dc2626;
        }
        
        /* Orange color for cancelled status */
        .text-orange-400 {
            color: #fb923c;
        }
        
        .bg-orange-500 {
            background-color: #f97316;
        }
    `;
    document.head.appendChild(style);
    
    // Check initial calculation state (in case of page refresh during calculation)
    IsCalculating()
        .then((calculating) => {
            if (calculating) {
                updateRunButton(true);
                updateStatus('loading', 'Calculating...');
            }
        })
        .catch((error) => {
            console.error('Error checking calculation state:', error);
        });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadTemplate();
    initializeUI();
});