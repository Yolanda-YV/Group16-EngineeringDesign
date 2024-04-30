import react from 'react';
import '../index.css';

const Output = ({output}) => {
    return (
        <div className='output'>
            <h1>Output</h1>
            <p>{output}</p>
        </div>
    );
}

export default Output