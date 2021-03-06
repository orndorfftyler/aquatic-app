import React from 'react';
import AquaticContext from '../AquaticContext';
import {withRouter} from 'react-router-dom'
import './Answer.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

class Answer extends React.Component {

    static contextType = AquaticContext;

    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            title: this.props.title,
            contents: this.props.contents,
        }
    }

    editOn(e) {
        e.preventDefault();
        this.setState({edit:true});
    }

    editOff() {
        this.setState({edit:false});
    }

    editAnswerHideInput(e) {
        e.preventDefault();
        this.setState({edit:false});

        this.context.patchAnswer(e, 
            {
                answer_id: this.props.answer_id,
                question_id: this.props.question_id,
                title: this.state.title,
                contents: this.state.contents,
                user_id: this.props.user_id,
                username: this.props.username
            }
        );
    }

    updateContent(content) {
        this.setState({contents: content});
    }

    updateTitle(title) {
        this.setState({title: title});
    }

    componentDidMount() {
    }

    render() {

        let answerContents = (
            <div className="answer">
                <h2>{this.props.title}</h2>
                    <div>
                        <p>Author: {this.props.username}</p>
                        <p>{this.props.contents}</p>
                    </div>
            </div>
        );

        if (this.context.currentUser == this.props.user_id || localStorage.getItem('currentUser') == this.props.user_id) {
            answerContents = (
                <div className="answer">
                    <h2>{this.props.title}</h2>
                        <div>
                            <p>Author: {this.props.username}</p>
                            <p>{this.props.contents}</p>
                            <button  className="edit" type="submit" onClick={(e) => this.editOn(e)}>Edit</button>
                            <button  className="edit" type="submit" onClick={(e) => this.context.deleteAnswer(e, this.props.answer_id, this.props.question_id)}>Delete</button>
                        </div>
                </div>
            );
        }

        if (this.state.edit == true) {
            answerContents = (
                <form className="edit" onSubmit={(e) => this.editAnswerHideInput(e)}>
                    <section>
                        <label htmlFor="title">Title</label>
                        <input className="edit" onChange={e => this.updateTitle(e.target.value)} name="title" type="text" id="title" defaultValue={this.state.title} required />

                        <label htmlFor="content">Answer:</label>
                        <textarea className="edit" onChange={e => this.updateContent(e.target.value)} type="text" name="content" placeholder="Write your answer here" defaultValue={this.state.contents} required >
                        
                        </textarea>
                        <div>
                            <button  className="edit" type="submit">Submit</button>
                            <button  className="edit" type="button" onClick={() => this.editOff()}>Cancel</button>
                        </div>
                    </section>
                </form>
            );
        }

        return (
            <>
            {answerContents}
            </>
        )
    }
}

export default withRouter(Answer);