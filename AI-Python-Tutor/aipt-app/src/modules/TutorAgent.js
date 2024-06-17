import supabase from '../utilities/Supabase.js';

// TutorAgent makes an API call to the Response serverless function to request a response from OPENAI
class TutorAgent {
    constructor() {}
    async requestResponse(prompt) {
        // This function will call the Response serverless function to get a response from OPENAI

        // Get chat history
        const history = await this.getUserChat();

        // Putting chat history and new prompt together
        const data = {history: history, prompt: prompt}

        // Make a request to the Response serverless function
        const response = await fetch("/.netlify/functions/Response", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        const completion = await response.text();

        // Save chat history
        if (completion) {
            await this.saveUserChat(prompt, completion);
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
    async saveUserChat(content1, content2) {
        // Getting user
        const { data:{user} } = await supabase.auth.getUser();
        // If user exists, save chat data
        if (user) {
            const { error } = await supabase
                .from('Chat')
                .insert([
                    {user_id: user.id, role: 'user', content: content1},
                    {user_id: user.id, role: 'assistant', content: content2}
                ]);
            if (error) {
                console.error('Error saving chat data:', error);
            } 
        }
    }
}

export {TutorAgent};