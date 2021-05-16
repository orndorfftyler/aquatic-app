import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import SignupLoginErr from './SignupLoginErr';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <BrowserRouter>
        <SignupLoginErr />
    </BrowserRouter>,
    div);

  ReactDOM.unmountComponentAtNode(div);
});