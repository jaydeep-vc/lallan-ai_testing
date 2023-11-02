import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import Input from "@/components/ui/input";
import { ModalBottom } from "@/components/ui/modal";
import OptionsInput from "@/components/ui/options-input";

import useToast from "@/hooks/use-toast";

import channelActions, { type Channel } from "@/actions/channels";
import userActions from "@/actions/users";
import channelTypeActions, { type ChannelType } from "@/actions/channel-type";
import languageModelActions, { type LanguageModel } from "@/actions/language-models";
import { ChannelIcon, SpnningIcon } from "@/components/icons";
import EmbeddingModel from "@/services/EmbeddingModel";

const schema = Yup.object({
  channel_name: Yup.string().label("Channel name").required("Enter Channel Name"),
  channel_type: Yup.string().label("Channel Type").required("Please select channel type"),
  language_model_name: Yup.string()
    .label("Language Model")
    .required("Please select language model"),
});

type CreateSchema = Yup.InferType<typeof schema>;

export interface CreateChannelModalContentProps {
  channel?: Channel;
  onSave: (create: CreateSchema) => void;
  onCancel: () => void;
}

export default function CreateChannelModalContent({
  channel,
  onSave,
  onCancel,
}: CreateChannelModalContentProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<CreateSchema>({ resolver: yupResolver(schema) });
  const { setToastAlert } = useToast();
  const [languageModels, setLanguageModels] = useState<LanguageModel[] | null>([]);
  const [channelTypes, setChannelTypes] = useState<ChannelType[] | null>([]);

  const fetchLanguageModels = async () => {
    try {
      const models = await languageModelActions.getAll();
      setLanguageModels(models);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchChannelTypes = async () => {
    try {
      const channelTypes = await channelTypeActions.fetchAll();
      setChannelTypes(channelTypes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLanguageModels();
    fetchChannelTypes();
  }, []);

  const getChannelTypeId = (type: string): number => {
    if (!channelTypes) return -1;
    const idx = channelTypes.findIndex((c) => c.type === type);
    if (idx > -1) return channelTypes[idx].id;
    return -1;
  };

  const getLanguageModelId = (name: string): number => {
    if (!languageModels) return -1;
    const idx = languageModels.findIndex((c) => c.name === name);
    if (idx > -1) return languageModels[idx].id;
    return -1;
  };

  const handleCreateChannel = async (formData: CreateSchema) => {
    setIsLoading(true);

    try {
      const user = await userActions.getCurrentUser();
      if (!user) return;

      await channelActions.create({
        channel_name: formData.channel_name,
        channel_type_id: getChannelTypeId(formData.channel_type),
        user_id: user.id,
        embedding_model_id: EmbeddingModel.OpenAI_Embedding,
        language_model_id: getLanguageModelId(formData.language_model_name),
      });

      if (onSave) onSave(formData);
    } catch (error: any) {
      setToastAlert({
        title: "Something went wrong !",
        message: "Your response is not passing through. Please try again latter",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form method="POST" onSubmit={handleSubmit(handleCreateChannel)}>
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
              <ChannelIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
            </div>
            <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h1 className="text-2xl">New Channel</h1>

              <div className="mt-2 w-full">
                <p className="text-sm text-gray-500">Please provide the following information.</p>
                <div className="mt-8 w-full flex flex-col gap-5">
                  <Input
                    type="text"
                    id="channel_name"
                    name="channel_name"
                    label="Name"
                    register={register}
                    error={errors.channel_name?.message}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSubmit(onSave);
                      }
                    }}
                  />

                  <OptionsInput
                    name="channel_type"
                    id="channel_type"
                    label="Channel Type"
                    register={register}
                    options={channelTypes?.map((i) => i.type) ?? []}
                  />

                  <OptionsInput
                    name="language_model_name"
                    id="language_model_name"
                    label="Language Model"
                    register={register}
                    options={languageModels?.map((i) => i.name) ?? []}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          >
            {isLoading && <SpnningIcon height={16} width={16} />} Submit
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
    </>
  );
}
