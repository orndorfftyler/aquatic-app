import React from 'react';
import SearchBar from '../Searchbar/Searchbar';
import ResultList from '../ResultList/ResultList';
import AquaticContext from '../AquaticContext';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';

import './Search.css';


class Search extends React.Component {
    static contextType = AquaticContext;

    render() {
        return (
            <div className="look">

                <Navbar 
                    historyProp={this.props.history}
                />

                <header>
                    <h1>Search for Questions</h1>
                    {/*<p>User:{this.context.currentUser}</p>*/}
                </header>
                <SearchBar />

                <Link to='/question/staticTest'>
                <div className="result">
                    <h3>How much seagrass can I fit in a 5 gallon tank?</h3>
                    <p>I would like to harvest...</p>
                </div>
                </Link>
                
                <div className="result">
                    <h3>Next question</h3>
                    <p>First line of description...</p>
                </div>

                <div className="result">
                    <h3>Next question</h3>
                    <p>First line of description...</p>
                </div>

                <div className="result">
                    <h3>Next question</h3>
                    <p>First line of description...</p>
                </div>

                <ResultList 
                    results={this.context.results}
                />
        
            </div>
        );
    }
}

export default Search;