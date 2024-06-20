import react from 'react';
import '../index.css';

const ProfileCard = ({userInfo}) => {
    return (
        <div className='profile-card'>
            <h2>{userInfo ? userInfo.username : null}</h2>
            <p><strong>Email:</strong> {userInfo ? userInfo.email : null}</p>
            <p><strong>Level:</strong> {userInfo ? userInfo.level : null}</p>
        </div>
    );
}

export default ProfileCard;