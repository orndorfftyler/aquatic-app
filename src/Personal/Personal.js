import React from 'react';
import { Link } from 'react-router-dom';
import AquaticContext from '../AquaticContext';
import Navbar from '../Navbar/Navbar';
import ResultList from '../ResultList/ResultList';
import MyQuestionList from '../MyQuestionList/MyQuestionList';


import './Personal.css';

class Personal extends React.Component {
    static contextType = AquaticContext;

    componentDidMount = () => {
        this.context.clearResults()

        this.context.getPersonalQuestions(this.context.currentUser)
        //call new fetch
    }


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

                    <MyQuestionList 
                        questions={this.context.results}
                    />

                </main>
            </div>
        );
    }
}

export default Personal;