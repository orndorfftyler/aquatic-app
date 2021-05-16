import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Answer from './Answer';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <BrowserRouter>
      <Answer />
    </BrowserRouter>,
    div);

  ReactDOM.unmountComponentAtNode(div);
});