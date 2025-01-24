import Header from '@/common/ui/Header'
import Navbar from '@/common/ui/Navbar'
import React from 'react'

export default function Dashboard() {
    return (
        <div className='flex flex-col bg-white dark:bg-black'>
            <Navbar />
            <Header />
        </div>
    )
}
