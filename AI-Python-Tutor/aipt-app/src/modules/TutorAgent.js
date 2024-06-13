import supabase from '../utilities/Supabase.js';

// TutorAgent makes an API call to the Response serverless function to request a response from OPENAI
class TutorAgent {
    constructor() {}
    async requestResponse(prompt) {
        // Test chat history
        const history = [
            {role: 'user', content: "I have a dog named Bob and a cat named Bobbert"},
            {role: 'assistant', content: "That's adorable! It sounds like you have a lot of fun with Bob and Bobbert. Do they get along well?"},
            {role: 'user', content: "They get along well"},
            {role: 'assistant', content: "That's great to hear! It's always wonderful when pets get along. Do they have any favorite activities or toys they like to play with together?"}
        ]
        

        const response = await fetch("/.netlify/functions/Response", {
            method: "POST",
            headers: { 'Content-Type': 'text/plain' },
            body: `${prompt}`,
        });
        const completion = await response.text();
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
}

export {TutorAgent};