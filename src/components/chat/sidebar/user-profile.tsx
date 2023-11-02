import type { Profile } from "@/actions/users";

import Avatar from "@/components/ui/avatar";
import Button from "@/components/ui/button";

export interface ProfileProps {
  profile: Profile;
  onLogout: () => void;
}

export default function UserProfile({ profile, onLogout }: ProfileProps) {
  if (!profile) return false;

  return (
    <div className="rounded-2xl p-4 border-2">
      <div className="flex items-center justify-start gap-3">
        <div className="relative h-10 w-10 shrink-0">
          <Avatar size="medium" name={`${profile.first_name} ${profile.last_name}`} />
        </div>

        <div className="overflow-hidden flex-1">
          <h4 className="text-md text-slate-950 truncate">
            {profile.first_name} {profile.last_name}
          </h4>
        </div>

        <Button diverse="outline" intent="primary" size="small" onClick={onLogout}>
          Log out
        </Button>
      </div>
    </div>
  );
}
