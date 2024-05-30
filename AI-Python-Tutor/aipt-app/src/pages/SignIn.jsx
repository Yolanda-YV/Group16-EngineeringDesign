import react from 'react';
import CredForm from '../components/CredForm';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import supabase from '../utilities/Supabase';

const SignIn = () => {
    const [invalidCred, setInvalidCred] = useState(false);
    const navigate = useNavigate();
    const onSignIn = async (e) => {
        e.preventDefault();
        // Implement sign-in logic here
        const email = e.target[0].value;
        const password = e.target[1].value;
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        if (error) {
            if (error.status == 400) {
                setInvalidCred(true);
            }
        } else {
            setInvalidCred(false);
            // Navigate to the root page
            navigate('/');
        }
    }
    return (
        <div className="sign-page">
            {invalidCred ? <p className='invalid-cred'>Incorrect email or password</p> : null}
            <CredForm isSignIn={true} onSubmit={onSignIn}/>
            <div className='redirect-div'>
                <p>Don't have an account yet?</p>
                <a onClick={() => navigate('/signup')}>Sign up</a>
            </div>
        </div>
    );
};

export default SignIn;