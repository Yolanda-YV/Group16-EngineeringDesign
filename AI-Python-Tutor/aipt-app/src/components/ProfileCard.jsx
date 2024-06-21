import react from 'react';
import '../index.css';
import pfp from '/src/assets/default_pfp.png';

const ProfileCard = ({userInfo}) => {
    return (
        <div className='profile-card'>
            <img src={pfp}></img>
            <div>
                <h1>{userInfo ? userInfo.username : null}</h1>
                <p><strong>Email:</strong> {userInfo ? userInfo.email : null}</p>
                <p><strong>Level:</strong> {userInfo ? userInfo.level : null}</p>
            </div>
        </div>
    );
}

export default ProfileCard;