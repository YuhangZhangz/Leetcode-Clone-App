import { authModalState } from '@/atoms/authModalAtom';
import AuthModal from '@/components/Modals/AuthModal';
import Navbar from '@/components/Navbar/Navbar';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
type indexProps = {};

const index:React.FC<indexProps> = () => {
    const authModal = useRecoilValue(authModalState)
    const [user, loading, error] = useAuthState(auth);
    const [pageloading, setPageLoading] = React.useState(true);
    const router = useRouter();

    useEffect(() => {
        if(user) router.push("/");
        if(!user && !loading) {
            setPageLoading(false);
        }
    }, [user, router, loading]);
    if (pageloading) return null;
    return (
    <>
    {/* auth page */}
    <div className='bg-gradient-to-b from-blue-400 to-black h-screen relative'>
        <div className='max-w-7xl mx-auto'>
            <Navbar />
            <div className='flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none '>
                <img src="/hero.png" alt="Hero Image" />
            </div>
            {authModal.isOpen && <AuthModal />}
        </div>
    </div>
    </>
    )
};
export default index;