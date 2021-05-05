import React from 'react';
import { Link } from 'react-router-dom';
import AquaticContext from '../AquaticContext';


import './Login.css';

class Login extends React.Component {
    static contextType = AquaticContext;


    render() {
        return (
            <div className="look">
                <nav role="navigation"></nav>
                <main role="main">
                    <header>
                        <h1>Log In!</h1>
                    </header>
                        <form>

                        <section class="form-section overview-section">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" placeholder="fishguy411" required />

                            <label htmlFor="pw">Password</label>
                            <input type="text" name="pw" id="hours-slept" />


                            <Link to='/search'><button type="submit" onClick={e => this.context.setLogged(true)}>Submit</button></Link>
                        </section>

                        </form>
                        <Link to='/signup'><p>Need an account? Sign up here</p></Link>
                </main>
            </div>
        );
    }
}

export default Login;