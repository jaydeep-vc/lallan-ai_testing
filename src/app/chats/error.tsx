"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  console.log(error);

  return (
    <div className="flex flex-1">
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
    </div>
  );
}
