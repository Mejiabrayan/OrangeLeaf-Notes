import { Textarea } from './ui/textarea';

export const LoadingCard = () => {
  return (
    <div
      className='space-y-5 rounded-2xl bg-white/5 p-4 
      relative 
      before:absolute 
      before:inset-0
      before:-translate-x-full
      before:animate-[shimmer_2s_infinite]
      before:bg-gradient-to-r
      before:from-transparent before:via-rose-100/10 before:to-transparent 
      isolate
      overflow-hidden
      shadow-xl shadow-black/5
      before:border-t before:border-rose-100/10'
    >
      <div className='h-24 rounded-lg bg-rose-100/10'></div>
      <div className='space-y-3'>
        <div className='h-3 w-3/5 rounded-lg bg-rose-100/10'></div>
        <div className='h-3 w-4/5 rounded-lg bg-rose-100/10'></div>
        <div className='h-3 w-2/5 rounded-lg bg-rose-100/10'></div>
      </div>
    </div>
  );
};

export const LoadingTextArea = () => {
  return (
    <div
      className='rounded-xl bg-white/5 p-2
        relative
        before:absolute
        before:inset-0
        before:-translate-x-full
        before:animate-[shimmer_2s_infinite]
        before:bg-gradient-to-r
        before:from-transparent before:via-rose-100/10 before:to-transparent
        isolate
        overflow-hidden
        shadow-xl shadow-black/5
        before:border-t before:border-rose-100/10'
    >
      {/* Simulating a text area input */}
      <div className='min-h-[60px]  w-full rounded-md border border-input bg-transparent px-3 py-2 shadow-sm '></div>
    </div>
  );
};

export const LoadingButton = () => {
    return (
      <div
        className='inline-flex items-center justify-center rounded-md bg-gradient-to-r from-rose-200 to-rose-300 animate-pulse h-12 px-6'
        aria-hidden="true" // This indicates to assistive technologies that this is not interactive content
      >
        <div className='w-24 h-3 rounded bg-rose-100/50'></div>
      </div>
    );
  };
  