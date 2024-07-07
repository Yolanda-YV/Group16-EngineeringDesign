import OpenAI from "openai";

const openai = new OpenAI({apiKey: process.env.VITE_OPENAI_API_KEY});

// Main function to handle the response
export default async (event, context) => {
    // the event.body comes as a ReadableStream, so we need to convert it to a string
    let data = [];
    for await (const chunk of event.body) {
        data.push(chunk);
    }
    let dataStr = Buffer.concat(data).toString();

    // parse the JSON string to an object
    const dataObj = JSON.parse(dataStr);

    // token limit for gpt3.5-turbo is 4096 tokens
    // make a request to the OpenAI API
    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: `Determine if the following input is related to Python programming. Respond with 'true' if it is related to Python, and 'false' if it is not.` },
            { role: "user", content: `${prompt}` }
        ],
        model: "gpt-3.5-turbo",
    });
    return new Response(completion.choices[0].message.content, {status: 200,  statusText: "OK"});
}