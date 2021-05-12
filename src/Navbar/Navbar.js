import React from 'react';
import { Link } from 'react-router-dom';
import AquaticContext from '../AquaticContext';
import TokenService from '../services/token-service';
import './Navbar.css';

export default class Nav extends React.Component {
    static contextType = AquaticContext;


    handleLogoutClick = () => {
        this.context.setLogged(false)
        console.log('logged out')
        TokenService.clearAuthToken()
    }

    render() {
        let displayUser = this.context.currentUser 
            ? this.context.currentUser 
            : 'none';

        let buttons = (
            <nav className='Nav'>
                <p>Current User: {displayUser}</p>
                <div className="navLink"><Link to='/login' onClick={this.handleLogoutClick}>Log Out</Link></div>
                <div className="navLink"><Link to='/search'>Search</Link></div>
                <div className="navLink big"><Link to='/new'>New Question</Link></div>
                <div className="navLink big"><Link to='/personal'>My Questions</Link></div>

            </nav>
        );

        if (!TokenService.hasAuthToken()) {
            buttons = (
                <nav className='Nav'>
                    <p>Current User: {displayUser}</p>
                    <div><Link to='/login'>Log In</Link></div>
                    <Link to='/login' onClick={this.handleLogoutClick}>Log Out</Link>
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
