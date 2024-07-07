import supabase from '../utilities/Supabase.js';

// TutorAgent makes an API call to the Response serverless function to request a response from OPENAI
class TutorAgent {
    constructor() {}

    async requestResponse(prompt) {
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
        // The code will be sent as a string to the ValidatorAgent
        // The ValidatorAgent will return a response and output
    }

    async getTask() {
        // This function will get a task from the database based on user progress/skill
        // For early testing purposes, this will be random and not based on user progress
        const { data, error } = await supabase.from('Tasks').select('content');
        if (error) {
            return error;
        } else {
            const index = Math.floor(Math.random() * data.length);
            return data[index].content;
        }
    }
}

export { TutorAgent };
