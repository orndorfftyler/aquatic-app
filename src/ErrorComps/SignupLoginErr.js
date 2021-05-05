import React from 'react';
import PropTypes from 'prop-types';


export default function NoteNameErr(props) {
  if(props.message) {
    return (
      <div className="error">{props.message}</div>
    );
  }

  return <></>
}

NoteNameErr.propTypes = {
  message: PropTypes.string
};