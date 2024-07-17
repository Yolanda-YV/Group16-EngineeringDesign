import React, {useState, useEffect} from 'react';
import '../index.css';
import { ClipLoader } from 'react-spinners';

const Output = ({output, task, cycleTask, loading, feedback, isCorrect}) => {

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
                {/* {isCorrect == true && isCorrect ? (
                    <button className='submit-btn' onClick={getNextTask}>Get new task</button>
                ) : null} */}
                <button className='submit-btn' onClick={cycleTask}>
                  <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 12L22 12" stroke="currentColor" stroke-width="3" />
                  <path d="M16 6L22 12L16 18" stroke="currentColor" stroke-width="3" />
                  </svg>
                </button>
            </div>
            <div className='card'>
            <div className='output-section'>
              <h1>Output</h1>
              <pre>{output}</pre>
            </div>
            <div className='isCorrect'>
              <h1>Correct</h1>
              <p>{isCorrect !== null ? (isCorrect ? 'Yes' : 'No') : 'Not checked yet'}</p>
            </div>
            {/* feedback shows when isCorrect is true */}
            {isCorrect === true && (
            <div className='feedback'>
              <h1>Feedback</h1>
              <p>{feedback}</p>
            </div>
            )}
          </div>
          </div>
      );
    };
    

export default Output

