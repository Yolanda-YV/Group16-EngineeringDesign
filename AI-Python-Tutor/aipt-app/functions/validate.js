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
        Double check the task's instructions and the code, and ensure that the code follows the task instructions.
        For example, if a task says 'to subtract 2 from 5,' the user should have '5 - 2' and not '2 - 5'.
        Provide a JSON response with the following keys: isCorrect, hint, and feedback.
        - isCorrect: a boolean indicating if the code correctly solves the task.
        - hint: a vague hint indicating where the issue might be, without giving away the solution.
        - feedback: detailed feedback on code quality, efficiency, and adherence to best practices.
        `;

        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: systemMessage },
                { role: "user", content: `User Code:\n${dataObj.code}` },
                { role: "user", content: `Task:\n${dataObj.task}` },
                { role: "user", content: `Code Output:\n${dataObj.output}` }
            ],
            model: "gpt-4o-mini"
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
