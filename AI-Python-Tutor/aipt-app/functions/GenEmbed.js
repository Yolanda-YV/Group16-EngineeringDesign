import OpenAI from "openai";

const openai = new OpenAI({apiKey: process.env.VITE_OPENAI_API_KEY});

// Function to calculate the L2 norm of a vector
function l2Norm(vector) {
    return Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
}

// Function to normalize a vector using L2 normalization
function normalizeL2(vector) {
    const norm = l2Norm(vector);
    if (norm === 0) return vector;
    return vector.map(val => val / norm);
}

// Main function to handle the response
export default async (event, context) => {
    // the event.body comes as a ReadableStream, so we need to convert it to a string
    let data = [];
    for await (const chunk of event.body) {
        data.push(chunk);
    }
    let dataStr = Buffer.concat(data).toString();

    // token limit for gpt3.5-turbo is 4096 tokens
    // make a request to the OpenAI API
    const embedding = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: dataStr,
        encoding_format: "float",
    });

    const cutDim = embedding.data[0].embedding.slice(0, 256);
    const normalized = normalizeL2(cutDim);
    return new Response(JSON.stringify(normalized), {status: 200,  statusText: "OK"});
}