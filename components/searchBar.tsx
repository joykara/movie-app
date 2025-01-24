'use client'
import CommonButton from '@/common/shared/button';
import { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loading, setLoading] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        if (searchQuery.trim()) {
            onSearch(searchQuery.trim());
        }
    };

    return (
        <div className="flex gap-x-2 items-center">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies..."
                className="px-4 py-2 rounded-md bg-white dark:bg-eerie border border-black"
            />
            <CommonButton
                type="submit"
                title="Search"
                bg="bg-white hover:bg-violet"
                border="border border-violet"
                onClick={handleSearch}
                loading={loading}
            />
        </div>
    );
};
