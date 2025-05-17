import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
type indexProps = {};

const index:React.FC<indexProps> = () => {
    
    return <div className='bg-gradient-to-b from-blue-400 to-black h-screen relative'>
        <div className='max-w-7xl mx-auto'>
            <Navbar />
            <div className='flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none'>
                <img src="/hero.png" alt="Hero Image" />
            </div>
        </div>
    </div>;
};
export default index;