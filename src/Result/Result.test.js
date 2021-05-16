import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Result from './Result';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <BrowserRouter>
      <Result />
    </BrowserRouter>,
    div);

  ReactDOM.unmountComponentAtNode(div);
});