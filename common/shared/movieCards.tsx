import { MovieCardProps } from '@/data/interfaces/components';
import Link from 'next/link';
import React from 'react';
import { FcRating } from 'react-icons/fc';

export default function MovieCard({
    id,
    title,
    posterPath,
    releaseDate,
    rating,
    votes,
    runtime,
    genres = [],
    onFavoriteClick,
}: MovieCardProps) {

    return (
        <div
            className="relative w-full min-w-[250px]  h-72 bg-cover bg-center rounded-lg overflow-hidden shadow-md group"
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${posterPath})`,
            }}
        >
            {/* Hover Overlay */}
            <div className="absolute inset-0 text-black dark:text-smoke bg-white dark:bg-black bg-opacity-70 dark:bg-opacity-70 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                {/* Title */}
                <h2 className="text-lg md:text-xl font-bold truncate mb-2">{title}</h2>

                {/* Genres */}
                {genres.length > 0 && (
                    <div className="text-xs mb-2">
                        {genres.join(', ')} {genres.length > 5 && '...'}
                    </div>
                )}

                {/* Meta Info */}
                <div className="flex justify-left items-center font-roboto gap-x-2 text-xs md:text-sm text-black dark:text-smoke mb-4 mt-2">
                    <FcRating />
                    <span>{rating.toFixed(1)} ({votes} votes)</span>
                    <span>•</span>
                    <span>{new Date(releaseDate).getFullYear()}</span>
                    <span>•</span>
                    <span>{runtime}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex w-full gap-2">
                    <Link
                        href={`/movie/${id}`}
                        className="px-4 py-2 bg-violet text-white text-xs rounded-md hover:bg-amber transition-colors"
                    >
                        View Details
                    </Link>
                    <button
                        onClick={onFavoriteClick}
                        className="px-3 py-1 bg-amber-400 text-black text-xs rounded-md hover:bg-amber-500 transition-colors"
                    >
                        Add to Favorites
                    </button>
                </div>
            </div>
        </div>
    );
};

