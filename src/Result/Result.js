import React from 'react';
import AquaticContext from '../AquaticContext';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom'

class Result extends React.Component {

    static contextType = AquaticContext;
    constructor(props) {
        super(props);
        this.state = {
            desc: this.props.description ? this.props.description.slice(0,100) : '',
            buttonLabel:'More'
        }
    }

    showHideDesc() {
        if (this.state.desc && this.state.desc.length <= 100) {
            this.setState({
                desc:this.props.description,
                buttonLabel: 'Less'
            })
        } else if (this.state.desc && this.state.desc.length > 100) {
            this.setState({
                desc:this.props.description.slice(0,100),
                buttonLabel: 'More'
            })
        }
    }

    render() {

        let buttonVersion = '';
        if (this.props.description) {
            buttonVersion = (
                <button type="button" onClick={() => this.showHideDesc()}>{this.state.buttonLabel}</button>
            );
        } 

        let resultVersion = (
            <div className="result">
            <Link to={`book/${this.props.id}`}><h2>{this.props.title}</h2></Link>
                <div>
                    <Link to={`book/${this.props.id}`}>
                        <img src={this.props.src} width="200" />
                    </Link>
                    <div>
                        <p>Author: {this.props.author}</p>
                        <p>Publisher: {this.props.details}</p>
                        {this.state.desc}
                        {/*<p onClick={() => this.context.detailsHandler(this.props.title)}>Show/Hide Details (click me)</p> */}
                        {buttonVersion}
                    </div>
                </div>
            </div>
            
        );
        if (this.props.linkify == false) {
            resultVersion = (
            <div className="result">
            <h2>{this.props.title}</h2>
                <div>
                        <img src={this.props.src} width="200" />
                    <div>
                        <p >Author: {this.props.author}</p>
                        <p>Publisher: {this.props.details}</p>
                        {this.state.desc}
                        {/*<p onClick={() => this.context.detailsHandler(this.props.title)}>Show/Hide Details (click me)</p> */}
                        {buttonVersion}
                    </div>
                </div>
            </div>
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