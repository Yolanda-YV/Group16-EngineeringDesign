import supabase from '../utilities/Supabase.js';
// npm i @xenova/transformers
import { pipeline, env } from '@xenova/transformers';
// Have to have the lines below to avoid errors in the dev server
env.allowLocalModels = false;
env.useBrowserCache = false;

// Allocate pipeline
const generateEmbedding = await pipeline('feature-extraction', 'Supabase/gte-small');

// TutorAgent makes an API call to the Response serverless function to request a response from OPENAI
class TutorAgent {
    constructor() {}
    async requestResponse(prompt) {
        // This function will call the Response serverless function to get a response from OPENAI

        const relChat = await this.getRelevantChat(prompt);

        // Get chat history
        const history = await this.getUserChat();

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
    submitCode(code) {
        // This function will call a ValidatorAgent method/function to validate and interpret the code
        //   The code will be sent as a string to the ValidatorAgent
        //   The ValidatorAgent will return a response and output
    }
    async getTask() {
        // This function will get a task from the database based on user progress/skill
        //  For early testing purposes, this will be random and not based on user progress
        const { data, error } = await supabase
            .from('Tasks')
            .select('content')
        if (error) {
            return error;
        } else {
            const index = Math.floor(Math.random() * (data.length - 1) + 1);
            return data[index].content;
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
                console.log('data:', data);
                return data;
            } else {
                console.error('Error getting chat data:', error);
                return error;
            }
        }
    }
    async getRelevantChat (prompt) {
        // Generating embedding for content
        const output = await generateEmbedding(prompt, {
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
        const output = await generateEmbedding(content, {
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
}

export {TutorAgent};