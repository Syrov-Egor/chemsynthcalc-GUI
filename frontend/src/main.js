import { appTemplate } from './template.js';
import { updateStatus } from './modules/status.js';
import { updateRunButton } from './modules/buttonState.js';
import { makeResultsAdaptive } from './modules/adaptiveLayout.js';
import { toggleResultsSpoiler, updateResultsSpoiler } from './modules/spoiler.js';
import { createResultsTable, updateTableVisibility } from './modules/table.js';
import { handleModeChange } from './modules/modeHandlers.js';
import { runCalculation, stopCalculation } from './modules/calculation.js';
import { setupKeyboardShortcuts } from './modules/keyboardShortcuts.js';
import { IsCalculating } from '../wailsjs/go/main/App.js';

// Make functions globally accessible
window.runCalculation = runCalculation;
window.stopCalculation = stopCalculation;
window.toggleResultsSpoiler = toggleResultsSpoiler;

function loadTemplate() {
    document.querySelector('#app').innerHTML = appTemplate;
}

function initializeEventListeners() {
    // Focus equation input
    const equationInput = document.getElementById('equation-input');
    if (equationInput) {
        equationInput.focus();
        equationInput.addEventListener('keypress', e => {
            if (e.key === 'Enter' && !e.ctrlKey && !e.metaKey) {
                runCalculation();
            }
        });
    }

    // Mode change listeners
    document.querySelectorAll('input[name="mode"]').forEach(radio => {
        radio.addEventListener('change', handleModeChange);
    });

    // Initial mode setup
    handleModeChange();
}

function initializeUI() {
    loadTemplate();
    initializeEventListeners();
    setupKeyboardShortcuts();
    updateStatus('ready');
    
    // Initialize button state
    updateRunButton(false);
    
    // Check if calculation was in progress
    IsCalculating().then(calculating => {
        if (calculating) {
            updateRunButton(true);
            updateStatus('loading', 'Calculating...');
        }
    });
    
    // Setup adaptive layout
    window.addEventListener('resize', makeResultsAdaptive);
    new ResizeObserver(makeResultsAdaptive).observe(document.body);
}

document.addEventListener('DOMContentLoaded', initializeUI);