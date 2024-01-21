'use client';

import { useState } from 'react';
import { SupabaseClient, createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const useFileUpload = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const supabase: SupabaseClient = createClientComponentClient();

  const uploadFile = async (file: File, bucket: string) => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(file.name, file);

    setLoading(false);

    if (error) {
      setError(error);
      return null;
    }

    return data;
  };

  return { uploadFile, loading, error };
};

export default useFileUpload;