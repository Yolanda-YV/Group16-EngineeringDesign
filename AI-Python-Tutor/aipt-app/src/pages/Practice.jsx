import react, { useEffect } from 'react';
import { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import '../index.css';
import CodeTool from '../components/CodeTool';
import ChatTool from '../components/ChatTool';
import Output from '../components/Output';
import { TutorAgent } from '../modules/TutorAgent.js';
import { PromptAgent } from '../modules/PromptAgent.js';
import Sidebar from '../components/Sidebar.jsx';
import { ClipLoader } from 'react-spinners';

const Practice = () => {
    // Using useRef to hold code editor value to store it between re-renders 
    // - doesn't reset on every render 
    // - doesn't trigger a re-render on change)
    const [output, setOutput] = useState(null) // Interpreter feedback
    const [hint, setHint] = useState('') // Validator hint
    
    const [tasks, setTasks] = useState([]) // List of tasks
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0) // Index of current task
    const [completedTasks, setCompletedTasks] = useState([]) // List of completed tasks

    const [isCorrect, setIsCorrect] = useState(null) // Validator boolean
    const [userInfo, setUserInfo] = useState(null) // User info 
    const [chatHistory, setChatHistory] = useState([])
    const [task, setTask] = useState(null)
    const [topic, setTopic] = useState(null) // Topic
    const [topicList, setTopicList] = useState(null) // List of topics
    const [codeFeedback, setCodeFeedback] = useState(null) // Validator Feedback
    const [pageLoading, setPageLoading] = useState(true) // Loading state for page
    const [taskLoading, setTaskLoading] = useState(false) // Loading state for task retrieval
    const [chatHistoryLoading, setChatHistoryLoading] = useState(true) // Loading state for chat history retrieval
    const codeValueRef = useRef("")
    const promptValueRef = useRef("")
    const tutorAgent = new TutorAgent(); // Creating a TutorAgent object to user TutorAgent methods
    const promptAgent = new PromptAgent(); // Creating a PromptAgent object to user PromptAgent methods

    useEffect(() => {
        // Retrieving chat history from the TutorAgent
        const loadChat = async () => {
            const chat = await tutorAgent.getUserChat();
            // Formatting chat history because they are not saved with html formatting
            chat.forEach((chatItem) => {
                chatItem.content = promptAgent.formatTutorFeedback(chatItem.content);
            });
            setChatHistory(chat);
            setChatHistoryLoading(false);
            // Because loading chat will often take longest, set page loading to false here
            if (pageLoading) {
                setPageLoading(false);
            } 
        };
        const loadTopics = async () => {
            const topics = await tutorAgent.getTopics();
            setTopicList(topics);
        };
        const getUserInfo = async () => {
            const userInfo = await tutorAgent.getUser();
            setUserInfo(userInfo);
        };
        getUserInfo();
        loadTopics();
        loadChat();
        getTask();
        
    }, []);

    useEffect(() => {
        if (topic) {
        getTask();
        }
    }, [topic]);

    // Handle code submission, will call prompt agent to get response 
    //  (involves tutor agent, validator agent, and interpreter)
    const handleCodeSubmit = async (e) => {
        e.preventDefault();

        try {
            // Get the code from the ref
            const code = codeValueRef.current;

            // console.log('code:', code);
    
            // // Format the code using the PromptAgent's formatCode method
            // const formattedCode = await promptAgent.formatCode(code);

            // console.log('formattedCode:', formattedCode);
    
            // Send the formatted code to the tutor agent for further processing
            // NOTE: This is where the request to the Tutor Agent is made
            //       Tutor Agent will call the Validator Agent to validate and interpret the code (using the interpreter)
            //        Validator Agent will return the validator's feedback and the interpreter's feedback
            const response = await tutorAgent.submitCode(code, task);

            setOutput(response.output);
            setCodeFeedback(response.feedback);
            setHint(response.hint);
            setIsCorrect(response.isCorrect);
            if (!response.isCorrect && task.score > 0) {
                console.log('Decrementing existing score...')
                setTask({
                    ...task,
                    score: task.score - 10});
            } else if (!response.isCorrect && !task.score) {
                console.log('Decrementing new score...')
                setTask({
                    ...task,
                    score: 100 - 10});
            }

        } catch (error) {
            console.error('Error handling code submission:', error);
            setOutput('An error occurred while processing your submission.');
            setCodeFeedback('');
            setHint('');
            setIsCorrect(false);
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

    // Handles saving code to the database
    const handleSave = async () => {
        try {
            // Get the code from the ref
            const code = codeValueRef.current;
            // Save the code to the database
            await tutorAgent.saveCode(code, task);
        } catch (error) {
            console.error('Error saving code:', error);
            // Handle errors here, such as displaying an error message to the user
        }
    }
    
    // Handles task retrieval, will call tutor agent to get a response
    // Tutor agent will get a task from the database based on user progress/skill -- for early testing purposes, this task will be random
    // const getTask = async () => {
    //     //console.log('Getting task...')
    //     // Fetching task, task loading true
    //     setTaskLoading(true);
    //     try {
    //         const task = await tutorAgent.getTask(topic ? topic.id : null);
    //         const taskObj = {description: task.content, id: task.id}
    //         setTask(taskObj);
    //         // If the topic has changed, update the topic
    //         if (!topic || topic.id != task.topic_id && task.topic) {
    //             //console.log('Setting topic...')
    //             setTopic({description: task.topic, id: task.topic_id});
    //         }

    //         // Task fetched and set, task loading false
    //         setTaskLoading(false);
    //     } catch (error) {
    //         console.error('Error getting task:', error);
    //     }
    // }

    // Handles task retrieval, will call tutor agent to get a response
    const getTask = async () => {
        setTaskLoading(true);
        try {
            const tasks = await tutorAgent.getTask(topic ? topic.id : null);
            // If tasks are fetched, set the tasks, set the current task index to 0, and set the current task
            if (tasks && tasks.length > 0) {
                setTasks(tasks);
                setCurrentTaskIndex(0);
                setTask({ description: tasks[0].content, id: tasks[0].id, score: tasks[0].score, code: tasks[0].code });

                // If the topic has changed, update the topic
                if (!topic || (topic.id !== tasks[0].topic_id && tasks[0].topic)) {
                    setTopic({ description: tasks[0].topic, id: tasks[0].topic_id });
                }

                // Set feedback to defaults
                setIsCorrect(null);
                setCodeFeedback(null);
                setHint(null);
                setOutput(null);

            } else {
                console.error('No tasks fetched.');
            }
        } catch (error) {
            console.error('Error getting task:', error);
        } finally {
            setTaskLoading(false);
        }
    };

    // Cycles through tasks, will call tutor agent to get a response
    const cycleTask = () => {
        setCurrentTaskIndex(prevIndex => {
            const incompleteTasks = tasks.filter(task => !completedTasks.includes(task.id));
            // If there are no incomplete tasks, log that all tasks are completed and return the previous index
            if (incompleteTasks.length === 0) {
                console.log('All tasks completed.');
                return prevIndex;
            }
            // Get the next incomplete task
            const newIndex = (prevIndex + 1) % incompleteTasks.length;
            const taskObj = { 
                description: incompleteTasks[newIndex].content, 
                id: incompleteTasks[newIndex].id, 
                score: incompleteTasks[newIndex].score, 
                code: incompleteTasks[newIndex].code }
            console.log('Cycling task:', taskObj);

            // Set feedback to defaults
            setIsCorrect(null);
            setCodeFeedback(null);
            setHint(null);
            setOutput(null);

            setTask(taskObj);

            
            // If the topic has changed, update the topic
            return newIndex;
        });
    };

    // Handle's changes in user input (code tool and chat tool) and updates the ref
    const handleEditorChange = (value, event) => {
        //console.log('Code changed:', value)
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
    // Handles topic selection
    const handleTopicSelection = (event) => {
        setTopic({description: event.target.innerHTML, id: event.target.id});
    }
    const handleClearChat = () => {
        setChatHistory([]);
    };

    return (
        <div className='practice-page'>
            <Sidebar 
                topics={topicList}
                onTopicClick={handleTopicSelection}
                level={userInfo ? userInfo.level : null} />
            {pageLoading ? (
                <div className='loader-div'>
                    <ClipLoader
                    color='#088be2'
                    loading={pageLoading}
                    size={80}/>
                </div>
            ) : (
                <div className='testclass'>
                    <ChatTool
                        handlePromptChange={handlePromptChange}
                        handleSubmit={handlePromptSubmit}
                        handleClearChat={handleClearChat}
                        chats={chatHistory}
                        chatLoading={chatHistoryLoading}
                        topic={topic ? topic.description : null} />
                    <CodeTool 
                        handleEditorChange={handleEditorChange} 
                        handleSubmit={handleCodeSubmit}
                        hint={hint}
                        isCorrect={isCorrect}
                        code={task ? task.code : null}
                        handleSave={handleSave} />
                    <Output 
                        output={output ? output : 'Code output displayed here'} 
                        task={task ? task.description : null} 
                        getTask={getTask}
                        cycleTask={cycleTask}
                        loading={taskLoading}
                        feedback={codeFeedback}
                        hint={hint}
                        isCorrect={isCorrect}
                        score={task ? task.score : null} />
                </div>
            )}
        </div>
    );
}

export default Practice