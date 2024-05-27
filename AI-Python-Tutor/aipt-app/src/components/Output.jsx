import react from 'react';
import '../index.css';

const Output = ({output, task}) => {
    return (
        <div className='output'>
            <div className='task-card'>
                <h1>Task</h1>
                <p>{task}</p>
            </div>
            <h1>Output</h1>
            <p>{output}</p>
        </div>
    );
}

export default Output