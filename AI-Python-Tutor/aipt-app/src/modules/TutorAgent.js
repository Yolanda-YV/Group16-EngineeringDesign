import supabase from '../utilities/Supabase.js';
<<<<<<< HEAD
import { pipeline, env } from '@xenova/transformers';
env.allowLocalModels = false;
=======
>>>>>>> 822d53e836936c4e0859bebbd3bb8156612885e3

import { Interpreter } from './Interpreter.js';
import { ValidatorAgent } from './ValidatorAgent.js';

class TutorAgent {
    constructor() {
        this.interpreter = new Interpreter();
        this.validator = new ValidatorAgent();
<<<<<<< HEAD
        this.generateEmbed();
    }

    async generateEmbed() {
        this.generateEmbedding = await pipeline('feature-extraction', 'Supabase/gte-small');
=======
>>>>>>> 822d53e836936c4e0859bebbd3bb8156612885e3
    }

    async requestResponse(prompt) {
        const relChat = await this.getRelevantChat(prompt);
        const data = { history: relChat, prompt: prompt };

        const response = await fetch("/.netlify/functions/Response", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const completion = await response.text();

<<<<<<< HEAD
=======
        //Save chat history
>>>>>>> 822d53e836936c4e0859bebbd3bb8156612885e3
        if (completion) {
            await this.saveUserChat('user', prompt);
            await this.saveUserChat('assistant', completion);
        }

        return completion;
    }

    async submitCode(code, task) {
        try {
<<<<<<< HEAD
=======
            // Hardcoded values to use until validator response can be used
            // const isCorrect = false; // This will be replaced by the validator response //testing it for the hint
            // const feedback = 'Good job!'; // This will be replaced by the validator response
            // const hint = 'Check your syntax and try again.'

>>>>>>> 822d53e836936c4e0859bebbd3bb8156612885e3
            await this.interpreter.initPyodide();
            const output = await this.interpreter.runPython(code);

<<<<<<< HEAD
            const validation = await this.validator.validateCode(code, task.description, output);

            if (validation.isCorrect === undefined || validation.hint === undefined || validation.feedback === undefined) {
                throw new Error("Validation response is missing required fields.");
=======
            // COMMENTING THIS FOR TESTING PURPOSES, NO SAVING TO DB UNTIL VALIDATOR RESPONSE CAN BE USED
            // Checking if this is an in-progress task or not
            const { data:{user} } = await supabase.auth.getUser(); // Getting user

            // If task exists, update the score, otherwise don't
            if (task.id) {
                // Testing DB function update_score()
                const { data, error } = await supabase.rpc("update_score", {
                    u_id: user.id,
                    t_id: task.id,
                    is_correct: validation.isCorrect,
                    val_response: validation.feedback,
                    user_code: code,
                });
                if (error) {
                    console.error('Error updating score:', error);
                } else {
                    console.log('Successfully updated score');
                }
>>>>>>> 822d53e836936c4e0859bebbd3bb8156612885e3
            }

            const allData = {
<<<<<<< HEAD
                output: output,
                feedback: validation.feedback,
                hint: validation.hint,
                isCorrect: validation.isCorrect
            };
            console.log(allData);

=======
                output: output, 
                feedback: validation.feedback, 
                hint: validation.hint, 
                isCorrect: validation.isCorrect}
            console.log(allData)
            
            //return {output: output, feedback: feedback, hint: hint, isCorrect: isCorrect};
>>>>>>> 822d53e836936c4e0859bebbd3bb8156612885e3
            return allData;
        } catch (error) {
            console.error('Error handling code submission:', error);
            return { output: null, feedback: `Error: ${error.message}`, hint: '', isCorrect: false };
        }
    }

    async getTask(topicID) {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (topicID) {
<<<<<<< HEAD
                const { error, data } = await supabase.rpc("get_task", { u_id: user.id, selected_topic: topicID });
                if (error) throw error;
                return data[0];
            } else {
                const { error, data } = await supabase.rpc("get_task", { u_id: user.id });
                if (error) throw error;
                if (data.length > 0) return data[0];
                const { error: scoreError, data: scoreData } = await supabase.rpc("calculate_all_average_scores", { u_id: user.id });
                if (scoreError) throw scoreError;
                const filteredData = scoreData.filter((topic) => topic.task_average < 83).sort((a, b) => a.topic_id - b.topic_id);
                const newTask = await this.generateNewTask(filteredData[0].topic_id);
                return newTask;
=======
                // Specific topic selected
                const { error, data } = await supabase.rpc("get_task", {
                    u_id: user.id,
                    selected_topic: topicID});
                console.log(data);
                if (error) {
                    throw error
                } else if (data.length > 0) {
                    // return data[0];
                    return data; // Returning all tasks that are not completed by user and in user's level
                } else {
                    // No more eligable tasks in the selected topic, creating new one
                    const newTask = await this.generateNewTask(topicID);
                    return newTask;
                }
            } else {
                // No specific topic selected
                const { error, data } = await supabase.rpc("get_task", {
                    u_id: user.id});
                console.log(data);
                if (error) {
                    throw error
                } else if (data.length > 0) {
                    // Task that is not completed by user, is in user's level
                    // console.log('data:', data);
                    // return data[0];
                    return data; // Returning all tasks that are not completed by user and in user's level
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
>>>>>>> 822d53e836936c4e0859bebbd3bb8156612885e3
            }
        } catch (error) {
            console.error('Error getting task:', error);
            return error;
        }
    }

<<<<<<< HEAD
=======
    // Database functions
    // Gets current user and returns the user object
    async getUser() {
        const { data:{user} } = await supabase.auth.getUser();
        const { data } = await supabase
            .from('UserInfo')
            .select('level, username')
            .eq('user_id', user.id)
            .single();
        return {username: data.username, level: data.level};
    }
>>>>>>> 822d53e836936c4e0859bebbd3bb8156612885e3
    async getUserChat() {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const { data, error } = await supabase.from('Chat').select('role, content').eq('user_id', user.id).order('created_at', { ascending: true });
            if (data) return data;
            console.error('Error getting chat data:', error);
            return error;
        }
    }
<<<<<<< HEAD
=======
    async getRelevantChat (prompt) {
        // Generating embedding for content
        // Make a request to the Response serverless function
        const response = await fetch("/.netlify/functions/GenEmbed", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: prompt,
        });
        const embedding = await response.json();
>>>>>>> 822d53e836936c4e0859bebbd3bb8156612885e3

