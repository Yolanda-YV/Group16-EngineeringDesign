// Load pyodide as a cdn

export const loadPyodide = async () => {
    const pyodide = await window.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.22.1/full/"
    });
    return pyodide;
};