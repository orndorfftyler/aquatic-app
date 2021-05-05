import React from 'react';
import { Link } from 'react-router-dom';
import AquaticContext from '../AquaticContext';

import './Signup.css';

class Signup extends React.Component {
    static contextType = AquaticContext;

    render() {
        return (
            <div >
                <nav role="navigation"></nav>
                <main role="main">
                    <header>
                        <h1>Sign Up</h1>
                    </header>
                        <form>

                        <section className="form-section overview-section">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" placeholder="fishguy411" required />

                            <label htmlFor="pw">Password</label>
                            <input type="text" name="pw" id="hours-slept" />

                            <input type="text" name="pw2" id="hours-slept" />

                            <Link to='/search'><button type="submit" onClick={e => this.context.setLogged(true)}>Submit</button></Link>
                        </section>

                        </form>
                </main>

            </div>
        );
    }
}

export default Signup;