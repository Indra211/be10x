'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';

const Home = () => {
  const { status } = useSession();
  const router = useRouter();

  useLayoutEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    } else if (status === 'authenticated') {
      router.replace('/dashboard');
    }
  }, [status]);

  return <div></div>;
};

export default Home;
