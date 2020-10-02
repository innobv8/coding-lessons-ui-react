import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;
axios.defaults.headers.common['Accept'] = "application/json";

export default {
    getLessons(alias) {
        return axios.get(`${baseUrl}lessons/`+ alias);
    },
};
