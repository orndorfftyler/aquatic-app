import React from 'react';
import AquaticContext from '../AquaticContext';
import TokenService from '../services/token-service'
import AuthApiService from '../services/auth-api-service'
import { Link } from 'react-router-dom';
import Loading from './4V0b.gif';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            pw1: '',
            error: null,
            showLoading: 'hide'
        }
    }
    static contextType = AquaticContext;

    usernameUpdate(val) {
        this.setState({username:val});
    }

    pw1Update(val) {
        this.setState({pw1:val});
    }

    handleSubmitJwtAuth = (e, user, pw) => {
        e.preventDefault()
        this.setState({
            error: null,
            showLoading: 'show'
            })
    
        AuthApiService.postLogin({
          user_name: user,
          password: pw
        })
          .then(res => {
            this.setState({ username: '', pw1:'' })

            TokenService.saveAuthToken(res.authToken)
            this.context.updateCurrentUser(user);

            this.props.historyProp.push('/search');
        })
          .catch(res => {
            this.setState({ 
                error: res.error,
                showLoading: 'hide'
             })
        })
    }
    
    render() {

        let errorMessage = <p>{this.state.error}</p>;

        let pwSection = (
            <>
                <label htmlFor="pw1">Password</label>
                <input className="signup" type="password" name="pw1" id="pw1" onChange={e => this.pw1Update(e.target.value)}/>
            </>
        );
        let buttonSection = (
            <button className="signup" type="submit" >
                Submit
            </button>
        );

        return (
            <div className="signup-page look">
                <div className="top-bar"></div>
                <main role="main">
                    <header>
                        <h1>Login to Aquatic Answers!</h1>
                    </header>

                    <form className="signup" onSubmit={(e) => this.handleSubmitJwtAuth(e, this.state.username, this.state.pw1)}>
                        <section className="overview-section">
                            <label htmlFor="username">Username</label>
                            <input className="signup" type="text" name="username" required onChange={e => this.usernameUpdate(e.target.value)}/>

                            {pwSection}
                        </section>
                        <section className="login-signup-section">
                            <div className="loginError">
                                {errorMessage}
                            </div>
                            <div className="linkdiv">
                            </div>

                            <h3>
                                Need an account? &nbsp;  
                                <Link to='/signup'>
                                    Sign up
                                </Link>

                            </h3>

                            </section>

                            <section className="button-section">
                                {buttonSection}
                                
                            </section>
                            <div className={this.state.showLoading}>
                                <img src={Loading} className="loadwidget" />
                            </div>
                    </form>
                </main>
            </div>
        );
    }
}

export default Login;