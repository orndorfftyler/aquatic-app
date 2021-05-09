import React from 'react';
import { Link } from 'react-router-dom';
import AquaticContext from '../AquaticContext';
import TokenService from '../services/token-service';
import './Navbar.css';

export default class Nav extends React.Component {
    static contextType = AquaticContext;

    renderLogoutLink() {
        return (
        <div>
            <Link onClick={this.handleLogoutClick} to='/' style={{ textDecoration: 'none' }}>
                Logout
            </Link>
        </div>
        )
    }

    renderLoginLink() {
        return (
        <div>
            <Link to='/signup' style={{ textDecoration: 'none' }}>
                Sign Up / Log In
            </Link>
        </div>
        )
    }

    handleLogoutClick = () => {
        TokenService.clearAuthToken()
    }

    render() {
        let displayUser = this.context.currentUsername 
            || localStorage.getItem('currentUsername') 
            || 'none';
            
        return (
            <nav >
                <p>Current User: {displayUser}</p>
                <button className="nav">
                {TokenService.hasAuthToken()
                    ? this.renderLogoutLink()
                    : this.renderLoginLink()}
                </button>
            </nav>
        );
    }
}
