import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Question from './Question';
import AquaticContext from '../AquaticContext';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const contextValue = {
    results: [{"id":3,"question_id":"772b2693-f32a-4972-a205-881b3c18b8cc","title":"Can I grow jellyfish in a fish tank?","contents":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum","user_id":3,"username":"Squirtle"}],
    searchResults: [],
    answers: [{"id":3,"answer_id":"86b63d85-5d30-4b96-9db7-743d5aeea2d5","question_id":"772b2693-f32a-4972-a205-881b3c18b8cc","title":"OK answer","contents":"answer Occaecati dignissimos quam qui","user_id":2,"username":"Pikachu"}]
    //currentUser: 3,
  };

  ReactDOM.render(
    <BrowserRouter>
      <AquaticContext.Provider value={contextValue}>
        <Question 
          match={{params: {
            question_id: "772b2693-f32a-4972-a205-881b3c18b8cc"
          }}}
        />
      </AquaticContext.Provider>
    </BrowserRouter>,
    div);

  ReactDOM.unmountComponentAtNode(div);
});