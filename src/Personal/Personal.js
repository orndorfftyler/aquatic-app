import React from 'react';
import { Link } from 'react-router-dom';
import AquaticContext from '../AquaticContext';
import Navbar from '../Navbar/Navbar';
import ResultList from '../ResultList/ResultList';


import './Personal.css';

class Personal extends React.Component {
    static contextType = AquaticContext;

    componentDidMount = () => {
        this.context.clearResults()

        this.context.getPersonalQuestions(this.context.currentUser)
    }


    render() {
        return (
            <div className="search-page">
                <Navbar 
                    historyProp={this.props.history}
                />
                    <header className="search">
                        <h1>My Questions:</h1>
                    </header>
                    <ResultList 
                        results={this.context.results}
                    />

                <div className="search-space"></div>
            </div>
        );
    }
}

export default Personal;