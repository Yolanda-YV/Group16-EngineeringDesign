import React, {useState, useEffect} from 'react';
import '../index.css';
import { ClipLoader } from 'react-spinners';

const Output = ({output, task, getTask, loading, feedback, isCorrect}) => {

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
            <div className='output-section'>
              <h1>Output</h1>
              <pre>{output}</pre>
            </div>
            {/* feedback shows when isCorrect is true */}
            {isCorrect === true && (
            <div className='feedback'>
              <h1>Feedback</h1>
              <p>{feedback}</p>
            </div>
            )}
            <div className='isCorrect'>
              <h1>Correct</h1>
              <p>{isCorrect !== null ? (isCorrect ? 'Yes' : 'No') : 'Not checked yet'}</p>
            </div>
          </div>
      );
    };
    

export default Output

