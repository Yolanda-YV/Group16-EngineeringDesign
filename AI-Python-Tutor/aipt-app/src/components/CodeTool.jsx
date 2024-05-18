import react from 'react';
import Editor from '@monaco-editor/react';
import '../index.css';
// NOTE: Editor height is 100vh - 90px (Navbar) - 50px (Submit button) - 5rem (Gaps and Padding)
const CodeTool = ({handleEditorChange, handleSubmit}) => {
    return (
        <form className='code-tool' onSubmit={handleSubmit}>
            <Editor 
                height='calc(100vh - 100px - 50px - 5rem)'
                width='100%'
                theme='vs-dark'
                defaultLanguage='python'
                defaultValue='# Write your code here'
                onChange={handleEditorChange}></Editor>
                <div style={{height: 'stretch'}}></div>
            <button className='submit-btn' type='submit'>Submit</button>
        </form>
    );
}

export default CodeTool