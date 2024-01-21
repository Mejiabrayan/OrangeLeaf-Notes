'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { Camera, ImagePlus } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@/app/components/ui/button';
import useFileUpload from '@/app/hooks/useFileUpload';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/app/components/ui/dialog';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { toast } from '@/app/components/ui/use-toast';

export default function MemoriesPage() {
  const supabase = createClientComponentClient();
  const [images, setImages] = useState([]) as any;

  const { uploadFile, loading, error } = useFileUpload();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const data = await uploadFile(file, 'memories');

      if (data) {
        toast({
          title: 'Success: Uploaded',
          description: 'Your file has been uploaded.',
        });
      } else {
        toast({
          title: 'Error: Upload Failed',
          description: 'Your file failed to upload.',
        });
      }
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase.storage.from('memories').list();

      if (error) {
        console.error('Error fetching images:', error);
        return;
      }

      // Assuming 'list' returns an array of file objects
      const imageUrls = await Promise.all(
        data?.map(async (file) => {
          const { data } = await supabase.storage
            .from('memories')
            .getPublicUrl(file.name);

          return { ...file, public_url: data.publicUrl };
        }) || []
      );

      setImages(imageUrls);
      console.log(imageUrls);
    };

    fetchImages();
  }, []);
  return (
    <>
      <div className='flex justify-between items-center p-10'>
        <div>
          <h1 className='text-mainColor text-4xl font-bold'>Memories</h1>
          <p className='text-gray-400 mt-2'>
            A collection of moments, inspiration and memories captured over
            time.
          </p>
        </div>
      </div>
      <div className='p-10 grid grid-cols-1 sm:grid-colss-2 lg:grid-cols-3 gap-6'>
        {images.map((image: any, index: any) => (
          <div
            className='bg-gray-800 bg-opacity-20 rounded-lg p-6 col-span-1 row-span-1 relative'
            key={index}
          >
            <Image
              src={image.public_url}
              alt={image.name}
              width={500}
              height={500}
              className='object-cover'
            />
          </div>
        ))}
      </div>
      <div className='fixed bottom-10 right-10 z-10'>
        <Dialog>
          <DialogTrigger className='bg-gradient-to-tr from-mainColor to-blue-500 p-3 rounded-full shadow-lg hover:bg-mainColor-light transition ease-in-out duration-300'>
            <ImagePlus className='h-6 w-6 text-white' />
            <span className='sr-only'>Upload Memory</span>
          </DialogTrigger>
          <DialogContent className='bg-main p-6 rounded-lg shadow-lg'>
            <Label htmlFor='file'>
              <span className='text-mainColor'>Upload a file</span>
            </Label>
            {/* Add Loading State */}
            <Input type='file' onChange={handleFileChange} />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
