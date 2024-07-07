import react from 'react';
import '../index.css';

const Output = ({output, task, getTask, result, getResult}) => {
    return (
        <div className='output'>
            <div className='current-task-card'>
                <h1>Task</h1>
                <p>{task}</p>
                <button className='submit-btn' onClick={getTask}>Get Task</button>
            </div>
            <h1>Output</h1>
            <p>{output}</p> 
            <div className='code-validator'>
                <h1>Result</h1>
                <p>{result}</p>
                <button className='submit-btn' onClick={getResult}>Submit</button>
            </div>          
        </div>
    );
}

export default Output