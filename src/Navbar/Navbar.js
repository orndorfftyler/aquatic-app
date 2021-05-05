import React from 'react';
import { Link } from 'react-router-dom';
import AquaticContext from '../AquaticContext';

export default class Nav extends React.Component {
    static contextType = AquaticContext;

    logout(e) {
        e.preventDefault();
        this.context.updateCurrentUser('');
        this.props.historyProp.push('/');
    }

    render() {

        let displayUser = this.context.currentUser 
            ? this.context.currentUser 
            : 'none';

        let buttons = (
            <nav className='Nav'>
                <p>Current User: {displayUser}</p>
                <Link to='/login'><button  type="button" onClick={e => this.context.setLogged(false)}>Log Out</button></Link>
                <Link to='/search'><button type="button">Search</button></Link>
                <Link to='/new'><button type="button">New Question</button></Link>
                <Link to='/personal'><button type="button">My Questions</button></Link>

            </nav>
        );

        if (!this.context.loggedIn) {
            buttons = (
                <nav className='Nav'>
                    <p>Current User: {displayUser}</p>
                    <Link to='/login'><button type="button" >Log In</button></Link>
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
