import React from 'react';
import { Movie } from '@/data/interfaces/components';
import Link from 'next/link';
import { FcRating } from 'react-icons/fc';

interface SearchResultsProps {
    results: Movie[];
    isVisible: boolean;
    closeResults: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, isVisible, closeResults }) => {
    return (
        <div className={`fixed top-16 inset-0 bg-eerie bg-opacity-70 transition-opacity ${isVisible ? 'block' : 'hidden'}`}> {/* Opaque background */}
            <div className="overflow-y-auto h-full p-4">
                <button onClick={closeResults} className="text-red pb-2">
                    Close
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {results.map((movie) => (
                            <Link
                            key={movie.id}
                            onClick={closeResults}
                                className="relative w-full min-w-[250px] h-72 bg-eerie bg-cover bg-center rounded-lg overflow-hidden shadow-md group"
                                style={{
                                    backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`
                                }}
                                href={`/movie/${movie.id}`}
                            >
                                <div className="absolute inset-0 text-black dark:text-smoke bg-white dark:bg-black bg-opacity-70 dark:bg-opacity-70 flex flex-col justify-end p-4 opacity-100 shadow-md md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                                    <h3 className="text-sm lg:text-base font-bold">{movie.title}</h3>
                                    <div className="flex justify-left items-center font-roboto gap-x-2 text-xs md:text-sm text-black dark:text-smoke mb-4 mt-2">
                                        <FcRating />
                                        <span>{movie.vote_average} ({movie.vote_count} votes)</span>
                                        <span>•</span>
                                        <span>{new Date(movie.release_date).getFullYear()}</span>
                                        <span>•</span>
                                        <span>{movie.runtime}</span>
                                    </div>
                                    <p className="text-black dark:text-white text-sm lg:text-base line-clamp-3">
                                        {movie.overview}
                                    </p>
                                </div>
                            </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchResults;