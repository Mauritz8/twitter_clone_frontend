import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';

class ApiService {

    fetchTweets() {
        return axios.get(API_BASE_URL + "/tweets");
    }

    loginUser(username, password) {
        const credentials = { username: username, password: password };
        return axios.post(API_BASE_URL + "/users/login", credentials, {
            validateStatus: () => true
        });
    }
}

export default new ApiService();