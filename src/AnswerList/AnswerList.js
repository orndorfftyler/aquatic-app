import React from 'react';
import Answer from '../Answer/Answer';


class AnswerList extends React.Component {

    render() {
   //console.log(this.props.currentBook);

    let answers = this.props.answers.filter(answer => answer.bookId == this.props.currentQuestion.identifier);
    //console.log(reviews);
    let answers2 = answers.map(answer => {
        return (

        <Answer 
            key={answer.reviewId}
            reviewId={answer.reviewId}
            bookId={answer.bookId}
            title={answer.title}
            contents={answer.contents}
            helpCount={answer.helpCount}
            user={answer.user}
            historyProp={this.props.historyProp}
        />
        )
    } )
    //console.log(this.props.reviews);
    //console.log(reviews);

    return (
        <>
        {answers2}
        </>
    )
    }
}

export default AnswerList;