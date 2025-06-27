export const appTemplate = `
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
                    <option value="inv">Inv</option>
                    <option value="gpinv">GPinv</option>
                    <option value="ppinv">PPinv</option>
                    <option value="comb">Comb</option>
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

            <div class="control-group">
                <div class="control-label">Max comb</div>
                <div class="increment-control">
                    <input type="number" class="input-field" id="max-comb" value="15" min="1" style="width: 50px;">
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