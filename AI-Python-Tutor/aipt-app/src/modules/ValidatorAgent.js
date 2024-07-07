import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.VITE_OPENAI_API_KEY });

class ValidatorAgent {
    constructor() {}

    async validateCode(code, task) {
        const prompt = `Task: ${task}\nCode:\n${code}\nPlease validate the code based on the task and provide detailed feedback on whether it meets the requirements.`;
        const response = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are a Python code validator." },
                { role: "user", content: prompt }
            ],
            model: "gpt-3.5-turbo",
        });
        const feedback = response.choices[0].message.content;
        return this.formatFeedback(feedback);
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
        }
        formattedFeedback += `Feedback: ${feedback}`;
        return formattedFeedback;
    }
}

export { ValidatorAgent };
