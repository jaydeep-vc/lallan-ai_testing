"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import useModal from "@/hooks/use-modal";
import useToast from "@/hooks/use-toast";

import ChannelItem from "./channel-item";
import RemoveModalContent from "../modals/remove-modal-content";
import UpdateChannelModalContent from "../modals/update-channel-modal-content";

import channelActions, { type Channel } from "@/actions/channels";
import userDocActions, { type UserDocument } from "@/actions/user-docs";
import { unSubscribeChannels } from "@/actions/un-subscribe";
import { DrawerContext } from "@/context/drawer-context";

export default function RealtimeChannels({ serverChannles }: { serverChannles: Channel[] }) {
  const router = useRouter();
  const { setToastAlert } = useToast();
  const { setDrawerOpen } = useContext(DrawerContext);

  const [channles, setChannels] = useState<Channel[]>(serverChannles);
  const [removeChannel, setRemoveChannel] = useState<Channel | null>(null);
  const [updateChannel, setUpdateChannel] = useState<Channel | null>(null);

  const {
    show: showChannelRemoveModal,
    hide: hideChannelRemoveModal,
    Modal: ChannelRemoveModal,
  } = useModal();

  const {
    show: showChannelUpdateModal,
    hide: hideChannelUpdateModal,
    Modal: ChannelUpdateModal,
  } = useModal();

  useEffect(() => {
    setChannels(serverChannles);
  }, [serverChannles]);

  useEffect(() => {
    // subscripe to insert channel
    const realtimeChannelInsert = channelActions.subscribeToInsert((newChannel) => {
      setChannels([...channles, newChannel]);
      router.push(`/chats/${newChannel.id}`);
    });

    // subscribe to remove channel
    const realtimeChannelRemoved = channelActions.subscribeToRemove((removedChannel) => {
      setChannels(channles.filter((c) => c.id !== removedChannel.id));
    });

    // subscribe to realtime update channel
    const realtimeChannelUpdate = channelActions.subscribeToUpdate((updateChannel) => {
      const temp = [...channles];
      const index = temp.findIndex((t) => t.id === updateChannel.id);
      if (index > -1) {
        temp[index] = { ...updateChannel };
        setChannels(temp);
      }
    });

    return () => {
      unSubscribeChannels(realtimeChannelInsert, realtimeChannelUpdate, realtimeChannelRemoved);
    };
  }, [router, channles]);

  const parseDocPaths = (docs: UserDocument[]) => {
    let paths: string[] = [];
    for (let i = 0; i < docs.length; i++) {
      if (docs[i].document_location && docs[i].document_location !== null) {
        let location = docs[i].document_location;
        if (location !== null) {
          location = location.replace(process.env.NEXT_PUBLIC_BUCKET_URL!, "");
          location = location.replaceAll("%20", " ");
          paths.push(location);
        }
      }
    }
    return paths;
  };

  const handleRemove = async (channel: Channel) => {
    handleChannelRemoveModalClose();

    try {
      // fetch all documents
      const documents = await userDocActions.fetchByChannelId(channel.id);
      // fetch all path from the channel
      let paths = parseDocPaths(documents ?? []);
      // remove channel
      await channelActions.remove(channel.id);
      // remove files also from storage
      await userDocActions.removeFiles(paths);
      // if it here then it is succesfully removed
      setToastAlert({
        title: "Removed Channel",
        message: `${channel.channel_name} channel is removed.`,
        type: "success",
      });
    } catch (err: any) {
      if (err.code === "23503") {
        setToastAlert({
          title: "Unable to removed",
          message: `Can not remove ${channel.channel_name}, You have your chats inside it.`,
          type: "error",
        });
      } else {
        setToastAlert({
          title: "Faild to remove",
          message: err?.message || "Something went wrong",
          type: "error",
        });
      }
    }
  };

  const handleChannelUpdate = async ({ id, channel_name }: Partial<Channel>) => {
    handleChannelUpdateModalClose();

    try {
      await channelActions.update(id!, { channel_name, updated_at: new Date().toISOString() });

      setToastAlert({
        title: "Channel Updated",
        message: `Your channel is updated with ${channel_name}`,
        type: "success",
      });
    } catch (err: any) {
      console.error(err);
      setToastAlert({
        title: "Something Wrong !",
        message: err.message || "Something is wrong",
        type: "error",
      });
    } finally {
      handleChannelUpdateModalClose();
    }
  };

  const handleChannelRemoveModalClose = () => {
    setRemoveChannel(null);
    hideChannelRemoveModal();
  };

  const handleChannelUpdateModalClose = () => {
    setUpdateChannel(null);
    hideChannelUpdateModal();
  };

  // sort channels to updated data
  channles.sort((a, b) => {
    return new Date(b.updated_at ?? "").getTime() - new Date(a.updated_at ?? "").getTime();
  });

  return (
    <>
      <ChannelRemoveModal>
        <RemoveModalContent
          channelName={removeChannel?.channel_name ?? ""}
          onRemove={() => {
            handleRemove(removeChannel!);
          }}
          onCancel={handleChannelRemoveModalClose}
        />
      </ChannelRemoveModal>

      <ChannelUpdateModal>
        <UpdateChannelModalContent
          channel={updateChannel!}
          onSave={({ channel_name }) => {
            handleChannelUpdate({ channel_name, id: updateChannel?.id });
          }}
          onCancel={handleChannelUpdateModalClose}
        />
      </ChannelUpdateModal>

      <div className="flex gap-4 flex-grow flex-col overflow-hidden">
        <div className="flex items-between px-2 pt-2">
          <p className="text-sm text-primary font-semibold flex-1">Your Channels</p>
          <div className="">{/* <input type="checkbox" name="" id="" /> */}</div>
        </div>

        <div className="overflow-y-auto flex flex-col gap-3 px-[5px] py-[5px]">
          {channles.map((channel) => (
            <ChannelItem
              key={channel.id}
              href={`/chats/${channel.id}`}
              name={channel.channel_name}
              onClick={(e) => {
                e.preventDefault();
                setDrawerOpen(false);
                router.push(`/chats/${channel.id}`);
              }}
              onEdit={() => {
                setUpdateChannel(channel);
                showChannelUpdateModal();
              }}
              onRemove={() => {
                setRemoveChannel(channel);
                showChannelRemoveModal();
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
