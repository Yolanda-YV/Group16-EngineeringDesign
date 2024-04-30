import react from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="site-title">AI Python Tutor</Link>
            <ul>
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