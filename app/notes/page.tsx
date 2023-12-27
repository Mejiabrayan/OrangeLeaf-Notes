// Home.js
import { useState } from 'react';
import Sidebar from '../components/ui/Sidebar';
import NoteInput from '../components/ui/NoteInput';
import NavBar from '../components/Navbar';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Footer from '../components/Footer';
import { redirect } from 'next/navigation';

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
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

  return (
    <>
      <NavBar userEmail={email ?? ''} />{' '}
      <section className='flex flex-col md:flex-row md:space-x-6 bg-black'>
        {/* Sidebar */}
        <Sidebar />
        {/* Main content area */}
        <main className='w-full md:w-3/4 text-[#292929] dark:text-white p-4 rounded-lg mt-4 md:mt-0'>
          <article className='mb-4 p-4  '>
            <h2 className='text-3xl font-semibold'>
              Welcome to OrangeLeaf Notes
            </h2>
            <p className='text-gray-500 dark:text-white text-sm md:text-base'>
              <span className='bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-xl text-transparent'>
                Start writing at the speed of inspiration.
              </span>{' '}
              OrangeLeaf is a simple note taking app that allows you to take
              notes and categorize them into different categories.
            </p>
          </article>

          {/* New note creation area */}
          <div className='mb-4 p-4 rounded-lg '>
            <NoteInput />
            <div className='mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {notes.map((note) => (
                <div
                  key={note.id}
                  className='font-medium text-slate-400 p-3 rounded-lg dark:bg-black border border-gray-600 hover:border-gray-500 transition ease-in-out duration-300 break-words overflow-hidden'
                >
                  <p className='truncate'>{note.content}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </section>
      <Footer />
    </>
  );
}
