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
            buttonLabel:'More',
            edit: false,
            title: this.props.title,
            contents2: this.props.contents,
            justDeleted: false

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
                contents: this.state.contents2,
                user_id: this.props.user_id,
                username: this.props.username
            }
        );
    }

    updateContent(content) {
        this.setState({contents2: content});
    }

    updateTitle(title) {
        this.setState({title: title});
    }

    deleteProcessing(e, question_id) {
        e.preventDefault()
        this.context.deleteQuestion(e, question_id)
        this.setState({justDeleted:true})
    }

    storeResults(question_id) {
        //this.context.updateSearchResults(this.context.results)
        this.context.getAnswers(question_id)
    }



    render() {

        let deleteNotice = this.state.justDeleted ? <p>Question will be removed shortly!</p> : <p></p>

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
                <Link onClick={() => this.storeResults(this.props.question_id)} to={`question/${this.props.question_id}`}><h2>{this.props.title}</h2></Link>
                    <div className="desc">
                        <p>{descText}</p>
                        {buttonVersion}
                        <p>Author: {this.props.username}</p>

                        
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

                        
                    </div>
            </section>
            )
        }

        let editDeleteButtons = (
            <>
                <button  className="edit" type="submit" onClick={(e) => this.editOn(e)}>Edit</button>
                <button  className="edit" type="submit" onClick={(e) => this.deleteProcessing(e, this.props.question_id)}>Delete</button>
            </>
        )

        if (this.state.justDeleted == true) {
            editDeleteButtons = (
                ''
            )
        }

        if (this.props.linkify == false) {
            if (this.context.currentUsername == this.props.username || localStorage.getItem('currentUsername') == this.props.username) {

            resultVersion = (
            <section className="result">
                <h2>{this.props.title}</h2>
                        <div className="desc">
                            <p>{this.props.contents}</p>
                            <p>Author: {this.props.username}</p>
                            {editDeleteButtons}
                            {deleteNotice}
                        </div>
            </section>
            )
            }
        }

        if (this.state.edit == true) {
            resultVersion = (
                <form className="edit" onSubmit={(e) => this.editQuestionHideInput(e)}>
                    <section>
                        <h2>{this.props.title}</h2>
                        <label htmlFor="title">Title</label>
                        <input className="edit" onChange={e => this.updateTitle(e.target.value)} name="title" type="text" id="title" defaultValue={this.state.title} required />

                        <label htmlFor="content">Question:</label>
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
        {resultVersion}
        </>
    )
    }
}

export default withRouter(Result);