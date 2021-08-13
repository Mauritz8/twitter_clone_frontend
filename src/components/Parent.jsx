import { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

import Tweets from "./Tweets";
import Login from "./Login";

class Parent extends Component {

    constructor(props) {
     super(props);
     this.handleInputChange = this.handleInputChange.bind(this);
     this.state = {
         username: JSON.parse(localStorage.getItem('username')) || "",
         password: JSON.parse(localStorage.getItem('password')) || "",
     }   
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        }, () => {
            localStorage.setItem('username', JSON.stringify(this.state.username))
            localStorage.setItem('password', JSON.stringify(this.state.password))
        })
      }

    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Tweets username={this.state.username} password={this.state.password}/>
                        </Route>
                        <Route exact path="/login">
                            <Login username={this.state.username} password={this.state.password} handleInputChange={this.handleInputChange}/>
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Parent;