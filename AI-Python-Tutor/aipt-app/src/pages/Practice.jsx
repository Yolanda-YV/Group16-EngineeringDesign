import react, { useEffect } from 'react';
import { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import '../index.css';
import CodeTool from '../components/CodeTool';
import ChatTool from '../components/ChatTool';
import Output from '../components/Output';
import { TutorAgent } from '../modules/TutorAgent.js';
import { PromptAgent } from '../modules/PromptAgent.js';
import { Interpreter } from '../modules/Interpreter.js'; //TEST

const Practice = () => {
    // Using useRef to hold code editor value to store it between re-renders 
    // - doesn't reset on every render 
    // - doesn't trigger a re-render on change)
    const [output, setOutput] = useState(`Output will be displayed here:`) // Interpreter feedback
    const [chatHistory, setChatHistory] = useState([])
    const [task, setTask] = useState({description: "No task yet!", id: null})
    const [codeFeedback, setCodeFeedback] = useState("No feedback yet!") // Validator Feedback
    const codeValueRef = useRef("")
    const promptValueRef = useRef("")
    const tutorAgent = new TutorAgent(); // Creating a TutorAgent object to user TutorAgent methods
    const interpreter = new Interpreter(); // Creating an Interpreter object to use Interpreter methods TEST
    
    const promptAgent = new PromptAgent(); // Creating a PromptAgent object to user PromptAgent methods

    useEffect(() => {
        // Retrieving chat history from the TutorAgent
        const loadChat = async () => {
            const chat = await tutorAgent.getUserChat();
            // Formatting chat history because they are not saved with html formatting
            chat.forEach((chatItem) => {
                if (chatItem.role === 'assistant') {
                    chatItem.content = promptAgent.formatTutorFeedback(chatItem.content);
                }
            });
            setChatHistory(chat);
        };
        loadChat();
    }, []);

    // Handle code submission, will call prompt agent to get response 
    //  (involves tutor agent, validator agent, and interpreter)
    const handleCodeSubmit = async (e) => {
        e.preventDefault();

        try {
            // Get the code from the ref
            const code = codeValueRef.current;
    
            // Format the code using the PromptAgent's formatCode method
            const formattedCode = await promptAgent.formatCode(code);

            //console.log('formattedCode:', formattedCode);
    
            // Send the formatted code to the tutor agent for further processing
            // NOTE: This is where the request to the Tutor Agent is made
            //       Tutor Agent will call the Validator Agent to validate and interpret the code (using the interpreter)
            //        Validator Agent will return the validator's feedback and the interpreter's feedback
            const response = await tutorAgent.submitCode(formattedCode, task);
            setOutput(response.output);

        } catch (error) {
            console.error('Error handling code submission:', error);
            // Handle errors here, such as displaying an error message to the user
        }
    };
    
    // Handles prompt submission, will call prompt agent to get response
    // Prompt agent will take prompt, filter prompt, and use it to get a response from the tutor agent
    const handlePromptSubmit = async (e) => {
        e.preventDefault()
        const textarea = e.target.querySelector('textarea')
        
        try {
            const prompt = promptValueRef.current;
    
            // Add user prompt to chat history
            setChatHistory(prevChatHistory => [
                ...prevChatHistory, 
                {role: 'user', content: prompt}
            ]);
            textarea.value = '' // Clear the textarea

            // NOTE: This is where the request to the Prompt Agent is made
            //       For testing purposes, using the Tutor Agent directly
            const response = await promptAgent.processUserInput(prompt, 'prompt');
    
            // Format the tutor feedback
            const formattedFeedback = await promptAgent.formatTutorFeedback(response);
    
            // Add tutor response to chat history
            setChatHistory(prevChatHistory => [
                ...prevChatHistory, 
                {role: 'tutor', content: formattedFeedback}
            ]);

        } catch (error) {
            console.error('Error handling prompt submission:', error);
            // Handle errors here, such as displaying an error message to the user
        }
    }
    
    // Handles task retrieval, will call tutor agent to get a response
    // Tutor agent will get a task from the database based on user progress/skill -- for early testing purposes, this task will be random
    const getTask = async () => {
        try {
            const task = await tutorAgent.getTask();
            const taskObj = {description: task.content, id: task.id}
            setTask(taskObj);
        } catch (error) {
            console.error('Error getting task:', error);
        }
    }

    // Handle's changes in user input (code tool and chat tool) and updates the ref
    const handleEditorChange = (value, event) => {
        codeValueRef.current = value
    }
    const handlePromptChange = (event) => {
        let textarea = event.target
        let value = event.target.value
        promptValueRef.current = value
        textarea.style.height = '2rem'
        const { scrollHeight } = textarea
        textarea.style.height = `${scrollHeight}px`
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
            <Output output={output} task={task.description} getTask={getTask} />
        </div>
    );
}

export default Practice