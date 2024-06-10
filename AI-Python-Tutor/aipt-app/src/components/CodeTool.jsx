//Code editor
import React, { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import '../index.css';
import { loadPyodide } from '../modules/Interpreter';

// NOTE: Editor height is 100vh - 90px (Navbar) - 50px (Submit button) - 4.5rem (Gaps and Padding)
// const CodeTool = ({handleEditorChange, handleSubmit}) => {
//     return (
//         <form className='code-tool' onSubmit={handleSubmit}>
//             <Editor 
//                 height='calc(100vh - 100px - 50px - 4.5rem)'
//                 width='100%'
//                 theme='vs-dark'
//                 defaultLanguage='python'
//                 defaultValue='# Write your code here'
//                 onChange={handleEditorChange}></Editor>
//             <button className='submit-btn' type='submit'>Submit</button>
//         </form>
//     );
// }

// export default CodeTool

const PythonEditor = () => {
    const [pyodide, setPyodide] = useState(null);
    const [output, setOutput] = useState('');
    const editorRef = useRef(null);
    const pyopRef = useRef(null);

    useEffect(() => {
        const initPyodide = async () => {
            const pyodideInstance = await loadPyodide();
            setPyodide(pyodideInstance);
            setupPyodide(pyodideInstance);
        };

        initPyodide();

        const intervalId = setInterval(() => {
            if (pyodide && editorRef.current) {
                runPython(editorRef.current.getValue());
            }
        }, 2000);

        return () => clearInterval(intervalId);
    }, [pyodide]);

    const makeop = (s) => {
        console.log(s);
        setOutput(s);
    };

    const setupPyodide = (pyodide) => {
        pyodide.runPython(startcode);
        pyodide.globals.set('code_to_run', 'Waiting for code...');
        makeop(pyodide.runPython('run_code(code_to_run)'));
    };

    const runPython = (pycode) => {
        pyodide.globals.set('code_to_run', pycode);
        makeop(pyodide.runPython('run_code(code_to_run)'));
    };

    const handleRunClick = () => {
        if (editorRef.current) {
            const pycode = editorRef.current.getValue();
            setOutput('');
            runPython(pycode);
        }
    };

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
        editor.setValue(`# Hello World!\n
            Hello\n
            Hello\n`);
    };

    return (
        <div>
            <Editor
                height="calc(100vh - 100px - 50px - 4.5rem)"
                language="python"
                theme="vs-dark"
                onMount={handleEditorDidMount}
            />
            <button id="run-btn" onClick={handleRunClick}>Run</button>
            <div id="python-out" ref={pyopRef}>{output}</div>
        </div>
    );
};

export default PythonEditor;

