import react from 'react';
import '../index.css';

const Output = ({output, task, getTask}) => {
    return (
        <div className='output'>
            <div className='task-card'>
                <h1>Task</h1>
                <p>{task}</p>
                <button className='submit-btn' onClick={getTask}>Get Task</button>
            </div>
            <h1>Output</h1>
            <p>{output}</p>
        </div>
    );
}

export default Output