'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import Footer from '../components/footer';

const Login = () => {
  console.log(process.env.JWT_SECRET);

  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    if (!formData.email || !formData.password) {
      return setError('Please enter all details');
    }
    setLoading(true);
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });
      if (res?.error) {
        setError('Invalid email or password');
        return;
      }
      router.replace('/dashboard');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setFormData({
        email: '',
        password: '',
      });
    }
  };
  return (
    <div className='grid w-full h-full place-items-center bg-slate-100'>
      <form
        onSubmit={handleSubmit}
        className='p-4 shadow-lg bg-white rounded-lg flex flex-col w-1/2'
      >
        <h1 className='text-xl font-medium self-start text-slate-600 mb-4'>
          Enter your credentials
        </h1>

        <input
          type='email'
          placeholder='Email'
          name='email'
          value={formData.email}
          onChange={handleFormData}
        />
        <input
          type='password'
          placeholder='Password'
          name='password'
          value={formData.password}
          onChange={handleFormData}
        />

        {error && (
          <h3 className='bg-red-500 mb-4 p-2 rounded-lg  text-white font-medium w-[60%] text-center'>
            {error}
          </h3>
        )}

        <button
          style={{
            alignSelf: 'center',
          }}
          type='submit'
          className='px-4 py-2 bg-blue-400 text-xl text-white rounded-lg hover:bg-blue-500'
        >
          {loading ? 'Loading...' : 'Login'}
        </button>

        <Link
          href='/register'
          className='self-center'
        >
          Don't have an account? <span className='text-blue-500'>Register</span>
        </Link>
      </form>
      <div className='fixed bottom-0 w-full'>
        <Footer />
      </div>
    </div>
  );
};

export default Login;
