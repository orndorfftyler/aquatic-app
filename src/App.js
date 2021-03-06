import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Question from './Question/Question';
import Landing from './Landing/Landing';
import Search from './Search/Search';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import NewQuestion from './NewQuestion/NewQuestion';
import Personal from './Personal/Personal';
import AquaticContext from './AquaticContext';
import { v4 as uuid } from 'uuid';
import TokenService from './services/token-service';
import PublicOnlyRoute from './Utils/PublicOnlyRoute';
import PrivateRoute from './Utils/PrivateRoute';

import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results : [],
      searchResults: [],
      answers: [],
      currentUser: '',
      currentUsername: '',
      loggedIn: false,
      term: '',
      currentQuestion: ''
    }
  }
  
// ----------------------------------------- answer related fetches (and helpers)

  setLogged = (input) => {
    this.setState({
      loggedIn:input
    })
  }

  paramFormat(params) {
    const queryItems = Object.keys(params)
      .map(key => `${key}=${params[key]}`)
    return queryItems.join('&');
  }

  populateAnswers = (answers) => {
    this.setState({
      answers: answers 
    })
  }

  getAnswers = (question_id) => {
    fetch(`${API_BASE_URL}/answersperquestion/${question_id}`)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        throw new Error(res.status)
      })
      .then(resJson =>
        
        this.populateAnswers(resJson)
        
        )
      .catch(error => console.log({ error }))
  }

  addAnswer = (e, question_id, title, desc) => {    
    e.preventDefault();

    let newId = uuid();
    let cUser = this.state.currentUsername ? this.state.currentUsername : localStorage.getItem('currentUsername');

    let newOne = {
      answer_id: newId,
      question_id: question_id,
      title: title,
      contents: desc,
      user_id: this.state.currentUser,
      username: cUser

    }

    fetch(`${API_BASE_URL}/answers/${newOne.answer_id}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': `bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify(newOne)
    })
        .then(res => {
            if (res.ok) {
            return res.json()
            }
            throw new Error(res.status)
        })
        .then(data => {
          this.getAnswers(question_id);

        })
        .catch(error => {
            console.error(error)
        })
  }

  patchAnswer = (e, answer) => {    
    e.preventDefault();

    fetch(`${API_BASE_URL}/answers/${answer.answer_id}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          'authorization': `bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify(answer)
    })
        .then(data => {
          this.getAnswers(answer.question_id)
        }
        )
        .catch(error => {
            console.error(error)
        })
  }

  deleteAnswer = (e, answer_id, question_id) => {
    e.preventDefault();
    fetch(`${API_BASE_URL}/answers/${answer_id}`, {
        method: 'DELETE',
        headers: {
          'authorization': `bearer ${TokenService.getAuthToken()}`,
        }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(res.status)
            }
        })
        .then(data => {
          this.getAnswers(question_id);
            
        })
        .catch(error => {
          console.error(error)
        })
  }
  updateCurrentUser = (username) => {
    fetch(`${API_BASE_URL}/users/${username}`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
    .then(res => {
      
      if (res.ok) {
        return res.json()
      }
      throw new Error(res.status)
      
    })
    .then(resJson => {
      this.setState({currentUser: resJson.id, currentUsername: username})
      localStorage.setItem('currentUsername',username);
      localStorage.setItem('currentUser', resJson.id);
    })
    .catch(error => console.log({ error, updateCurrentUser:'yes' }))
    
  }

// ----------------------------------------- question related fetches (and helpers)

  updateTerm = (value) => {
    this.setState({term: value});
  }

  getQuestions = (e) => {
    e.preventDefault();
    this.clearResults();
    let terms = this.state.term.toLowerCase();
    let termsArr = terms.split(' ');
    for (let i = 0; i < termsArr.length; i++) {
    
      if (this.state.results.length < 10 ) {
        fetch(`${API_BASE_URL}/questionsearch/${termsArr[i]}`)
          .then(res => {
            if (res.ok) {
              return res.json()
            }
            throw new Error(res.status)
          })
          .then(resJson =>
            { 
              this.buildResults(resJson)
              this.updateSearchResults(this.state.results)
            }
            )
          .catch(error => console.log({ error }))
      }
    }
  }

  buildResults = (arr) => {
    let out = this.state.results;
    for (let i = 0; i < arr.length; i++) {
      out.push(arr[i])
    }

    // removes duplicates from results
    let out2 = [];
    for (let i = 0; i < out.length; i++) {
      let rFlag = true;

      for (let j = 0; j < out2.length; j++) {
        if (out[i]['question_id'] == out2[j]['question_id']) 
        rFlag = false;
      }
      if (rFlag) {
        out2.push(out[i])
      }
    }

    this.setState({results: out2})
  }

  clearResults = () => {
    this.setState({results: []})
  }

  getPersonalQuestions = (user_id) => {
    this.clearResults();
    
    fetch(`${API_BASE_URL}/questionsperuser/${user_id}`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        throw new Error(res.status)
      })
      .then(resJson =>
        
        this.buildResults(resJson)
        
        )
      .catch(error => console.log({ error }))
          
  }

  patchQuestion = (e, question) => {    
    e.preventDefault();

    fetch(`${API_BASE_URL}/questions/${question.question_id}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          'authorization': `bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify(question)
    })
        .then(data => {
          this.getOneQuestion(question.question_id)
        }
        )
        .catch(error => {
            console.error(error)
        })
  }

  deleteQuestion = (e, question_id) => {
    e.preventDefault();
    fetch(`${API_BASE_URL}/questions/${question_id}`, {
        method: 'DELETE',
        headers: {
          'authorization': `bearer ${TokenService.getAuthToken()}`,
        }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(res.status)
            }
        })
        .then(data => {
        })
        .catch(error => {
          console.error(error)
        })
  }

  getOneQuestion = (question_id) => {
    fetch(`${API_BASE_URL}/questions/${question_id}`)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        throw new Error(res.status)
      })
      .then(resJson =>
        {let temp = [resJson];
        this.setState({results: temp})
        }
      )
      .catch(error => console.log({ error }))
  }

  clearUserAndUsername = () => {
    this.setState({
      results: [],
      searchResults: [],
      currentUser:'', 
      currentUsername: ''});
    localStorage.setItem('currentUsername','');
    localStorage.setItem('currentUser', '');
  }

  updateSearchResults = (sResults) => {
    // Search results are recorded separately so that when a user navigates back to the search
    // screen after clicking a result, the results from the last search are still displayed.
    this.setState({searchResults: sResults})
  }

  setResults = (results) => {
    this.setState({
      results: results
    })
  }

  render() {
    const contextValue = {
      results: this.state.results,
      answers: this.state.answers,
      currentUser: this.state.currentUser,
      currentUsername: this.state.currentUsername,
      term: this.state.term,

      loggedIn: this.state.loggedIn,
      searchResults: this.state.searchResults,

      setLogged: this.setLogged,
      updateTerm: this.updateTerm,
      addAnswer: this.addAnswer,
      updateCurrentUser: this.updateCurrentUser,
      getAnswers: this.getAnswers,
      patchAnswer: this.patchAnswer,
      deleteAnswer: this.deleteAnswer,

      getQuestions: this.getQuestions,
      clearResults: this.clearResults,
      getPersonalQuestions: this.getPersonalQuestions,
      patchQuestion: this.patchQuestion,
      deleteQuestion: this.deleteQuestion,
      getOneQuestion: this.getOneQuestion,

      clearUserAndUsername: this.clearUserAndUsername,
      updateSearchResults: this.updateSearchResults,
      setResults: this.setResults

    };

  return (
    <div className='App'>
      <AquaticContext.Provider value={contextValue}>

        <main>
          <Route 
            exact path='/'
            component={Landing}
          />

          <PublicOnlyRoute 
            path='/signup'
            component={Signup}
            historyProp={this.props.history}
          />

          <PublicOnlyRoute 
            path='/login'
            component={Login}
            historyProp={this.props.history}
          />

          <PrivateRoute 
            path='/new'
            component={NewQuestion}
            historyProp={this.props.history}
          />

          <PrivateRoute 
            path='/personal'
            component={Personal}
          />

          <Route 
            path='/search'
            component={Search}
          />

          <Route 
            path='/question/:question_id'
            component={Question}
          />

        </main>

      </AquaticContext.Provider>
    </div>
  );
  }
}

export default App;