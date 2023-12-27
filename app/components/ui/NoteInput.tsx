'use client';
import React, { useEffect, useState } from 'react';
import { Textarea } from './textarea';
import { Button } from './button';
import { toast } from 'sonner';
import { User } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface Note {
  id: number;
  content: string;
  user_id: string;
  // include other note properties as needed
}

const NoteInput: React.FC = () => {
  const [noteContent, setNoteContent] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [notes, setNotes] = useState<Note[]>([]); // Initialize notes as an empty array
  const [loading, setLoading] = useState(true);

  const supabase = createClientComponentClient();

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);

      if (user) {
        fetchNotes(); // Fetch notes after getting the user
      }
    }
    getUser();
  }, []);

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user?.id); // fetch notes for the current user

    if (error) {
      console.error('Error fetching notes:', error);
      return;
    }

    setNotes(data); // update the state with the fetched notes
  };

  const handleNoteContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNoteContent(e.target.value);
  };

  const handleAddNote = async () => {
    if (!noteContent.trim()) return; // Avoid adding empty notes
    if (!user) {
      console.error('User not authenticated');
      return;
    }

    const { data, error } = await supabase.from('notes').insert([
      {
        content: noteContent,
        user_id: user.id, // Use the authenticated user's ID
      },
    ]);

    if (error) {
      console.error('Error adding note:', error);
      return;
    }

    setNoteContent(''); // Clear the textarea after adding
    fetchNotes(); // Fetch notes again to update the list
    console.log('Note added:', data);
    toast('Note Added 🎉', {
      description: 'Your note has been added successfully',
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo'),
      },
    });
    console.log(notes);
  };

  // Render a loading state until the user is fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Textarea
        className='dark:bg-[#121212] dark:shadow-none  font-medium dark:text-slate-400 p-3  border-1 block h-12 w-full rounded-md border border-double border-slate-800 border-transparent bg-[linear-gradient(#000,#000),linear-gradient(to_right,#334454,#334454)]	bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-slate-500 focus:bg-[linear-gradient(#000,#000),linear-gradient(to_right,#c7d2fe,#f9b278)] focus:outline-none'
        placeholder='Your best ideas here...'
        value={noteContent}
        onChange={handleNoteContentChange}
        autoFocus
      />
      <Button onClick={handleAddNote} variant={'primary'}>
        Add Note
      </Button>
    </div>
  );
};

export default NoteInput;
