import react from 'react';
import Editor from '@monaco-editor/react';
import '../index.css';

const CodeTool = ({handleEditorChange, handleSubmit}) => {
    return (
        <form className='code-tool' onSubmit={handleSubmit}>
            <Editor 
                height='85.3vh' 
                width='100%'
                theme='vs-dark'
                defaultLanguage='python'
                defaultValue='# Write your code here'
                onChange={handleEditorChange}></Editor>
            <button className='submit-btn' type='submit'>Submit</button>
        </form>
    );
}

export default CodeTool