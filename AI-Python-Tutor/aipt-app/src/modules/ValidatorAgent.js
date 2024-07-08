import OpenAI from "openai";

class ValidatorAgent {
    constructor() {}

    async validateCode(code, task, output) {

        const data = {code: code, task: task, output: output};

        // Make a request to the validate serverless function
        const response = await fetch("/.netlify/functions/validate", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        const completion = await response.json();

        console.log(completion);

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
        }
        formattedFeedback += `Feedback: ${feedback}`;
        return formattedFeedback;
    }
}

export { ValidatorAgent };