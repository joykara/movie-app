'use client'
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { TbUserSquare } from "react-icons/tb";
import Loader from './loader';

export default function ProfileImage({ profilePath, name }: { profilePath: string | null; name: string }) {
    const [loading, setLoading] = useState(true);
    const [timeoutReached, setTimeoutReached] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeoutReached(true);
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (!profilePath) {
        return <TbUserSquare size={80} className="text-eerie dark:text-dim_gray w-12 md:w-16 lg:w-20 h-12 md:h-16 lg:h-20" aria-label={`${name}'s profile`} />;
    }

    return (
        <div className="relative w-12 md:w-16 lg:w-20 h-12 md:h-16 lg:h-20">
            {loading && !timeoutReached && ( // Show loader only if not timed out
                <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-70 dark:bg-black dark:bg-opacity-70 rounded-md">
                    <Loader loading={loading} size={40} />
                </div>
            )}
            <Image
                src={`https://image.tmdb.org/t/p/w200${profilePath}`}
                alt={`${name}'s profile`}
                width={100}
                height={100}
                onLoad={() => {
                    setLoading(false);
                    setTimeoutReached(false); // Reset timeout reached on successful load
                }}
                onError={() => {
                    setLoading(false);
                    setTimeoutReached(false); // Reset timeout reached on error
                }}
                className={`${loading ? 'hidden' : 'block'} w-12 md:w-16 lg:w-20 h-12 md:h-16 lg:h-20 rounded-md`}
            />
        </div>
    );
}
