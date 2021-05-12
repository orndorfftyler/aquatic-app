import React from 'react';
import AquaticContext from '../AquaticContext';
import {withRouter} from 'react-router-dom'
import TokenService from '../services/token-service';
import {Link} from 'react-router-dom';


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


class MyQuestion extends React.Component {

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

    editQuestionHideInput(e) {
        e.preventDefault();
        this.setState({edit:false});

        this.context.patchQuestion(e, // make this fetch in app
            {
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


        let questionContents = (
            <div className="result">
                <Link onClick={() => this.context.getAnswers(this.props.question_id)} to={`question/${this.props.question_id}`}><h2>{this.props.title}</h2></Link>
                    <div>
                        <p>{this.props.contents}</p>
                        <p>Author: {this.props.username}</p>
                    </div>
            </div>
        );

        if (this.context.currentUser == this.props.user_id || localStorage.getItem('currentUser') == this.props.user_id) {
            questionContents = (
                <div className="result">
                    <Link onClick={() => this.context.getAnswers(this.props.question_id)} to={`question/${this.props.question_id}`}><h2>{this.props.title}</h2></Link>
                        <div>
                            <p>{this.props.contents}</p>
                            <p>Author: {this.props.username}</p>
                            <button  className="edit" type="submit" onClick={(e) => this.editOn(e)}>Edit</button>
                            <button  className="edit" type="submit" onClick={(e) => this.context.deleteQuestion(e, this.props.question_id)}>Delete</button>
                        </div>
                </div>
            );
        }

        if (this.state.edit == true) {
            questionContents = (
                <form className="edit" onSubmit={(e) => this.editQuestionHideInput(e)}>
                    <section>
                        <h2>{this.props.title}</h2>
                        <label htmlFor="title">Title</label>
                        <input className="edit" onChange={e => this.updateTitle(e.target.value)} name="title" type="text" id="title" defaultValue={this.state.title} required />

                        <label htmlFor="content">Answer:</label>
                        <textarea className="edit" onChange={e => this.updateContent(e.target.value)} type="text" name="content" placeholder="Write your question here" defaultValue={this.state.contents} required >
                        
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
            {questionContents}
            </>
        )
    }
}

export default withRouter(MyQuestion);