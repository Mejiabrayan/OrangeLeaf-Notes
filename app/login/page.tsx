'use client';

import {
  User,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import HCaptcha from '@hcaptcha/react-hcaptcha';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [captchaToken, setCaptchaToken] = useState<string | undefined>();
  const router = useRouter();

  const supabase = createClientComponentClient();
  const captcha = React.createRef<HCaptcha>();

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }
    getUser();
  }, []);

  const handelSignUp = async () => {
    const res = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    setUser(res.data.user);
    router.refresh();
    setEmail('');
    setPassword('');
  };
  const handleSignIn = async () => {
    const res = await supabase.auth.signInWithPassword({
      email,
      password,
      options: { captchaToken },
    });
    setUser(res.data.user);
    router.refresh();
    setEmail('');
    setPassword('');
    router.push('/notes'); // Redirect to the home page
  };

  console.log({ loading, user });
  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    redirect('/notes');
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <div className='w-full max-w-xs'>
        <form className='shadow-sm shadow-white rounded-lg px-8 pt-6 pb-8 mb-4 '>
          {/* Heading */}
          <h1 className='text-white text-2xl font-bold mb-8 text-center'>
            Cloudy Notes Login
          </h1>
          <div className='mb-4'>
            <Input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-800'
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-6'>
            <Input
              className='shadow appearance-none border  rounded w-full py-2 px-3 text-gray-300 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-800'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='flex items-center justify-between'>
            <Button
              className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='button'
              onClick={handleSignIn}
            >
              Sign In
            </Button>
            <Button
              className='inline-block align-baseline font-bold text-sm text-orange-500 hover:text-orange-800'
              type='button'
              onClick={handelSignUp}
            >
              Sign Up
            </Button>
            <HCaptcha
              ref={captcha}
              sitekey='b05eb17c-3bc8-49b4-b83b-b01ffdcb27f8'
              onVerify={(token) => {
                setCaptchaToken(token);
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
