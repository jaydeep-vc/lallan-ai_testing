"use client";

export default function LoadingChatMessage() {
  return (
    <div className="w-full">
      <div className="bg-slate-100 py-6 animate-pulse">
        <div className="flex justify-start gap-5 w-[90%] md:w-3/5 mx-auto">
          <div className="w-6 h-6 relative flex-shrink-0">
            <div className="h-6 w-6 rounded-full bg-slate-200"></div>
          </div>
          <div className="h-4 w-[90%] rounded-lg bg-slate-200"></div>
        </div>
      </div>

      <div className="bg-white py-6 animate-pulse">
        <div className="flex justify-start gap-5 w-[90%] md:w-3/5 mx-auto">
          <div className="w-6 h-6 relative flex-shrink-0">
            <div className="h-6 w-6 rounded-full bg-slate-200"></div>
          </div>
          <div className="flex w-full flex-col gap-3">
            <div className="h-4 w-[95%] rounded-lg bg-slate-200"></div>
            <div className="h-4 w-[50%] rounded-lg bg-slate-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
