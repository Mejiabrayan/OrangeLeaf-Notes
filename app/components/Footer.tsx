'use client';

import { useEffect, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { LogOut } from 'lucide-react';
import {
  User,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const Footer = () => {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(
    () => {
      const getUser = async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      };

      getUser();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      router.push('/login'); // Redirect to home page or login page
    } catch (error) {
      console.error('Error signing out:', error);
      // Handle logout error (e.g., show notification to the user)
    }
  };

  // Render the footer content
  return (
    <footer className='mt-auto fixed bottom-0 py-4 text-center text-white text-sm w-full flex justify-start gap-2 items-center'>
      {user ? (
        <Button variant={'ghost'} onClick={handleSignOut}>
          <LogOut className='w-5 h-5 text-slate-400' />
        </Button>
      ) : null}
      <ThemeToggle />
    </footer>
  );
};

export default Footer;
