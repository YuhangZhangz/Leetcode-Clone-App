import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { authModalState } from '@/atoms/authModalAtom';
import { auth } from '@/firebase/firebase';
import Navbar from '@/components/Navbar/Navbar';
import AuthModal from '@/components/Modals/AuthModal';

const AuthPage: React.FC = () => {
  const authModal = useRecoilValue(authModalState);
  const [user, loading] = useAuthState(auth);
  const [pageLoading, setPageLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    } else if (!loading) {
      setPageLoading(false);
    }
  }, [user, loading, router]);

  if (pageLoading) return null;

  return (
    <div className='bg-gradient-to-b from-blue-400 to-black h-screen relative'>
      <div className='max-w-7xl mx-auto'>
        <Navbar />
        <div className='flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none'>
          <Image src="/hero.png" alt="Hero Image" width={800} height={600} />
        </div>
        {authModal.isOpen && <AuthModal />}
      </div>
    </div>
  );
};

export default AuthPage;
