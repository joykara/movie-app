import axios from 'axios';

export const API_KEY = process.env.TMDB_API_KEY;
export const BASE_URL = process.env.TMDB_BASE_URL;

export const tmdbClient = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
    },
});