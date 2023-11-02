import Sidebar from "@/components/chat/sidebar";

import channelActions from "@/actions/channels";
import userActions from "@/actions/users";

export const revalidate = 0;

export default async function ChatLayout({ children }: { children: React.ReactNode }) {
  const [profile, channels] = await Promise.all([
    userActions.getProfile(),
    channelActions.fetchAll(),
  ]);

  return (
    <div className="flex h-full">
      <Sidebar profile={profile!} serverChannles={channels ?? []} />
      {children}
    </div>
  );
}
