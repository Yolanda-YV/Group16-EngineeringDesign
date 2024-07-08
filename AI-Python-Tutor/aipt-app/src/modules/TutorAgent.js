import supabase from '../utilities/Supabase.js';
// npm i @xenova/transformers
import { pipeline, env } from '@xenova/transformers';
// Have to have the lines below to avoid errors in the dev server
env.allowLocalModels = false;
//env.useBrowserCache = false;

import { Interpreter } from './Interpreter.js';
import { ValidatorAgent } from './ValidatorAgent.js';

// TutorAgent makes an API call to the Response serverless function to request a response from OPENAI
class TutorAgent {
    constructor() {
        this.interpreter = new Interpreter();
        this.validator = new ValidatorAgent();
        this.generateEmbed();
    }
    async generateEmbed() {
        this.generateEmbedding = await pipeline('feature-extraction', 'Supabase/gte-small');
    }
    async requestResponse(prompt) {
        // This function will call the Response serverless function to get a response from OPENAI

        const relChat = await this.getRelevantChat(prompt);

        // Putting chat history and new prompt together
        const data = {history: relChat, prompt: prompt}

        // Make a request to the Response serverless function
        const response = await fetch("/.netlify/functions/Response", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        const completion = await response.text();

        // Save chat history
        if (completion) {
            await this.saveUserChat('user', prompt);
            await this.saveUserChat('assistant', completion);
        }

        return completion;
    }
    async submitCode(code, task) {
        // This function will call a ValidatorAgent method/function to validate and interpret the code
        //   The code will be sent as a string to the ValidatorAgent
        //   The ValidatorAgent will return a response and output
        try {
            // Validator should be called here, with the code and task, but since it's not implemented, calling Interpreter here
            //  with made up valaidator response
            
            // Boolean to check if code is correct
            const isCorrect = true; // This will be replaced by the validator response
            const feedback = 'Good job!'; // This will be replaced by the validator response
            const hint = 'Check your syntax and try again.'

            await this.interpreter.initPyodide();
            const output = await this.interpreter.runPython(code); // When merging changes, this will instead be a tutor agent method that calls this via the validator
            console.log(output) // Testing output format --- Like code from AI tutor, this needs to be formatted too
            
            this.validator.validateCode(code, task.description, output); // TEST VALIDATOR

            // COMMENTING THIS FOR TESTING PURPOSES
            // // Checking if this is an in-progress task or not
            // const { data:{user} } = await supabase.auth.getUser(); // Getting user

            // // If task exists, update the score, otherwise don't
            // if (task.id) {
            //     // Testing DB function update_score()
            //     const { data, error } = await supabase.rpc("update_score", {
            //         u_id: user.id,
            //         t_id: task.id,
            //         is_correct: isCorrect,
            //         val_response: feedback
            //     });
            //     if (error) {
            //         console.error('Error updating score:', error);
            //     } else {
            //         console.log('Successfully updated score');
            //     }
            // }

            return {output: output, feedback: feedback, hint: hint, isCorrect: isCorrect};
        } catch (error) {
            console.error('Error handling code submission:', error);
            return `Error: ${error.message}`;
        }

        
    }
    async getTask(topicID) {
        // This function will get a task from the database based on user progress/skill
        try {
            const { data:{user} } = await supabase.auth.getUser();
            if (topicID) {
                // Specific topic selected
                const { error, data } = await supabase.rpc("get_task", {
                    u_id: user.id,
                    selected_topic: topicID});
                if (error) {
                    throw error
                } else {
                    return data[0];
                }
            } else {
                // No specific topic selected
                const { error, data } = await supabase.rpc("get_task", {
                    u_id: user.id});
                if (error) {
                    throw error
                } else if (data.length > 0) {
                    // Task that is not completed by user, is in user's level
                    console.log('data:', data);
                    return data[0];
                } else {
                    // No task that is not completed by user and in user's level, 
                    //  means user has completed all tasks in their level, but has not scored high enough on all topics
                    //  So, creating a new task for the user in the first incomplete topic in their level
                    const { error, data } = await supabase.rpc("calculate_all_average_scores", {
                        u_id: user.id
                    });
                    if (error) {
                        throw error;
                    } else {
                        const filteredData = data
                            .filter((topic) => topic.task_average < 83)
                            .sort((a, b) => a.topic_id - b.topic_id);
                        const newTask = await this.generateNewTask(filteredData[0].topic_id);
                        return newTask;
                    }
                }
            }
        } catch (error) {
            console.error('Error getting task:', error);
            return error;
        }
    }

    // Database functions
    // Gets current user and returns the user object
    async getUserChat() {
        // Getting user
        const { data:{user} } = await supabase.auth.getUser();
        // If user exists, get chat data
        if (user) {
            const { data, error } = await supabase
                .from('Chat')
                .select('role, content')
                .eq('user_id', user.id)
                .order('created_at', {ascending: true});
            if (data) {
                // console.log('data:', data);
                return data;
            } else {
                console.error('Error getting chat data:', error);
                return error;
            }
        }
    }
    async getRelevantChat (prompt) {
        // Generating embedding for content
        const output = await this.generateEmbedding(prompt, {
            pooling: 'mean',
            normalize: true,
        });
        //Extracting embedding
        const embedding = Array.from(output.data)

        // Getting user
        const { data:{user} } = await supabase.auth.getUser();
        // If user exists, get chat data
        if (user) {
            const { error, data: Chat } = await supabase.rpc("match_chats", {
                query_embedding: embedding,
                match_threshold: 0.8,
                match_count: 10,
                user_id: user.id});
            if (Chat) {
                console.log('Chat:', Chat);
                return Chat;
            } else {
                console.error('Error getting chat data:', error);
                return error;
            }
        }
    }
    async saveUserChat(role, content) {
        // Generating embedding for content
        const output = await this.generateEmbedding(content, {
            pooling: 'mean',
            normalize: true,
        });
        //Extracting embedding
        const embedding = Array.from(output.data)

        // Getting user
        const { data:{user} } = await supabase.auth.getUser();
        // If user exists, save chat data
        if (user) {
            const { error } = await supabase
                .from('Chat')
                .insert([
                    {user_id: user.id, role: role, content: content, embedding: embedding},
                ]);
            if (error) {
                console.error('Error saving chat data:', error);
            } 
        }
    }
    async generateNewTask(topicID) {
        // This function will use the llm to generate new tasks for the user
        // Will use a given topic and existing tasks within that topic to create a new task
        // Once Validator is created, we may use validator feedback here too
        try {
            const { data: tasks, error: taskError } = await supabase.from('Tasks').select(`content, level_id, topic_id ( name )`).eq('topic_id', topicID).limit(5);
            if (taskError) {
                throw taskError;
            } else {
                // Putting chat history and new prompt together
                const send_data = {example_tasks: tasks, current_topic: tasks[0].topic_id.name}

                // Make a request to the Response serverless function
                const response = await fetch("/.netlify/functions/GenNewTask", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(send_data),
                });
                const completion = await response.text();

                // COMMENTING THIS FOR TESTING PURPOSES, GENERATION NEEDS WORK BEFORE SAVING
                // // Code to save the new task to the database, but doesn't work well with the current setup
                // const { data, error } = await supabase
                //     .from('Tasks')
                //     .insert(
                //         {level_id: tasks[0].level_id, topic_id: topicID, content: completion})
                //     .select('id, content')
                //     .single();
                // if (error) {
                //     throw error;
                // }
                const data = {id: 100, content: completion};
                
                return {id: data.id, content: completion};
            }
        } catch (error) {
            console.error('Error generating new task:', error);
        }
    }
}

export {TutorAgent};