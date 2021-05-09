import React from 'react';
import Answer from '../Answer/Answer';

class AnswerList extends React.Component {

    render() {

    console.log(`this.context.answers: ${this.props.answers}`)
    let answers = this.props.answers.filter(answer => answer.question_id == this.props.currentQuestion.question_id);
    let answers1 = answers.reverse();
    let answers2 = answers1.map(answer => {
        return (

        <Answer 
            key={answer.answer_id}
            answer_id={answer.answer_id}
            question_id={answer.question_id}
            title={answer.title}
            contents={answer.contents}
            user_id={answer.user_id}
            username={answer.username}
            historyProp={this.props.historyProp}
        />
        )
    } );

    let title = '';
    if (answers.length >= 1) {
        title = <p className="answerList">Answers:</p>
    }

    return (
        <>
        {title}
        {answers2}
        </>
    )
    }
}

export default AnswerList;