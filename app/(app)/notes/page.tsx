import NoteDialog from '@/app/components/NoteDialog';
import NoteInput from '../../components/ui/NoteInput';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export const revalidate = 3600; // revalidate at most every hour

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
    <main className='w-full p-4 rounded-lg mt-4'>
      <article className='mb-4 p-4  '>
        <h2 className='text-3xl font-semibold'>Welcome to OrangeLeaf Notes</h2>
        <p className='text-gray-500 dark:text-white text-sm md:text-base'>
          <span className='text-mainColor'>
            Start writing at the speed of inspiration.
          </span>{' '}
          OrangeLeaf is a simple note taking app that allows you to take notes
          and categorize them into different categories.
        </p>
      </article>

      {/* New note creation area */}
      <div className='mb-4 p-4 rounded-lg '>
        <NoteInput />
        <div className='mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {notes.map((note) => (
            <NoteDialog key={note.id} note={note} />
          ))}
        </div>
      </div>
    </main>
  );
}
