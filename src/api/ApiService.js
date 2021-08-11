import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';

class ApiService {

    fetchTweets() {
        return axios.get(API_BASE_URL + "/tweets");
    }

    checkIfUserExists() {
        return axios.get(API_BASE_URL);
    }
}

export default new ApiService();