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
        this.pyodide = this.initPyodide();
    }
    async initPyodide() {
        try {
            const pyodideInstance = await loadPyodide();
            return pyodideInstance;
        } catch (error) {
            console.error("Failed to load Pyodide", error);
            return null;
        }
    };
    async runPython(code) {
        if (this.pyodide) {
            try {
                const result = await this.pyodide.runPythonAsync(code);
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