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
    const spoilerIndicator = document.getElementById('status-indicator-spoiler');
    const spoilerText = document.getElementById('status-text-spoiler');
    
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
    
    // Sync spoiler status indicators
    if (spoilerIndicator && spoilerText) {
        spoilerIndicator.className = indicator.className;
        spoilerText.textContent = text.textContent;
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

// Improved function to make results section adaptive based on content
function makeResultsAdaptive() {
    const resultsContainer = document.getElementById('results');
    const resultsSection = document.getElementById('results-section');
    const resultsContentDiv = document.querySelector('.bg-gray-800.rounded-lg.border.border-gray-700.overflow-hidden'); // The gray container around results
    
    if (!resultsContainer || !resultsSection) return;
    
    // Get viewport height and calculate available space
    const viewportHeight = window.innerHeight;
    const navHeight = document.querySelector('nav')?.offsetHeight || 64;
    const controlsHeight = document.querySelector('.bg-gray-800.border-b.border-gray-700.p-6')?.offsetHeight || 120;
    const equationHeight = document.querySelector('.bg-gray-800.border-b.border-gray-700.p-6:last-of-type')?.offsetHeight || 80;
    
    // Calculate content dimensions
    const resultsHeaderHeight = 56; // Height of results header
    const resultsContainerPadding = 16; // p-4 = 16px
    const borderAndSpacing = 8; // Borders and spacing
    const tablePadding = 24; // Additional spacing for table
    
    // Get actual text content height
    const textLines = (resultsContainer.textContent || '').split('\n').length;
    const lineHeight = 24; // 1.5rem * 16px
    const actualTextHeight = Math.max(textLines * lineHeight, 48); // Minimum 3 lines
    
    // Check if table exists and is visible
    const table = document.getElementById('results-table');
    let tableHeight = 0;
    if (table && table.style.display !== 'none') {
        tableHeight = table.offsetHeight + tablePadding;
    }
    
    // Calculate the total content height needed
    const contentHeight = actualTextHeight + resultsContainerPadding * 2 + borderAndSpacing;
    const totalNeededHeight = resultsHeaderHeight + contentHeight + tableHeight;
    
    // Calculate available space for results section
    const maxAvailableHeight = viewportHeight - navHeight - controlsHeight - equationHeight - 48; // 48px for margins
    
    // Determine optimal height
    const optimalHeight = Math.min(totalNeededHeight, maxAvailableHeight);
    const finalHeight = Math.max(optimalHeight, 200); // Minimum 200px for UX
    
    // Apply the height
    resultsSection.style.height = `${finalHeight}px`;
    resultsSection.style.flexShrink = '0';
    
    // Ensure the results container can scroll if content is too long
    if (totalNeededHeight > finalHeight) {
        resultsContainer.style.overflowY = 'auto';
        resultsContainer.style.maxHeight = `${finalHeight - resultsHeaderHeight - tableHeight - borderAndSpacing}px`;
    } else {
        resultsContainer.style.overflowY = 'visible';
        resultsContainer.style.maxHeight = 'none';
    }
}

// Function to toggle results spoiler (only for masses mode)
function toggleResultsSpoiler() {
    const spoilerContent = document.getElementById('results-spoiler-content');
    const spoilerIcon = document.getElementById('results-spoiler-icon');
    
    if (!spoilerContent || !spoilerIcon) return;
    
    const isHidden = spoilerContent.style.display === 'none';
    
    if (isHidden) {
        spoilerContent.style.display = 'block';
        spoilerIcon.style.transform = 'rotate(90deg)';
    } else {
        spoilerContent.style.display = 'none';
        spoilerIcon.style.transform = 'rotate(0deg)';
    }
    
    // Update adaptive sizing after toggle with a small delay for transition
    setTimeout(makeResultsAdaptive, 350);
}

// Enhanced function to show/hide spoiler based on mode and success
function updateResultsSpoiler(mode, isSuccess = false) {
    const spoilerButton = document.getElementById('results-spoiler-button');
    const regularResultsHeader = document.getElementById('regular-results-header');
    const spoilerContent = document.getElementById('results-spoiler-content');
    const spoilerIcon = document.getElementById('results-spoiler-icon');
    
    if (!spoilerButton || !regularResultsHeader) return;
    
    if (mode === 'masses' && isSuccess) {
        // Show spoiler interface, hide regular header
        spoilerButton.style.display = 'flex';
        regularResultsHeader.style.display = 'none';
        
        // Initially collapse the spoiler content
        if (spoilerContent && spoilerIcon) {
            spoilerContent.style.display = 'none';
            spoilerIcon.style.transform = 'rotate(0deg)';
        }
    } else {
        // Hide spoiler interface, show regular header
        spoilerButton.style.display = 'none';
        regularResultsHeader.style.display = 'flex';
        
        // Make sure content is visible when not in spoiler mode
        if (spoilerContent) {
            spoilerContent.style.display = 'block';
        }
    }
    
    // Update adaptive sizing after spoiler state change
    setTimeout(makeResultsAdaptive, 100);
}

// Function to hide/show table based on mode and results
function updateTableVisibility(mode = null) {
    const table = document.getElementById('results-table');
    const selectedMode = mode || document.querySelector('input[name="mode"]:checked')?.value;
    
    if (table) {
        if (selectedMode === 'masses') {
            // Keep current visibility if in masses mode - table visibility controlled by data presence
            return;
        } else {
            // Hide table if not in masses mode
            table.style.display = 'none';
            setTimeout(makeResultsAdaptive, 100);
        }
    }
}

// Enhanced function to create and populate the results table
function createResultsTable(tabularData) {
    const selectedMode = document.querySelector('input[name="mode"]:checked')?.value;
    
    // Only show table in masses mode
    if (selectedMode !== 'masses' || !tabularData || tabularData.length === 0) {
        // Hide table if it exists
        const existingTable = document.getElementById('results-table');
        if (existingTable) {
            existingTable.style.display = 'none';
        }
        setTimeout(makeResultsAdaptive, 100);
        return;
    }

    // Remove existing table if it exists
    const existingTable = document.getElementById('results-table');
    if (existingTable) {
        existingTable.remove();
    }

    // Create table container
    const tableContainer = document.createElement('div');
    tableContainer.id = 'results-table';
    tableContainer.className = 'mt-6';
    tableContainer.style.display = 'block'; // Ensure it's visible

    // Create table HTML with Material Design styling using Flowbite
    tableContainer.innerHTML = `
        <div class="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <div class="px-4 py-3 bg-gray-750 border-b border-gray-700">
                <h4 class="text-sm font-semibold text-gray-200">Tabular Results</h4>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-300">
                    <thead class="text-xs text-gray-400 uppercase bg-gray-700">
                        <tr>
                            <th scope="col" class="px-6 py-3 font-medium">Formula</th>
                            <th scope="col" class="px-6 py-3 font-medium">Molar mass, g/mol</th>
                            <th scope="col" class="px-6 py-3 font-medium">Mass, g</th>
                        </tr>
                    </thead>
                    <tbody id="table-body" class="divide-y divide-gray-700">
                    </tbody>
                </table>
            </div>
        </div>
    `;

    // Get table body
    const tableBody = tableContainer.querySelector('#table-body');

    // Populate table rows
    tabularData.forEach((row, index) => {
        const tr = document.createElement('tr');
        tr.className = 'bg-gray-800 hover:bg-gray-750 transition-colors';
        
        tr.innerHTML = `
            <td class="px-6 py-4 font-mono text-sm text-white">${row.formula}</td>
            <td class="px-6 py-4 text-sm text-gray-300">${row.molar.toFixed(4)}</td>
            <td class="px-6 py-4 text-sm text-gray-300">${row.masses.toFixed(6)}</td>
        `;
        
        tableBody.appendChild(tr);
    });

    // Insert table after the results spoiler content container
    const resultsSection = document.getElementById('results-section');
    if (resultsSection) {
        resultsSection.appendChild(tableContainer);
    }
    
    // Update adaptive sizing after table creation
    setTimeout(makeResultsAdaptive, 100);
}

// Function to handle mode changes and enable/disable controls
function handleModeChange() {
    const selectedMode = document.querySelector('input[name="mode"]:checked')?.value;
    
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
    
    // Update table visibility based on mode
    updateTableVisibility(selectedMode);
    
    // Update spoiler visibility (hide when changing modes)
    updateResultsSpoiler(selectedMode, false);
    
    // Make results adaptive after mode change
    setTimeout(makeResultsAdaptive, 150);
}

// Stop calculation function
window.stopCalculation = function() {
    if (!isCurrentlyCalculating) return;
    
    const results = document.getElementById('results');
    const selectedMode = document.querySelector('input[name="mode"]:checked')?.value;
    
    // Show stopping message
    results.textContent = 'Stopping calculation...';
    results.className = 'p-4 h-full overflow-y-auto text-orange-400 font-mono text-sm leading-6 whitespace-pre-wrap';
    updateStatus('cancelled', 'Stopping...');
    
    // Hide spoiler and table during cancellation
    updateResultsSpoiler(selectedMode, false);
    const table = document.getElementById('results-table');
    if (table) {
        table.style.display = 'none';
    }
    
    // Call Go backend to stop calculation
    StopCalculation()
        .then(() => {
            results.textContent = 'Calculation stopped by user.';
            results.className = 'p-4 h-full overflow-y-auto text-orange-400 font-mono text-sm leading-6 whitespace-pre-wrap';
            updateStatus('cancelled', 'Stopped');
            updateRunButton(false);
            
            // Make results adaptive
            setTimeout(makeResultsAdaptive, 100);
        })
        .catch((error) => {
            console.error('Error stopping calculation:', error);
            results.textContent = 'Error stopping calculation.';
            results.className = 'p-4 h-full overflow-y-auto text-red-400 font-mono text-sm leading-6 whitespace-pre-wrap';
            updateStatus('error', 'Stop failed');
            updateRunButton(false);
            
            // Make results adaptive
            setTimeout(makeResultsAdaptive, 100);
        });
};

// Enhanced run calculation function with better UX
window.runCalculation = function() {
    if (isCurrentlyCalculating) return;
    
    const equation = document.getElementById('equation-input').value;
    const mode = document.querySelector('input[name="mode"]:checked')?.value;
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
        
        // Hide spoiler and table on error
        updateResultsSpoiler(mode, false);
        const table = document.getElementById('results-table');
        if (table) {
            table.style.display = 'none';
        }
        
        // Make results adaptive
        setTimeout(makeResultsAdaptive, 100);
        return;
    }
    
    // Show calculation in progress
    results.textContent = 'Running calculation...';
    results.className = 'p-4 h-full overflow-y-auto text-yellow-400 font-mono text-sm leading-6 whitespace-pre-wrap';
    updateStatus('loading');
    
    // Hide spoiler and table during calculation
    updateResultsSpoiler(mode, false);
    const table = document.getElementById('results-table');
    if (table) {
        table.style.display = 'none';
    }
    
    // Update button to stop button
    updateRunButton(true);
    
    // Make results adaptive for loading state
    setTimeout(makeResultsAdaptive, 100);
    
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
                
                // Hide spoiler and table on cancellation
                updateResultsSpoiler(mode, false);
                const table = document.getElementById('results-table');
                if (table) {
                    table.style.display = 'none';
                }
            } else if (result.success) {
                results.textContent = result.details;
                results.className = 'p-4 h-full overflow-y-auto text-green-400 font-mono text-sm leading-6 whitespace-pre-wrap';
                updateStatus('success');
                
                // Show spoiler for masses mode on success
                updateResultsSpoiler(mode, true);
                
                // Create table if in masses mode and tabular data exists
                if (mode === 'masses' && result.tabular && result.tabular.length > 0) {
                    createResultsTable(result.tabular);
                } else {
                    // Hide table if not in masses mode or no tabular data
                    const table = document.getElementById('results-table');
                    if (table) {
                        table.style.display = 'none';
                    }
                }
            } else {
                results.textContent = result.message;
                results.className = 'p-4 h-full overflow-y-auto text-red-400 font-mono text-sm leading-6 whitespace-pre-wrap';
                updateStatus('error');
                
                // Hide spoiler and table on error
                updateResultsSpoiler(mode, false);
                const table = document.getElementById('results-table');
                if (table) {
                    table.style.display = 'none';
                }
            }
            
            // Make results adaptive after content change
            setTimeout(makeResultsAdaptive, 150);
        })
        .catch((error) => {
            console.error('Calculation error:', error);
            results.textContent = `Error: ${error.message || 'Calculation failed'}`;
            results.className = 'p-4 h-full overflow-y-auto text-red-400 font-mono text-sm leading-6 whitespace-pre-wrap';
            updateStatus('error');
            
            // Hide spoiler and table on error
            updateResultsSpoiler(mode, false);
            const table = document.getElementById('results-table');
            if (table) {
                table.style.display = 'none';
            }
            
            // Make results adaptive after error
            setTimeout(makeResultsAdaptive, 150);
        })
        .finally(() => {
            // Always restore run button
            updateRunButton(false);
        });
};

