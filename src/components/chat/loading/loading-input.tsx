"use client";

export default function LoadingInput() {
  return (
    <div className="fixed bg-white bottom-0 flex items-center justify-between right-0 w-full md:w-4/5 px-10 py-4 border-t border-gray-200 animate-pulse">
      <div className="mx-auto w-full md:w-4/5 bg-slate-200 rounded-lg outline-none">
        <div className="h-14 w-full"></div>
      </div>
    </div>
  );
}
