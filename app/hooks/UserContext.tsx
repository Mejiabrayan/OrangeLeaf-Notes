'use client'
import React, { createContext, useContext } from 'react';
import useUser from './UseUser';
import { User } from '@supabase/supabase-js';

interface UserContextType {
  user: User | null;
  loading: boolean;
}
const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: any) => {
  const { user, loading } = useUser();

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
