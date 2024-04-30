import react from 'react';
import { useRef } from 'react';
import Editor from '@monaco-editor/react';
import '../index.css';
import CodeTool from '../components/CodeTool';
import ChatTool from '../components/ChatTool';

const Practice = () => {
    // Using useRef to hold code editor value to store it between re-renders 
    // - doesn't reset on every render 
    // - doesn't trigger a re-render on change)
    const codeValueRef = useRef("")
    const promptValueRef = useRef("")

    const handleCodeSubmit = async (e) => {
        e.preventDefault()
        const code = codeValueRef.current
        window.alert(code, typeof(code))
    }
    const handlePromptSubmit = async (e) => {
        e.preventDefault()
        const prompt = promptValueRef.current
        window.alert(prompt, typeof(prompt))
    }
    const handleEditorChange = (value, event) => {
        codeValueRef.current = value
    }
    const handlePromptChange = (event) => {
        let value = event.target.value
        console.log(value)
        promptValueRef.current = value
    }

    return (
        <div className='practice-page'>
            <ChatTool
                handlePromptChange={handlePromptChange}
                handleSubmit={handlePromptSubmit} />
            <CodeTool 
                handleEditorChange={handleEditorChange} 
                handleSubmit={handleCodeSubmit} />
        </div>
    );
}

export default Practice