// prompt agent

// user input: can be code or prompt

import { TutorAgent } from './TutorAgent';

class PromptAgent {
    constructor() {
        this.tutorAgent = new TutorAgent();
    }

    async processUserInput(input, type) {
        try {
            if (type === 'code') {
                const formattedCode = await this.formatCode(input);
                const feedback = await this.tutorAgent.requestResponse(formattedCode);
                return feedback;
            } else if (type === 'prompt') {
                const isPythonRelated = await this.filterInput(input);

                if (!isPythonRelated) {
                    return 'The input does not seem to be related to Python. Please provide a Python-related query.';
                }

                const feedback = await this.tutorAgent.requestResponse(input);
                return feedback;
            } else {
                return 'Unknown input type. Please provide either code or a prompt.';
            }
        } catch (error) {
            console.error('Error processing user input:', error);
            return 'An error occurred while processing your input.';
        }
    }

    // prompt input: if it's python relevant, send to tutor agent; if not, inform user in web application
    async filterInput(input) {
        try {
            const response = await fetch("/.netlify/functions/Prompt", {
                method: "POST",
                headers: { 'Content-Type': 'text/plain' },
                body: input,
            });

            if (!response.ok) {
                console.error('Failed to fetch');
                return false;
            }

            const data = await response.text();
            console.log('Serverless Function Data:', data);

            // Return true if the input is Python related, otherwise false
            return data.trim() === "true";
        } catch (error) {
            console.error('Error filtering input:', error);
            return false; // Return false in case of error
        }
    }

    // code input: format code then send to tutor agent
    async formatCode(code) {
        try {
            // Split the code into lines
            const lines = code.split('\n');
    
            // Remove leading and trailing whitespace from each line
            const trimmedLines = lines.map(line => line.trimEnd());
    
            // Remove empty lines
            const nonEmptyLines = trimmedLines.filter(line => line !== '');
    
            // Reconstruct the code with the original indentation preserved
            let formattedCode = nonEmptyLines.join('\n');
    
            // Remove extra spaces around operators
            formattedCode = formattedCode.replace(/\s*([+\-/*=])\s*/g, ' $1 ');
    
            return formattedCode;
        } catch (error) {
            console.error('Error formatting code:', error);
            return code; // return original code if there's an error
        }
    }

    // from tutor agent feedback: two types of feedback: tutor feedback and validator feedback

    // Tutor feedback: format tutor feedback and send to web application
    formatTutorFeedback(feedback) {
        try {
            // Format the tutor feedback for display in the web application
            // Replace newline characters with <br> tags for HTML formatting
            feedback = feedback.replace(/\n/g, '<br>');

            // Wrap code snippets in <code> tags for HTML formatting
            // feedback = feedback.replace(/`(.*?)`/g, '<code>$1</code>');
            // Modified the above code to handle code blocks and inline code
            //  EX: ```code block``` and `inline code`
            //  The original code would turn (`) into (<code>) which would mess with the formatting
            feedback = feedback.replace(/`{3}(.*?)`{3}/g, '<code>$1</code>');
            feedback = feedback.replace(/(?=)(python)/g, '<div>$1</div>'); // To modify the python header
            feedback = feedback.replace(/`{1}(.*?)`{1}/g, '<code>$1</code>');
            feedback = feedback.replace(/#{3}(.*?)<br>/g, '<h3>$1</h3>'); // To modify headers
            feedback = feedback.replace(/\*{2}(.*?)\*{2}/g, '<b>$1</b>'); // To modify bold text

            return feedback;
        } catch (error) {
            console.error('Error formatting tutor feedback:', error);
            return feedback; // Return original feedback if there's an error
        }
    }

    // Validator feedback: format validator feedback and send to web application
    formatValidatorFeedback(feedback) {
        try {
            // Format the validator feedback for display in the web application
            // Add your formatting logic here
            return feedback;
        } catch (error) {
            console.error('Error formatting validator feedback:', error);
            return feedback; // Return original feedback if there's an error
        }
    }

    // from the tutor agent, send a task to web application
    
}


export { PromptAgent };
