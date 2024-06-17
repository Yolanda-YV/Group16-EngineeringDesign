// OLD CODE
// // Load pyodide as a cdn

// export const loadPyodide = async () => {
//     if (!window.pyodide) {
//         window.pyodide = await window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.20.0/full/' });
//     }
//     return window.pyodide;
// };

import { loadPyodide } from '../utilities/LoadPyodideUtil.js';

class Interpreter {
    constructor() {
        this.pyodideInstance = null;
    }
    async initPyodide() {
        try {
            this.pyodideInstance = await loadPyodide();
            console.log("Pyodide loaded successfully")
        } catch (error) {
            console.error("ERROR. Failed to load Pyodide", error);
        }
    };
    async runPython(code) {
        if (this.pyodideInstance) {
            try {
                // Redirecting stdout to capture print output
                //  NOTE: by default, print output is not captured
                this.pyodideInstance.runPython(`
                    import sys
                    import io
                    sys.stdout = io.StringIO()
                `);

                // Running the python code
                await this.pyodideInstance.runPythonAsync(code);

                // Getting the value of stdout (the captured output)
                const result = this.pyodideInstance.runPython(`
                    sys.stdout.getvalue()
                `);
                
                console.log("Python code executed successfully");
                return result;
            } catch (error) {
                console.error("ERROR", error);
                return "Failed to run Python code";
            }
        } else {
            console.error("Pyodide not initialized");
            return "Failed to run Python code";
        }
    };
}

export {Interpreter};