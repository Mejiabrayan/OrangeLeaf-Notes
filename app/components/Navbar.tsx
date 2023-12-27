import React from 'react';
import Logo from './Logo';

type NavBarProps = {
  userEmail: string;
};

const NavBar: React.FC<NavBarProps> = ({ userEmail }) => {
  return (
    <nav className='flex justify-between items-center p-4'>
      <Logo />
      <span className='text-gray-600 dark:text-gray-300 text-sm'>
        {userEmail ?? ''}
      </span>
    </nav>
  );
};

export default NavBar;
