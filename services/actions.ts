import { API_KEY, BASE_URL } from "@/utils/constants";

// Search for movies by query
export const searchMovies = async (query: string) => {
    try {
        const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
        return res.json();
    } catch (error) {
        console.error('Error searching for movies:', error);
        throw new Error('Failed to fetch results. Please try again.');
    }
};

// Fetch all movies
export const fetchAllMovies = async () => {
    try {
        const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);

        if (!res.ok) {
            throw new Error('Failed to fetch')
        }
        return res.json();
    } catch (error) {
        throw new Error(`Error fetching trending movies: ${error}`);
    }
};

// Fetch movie by id
export const fetchMovieById = async (id: string) => {
    try {
        const movieRes = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
        if (!movieRes.ok) {
            throw new Error('Failed to fetch movie details');
        }
        const movieDetails = await movieRes.json();

        // Fetch recommended movies
        const recommendationsRes = await fetch(`${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}`);
        if (!recommendationsRes.ok) {
            throw new Error('Failed to fetch recommendations');
        }
        const recommendations = await recommendationsRes.json();

        return { movie_details: movieDetails, recommendations: recommendations.results };
    } catch (error) {
        throw new Error(`Error fetching movie data: ${error}`);
    }
};

// Movie creds and crew
export const fetchMovieCredits = async (id: string) => {
    try {
        const res = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);

        if (!res.ok) {
            throw new Error('Failed to fetch credits');
        }

        return res.json();
    } catch (error) {
        throw new Error(`Error fetching credits: ${error}`);
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

// Fetch movies by genre
export async function fetchMoviesByGenre(genreId: number, page = 1) {
    const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`);
    if (!res.ok) throw new Error('Failed to fetch movies');
    const data = await res.json();
    return {
        results: data.results,
        totalPages: data.total_pages,
    };
}