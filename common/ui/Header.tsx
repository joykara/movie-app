import { fetchGenres, fetchPlayingMovie } from '@/services/actions';
import { FcRating } from 'react-icons/fc';

export default async function Header () {
    const trendingMovies = await fetchPlayingMovie();
    const trending = Math.floor(Math.random() * trendingMovies.results.length);

    const movies = trendingMovies.results[trending]
    const genres = await fetchGenres()

    return (
        <div className="w-full h-[85vh]">
                <div key={movies.id} className="relative flex w-full h-full "
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movies.backdrop_path})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                }}>
                <div className='absolute inset-0 bg-white dark:bg-black opacity-30 bg-gradient-to-br from-white dark:from-black to-transparent' />
                    {/* Movie Details */}
                    <div className="absolute bottom-6 left-10 rounded-md bg-white dark:bg-black p-4 md:p-8 lg:p-12 z-2 flex flex-col space-y-4 w-2/3 sm:w-1/2 lg:w-2/5">
                        {/* Title */}
                        <h1 className="text-4xl lg:text-5xl font-noto font-bold text-black dark:text-white leading-tight">
                            {movies.title}
                        </h1>

                        {/* Meta Info */}
                        <div className="flex flex-auto items-center gap-x-2 text-black dark:text-white text-sm">
                            {/* Rating */}
                            <div className="flex items-center space-x-2">
                            <FcRating />
                                <span>{movies.vote_average.toFixed(1)}</span>
                            </div>
                            <span>•</span>
                            <span>{new Date(movies.release_date).getFullYear()}</span>
                            <span>•</span>
                            <div className='flex items-center gap-x-2 text-black dark:text-white'>
                                {movies.genre_ids.map((genreId: number) => (
                                <span key={genreId}>{genres.splice(0,3).find((genre: { id: number; name: string }) => genre.id === genreId)?.name}</span>
                                ))}
                            </div>
                        </div>

                        {/* Overview */}
                        <p className="text-black dark:text-white text-sm lg:text-base line-clamp-3">
                            {movies.overview}
                        </p>

                        {/* Action Buttons */}
                    </div>
                </div>
        </div>
    );
}
