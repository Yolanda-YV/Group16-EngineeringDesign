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
                const filteredInput = this.filterInput(input);

                if (!filteredInput) {
                    return 'The input does not seem to be related to Python. Please provide a Python-related query.';
                }

                const feedback = await this.tutorAgent.requestResponse(filteredInput);
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
    filterInput(input) {
        const pythonRelatedKeywords = [
        // Functional Programming
        'lambda', 'map', 'filter', 'reduce', 'decorator', 
        'generator', 'yield', 'iter', 'next',
    
        // Data Structures
        'list', 'dict', 'set', 'tuple', 'deque', 
        'defaultdict', 'Counter', 'OrderedDict', 'namedtuple',
    
        // Standard Library
        'os', 'sys', 'math', 'datetime', 'json', 'csv', 're', 
        'collections', 'itertools', 'functools', 'random', 
        'time', 'logging', 'argparse', 'subprocess', 'unittest', 
        'threading', 'multiprocessing', 'sqlite3',
    
        // Built-in Functions
        'print', 'len', 'type', 'input', 'int', 'str', 'float', 
        'list', 'dict', 'set', 'tuple', 'range', 'sum', 'max', 
        'min', 'sorted', 'zip', 'map', 'filter', 'open', 
        'enumerate', 'dir', 'help', 'isinstance', 'getattr', 
        'setattr', 'hasattr', 'delattr', 'all', 'any', 'abs', 
        'bin', 'bool', 'bytearray', 'bytes', 'callable', 'chr', 
        'classmethod', 'compile', 'complex', 'delattr', 'dict', 
        'dir', 'divmod', 'eval', 'exec', 'format', 'frozenset', 
        'globals', 'hasattr', 'hash', 'hex', 'id', 'input', 'isinstance', 
        'issubclass', 'iter', 'len', 'list', 'locals', 'map', 'max', 
        'memoryview', 'min', 'next', 'object', 'oct', 'open', 'ord', 
        'pow', 'property', 'range', 'repr', 'reversed', 'round', 'set', 
        'setattr', 'slice', 'sorted', 'staticmethod', 'str', 'sum', 'super', 
        'tuple', 'type', 'vars', 'zip', '__import__',
    
        // Keywords
        'False', 'None', 'True', 'and', 'as', 'assert', 'async', 
        'await', 'break', 'class', 'continue', 'def', 'del', 
        'elif', 'else', 'except', 'finally', 'for', 'from', 
        'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 
        'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 
        'with', 'yield', 'python', 'Python'
        ];

        const isPythonRelated = pythonRelatedKeywords.some(keyword => input.includes(keyword));

        if (!isPythonRelated) {
            return null;
        }

        return input;
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
        // Format the tutor feedback for display in the web application
        // Replace newline characters with <br> tags for HTML formatting
        feedback = feedback.replace(/\n/g, '<br>');

        // Wrap code snippets in <code> tags for HTML formatting
        feedback = feedback.replace(/`(.*?)`/g, '<code>$1</code>');

        return feedback;
    }

    // Validator feedback: format validator feedback and send to web application
    formatValidatorFeedback(feedback) {
        // Format the validator feedback for display in the web application
        // Add your formatting logic here
        return feedback;
    }

    // from the tutor agent, send a task to web application
    
}

<<<<<<< HEAD
export { PromptAgent };
=======

export { PromptAgent };
>>>>>>> f8ac5b3730d5942a3ede7efc80dd80fe6cfc6318
