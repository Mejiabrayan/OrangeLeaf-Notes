import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-[#121212] text-white p-4'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-24 w-24 text-orange-600 mb-8'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        {/* You can replace this with a custom icon or image */}
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M13 16h-1v-4h1m0 0h-1V9h1m2 3v3a1 1 0 001 1h.5m0 0a1.5 1.5 0 100-3 1.5 1.5 0 010-3m0 0V9a1 1 0 00-1-1h-3a1 1 0 00-1 1v1m0 0V9h-3m0 0v3m0 0v3m0 0h3m-3 0H9'
        />
      </svg>
      <h1 className='text-4xl font-semibold mb-4'>Oops!</h1>
      <h2 className='text-2xl mb-4'>404 - Page Not Found</h2>
      <p className='mb-8 text-lg text-gray-400'>
        The page you&apos;re looking for doesn&apos;t seem to exist.
      </p>
      <Link
        href='/'
        className='text-md text-white font-bold py-2 px-4'
      >
        Return Home
      </Link>
    </div>
  );
}
