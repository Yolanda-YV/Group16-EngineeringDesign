import OpenAI from "openai";

const openai = new OpenAI({apiKey: process.env.VITE_OPENAI_API_KEY});

export default async (event, context) => {
    // the event.body comes as a ReadableStream, so we need to convert it to a string
    let data = [];
    for await (const chunk of event.body) {
        data.push(chunk);
    }
    const prompt = Buffer.concat(data).toString();

    // make a request to the OpenAI API
    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: "You are a tutor that teaches Python programming." }, 
            {role: "user", content: `${prompt}`}],
        model: "gpt-3.5-turbo",
    });
    return new Response(completion.choices[0].message.content, {status: 200,  statusText: "OK"});
}