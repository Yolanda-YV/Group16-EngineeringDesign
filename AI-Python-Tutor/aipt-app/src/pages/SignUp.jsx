import react from 'react';
import CredForm from '../components/CredForm';
import { useNavigate } from 'react-router-dom';
import supabase from '../utilities/Supabase'; 

const SignUp = () => {
    const navigate = useNavigate();
    const onSignUp = async (e) => {
        e.preventDefault();
        // Implement sign-up logic here
        const email = e.target[0].value;
        const username = e.target[1].value;
        const password = e.target[2].value;
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    display_name: username,
                }
            }
        });
        if (error) {
            console.error("ERROR", error)
        } else {
            // Navigate to the root page
            navigate('/');
        }
    }
    // NOTE: naviate(-1) is equivalent to clicking the back button, since signin page may be the root page
    return (
        <div className="sign-page">
            <CredForm isSignIn={false} onSubmit={onSignUp} />
            <div className='redirect-div'>
                <p>Already have an account?</p>
                <a onClick={() => navigate(-1)}>Sign in</a>
            </div>
        </div>
    );
};

export default SignUp;