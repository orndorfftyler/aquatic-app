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
        this.context.clearUserAndUsername()
    }

    render() {
        let displayUser = this.context.currentUsername 
            ? this.context.currentUsername 
            : 'none';

        let buttons = (

            <nav className='Nav'>

                    <p>Current User: {displayUser}</p>
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

        if (!TokenService.hasAuthToken()) {
            buttons = (
                <nav className='Nav'>
                    <div className="navLink"><Link to='/login' style={{ textDecoration: 'none' }}>Log In</Link></div>
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
