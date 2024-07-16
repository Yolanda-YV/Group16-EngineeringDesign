import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.VITE_OPENAI_API_KEY });

export default async (event, context) => {
    let data = [];
    for await (const chunk of event.body) {
        data.push(chunk);
    }
    let dataStr = Buffer.concat(data).toString();
    const dataObj = JSON.parse(dataStr);

    try {
        const systemMessage = `
        You are a Python code validator.
        You will validate the given code labeled with 'User Code:' based on the given task's instructions labeled with 'Task:' and the code output labeled with 'Code Output:'.
        You will then return a JSON object with the following keys:
        - isCorrect: true/false - whether the code performs according to the given task's requirements
        - hint: a vague hint to help the user identify where the issue might be if the code is incorrect, without telling them exactly how to fix it
        - feedback: detailed feedback on the code's efficiency, readability, adherence to best practices, and overall quality
        Ensure that the JSON object is properly formatted and contains all required keys.
        `;

        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: systemMessage },
                { role: "user", content: `User Code:\n${dataObj.code}` },
                { role: "user", content: `Task:\n${dataObj.task}` },
                { role: "user", content: `Code Output:\n${dataObj.output}` }
            ],
            model: "gpt-3.5-turbo"
        });

        let feedback;
        try {
            feedback = JSON.parse(completion.choices[0].message.content);
        } catch (parseError) {
            console.error('Error parsing feedback:', parseError);
            return new Response(`Error parsing feedback: ${parseError.message}`, { status: 500, statusText: "Internal Server Error" });
        }

        if (feedback.isCorrect === undefined || feedback.hint === undefined || feedback.feedback === undefined) {
            throw new Error("Invalid feedback format returned by OpenAI.");
        }

        return new Response(JSON.stringify(feedback), { status: 200, statusText: "OK" });
    } catch (error) {
        console.error('Error validating code:', error);
        return new Response(`Error: ${error.message}`, { status: 500, statusText: "Internal Server Error" });
    }
};
