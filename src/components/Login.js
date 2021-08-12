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
    return this.props.username.length > 0 && this.props.password.length > 0;
  }

  validateLogin() {
    ApiService.loginUser(this.props.username, this.props.password)
    .then((res) => {
      console.log(res.data);
      this.setState({error: res.data})
      if (res.data !== "") {
        return;
      } else {
        this.props.history.push("/")
      }
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.validateLogin()
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
              value={this.props.username}
              onChange={this.props.handleInputChange}
              autoComplete="off"
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              value={this.props.password}
              onChange={this.props.handleInputChange}
            />
          </Form.Group>
          <Button size="lg" type="submit" style={{marginTop: ".5rem"}} disabled={!this.validateForm()}>
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