import React from 'react';
import AquaticContext from '../AquaticContext';

class Searchbar extends React.Component {
    static contextType = AquaticContext;

    render() {
    return (
        <form className="wrapper" >
            <input className="search margin" onChange={event => this.context.updateTerm(event.target.value)} name="question" type="text" id="question" required />
            <button className="search margin sb" onClick={this.context.getQuestions}>Submit</button>
        </form>

        );
    }
}

export default Searchbar;