import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Search from '../Search/Search';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <BrowserRouter>
        <PrivateRoute 
          path='/search'
          component={Search}
        />
    </BrowserRouter>,
    div);

  ReactDOM.unmountComponentAtNode(div);
});