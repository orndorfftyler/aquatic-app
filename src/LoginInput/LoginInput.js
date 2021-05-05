import React from 'react';
import SignupLoginErr from '../ErrorComps/SignupLoginErr';
import AquaticContext from '../AquaticContext';
//import { withRouter } from 'react-router-dom';
//import { useHistory } from "react-router-dom";

//import './Signup.css';

class LoginInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            signOrLogin:'sign',
            username: '',
            pw1: '',
            pw2: ''
        }
    }
    static contextType = AquaticContext;
    

    signOrLogin(val) {
        this.setState({signOrLogin:val});
    }

    usernameUpdate(val) {
        this.setState({username:val});
    }

    pw1Update(val) {
        this.setState({pw1:val});
    }

    pw2Update(val) {
        this.setState({pw2:val});
    }

    validateUsername() {
        const users = this.context.users;
        if (users.some((obj) => obj.user == this.state.username)) {
            return 'Choose a unique Username';
        } 

    }

    validatePw() {
        if (this.state.pw1 != this.state.pw2) {
            return 'passwords do not match';
        } 
    }

    loginHandler(e, user, pw) {
        e.preventDefault();
        if (this.state.signOrLogin == 'sign') {
            this.context.signUp(e, user, pw);

            this.context.updateCurrentUser(user);
            this.props.historyProp.push('/search');
        } else {

        let check = this.context.users.some((obj) => obj.user == this.state.username && obj.pw == this.state.pw1);
        
        if (check) {
            //call context function to update current user
            this.context.updateCurrentUser(user);
            this.props.historyProp.push('/search');
        }
        
        }
    }

    render() {

        let pwSection = (
            <>
                <label htmlFor="pw1">Password</label>
                <input type="text" name="pw1" id="pw" required onChange={e => this.pw1Update(e.target.value)}/>
                <label htmlFor="pw2">Confirm Password</label>
                <input type="text" name="pw2" id="pw" required onChange={e => this.pw2Update(e.target.value)}/>
            </>
        );

        let buttonSection = (
            <>
                <button 
                    type="submit" 
                    disabled={this.validateUsername() || this.validatePw()}>
                    Submit
                </button>
                <SignupLoginErr 
                    message={this.validateUsername()}
                />
                <SignupLoginErr 
                    message={this.validatePw()}
                />
            </>
        );

        if (this.state.signOrLogin == 'log') {
            pwSection = (
                <>
                    <label htmlFor="pw1">Password</label>
                    <input type="text" name="pw1" id="pw" onChange={e => this.pw1Update(e.target.value)}/>
                </>
            );
            buttonSection = (
                <button type="submit" >
                    Submit
                </button>
            );
        }


        return (
                    <form onSubmit={(e) => this.loginHandler(e, this.state.username, this.state.pw1)}>
                        <section className="overview-section">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" placeholder="bookie411" required onChange={e => this.usernameUpdate(e.target.value)}/>

                            {pwSection}
                        </section>

                        <section className="login-signup-section">

                            <input type="radio" name="signlog" id="sign-up" value="sign" defaultChecked onChange={(e) => this.signOrLogin(e.target.value)} />
                            <label htmlFor="sign-up">
                            Sign Up
                            </label>

                            <input type="radio" name="signlog" id="log-in" value="log" onChange={(e) => this.signOrLogin(e.target.value)}/>
                            <label htmlFor="log-in">
                            Log In
                            </label>

                        </section>  

                        <section className="button-section">
                            {buttonSection}
                            {/*<p>{JSON.stringify(this.context.users)}</p>
                            <p>{`currentUser: ${this.context.currentUser}`}</p>*/}

                        </section>

                    </form>
        );
    }
}

export default LoginInput;

