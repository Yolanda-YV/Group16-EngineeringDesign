import react from 'react';
import CredForm from '../components/CredForm';
import { useNavigate } from 'react-router-dom'; 

const SignUp = () => {
    const navigate = useNavigate();
    const onSignUp = (e) => {
        e.preventDefault();
        // Implement sign-up logic here
    }
    return (
        <div className="sign-page">
            <CredForm isSignIn={false} />
            <div className='redirect-div'>
                <p>Already have an account?</p>
                <a onClick={() => navigate('/signin')}>Sign in</a>
            </div>
        </div>
    );
};

export default SignUp;