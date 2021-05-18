import React from 'react';
import { Link } from 'react-router-dom';

import './Landing.css';

class Landing extends React.Component {

    render() {
        return (
            <div className="look landing">
                <main role="main">
                    <div className="top-bar"></div>

                    <header role="banner" className="">
                        <h1>Aquatic Answers</h1>
                        <h2>Your #1 source for knowledge about aquariums and their inhabitants!</h2>
                        <p>You can search for questions and view answers without being logged in. </p>
                        <p>You must be logged in to post, edit, and delete questions and answers or view the My Questions page.</p>
                        <p>The nav bar will have more options after logging in.</p>
                        <p>Login info: </p>
                        <p>username: admin</p>
                        <p>password: admin</p>
                        <p>For a good example question, search for "jellyfish" and select the first result.</p>
                        <Link to='/search'><button type="button">Let's Go!</button></Link>
                    </header>

                    <section className="landing green">
                        <h3>Have a question about your aquatic pets?</h3>
                        <p>Get instant answers from experts in the community.</p>
                    </section>

                    <section className="landing">
                        <h3>Want to share your awesome aquarium knowledge with the world? Look no further!</h3>
                        <p>Help out the community and make new friends!</p>
                    </section>

                    <section className="landing green">
                        <h3>Trying to decide what kind of equipment to get? No problem!</h3>
                        <p>Ask any aquarium related question and let the community help you out.</p>
                    </section>

                    <section className="landing">
                        <Link to='/search'><button type="button">Let's Go!</button></Link>
                    </section>

                </main>                

            </div>
        );
    }
}

export default Landing;