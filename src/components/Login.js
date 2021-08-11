import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";

import "./css/Login.css";

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return this.props.username.length > 0 && this.props.password.length > 0;
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.history.push("/")
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
        </Form>
      </div>
    );
  }
  
}

export default withRouter(Login);