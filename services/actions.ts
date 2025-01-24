import { API_KEY, BASE_URL } from "@/utils/constants";

// Search for movies by query
export const searchMovies = async () => {
    try {
        const res = await fetch(`${BASE_URL}/search/movie`);
        return res.json();
    } catch (error) {
        console.error('Error searching for movies:', error);
        throw error;
    }
};

// Fetch trending movies
export const fetchPlayingMovie = async () => {
    try {
        const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`);

        if (!res.ok) {
            throw new Error('Failed to fetch')
        }
        return res.json();
    } catch (error) {
        throw new Error(`Error fetching trending movies: ${error}`);
    }
};

// Genre ids
export async function fetchGenres() {
    const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`);

    if (!res.ok) {
        throw new Error('Failed to fetch')
    }
    const data = await res.json();
    return data.genres;
}
