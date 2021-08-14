import React from "react";
import { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { withRouter } from "react-router";

import ApiService from "../api/ApiService";
import "./css/CreateTweetPopup.css";

class CreateTweetPopup extends Component {

    constructor(props) {
        super(props)

        this.state = {
            tweetContent: "",
            error: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    validateForm() {
        return this.state.tweetContent.length > 0;
    }

    postTweet() {
        ApiService.postTweet(this.props.user.id, this.state.tweetContent)
        .then((res) => {
            this.props.hideCreateTweetPopup();
            this.props.reloadTweets();
            window.scrollTo(0, 0);
        })
    }


    

    handleSubmit(event) {
        event.preventDefault();
        this.postTweet();
    }

    render() {
        return (
            <div id="popup">
                <div id="popup-content" ref={this.props.contentCreateTweetPopup}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group size="lg">
                        <Form.Label>What's happening?</Form.Label>
                        <Form.Control
                        autoFocus
                        name="tweetContent"
                        type="text"
                        value={this.state.tweetContent}
                        onChange={this.handleInputChange}
                        autoComplete="off"
                        />
                    </Form.Group>
                    <Button size="lg" type="submit" className="btn btn-primary" style={{marginTop: ".5rem", color: "white"}} disabled={!this.validateForm()}>
                    Tweet
                    </Button>
                </Form>
                </div>
            </div>
        );
    }
}

export default withRouter(CreateTweetPopup);