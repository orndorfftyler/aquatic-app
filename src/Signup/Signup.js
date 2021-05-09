import React from 'react';
import SignupLoginErr from '../ErrorComps/SignupLoginErr';
import AquaticContext from '../AquaticContext';
import { Link } from 'react-router-dom';
import AuthApiService from '../services/auth-api-service'
import './Signup.css';

class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            pw1: '',
            pw2: '',
            error: null,
            signupSuccess: false
        }
    }
    static contextType = AquaticContext;

    usernameUpdate(val) {
        this.setState({username:val});
    }

    pw1Update(val) {
        this.setState({pw1:val});
    }

    pw2Update(val) {
        this.setState({pw2:val});
    }

    validatePw() {
        if (this.state.pw1 != this.state.pw2) {
            return 'passwords do not match';
        } 
    }

    handleSignup = (e, user, pw) => {
        e.preventDefault()
    
        this.setState({ error: null })
        AuthApiService.postUser({
          user_name: user,
          password: pw
        })
          .then(user => {
            this.setState({signupSuccess:true})

        })
          .catch(res => {
            this.setState({ error: res.error })
        })
    }
    
    render() {

        let errorMessage = <p>{this.state.error}</p>;

        let alreadySU = (
                <h3>
                    Already Signed up? &nbsp;   
                    <Link to='/login'>
                        Log in 
                    </Link>
                </h3>
        );

        let nowLogin = <h3></h3>;

        if (this.state.signupSuccess) {
            nowLogin = (
                <div className="success">
                    <h3>
                        Signup Successful! Please &nbsp;
                        <Link to='/login'>
                            log in 
                        </Link>
                    </h3>
                </div>

            );
            alreadySU = '';
        }

        let pwSection = (
            <>
                <label htmlFor="pw1">Password</label>
                <input className="signup" type="password" name="pw1" id="pw1" required onChange={e => this.pw1Update(e.target.value)}/>
                <label htmlFor="pw2">Confirm Password</label>
                <input className="signup" type="password" name="pw2" id="pw2" required onChange={e => this.pw2Update(e.target.value)}/>
            </>
        );

        let buttonSection = (
            <>
                <button
                    className="signup" 
                    type="submit" 
                    disabled={this.validatePw()}>
                    Sign Up
                </button>
            </>
        );

        return (
                <div className="signup-page look">
                    <div className="top-bar"></div>
                    <main role="main">
                        <header>
                            <h1>Sign up for Aquatic Answers!</h1>
                        </header>
            
                        <form className="signup" onSubmit={(e) => this.handleSignup(e, this.state.username, this.state.pw1)}>
                            <section className="overview-section">
                                <label htmlFor="username">Username</label>
                                <input className="signup" type="text" name="username"  required onChange={e => this.usernameUpdate(e.target.value)}/>

                                {pwSection}
                            </section>
                            
                            <section className="login-signup-section">
                                <div className="valerror">
                                    <SignupLoginErr 
                                        message={this.validatePw()}
                                    />
                                </div>
                                {nowLogin}
                                <div className="linkdiv">
                                </div>
                                <div >
                                    {alreadySU}
                                </div>

                            </section>  

                            <section className="button-section">
                                {buttonSection}
                                {errorMessage}
                            </section>
                        </form>
                    </main>
                </div>
        );
    }
}

export default Signup;