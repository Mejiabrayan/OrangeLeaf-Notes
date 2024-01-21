import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Logo from './components/Logo';
import { Button } from './components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import Balancer from 'react-wrap-balancer';

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/');
  }
  const email = user?.email;
  console.log(email);

  let notes = [];

  if (user) {
    const { data: notesData, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user.id)
      .order('id', { ascending: false });

    if (!error && notesData) {
      notes = notesData;
      console.log(notes);
    } else {
      console.error('Error fetching notes:', error);
    }
  }
  const ButtonRotatingBackgroundGradient = () => {
    return (
      <Button className='relative inline-flex h-16 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50'>
        <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ffa530_0%,#fb923c_50%,#ffedd5_100%)]' />
        <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-2 text-lg font-medium text-white backdrop-blur-3xl'>
          <Link href='/notes'>Sign In</Link>
        </span>
      </Button>
    );
  };

  const TextShine = () => {
    return (
      <div className='overflow-hidden'>
        <h1 className='inline-block bg-[linear-gradient(110deg,#e6e6e6,45%,#d58649,55%,#939393)] bg-[length:200%_100%] bg-clip-text text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-transparent py-3'>
          <Balancer> Effortlessly Organize Your Ideas</Balancer>
        </h1>
      </div>
    );
  };

  const InputPulseBorder = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className='relative'>
        <div className='absolute top-0 flex w-full justify-center '>
          <div className='h-[1px] animate-border-width rounded-full bg-gradient-to-r from-[rgba(17,17,17,0)] via-orange-100 to-[rgba(17,17,17,0)] transition-all duration-1000' />
        </div>
        {children}
      </div>
    );
  };

  return (
    <div>
      <header className='flex justify-between p-6 items-center'>
        <Logo />
      </header>
      <div className='flex flex-col min-h-screen text-white  dark:bg-[linear-gradient(160deg,#0a0b0e,45%,#d35400,55%,#1c1f24)] px-12 md:px-24 lg:px-40 '>
        <main className='flex-grow text-center flex flex-col justify-center items-center w-full '>
          <TextShine />
          <p className='text-gray-400 text-base md:text-lg lg:text-xl mt-4 mb-4'>
            OrangeLeaf is a simple note taking app that allows you to take notes
            and categorize them into different categories.
          </p>
          <ButtonRotatingBackgroundGradient />
          <div className='relative mt-8'>
            <InputPulseBorder>
              <Image
                className='rounded-xl px-4'
                src='/showcase.png' // Replace with your image path
                alt='Showcase'
                layout='responsive'
                width={300}
                height={100}
                priority={true}
              />
            </InputPulseBorder>
          </div>
        </main>

        <footer className='p-4 text-center text-sm w-full mt-4'>
          &copy; {new Date().getFullYear()} OrangeLeaf Notes. All rights
          reserved.
        </footer>
      </div>
    </div>
  );
}
