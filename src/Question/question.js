import React from 'react';
import Result from '../Result/Result';
import AquaticContext from '../AquaticContext';
import AnswerList from '../AnswerList/AnswerList';
import Navbar from '../Navbar/Navbar';
import './Question.css';

class Question extends React.Component {
    static contextType = AquaticContext;

    constructor(props) {
        super(props);
        this.state = {
            current: {},
            content:'',
            title:'',
            showHideAnswerInput: 'show'
        }
    }
    
    updateContent(content) {
        this.setState({content: content});
    }

    updateTitle(title) {
        this.setState({title: title});
    }

    updateShowHideAnswerInput(state) {
        this.setState({showHideAnswerInput: state});
    }

    componentDidMount = () => {
        window.scrollTo(0,0);
    }

    showHideAnswer(e, question_id, title, content) {
        e.preventDefault();
        this.updateShowHideAnswerInput('hide');
        this.context.addAnswer(e, question_id, title, content);
    }

    render() {
        let question_id = this.props.match.params.question_id;
        let current = this.context.results.find(question => question.question_id == question_id);

        let answerUserCheck = 'question show';
        if (this.context.currentUser) {
            for (let i = 0; i < this.context.answers.length; i++) {
                if (this.context.answers[i]['user_id'] == this.context.currentUser) {
                    answerUserCheck = 'question hide';
                }
            }
    
        } else {
            for (let i = 0; i < this.context.answers.length; i++) {
                if (this.context.answers[i]['user_id'] == localStorage.getItem('currentUser')) {
                    answerUserCheck = 'question hide';
                }
            }
        }

        if (this.context.currentUsername == current.username) {
            answerUserCheck = 'question hide';
        }

        if (!this.context.currentUsername) {
            answerUserCheck = 'question hide';
        }
        
        return (
            
            <div className="question-page">

                <Navbar 
                    historyProp={this.props.history}
                />
                <div className="topSpace"></div>
                <p className="answerList " > Question:</p>
                <Result 
                    title={current.title}
                    username={current.username}
                    contents={current.contents}
                    question_id={current.question_id}
                    linkify={false}
                />

                <div className={answerUserCheck}>
                    <div className={this.state.showHideAnswerInput}>
                        <form className="question" onSubmit={(e) => this.showHideAnswer(e, current.question_id, this.state.title, this.state.content)}>
                            <section className="prompt">
                                <h3 className="prompt">Do you know the answer?</h3>
                                <label htmlFor="title">Title</label>
                                <input  className="question" onChange={e => this.updateTitle(e.target.value)} name="title" type="text" id="title" required />

                                <label htmlFor="content">Answer:</label>
                                <textarea  className="question" type="text" name="content" placeholder="Write your answer here" required onChange={e => this.updateContent(e.target.value)}>
                                
                                </textarea>
                                <div>
                                    <button className="question" type="submit">Submit</button>
                                </div>
                            </section>
                        </form>
                    </div>
                </div>

                <AnswerList 
                    answers={this.context.answers}
                    currentQuestion={current}
                    historyProp={this.props.history}
                />
                <div className="spacer"></div>
            </div>
    );
    }
}

export default Question;