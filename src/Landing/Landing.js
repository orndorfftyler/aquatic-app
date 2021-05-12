import React from 'react';
import { Link } from 'react-router-dom';

import './Landing.css';


class Landing extends React.Component {

    render() {
        return (
            <div className="look">
                <nav></nav>
                <main role="main">
                    <header role="banner">
                        <h1>Aquatic Answers</h1>
                        <h2>Your #1 source for knowledge about aquariums and their inhabitants!</h2>
                        <Link to='/search'><button type="button">Let's Go!</button></Link>
                    </header>

                    <section>
                    <Link to='/login'>
                            log in 
                        </Link>

                        <h3>Have a question about your aquatic pets?</h3>
                        <p>Get instant answers from experts in the community.</p>
                    </section>

                    <section>
                    <h3>Want to share your awesome aquarium knowledge with the world? Look no further!</h3>
                    <p>Help out the community and make new friends!</p>
                    </section>

                    <section>
                    <h3>Trying to decide what kind of equipment to get? No problem!</h3>
                    <p>Ask any aquarium related question and let the community help you out.</p>
                    </section>

                    <section >
                        <Link to='/search'><button type="button">Let's Go!</button></Link>
                    </section>

                </main>                

                <footer >Footer</footer>
            </div>
        );
    }
}

export default Landing;