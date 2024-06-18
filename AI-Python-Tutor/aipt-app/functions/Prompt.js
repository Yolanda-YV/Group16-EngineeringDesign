import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.VITE_OPENAI_API_KEY });

export default async (event, context) => {
    try {
        // Read the input from the request body
        let data = [];
        for await (const chunk of event.body) {
            data.push(chunk);
        }
        const prompt = Buffer.concat(data).toString();

        // Make a request to the OpenAI API to check if the input is related to Python
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: `Determine if the following input is related to Python programming. Respond with 'true' if it is related to Python, and 'false' if it is not.` },
                { role: "user", content: `${prompt}` }
            ],
            model: "gpt-3.5-turbo",
        });

        // Extracting the boolean value from the response
        const isPythonRelated = completion.choices[0].message.content.trim() === "true";

        // Return the boolean value indicating Python relevance
        return new Response(isPythonRelated.toString(), { status: 200, statusText: "OK" });
    } catch (error) {
        console.error('Error processing input:', error);
        return new Response('An error occurred while processing the input.', { status: 500, statusText: "Internal Server Error" });
    }
}