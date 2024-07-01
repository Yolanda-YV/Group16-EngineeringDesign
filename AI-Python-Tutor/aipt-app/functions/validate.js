import OpenAI from "openai";

// Check if the environment variable is available
if (!process.env.VITE_OPENAI_API_KEY) {
    throw new Error("The VITE_OPENAI_API_KEY environment variable is missing or empty.");
}

const openai = new OpenAI({ apiKey: process.env.VITE_OPENAI_API_KEY });

export default async (event, context) => {
    let data = [];
    for await (const chunk of event.body) {
        data.push(chunk);
    }
    const prompt = Buffer.concat(data).toString();

    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are a tutor that validates and gives feedback on Python code." }, 
                { role: "user", content: `${prompt}` }
            ],
            model: "gpt-3.5-turbo",
        });

        const feedback = completion.choices[0].message.content;

        let detailedFeedback = "Validation Result:\n";
        if (feedback.includes("SyntaxError")) {
            detailedFeedback += "It looks like there's a syntax error in your code. Please check the spelling and structure of your statements.\n";
        } else if (feedback.includes("LogicalError")) {
            detailedFeedback += "There seems to be a logical error in your code. Make sure your logic flow is correct and all variables are properly used.\n";
        } else {
            detailedFeedback += "Your code looks good! Great job!\n";
        }
        detailedFeedback += `Feedback: ${feedback}`;

        return new Response(detailedFeedback, { status: 200, statusText: "OK" });
    } catch (error) {
        return new Response(`Error: ${error.message}`, { status: 500, statusText: "Internal Server Error" });
    }
};
