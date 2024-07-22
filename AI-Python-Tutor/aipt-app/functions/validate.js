import OpenAI from "openai";

const openai = new OpenAI({apiKey: process.env.VITE_OPENAI_API_KEY});

export default async (event, context) => {
    // the event.body comes as a ReadableStream, so we need to convert it to a string
    let data = [];
    for await (const chunk of event.body) {
        data.push(chunk);
    }
    let dataStr = Buffer.concat(data).toString();

    // parse the JSON string to an object
    const dataObj = JSON.parse(dataStr);
    // this object should have: code, task, code output

    try {
        // Want a json object returned with different parts of the validators overall feedback
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: `
                    You are a Python code validator.
                    You will validate the given code labeled with 'User Code:' based on the given task's instructions labeled with 'Task:' and the code output labeled with 'Code Output:'.
                    You will then return a json object with the following keys: isCorrect, Hint, and Feedback.
                    isCorrect: true/false - boolean value saying whether the code performs according to the given task's requirements
                    Hint: string - a hint to help the user fix their code if it is incorrect and isCorrect is false
                    Feedback: string - detailed feedback on the code's efficiency, readability, and conformance to best coding practices
                    ` },
                { role: "user", content: `User Code:\n${dataObj.code}` },
                { role: "user", content: `Task:\n${dataObj.task}` },
                { role: "user", content: `Code Output:\n${dataObj.output}` }
            ],
            model: "gpt-3.5-turbo",
            response_format: {'type': 'json_object'}
        });

        const feedback = completion.choices[0].message.content;

        return new Response(feedback, { status: 200, statusText: "OK" });
    } catch (error) {
        return new Response(`Error: ${error}`, { status: 500, statusText: "Internal Server Error" });
    }
};