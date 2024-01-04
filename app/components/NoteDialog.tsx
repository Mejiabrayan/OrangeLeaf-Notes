'use client';

import React from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogClose } from './ui/dialog';
import { Button } from './ui/button';

interface NoteDialogProps {
  note: { id: number; content: string; user_id: string };
}

const NoteDialog: React.FC<NoteDialogProps> = ({ note }) => {
  return (
    <div className='font-medium text-slate-400 p-3 rounded-lg dark:bg-[#100F13] border border-gray-600 hover:border-gray-500 transition ease-in-out duration-300 break-words overflow-hidden'>
      <p className='text-white overflow-hidden h-[100px] truncate'>
        {note.content}
      </p>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'link'} className='mt-2'>
            Open Dialog
          </Button>
        </DialogTrigger>
        <DialogContent className='rounded-lg dark:bg-[#100F13] p-6 text-white shadow-xl border border-gray-700 h-[400px] overflow-scroll'>
          <div className='mt-4'>
            <p className='text-white prose-p:prose-base'>{note.content}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NoteDialog;
