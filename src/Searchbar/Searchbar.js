import React from 'react';
import AquaticContext from '../AquaticContext';


class Searchbar extends React.Component {
    static contextType = AquaticContext;


    nothing(e) {
        e.preventDefault();
    }

    render() {
    return (
        <form className="wrapper">
            <label htmlFor="book">Search:</label>
            <input name="book" type="text" id="book" required />
            <button onClick={e => this.nothing(e)}>Submit</button>
        </form>

    );
    }
}

export default Searchbar;