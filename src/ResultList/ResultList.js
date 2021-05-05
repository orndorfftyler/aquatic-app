import React from 'react';
import Result from '../Result/Result';


class ResultList extends React.Component {

    render() {
    const results = this.props.results.map((book) => {
        return (

        <Result 
            key={book.identifier}
            title={book.title}
            src={book.src}
            author={book.author}
            description={book.description}
            details={book.details}
            id={book.identifier}
            linkify={true}
        />

        )
    } )
    console.log(this.props.results);
    console.log(results);

    return (
        <>
        {results}
        </>
    )
    }
}

export default ResultList;