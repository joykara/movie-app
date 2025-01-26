'use client';
import Loader from '@/common/shared/loader';
import { ReactNode } from 'react';

interface LoadingLayoutProps {
    children: ReactNode;
    loading: boolean;
}

export default function LoadingLayout({ children, loading }: LoadingLayoutProps) {
    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-black/80 z-50">
                <Loader loading={true} size={40} />
            </div>
        );
    }

    return <>{children}</>;
}