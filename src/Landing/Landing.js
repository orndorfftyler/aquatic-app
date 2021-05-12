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
                        <h3>You can search for questions and view answers without being logged in. </h3>
                        <h3>You must be logged in to post, edit, and delete questions and answers or view the My Questions page.</h3>
                        <h3>The nav bar will have more options after logging in. </h3>
                        <h3>Login info: username: admin pw: admin </h3>
                        <h3>For a good example question, search for "jellyfish" and select the first result.</h3>
                        <Link to='/search'><button type="button">Let's Go!</button></Link>
                    </header>

                    <section>

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