import // prompt_agent.js

class PromptAgent {
    constructor() {
        this.interpreter = new MockInterpreter();
        this.validator = new MockValidator();
    }

    receiveCodeFromWebApp(codeInput) {
        let formattedCode = this.formatCodeInput(codeInput);
        return formattedCode;
    }

    sendCodeToInterpreter(formattedCode) {
        let interpreterResult = this.interpreter.execute(formattedCode);
        return interpreterResult;
    }

    receiveValidationResult(formattedCode) {
        let validationResult = this.validator.validate(formattedCode);
        return validationResult;
    }

    formatCodeInput(codeInput) {
        let lines = codeInput.trim().split('\n');
        let formattedCode = lines.join('\n');
        return formattedCode;
    }
}

class MockInterpreter {
    execute(code) {
        return `Executed: ${code}`;
    }
}

class MockValidator {
    validate(code) {
        return `Validated: ${code}`;
    }
}

// Export the PromptAgent class
module.exports = PromptAgent;
