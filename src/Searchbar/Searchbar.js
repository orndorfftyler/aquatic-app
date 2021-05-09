import React from 'react';
import AquaticContext from '../AquaticContext';

class Searchbar extends React.Component {
    static contextType = AquaticContext;

    render() {
    return (
        <form className="wrapper">
            <label className="searchlabel" htmlFor="question">Search:</label>
            <input className="search" onChange={event => this.context.updateTerm(event.target.value)} name="question" type="text" id="question" required />
            <button className="search" onClick={this.context.searchHandler}>Submit</button>
        </form>

        );
    }
}

export default Searchbar;