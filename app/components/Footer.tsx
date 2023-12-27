'use client';

import { useEffect, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { LogOut } from 'lucide-react';

import {
  User,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { redirect, useRouter } from 'next/navigation';
import { Button } from './ui/button';

const Footer = () => {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
    setUser(null);
  };

  console.log({ loading, user });
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <footer className='mt-auto fixed bottom-0 py-4 text-center text-white text-sm w-full flex justify-start gap-2 items-center px-4'>
      <ThemeToggle />
      {user && (
        <Button variant={'ghost'} onClick={handleSignOut}>
          <LogOut className='w-5 h-5 text-slate-400' />
        </Button>
      )}
    </footer>
  );
};

export default Footer;
