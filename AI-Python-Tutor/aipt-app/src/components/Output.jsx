import React, {useState, useEffect} from 'react';
import '../index.css';
import { PulseLoader, ClipLoader } from 'react-spinners';

const Output = ({output, task, cycleTask, loading, feedback, isCorrect, score}) => {

  const [outputLoading, setOutputLoading] = useState(true);
  const [correctLoading, setCorrectLoading] = useState(true);
  const [feedbackLoading, setFeedbackLoading] = useState(true);

  // to show the loader when the output is loading
  useEffect(() => {
    if (output === null || output === undefined || output === '') {
      setOutputLoading(true);
    } else {
      setOutputLoading(true);
  
      // Delay setting the loader to false
      const timer = setTimeout(() => {
        setOutputLoading(false);
        console.log('Setting outputLoading to false after delay');
      }, 300); // Adjust the delay as needed (in milliseconds)
  
      return () => clearTimeout(timer);
    }
  }, [output]);

  // to show the loader when the isCorrect is loading
  useEffect(() => {
    if (isCorrect === '') {
      setCorrectLoading(true);
    } else {
      setCorrectLoading(true);
  
      // Delay setting the loader to false
      const timer = setTimeout(() => {
        setCorrectLoading(false);
      }, 300); // Adjust the delay as needed (in milliseconds)
  
      return () => clearTimeout(timer);
    }
  }, [isCorrect]);

  // to show the loader when the feedback is loading
  useEffect(() => {
    if (feedback === null || feedback === undefined || feedback === '') {
      setFeedbackLoading(true);
    } else {
      setFeedbackLoading(true);
  
      // Delay setting the loader to false
      const timer = setTimeout(() => {
        setFeedbackLoading(false);
      }, 300); // Adjust the delay as needed (in milliseconds)
  
      return () => clearTimeout(timer);
    }
  }, [feedback]);
  
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
              {/* if output is loading, show the loader, else show the output */}
              {outputLoading ? (
                <div className='output-loader-div'>
                  <PulseLoader
                    color='#088be2'
                    loading={outputLoading}
                    size={10}/>
                </div>
              ) : (
                <pre>{output}</pre>
              )}
            </div>
            <div className='isCorrect'>
              <h1>Result</h1>
              {/* if isCorrect is loading, show the loader, else show the isCorrect */}
              {correctLoading ? (
                <div className='output-loader-div'>
                  <PulseLoader
                    color='#088be2'
                    loading={correctLoading}
                    size={10}/>
                </div>
              ) : (
                <div>
                  <p>{isCorrect !== null ? (isCorrect ? 'That\s correct!' : 'That\'s incorrect') : 'Not checked yet'}</p>
                  <p>
                    {score ? `${score}%` : isCorrect !== null ? (isCorrect ? '100%' : '') : ''} 
                    {isCorrect !== null ? (isCorrect ? (
                      <span className='correct-score'></span>
                    ) : (
                      <span className='incorrect-score'> -10</span>
                    )) : ''}
                  </p>
                </div>
              )}
              {/* <p>{isCorrect !== null ? (isCorrect ? 'Yes' : 'No') : 'Not checked yet'}</p> */}

            </div>
            {/* feedback shows when isCorrect is true */}
            {isCorrect === true && (
            <div className='feedback'>
              <h1>Feedback</h1>
              {/* if feedback is loading, show the loader, else show the feedback */}
              {feedbackLoading ? (
                <div className='output-loader-div'>
                  <PulseLoader
                    color='#088be2'
                    loading={feedbackLoading}
                    size={10}/>
                </div>
              ) : (
                <p>{feedback}</p>
              )}
              {/* <p>{feedback}</p> */}
            </div>
            )}
          </div>
          </div>
      );
    };
    

export default Output

