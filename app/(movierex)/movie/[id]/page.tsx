import { fetchMovieById, fetchMovieCredits } from '@/services/actions';
import MovieDetailsComponent from './movieDetails';

export default async function MovieDetailsPage({params}: {params: Promise<{ id: string }>}) {
    const { id } = await params;
    const { movie_details, recommendations } = await fetchMovieById(id)
    const credits = await fetchMovieCredits(id);

    if (!movie_details) return <div>Loading...</div>;

    return (
        <MovieDetailsComponent movie_details={movie_details} recommendations={recommendations} credits={credits}
/>
    );
}
