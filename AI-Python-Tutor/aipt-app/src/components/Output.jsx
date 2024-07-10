import React, {useState, useEffect} from 'react';
import '../index.css';

const Output = ({output, task, getTask, feedback, isCorrect}) => {
  
    return (
        <div className='output'>
          <div className='current-task-card'>
            <h1>Task</h1>
            <p>{task}</p>
            <button className='submit-btn' onClick={getTask}>Get Task</button>
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
        </div>
      );
    };
    

export default Output

