import OpenAI from "openai";

const openai = new OpenAI({apiKey: process.env.VITE_OPENAI_API_KEY});

export default async (event, context) => {
    let data = [];
    for await (const chunk of event.body) {
        data.push(chunk);
    }
    const prompt = Buffer.concat(data).toString();

    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: "You are a tutor that validates and gives feedback on Python code." }, 
            {role: "user", content: `${prompt}`}],
        model: "gpt-3.5-turbo",
    });
    return new Response(completion.choices[0].message.content, {status: 200,  statusText: "OK"});
}
