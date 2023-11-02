import Avatar from "@/components/ui/avatar";

import type { User } from "@/actions/users";

interface QueryMessageProps {
  user: User;
  question: string;
}

export default function QueryMessage({ user, question }: QueryMessageProps) {
  return (
    <div className=" bg-slate-100 py-6">
      <div className="w-full px-4 md:px-0 md:w-3/5 mx-auto flex justify-start gap-5">
        <div className="w-[28px] flex justify-center items-center h-[28px] relative flex-shrink-0">
          <Avatar
            name={`${user.user_metadata.first_name} ${user.user_metadata.last_name}`}
            size="small"
          />
        </div>
        <pre className="text-base mt-1 md:mt-0 md:text-xl text-to-crop font-poppins font-normal whitespace-pre-wrap overflow-x-auto text-break">
          {question}
        </pre>
      </div>
    </div>
  );
}
