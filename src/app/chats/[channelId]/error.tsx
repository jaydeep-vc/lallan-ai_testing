"use client";

import Button from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-xl">Something went wrong !</h1>
        <p className="my-2">Please try again. Something went wrong here.</p>
        <Button className="mt-7" onClick={() => reset()}>
          Try Again
        </Button>
      </div>
    </div>
  );
}
