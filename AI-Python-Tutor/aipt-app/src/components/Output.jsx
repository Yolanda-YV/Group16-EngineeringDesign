import React, {useState, useEffect} from 'react';
import '../index.css';

const Output = ({output, task, getTask, feedback, hint, isCorrect}) => {
    // State to control whether to show the hint popup
    const [showHint, setShowHint] = useState(false);

    useEffect(() => {
        // Update showHint whenever isCorrect changes to false
        if (isCorrect === false) {
            setShowHint(true);
        }
    }, [isCorrect]);

    // Function to close the hint popup
    const closeHint = () => {
        setShowHint(false);
    };
  
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
            <div className='feedback'>
              <h1>Feedback</h1>
              <p>{feedback}</p>
            </div>
            <div className='isCorrect'>
              <h1>Correct</h1>
              <p>{isCorrect !== null ? (isCorrect ? 'Yes' : 'No') : 'Not checked yet'}</p>
            </div>
          </div>
          {/* Display hint popup if showHint is true */}
          {showHint && (
                <div className='hint-popup'>
                    <div className='hint-content'>
                        <button className='close-hint' onClick={closeHint}>X</button>
                        <h1>Hint</h1>
                        <p>{hint}</p>
                    </div>
                </div>
            )}
        </div>
      );
    };
    

export default Output

