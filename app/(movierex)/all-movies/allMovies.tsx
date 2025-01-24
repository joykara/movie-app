'use client';

import React, { useState, useEffect } from 'react';
import { fetchAllMovies, fetchGenres, fetchMoviesByGenre } from '@/services/actions';
import MovieCard from '@/common/shared/movieCards';
import { Genre, Movie } from '@/data/interfaces/components';

export default function AllMoviesComponent() {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Fetch genres
    useEffect(() => {
        async function getGenres() {
            const genreData = await fetchGenres();
            setGenres(genreData);
        }
        getGenres();
    }, []);

    // Fetch movies when the genre or page changes
    useEffect(() => {
        async function getMovies() {
                    if (selectedGenre === null) {
                        // Fetch all movies if no genre is selected
                        const movieData = await fetchAllMovies();
                        setMovies(movieData.results);
                    } else {
                const data = await fetchMoviesByGenre(selectedGenre, currentPage);
                setMovies(data.results);
                setTotalPages(data.totalPages);
            }
        }
        getMovies();
    }, [selectedGenre, currentPage]);
    console.log(movies)

    // Handle genre selection
    const handleGenreSelect = (genreId: number) => {
        setSelectedGenre(genreId);
        setCurrentPage(1); // Reset to page 1 when genre changes
    };

    // Handle pagination
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="w-[90%] mx-auto">
            {/* Genre List */}
            <div className="flex flex-wrap gap-4 my-6">
                {genres.map((genre) => (
                    <button
                        key={genre.id}
                        onClick={() => handleGenreSelect(genre.id)}
                        className={`px-4 py-2 rounded-md text-sm ${selectedGenre === genre.id
                            ? 'bg-violet text-white'
                            : 'bg-white  border border-violet text-black'
                            }`}
                    >
                        {genre.name}
                    </button>
                ))}
            </div>

            {/* Movie Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-wrap lg:grid lg:grid-cols-4 gap-6 lg:gap-8">
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        posterPath={movie.poster_path}
                        releaseDate={movie.release_date}
                        rating={movie.vote_average}
                        votes={movie.vote_count}
                        runtime={movie.runtime}
                        genres={movie.genre_ids ? movie.genre_ids.map(
                            (id: number) =>
                                genres.find((genre: { id: number; name: string }) => genre.id === id)?.name ?? ''
                        ): []}
                        onFavoriteClick={() => console.log('Add to Favorites:', movie.id)}
                    />
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6 space-x-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-violet text-white'
                        }`}
                >
                    Previous
                </button>
                <span className="px-4 py-2 text-sm bg-gray-200 rounded-md">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-violet text-white'
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
