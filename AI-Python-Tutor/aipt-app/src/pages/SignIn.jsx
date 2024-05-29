import react from 'react';
import CredForm from '../components/CredForm';
import { useNavigate } from 'react-router-dom'; 

const SignIn = () => {
    const navigate = useNavigate();
    const onSignIn = (e) => {
        e.preventDefault();
        // Implement sign-in logic here
    }
    return (
        <div className="sign-page">
            <CredForm isSignIn={true} />
            <div className='redirect-div'>
                <p>Don't have an account yet?</p>
                <a onClick={() => navigate('/signup')}>Sign up</a>
            </div>
        </div>
    );
};

export default SignIn;