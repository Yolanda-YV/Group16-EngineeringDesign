import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.VITE_OPENAI_API_KEY });

class ValidatorAgent {
    constructor() {}

    async validateCode(code, task, output) {
<<<<<<< HEAD
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
=======

        const data = {code: code, task: task, output: output};

        // Make a request to the validate serverless function
        const response = await fetch("/.netlify/functions/validate", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        const completion = await response.json();

        // Testing the response
        // console.log(completion.hint);
        // console.log(completion);

        return completion;
    }

    formatFeedback(feedback) {
        // Format the feedback to highlight important points
        let formattedFeedback = "Validation Result:\n";
        if (feedback.includes("SyntaxError")) {
            formattedFeedback += "It looks like there's a syntax error in your code. Please check the spelling and structure of your statements.\n";
        } else if (feedback.includes("LogicalError")) {
            formattedFeedback += "There seems to be a logical error in your code. Make sure your logic flow is correct and all variables are properly used.\n";
        } else if (feedback.includes("Task not met")) {
            formattedFeedback += "Your code does not meet the requirements of the task. Please review the task and try again.\n";
        } else {
            formattedFeedback += "Your code looks good! Great job!\n";
>>>>>>> 822d53e836936c4e0859bebbd3bb8156612885e3
        }
    }
}

export { ValidatorAgent };
