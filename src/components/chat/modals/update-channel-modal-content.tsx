import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { EditIcon } from "@/components/icons";
import Input from "@/components/ui/input";

import type { Channel } from "@/actions/channels";

const schema = Yup.object({
  channel_name: Yup.string().label("Channel name").required("Enter Channel Name"),
});

type UpdateSchema = Yup.InferType<typeof schema>;

export interface UpdateChannelModalContentProps {
  channel: Channel;
  onSave: (update: UpdateSchema) => void;
  onCancel: () => void;
}

export default function UpdateChannelModalContent({
  channel,
  onSave,
  onCancel,
}: UpdateChannelModalContentProps) {
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<UpdateSchema>({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (channel) {
      setValue("channel_name", channel.channel_name, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [channel, setValue]);

  return (
    <form method="post" onSubmit={handleSubmit(onSave)}>
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
            <EditIcon className="h-6 w-6 text-green-600 stroke-green-600" aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left flex-grow">
            <h1 className="text-2xl">Update Channel</h1>

            <div className="mt-3 w-full">
              <p className="text-base">
                Update channel <strong>{channel.channel_name}</strong> will only able to update
                channle name.
              </p>

              <div className="mt-5">
                <Input
                  type="text"
                  id="channel_name"
                  label="Channel Name"
                  name="channel_name"
                  register={register}
                  error={errors.channel_name?.message}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="submit"
          className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
          onClick={handleSubmit(onSave)}
        >
          Save It
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
