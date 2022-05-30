import axios from 'axios';

var token;

// Deafult configuration of axios
function user_data() {
    try {
        const data = JSON.parse(localStorage.getItem('userInfo'));
        return data;
    } catch {
        console.log('You are not LogIn');
        return null;
    }
}

let user_detail = user_data();

const myApi = axios.create({
    baseURL: 'https://planspace.herokuapp.com/',
    headers: {
        Authorization: `JWT ${user_detail?.access}`,
        'content-type': 'application/json',
    },
});

myApi.interceptors.request.use(
    (config) => {
        try {
            const data = JSON.parse(localStorage.getItem('user-Info'));

            config.headers.Authorization = `JWT ${user_detail?.access}`;
            return config;
        } catch {
            console.log('You are not LogIn');
            return null;
        }
    },
    (error) => Promise.reject(error)
);

export default myApi;
