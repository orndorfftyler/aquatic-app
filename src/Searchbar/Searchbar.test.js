import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Searchbar from './Searchbar';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <BrowserRouter>
        <Searchbar />
    </BrowserRouter>,
    div);

  ReactDOM.unmountComponentAtNode(div);
});