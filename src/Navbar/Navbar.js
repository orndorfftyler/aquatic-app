import React from 'react';
import { Link } from 'react-router-dom';
import AquaticContext from '../AquaticContext';
import TokenService from '../services/token-service';
import './Navbar.css';

export default class Nav extends React.Component {
    static contextType = AquaticContext;

    handleLogoutClick = () => {
        this.context.setLogged(false)
        TokenService.clearAuthToken()
        this.context.clearUserAndUsername()
    }

    render() {
        let displayUser = this.context.currentUsername 
            ? `Current User: ${this.context.currentUsername}`
            : '';

        let buttons = (
            <nav className='Nav-login'>
                <div className="navLink"><Link to='/login' style={{ textDecoration: 'none' }}>Log In</Link></div>
            </nav>

        );

        if (TokenService.hasAuthToken()) {
            buttons = (
                <nav className='Nav'>
                    <p>{displayUser}</p>
                    <div className="flexRow">
                        <div className="navLink"><Link to='/search' style={{ textDecoration: 'none' }} onClick={this.handleLogoutClick}>Log Out</Link></div>
                        <div className="navLink"><Link to='/search' style={{ textDecoration: 'none' }}>Search</Link></div>
                    </div>
                    <div className="flexRow">
                        <div className="navLink big"><Link to='/new' style={{ textDecoration: 'none' }}>New Question</Link></div>
                        <div className="navLink big"><Link to='/personal' style={{ textDecoration: 'none' }}>My Questions</Link></div>
                    </div>
                </nav>
            );
        }
            
        return (
            <>
            {buttons}
            </>
        );
    }
}
