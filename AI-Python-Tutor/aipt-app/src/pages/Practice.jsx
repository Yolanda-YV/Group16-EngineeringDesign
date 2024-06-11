import react from 'react';
import { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import '../index.css';
import CodeTool from '../components/CodeTool';
import ChatTool from '../components/ChatTool';
import Output from '../components/Output';
import { TutorAgent } from '../modules/TutorAgent.js';
import { Interpreter } from '../modules/Interpreter.js'; //TEST

const Practice = () => {
    // Using useRef to hold code editor value to store it between re-renders 
    // - doesn't reset on every render 
    // - doesn't trigger a re-render on change)
    const [output, setOutput] = useState(`Output will be displayed here`)
    const [chatHistory, setChatHistory] = useState([])
    const [task, setTask] = useState("Print the sum of two numbers")
    const codeValueRef = useRef("")
    const promptValueRef = useRef("")
    const tutorAgent = new TutorAgent(); // Creating a TutorAgent object to user TutorAgent methods
    const interpreter = new Interpreter(); // Creating an Interpreter object to use Interpreter methods TEST

    // Handle code submission, will call prompt agent to get response 
    //  (involves tutor agent, validator agent, and interpreter)
    const handleCodeSubmit = async (e) => {
        e.preventDefault();
        const code = codeValueRef.current;
        try {
            // Testing interpreter
            await interpreter.initPyodide();
            const result = await interpreter.runPython(code); // Assuming there's a method to execute code
            setOutput(result);
        } catch (error) {
            setOutput(`Error: ${error.message}`);
        }
    };
    // Handles prompt submission, will call prompt agent to get response
    // Prompt agent will take prompt, filter prompt, and use it to get a response from the tutor agent
    const handlePromptSubmit = async (e) => {
        e.preventDefault()
        const prompt = promptValueRef.current
        // Add user prompt to chat history
        setChatHistory(prevChatHistory => [
            ...prevChatHistory, 
            {content: prompt, type: 'user'}])
        
        // NOTE: This is where the request to the Prompt Agent is made
        //       For testing purposes, using the Tutor Agent directly
        const response = await tutorAgent.requestResponse(prompt)
        // Add user prompt to chat history
        setChatHistory(prevChatHistory => [
            ...prevChatHistory, 
            {content: response, type: 'tutor'}])
    }

    // Handle's changes in user input (code tool and chat tool) and updates the ref
    const handleEditorChange = (value, event) => {
        codeValueRef.current = value
    }
    const handlePromptChange = (event) => {
        let value = event.target.value
        promptValueRef.current = value
    }

    return (
        <div className='practice-page'>
            <ChatTool
                handlePromptChange={handlePromptChange}
                handleSubmit={handlePromptSubmit}
                chats={chatHistory} />
            <CodeTool 
                handleEditorChange={handleEditorChange} 
                handleSubmit={handleCodeSubmit} />
            <Output output={output} task={task} />
        </div>
    );
}

export default Practice