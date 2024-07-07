import { Interpreter } from './Interpreter.js';

class Validator {
    constructor() {
        this.interpreter = new Interpreter();
    }

    async processCode(code, task) {
    
        await this.interpreter.initPyodide();
        const output = await this.interpreter.runPython(code);
        
        




    }



}