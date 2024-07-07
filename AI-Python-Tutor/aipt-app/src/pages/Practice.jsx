import React, { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import '../index.css';
import CodeTool from '../components/CodeTool';
import ChatTool from '../components/ChatTool';
import Output from '../components/Output';
import { TutorAgent } from '../modules/TutorAgent';
import { ValidatorAgent } from '../modules/ValidatorAgent';
import { Interpreter } from '../modules/Interpreter';

const Practice = () => {
    const [output, setOutput] = useState('Output will be displayed here');
    const [chatHistory, setChatHistory] = useState([]);
    const [task, setTask] = useState('Print the sum of two numbers');
    const codeValueRef = useRef('');
    const promptValueRef = useRef('');
    const tutorAgent = new TutorAgent();
    const validatorAgent = new ValidatorAgent();
    const interpreter = new Interpreter();

    const handleCodeSubmit = async (e) => {
        e.preventDefault();
        const code = codeValueRef.current;
        const validationResult = await validatorAgent.validateCode(code, task);
        const executionResult = await interpreter.runCode(code);
        setOutput(`Validation Result:\n${validationResult}\n\nExecution Result:\n${executionResult}`);
    };

    const handlePromptSubmit = async (e) => {
        e.preventDefault();
        const prompt = promptValueRef.current;
        setChatHistory(prevChatHistory => [
            ...prevChatHistory,
            { content: prompt, type: 'user' }
        ]);
        const response = await tutorAgent.requestResponse(prompt);
        setChatHistory(prevChatHistory => [
            ...prevChatHistory,
            { content: response, type: 'tutor' }
        ]);
    };

    const handleEditorChange = (value, event) => {
        codeValueRef.current = value;
    };

    const handlePromptChange = (event) => {
        let value = event.target.value;
        promptValueRef.current = value;
    };

    return (
        <div className='practice-page'>
            <ChatTool
                handlePromptChange={handlePromptChange}
                handleSubmit={handlePromptSubmit}
                chats={chatHistory}
            />
            <CodeTool
                handleEditorChange={handleEditorChange}
                handleSubmit={handleCodeSubmit}
            />
            <Output output={output} task={task} />
        </div>
    );
};

export default Practice;
