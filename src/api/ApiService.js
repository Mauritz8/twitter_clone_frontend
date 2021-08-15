import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';

class ApiService {

    getTweets() {
        return axios.get(API_BASE_URL + "/tweets");
    }

    getUserWithUsername(username) {
        return axios.get(API_BASE_URL + "/users?username=" + username, {
            validateStatus: () => true
        });
    }

    loginUser(username, password) {
        const credentials = { username: username, password: password };
        return axios.post(API_BASE_URL + "/users/login", credentials, {
            validateStatus: () => true
        });
    }

    registerUser(username, displayName, password) {
        const credentials = { username: username, displayName: displayName, password: password };
        return axios.post(API_BASE_URL + "/users/add", credentials, {
            validateStatus: () => true
        })
    }

    postTweet(userId, tweetContent) {
        return axios.post(API_BASE_URL + "/users/" + userId + "/tweets/add?tweetContent=" + tweetContent, {
            validateStatus: () => true
        });
    }

    searchUsers(searchPattern) {
        return axios.get(API_BASE_URL + "/users/search?searchPattern=" + searchPattern);
    }
}

export default new ApiService();