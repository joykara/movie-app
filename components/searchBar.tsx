'use client'
import CommonButton from '@/common/shared/button';
import { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch } : SearchBarProps) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        if (searchQuery.trim()) {
            onSearch(searchQuery.trim());
        }
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies..."
                className="search-input"
            />
            <CommonButton
                type="submit"
                title="Search"
                bg="bg-white hover:bg-violet"
                border="border border-violet"
                onClick={handleSearch}
                isLoading={isLoading}
            />
            <button onClick={handleSearch} className="search-button">
                Search
            </button>
        </div>
    );
};
