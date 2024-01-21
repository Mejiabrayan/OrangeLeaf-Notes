'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Textarea } from './textarea';
import { Button } from './button';
import { toast } from 'sonner';
import { User } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Suspense } from 'react';
import { LoadingTextArea } from '../LoadingSkeletons';

interface Note {
  id: number;
  content: string;
  user_id: string;
}

const NoteInput: React.FC = () => {
  const [noteContent, setNoteContent] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);

  const supabase = createClientComponentClient();

  useEffect(() => {
    getUserAndNotes();
  }, []);

  const handleTextareaFocus = () => {
    setIsTextareaFocused(true);
  };

  const handleTextareaBlur = () => {
    setIsTextareaFocused(false);
  };

  // Set up and tear down the global keydown event listener
  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      // Use `event.code` to check for 'KeyK' to distinguish between different keyboard layouts
      if ((event.metaKey || event.ctrlKey) && event.code === 'KeyK') {
        event.preventDefault();
        textareaRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);

    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, []);

  const getUserAndNotes = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
    setLoading(false);

    if (user) {
      fetchNotes(user.id); // Fetch notes after getting the user
    }
  };

  const fetchNotes = async (userId: string) => {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', userId)
      .order('id', { ascending: false });

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
    if (!noteContent.trim()) return; // Don't insert empty notes into the database
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
      toast('Error adding note', {
        description: 'There was an error adding your note',
      });
      return;
    }

    setNoteContent(''); // Clear the textarea after adding
    if (data) {
      setNotes((currentNotes) => [...currentNotes, ...data]); // Add new note to state
    }
    toast('Note Added', {
      description: 'Your note has been added successfully',
    });
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Check if the Enter key is pressed without Shift
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent the default action (new line)
      handleAddNote(); // Call the function to add the note
    }
  };

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'K') {
        event.preventDefault();
        textareaRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);

    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, []);

  return (
    <div>
      <Suspense fallback={<LoadingTextArea />}>
        <Textarea
          className='min-h-[300px] w-full p-4 text-white placeholder-gray-500 outline-none resize-none'
          placeholder='Your best ideas here... (Press Enter to add note)'
          value={noteContent}
          onChange={handleNoteContentChange}
          onKeyDown={handleKeyDown}
          onFocus={handleTextareaFocus}
          onBlur={handleTextareaBlur}
          ref={textareaRef}
          autoFocus
        />
      </Suspense>

      <Button onClick={handleAddNote} variant={'primary'}>
        Add Note
      </Button>
    </div>
  );
};

export default NoteInput;
