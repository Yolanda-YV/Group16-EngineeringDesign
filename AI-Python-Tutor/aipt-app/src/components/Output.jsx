import react from 'react';
import '../index.css';
import { ClipLoader } from 'react-spinners';

const Output = ({output, task, getTask, loading}) => {
    return (
        <div className='output'>
            <div className='current-task-card'>
                <h1>Task</h1>
                {loading ? (
                    <div className='task-loader-div'>
                    <ClipLoader
                        color='#088be2'
                        loading={loading}
                        size={30}/>
                    </div>
                ) : (
                    <p>{task}</p>
                )}
                <button className='submit-btn' onClick={getTask}>Get Task</button>
            </div>
            <h1>Output</h1>
            <p>{output}</p>
        </div>
    );
}

export default Output