import OpenAI from "openai";
// For further security, best to send request to server-side API to call OpenAI API
// For development, using the OpenAI API key directly in the browser
const openai = new OpenAI({apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true});

class TutorAgent {
    constructor() {}
    async requestResponse(prompt) {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are a tutor that teaches Python programming." }, 
                {role: "user", content: `${prompt}`}],
            model: "gpt-3.5-turbo",
        });
        return completion.choices[0];
    }
}

export {TutorAgent};