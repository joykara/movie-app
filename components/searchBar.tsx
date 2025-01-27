'use client'
import CommonButton from '@/common/shared/button';
import { Movie } from '@/data/interfaces/components';
import { showToast } from '@/hooks/useToast';
import { searchMovies } from '@/services/actions';
import { useState } from 'react';

interface SearchBarProps {
    onSearch: (results: Movie[]) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [loading, setLoading] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            onSearch([]);
            return;
        }
        setLoading(true);
        try {
            const results = await searchMovies(searchQuery);
            onSearch(results.results);
        } catch (err) {
            showToast('error', `${err}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex gap-x-2 items-center">
            <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies..."
                className="px-4 py-2 rounded-md bg-white dark:bg-eerie border border-black text-sm text-slate dark:text-smoke"
            />
            <CommonButton
                type="button"
                title="Search"
                bg="bg-white hover:bg-violet"
                border="border border-violet"
                loading={loading}
                onClick={handleSearch}
            />
        </div>
    );
};
