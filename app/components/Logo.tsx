import Link from 'next/link';
import React from 'react';

const Logo: React.FC = () => {
  return (
    <h1 className='font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-xl text-transparent'>
      <Link href='/'>OrangeLeaf Notes</Link>
    </h1>
  );
};

export default Logo;
