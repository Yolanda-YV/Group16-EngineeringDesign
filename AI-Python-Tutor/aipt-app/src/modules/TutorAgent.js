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
}

export {TutorAgent};