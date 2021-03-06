import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from "react-router";


import ApiService from "../api/ApiService";
import CreateTweetPopup from "./CreateTweetPopup";
import "./css/HomePage.css";
import Tweet from "./Tweet";


class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tweets: [],
            showCreateTweetPopup: false,
            searchPattern: "",
            searchResults: []
        }
        this.reloadTweetList = this.reloadTweetList.bind(this);
        this.showCreateTweetPopup = this.showCreateTweetPopup.bind(this);
        this.hideCreateTweetPopup = this.hideCreateTweetPopup.bind(this);
        this.contentCreateTweetPopup = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.logout = this.logout.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
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

    logout() {
        localStorage.clear();
        this.props.clearState();
        this.props.history.push("/login");
    }

    updateSearch(event) {
        var searchPattern = event.target.value;
        ApiService.searchUsers(searchPattern)
            .then((res) => {
                if (searchPattern === "") {
                    this.setState({
                        searchPattern: searchPattern,
                        searchResults: []
                    })
                } else {
                    this.setState({
                        searchPattern: searchPattern,
                        searchResults: res.data,
                    });
                }
            })
    }

    render() {
        return (
            <div>
                <div style={{width: "100%", marginBottom: "1rem", height: "fit-content"}}>
                    <p style={{display: "inline-block"}}>{this.props.user.username}</p>
                    <div style={{display: "inline-block"}}>
                        <input type="text" placeholder="Search user" style={{marginLeft: "15rem"}} onChange={this.updateSearch} />

                        <div style={{marginLeft: "15rem", position: "absolute"}}>
                                {
                                    this.state.searchResults.map(
                                        user =>
                                        <div className="card">  
                                            <div className="card-body">
                                                <img src={user.profilePic} alt="" style={{verticalAlign: "top", borderRadius: "50%", display: "inline-block"}}></img>
                                                <div style={{display: "inline-block", marginLeft: ".5rem"}}>
                                                    <a className="link" id="displayName-link" href={"/" + user.username}>
                                                        <h5 className="card-title" style={{marginBottom: "0"}}>{user.displayName}</h5>
                                                    </a>
                                                    <p className="card-text">@{user.username}</p>
                                                </div>
                                            </div>
                                        </div>

                                    )   
                                }
                        </div>
    
                    </div>
                    <button onClick={this.logout} className="btn btn-primary" style={{color: "white", float: "right"}}>Log out</button>     
                </div>

                {
                    this.state.tweets.map(
                    tweet =>
                        <Tweet tweet={tweet} user={tweet.user} key={tweet.id}/>
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