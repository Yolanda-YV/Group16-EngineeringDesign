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
            const trimmedLines = lines.map(line => line.trim());
    
            // Remove empty lines
            const nonEmptyLines = trimmedLines.filter(line => line !== '');
    
            // Add indentation based on the Python indentation rules
            const indentedLines = nonEmptyLines.map((line, index) => {
                // Calculate the indentation level based on the number of preceding whitespace characters
                const indentationLevel = line.search(/\S|$/);
                // Indent all lines except the first line
                return index === 0 ? line : ' '.repeat(indentationLevel) + line;
            });
    
            // Join the lines back together with newline characters
            let formattedCode = indentedLines.join('\n');
    
            // Remove extra spaces around operators
            formattedCode = formattedCode.replace(/\s*([+-/*=])\s*/g, ' $1 ');
    
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
            feedback = feedback.replace(/`(.*?)`/g, '<code>$1</code>');

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
