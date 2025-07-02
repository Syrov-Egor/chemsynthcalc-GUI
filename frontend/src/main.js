import { appTemplate } from './template.js';
import { updateStatus } from './modules/status.js';
import { updateRunButton } from './modules/buttonState.js';
import { makeResultsAdaptive } from './modules/adaptiveLayout.js';
import { toggleResultsSpoiler, updateResultsSpoiler } from './modules/spoiler.js';
import { createResultsTable, updateTableVisibility } from './modules/table.js';
import { handleModeChange } from './modules/modeHandlers.js';
import { runCalculation, stopCalculation, getLastResult, setLastResult } from './modules/calculation.js';
import { setupKeyboardShortcuts } from './modules/keyboardShortcuts.js';
import { SaveState, LoadState, IsCalculating } from '../wailsjs/go/main/App.js';

// Make functions globally accessible
window.runCalculation = runCalculation;
window.stopCalculation = stopCalculation;
window.toggleResultsSpoiler = toggleResultsSpoiler;

function loadTemplate() {
    document.querySelector('#app').innerHTML = appTemplate;
}

async function saveState() {
    const state = collectAppState();
    try {
        await SaveState(state);
        updateStatus('success', 'Saved');
    } catch (error) {
        console.error('Error saving state:', error);
        updateStatus('error', 'Save failed: ' + error.message);
    }
}

async function loadState() {
    try {
        const state = await LoadState();
        if (state) {
            applyAppState(state);
            updateStatus('success', 'Loaded');
        }
    } catch (error) {
        console.error('Error loading state:', error);
        updateStatus('error', 'Load failed: ' + error.message);
    }
}

function collectAppState() {
    const lastResult = getLastResult();
    return {
        equation: document.getElementById('equation-input').value || "H2+O2=H2O",
        mode: document.querySelector('input[name="mode"]:checked')?.value || "masses",
        algorithm: document.getElementById('algorithm').value || "auto",
        runMode: document.getElementById('runmode').value || "balance",
        targetNum: parseInt(document.getElementById('target-num').value) || 0,
        targetMass: parseFloat(document.getElementById('target-mass').value) || 1.0,
        intify: document.getElementById('intify').checked || true,
        outputPrecision: parseInt(document.getElementById('output-precision').value) || 4,
        floatTolerance: parseInt(document.getElementById('float-tolerance').value) || 8,
        maxComb: parseInt(document.getElementById('max-comb').value) || 15,
        results: document.getElementById('results').textContent || "Ready",
        spoilerOpen: document.getElementById('results-spoiler-content').style.display === 'block',
        status: document.getElementById('status-indicator').className || "w-3 h-3 bg-gray-500 rounded-full",
        statusMessage: document.getElementById('status-text').textContent || "Ready",
        results: lastResult ? 
            (lastResult.details || document.getElementById('results').textContent) : 
            document.getElementById('results').textContent || "Ready",
        tabular: lastResult?.tabular || null,
    };
}

function applyAppState(state) {
    // Set input values with null checks
    document.getElementById('equation-input').value = state.equation || "H2+O2=H2O";
    
    // Set radio buttons with null check
    const mode = state.mode || "masses";
    document.querySelectorAll(`input[name="mode"]`).forEach(radio => {
        radio.checked = radio.value === mode;
    });

    if (state.mode === 'masses' && state.tabular) {
        createResultsTable(state.tabular);
    } else {
        document.getElementById('results').textContent = state.results || "Ready";
    }

    // Set last result for UI components
    setLastResult({
        success: state.status.includes('success'),
        details: state.results,
        tabular: state.tabular || null
    });
    
    // Set other controls with null checks
    document.getElementById('algorithm').value = state.algorithm || "auto";
    document.getElementById('runmode').value = state.runMode || "balance";
    document.getElementById('target-num').value = state.targetNum || 0;
    document.getElementById('target-mass').value = state.targetMass || 1.0;
    document.getElementById('intify').checked = state.intify !== undefined ? state.intify : true;
    document.getElementById('output-precision').value = state.outputPrecision || 4;
    document.getElementById('float-tolerance').value = state.floatTolerance || 8;
    document.getElementById('max-comb').value = state.maxComb || 15;
    
    // Set results with default
    document.getElementById('results').textContent = state.results || "Ready";
    
    // Set status with defaults
    const statusClass = state.status || "w-3 h-3 bg-gray-500 rounded-full";
    const statusMsg = state.statusMessage || "Ready";
    document.getElementById('status-indicator').className = statusClass;
    document.getElementById('status-text').textContent = statusMsg;
    document.getElementById('status-indicator-spoiler').className = statusClass;
    document.getElementById('status-text-spoiler').textContent = statusMsg;
    
    // Set spoiler state
    const spoilerContent = document.getElementById('results-spoiler-content');
    const spoilerIcon = document.getElementById('results-spoiler-icon');
    if (state.spoilerOpen) {
        spoilerContent.style.display = 'block';
        spoilerIcon.style.transform = 'rotate(90deg)';
    } else {
        spoilerContent.style.display = 'none';
        spoilerIcon.style.transform = 'rotate(0deg)';
    }
    
    // Update UI components
    handleModeChange();
    makeResultsAdaptive();

    // Force spoiler update after setting mode
    const isMassesSuccess = state.mode === 'masses' && state.tabular;
    updateResultsSpoiler(state.mode, isMassesSuccess);
    
    // Apply saved spoiler state if applicable
    if (isMassesSuccess) {
        const spoilerContent = document.getElementById('results-spoiler-content');
        const spoilerIcon = document.getElementById('results-spoiler-icon');
        if (state.spoilerOpen) {
            spoilerContent.style.display = 'block';
            spoilerIcon.style.transform = 'rotate(90deg)';
        }
    }
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
    document.getElementById('file-save').addEventListener('click', saveState);
    document.getElementById('file-load').addEventListener('click', loadState);

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