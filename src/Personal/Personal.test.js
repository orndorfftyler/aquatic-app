import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Personal from './Personal';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <BrowserRouter>
        <Personal />
    </BrowserRouter>,
    div);

  ReactDOM.unmountComponentAtNode(div);
});