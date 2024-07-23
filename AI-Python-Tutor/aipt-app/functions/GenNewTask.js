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

    let exampleTasks = [];
    for (let i = 0; i < dataObj.example_tasks.length; i++) {
        exampleTasks.push({role: "system", content: `Example Task ${i + 1}: ${dataObj.example_tasks[i].content}`});
    }

    // token limit for gpt3.5-turbo is 4096 tokens
    // make a request to the OpenAI API
    const completion = await openai.chat.completions.create({
        messages: [
            {role: "system", content: "You are a Python programming task generator that creates a new exercise for a user to practice Python programming."},
            {role: "system", content: "You will use the given list of example exercises and the given topic name to create a new exercise for the user to complete."},
            {role: "system", content: "You should aim to generate a exercise that would challenge the user but should not require knowledge of topics outside the given topic name."}, 
            {role: "system", content: "You do not need to preface the exercise with 'Exercise:' or 'Task:'."},
            {role: "system", content: "Model the exercise after the example exercises provided, but ensure that the exercise is unique and not a direct copy of any of the example exercises."},
            {role: "system", content: "Example exercises will be marked by 'Example Task 1:', 'Example Task 2:', etc. and the topic will be marked by 'Topic Name:'."},
            {role: "system", content: "These exercises will not tell the user to generate or create an excercise or task, they will tell the user to create a program or code that does something."},
            ...exampleTasks,
            {role: "system", content: `Topic Name: ${dataObj.current_topic}`}],
        model: "gpt-4o-mini",
    });
    return new Response(completion.choices[0].message.content, {status: 200,  statusText: "OK"});
}