import FeaturedMovies from '@/common/ui/featuredMovies'
import Header from '@/common/ui/Header'
import React from 'react'

export default function Dashboard() {
    return (
        <div className='flex flex-col bg-white dark:bg-black'>
            <Header />
            <div className='w-full h-auto px-4 py-4 md:px-12'>
                <FeaturedMovies />
            </div>
        </div>
    )
}
