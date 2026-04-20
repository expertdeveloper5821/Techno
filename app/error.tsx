'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4 px-4 py-16 bg-[#0a0a0a] text-white">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="text-center text-gray-300 max-w-md">
        An unexpected error occurred. You can try again or return to the home page.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-full bg-[#0094DB] px-6 py-2 font-semibold text-white hover:opacity-95"
      >
        Try again
      </button>
    </div>
  );
}
