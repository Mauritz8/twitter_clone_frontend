import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router";


import ApiService from "../api/ApiService";
import CreateTweetPopup from "./CreateTweetPopup";
import "./css/HomePage.css";


class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tweets: [],
            showCreateTweetPopup: false
        }
        this.reloadTweetList = this.reloadTweetList.bind(this);
        this.showCreateTweetPopup = this.showCreateTweetPopup.bind(this);
        this.hideCreateTweetPopup = this.hideCreateTweetPopup.bind(this);
        this.contentCreateTweetPopup = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        if (this.isAuthenticated()) {
            this.reloadTweetList();
            document.addEventListener('mousedown', this.handleClickOutside);
        } else {
            this.props.history.push("/login");
        }
        this.setState({showCreateTweetPopup: false});
    }

    componentWillUnmount() { 
        document.removeEventListener("click", this.handleClickOutside); 
    }

    isAuthenticated() {
        if (this.props.user.username === "" || this.props.user.password === "") {
            return false;
        }
        return true;
    }

    reloadTweetList() {
        ApiService.getTweets()
            .then((res) => {    
                this.setState({tweets: res.data})
            });
    }

    showCreateTweetPopup() {
        this.setState({showCreateTweetPopup: true});
    }

    hideCreateTweetPopup() {
        this.setState({showCreateTweetPopup: false});
    }

    handleClickOutside(event) {
        if(this.contentCreateTweetPopup.current && !this.contentCreateTweetPopup.current.contains(event.target)) {
            this.setState({showCreateTweetPopup: false});
        } 
        return;
    }



    render() {
        return (
            <div>   
                <p>{this.props.user.username}</p>     

                {
                    this.state.tweets.map(
                    tweet =>
                        <div key={tweet.id} className="border" style={{padding: "10px"}}>
                            <img src={tweet.user.profilePic} alt="" style={{verticalAlign: "top", borderRadius: "50%"}}></img>
                            <div style={{display: "inline-block", paddingLeft: "10px"}}>
                                <span><b>{tweet.user.displayName}</b> @{tweet.user.username} &#183; {tweet.timeTweeted}</span>
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
            
            <div>
                <button type="button" className="btn btn-primary" id="createTweetBtn" onClick={this.showCreateTweetPopup}>Tweet</button>
            </div>

            {this.state.showCreateTweetPopup &&
                <CreateTweetPopup contentCreateTweetPopup={this.contentCreateTweetPopup} hideCreateTweetPopup={this.hideCreateTweetPopup} user={this.props.user} reloadTweets={this.reloadTweetList}/>
            }
                 
            </div>
        );
    }
}

export default withRouter(HomePage);