import OpenAI from "openai";

if (!process.env.VITE_OPENAI_API_KEY) {
    throw new Error("The VITE_OPENAI_API_KEY environment variable is missing or empty.");
}

const openai = new OpenAI({ apiKey: process.env.VITE_OPENAI_API_KEY });

export default async (event, context) => {
    let data = [];
    for await (const chunk of event.body) {
        data.push(chunk);
    }
    const requestBody = JSON.parse(Buffer.concat(data).toString());
    const { code, task } = requestBody;

    try {
        const prompt = `Task: ${task}\nCode:\n${code}\nPlease validate the code based on the task and provide detailed feedback on whether it meets the requirements.`;
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are a Python code validator." },
                { role: "user", content: `${prompt}` }
            ],
            model: "gpt-3.5-turbo",
        });

        const feedback = completion.choices[0].message.content;

        return new Response(feedback, { status: 200, statusText: "OK" });
    } catch (error) {
        return new Response(`Error: ${error.message}`, { status: 500, statusText: "Internal Server Error" });
    }
};
