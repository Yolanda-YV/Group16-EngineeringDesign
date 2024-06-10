import React from 'react';

const ValidatorTool = ({ handleSubmit, handleCodeChange, validationResult }) => {
    return (
        <div className='validator-tool'>
            <div className='code-input'>
                <textarea 
                    placeholder='Enter your Python code here' 
                    onChange={handleCodeChange}
                    rows={10}
                    cols={50}
                ></textarea>
            </div>
            <button onClick={handleSubmit} className='submit-btn'>Validate</button>
            <div className='validation-result'>
                <h3>Validation Result</h3>
                <p>{validationResult}</p>
            </div>
        </div>
    );
}

export default ValidatorTool;
