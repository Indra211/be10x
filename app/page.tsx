'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Home = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') {
      return;
    }

    if (status === 'unauthenticated') {
      router.replace('/login');
    } else if (status === 'authenticated') {
      router.replace('/dashboard');
    }
  }, [status, router]);

  return (
    <div className='text-center w-full h-full items-center justify-center font-bold text-slate-400 text-2xl'>
      Loading...
    </div>
  );
};

export default Home;
