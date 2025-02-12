import axios from 'axios';

const API_KEY = '1ac43dd087074179a18bb768f1327739';
const API_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async () => {
    try {
        const response1 = await axios.get(`${API_URL}/movie/popular`, {
            params: {
                api_key: API_KEY,
                language: 'en-US',
                page: 1
            }
        });

        const response2 = await axios.get(`${API_URL}/movie/popular`, {
            params: {
                api_key: API_KEY,
                language: 'en-US',
                page: 2
            }
        });

        return [...response1.data.results, ...response2.data.results];
    } catch (error) {
        console.error('Error when searching for movies: ', error);
        return [];
    }
};

export const searchMoviesByInput = async (input) => {
    try {
        const response1 = await axios.get(`${API_URL}/search/movie`, {
            params: {
                api_key: API_KEY,
                query: input,
                language: 'en-US',
                include_adult: false,
                page: 1
            }
        });
        const response2 = await axios.get(`${API_URL}/search/movie`, {
            params: {
                api_key: API_KEY,
                query: input,
                language: 'en-US',
                include_adult: false,
                page: 2
            }
        });

        return [...response1.data.results, ...response2.data.results];
    } catch (error) {
        console.error('Error when searching for movies:', error);
        return [];
    }
};