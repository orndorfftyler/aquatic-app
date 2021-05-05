import React from 'react';
import { Link } from 'react-router-dom';
import AquaticContext from '../AquaticContext';
import Navbar from '../Navbar/Navbar';


import './NewQuestion.css';

class NewQuestion extends React.Component {
    static contextType = AquaticContext;


    render() {
        return (
            <div className="look">
                <Navbar 
                    historyProp={this.props.history}
                />
                <main role="main">
 
                    <form>
                        <section className="centered">
                            <h3>What is your question?</h3>
                        </section>

                        <section className="form-section overview-section">
                            <label htmlFor="title">Question Title:</label>
                            <input type="text" name="title" required />

                            <label htmlFor="desc">Question Description:</label>
                            <textarea type="text" name="desc" placeholder="Add more details here" required>
                                
                            </textarea>
                            <Link to='/personal'><button type="button">Submit</button></Link>
                        </section>


                    </form>
                </main>
            </div>
        );
    }
}

export default NewQuestion;