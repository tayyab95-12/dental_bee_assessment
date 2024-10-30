import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/',
    timeout: 5000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            config.headers['Authorization'] = 'Bearer ' + accessToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && originalRequest.url === 'token/refresh/') {
            window.location.href = '/login';
            return Promise.reject(error);
        }

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refresh_token');

            if (refreshToken) {
                try {
                    const response = await axios.post('http://localhost:8000/api/token/refresh/', { refresh: refreshToken });
                    localStorage.setItem('access_token', response.data.access);
                    axios.defaults.headers['Authorization'] = 'Bearer ' + response.data.access;
                    return axiosInstance(originalRequest);
                } catch (err) {
                    console.error("Token refresh failed", err);
                    window.location.href = '/login';
                }
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;