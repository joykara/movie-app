'use client';

import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Movie } from '@/data/interfaces/components';
import MovieCard from '@/common/shared/movieCards';

interface RecommendationFeedProps {
    recommendations: Movie[];
}

export default function RecommendationFeed({ recommendations }: RecommendationFeedProps) {
    const [displayedRecommendations, setDisplayedRecommendations] = useState<Movie[]>(recommendations.slice(0, 10));

    const loadMoreRecommendations = () => {
        const currentLength = displayedRecommendations.length;
        const nextRecommendations = recommendations.slice(currentLength, currentLength + 5);
        if (nextRecommendations.length > 0) {
            setDisplayedRecommendations((prev) => [...prev, ...nextRecommendations]);
        }
    };

    return (
        <div className="flex flex-col gap-4">
        <div className='flex items-center gap-2 mb-4'>
            <div className="h-5 w-[0.2rem] bg-violet"></div>
            <h2 className="text-base md:text-lg lg:text-xl font-inter font-semibold">You might also like</h2>
        </div>
            <InfiniteScroll
                dataLength={displayedRecommendations.length}
                next={loadMoreRecommendations}
                hasMore={displayedRecommendations.length < recommendations.length}
                loader={<h4>Loading...</h4>}
                className="flex space-x-4 no-scrollbar"
            >
                {displayedRecommendations.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        posterPath={movie.poster_path}
                        releaseDate={movie.release_date}
                        rating={movie.vote_average}
                        votes={movie.vote_count}
                        runtime={movie.runtime}
                    />
                ))}
            </InfiniteScroll>
        </div>
    );
};