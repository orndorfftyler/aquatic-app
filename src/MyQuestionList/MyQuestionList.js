import React from 'react';
import MyQuestion from '../MyQuestion/MyQuestion';

class MyQuestionList extends React.Component {

    render() {

    console.log(`this.props.questions (=results): ${this.props.questions}`)
    //let questions = this.props.questions.filter(questions => questions.question_id == this.props.currentQuestion.question_id);
    //let answers1 = answers.reverse();
    let questions = this.props.questions.map(question => {
        return (

        <MyQuestion 
            key={question.question_id}
            question_id={question.question_id}
            title={question.title}
            contents={question.contents}
            user_id={question.user_id}
            username={question.username}
            //historyProp={this.props.historyProp}
        />
        )
    } );


    return (
        <>
        {questions}
        </>
    )
    }
}

export default MyQuestionList;