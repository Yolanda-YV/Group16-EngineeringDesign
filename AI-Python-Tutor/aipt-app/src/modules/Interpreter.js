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
     runPython(code) {
        if (this.pyodideInstance) {
            try {
                // const result = await this.pyodideInstance.runPythonAsync(code);
                const result = null;
                this.pyodideInstance.runPython(`print(2)`).then((res) => console.log(res));
                //console.log("Python code executed successfully", result);
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