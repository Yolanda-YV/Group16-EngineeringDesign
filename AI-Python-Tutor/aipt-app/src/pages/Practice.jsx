import React, { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import '../index.css';
import CodeTool from '../components/CodeTool';
import ChatTool from '../components/ChatTool';
import Output from '../components/Output';
import { TutorAgent } from '../modules/TutorAgent.js';
import { PromptAgent } from '../modules/PromptAgent.js';

const Practice = () => {
    const [output, setOutput] = useState(`Output will be displayed here:`); // Interpreter feedback
    const [hint, setHint] = useState(''); // Validator hint
    const [isCorrect, setIsCorrect] = useState(null); // Validator boolean
    const [chatHistory, setChatHistory] = useState([]);
    const [task, setTask] = useState({ description: "No task yet!", id: null });
    const [codeFeedback, setCodeFeedback] = useState("No feedback yet!"); // Validator Feedback
    const [taskLoading, setTaskLoading] = useState(false); // Loading state for task retrieval
    const [chatHistoryLoading, setChatHistoryLoading] = useState(true); // Loading state for chat history retrieval
    const codeValueRef = useRef("");
    const promptValueRef = useRef("");
    const tutorAgent = new TutorAgent(); // Creating a TutorAgent object to user TutorAgent methods
    const promptAgent = new PromptAgent(); // Creating a PromptAgent object to user PromptAgent methods

    useEffect(() => {
        const loadChat = async () => {
            const chat = await tutorAgent.getUserChat();
            chat.forEach((chatItem) => {
                if (chatItem.role === 'assistant') {
                    chatItem.content = promptAgent.formatTutorFeedback(chatItem.content);
                }
            });
            setChatHistory(chat);
            setChatHistoryLoading(false);
        };
        loadChat();
    }, []);

    const handleCodeSubmit = async (e) => {
        e.preventDefault();

        try {
            const code = codeValueRef.current;
            console.log('code:', code);
            const formattedCode = await promptAgent.formatCode(code);
            console.log('formattedCode:', formattedCode);
            const response = await tutorAgent.submitCode(formattedCode, task);

            setOutput(response.output);
            setCodeFeedback(response.feedback);
            setHint(response.hint);
            setIsCorrect(response.isCorrect);
        } catch (error) {
            console.error('Error handling code submission:', error);
            setOutput('An error occurred while processing your submission.');
            setCodeFeedback('');
            setHint('');
            setIsCorrect(false);
        }
    };

    const handlePromptSubmit = async (e) => {
        e.preventDefault();
        const textarea = e.target.querySelector('textarea');

        try {
            const prompt = promptValueRef.current;
            setChatHistory(prevChatHistory => [
                ...prevChatHistory, 
                { role: 'user', content: prompt }
            ]);
            textarea.value = '';

            const response = await promptAgent.processUserInput(prompt, 'prompt');
            const formattedFeedback = await promptAgent.formatTutorFeedback(response);

            setChatHistory(prevChatHistory => [
                ...prevChatHistory, 
                { role: 'tutor', content: formattedFeedback }
            ]);
        } catch (error) {
            console.error('Error handling prompt submission:', error);
        }
    };

    const getTask = async () => {
        setTaskLoading(true);
        try {
            const task = await tutorAgent.getTask();
            const taskObj = { description: task.content, id: task.id };
            setTask(taskObj);
            setTaskLoading(false);
        } catch (error) {
            console.error('Error getting task:', error);
        }
    };

    const handleEditorChange = (value, event) => {
        codeValueRef.current = value;
    };

    const handlePromptChange = (event) => {
        let textarea = event.target;
        let value = event.target.value;
        promptValueRef.current = value;
        textarea.style.height = '2rem';
        const { scrollHeight } = textarea;
        textarea.style.height = `${scrollHeight}px`;
    };

    const handleClearChat = () => {
        setChatHistory([]);
    };

    return (
        <div className='practice-page'>
            <ChatTool
                handlePromptChange={handlePromptChange}
                handleSubmit={handlePromptSubmit}
                chats={chatHistory}
                chatLoading={chatHistoryLoading}
                handleClearChat={handleClearChat}
            />
            <CodeTool 
                handleEditorChange={handleEditorChange} 
                handleSubmit={handleCodeSubmit} 
            />
            <Output 
                output={output} 
                task={task.description} 
                getTask={getTask}
                loading={taskLoading}
                feedback={codeFeedback}
                hint={hint}
                isCorrect={isCorrect}
            />
        </div>
    );
};

export default Practice;
