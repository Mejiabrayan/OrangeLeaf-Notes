import Link from 'next/link';
import React from 'react';

const Logo: React.FC = () => {
  return (
    <h1 className='font-bold text-xl text-mainColor'>
      <Link href='/'>OrangeLeaf Notes</Link>
    </h1>
  );
};

export default Logo;
