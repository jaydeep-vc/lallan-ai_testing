"use client";

import Button from "@/components/ui/button";

import useModal from "@/hooks/use-modal";

import CreateChannelModalContent from "./modals/create-channel-modal-content";

export default function CreateChannelButton() {
  const {
    show: showCreateChannelModel,
    hide: hideCreateChannelModel,
    Modal: CreateChannelModel,
  } = useModal();

  return (
    <>
      <CreateChannelModel>
        <CreateChannelModalContent
          onCancel={hideCreateChannelModel}
          onSave={() => {
            hideCreateChannelModel();
          }}
        />
      </CreateChannelModel>

      <Button className="mt-3" onClick={showCreateChannelModel}>
        Create Channel
      </Button>
    </>
  );
}
