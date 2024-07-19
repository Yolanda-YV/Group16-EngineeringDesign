import supabase from '../utilities/Supabase.js';
import { pipeline, env } from '@xenova/transformers';
env.allowLocalModels = false;

import { Interpreter } from './Interpreter.js';
import { ValidatorAgent } from './ValidatorAgent.js';

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
        const relChat = await this.getRelevantChat(prompt);
        const data = { history: relChat, prompt: prompt };

        const response = await fetch("/.netlify/functions/Response", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const completion = await response.text();

        if (completion) {
            await this.saveUserChat('user', prompt);
            await this.saveUserChat('assistant', completion);
        }

        return completion;
    }

    async submitCode(code, task) {
        try {
            await this.interpreter.initPyodide();
            const output = await this.interpreter.runPython(code);

            const validation = await this.validator.validateCode(code, task.description, output);

            if (validation.isCorrect === undefined || validation.hint === undefined || validation.feedback === undefined) {
                throw new Error("Validation response is missing required fields.");
            }

            const allData = {
                output: output,
                feedback: validation.feedback,
                hint: validation.hint,
                isCorrect: validation.isCorrect
            };
            console.log(allData);

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
            }
        } catch (error) {
            console.error('Error getting task:', error);
            return error;
        }
    }

    async getUserChat() {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const { data, error } = await supabase.from('Chat').select('role, content').eq('user_id', user.id).order('created_at', { ascending: true });
            if (data) return data;
            console.error('Error getting chat data:', error);
            return error;
        }
    }

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

    async saveUserChat(role, content) {
        const output = await this.generateEmbedding(content, { pooling: 'mean', normalize: true });
        const embedding = Array.from(output.data);
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const { error } = await supabase.from('Chat').insert([{ user_id: user.id, role: role, content: content, embedding: embedding }]);
            if (error) console.error('Error saving chat data:', error);
        }
    }

    async generateNewTask(topicID) {
        try {
            const { data: tasks, error: taskError } = await supabase.from('Tasks').select('content, level_id, topic_id ( name )').eq('topic_id', topicID).limit(5);
            if (taskError) throw taskError;
            const send_data = { example_tasks: tasks, current_topic: tasks[0].topic_id.name };
            const response = await fetch("/.netlify/functions/GenNewTask", { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(send_data) });
            const completion = await response.text();
            const data = { id: 100, content: completion };
            return { id: data.id, content: completion };
        } catch (error) {
            console.error('Error generating new task:', error);
        }
    }
}

export { TutorAgent };

