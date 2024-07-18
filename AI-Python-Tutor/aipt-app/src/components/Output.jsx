import React, {useState, useEffect} from 'react';
import '../index.css';
import { ClipLoader } from 'react-spinners';

const Output = ({output, task, getTask, loading, feedback, isCorrect, score}) => {
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
                {isCorrect == true && isCorrect ? (
                    <button className='submit-btn' onClick={getTask}>Get new task</button>
                ) : null}
            </div>
            <div className='card'>
            <div className='output-section'>
              <h1>Output</h1>
              <pre>{output}</pre>
            </div>
            <div className='isCorrect'>
              <h1>Result</h1>
              <p>{isCorrect !== null ? (isCorrect ? 'That\s correct!' : 'That\'s not right') : 'Not checked yet'}</p>
              <p className={isCorrect !== null ? (isCorrect ? 'correct-score' : 'incorrect-score') : ''}>{score ? `${score}%` : ''}</p>
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

