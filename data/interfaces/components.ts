export interface Button {
    title: string
    bg: string
    border: string
    onClick?: () => void
    disabled?: boolean
    loading?: boolean
    isValid?: boolean
    type: "submit" | "reset" | "button"
}

// Define the Movie interface
export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    genre_ids?: number[];
    genres?: { name: string }[];
    vote_average: number;
    vote_count: number;
    runtime: number;
    backdrop_path: string;
}
export interface MovieCardProps {
    id: number;
    title: string;
    posterPath: string;
    releaseDate: string;
    rating: number;
    votes: number;
    runtime: number;
    genres?: string[];
}

export interface MovieDetailsProps {
    movie_details: {
        title: string;
        overview: string;
        poster_path: string;
        release_date: string;
        genres: { name: string }[];
        vote_average: number;
        vote_count: number;
        runtime: number;
        backdrop_path: string;
    };
    recommendations: Movie[];
    credits: {
        cast: CastMember[];
        crew: CrewMember[];
    };
}

export interface Credits {
    cast: CastMember[];
    crew: CrewMember[];
}

export interface CastMember {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
}

export interface CrewMember {
    id: number;
    name: string;
    job: string;
    profile_path: string | null;
}

// Genre interface
export interface Genre {
    id: number;
    name: string;
}