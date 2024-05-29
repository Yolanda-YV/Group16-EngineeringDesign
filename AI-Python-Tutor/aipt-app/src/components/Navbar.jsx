import react from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import logo_primary from '/src/assets/Logo_primary.png';
import logo_white from '/src/assets/Logo_gray.png';
import logo_black from '/src/assets/Logo_black.png';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li className='site-title'>
                    <img src={logo_primary}></img>
                    <Link to="/">PyMon</Link>
                    
                </li>
            </ul>
            
            <ul>
                <li>
                    <Link to="/signin" className='nav-item'>Sign In</Link>
                </li>
                <li>
                    <Link to="/practice" className='nav-item'>Practice</Link>
                </li>
                <li>
                    <Link to="/" className='nav-item'>Dashboard</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar