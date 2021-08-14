import { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import ApiService from "../api/ApiService";

import HomePage from "./HomePage";
import Login from "./Login";

class Parent extends Component {

    constructor(props) {
     super(props);
     this.props = props;
     this.state = {
        user: {
            id: JSON.parse(localStorage.getItem('id')) || "",
            username: JSON.parse(localStorage.getItem('username')) || "",
            displayName: JSON.parse(localStorage.getItem('displayName')) || "",
            password: JSON.parse(localStorage.getItem('password')) || "",
            profilePic: JSON.parse(localStorage.getItem('profilePic')) || "",
            tweets: JSON.parse(localStorage.getItem('tweets')) || []
        }
     }
     this.handleInputChangeForUser = this.handleInputChangeForUser.bind(this);   
     this.setLoggedInUser = this.setLoggedInUser.bind(this);
    }

    setLoggedInUser(username) {
        ApiService.getUserWithUsername(username)
            .then((res) => {
                console.log(res.data[0]);
                var user = res.data[0];
                this.setState({
                    user: {
                        id: user.id,
                        username: user.username,
                        displayName: user.displayName,
                        password: user.password,
                        profilePic: user.profilePic,
                        tweets: user.tweets
                    }
                }, () => {
                    localStorage.setItem('id', JSON.stringify(user.id));
                    localStorage.setItem('username', JSON.stringify(user.username));
                    localStorage.setItem('displayName', JSON.stringify(user.displayName));
                    localStorage.setItem('password', JSON.stringify(user.password));
                    localStorage.setItem('profilePic', JSON.stringify(user.profilePic));
                    localStorage.setItem('tweets', JSON.stringify(user.tweets));
                })
            })    
    }

    handleInputChangeForUser(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                [name]: value
            }
        }), () => {
            localStorage.setItem([name], JSON.stringify(value))
        })
    }

    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <HomePage user={this.state.user} />
                        </Route>
                        <Route exact path="/login">
                            <Login user={this.state.user} handleInputChangeForUser={this.handleInputChangeForUser} setLoggedInUser={this.setLoggedInUser}/>
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Parent;