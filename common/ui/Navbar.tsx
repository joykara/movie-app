'use client';
import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import Link from 'next/link';
import { FaRegUserCircle } from 'react-icons/fa';
import { Moon, Sun } from 'lucide-react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="w-[95%] h-[200px] mx-auto flex justify-between items-center px-4 py-4 md:px-12">
            {/* Logo */}
            <Link
                href={'/dashboard'}
                className="font-playfair italic text-sm sm:text-base md:text-lg text-black dark:text-smoke"
            >
                Movierex
            </Link>

            <div className="flex items-center gap-4">
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
                        <Link
                            href={'/login'}
                            className="block rounded-lg py-2 px-3 transition hover:bg-accent"
                        >
                            Login
                        </Link>
                        <Link
                            href={'/'}
                            className="block rounded-lg py-2 px-3 transition hover:bg-accent"
                        >
                            Sign out
                        </Link>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}
