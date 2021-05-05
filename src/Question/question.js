import React from 'react';
import Result from '../Result/Result';
import AquaticContext from '../AquaticContext';
import AnswerList from '../AnswerList/AnswerList';
import Navbar from '../Navbar/Navbar';
import './question.css';

class Book extends React.Component {
    static contextType = AquaticContext;

    constructor(props) {
        super(props);
        this.state = {
            current: {},
            content:'',
            title:'',
            showHideReviewInput: 'show'
        }
    }


    componentDidMount = () => {
        window.scrollTo(0,0);
        console.log('book mounted');
    }

    nothing(e) {
        e.preventDefault();
    }


    render() {
        let bookId = this.props.match.params.bookId;
        let current = this.context.results.find(book => book.identifier == bookId);
        
        return (
            <div className="look">

                <Navbar 
                    historyProp={this.props.history}
                />

                <main role="main">
                    <form>

                    <section class="centered">
                        <h3>How much seagrass can I fit in a 5 gallon tank?</h3>
                        <div>
                        <p>I would like to harvest at least 5 kilos a month.</p>
                        </div>
                    </section>

                    <section class="form-section overview-section">
                        <label for="username">Can you help out?</label>
                        <textarea type="text" name="username" placeholder="Write your answer here" required>
                        
                        </textarea>
                        <button onClick={e => this.nothing(e)}>Submit</button>
                    </section>

                    <section>
                        <h5>I see you are a fellow seagrass connoisseur! I have been farming 
                        seagrass for 5 years and I would love to help you out... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris

                        </h5>
                        <p>9 people found this helpful</p>
                        <button type="submit">This answer was helpful</button>
                    </section>
                    
                    <section>
                        <h5>Why are you trying to grow so much seagrass? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</h5>
                        <p>8 people found this helpful</p>
                        <button type="submit">This answer was helpful</button>
                    </section>

                    <section>
                        <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</h5>
                        <p>Review content</p>
                        <p>7 people found this helpful</p>
                        <button type="submit">This answer was helpful</button>
                    </section>

                    <section>
                        <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</h5>
                        <p>Review content</p>
                        <p>6 people found this helpful</p>
                        <button type="submit">This answer was helpful</button>
                    </section>

                    </form>
                </main>


            </div>
        );
    }
}

export default Book;