    async getRelevantChat(prompt) {
        const output = await this.generateEmbedding(prompt, { pooling: 'mean', normalize: true });
        const embedding = Array.from(output.data);
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const { error, data: Chat } = await supabase.rpc("match_chats", { query_embedding: embedding, match_threshold: 0.8, match_count: 10, user_id: user.id });
            if (Chat) return Chat;
            console.error('Error getting chat data:', error);
            return error;
        }
    }
<<<<<<< HEAD
=======
    async saveUserChat(role, content) {
        // Generating embedding for content
        const response = await fetch("/.netlify/functions/GenEmbed", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: prompt,
        });
        const embedding = await response.json();
>>>>>>> 822d53e836936c4e0859bebbd3bb8156612885e3

    async saveUserChat(role, content) {
        const output = await this.generateEmbedding(content, { pooling: 'mean', normalize: true });
        const embedding = Array.from(output.data);
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const { error } = await supabase.from('Chat').insert([{ user_id: user.id, role: role, content: content, embedding: embedding }]);
            if (error) console.error('Error saving chat data:', error);
        }
    }
<<<<<<< HEAD

=======
    async saveCode(code, task) {
        // Getting user
        const { data:{user} } = await supabase.auth.getUser();
        // If user exists, save code data
        if (user) {
            const { data, error } = await supabase
                .from('UserTasks')
                .select()
                .eq('user_id', user.id)
                .eq('task_id', task.id);
            if (data.length > 0) {
                // Task exists, update the code
                console.log('Updating code')
                const { data, error } = await supabase
                    .from('UserTasks')
                    .update({code: code})
                    .eq('user_id', user.id)
                    .eq('task_id', task.id);
                    if (error) {
                        console.error('Error saving code data:', error);
                    }
            } else if (error) {
                console.error('Error saving code data:', error);
            } else {
                // Task doesn't exist, create a new task
                console.log('Inserting code')
                const { data, error } = await supabase
                    .from('UserTasks')
                    .insert([
                        {user_id: user.id, task_id: task.id, code: code},
                    ]);
                if (error) {
                    console.error('Error saving code data:', error);
                }
            }
            
        }
    }
>>>>>>> 822d53e836936c4e0859bebbd3bb8156612885e3
    async generateNewTask(topicID) {
        try {
<<<<<<< HEAD
            const { data: tasks, error: taskError } = await supabase.from('Tasks').select('content, level_id, topic_id ( name )').eq('topic_id', topicID).limit(5);
            if (taskError) throw taskError;
            const send_data = { example_tasks: tasks, current_topic: tasks[0].topic_id.name };
            const response = await fetch("/.netlify/functions/GenNewTask", { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(send_data) });
            const completion = await response.text();
            const data = { id: 100, content: completion };
            return { id: data.id, content: completion };
=======
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

                // Code to save the new task to the database, but doesn't work well with the current setup
                const { data, error } = await supabase
                    .from('Tasks')
                    .insert(
                        {level_id: tasks[0].level_id, topic_id: topicID, content: completion})
                    .select('id, content')
                    .single();
                if (error) {
                    throw error;
                }
                //const data = {id: 1000, content: completion};
                
                return {id: data.id, content: completion};
            }
>>>>>>> 822d53e836936c4e0859bebbd3bb8156612885e3
        } catch (error) {
            console.error('Error generating new task:', error);
        }
    }
    async getTopics() {
        const {data, error} = await supabase.from('Topics').select('id, name, level_id');
        if (error) {
            console.error('Error getting topics:', error);
            return null;
        } else {
            return data;
        }
    }
}

export { TutorAgent };

