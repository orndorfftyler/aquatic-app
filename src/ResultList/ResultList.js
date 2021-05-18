import React from 'react';
import Result from '../Result/Result';

class ResultList extends React.Component {

    render() {
        let results = '';

        if (this.props.results) {
            results = this.props.results.map((question) => {

                return (
                    <Result 
                        key={question.question_id}
                        title={question.title}
                        username={question.username}
                        contents={question.contents}
                        question_id={question.question_id}
                        linkify={true}
                    />
                )
            })
        }

        if (!results) {
            results = <p>No results</p>
        }

        return (
            <>
            {results}
            </>
        )
    }
}

export default ResultList;