class ValidatorAgent {
    constructor() {}

    async validateCode(code) {
        const response = await fetch("/.netlify/functions/validate", {
            method: "POST",
            headers: { 'Content-Type': 'text/plain' },
            body: code,
        });
        const result = await response.text();
        return result;
    }
}

export { ValidatorAgent };
