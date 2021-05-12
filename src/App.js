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


import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results : [
        {
        "question_id": "0c0f3741-32e3-4400-8649-fecbf60f9688",
        "title": "PATCH frogs in tank?",
        "contents": "PATCH will they thrive",
        "user_id": 3,
        "username": "Squirtle"
    }
  ],
      answers: [
        {
          "answer_id": "f2410602-056a-451e-8329-4e86b1ef77d4",
          "question_id": "513d8e7a-34b5-43e8-91cb-891a34e59d0a",
          "title": "PATCH new answer water temp",
          "contents": "PATCH try these temps",
          "user_id": "3",
          "username": "Squirtle"
      }
      ],
      currentUser: '',
      currentUsername: '',
      loggedIn: false,
      term: ''


    }
  }

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
    fetch(`${API_BASE_URL}/answersperquestion/${question_id}`, {
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
        
        this.populateAnswers(resJson)
        
        )
      .catch(error => console.log({ error }))
  }

  addAnswer = (e, question_id, title, desc) => {    
    e.preventDefault();

    let newId = uuid();
    let cUser = this.state.currentUsername ? this.state.currentUsername : localStorage.getItem('currentUsername');

    console.log(`cUser:  ${cUser} type: ${typeof cUser}`)

    let newOne = {
      answer_id: newId,
      question_id: question_id,
      title: title,
      contents: desc,
      user_id: this.state.currentUser,
      username: cUser

    }

console.log(newOne)

    fetch(`${API_BASE_URL}/answersperquestion/${question_id}`, {
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
      console.log(`username response: ${resJson.id}`);
      this.setState({currentUser: resJson.id, currentUsername: username})
      localStorage.setItem('currentUsername',username);
      localStorage.setItem('currentUser', resJson.id);
    })
    .catch(error => console.log({ error, updateCurrentUser:'yes' }))
    
  }
/*
  searchHandler = e => {
    e.preventDefault();
    console.log('searchHandler');
    let termsArr = this.state.term.split(' ');
    termsArr = termsArr.join(',');
    let params = {
        q: termsArr,
        printType: 'all',
        key: this.state.apiKey
      };

    let prettyParams = this.paramFormat(params);
    const url = `${this.state.searchURL_TM}?${prettyParams}`;
    console.log(url);

    fetch(url)
    .then(response => {
        if (response.ok) {
            
            return response.json();
        } else {
            throw new Error(response.statusText);
        }
    })
    .then(responseJson => this.updateResults(responseJson))
    .catch(error => {this.setState({results: ''})});
  }
  */
/*
  updateResults = (responseJson) => {
    //let out = responseJson.items.slice(0,10);
    let out2 = responseJson.map(question => (
      {question_id:question.question_id,
        title: question.title,
        contents: question.contents,
        user_id:question.user_id,
        username:question.username
      }
    ))
    this.setState({results: out2})
    console.log(this.state.results)
  }
*/

  updateTerm = (value) => {
    this.setState({term: value});
  }

  getQuestions = (e) => {
    e.preventDefault();
    this.clearResults();
    let termsArr = this.state.term.split(' ');
    console.log(termsArr)
    console.log('this.state.results.length ' + this.state.results.length)
    for (let i = 0; i < termsArr.length; i++) {
    
      if (this.state.results.length < 10 ) {
        fetch(`${API_BASE_URL}/questionsearch/${termsArr[i]}`, {
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
    }
    console.log(this.state.results)
  }

  buildResults = (arr) => {
    let out = this.state.results;
    for (let i = 0; i < arr.length; i++) {
      out.push(arr[i])
    }
    this.setState({results: out})
  }

  clearResults = () => {
    this.setState({results: []})
  }

  getPersonalQuestions = (user_id) => {
    //e.preventDefault();
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
          
    console.log(this.state.results)
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
          this.getPersonalQuestions(this.state.currentUser)
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
          this.getPersonalQuestions(this.state.currentUser);
            
        })
        .catch(error => {
          console.error(error)
        })
  }


  render() {
    const contextValue = {
      results: this.state.results,
      answers: this.state.answers,
      users: this.state.users, 
      currentUser: this.state.currentUser,
      currentUsername: this.state.currentUsername,
      term: this.state.term,

      loggedIn: this.state.loggedIn,
      setLogged: this.setLogged,
      updateTerm: this.updateTerm,
      //searchHandler: this.searchHandler,
      addAnswer: this.addAnswer,
      updateCurrentUser: this.updateCurrentUser,
      getAnswers: this.getAnswers,
      patchAnswer: this.patchAnswer,
      deleteAnswer: this.deleteAnswer,

      getQuestions: this.getQuestions,
      clearResults: this.clearResults,
      getPersonalQuestions: this.getPersonalQuestions,
      patchQuestion: this.patchQuestion,
      deleteQuestion: this.deleteQuestion

    };

  return (
    <div className='App'>
      <AquaticContext.Provider value={contextValue}>
      <header>
          {/*<Nav />*/}
          
      </header>

      <main>
        <Route 
          exact path='/'
          component={Landing}
        />

        <Route 
          path='/signup'
          component={Signup}
          historyProp={this.props.history}
        />

        <PublicOnlyRoute 
          path='/login'
          component={Login}
          historyProp={this.props.history}
        />

        <Route 
          path='/new'
          component={NewQuestion}
        />

        <Route 
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