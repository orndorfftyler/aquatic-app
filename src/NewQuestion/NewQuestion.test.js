import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import NewQuestion from './NewQuestion';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <BrowserRouter>
        <NewQuestion />
    </BrowserRouter>,
    div);

  ReactDOM.unmountComponentAtNode(div);
});