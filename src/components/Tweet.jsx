import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';

import './css/Tweet.css';


class Tweet extends Component {
    render() {
        return(
            <div key={this.props.tweet.id} className="border" style={{padding: "10px"}}>
                <a href={"/" + this.props.user.username} className="link">
                    <img src={this.props.user.profilePic} alt="" style={{verticalAlign: "top", borderRadius: "50%"}}></img>
                </a>
                <div style={{display: "inline-block", paddingLeft: "10px"}}>
                    <span>
                        <a href={"/" + this.props.user.username} className="link" id="displayName-link">
                            <b>{this.props.user.displayName}</b>
                        </a>
                        &nbsp;<a href={"/" + this.props.user.username} className="link">@{this.props.user.username}</a> &#183; {this.props.tweet.timeTweeted}</span>
                        <p>{this.props.tweet.content}</p>
                    <span>
                        <span>
                            <FontAwesomeIcon icon={faComment} />
                            <span className="tweetIconNum">{this.props.tweet.amountOfComments}</span>
                        </span>
                        <span style={{marginLeft: "1em", marginRight: "1em"}}>
                            <FontAwesomeIcon icon={faRetweet} />
                            <span className="tweetIconNum">{this.props.tweet.amountOfRetweets}</span>
                        </span>
                        <span>
                            <FontAwesomeIcon icon={faHeart} />
                            <span className="tweetIconNum">{this.props.tweet.amountOfLikes}</span>
                        </span>
                    </span>                              
                </div>
            </div>
        );
    }
}

export default Tweet;