const API_KEY = '1ac43dd087074179a18bb768f1327739';
const API_URL = 'https://api.themoviedb.org/3';

export async function fetchMoveis() {

    try {
        const response1 = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
        const data1 = await response1.json();
        const moviesPage1 = data1.results;

        const response2 = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=2`);
        const data2 = await response2.json();
        const moviesPage2 = data2.results;

        const allMovies = [...moviesPage1, ...moviesPage2];

        return allMovies;


    } catch (error) {
        console.error('Error when searching for movies: ', error);
        return [];
    }
}