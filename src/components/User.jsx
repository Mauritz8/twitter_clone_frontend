import { Component } from "react";
import { withRouter } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';

import ApiService from "../api/ApiService";
import Tweet from "./Tweet"

class User extends Component {

    constructor(props) {
        super(props)

        this.state = ({
            user: ""
        })

        this.setUserWithUsername = this.setUserWithUsername.bind(this);
    }

    componentDidMount() {
        this.setUserWithUsername(this.props.match.params.username)
    }

    setUserWithUsername(username) {
        ApiService.getUserWithUsername(username)
            .then((res) => {
                if (res.status === 404) {
                    console.log(res.data)
                } else {
                    var user = res.data[0];
                    console.log(user);
                    this.setState({
                        user: user
                    })
                }
                
            })
    }


    render() {

        if (!this.state.user) {
            return (
                <p>loading...</p>
            );
        }

        return(
            <div>
                <img src={this.state.user.profilePic} alt="" style={{borderRadius: "50%", width: "90px"}}></img>
                <p style={{fontWeight: "bold", marginTop: "1rem", fontSize: "20px", marginBottom: "0"}}>{this.state.user.displayName}</p>
                <p>@{this.state.user.username}</p>

                {
                    this.state.user.tweets.slice(0).reverse().map(
                        tweet =>
                        <Tweet tweet={tweet} user={this.state.user}/>
                    )
                }
            </div>
        );
    }
}

export default withRouter(User);