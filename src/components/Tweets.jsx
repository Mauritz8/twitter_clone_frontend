import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router";


import ApiService from "../api/ApiService";

class Tweets extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tweets: []
        }
        this.reloadTweetList = this.reloadTweetList.bind(this);
    }

    componentDidMount() {
        if (this.isAuthenticated()) {
            this.reloadTweetList();
        } else {
            this.props.history.push("/login");
        }
    }

    isAuthenticated() {
        if (this.props.username === "" && this.props.password === "") {
            console.log("Not authenticated");
            return false;
        }
        return true;
    }

    reloadTweetList() {
        ApiService.fetchTweets()
            .then((res) => {    
                console.log(res.data);
                this.setState({tweets: res.data})
            });
    }

    render() {
        return (
            <div>
            <p>{this.props.username}</p>     
                {
                    this.state.tweets.map(
                    tweet =>
                        <div key={tweet.id} className="border" style={{padding: "10px"}}>
                            <img src={tweet.user.profilePic} alt="" style={{verticalAlign: "top", borderRadius: "50%"}}></img>
                            <div style={{display: "inline-block", paddingLeft: "10px"}}>
                                <span>
                                <b>{tweet.user.displayName}</b> 
                                &nbsp;
                                @{tweet.user.username} 
                                &nbsp;
                                &#183;
                                &nbsp; 
                                {tweet.timeTweeted}
                                </span>
                                <p>{tweet.content}</p>
                                <span>
                                    <span>
                                        <FontAwesomeIcon icon={faComment} />
                                        <span className="tweetIconNum">{tweet.amountOfComments}</span>
                                    </span>
                                    <span style={{marginLeft: "1em", marginRight: "1em"}}>
                                        <FontAwesomeIcon icon={faRetweet} />
                                        <span className="tweetIconNum">{tweet.amountOfRetweets}</span>
                                    </span>
                                    <span>
                                        <FontAwesomeIcon icon={faHeart} />
                                        <span className="tweetIconNum">{tweet.amountOfLikes}</span>
                                    </span>
                                </span>                              
                            </div>
                        </div>
                    )            
                }
                  
            </div>
        );
    }
}

export default withRouter(Tweets);