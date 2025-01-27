import { MovieCardProps } from '@/data/interfaces/components';
import Link from 'next/link';
import React from 'react';
import { FcRating } from 'react-icons/fc';
import { supabase } from '@/lib/supabaseClient';
import { showToast } from '@/hooks/useToast';
import { useRouter } from 'next/navigation';

export default function MovieCard({
    id,
    title,
    posterPath,
    releaseDate,
    rating,
    votes,
    runtime,
    genres = []
}: MovieCardProps) {
    const router = useRouter();

    const handleFavoriteClick = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                showToast('info', 'Kindly login to add favorites');
                router.push('/login');
                return;
            }
            const payload = {
                user_id: user.id,
                movie_id: id,
                title,
                poster_path: posterPath,
                release_date: releaseDate,
                rating,
                runtime,
                genres: genres.join(', ')
            };
            const { error } = await supabase.from('favourites').insert(payload);

            if (error) {
                showToast('error', `Error adding favorite: ${error.message}`);
            } else {
                showToast('success', `${title} added to favorites!`);
            }
        } catch (err) {
            showToast('error', 'An unexpected error occurred');
        }
    };

    return (
        <div
            className="relative w-full min-w-[250px] h-72 bg-cover bg-center rounded-lg overflow-hidden shadow-md group movie-card"
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${posterPath})`,
            }}
        >
            {/* Overlay - Always visible on mobile, hover on desktop */}
            <div className="absolute inset-0 text-black dark:text-smoke bg-white/70 dark:bg-black/70 flex flex-col justify-end p-4 opacity-100 shadow-md transition-opacity duration-300 ease-in-out">
                <h2 className="text-lg md:text-xl font-bold truncate mb-2">{title}</h2>

                {genres.length > 0 && (
                    <div className="text-xs mb-2">
                        {genres.join(', ')} {genres.length > 5 && '...'}
                    </div>
                )}

                <div className="flex justify-left items-center font-roboto gap-x-2 text-xs md:text-sm text-black dark:text-smoke mb-4 mt-2">
                    <FcRating />
                    <span>{rating.toFixed(1)} ({votes} votes)</span>
                    <span>•</span>
                    <span>{new Date(releaseDate).getFullYear()}</span>
                    <span>•</span>
                    <span>{runtime}</span>
                </div>

                <div className="flex w-full gap-2">
                    <Link
                        href={`/movie/${id}`}
                        data-testid={`movie-link-${id}`}
                        className="px-4 py-2 bg-violet text-white text-xs rounded-md hover:bg-amber transition-colors"
                    >
                        View Details
                    </Link>
                    {/* <button
                        onClick={handleFavoriteClick}
                        className="px-4 py-2 bg-violet text-white text-xs rounded-md hover:bg-amber transition-colors cursor-pointer"
                    >
                        Add to Favorites
                    </button> */}
                </div>
            </div>
        </div>
    );
};

