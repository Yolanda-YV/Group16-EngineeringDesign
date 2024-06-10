// Load pyodide as a cdn

export const loadPyodide = async () => {
    if (!window.pyodide) {
        window.pyodide = await window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.20.0/full/' });
    }
    return window.pyodide;
};