// Make toggle function globally accessible
window.toggleResultsSpoiler = toggleResultsSpoiler;

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
    console.log('ChemSynthCalc initialized with modern UI, adaptive results, and stop functionality');
    
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
    
    // Make initial results adaptive
    setTimeout(makeResultsAdaptive, 200);
    
    // Add ResizeObserver to handle window resizes
    if (window.ResizeObserver) {
        const resizeObserver = new ResizeObserver(() => {
            setTimeout(makeResultsAdaptive, 100);
        });
        
        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
            resizeObserver.observe(resultsSection);
        }
        
        // Also observe window resizes
        resizeObserver.observe(document.body);
    }
    
    // Add window resize listener as fallback
    window.addEventListener('resize', () => {
        setTimeout(makeResultsAdaptive, 150);
    });
    
    // Add observer to make results adaptive when content changes
    const results = document.getElementById('results');
    if (results) {
        const observer = new MutationObserver(() => {
            setTimeout(makeResultsAdaptive, 100);
        });
        observer.observe(results, { childList: true, subtree: true, characterData: true });
    }
    
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
        
        /* Table styling enhancements */
        .bg-gray-750 {
            background-color: #374151;
        }
        
        #results-table table th {
            background-color: #374151;
        }
        
        #results-table table tr:hover {
            background-color: #4b5563;
        }
        
        /* Smooth table transitions */
        #results-table {
            transition: all 0.3s ease-in-out;
        }
        
        /* Adaptive results section */
        #results-section {
            transition: height 0.3s ease-in-out;
            overflow: hidden;
        }
        
        /* Spoiler button styling */
        #results-spoiler-icon {
            transition: transform 0.2s ease-in-out;
        }
        
        /* Spoiler content transitions */
        #results-spoiler-content {
            transition: all 0.3s ease-in-out;
            overflow: hidden;
        }
        
        /* Ensure proper text wrapping and sizing */
        #results {
            word-wrap: break-word;
            white-space: pre-wrap;
        }
        
        /* Smooth scrolling for results */
        #results::-webkit-scrollbar {
            width: 8px;
        }
        
        #results::-webkit-scrollbar-track {
            background: #374151;
            border-radius: 4px;
        }
        
        #results::-webkit-scrollbar-thumb {
            background: #6b7280;
            border-radius: 4px;
        }
        
        #results::-webkit-scrollbar-thumb:hover {
            background: #9ca3af;
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