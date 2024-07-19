import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.VITE_OPENAI_API_KEY });

class ValidatorAgent {
    constructor() {}

    async validateCode(code, task, output) {
        const prompt = `
        Task: ${task}
        Code: ${code}
        Code Output: ${output}
        Please validate the code based on the task and provide detailed feedback on whether it meets the requirements. 
        Return a JSON object with keys: isCorrect, hint, and feedback.
        `;

        try {
            const response = await openai.chat.completions.create({
                messages: [
                    { role: "system", content: "You are a Python code validator." },
                    { role: "user", content: prompt }
                ],
                model: "gpt-3.5-turbo"
            });

            let feedback;
            try {
                feedback = JSON.parse(response.choices[0].message.content);
            } catch (parseError) {
                throw new Error(`Error parsing feedback: ${parseError.message}`);
            }

            if (feedback.isCorrect === undefined || feedback.hint === undefined || feedback.feedback === undefined) {
                throw new Error("Validation response is missing required fields.");
            }

            return feedback;
        } catch (error) {
            console.error('Error validating code:', error);
            return { isCorrect: false, hint: '', feedback: `Error: ${error.message}` };
        }
    }
}

export { ValidatorAgent };
