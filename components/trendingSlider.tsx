'use client'
import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../utils/tmdb';
import Image from 'next/image';

const TrendingSlider = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [trendingMovies, setTrendingMovies] = useState<any[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const data = await fetchTrendingMovies();
            setTrendingMovies(data.results.slice(0, 3)); // Show top 3 trending movies
        };
        fetchMovies();
    }, []);

    return (
        <div className="w-full h-[80vh] bg-white dark:bg-black opacity-40 blur-sm">
            {trendingMovies.map((movie) => (
                <div key={movie.id} className="relative flex flex-col w-full h-full">
                    <Image
                        src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                        alt={movie.title}
                        className="absolute top-0 left-0 h-full w-full object-cover z-[-1]"
                    />
                    <div className="slider-details">
                        <h2>{movie.title}</h2>
                        <p>{movie.overview}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TrendingSlider;
