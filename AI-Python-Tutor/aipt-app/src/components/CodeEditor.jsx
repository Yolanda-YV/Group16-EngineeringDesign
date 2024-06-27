import React, { useEffect, useRef, useState } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/mode/python/python';
import 'codemirror/theme/base16-dark.css';
import { loadPyodide } from 'pyodide';

const CodeEditor = () => {
    const [pyodide, setPyodide] = useState(null);
    const [output, setOutput] = useState('');
    const codeMirrorRef = useRef(null);
    const runBtnRef = useRef(null);
    const pyopRef = useRef(null);

    useEffect(() => {
        // Initialize CodeMirror editor
        // This will contain the editor of the practice page
        codeMirrorRef.current = CodeMirror.fromTextArea(document.getElementById('codearea'), {
            lineNumbers: true,
            mode: 'python',
            theme: 'base16-dark',
        });
        codeMirrorRef.current.setValue(`# Hello World!\n`);

        // Load Pyodide and set it up
        const initPyodide = async () => {
            const pyodideInstance = await loadPyodide();
            setPyodide(pyodideInstance);
            setupPyodide(pyodideInstance, startcode);
        };

        initPyodide();

        // Setup interval for autorun
        const intervalId = setInterval(() => {
            if (pyodide) {  
                runPython(codeMirrorRef.current.getValue());
            }
        }, 2000);

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, [pyodide]);

    const makeop = (s) => {
        console.log(s);
        setOutput(s);
    };

    const setupPyodide = (pyodide, startcode) => {
        pyodide.runPython(startcode);
        pyodide.globals.code_to_run = `Waiting for code...`;
        makeop(pyodide.runPython(`run_code(code_to_run)`));
    };

    const runPython = (pycode) => {
        pyodide.globals.code_to_run = pycode;
        makeop(pyodide.runPython('run_code(code_to_run)'));
    };

    const evaluatePython = (pycode) => {
        pyodide.runPythonAsync(pycode)
            .then(output => makeop(output))
            .catch(err => makeop(err));
    };

    const handleRunClick = () => {
        const pycode = codeMirrorRef.current.getValue();
        setOutput('');
        runPython(pycode);
    };

    return (
        <div>
            <textarea id="codearea"></textarea>
            <button id="run-btn" ref={runBtnRef} onClick={handleRunClick}>Run</button>
            <div id="python-out" ref={pyopRef}>{output}</div>
        </div>
    );
};

export default CodeEditor;

const startcode = `
import sys, io, traceback
namespace = {}  # use separate namespace to hide run_code, modules, etc.
def run_code(code):
    """run specified code and return stdout and stderr"""
    out = io.StringIO()
    oldout = sys.stdout
    olderr = sys.stderr
    sys.stdout = sys.stderr = out
    try:
        # change next line to exec(code, {}) if you want to clear vars each time
        exec(code, namespace)
    except:
        traceback.print_exc()

    sys.stdout = oldout
    sys.stderr = olderr
    return out.getvalue()
`;
