import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Question from './Question/question';
import Landing from './Landing/Landing';
import Search from './Search/Search';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import NewQuestion from './NewQuestion/NewQuestion';
import Personal from './Personal/Personal';
import AquaticContext from './AquaticContext';
import { v4 as uuid } from 'uuid';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results : [],
      reviews: [],
      users:[
        {
          user: 'admin',
          pw:'admin'
        }
      ],
      loggedIn: false

    }
  }

  setLogged = (input) => {
    this.setState({
      loggedIn:input
    })
  }


  render() {
    const contextValue = {
      results: this.state.results,
      reviews: this.state.reviews,
      users: this.state.users,
      currentUser: this.state.currentUser,
      loggedIn: this.state.loggedIn,
      setLogged: this.setLogged
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
        />

        <Route 
          path='/login'
          component={Login}
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
          path='/question/:questId'
          component={Question}
        />

      </main>

      </AquaticContext.Provider>
    </div>
  );
  }
}

export default App;