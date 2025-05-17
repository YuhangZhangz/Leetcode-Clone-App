import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import AuthModal from '@/components/Modals/AuthModal';
type indexProps = {};

const index:React.FC<indexProps> = () => {
    
    return (
    <>
    {/* auth page */}
    <div className='bg-gradient-to-b from-blue-400 to-black h-screen relative'>
        
        <div className='max-w-7xl mx-auto'>
            <Navbar />
            <div className='flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none '>
                <img src="/hero.png" alt="Hero Image" />
            </div>
            <AuthModal />
        </div>
    </div>;
    </>
    )
};
export default index;