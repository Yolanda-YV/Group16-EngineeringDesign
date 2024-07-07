import { Interpreter } from './Interpreter.js';
// import { TutorAgent } from './TutorAgent';
import supabase from '../utilities/Supabase.js';

class Validator {
    constructor() {
        this.interpreter = new Interpreter();
    }

    async processCode(code, task) {
    
        // await this.interpreter.initPyodide();
        // const codeResult = await this.interpreter.runPython(code);
        // const { data:{user} } = await supabase.auth.getUser();

        if(task){
            const result = await fetch("/.netlify/functions/Validate", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
        }
        




    }



}