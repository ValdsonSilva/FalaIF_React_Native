// URL base da API
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"

const api = axios.create({
    baseURL: "https://web-5gnex1an3lly.up-us-nyc1-k8s-1.apps.run-on-seenode.com/", // URL base da api
    headers: {
        'Content-Type': 'application/json',
    }
});

// Adiciona um interceptor para incluir o token em cada requisição
api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        // console.log("No Api.js: ", token);
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default api;