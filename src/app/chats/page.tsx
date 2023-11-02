import type { Metadata } from "next";
import Image from "next/image";

import userActions from "@/actions/users";
import CreateChannelButton from "@/components/chat/create-channel-button";
import { fuseTitleText } from "@/lib/toolbar";
import Header from "./header";

export async function generateMetadata(): Promise<Metadata> {
  const user = await userActions.getCurrentUser();

  if (user === null)
    return {
      title: "Not user found",
    };

  return {
    title: fuseTitleText("Lallan.AI", "Welcome " + user.user_metadata.first_name),
  };
}

export const revalidate = 0;

export default async function Chats() {
  return (
    <main className="flex flex-grow flex-col">
      <Header />
      <div className="flex relative flex-col flex-grow items-center justify-center gap-5 px-6 md:px-0 mt-10 md:mt-0">
        <div className="w-52 h-52 relative">
          <Image src="/assets/scene-plants.png" alt="Empty Image" fill />
        </div>
        <h1 className="text-xl md:text-2xl mt-7">Welcome to Lallan.ai</h1>
        <p className="w-full md:w-6/12 text-base text-slate-800 text-center">
          Welcome back! It&apos;s great to see you again. How can I assist you today? Feel free to
          ask any questions or let me know how I can help you make the most of our AI tool.
        </p>
        <CreateChannelButton />
      </div>
    </main>
  );
}
