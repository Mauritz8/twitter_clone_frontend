import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";


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
        this.reloadTweetList();
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
            <h1>{this.props.username}</h1>     
            <h1>{this.props.password}</h1>     
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

export default Tweets;