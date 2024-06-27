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
            {role: "system", content: "You are a Python programming task generator that creates a new task for a user to practice Python programming. You will use the given list of example tasks and the given topic name to create a new task for the user to complete. Using the example tasks and topic name, you should aim to generate a task that would challenge the user but should not require knowledge of topics outside the given topic name."}, 
            dataObj.example_tasks.map((task, index) => ({role: "system", content: `Example Task ${index + 1}: ${task}`})),
            {role: "user", content: `Topic Name: ${dataObj.current_topic}`}],
        model: "gpt-3.5-turbo",
    });
    return new Response(completion.choices[0].message.content, {status: 200,  statusText: "OK"});
}