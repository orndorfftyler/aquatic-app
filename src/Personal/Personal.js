import React from 'react';
import { Link } from 'react-router-dom';
import AquaticContext from '../AquaticContext';
import Navbar from '../Navbar/Navbar';


import './Personal.css';

class Personal extends React.Component {
    static contextType = AquaticContext;


    render() {
        return (
            <div className="look">
                <Navbar 
                    historyProp={this.props.history}
                />
                <main role="main">
                    <header>
                        <h1>My Questions:</h1>
                    </header>
                    <form>

                    <section>
                        <h3>How much meat to feed 50 piranhas per week?</h3>
                        <p>I've got a lot of hungry boys...</p>
                    </section>
                    
                    <section>
                        <h3>How to breed piranhas?</h3>
                        <p>I need more...</p>
                    </section>

                    <section>
                        <h3>Where to buy piranhas?</h3>
                        <p>They are such cool fish...</p>
                    </section>

                    </form>
                </main>
            </div>
        );
    }
}

export default Personal;