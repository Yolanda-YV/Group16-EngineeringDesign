//Code editor
import React, { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import '../index.css';
import Save from './svg/Save.jsx';
import Submit from './svg/Submit.jsx';

// NOTE: Editor height is 100vh - 90px (Navbar) - 50px (Submit button) - 4.5rem (Gaps and Padding)
const CodeTool = ({handleEditorChange, handleSubmit, handleSave, hint, isCorrect, code}) => {
    const [showHint, setShowHint] = useState(false);
    // const [showCode, setShowCode] = useState(null);
    // Show hint when the answer is incorrect
    useEffect(() => {
        if (isCorrect === false) {
            setShowHint(true);
        } else if (isCorrect === true || isCorrect === null) {
            setShowHint(false);
        }
    }, [isCorrect]);
    // useEffect(() => {
    //     if (code) {
    //         console.log("Code: ", code);
    //         setShowCode(code);
    //     } else {
    //         console.log("Code is empty", code);
    //         setShowCode('# Write your code here');
    //     }
    // }, [code]);
    // Close hint popup
    const closeHint = () => {
        setShowHint(false);
    };
    console.log(code);
    return (
        <form className='code-tool' onSubmit={handleSubmit}>
            <Editor 
                height='calc(100vh - 100px - 50px - 4.75rem)'
                width='100%'
                theme='vs-dark'
                defaultLanguage='python'
                defaultValue='# Write your code here'
                value={code ? code : '# Write your code here'}
                onChange={handleEditorChange}></Editor>
            <div className='save-submit'>
                <button className='submit-btn' type='button' onClick={handleSave}><Save color={'#EEEEEE'} />Save</button>
                <button className='submit-btn' type='submit'><Submit color={'#EEEEEE'} /> Submit</button>
            </div>
            {showHint && (
                <div className='hint-popup'>
                    <div className='hint-content'>
                        <button className='close-hint' onClick={closeHint}>X</button>
                        <p>{hint}</p>
                    </div>
                </div>
            )}
        </form>
    );
}

export default CodeTool;
