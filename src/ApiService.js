import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';

class ApiService {

    fetchTweets() {
        return axios.get(API_BASE_URL + "/tweets");
    }
}

export default new ApiService();