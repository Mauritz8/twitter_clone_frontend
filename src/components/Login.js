import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";

import "./css/Login.css";
import ApiService from "../api/ApiService";

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      error: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return this.props.user.username.length > 0 && this.props.user.password.length > 0;
  }

  validateLogin() {
    ApiService.loginUser(this.props.user.username, this.props.user.password)
    .then((res) => {
      this.setState({error: res.data})
      if (res.data !== "") {
        return;
      } else {
        this.props.setLoggedInUser(this.props.user.username);
        this.props.history.push("/");
      }
    })
  }


  handleSubmit(event) {
    event.preventDefault();
    this.validateLogin();
  }

  render() {
    return (
      <div className="Login">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group size="lg">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              name="username"
              type="text"
              value={this.props.user.username}
              onChange={this.props.handleInputChangeForUser}
              autoComplete="off"
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              value={this.props.user.password}
              onChange={this.props.handleInputChangeForUser}
            />
          </Form.Group>
          <Button size="lg" type="submit" className="btn btn-primary" style={{marginTop: ".5rem", color: "white"}} disabled={!this.validateForm()}>
          Login
          </Button>

          {this.state.error !== "" &&
            <div className="alert alert-danger" id="login-error" role="alert">
              {this.state.error}
            </div>
          }
        </Form>
      </div>
    );
  }
  
}

export default withRouter(Login);