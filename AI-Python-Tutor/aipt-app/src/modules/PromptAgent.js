import { TutorAgent } from './TutorAgent'; // Importing TutorAgent

class PromptAgent {
    constructor() {
        this.tutorAgent = new TutorAgent(); // Initializing TutorAgent
        this.outputHandler = null; // Function to handle output updates
    }

    // Method to handle user input (code or prompt)
    async handleUserInput(type, content) {
        if (type === 'code') {
            await this.processCodeInput(content);
        } else if (type === 'prompt') {
            await this.processPromptInput(content);
        }
    }

    // Method to process code input
    async processCodeInput(code) {
        // Format the code appropriately
        const formattedCode = this.formatCode(code);
        // Send the formatted code to the Tutor Agent for execution or evaluation
        const result = await this.tutorAgent.executeCode(formattedCode);
        // Handle the output received from the Tutor Agent
        this.handleTutorAgentOutput(result);
    }

    // Method to format code input
    formatCode(code) {
        // Implement code formatting logic here
        return code;
    }

    // Method to process prompt input
    async processPromptInput(prompt) {
        // Determine the relevancy of the prompt to Python
        const isRelevant = this.isRelevantPrompt(prompt);
        if (isRelevant) {
            // Send the prompt to the Tutor Agent to generate a response
            const response = await this.tutorAgent.requestResponse(prompt);
            // Handle the output received from the Tutor Agent
            this.handleTutorAgentOutput(response);
        } else {
            // Inform the user if the prompt is irrelevant
            const message = "The prompt is not relevant to Python.";
            this.handleIrrelevantPrompt(message);
        }
    }

    // Method to determine relevancy of prompt to Python
    isRelevantPrompt(prompt) {
        // Logic to determine relevancy
        return true; // Placeholder
    }

    // Method to handle irrelevant prompt
    handleIrrelevantPrompt(message) {
        // Send message back to Web Application to inform the user
        if (this.outputHandler) {
            this.outputHandler({ type: 'message', content: message });
        }
    }

    // Method to handle output received from the Tutor Agent
    handleTutorAgentOutput(output) {
        // Pass the output to the output handler function
        if (this.outputHandler) {
            this.outputHandler(output);
        }
    }

    // Method to subscribe to output updates
    subscribeToOutput(handler) {
        this.outputHandler = handler;
    }
}

export { PromptAgent };
