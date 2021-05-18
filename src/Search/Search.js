import React from 'react';
import SearchBar from '../Searchbar/Searchbar';
import ResultList from '../ResultList/ResultList';
import AquaticContext from '../AquaticContext';
import Navbar from '../Navbar/Navbar';
import './Search.css';

class Search extends React.Component {
    static contextType = AquaticContext;
    
    componentDidMount = () => {
            this.context.setResults(this.context.searchResults)
    }

    render() {
        return (
            <div className="search-page">
                <Navbar 
                    historyProp={this.props.history}
                />
                <header className="search">
                    <h1>Aquatic Answers</h1>
                </header>

                <SearchBar />
                <ResultList 
                    results={this.context.results}
                />
                <div className="search-space"></div>
            </div>
        );
    }
}

export default Search;