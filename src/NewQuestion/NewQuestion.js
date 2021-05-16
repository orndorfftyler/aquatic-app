import React from 'react';
import { Link } from 'react-router-dom';
import AquaticContext from '../AquaticContext';
import Navbar from '../Navbar/Navbar';
import { v4 as uuid } from 'uuid';
import TokenService from '../services/token-service';
import { withRouter } from 'react-router';


import './NewQuestion.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


class NewQuestion extends React.Component {
    static contextType = AquaticContext;

    constructor(props) {
        super(props);
        this.state = {
            content:'',
            title:''
        }
    }
    
    updateContent(content) {
        this.setState({content: content});
    }

    updateTitle(title) {
        this.setState({title: title});
    }

    postAndNav(e, title, content) {
        e.preventDefault()
        this.context.postQuestion(e, this.state.title, this.state.content)
        this.props.historyProp.push('/personal')
    }

    postQuestion = (e, title, desc) => {    
        e.preventDefault();
    
        let newId = uuid();
        let cUser = this.context.currentUsername ? this.context.currentUsername : localStorage.getItem('currentUsername');
    
        console.log(`cUser:  ${cUser} type: ${typeof cUser}`)
    
        let newOne = {
          question_id: newId,
          title: title,
          contents: desc,
          user_id: this.context.currentUser,
          username: cUser
    
        }
    
    console.log(JSON.stringify(newOne))
    
        fetch(`${API_BASE_URL}/questions/`, {
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
                this.props.history.push('/personal');
    
            })
            .catch(error => {
                console.error(error)
            })
      }
    

    render() {
        return (
            <div className="look">
                <Navbar />
                <header className="search">
                    <h1>What is your question?</h1>
                </header>

                <main role="main">
 
                <form className="edit" onSubmit={(e) => this.postQuestion(e, this.state.title, this.state.content)}>

                        <section className="prompt">
                                <label htmlFor="title">Title</label>
                                <input  className="edit" onChange={e => this.updateTitle(e.target.value)} name="title" type="text" id="title" required />

                                <label htmlFor="content">Content:</label>
                                <textarea  className="edit" type="text" name="content" placeholder="Write your answer here" required onChange={e => this.updateContent(e.target.value)}>
                                
                                </textarea>
                                <div>
                                    <button className="edit" type="submit">Submit</button>
                                </div>
                            </section>


                    </form>
                </main>
                <div className="search-space"></div>

            </div>
        );
    }
}

export default withRouter(NewQuestion);