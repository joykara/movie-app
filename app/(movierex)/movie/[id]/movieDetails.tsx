'use client'
import React, { useState } from 'react';
import { MovieDetailsProps } from '@/data/interfaces/components';
import Image from 'next/image';
import { FcRating } from 'react-icons/fc';
import { formatRuntime } from '@/utils/constants';
import RecommendationFeed from '@/common/shared/recommendationFeed';
import CastDetailsModal from '@/common/shared/castDetails';
import CommonButton from '@/common/shared/button';
import ProfileImage from '@/common/shared/profileImage';

export default function MovieDetailsComponent({
    movie_details,
    recommendations,
    credits
}: MovieDetailsProps) {
    const runtime = formatRuntime(movie_details.runtime);
    const topCast = credits.cast.slice(0, 4);
    const topCrew = credits.crew.slice(0, 4);
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="relative w-full h-full mx-auto px-6 md:px-12 py-4 bg-white dark:bg-black">
            {/* Movie Details Section */}
            <div className="h-full xl:h-[95vh] w-full flex flex-col xl:flex-row items-center justify-between gap-x-2 ">
                <Image
                    alt="Movie Image"
                    src={`https://image.tmdb.org/t/p/w1280${movie_details.backdrop_path}`}
                    width={700}
                    height={700}
                    className="w-full xl:w-1/2 h-full xl:h-[95%] object-cover rounded-md mb-2"
                />
                <div className="w-full md:w-[90%] mx-auto flex flex-col gap-2 xl:ml-4 text-black dark:text-white">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-noto text-amber font-bold">{movie_details.title}</h1>

                        <div className="flex justify-left items-center font-roboto gap-x-2 text-xs md:text-sm mt-2">
                            <FcRating />
                            <span>{movie_details.vote_average.toFixed(1)} ({movie_details.vote_count} votes)</span>
                            <span>•</span>
                            <span>{new Date(movie_details.release_date).getFullYear()}</span>
                            <span>•</span>
                            <span>{runtime}</span>
                        </div>
                        <div className="flex justify-left items-center font-roboto gap-x-2 text-xs md:text-sm mb-2">
                            <div className="h-3 w-[0.1rem] bg-violet"></div>
                            <span className='text-violet'>{movie_details.genres.map((genre) => genre.name).join(',  ')}</span>
                        </div>
                        <p className="text-sm md:text-base">{movie_details.overview}</p>
                    </div>

                    {/* Cast Section */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-lg md:text-xl font-bold mt-2">Top Cast</h2>
                        <div className="flex items-center justify-evenly gap-6 overflow-x-scroll no-scrollbar">
                            {topCast.map((actor) => (
                                <div key={actor.id} className="flex flex-col items-center">
                                    <ProfileImage profilePath={actor.profile_path} name={actor.name} />
                                    <p className="text-sm font-semibold">{actor.name}</p>
                                    <p className="text-xs text-slate">{actor.character}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Crew Section */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-lg md:text-xl font-bold mt-2">Crew</h2>
                        <div className="flex items-center justify-evenly gap-6 overflow-x-scroll no-scrollbar">
                            {topCrew.map((crew) => (
                                <div key={crew.id} className="flex flex-col items-center">
                                    <ProfileImage profilePath={crew.profile_path} name={crew.name} />
                                    <p className="text-sm font-semibold">{crew.name}</p>
                                    <p className="text-xs text-slate">{crew.job}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='w-48 mt-4 mb-4 mx-auto'>
                        <CommonButton
                            type="button"
                            title="View Full Cast & Crew"
                            bg="bg-white hover:bg-violet"
                            border="border border-violet"
                            onClick={() => setShowModal(true)}
                        />
                    </div>
                </div>
            </div>

            {/* Recommendation Feed */}
            <RecommendationFeed recommendations={recommendations} />

            {/* Full Cast & Crew Modal */}
            {showModal && (
                <CastDetailsModal
                    credits={credits}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
};