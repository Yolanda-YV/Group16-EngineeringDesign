import react from 'react';
import { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import '../index.css';
import CodeTool from '../components/CodeTool';
import ChatTool from '../components/ChatTool';
import Output from '../components/Output';
import { TutorAgent } from '../modules/TutorAgent.js';
import { PromptAgent } from '../modules/PromptAgent.js';

const Practice = () => {
    // Using useRef to hold code editor value to store it between re-renders 
    // - doesn't reset on every render 
    // - doesn't trigger a re-render on change)
    const [output, setOutput] = useState(`Output will be displayed here:`) // Interpreter feedback
    const [chatHistory, setChatHistory] = useState([])
    const [task, setTask] = useState("No task yet!")
    const [codeFeedback, setCodeFeedback] = useState("No feedback yet!") // Validator Feedback
    const codeValueRef = useRef("")
    const promptValueRef = useRef("")
    const tutorAgent = new TutorAgent(); // Creating a TutorAgent object to user TutorAgent methods
    const promptAgent = new PromptAgent(); // Creating a PromptAgent object to user PromptAgent methods

    // Handle code submission, will call prompt agent to get response 
    //  (involves tutor agent, validator agent, and interpreter)
    const handleCodeSubmit = async (e) => {
        e.preventDefault();

        try {
            // Get the code from the ref
            const code = codeValueRef.current;
    
            // Format the code using the PromptAgent's formatCode method
            const formattedCode = await promptAgent.formatCode(code);

            console.log('formattedCode:', formattedCode);
    
            // Send the formatted code to the tutor agent for further processing
            // NOTE: This is where the request to the Tutor Agent is made
            //       Tutor Agent will call the Validator Agent to validate and interpret the code (using the interpreter)
            //        Validator Agent will return the validator's feedback and the interpreter's feedback
            // const response = await tutorAgent.submitCode(formattedCode);
    
            // Update the output with the response from the tutor agent
            setOutput(formattedCode);

        } catch (error) {
            console.error('Error handling code submission:', error);
            // Handle errors here, such as displaying an error message to the user
        }
    };
    
    
    // Handles prompt submission, will call prompt agent to get response
    // Prompt agent will take prompt, filter prompt, and use it to get a response from the tutor agent
    const handlePromptSubmit = async (e) => {
        e.preventDefault()
        try {
            const prompt = promptValueRef.current;
    
            // Add user prompt to chat history
            setChatHistory(prevChatHistory => [
                ...prevChatHistory, 
                {role: 'user', content: prompt}
            ]);
            
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

            // Testing output
            console.log('formattedFeedback:', formattedFeedback);
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
            setTask(task);
        } catch (error) {
            console.error('Error getting task:', error);
        }
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
            <Output output={output} task={task} getTask={getTask} />
        </div>
    );
}

export default Practice