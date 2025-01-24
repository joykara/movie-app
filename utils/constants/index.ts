export const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
export const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

export const formatRuntime = (runtime: number) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
};