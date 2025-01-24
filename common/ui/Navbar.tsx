'use client';
import React, { useCallback, useRef, useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import Link from 'next/link';
import { FaRegUserCircle } from 'react-icons/fa';
import { Moon, Sun } from 'lucide-react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import SearchBar from '@/components/searchBar';
import useOutsideClick from '@/hooks/useOutsideClick';
import { Movie } from '@/data/interfaces/components';

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const [searchResults, setSearchResults] = useState<Movie[]>([]);
    const [isResultsVisible, setIsResultsVisible] = useState(false);
    const resultsRef = useRef<HTMLDivElement>(null);

    const handleSearchResults = (results: Movie[]) => {
        setSearchResults(results);
        setIsResultsVisible(true); // Show results card
    };

    const closeResults = useCallback(() => {
        setIsResultsVisible(false); // Hide results card
    }, []);

    useOutsideClick(resultsRef, closeResults);

    return (
        <div className="relative w-[95%] h-auto mx-auto flex flex-col gap-2 sm:flex-row justify-between items-center px-4 py-4 md:px-12">
            {/* Logo */}
            <Link
                href={'/dashboard'}
                className="font-playfair italic text-base sm:text-lg md:text-xl text-black dark:text-smoke justify-self-start"
            >
                Movierex
            </Link>

            <div className="flex items-center justify-end gap-2 md:gap-4">
                <div className='hidden md:flex gap-x-4 mr-4'>
                    <Link
                        href={'/dashboard'}
                        className="font-noto text-sm md:text-base text-black dark:text-smoke hover:text-violet"
                    >
                        Home
                    </Link>
                    <Link
                        href={'/all-movies'}
                        className="font-roboto text-sm md:text-base text-black dark:text-smoke hover:text-violet"
                    >
                        All movies
                    </Link>
                </div>
                <SearchBar onSearch={handleSearchResults} />
                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="text-xl text-black p-2 rounded-full hover:bg-slate dark:text-smoke dark:hover:bg-slate"
                    aria-label="Toggle Theme"
                >
                    {theme === 'light' ? (
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-transform duration-1000 ease-in-out dark:-rotate-90 dark:scale-0" />
                    ) : (
                        <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-transform duration-1000 ease-in-out dark:rotate-0 dark:scale-100" />
                    )}
                </button>
                {/* Profile Icon */}
                <Popover>
                    <PopoverTrigger>
                        <FaRegUserCircle className="w-6 h-6 fill-violet dark:fill-amber" />
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className='md:hidden flex'>
                            <Link
                                href={'/dashboard'}
                                className="font-noto text-sm md:text-base text-black dark:text-smoke hover:text-violet"
                            >
                                Home
                            </Link>
                            <Link
                                href={'/all-movies'}
                                className="font-roboto text-sm md:text-base text-black dark:text-smoke hover:text-violet"
                            >
                                All movies
                            </Link>
                        </div>
                        <Link
                            href={'/login'}
                            className="block rounded-md py-2 px-3 transition dark:text-smoke hover:bg-amber"
                        >
                            Login
                        </Link>
                        <Link
                            href={'/'}
                            className="block rounded-md py-2 px-3 transition dark:text-smoke hover:bg-amber"
                        >
                            Sign out
                        </Link>
                    </PopoverContent>
                </Popover>
            </div>
            {/* Search Results */}
            {isResultsVisible && searchResults.length > 0 && (
                <div
                    className="absolute z-50 bg-white dark:bg-black opacity-50 shadow-lg rounded-md w-full h-full"
                >
                    <div
                        ref={resultsRef}
                        className="bg-white shadow-lg rounded-md mx-auto w-[80%] md:w-1/2 "
                    >
                        {searchResults.map((movie) => (
                            <Link
                                key={movie.id}
                                className="p-4 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                                href={`/movie/${movie.id}`}
                            >
                                <h3 className="text-sm font-bold">{movie.title}</h3>
                                <p className="text-xs text-gray-500">
                                    {new Date(movie.release_date).getFullYear()}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* No Results */}
            {isResultsVisible && searchResults.length === 0 && (
                <div
                    ref={resultsRef}
                    className="absolute z-50 bg-white shadow-lg rounded-md mt-2 w-full md:w-96 p-4 text-center"
                >
                    No movies found.
                </div>
            )}
        </div>
    );
}