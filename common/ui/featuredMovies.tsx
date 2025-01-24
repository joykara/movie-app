'use client';

import React, { useState, useEffect } from 'react';
import { fetchAllMovies, fetchGenres, fetchMoviesByGenre } from '@/services/actions';
import { useRouter } from 'next/navigation';
import { Genre, Movie } from '@/data/interfaces/components';
import MovieCard from '../shared/movieCards';

export default function FeaturedMovies() {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
    const router = useRouter();

    useEffect(() => {
        async function getGenres() {
            const genreData = await fetchGenres();
            setGenres(genreData);
        }
        getGenres();
    }, []);

    useEffect(() => {
        async function getMovies() {
            if (selectedGenre === null) {
                // Fetch all movies if no genre is selected
                const movieData = await fetchAllMovies();
                setMovies(movieData.results);
            } else {
                const movieData = await fetchMoviesByGenre(selectedGenre);
                setMovies(movieData.results);
            }
        }
        getMovies();
    }, [selectedGenre]);
    console.log(movies)

    const handleGenreSelect = (genreId: number) => {
        setSelectedGenre(genreId);
    };

    return (
        <div className="w-full flex flex-col items-left justify-center">
            <div className='flex items-center gap-2 mb-4'>
                <div className="h-5 w-[0.2rem] bg-violet"></div>
                <h2 className="text-lg md:text-3xl font-playfair font-bold">Featured Movies</h2>
            </div>
            {/* Genre List */}
            <div className="w-full flex overflow-x-auto no-scrollbar md:flex-wrap gap-2 md:gap-4 mb-6">
                <button
                    onClick={() => router.push('/all-movies')}
                    className="px-2 py-1 md:px-4 md:py-2 rounded-md text-sm bg-slate min-w-20"
                >
                    View All
                </button>
                {genres.map((genre) => (
                    <button
                        key={genre.id}
                        onClick={() => handleGenreSelect(genre.id)}
                        className={`px-2 py-1 md:px-4 md:py-2 rounded-md text-sm ${selectedGenre === genre.id
                            ? 'bg-violet text-white'
                            : 'bg-white  border border-violet text-black'
                            }`}
                    >
                        {genre.name}
                    </button>
                ))}
            </div>

            {/* Movie List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
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
        </div>
    );
}
