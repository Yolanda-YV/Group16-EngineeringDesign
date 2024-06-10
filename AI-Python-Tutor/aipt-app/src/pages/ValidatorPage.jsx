import React, { useState } from 'react';
import ValidatorTool from '../components/ValidatorTool';
import { ValidatorAgent } from '../modules/ValidatorAgent';
import '../index.css';

const ValidatorPage = () => {
    const [code, setCode] = useState('');
    const [validationResult, setValidationResult] = useState('');

    const validatorAgent = new ValidatorAgent();

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    }

    const handleSubmit = async () => {
        const result = await validatorAgent.validateCode(code);
        setValidationResult(result);
    }

    return (
        <div className='validator-page'>
            <ValidatorTool 
                handleCodeChange={handleCodeChange} 
                handleSubmit={handleSubmit} 
                validationResult={validationResult} 
            />
        </div>
    );
}

export default ValidatorPage;
