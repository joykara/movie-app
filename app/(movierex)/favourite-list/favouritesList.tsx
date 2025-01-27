'use client'
import { Movie } from '@/data/interfaces/components';
import { fetchFavorites } from '@/services/actions';
import React, { useEffect, useState } from 'react';

export default function FavouritesList() {
    const [favorites, setFavorites] = useState<Movie[]>([]);

    useEffect(() => {
        async function getFavorites() {
            const data = await fetchFavorites();
            setFavorites(data);
        }

        getFavorites();
    }, []);

    if (!favorites.length) {
        return <p>No favorites added yet!</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favorites.map((movie) => (
                <div
                    key={movie.id}
                    className="bg-white shadow-md rounded-lg p-4"
                >
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="rounded-md"
                    />
                    <h2 className="text-lg font-bold mt-2">{movie.title}</h2>
                    <p className="text-sm text-gray-600">
                        {new Date(movie.release_date).toLocaleDateString()}
                    </p>
                </div>
            ))}
        </div>
    );
}
