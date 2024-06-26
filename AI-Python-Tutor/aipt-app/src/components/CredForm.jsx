import react from 'react';
import '../index.css';

const CredForm = ({onSubmit, isSignIn}) => {
    return (
        <div className='cred-form' onSubmit={onSubmit}>
            <h1>{isSignIn ? 'Sign in to an existing account' : 'Create a new account'}</h1>
            <form>
                <input type='email' placeholder='Email'></input>
                {isSignIn ? null : <input type='text' placeholder='Username'></input>}
                <input type='password' placeholder='Password'></input>
                <button type='submit' className='submit-btn'>{isSignIn ? 'Log In' : 'Sign Up'}</button>
            </form>
        </div>
    )
}

export default CredForm;