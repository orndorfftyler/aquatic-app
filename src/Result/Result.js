import React from 'react';
import AquaticContext from '../AquaticContext';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom'
import './Result.css';

class Result extends React.Component {

    static contextType = AquaticContext;
    constructor(props) {
        super(props);
        
        this.state = {
            contents: this.props.contents ? this.props.contents.split(' ').slice(0,50).join(' ') : '',
            buttonLabel:'More'
        }
        
    }

    showHideDesc() {
        if (this.state.contents && this.state.contents.split(' ').length <= 50) {
            this.setState({
                contents:this.props.contents,
                buttonLabel: 'Less'
            })
        } else if (this.state.contents && this.state.contents.split(' ').length > 50) {
            this.setState({
                contents:this.props.contents.split(' ').slice(0,50).join(' '),
                buttonLabel: 'More'
            })
        }
    }

    render() {

        let buttonVersion = '';
        if (this.props.contents && this.props.contents.split(' ').length > 50) {
            buttonVersion = (
                <button className="showHide" type="button" onClick={() => this.showHideDesc()}>{this.state.buttonLabel}</button>
            );
        } 

        let descText = this.state.contents;
        if (this.props.contents && this.props.contents.split(' ').length > 50 && this.state.contents.split(' ').length <= 50) {
            descText = this.state.contents + '...'
        } 

        let resultVersion = (
            <section className="result">
                <Link onClick={() => this.context.getAnswers(this.props.question_id)} to={`question/${this.props.question_id}`}><h2>{this.props.title}</h2></Link>
                    <div className="desc">
                        <p>{descText}</p>
                        <p>Author: {this.props.username}</p>

                        {buttonVersion}
                    </div>
            </section>
            
        );
        if (this.props.linkify == false) {
            resultVersion = (
            <section className="result">
                <h2>{this.props.title}</h2>
                    <div className="desc">
                        <p>{this.props.contents}</p>
                        <p>Author: {this.props.username}</p>

                        {buttonVersion}
                    </div>
            </section>
            )
        }
    
    return (
        <>
        {resultVersion}
        </>
    )
    }
}

export default withRouter(Result);