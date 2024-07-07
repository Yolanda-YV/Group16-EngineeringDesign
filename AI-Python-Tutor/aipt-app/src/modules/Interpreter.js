export const loadPyodide = async () => {
    const pyodide = await window.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.22.1/full/"
    });
    return pyodide;
};

class Interpreter {
    constructor() {
        this.pyodideReadyPromise = loadPyodide();
    }

    async runCode(code) {
        const pyodide = await this.pyodideReadyPromise;
        try {
            const result = await pyodide.runPythonAsync(code);
            return result;
        } catch (error) {
            return error.toString();
        }
    }
}

export { Interpreter };
