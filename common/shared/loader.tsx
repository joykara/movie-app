// components/Loader.tsx
'use client';

import React from 'react';
import PuffLoader from 'react-spinners/PuffLoader';

interface LoaderProps {
    loading?: boolean;
    size?: number;
    color?: string;
}

export default function Loader({ loading, size = 60, color = '#FF8325' }: LoaderProps) {
    return (
        <div
            className={`flex justify-center items-center h-screen ${loading ? 'block' : 'hidden'
                }`}
        >
            <PuffLoader color={color} loading={loading} size={size} />
        </div>
    );
}
