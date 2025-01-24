
import Navbar from '@/common/ui/Navbar'

export default async function DashboardLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {

    return (
        <div className='flex flex-col bg-white dark:bg-black text-black dark:text-white'>
            <Navbar />
            {children}
        </div>
    )
}
