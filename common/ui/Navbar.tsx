'use client';
import React, { useEffect, useState, useRef, useCallback } from 'react';
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
import { Movie } from '@/data/interfaces/components';
import { supabase } from '@/lib/supabaseClient';
import SearchResults from '@/components/SearchResults';

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const [searchResults, setSearchResults] = useState<Movie[]>([]);
    const [isResultsVisible, setIsResultsVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (isResultsVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isResultsVisible]);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setIsLoggedIn(!!user);
        };

        checkUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsLoggedIn(!!session?.user);
        });

        return () => {
            subscription?.unsubscribe();
        };
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        setIsLoggedIn(false);
    };

    const resultsRef = useRef<HTMLDivElement>(null);

    const handleSearchResults = (results: Movie[]) => {
        setSearchResults(results);
        setIsResultsVisible(true);
    };

    const closeResults = useCallback(() => {
        setIsResultsVisible(false);
    }, []);

    return (
        <div
            onClick={closeResults}
            className="sticky top-0 z-10 bg-white dark:bg-black bg-opacity-70 w-[100%] h-auto mx-auto flex flex-col gap-2 sm:flex-row justify-between items-center px-4 py-4 md:px-12"
        >
            {/* Logo */}
            <Link
                href={'/dashboard'}
                className="font-noto italic text-base md:text-lg text-black dark:text-smoke font-semibold justify-self-start"
            >
                Movierex
            </Link>

            <div className="flex items-center justify-end gap-2 md:gap-4">
                <div className="hidden md:flex gap-x-4 mr-4">
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
                    <PopoverContent className="bg-white dark:bg-black">
                        <Link
                            href={'/dashboard'}
                            className="md:hidden block rounded-md py-2 px-3 transition dark:text-smoke hover:bg-amber"
                        >
                            Home
                        </Link>
                        <Link
                            href={'/all-movies'}
                            className="md:hidden block rounded-md py-2 px-3 transition dark:text-smoke hover:bg-amber"
                        >
                            All movies
                        </Link>
                        {isLoggedIn ? (
                            <div className='flex flex-col w-full items-center'>
                                <button
                                    onClick={handleSignOut}
                                    className="block rounded-md py-2 px-3 w-full transition dark:text-smoke hover:bg-amber"
                                >
                                    Sign out
                                </button>
                                <Link
                                href={'/favourite-list'}
                                    className="block rounded-md py-2 px-3 w-full text-center transition dark:text-smoke hover:bg-amber"
                                >
                                    Favorites
                                </Link>
                            </div>
                        ) : (
                            <Link
                                href={'/login'}
                                className="block rounded-md py-2 px-3 transition dark:text-smoke hover:bg-amber"
                            >
                                Login
                            </Link>
                        )}
                    </PopoverContent>
                </Popover>
            </div>
            {/* Search Results */}
            {isResultsVisible && searchResults.length > 0 && (
                <SearchResults results={searchResults} isVisible={isResultsVisible} closeResults={closeResults} />
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